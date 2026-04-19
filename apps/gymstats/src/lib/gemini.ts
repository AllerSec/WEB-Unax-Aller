import type { Workout } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = 'gemini-2.0-flash-exp';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export const hasGemini = Boolean(API_KEY && API_KEY.length > 0);

function summarizeWorkout(w: Workout): string {
  const lines: string[] = [];
  lines.push(`${w.dayLabel} · ${new Date(w.startedAt).toLocaleDateString('es-ES')}`);
  for (const ex of w.exercises) {
    if (ex.skipped) {
      lines.push(`  - ${ex.exerciseName}: SALTADO`);
      continue;
    }
    const done = ex.sets.filter((s) => s.completed);
    if (done.length === 0) {
      lines.push(`  - ${ex.exerciseName}: sin empezar`);
      continue;
    }
    const detail = done.map((s) => {
      const base = `${s.weight ?? '?'}kg×${s.reps ?? '?'}`;
      return s.failed ? `${base}✗` : base;
    }).join(', ');
    lines.push(`  - ${ex.exerciseName} (${done.length}/${ex.sets.length}): ${detail}`);
  }
  return lines.join('\n');
}

export interface AIAnalysis {
  summary: string;
  suggestions: string[];
}

/**
 * Prompts Gemini for a brief workout analysis vs past sessions.
 * Returns { summary, suggestions[] }. On error, returns null.
 */
export async function analyzeWorkout(
  current: Workout,
  previous: Workout[],
): Promise<AIAnalysis | null> {
  if (!hasGemini) return null;

  const sameDayPrev = previous
    .filter((w) => w.dayType === current.dayType && w.id !== current.id && w.finishedAt)
    .slice(0, 3);

  const prompt = [
    'Eres un entrenador personal experto en hipertrofia. Analiza brevemente este entrenamiento comparándolo con sesiones anteriores del mismo tipo.',
    '',
    'ENTRENAMIENTO DE HOY:',
    summarizeWorkout(current),
    '',
    sameDayPrev.length > 0 ? 'SESIONES ANTERIORES DEL MISMO DÍA:' : 'No hay sesiones previas del mismo día.',
    ...sameDayPrev.map(summarizeWorkout),
    '',
    'Devuelve JSON válido con esta estructura exacta (SIN markdown, SIN ```):',
    '{"summary": "2-3 frases en español sobre cómo fue comparado con antes", "suggestions": ["3-5 sugerencias concretas, cortas, accionables para la próxima sesión"]}',
    '',
    'Sé directo, sin adornos. No digas obviedades. Si hay progreso real, reconócelo. Si no, dilo.',
  ].join('\n');

  try {
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
    if (!text) return null;

    const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleaned) as AIAnalysis;
    if (typeof parsed.summary !== 'string' || !Array.isArray(parsed.suggestions)) return null;
    return parsed;
  } catch {
    return null;
  }
}
