import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { formatClock } from '../lib/date';
import { haptic, hapticSuccess } from '../lib/haptics';

interface Props {
  seconds: number;
  onDone: () => void;
  onSkip: () => void;
  accent: string;
}

export function RestTimer({ seconds: initial, onDone, onSkip, accent }: Props) {
  const [remaining, setRemaining] = useState(initial);
  const [total, setTotal] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: 120, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' });
    }
    haptic(10);
  }, []);

  useEffect(() => {
    if (remaining <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        hapticSuccess();
        setTimeout(onDone, 400);
      }
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onDone]);

  const pct = total > 0 ? Math.max(0, (remaining / total) * 100) : 0;

  function adjust(delta: number) {
    haptic(8);
    setRemaining((r) => Math.max(0, r + delta));
    setTotal((t) => Math.max(total, t + delta));
  }

  function close() {
    if (ref.current) {
      gsap.to(ref.current, { y: 120, autoAlpha: 0, duration: 0.25, ease: 'power2.in', onComplete: onSkip });
    } else {
      onSkip();
    }
  }

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pointer-events-none"
      style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
    >
      <div className="card pointer-events-auto relative overflow-hidden p-4" style={{ boxShadow: '0 -8px 40px rgba(6, 27, 14, 0.1)' }}>
        <div
          className="absolute left-0 bottom-0 h-[3px] transition-[width] duration-1000 linear"
          style={{ width: `${pct}%`, background: accent }}
        />
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
              <circle cx="28" cy="28" r="24" fill="none" stroke="#e3e3de" strokeWidth="3" />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke={accent}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={2 * Math.PI * 24 * (1 - pct / 100)}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="u-label">Descanso</div>
            <div className="font-serif text-3xl font-light leading-none mt-1 text-primary">{formatClock(remaining)}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <button onClick={() => adjust(15)} className="px-3 py-1.5 rounded-xl2 bg-surface-container border border-ink-line text-[11px] font-bold text-primary-tint active:scale-95 hover:border-primary-tint transition" style={{ borderRadius: 10 }}>+15s</button>
            <button onClick={() => adjust(-15)} className="px-3 py-1.5 rounded-xl2 bg-surface-container border border-ink-line text-[11px] font-bold text-primary-tint active:scale-95 hover:border-primary-tint transition" style={{ borderRadius: 10 }}>−15s</button>
          </div>
        </div>
        <button onClick={close} className="mt-3 w-full btn-primary py-3 text-sm">
          Saltar descanso
        </button>
      </div>
    </div>
  );
}
