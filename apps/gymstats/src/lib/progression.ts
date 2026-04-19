import type { ExerciseCategory, ExerciseTemplate, LoggedExercise, Workout } from '../types';

function incrementFor(cat: ExerciseCategory): number {
  switch (cat) {
    case 'compound':
      return 2.5;
    case 'isolation-leg':
      return 2.5;
    case 'isolation-arm':
      return 1.25;
    case 'isolation-shoulder':
      return 1;
    case 'core':
    case 'cardio':
      return 0;
  }
}

function roundToStep(value: number, step: number): number {
  if (step <= 0) return Math.round(value);
  return Math.round(value / step) * step;
}

export function recommendWeight(
  template: ExerciseTemplate,
  history: Workout[],
): number | null {
  const entries = history
    .filter((w) => w.finishedAt)
    .map((w) => w.exercises.find((e) => e.exerciseId === template.id))
    .filter((e): e is LoggedExercise => Boolean(e && !e.skipped && e.sets.some((s) => s.completed)));

  if (entries.length === 0) return null;

  const last = entries[0];
  const completedSets = last.sets.filter((s) => s.completed && !s.failed && s.weight != null);
  if (completedSets.length === 0) return null;

  const lastWeight = Math.max(...completedSets.map((s) => s.weight ?? 0));
  if (lastWeight === 0) return null;

  const totalSets = last.sets.length;
  const allCompleted = last.sets.every((s) => s.completed && !s.failed);
  const allAtTop = last.sets.every(
    (s) => s.completed && !s.failed && (s.reps ?? 0) >= template.repRange[1],
  );
  const anyFailed = last.sets.some((s) => s.failed);

  const prev = entries[1];
  const prevAnyFailed = prev?.sets.some((s) => s.failed) ?? false;

  const inc = incrementFor(template.category);

  if (anyFailed && prevAnyFailed) {
    return roundToStep(lastWeight * 0.95, inc || 1);
  }
  if (anyFailed) return lastWeight;
  if (allCompleted && allAtTop && totalSets === last.sets.length) {
    return roundToStep(lastWeight + inc, inc || 1);
  }
  return lastWeight;
}

export function lastWeightFor(
  exerciseId: string,
  history: Workout[],
): { weight: number; reps: number; date: string } | null {
  for (const w of history) {
    const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
    if (!ex || ex.skipped) continue;
    const best = ex.sets.filter((s) => s.completed && s.weight != null)
      .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))[0];
    if (best && best.weight != null && best.reps != null) {
      return { weight: best.weight, reps: best.reps, date: w.startedAt };
    }
  }
  return null;
}

/**
 * Estado real de un ejercicio registrado.
 */
type ExerciseStatus = 'done' | 'partial' | 'skipped' | 'untouched';

function statusOf(ex: LoggedExercise): ExerciseStatus {
  if (ex.skipped) return 'skipped';
  const done = ex.sets.filter((s) => s.completed).length;
  if (done === 0) return 'untouched';
  if (done < ex.sets.length) return 'partial';
  return 'done';
}

/**
 * Puntuación 0-100 honesta. Castiga no-hechos igual que saltados.
 *  - 65%: series reales completadas (sin fallos) / series totales planeadas
 *  - 20%: ejercicios completos / ejercicios planeados
 *  - 10%: tope de rango alcanzado / ejercicios completados
 *  - 5%: bonus por terminar sin marcar "terminar antes"
 */
export function scoreWorkout(w: Workout): number {
  if (w.exercises.length === 0) return 0;

  const totalSetsPlanned = w.exercises.reduce((a, e) => a + e.sets.length, 0);
  const goodSets = w.exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.completed && !s.failed).length,
    0,
  );
  const setsPct = totalSetsPlanned > 0 ? goodSets / totalSetsPlanned : 0;

  const fullyDone = w.exercises.filter((e) => statusOf(e) === 'done').length;
  const exercisesPct = fullyDone / w.exercises.length;

  const fullyDoneList = w.exercises.filter((e) => statusOf(e) === 'done');
  const reachedTop = fullyDoneList.filter((e) => {
    const top = e.sets[0]?.targetReps[1] ?? 0;
    return e.sets.every((s) => (s.reps ?? 0) >= top);
  }).length;
  const topPct = fullyDoneList.length > 0 ? reachedTop / fullyDoneList.length : 0;

  const finishedBonus = w.endedEarly ? 0 : 1;

  const score = setsPct * 65 + exercisesPct * 20 + topPct * 10 + finishedBonus * 5;
  return Math.round(Math.max(0, Math.min(100, score)));
}

/**
 * Feedback realista: mira sólo lo que realmente pasó.
 * Nunca dice "completaste todo" si hay ejercicios sin empezar.
 */
export function workoutFeedback(w: Workout): { good: string[]; bad: string[]; tips: string[] } {
  const good: string[] = [];
  const bad: string[] = [];
  const tips: string[] = [];

  const statuses = w.exercises.map((e) => ({ ex: e, status: statusOf(e) }));
  const done = statuses.filter((s) => s.status === 'done');
  const partial = statuses.filter((s) => s.status === 'partial');
  const skipped = statuses.filter((s) => s.status === 'skipped');
  const untouched = statuses.filter((s) => s.status === 'untouched');
  const notFullyDone = [...partial, ...skipped, ...untouched];

  // Series agregadas
  const totalPlanned = w.exercises.reduce((a, e) => a + e.sets.length, 0);
  const totalGood = w.exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.completed && !s.failed).length,
    0,
  );
  const totalFailed = w.exercises.reduce(
    (a, e) => a + e.sets.filter((s) => s.failed).length,
    0,
  );
  const notDoneSets = totalPlanned - totalGood - totalFailed;

  // Bien hecho — solo menciones verificables
  if (done.length === w.exercises.length) {
    good.push('Completaste todos los ejercicios planificados.');
  } else if (done.length > 0) {
    good.push(`Completaste ${done.length} de ${w.exercises.length} ejercicios al 100%.`);
  }

  if (totalGood > 0 && totalFailed === 0 && notDoneSets === 0) {
    good.push('No fallaste ninguna serie.');
  }

  // Subir peso: solo en ejercicios enteros con todas las series al tope
  const readyToProgress: string[] = [];
  for (const { ex, status } of statuses) {
    if (status !== 'done') continue;
    const top = ex.sets[0]?.targetReps[1] ?? 0;
    const allAtTop = ex.sets.every((s) => s.completed && !s.failed && (s.reps ?? 0) >= top);
    if (allAtTop && top > 0) readyToProgress.push(ex.exerciseName);
  }
  if (readyToProgress.length > 0) {
    good.push(
      readyToProgress.length === 1
        ? `Listo para subir peso en: ${readyToProgress[0]}.`
        : `Listo para subir peso en ${readyToProgress.length} ejercicios: ${readyToProgress.join(', ')}.`,
    );
  }

  // A mejorar
  if (untouched.length > 0) {
    bad.push(
      untouched.length === 1
        ? `No empezaste: ${untouched[0].ex.exerciseName}.`
        : `${untouched.length} ejercicios sin empezar: ${untouched.map((s) => s.ex.exerciseName).join(', ')}.`,
    );
  }
  if (skipped.length > 0) {
    bad.push(
      skipped.length === 1
        ? `Saltaste: ${skipped[0].ex.exerciseName}.`
        : `Saltaste ${skipped.length} ejercicios: ${skipped.map((s) => s.ex.exerciseName).join(', ')}.`,
    );
  }
  if (partial.length > 0) {
    const details = partial.map((s) => {
      const doneCount = s.ex.sets.filter((x) => x.completed).length;
      return `${s.ex.exerciseName} (${doneCount}/${s.ex.sets.length})`;
    });
    bad.push(
      partial.length === 1
        ? `Series incompletas en ${details[0]}.`
        : `Series incompletas en: ${details.join(', ')}.`,
    );
  }
  const failedList = w.exercises.filter((e) => e.sets.some((s) => s.failed));
  if (failedList.length > 0) {
    bad.push(`Series falladas en: ${failedList.map((e) => e.exerciseName).join(', ')}.`);
  }

  // Consejos prácticos y personalizados
  if (readyToProgress.length > 0) {
    tips.push('Próxima sesión: sube 2,5 kg en compuestos y 1–1,25 kg en aislados donde llegaste al tope en todas las series.');
  }
  if (failedList.length > 0) {
    tips.push('Mantén el peso la próxima vez en los ejercicios con fallos hasta clavar todas las series antes de subir.');
  }
  if (untouched.length > 0 || partial.length > 0) {
    tips.push('Si te pilla el tiempo, empieza por los compuestos pesados. Los aislados al final son los primeros que se pueden recortar sin cargarte la sesión.');
  }
  if (notFullyDone.length / w.exercises.length >= 0.5) {
    tips.push('Menos de la mitad del entreno completo: valora acortar descansos o recortar series antes de saltarte ejercicios enteros.');
  }

  if (w.endedEarly && bad.length === 0) {
    bad.push('Terminaste antes de tiempo.');
  }

  return { good, bad, tips };
}
