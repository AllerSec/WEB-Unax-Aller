import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { Workout } from '../types';
import { ROUTINES } from '../data/routines';
import { workoutFeedback } from '../lib/progression';
import { formatDurationShort } from '../lib/date';
import { hasGemini, analyzeWorkout, type AIAnalysis } from '../lib/gemini';
import { SplitHeading } from '../components/shared/SplitHeading';

interface Props {
  workout: Workout;
  history: Workout[];
  onDone: () => void;
}

function statusOf(ex: Workout['exercises'][number]): 'done' | 'partial' | 'skipped' | 'untouched' {
  if (ex.skipped) return 'skipped';
  const done = ex.sets.filter((s) => s.completed).length;
  if (done === 0) return 'untouched';
  if (done < ex.sets.length) return 'partial';
  return 'done';
}

export function SummaryScreen({ workout, history, onDone }: Props) {
  const routine = ROUTINES[workout.dayType];
  const feedback = workoutFeedback(workout);

  const scoreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  const [ai, setAi] = useState<AIAnalysis | null>(null);
  const [aiLoading, setAiLoading] = useState(hasGemini);

  useEffect(() => {
    let cancelled = false;
    if (!hasGemini) return;
    (async () => {
      const res = await analyzeWorkout(workout, history);
      if (cancelled) return;
      setAi(res);
      setAiLoading(false);
    })();
    return () => { cancelled = true; };
  }, [workout, history]);

  useEffect(() => {
    const score = workout.score ?? 0;
    const ctx = gsap.context(() => {
      if (scoreRef.current) {
        const el = scoreRef.current;
        const obj = { n: 0 };
        gsap.to(obj, {
          n: score,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = String(Math.round(obj.n)); },
        });
      }
      if (ringRef.current) {
        const r = 70;
        const circ = 2 * Math.PI * r;
        ringRef.current.style.strokeDasharray = String(circ);
        ringRef.current.style.strokeDashoffset = String(circ);
        gsap.to(ringRef.current, {
          strokeDashoffset: circ * (1 - score / 100),
          duration: 1.2,
          ease: 'power2.out',
        });
      }
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.querySelectorAll('.anim-row'),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.4 },
        );
      }
    });
    return () => ctx.revert();
  }, [workout.score]);

  useEffect(() => {
    if (!ai || !aiRef.current) return;
    gsap.fromTo(
      aiRef.current,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    );
  }, [ai]);

  const totalVolume = workout.exercises.reduce((acc, e) => {
    if (e.skipped) return acc;
    return acc + e.sets.reduce((a, s) => a + (s.completed && !s.failed ? (s.weight ?? 0) * (s.reps ?? 0) : 0), 0);
  }, 0);

  const totalPlanned = workout.exercises.reduce((a, e) => a + e.sets.length, 0);
  const doneSets = workout.exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.completed && !s.failed).length,
    0,
  );
  const failedSets = workout.exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.failed).length,
    0,
  );
  const duration = workout.finishedAt
    ? new Date(workout.finishedAt).getTime() - new Date(workout.startedAt).getTime()
    : 0;

  const score = workout.score ?? 0;
  const scoreColor =
    score >= 85 ? 'var(--surface-tint)'
      : score >= 65 ? routine.color
        : score >= 40 ? '#c97a1f'
          : 'var(--error)';

  const scoreLabel =
    score >= 85 ? 'Excelente'
      : score >= 65 ? 'Buen trabajo'
        : score >= 40 ? 'A medias'
          : score > 0 ? 'Muy flojo' : 'Sin datos';

  const statuses = workout.exercises.map(statusOf);
  const doneCount = statuses.filter((s) => s === 'done').length;
  const partialCount = statuses.filter((s) => s === 'partial').length;
  const untouchedCount = statuses.filter((s) => s === 'untouched').length;
  const skippedCount = statuses.filter((s) => s === 'skipped').length;

  return (
    <div className="flex-1 relative">
      {/* Decorative blob */}
      <div className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden" style={{ height: 500 }} aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500, top: -200, right: -150,
            background: `radial-gradient(circle, ${typeof scoreColor === 'string' && scoreColor.startsWith('#') ? scoreColor + '30' : 'rgba(180, 205, 184, 0.3)'}, transparent 70%)`,
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative container-xl pb-16 pt-6 safe-top safe-bottom">
        <div className="pt-4">
          <div className="inline-flex items-center chip" style={{ color: routine.color, borderColor: `${routine.color}40`, background: `${routine.color}10` }}>
            <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: routine.color }} />
            {routine.label}
          </div>
          <div className="mt-4">
            <SplitHeading
              text="Resumen"
              as="h1"
              className="h-display text-4xl md:text-5xl"
              delay={0.2}
            />
          </div>
        </div>

        <div className="mt-8 card p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
              <circle cx="80" cy="80" r="70" fill="none" stroke="var(--outline-variant)" strokeWidth="6" />
              <circle
                ref={ringRef}
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={scoreColor}
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div ref={scoreRef} className="font-serif text-6xl font-light leading-none text-primary">0</div>
              <div className="u-label mt-2 text-[10px]">{scoreLabel}</div>
            </div>
          </div>
          <div className="flex-1 w-full space-y-2.5">
            <Row label="Duración" value={formatDurationShort(duration)} />
            <Row label="Series" value={`${doneSets}/${totalPlanned}${failedSets > 0 ? ` · ${failedSets} falladas` : ''}`} />
            <Row label="Ejercicios" value={`${doneCount}/${workout.exercises.length}`} />
            <Row label="Volumen" value={`${Math.round(totalVolume).toLocaleString('es-ES')} kg`} />
          </div>
        </div>

        {/* Gemini AI analysis */}
        {hasGemini && (
          <div ref={aiRef} className="mt-4 card p-5" style={{ opacity: aiLoading ? 1 : 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface-tint)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--surface)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z"/>
                </svg>
              </div>
              <div>
                <div className="u-label">Análisis IA</div>
                <div className="text-[11px] text-ink-outline font-mono">Gemini 2.0</div>
              </div>
            </div>
            {aiLoading && (
              <div className="space-y-2">
                <div className="card-inset h-4 shimmer" style={{ width: '80%' }} />
                <div className="card-inset h-4 shimmer" style={{ width: '65%' }} />
                <div className="card-inset h-4 shimmer" style={{ width: '72%' }} />
              </div>
            )}
            {!aiLoading && ai && (
              <>
                <p className="text-sm text-ink leading-relaxed">{ai.summary}</p>
                {ai.suggestions.length > 0 && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--outline-variant)' }}>
                    <div className="u-label mb-2.5">Para la próxima</div>
                    <ul className="space-y-2">
                      {ai.suggestions.map((s, i) => (
                        <li key={i} className="text-sm text-ink-muted flex items-start gap-2.5">
                          <span className="font-mono text-[11px] text-primary shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            {!aiLoading && !ai && (
              <div className="text-sm text-ink-muted">No se pudo generar análisis. Comprueba tu clave de Gemini.</div>
            )}
          </div>
        )}

        {/* Banner honesto si faltan cosas */}
        {(untouchedCount + skippedCount + partialCount) >= Math.ceil(workout.exercises.length / 2) && (
          <div className="mt-4 card p-4" style={{ borderColor: 'var(--on-error-container)', background: 'var(--error-container)' }}>
            <div className="u-label mb-2" style={{ color: 'var(--on-error-container)' }}>Entrenamiento incompleto</div>
            <div className="text-sm text-ink-muted">
              Solo terminaste al 100% {doneCount} de {workout.exercises.length} ejercicios. El score refleja el trabajo real hecho, no el planificado.
            </div>
          </div>
        )}

        <div ref={listRef} className="mt-5 space-y-3">
          {feedback.good.length > 0 && (
            <div className="anim-row card p-5">
              <div className="u-label mb-3 flex items-center gap-2" style={{ color: 'var(--surface-tint)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Bien hecho
              </div>
              <ul className="text-sm space-y-2">
                {feedback.good.map((g, i) => <li key={i} className="text-ink flex gap-2"><span className="text-ink-outline shrink-0">—</span>{g}</li>)}
              </ul>
            </div>
          )}
          {feedback.bad.length > 0 && (
            <div className="anim-row card p-5">
              <div className="u-label mb-3 flex items-center gap-2" style={{ color: 'var(--on-error-container)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                A mejorar
              </div>
              <ul className="text-sm space-y-2">
                {feedback.bad.map((g, i) => <li key={i} className="text-ink flex gap-2"><span className="text-ink-outline shrink-0">—</span>{g}</li>)}
              </ul>
            </div>
          )}
          {feedback.tips.length > 0 && (
            <div className="anim-row card p-5">
              <div className="u-label mb-3 flex items-center gap-2" style={{ color: '#c97a1f' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Consejos
              </div>
              <ul className="text-sm space-y-2">
                {feedback.tips.map((g, i) => <li key={i} className="text-ink-muted flex gap-2"><span className="text-ink-outline shrink-0">—</span>{g}</li>)}
              </ul>
            </div>
          )}

          <div className="anim-row card p-5">
            <div className="u-label mb-4">Desglose por ejercicio</div>
            <div className="space-y-2.5">
              {workout.exercises.map((e) => {
                const good = e.sets.filter((s) => s.completed && !s.failed).length;
                const failed = e.sets.filter((s) => s.failed).length;
                const status = statusOf(e);
                const statusColor =
                  status === 'done' ? 'var(--surface-tint)'
                    : status === 'partial' ? '#c97a1f'
                      : status === 'skipped' ? 'var(--on-error-container)'
                        : 'var(--on-surface-variant)';
                const statusLabel =
                  status === 'done' ? `${good}/${e.sets.length}${failed > 0 ? ` · ${failed} falladas` : ''}`
                    : status === 'partial' ? `${good}/${e.sets.length}`
                      : status === 'skipped' ? 'saltado'
                        : 'sin empezar';
                return (
                  <div key={e.exerciseId} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: statusColor }} />
                    <div className="flex-1 text-sm truncate text-primary">{e.exerciseName}</div>
                    <div className="font-mono text-[11px]" style={{ color: statusColor }}>{statusLabel}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button onClick={onDone} className="w-full btn-primary mt-8 inline-flex items-center justify-center gap-2">
          Volver al inicio
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b last:border-0 last:pb-0" style={{ borderColor: 'var(--outline-variant)' }}>
      <div className="text-xs u-label">{label}</div>
      <div className="font-mono text-sm font-medium text-primary">{value}</div>
    </div>
  );
}
