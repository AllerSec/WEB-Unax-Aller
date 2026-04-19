import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import type { LoggedSet, Workout } from '../types';
import { ROUTINES } from '../data/routines';
import { deleteWorkout, saveWorkout } from '../lib/storage';
import { timeAgo, formatDurationShort } from '../lib/date';
import { scoreWorkout } from '../lib/progression';
import { ConfirmModal } from '../components/ConfirmModal';
import { TopBar } from '../components/TopBar';
import { SplitHeading } from '../components/shared/SplitHeading';

interface Props {
  history: Workout[];
  onBack: () => void;
  onRefresh: () => void;
}

export function HistoryScreen({ history, onBack, onRefresh }: Props) {
  const [selectedExId, setSelectedExId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [editing, setEditing] = useState<Workout | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current!.querySelectorAll('.anim-in'),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2 },
      );
    });
    return () => ctx.revert();
  }, []);

  const exerciseOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const w of history) {
      for (const ex of w.exercises) {
        if (!ex.skipped && ex.sets.some((s) => s.completed) && !map.has(ex.exerciseId)) {
          map.set(ex.exerciseId, ex.exerciseName);
        }
      }
    }
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [history]);

  const progressData = useMemo(() => {
    if (!selectedExId) return [];
    const rows: { date: string; weight: number; volume: number; label: string }[] = [];
    const sorted = [...history].sort((a, b) => a.startedAt.localeCompare(b.startedAt));
    for (const w of sorted) {
      const ex = w.exercises.find((e) => e.exerciseId === selectedExId);
      if (!ex || ex.skipped) continue;
      const valid = ex.sets.filter((s) => s.completed && !s.failed && s.weight != null && s.reps != null);
      if (valid.length === 0) continue;
      const maxW = Math.max(...valid.map((s) => s.weight ?? 0));
      const volume = valid.reduce((a, s) => a + (s.weight ?? 0) * (s.reps ?? 0), 0);
      const d = new Date(w.startedAt);
      rows.push({
        date: w.startedAt,
        weight: maxW,
        volume,
        label: `${d.getDate()}/${d.getMonth() + 1}`,
      });
    }
    return rows;
  }, [history, selectedExId]);

  const weeklyData = useMemo(() => {
    const map = new Map<string, { week: string; count: number; volume: number }>();
    for (const w of history) {
      if (!w.finishedAt) continue;
      const entry = map.get(w.weekISO) ?? { week: w.weekISO.split('-W')[1], count: 0, volume: 0 };
      entry.count++;
      for (const ex of w.exercises) {
        if (ex.skipped) continue;
        for (const s of ex.sets) {
          if (s.completed && !s.failed) entry.volume += (s.weight ?? 0) * (s.reps ?? 0);
        }
      }
      map.set(w.weekISO, entry);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-8)
      .map(([, v]) => v);
  }, [history]);

  const tooltipStyle = {
    background: 'var(--surface-lowest)',
    border: '1px solid var(--outline-variant)',
    borderRadius: 12,
    fontSize: 12,
    fontFamily: 'JetBrains Mono, monospace',
    color: 'var(--on-surface)',
    padding: '10px 14px',
    boxShadow: '0 8px 24px rgba(6, 27, 14, 0.08)',
  };

  return (
    <div className="flex-1 relative">
      <TopBar
        right={
          <button onClick={onBack} className="btn-icon" aria-label="Volver">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        }
      />

      <div className="container-xl pb-16 pt-4">
        <div ref={headerRef} className="pt-4">
          <div className="anim-in u-label">Historial</div>
          <div className="anim-in mt-3">
            <SplitHeading
              text={`${history.length} entreno${history.length === 1 ? '' : 's'}`}
              as="h1"
              className="h-display text-3xl md:text-4xl"
              delay={0.3}
            />
          </div>
        </div>

        {weeklyData.length > 0 && (
          <div className="mt-8 card p-5">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <div className="u-label">Volumen</div>
                <h3 className="h-display text-xl mt-1">Últimas 8 semanas</h3>
              </div>
            </div>
            <div className="h-48 -ml-2">
              <ResponsiveContainer>
                <BarChart data={weeklyData}>
                  <CartesianGrid stroke="var(--outline-variant)" vertical={false} strokeDasharray="2 4" />
                  <XAxis dataKey="week" stroke="var(--on-surface-variant)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--on-surface-variant)" fontSize={10} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    cursor={{ fill: 'rgba(77, 100, 83, 0.08)' }}
                    contentStyle={tooltipStyle}
                    labelFormatter={(l) => `Semana ${l}`}
                    formatter={(v: number) => [`${Math.round(v).toLocaleString('es-ES')} kg`, 'Volumen']}
                  />
                  <Bar dataKey="volume" fill="var(--surface-tint)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {exerciseOptions.length > 0 && (
          <div className="mt-4 card p-5">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <div className="u-label">Progresión</div>
                <h3 className="h-display text-xl mt-1">Por ejercicio</h3>
              </div>
            </div>
            <select
              value={selectedExId ?? ''}
              onChange={(e) => setSelectedExId(e.target.value || null)}
              className="input-base w-full px-4 py-3 text-sm"
            >
              <option value="">Elige ejercicio…</option>
              {exerciseOptions.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
            {selectedExId && progressData.length > 0 && (
              <div className="h-52 mt-5 -ml-2">
                <ResponsiveContainer>
                  <LineChart data={progressData}>
                    <CartesianGrid stroke="var(--outline-variant)" vertical={false} strokeDasharray="2 4" />
                    <XAxis dataKey="label" stroke="var(--on-surface-variant)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--on-surface-variant)" fontSize={10} tickLine={false} axisLine={false} width={40} unit="kg" />
                    <Tooltip
                      cursor={{ stroke: 'var(--outline-variant)' }}
                      contentStyle={tooltipStyle}
                      formatter={(v: number) => [`${v} kg`, 'Peso máx.']}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="var(--surface-tint)"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: 'var(--surface-tint)', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--surface)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {selectedExId && progressData.length === 0 && (
              <div className="text-sm text-ink-muted mt-4">Sin datos todavía para este ejercicio.</div>
            )}
          </div>
        )}

        <div className="mt-6">
          <div className="u-label mb-3">Todos los entrenos</div>
          <div className="space-y-2">
            {history.map((w) => {
              const routine = ROUTINES[w.dayType];
              const duration = w.finishedAt
                ? new Date(w.finishedAt).getTime() - new Date(w.startedAt).getTime()
                : 0;
              const doneSets = w.exercises.reduce((a, e) => a + e.sets.filter((s) => s.completed && !s.failed).length, 0);
              const totalPlanned = w.exercises.reduce((a, e) => a + e.sets.length, 0);
              const isOpen = expanded === w.id;
              return (
                <div key={w.id} className="card overflow-hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : w.id)}
                    className="w-full p-4 flex items-center gap-3 text-left transition-colors hover:bg-[color:var(--surface-low)]"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-[11px] font-mono font-bold border shrink-0"
                      style={{ background: `${routine.color}12`, color: routine.color, borderColor: `${routine.color}35` }}
                    >
                      {routine.type.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-sm text-primary">{w.dayLabel}</div>
                      <div className="text-[11px] text-ink-outline font-mono mt-0.5">
                        {timeAgo(w.startedAt)}
                        <span className="dot-sep" />
                        {doneSets}/{totalPlanned} series
                        <span className="dot-sep" />
                        {formatDurationShort(duration)}
                      </div>
                    </div>
                    {w.score != null && (
                      <div className="font-serif text-2xl font-light mr-2 leading-none text-primary">{w.score}</div>
                    )}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={`text-ink-outline transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--outline-variant)' }}>
                      <div className="pt-3 space-y-1.5">
                        {w.exercises.map((e) => {
                          const ok = e.sets.filter((s) => s.completed && !s.failed).length;
                          const failed = e.sets.filter((s) => s.failed).length;
                          const anyDone = e.sets.some((s) => s.completed);
                          return (
                            <div key={e.exerciseId} className="text-sm flex items-center justify-between gap-2 py-1">
                              <span className={e.skipped ? 'text-ink-outline line-through' : !anyDone ? 'text-ink-outline' : 'text-ink'}>
                                {e.exerciseName}
                              </span>
                              <span className="font-mono text-[11px] text-ink-muted text-right">
                                {e.skipped ? 'saltado' : !anyDone ? 'sin empezar' :
                                  e.sets.filter((s) => s.completed && s.weight != null).map((s) => `${s.weight}×${s.reps}${s.failed ? '✗' : ''}`).join(' · ')
                                  + (failed > 0 && ok === 0 ? '' : '')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-4 pt-3 border-t flex gap-2" style={{ borderColor: 'var(--outline-variant)' }}>
                        <button
                          onClick={() => setEditing(w)}
                          className="text-[11px] link-underline text-primary-tint"
                        >
                          Editar
                        </button>
                        <span className="text-ink-outline text-[11px]">·</span>
                        <button
                          onClick={() => setPendingDelete(w.id)}
                          className="text-[11px] link-underline"
                          style={{ color: 'var(--on-error-container)' }}
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={pendingDelete != null}
        title="Borrar entrenamiento"
        body="Se eliminará permanentemente. ¿Seguro?"
        confirmLabel="Borrar"
        cancelLabel="Cancelar"
        danger
        onConfirm={async () => {
          if (pendingDelete) await deleteWorkout(pendingDelete);
          setPendingDelete(null);
          setExpanded(null);
          onRefresh();
        }}
        onCancel={() => setPendingDelete(null)}
      />

      {editing && (
        <EditWorkoutModal
          workout={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); onRefresh(); }}
        />
      )}
    </div>
  );
}

function EditWorkoutModal({ workout, onClose, onSaved }: { workout: Workout; onClose: () => void; onSaved: () => void }) {
  const routine = ROUTINES[workout.dayType];
  const [draft, setDraft] = useState<Workout>(() => JSON.parse(JSON.stringify(workout)) as Workout);
  const [saving, setSaving] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backdropRef.current) gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.96, y: 20, autoAlpha: 0 },
        { scale: 1, y: 0, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.4)' },
      );
    }
  }, []);

  function updateSet(exIdx: number, setIdx: number, patch: Partial<LoggedSet>) {
    const next = { ...draft, exercises: draft.exercises.map((e, i) => {
      if (i !== exIdx) return e;
      return { ...e, sets: e.sets.map((s, j) => j === setIdx ? { ...s, ...patch } : s) };
    })};
    setDraft(next);
  }

  async function save() {
    setSaving(true);
    const updated: Workout = { ...draft, score: scoreWorkout(draft) };
    await saveWorkout(updated);
    setSaving(false);
    onSaved();
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6, 27, 14, 0.4)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        ref={cardRef}
        className="w-full max-w-2xl card max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 24px 60px rgba(6, 27, 14, 0.2)' }}
      >
        <div className="p-5 border-b flex items-center justify-between gap-3" style={{ borderColor: 'var(--outline-variant)' }}>
          <div>
            <div className="u-label flex items-center gap-2" style={{ color: routine.color }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: routine.color }} />
              {routine.label}
            </div>
            <h3 className="h-display text-2xl mt-1">Editar entreno</h3>
            <div className="text-[11px] text-ink-outline font-mono mt-1">
              {new Date(workout.startedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Cerrar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {draft.exercises.map((ex, exIdx) => (
            <div key={ex.exerciseId}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-primary">{ex.exerciseName}</div>
                <label className="text-[11px] text-ink-outline flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ex.skipped}
                    onChange={(e) => {
                      const next = { ...draft, exercises: draft.exercises.map((x, i) => i === exIdx ? { ...x, skipped: e.target.checked } : x) };
                      setDraft(next);
                    }}
                  />
                  Saltado
                </label>
              </div>
              {!ex.skipped && (
                <div className="space-y-1.5">
                  {ex.sets.map((s, setIdx) => (
                    <div key={setIdx} className="card-inset p-2.5 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold shrink-0" style={{ background: 'var(--surface-container)', color: 'var(--on-surface-variant)' }}>
                        {setIdx + 1}
                      </div>
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.5"
                        placeholder="kg"
                        value={s.weight ?? ''}
                        onChange={(e) => updateSet(exIdx, setIdx, { weight: e.target.value === '' ? null : parseFloat(e.target.value) })}
                        className="input-base flex-1 px-3 py-2 text-sm font-mono"
                      />
                      <span className="text-[11px] text-ink-outline">×</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="reps"
                        value={s.reps ?? ''}
                        onChange={(e) => updateSet(exIdx, setIdx, { reps: e.target.value === '' ? null : parseInt(e.target.value, 10) })}
                        className="input-base flex-1 px-3 py-2 text-sm font-mono"
                      />
                      <div className="flex items-center gap-1">
                        <label className="text-[10px] text-ink-outline flex items-center gap-1 cursor-pointer">
                          <input type="checkbox" checked={s.completed} onChange={(e) => updateSet(exIdx, setIdx, { completed: e.target.checked, failed: e.target.checked ? s.failed : false })} />
                          OK
                        </label>
                        <label className="text-[10px] flex items-center gap-1 cursor-pointer" style={{ color: 'var(--on-error-container)' }}>
                          <input type="checkbox" checked={s.failed} onChange={(e) => updateSet(exIdx, setIdx, { failed: e.target.checked, completed: e.target.checked ? true : s.completed })} />
                          Fall
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-5 border-t grid grid-cols-2 gap-2.5" style={{ borderColor: 'var(--outline-variant)' }}>
          <button onClick={onClose} className="btn-ghost py-3 text-sm" disabled={saving}>Cancelar</button>
          <button onClick={save} className="btn-primary py-3 text-sm" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}
