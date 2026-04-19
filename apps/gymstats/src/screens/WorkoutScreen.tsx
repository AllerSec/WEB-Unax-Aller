import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import type { DayType, LoggedExercise, LoggedSet, Workout } from '../types';
import { ROUTINES } from '../data/routines';
import { saveWorkout } from '../lib/storage';
import { isoWeek, formatDurationShort } from '../lib/date';
import { lastWeightFor, recommendWeight, scoreWorkout } from '../lib/progression';
import { requestWakeLock, releaseWakeLock } from '../lib/wakeLock';
import { hapticFail, hapticSuccess, hapticTick } from '../lib/haptics';
import { WeightInput } from '../components/WeightInput';
import { RepsInput } from '../components/RepsInput';
import { RestTimer } from '../components/RestTimer';
import { ConfirmModal } from '../components/ConfirmModal';
import { ExerciseImage } from '../components/shared/ExerciseImage';

interface Props {
  dayType: DayType;
  history: Workout[];
  onFinish: (w: Workout) => void;
  onExit: () => void;
}

function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `w_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function WorkoutScreen({ dayType, history, onFinish, onExit }: Props) {
  const routine = ROUTINES[dayType];

  const [workout, setWorkout] = useState<Workout>(() => {
    const exercises: LoggedExercise[] = routine.exercises.map((ex) => {
      const rec = recommendWeight(ex, history);
      return {
        exerciseId: ex.id,
        exerciseName: ex.name,
        muscle: ex.muscle,
        category: ex.category,
        skipped: false,
        sets: Array.from({ length: ex.sets }, (_, i) => ({
          setIndex: i,
          targetReps: ex.repRange,
          recommendedWeight: rec,
          weight: rec,
          reps: null,
          completed: false,
          failed: false,
          startedAt: null,
          finishedAt: null,
        })),
      };
    });

    return {
      id: uid(),
      dayType: routine.type,
      dayLabel: routine.label,
      startedAt: new Date().toISOString(),
      finishedAt: null,
      weekISO: isoWeek(),
      exercises,
      endedEarly: false,
      score: null,
      notes: null,
    };
  });

  const [exIdx, setExIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [restSec, setRestSec] = useState<number | null>(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const currentEx = workout.exercises[exIdx];
  const currentSet = currentEx?.sets[setIdx];
  const template = routine.exercises[exIdx];
  const lastBest = useMemo(
    () => (currentEx ? lastWeightFor(currentEx.exerciseId, history) : null),
    [currentEx, history],
  );

  const cardRef = useRef<HTMLDivElement>(null);
  const prevKey = useRef<string>('');

  useEffect(() => {
    requestWakeLock();
    return () => { releaseWakeLock(); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setElapsedMs(Date.now() - new Date(workout.startedAt).getTime());
    }, 1000);
    return () => clearInterval(t);
  }, [workout.startedAt]);

  useEffect(() => {
    const key = `${exIdx}-${setIdx}`;
    if (prevKey.current === key) return;
    prevKey.current = key;
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      );
    }
  }, [exIdx, setIdx]);

  function updateSet(partial: Partial<LoggedSet>) {
    setWorkout((w) => {
      const copy = structuredClone(w);
      copy.exercises[exIdx].sets[setIdx] = { ...copy.exercises[exIdx].sets[setIdx], ...partial };
      return copy;
    });
  }

  function updateWeightAllRemaining(weight: number) {
    setWorkout((w) => {
      const copy = structuredClone(w);
      const sets = copy.exercises[exIdx].sets;
      for (let i = setIdx; i < sets.length; i++) {
        if (!sets[i].completed && !sets[i].failed) {
          sets[i].weight = weight;
        }
      }
      return copy;
    });
  }

  function advance(afterCompletedOrFailed: boolean) {
    const ex = workout.exercises[exIdx];
    const isLastSet = setIdx >= ex.sets.length - 1;
    const isLastExercise = exIdx >= workout.exercises.length - 1;

    if (afterCompletedOrFailed) {
      if (isLastSet && isLastExercise) {
        setConfirmFinish(true);
        return;
      }
      if (!isLastSet) {
        setRestSec(template.restSec);
        setSetIdx(setIdx + 1);
      } else {
        setRestSec(Math.max(template.restSec, 90));
        setExIdx(exIdx + 1);
        setSetIdx(0);
      }
    }
  }

  function completeSet() {
    if (!currentSet) return;
    if (currentSet.weight == null || currentSet.reps == null) return;
    hapticSuccess();
    updateSet({ completed: true, failed: false, finishedAt: new Date().toISOString() });
    setTimeout(() => advance(true), 50);
  }

  function failSet() {
    if (!currentSet) return;
    hapticFail();
    updateSet({ completed: true, failed: true, finishedAt: new Date().toISOString() });
    setTimeout(() => advance(true), 50);
  }

  function skipExercise() {
    setWorkout((w) => {
      const copy = structuredClone(w);
      copy.exercises[exIdx].skipped = true;
      return copy;
    });
    if (exIdx >= workout.exercises.length - 1) {
      setConfirmFinish(true);
    } else {
      setExIdx(exIdx + 1);
      setSetIdx(0);
      setRestSec(null);
    }
  }

  async function finishWorkout(endedEarly: boolean) {
    const finished: Workout = {
      ...workout,
      finishedAt: new Date().toISOString(),
      endedEarly,
      score: 0,
    };
    finished.score = scoreWorkout(finished);
    await saveWorkout(finished);
    await releaseWakeLock();
    onFinish(finished);
  }

  if (!currentEx || !currentSet || !template) {
    return null;
  }

  const completedSetsTotal = workout.exercises.reduce(
    (acc, e) => acc + e.sets.filter((s) => s.completed && !s.failed).length,
    0,
  );
  const totalPlannedAll = workout.exercises.reduce((acc, e) => acc + e.sets.length, 0);
  const progressPct = totalPlannedAll > 0 ? (completedSetsTotal / totalPlannedAll) * 100 : 0;

  return (
    <div className="flex-1 flex flex-col relative min-h-screen" style={{ background: 'var(--surface)' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: 'rgba(250, 249, 244, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--outline-variant)',
        }}
      >
        <div className="safe-top" />
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setConfirmExit(true)}
            className="btn-icon"
            aria-label="Cerrar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: routine.color }} />
              <span style={{ color: routine.color }}>{routine.label}</span>
              <span className="text-ink-outline">·</span>
              <span className="font-mono text-ink-outline">{formatDurationShort(elapsedMs)}</span>
            </div>
            <div className="h-display text-lg truncate mt-1">{currentEx.exerciseName}</div>
          </div>
          <div className="text-right">
            <div className="font-serif text-xl font-light leading-none">
              {completedSetsTotal}<span className="text-ink-outline">/{totalPlannedAll}</span>
            </div>
            <div className="u-label mt-1 text-[9px]">series</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-2">
          <div className="h-[3px] bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: routine.color }}
            />
          </div>
        </div>

        {/* Exercise tabs */}
        <div className="px-4 pb-3">
          <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1 snap-x snap-mandatory pb-1" style={{ scrollbarWidth: 'none' }}>
            {workout.exercises.map((e, i) => {
              const allDone = e.sets.every((s) => s.completed);
              const anyDone = e.sets.some((s) => s.completed);
              const active = i === exIdx;
              return (
                <button
                  key={e.exerciseId}
                  onClick={() => { setExIdx(i); setSetIdx(0); hapticTick(); }}
                  className="snap-start shrink-0 px-4 py-2.5 rounded-full text-[12px] font-medium uppercase tracking-wider transition border"
                  style={{
                    touchAction: 'manipulation',
                    background: active
                      ? 'var(--primary)'
                      : e.skipped
                        ? 'var(--surface-container)'
                        : allDone
                          ? `${routine.color}12`
                          : 'var(--surface-container-lowest)',
                    color: active
                      ? 'var(--on-primary)'
                      : e.skipped
                        ? 'var(--ink-outline)'
                        : allDone
                          ? routine.color
                          : anyDone
                            ? 'var(--primary)'
                            : 'var(--ink-muted)',
                    borderColor: active
                      ? 'var(--primary)'
                      : allDone
                        ? `${routine.color}45`
                        : 'var(--outline-variant)',
                    textDecoration: e.skipped ? 'line-through' : undefined,
                    minHeight: 40,
                  }}
                >
                  {i + 1}. {e.exerciseName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 pt-4 pb-32 overflow-y-auto container-xl">
        <div ref={cardRef} className="card p-5 relative overflow-hidden max-w-2xl mx-auto">
          <div
            className="absolute -right-16 -top-16 w-48 h-48 rounded-full"
            style={{ background: routine.color, opacity: 0.08, filter: 'blur(40px)' }}
          />
          <div className="relative">
            {/* Header with image */}
            <div className="flex items-start gap-4">
              <ExerciseImage src={template.image} alt={currentEx.exerciseName} accent={routine.color} size={88} />
              <div className="flex-1 min-w-0">
                <div className="u-label" style={{ color: routine.color }}>{currentEx.muscle}</div>
                <div className="h-display text-2xl md:text-3xl mt-1">
                  Serie {setIdx + 1}
                  <span className="h-display-italic text-ink-outline font-light"> de {currentEx.sets.length}</span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-sm text-ink-muted">
                  <span className="font-mono font-semibold text-primary">
                    {template.repRange[0] === template.repRange[1]
                      ? `${template.repRange[0]} reps`
                      : `${template.repRange[0]}–${template.repRange[1]} reps`}
                  </span>
                  {template.notes && (
                    <>
                      <span className="text-ink-outline">·</span>
                      <span className="italic">{template.notes}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {(lastBest || currentSet.recommendedWeight != null) && (
              <div className="mt-5 card-inset p-3 space-y-2">
                {lastBest && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-muted">Última vez</span>
                    <span className="font-mono">
                      <span className="font-semibold text-primary">{lastBest.weight}kg</span>
                      <span className="text-ink-outline"> × {lastBest.reps}</span>
                    </span>
                  </div>
                )}
                {currentSet.recommendedWeight != null && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-muted">Recomendado</span>
                    <span className="font-mono font-semibold" style={{ color: routine.color }}>{currentSet.recommendedWeight}kg</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <div className="u-label mb-2">Peso</div>
                <WeightInput
                  value={currentSet.weight}
                  onChange={(v) => updateSet({ weight: v })}
                  onBlurSyncForward={(v) => updateWeightAllRemaining(v)}
                  accent={routine.color}
                />
              </div>
              <div>
                <div className="u-label mb-2">Reps</div>
                <RepsInput
                  value={currentSet.reps}
                  target={template.repRange}
                  onChange={(v) => updateSet({ reps: v })}
                  accent={routine.color}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={failSet}
                className="btn-danger inline-flex items-center justify-center gap-2 text-base"
                style={{ minHeight: 56, padding: '16px 20px', touchAction: 'manipulation' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                Fallada
              </button>
              <button
                onClick={completeSet}
                disabled={currentSet.weight == null || currentSet.reps == null}
                className="btn-primary inline-flex items-center justify-center gap-2 text-base disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ minHeight: 56, padding: '16px 20px', touchAction: 'manipulation' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Completada
              </button>
            </div>

            {/* Sets preview */}
            <div className="mt-6 flex gap-1.5">
              {currentEx.sets.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSetIdx(i)}
                  className="flex-1 rounded-xl2 text-sm font-mono font-bold transition border"
                  style={{
                    background: i === setIdx
                      ? 'var(--primary)'
                      : s.completed && !s.failed
                        ? `${routine.color}12`
                        : s.failed
                          ? 'var(--error-container)'
                          : 'var(--surface-container)',
                    color: i === setIdx
                      ? 'var(--on-primary)'
                      : s.completed && !s.failed
                        ? routine.color
                        : s.failed
                          ? 'var(--on-error-container)'
                          : 'var(--ink-outline)',
                    borderColor: i === setIdx
                      ? 'var(--primary)'
                      : s.completed && !s.failed
                        ? `${routine.color}40`
                        : s.failed
                          ? 'rgba(186, 26, 26, 0.25)'
                          : 'var(--outline-variant)',
                    borderRadius: 10,
                    minHeight: 48,
                    touchAction: 'manipulation',
                  }}
                >
                  {s.completed ? (s.failed ? '✗' : '✓') : i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={skipExercise}
              className="w-full mt-5 text-xs text-ink-muted hover:text-primary-tint link-underline"
            >
              Saltar ejercicio
            </button>
          </div>
        </div>

        <div className="mt-4 max-w-2xl mx-auto">
          <button
            onClick={() => setConfirmFinish(true)}
            className="w-full btn-ghost text-sm"
          >
            Terminar entrenamiento
          </button>
        </div>
      </div>

      {restSec != null && (
        <RestTimer
          seconds={restSec}
          onDone={() => setRestSec(null)}
          onSkip={() => setRestSec(null)}
          accent={routine.color}
        />
      )}

      <ConfirmModal
        open={confirmExit}
        title="¿Salir del entrenamiento?"
        body="Si sales ahora, el entrenamiento en curso no se guardará."
        confirmLabel="Salir"
        cancelLabel="Seguir"
        danger
        onConfirm={async () => { await releaseWakeLock(); onExit(); }}
        onCancel={() => setConfirmExit(false)}
      />

      <ConfirmModal
        open={confirmFinish}
        title="Terminar entrenamiento"
        body={`Completados ${completedSetsTotal} de ${totalPlannedAll} series. ¿Guardamos?`}
        confirmLabel="Terminar y guardar"
        cancelLabel="Seguir entrenando"
        onConfirm={() => {
          const ended = completedSetsTotal < totalPlannedAll;
          finishWorkout(ended);
        }}
        onCancel={() => setConfirmFinish(false)}
      />
    </div>
  );
}
