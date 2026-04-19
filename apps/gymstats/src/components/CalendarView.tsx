import { useMemo, useState } from 'react';
import type { Workout } from '../types';
import { ROUTINES } from '../data/routines';

interface Props {
  history: Workout[];
  onPickDate?: (isoDate: string, workouts: Workout[]) => void;
}

const DAYS_ABBR = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function CalendarView({ history, onPickDate }: Props) {
  const today = new Date();
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  // Map local YYYY-MM-DD -> workouts on that day
  const byDay = useMemo(() => {
    const map = new Map<string, Workout[]>();
    for (const w of history) {
      const d = new Date(w.startedAt);
      const k = ymd(d);
      const arr = map.get(k) ?? [];
      arr.push(w);
      map.set(k, arr);
    }
    return map;
  }, [history]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Lun=0
  const daysInMonth = lastDay.getDate();

  const cells: Array<{ date: Date | null; key: string }> = [];
  for (let i = 0; i < startOffset; i++) cells.push({ date: null, key: `p${i}` });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), key: `d${d}` });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null, key: `n${cells.length}` });

  const goPrev = () => setCursor(new Date(year, month - 1, 1));
  const goNext = () => setCursor(new Date(year, month + 1, 1));
  const todayKey = ymd(today);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="u-label">Calendario</div>
          <div className="h-display text-2xl mt-1 capitalize">
            {MONTHS[month]} <span className="h-display-italic text-ink-outline">{year}</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button onClick={goPrev} className="btn-icon" aria-label="Mes anterior">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={goNext} className="btn-icon" aria-label="Mes siguiente">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS_ABBR.map((d) => (
          <div key={d} className="u-label py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((c) => {
          if (!c.date) return <div key={c.key} className="aspect-square" />;
          const k = ymd(c.date);
          const workouts = byDay.get(k) ?? [];
          const isToday = k === todayKey;
          const hasWorkouts = workouts.length > 0;
          const primaryRoutine = hasWorkouts ? ROUTINES[workouts[0].dayType] : null;

          return (
            <button
              key={c.key}
              onClick={() => onPickDate?.(k, workouts)}
              disabled={!hasWorkouts && !onPickDate}
              className="aspect-square rounded-lg2 relative text-xs font-mono font-medium transition border"
              style={{
                background: hasWorkouts
                  ? `${primaryRoutine!.color}12`
                  : 'transparent',
                borderColor: isToday
                  ? 'var(--primary)'
                  : hasWorkouts
                    ? `${primaryRoutine!.color}45`
                    : 'var(--outline-variant)',
                color: hasWorkouts ? primaryRoutine!.color : isToday ? 'var(--primary)' : 'var(--ink-muted)',
                cursor: hasWorkouts ? 'pointer' : 'default',
                opacity: hasWorkouts || isToday ? 1 : 0.55,
              }}
            >
              <span className={isToday ? 'font-bold' : ''}>{c.date.getDate()}</span>
              {hasWorkouts && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {workouts.slice(0, 3).map((w) => (
                    <span
                      key={w.id}
                      className="w-1 h-1 rounded-full"
                      style={{ background: ROUTINES[w.dayType].color }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-ink-line/60 flex flex-wrap gap-3 text-xs">
        {(['push', 'pull', 'leg', 'shoulder'] as const).map((k) => (
          <div key={k} className="flex items-center gap-1.5 text-ink-muted">
            <span className="w-2 h-2 rounded-full" style={{ background: ROUTINES[k].color }} />
            <span className="capitalize">{ROUTINES[k].label.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
