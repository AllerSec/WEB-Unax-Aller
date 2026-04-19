import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Props {
  onLogout?: () => void;
  showLogout?: boolean;
  right?: React.ReactNode;
}

export function TopBar({ onLogout, showLogout, right }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 });
    }
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-30 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250, 249, 244, 0.92)' : 'rgba(250, 249, 244, 0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid var(--outline-variant)' : '1px solid transparent',
      }}
    >
      <div className="safe-top" />
      <div className="px-5 h-16 flex items-center justify-between">
        <a href="https://unaxaller.com" className="flex items-center gap-2.5 group" aria-label="Unax Aller">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: '#061b0e' }}
          >
            <span
              style={{
                fontFamily: 'Newsreader, Georgia, serif',
                color: '#b4cdb8',
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.05em',
              }}
            >
              UA
            </span>
          </div>
          <div className="leading-none">
            <div className="text-sm font-medium text-primary">Unax Aller</div>
            <div className="text-[10px] text-ink-outline uppercase tracking-[0.22em] font-semibold mt-0.5">GymStats</div>
          </div>
        </a>
        <div className="flex items-center gap-2">
          {right}
          {showLogout && onLogout && (
            <button
              onClick={onLogout}
              className="btn-icon"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
