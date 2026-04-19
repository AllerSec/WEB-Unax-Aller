import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getLockRemainingMs, tryLogin } from '../lib/auth';
import { hapticFail, hapticSuccess } from '../lib/haptics';
import { SplitHeading } from '../components/shared/SplitHeading';

interface Props {
  onAuthed: () => void;
}

export function LoginScreen({ onAuthed }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lockMs, setLockMs] = useState(getLockRemainingMs());
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const els = cardRef.current.querySelectorAll('.anim-in');
      gsap.fromTo(
        els,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.5 },
      );
    }
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (lockMs <= 0) return;
    const t = setInterval(() => {
      const r = getLockRemainingMs();
      setLockMs(r);
      if (r <= 0) setError(null);
    }, 500);
    return () => clearInterval(t);
  }, [lockMs]);

  function shake() {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { x: -10 }, { x: 0, duration: 0.45, ease: 'elastic.out(1, 0.3)' });
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || lockMs > 0) return;
    setLoading(true);
    setError(null);
    const res = await tryLogin(value);
    setLoading(false);
    if (res.ok) {
      hapticSuccess();
      if (cardRef.current) {
        gsap.to(cardRef.current, { autoAlpha: 0, scale: 0.96, duration: 0.3, ease: 'power2.in', onComplete: onAuthed });
      } else {
        onAuthed();
      }
      return;
    }
    hapticFail();
    shake();
    setValue('');
    if (res.lockedMs) {
      setLockMs(res.lockedMs);
      setError('Demasiados intentos. Espera un momento.');
    } else {
      setError(`Contraseña incorrecta${res.attemptsLeft != null ? ` · ${res.attemptsLeft} intento${res.attemptsLeft === 1 ? '' : 's'} restante${res.attemptsLeft === 1 ? '' : 's'}` : ''}`);
    }
  }

  const locked = lockMs > 0;
  const lockSecs = Math.ceil(lockMs / 1000);

  return (
    <div className="flex-1 min-h-screen relative overflow-hidden" style={{ background: 'var(--surface)' }}>
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 45% at 50% 45%, rgba(180, 205, 184, 0.18), transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Decorative circle */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: '-20%',
          right: '-20%',
          background: 'radial-gradient(circle, rgba(180, 205, 184, 0.25), transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex-1 min-h-screen flex items-center justify-center px-5 py-16 safe-top safe-bottom">
        <div className="w-full max-w-md">
          {/* Logo + label */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2.5 chip mb-6">
              <span className="w-1.5 h-1.5 rounded-full pulse-soft" style={{ background: 'var(--surface-tint)' }} />
              Acceso privado
            </div>
            <SplitHeading
              text="GymStats"
              as="h1"
              className="h-display text-5xl md:text-6xl"
              delay={0.2}
            />
            <p className="text-ink-muted mt-3 max-w-xs mx-auto leading-relaxed text-sm">
              Subproyecto privado de <a href="https://unaxaller.com" className="link-underline text-primary font-medium">unaxaller.com</a>
            </p>
          </div>

          <form
            ref={cardRef}
            onSubmit={submit}
            className="card p-7"
            style={{ boxShadow: '0 8px 40px rgba(6, 27, 14, 0.06)' }}
          >
            <div className="anim-in">
              <label className="u-label block mb-3">Contraseña</label>
              <input
                ref={inputRef}
                type="password"
                autoComplete="current-password"
                value={value}
                onChange={(e) => { setValue(e.target.value); if (error) setError(null); }}
                disabled={locked || loading}
                className="input-base w-full px-5 py-4 text-lg font-serif disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="anim-in mt-3 text-sm text-[color:var(--on-error-container)] font-medium">
                {error}{locked && ` (${lockSecs}s)`}
              </div>
            )}

            <button
              type="submit"
              disabled={locked || loading || !value}
              className="anim-in mt-5 w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2.5"
            >
              {loading ? 'Comprobando…' : locked ? `Espera ${lockSecs}s` : (
                <>
                  Entrar
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
