import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('custom-cursor-active');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    gsap.set([dot, ring], { autoAlpha: 1 });

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.05, ease: 'none' });
    };

    let raf = 0;
    const animate = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      gsap.set(ring, { x: rx, y: ry });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const hoverableSel = 'a, button, [role="button"], input, select, textarea, label, [data-hoverable]';

    const enterH = () => {
      if (hoveringRef.current) return;
      hoveringRef.current = true;
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 2.2, borderColor: 'rgba(77, 100, 83, 0.6)', duration: 0.3, ease: 'power2.out' });
    };
    const leaveH = () => {
      if (!hoveringRef.current) return;
      hoveringRef.current = false;
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 1, borderColor: 'rgba(77, 100, 83, 0.45)', duration: 0.3, ease: 'power2.out' });
    };

    const onDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.1 });
      gsap.to(ring, { scale: 0.85, duration: 0.1 });
    };
    const onUp = () => {
      gsap.to(dot, { scale: hoveringRef.current ? 0.5 : 1, duration: 0.2 });
      gsap.to(ring, { scale: hoveringRef.current ? 2.2 : 1, duration: 0.2 });
    };

    const onLeaveWin = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const onEnterWin = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

    const deEnter = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest(hoverableSel)) enterH();
    };
    const deLeave = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const rel = e.relatedTarget as Element | null;
      if (t?.closest(hoverableSel) && (!rel || !rel.closest(hoverableSel))) leaveH();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeaveWin);
    document.documentElement.addEventListener('mouseenter', onEnterWin);
    document.addEventListener('mouseover', deEnter);
    document.addEventListener('mouseout', deLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeaveWin);
      document.documentElement.removeEventListener('mouseenter', onEnterWin);
      document.removeEventListener('mouseover', deEnter);
      document.removeEventListener('mouseout', deLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#4d6453',
          transform: 'translate(-50%, -50%)',
          visibility: 'hidden',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(77, 100, 83, 0.45)',
          transform: 'translate(-50%, -50%)',
          visibility: 'hidden',
          willChange: 'transform',
        }}
      />
    </>
  );
}
