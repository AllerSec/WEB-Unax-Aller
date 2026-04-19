import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { DayType, Workout } from '../types';
import { ROUTINES, DAY_TYPES } from '../data/routines';
import { formatFullDate, isoWeek, timeAgo } from '../lib/date';
import { hasSupabase } from '../lib/supabase';
import { hasPassword } from '../lib/auth';
import { haptic } from '../lib/haptics';
import { TopBar } from '../components/TopBar';
import { SplitHeading } from '../components/shared/SplitHeading';
import { CalendarView } from '../components/CalendarView';

interface Props {
  history: Workout[];
  loading: boolean;
  onStart: (day: DayType) => void;
  onHistory: () => void;
  onLogout: () => void;
}

export function Home({ history, loading, onStart, onHistory, onLogout }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const week = isoWeek(now);
  const weekNum = week.split('-W')[1];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.anim-hero'),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3 },
        );
      }
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll('.day-card'),
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.7 },
        );
      }
      if (calendarRef.current) {
        gsap.fromTo(
          calendarRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 1.0 },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const lastByDay: Record<string, Workout | undefined> = {};
  for (const w of history) {
    if (!lastByDay[w.dayType]) lastByDay[w.dayType] = w;
  }

  const finishedThisWeek = history.filter((w) => w.weekISO === week && w.finishedAt).length;

  return (
    <div className="flex-1 relative">
      <TopBar showLogout={hasPassword} onLogout={onLogout} />

      {/* Hero decorative blobs */}
      <div className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden" style={{ height: 600 }} aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500, top: -150, right: -150,
            background: 'radial-gradient(circle, rgba(180, 205, 184, 0.35), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400, top: 200, left: -180,
            background: 'radial-gradient(circle, rgba(208, 233, 212, 0.3), transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative container-xl pb-24 pt-6">
        {/* Hero */}
        <div ref={heroRef} className="pt-4 md:pt-8">
          <div className="anim-hero inline-flex items-center chip">
            <span className="w-1.5 h-1.5 rounded-full mr-2 pulse-soft" style={{ background: 'var(--surface-tint)' }} />
            Semana {weekNum}
          </div>

          <div className="anim-hero mt-6">
            <SplitHeading
              text={formatFullDate(now)}
              as="h1"
              className="h-display text-4xl md:text-5xl lg:text-6xl capitalize"
              delay={0.5}
            />
          </div>

          <p className="anim-hero text-ink-muted mt-4 text-base md:text-lg max-w-xl leading-relaxed">
            {finishedThisWeek === 0 && 'Sin entrenos esta semana. Elige un día y empieza.'}
            {finishedThisWeek === 1 && 'Un entreno hecho esta semana. Mantén el ritmo.'}
            {finishedThisWeek === 2 && 'Dos entrenos esta semana. Así se hace.'}
            {finishedThisWeek >= 3 && `${finishedThisWeek} entrenos esta semana. Crack.`}
          </p>

          {!hasSupabase && (
            <div className="anim-hero mt-4 card-soft p-4 text-sm text-ink-muted">
              Modo local. Configura Supabase en <code className="font-mono text-primary">.env</code> para sincronizar entre dispositivos.
            </div>
          )}

          <div className="anim-hero mt-6 flex flex-wrap gap-3">
            <button onClick={onHistory} className="btn-ghost text-sm inline-flex items-center gap-2">
              Ver historial
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Day cards */}
        <div className="mt-14">
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <div className="u-label">Elige día</div>
              <h2 className="h-display text-2xl md:text-3xl mt-1.5">
                ¿Qué entrenamos <span className="h-display-italic">hoy</span>?
              </h2>
            </div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {DAY_TYPES.map((key) => {
              const routine = ROUTINES[key];
              const last = lastByDay[key];
              return (
                <button
                  key={key}
                  onClick={() => { haptic(12); onStart(key); }}
                  className="day-card group relative overflow-hidden card card-hover p-5 text-left transition-all"
                  style={{ minHeight: 180 }}
                >
                  <div
                    className="absolute -right-10 -top-10 w-36 h-36 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: routine.color, filter: 'blur(30px)' }}
                  />
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full" style={{ background: routine.color }} />
                      <span className="u-label" style={{ color: routine.color }}>{routine.type}</span>
                    </div>
                    <div className="h-display text-2xl md:text-3xl">
                      {routine.label}
                    </div>
                    <div className="text-xs text-ink-outline mt-2 font-mono">
                      {routine.exercises.length} ejercicios
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="text-[11px] text-ink-outline font-mono">
                        {last ? timeAgo(last.startedAt) : 'sin registros'}
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:border-current"
                        style={{ borderColor: `${routine.color}40`, color: routine.color }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar + recent history */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div ref={calendarRef} className="lg:col-span-3">
            <CalendarView history={history} />
          </div>

          <div className="lg:col-span-2">
            <div className="card p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="u-label">Reciente</div>
                  <h3 className="h-display text-xl mt-1">Últimos entrenos</h3>
                </div>
                <button onClick={onHistory} className="text-xs text-primary-tint link-underline">Ver todo</button>
              </div>

              {loading ? (
                <div className="space-y-2 flex-1">
                  <div className="card-inset h-16 shimmer" />
                  <div className="card-inset h-16 shimmer" />
                </div>
              ) : history.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-center py-8">
                  <div>
                    <div className="text-sm text-ink-muted">Aún no hay entrenos.</div>
                    <div className="text-xs text-ink-outline mt-1">Empieza eligiendo un día.</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 flex-1">
                  {history.slice(0, 4).map((w) => {
                    const routine = ROUTINES[w.dayType];
                    return (
                      <div
                        key={w.id}
                        className="card-inset p-3 flex items-center gap-3"
                      >
                        <div
                          className="w-10 h-10 rounded-xl2 flex items-center justify-center text-[11px] font-mono font-bold border shrink-0"
                          style={{
                            background: `${routine.color}12`,
                            color: routine.color,
                            borderColor: `${routine.color}35`,
                            borderRadius: 10,
                          }}
                        >
                          {routine.type.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate text-sm text-primary">{w.dayLabel}</div>
                          <div className="text-[11px] text-ink-outline font-mono">
                            {timeAgo(w.startedAt)}
                          </div>
                        </div>
                        {w.score != null && (
                          <div className="text-right shrink-0">
                            <div className="font-serif text-xl font-light leading-none">{w.score}</div>
                            <div className="u-label text-[9px] mt-0.5">score</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
