-- GymStats schema. Ejecutar una sola vez en Supabase SQL editor.
-- Un solo usuario (tú). RLS permite lectura/escritura anónima ya que la URL es privada.

create table if not exists workouts (
  id uuid primary key default gen_random_uuid(),
  day_type text not null,
  day_label text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  week_iso text not null,
  ended_early boolean not null default false,
  score int,
  notes text,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists workouts_started_at_idx on workouts(started_at desc);
create index if not exists workouts_day_type_idx on workouts(day_type);
create index if not exists workouts_week_iso_idx on workouts(week_iso);

alter table workouts enable row level security;

drop policy if exists "anon full access workouts" on workouts;
create policy "anon full access workouts" on workouts
  for all
  to anon
  using (true)
  with check (true);
