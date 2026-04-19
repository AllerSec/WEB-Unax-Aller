import type { Workout } from '../types';
import { supabase, hasSupabase } from './supabase';

const LS_KEY = 'gymstats.workouts.v1';
const PENDING_KEY = 'gymstats.pending.v1';

function readLocal(): Workout[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Workout[];
  } catch {
    return [];
  }
}

function writeLocal(workouts: Workout[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(workouts));
}

function readPending(): string[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writePending(ids: string[]) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(ids));
}

function rowToWorkout(row: {
  id: string;
  day_type: string;
  day_label: string;
  started_at: string;
  finished_at: string | null;
  week_iso: string;
  ended_early: boolean;
  score: number | null;
  notes: string | null;
  data: unknown;
}): Workout {
  const data = (row.data as Partial<Workout>) || {};
  return {
    id: row.id,
    dayType: row.day_type as Workout['dayType'],
    dayLabel: row.day_label,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    weekISO: row.week_iso,
    endedEarly: row.ended_early,
    score: row.score,
    notes: row.notes,
    exercises: data.exercises ?? [],
  };
}

function workoutToRow(w: Workout) {
  return {
    id: w.id,
    day_type: w.dayType,
    day_label: w.dayLabel,
    started_at: w.startedAt,
    finished_at: w.finishedAt,
    week_iso: w.weekISO,
    ended_early: w.endedEarly,
    score: w.score,
    notes: w.notes,
    data: { exercises: w.exercises },
  };
}

export async function listWorkouts(): Promise<Workout[]> {
  if (hasSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(500);
      if (!error && data) {
        const workouts = data.map(rowToWorkout);
        writeLocal(workouts);
        return workouts;
      }
    } catch {
      // fall through to local
    }
  }
  return readLocal().sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export async function saveWorkout(w: Workout): Promise<void> {
  const local = readLocal();
  const idx = local.findIndex((x) => x.id === w.id);
  if (idx >= 0) local[idx] = w;
  else local.unshift(w);
  writeLocal(local);

  if (hasSupabase && supabase) {
    try {
      const { error } = await supabase.from('workouts').upsert(workoutToRow(w));
      if (error) throw error;
      const pending = readPending().filter((id) => id !== w.id);
      writePending(pending);
    } catch {
      const pending = readPending();
      if (!pending.includes(w.id)) {
        pending.push(w.id);
        writePending(pending);
      }
    }
  }
}

export async function deleteWorkout(id: string): Promise<void> {
  const local = readLocal().filter((x) => x.id !== id);
  writeLocal(local);
  if (hasSupabase && supabase) {
    await supabase.from('workouts').delete().eq('id', id);
  }
}

export async function syncPending(): Promise<number> {
  if (!hasSupabase || !supabase) return 0;
  const pending = readPending();
  if (!pending.length) return 0;
  const local = readLocal();
  const toSync = local.filter((w) => pending.includes(w.id));
  let synced = 0;
  for (const w of toSync) {
    const { error } = await supabase.from('workouts').upsert(workoutToRow(w));
    if (!error) synced++;
  }
  if (synced > 0) {
    const remaining = pending.filter((id) => !toSync.slice(0, synced).some((w) => w.id === id));
    writePending(remaining);
  }
  return synced;
}
