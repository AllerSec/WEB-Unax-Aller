export type DayType = 'push' | 'pull' | 'leg' | 'shoulder';

export type ExerciseCategory =
  | 'compound'
  | 'isolation-arm'
  | 'isolation-shoulder'
  | 'isolation-leg'
  | 'core'
  | 'cardio';

export interface ExerciseTemplate {
  id: string;
  name: string;
  muscle: string;
  category: ExerciseCategory;
  image: string;
  sets: number;
  repRange: [number, number];
  restSec: number;
  notes?: string;
}

export interface DayTemplate {
  type: DayType;
  label: string;
  color: string;
  emoji: string;
  exercises: ExerciseTemplate[];
}

export interface LoggedSet {
  setIndex: number;
  targetReps: [number, number];
  recommendedWeight: number | null;
  weight: number | null;
  reps: number | null;
  completed: boolean;
  failed: boolean;
  startedAt: string | null;
  finishedAt: string | null;
}

export interface LoggedExercise {
  exerciseId: string;
  exerciseName: string;
  muscle: string;
  category: ExerciseCategory;
  sets: LoggedSet[];
  skipped: boolean;
}

export interface Workout {
  id: string;
  dayType: DayType;
  dayLabel: string;
  startedAt: string;
  finishedAt: string | null;
  weekISO: string;
  exercises: LoggedExercise[];
  endedEarly: boolean;
  score: number | null;
  notes: string | null;
}

export interface ProgressPoint {
  date: string;
  weight: number;
  reps: number;
  volume: number;
}
