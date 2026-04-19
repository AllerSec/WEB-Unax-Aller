import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  once?: boolean;
  y?: number;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  stagger = false,
  once = true,
  y = 40,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (stagger) {
        const kids = el.querySelectorAll(':scope > *');
        gsap.fromTo(
          kids,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            delay,
            scrollTrigger: { trigger: el, start: 'top 88%', once },
          },
        );
      } else {
        gsap.fromTo(
          el,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay,
            scrollTrigger: { trigger: el, start: 'top 88%', once },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, once, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
