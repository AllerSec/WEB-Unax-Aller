import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
}

/**
 * Reveal char-by-char heading in the style of the unaxaller.com hero.
 * Splits manually (no SplitText plugin license needed).
 */
export function SplitHeading({ text, className = '', as: Tag = 'h1', delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>('.hero-char');
    const ctx = gsap.context(() => {
      gsap.set(chars, { y: 60, autoAlpha: 0, rotateX: -40, transformOrigin: 'bottom center' });
      gsap.to(chars, {
        y: 0,
        autoAlpha: 1,
        rotateX: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { amount: 0.6, from: 'start' },
        delay,
      });
    }, el);
    return () => ctx.revert();
  }, [text, delay]);

  const words = text.split(' ');

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ perspective: '600px' }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="hero-word">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} className="hero-char">{ch}</span>
          ))}
          {wi < words.length - 1 && <span className="hero-char">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
