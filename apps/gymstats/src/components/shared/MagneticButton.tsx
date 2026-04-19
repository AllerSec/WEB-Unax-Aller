import { useCallback, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  as?: 'button' | 'div';
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  disabled,
  type = 'button',
  ariaLabel,
  as = 'button',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || disabled) return;
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    },
    [strength, disabled],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  }, []);

  const common = {
    className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    style: { display: 'inline-block', willChange: 'transform' as const },
  };

  if (as === 'div') {
    return (
      <div ref={(r) => { ref.current = r; }} {...common} role="button" aria-label={ariaLabel}>
        {children}
      </div>
    );
  }
  return (
    <button
      ref={(r) => { ref.current = r; }}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      {...common}
    >
      {children}
    </button>
  );
}
