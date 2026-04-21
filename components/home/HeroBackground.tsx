"use client";

import { useRef, useEffect, useCallback } from "react";

/*
 * Premium interactive background — optimized:
 *   - Defers RAF loop until "hero-entrance-done" event fires (no CPU competition during title reveal)
 *   - Spatial grid for O(n) neighbor connections instead of O(n²)
 *   - Throttles to 30fps on low-power devices (prefers-reduced-motion, mobile)
 *   - Pauses when tab hidden or hero scrolled out of view
 *   - Skips Layer 2 glow gradients (cheap radius-only particles)
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  baseRadius: number;
  phase: number;
}

interface Blob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  phase: number;
  speed: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const blobsRef = useRef<Blob[]>([]);
  const timeRef = useRef(0);
  const dprRef = useRef(1);
  const runningRef = useRef(false);
  const visibleRef = useRef(true);

  const initBlobs = useCallback((w: number, h: number) => {
    // Higher opacity — gives liquid glass something real to distort
    const colors = [
      "rgba(77, 100, 83, 0.18)",   // surface-tint green
      "rgba(180, 205, 184, 0.16)", // inverse-primary
      "rgba(54, 76, 60, 0.14)",    // on-primary-fixed-variant
      "rgba(208, 233, 212, 0.2)",  // primary-fixed
      "rgba(195, 200, 193, 0.12)", // outline-variant
    ];
    const blobs: Blob[] = [];
    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 250 + 180,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.004,
      });
    }
    blobsRef.current = blobs;
  }, []);

  const initParticles = useCallback((w: number, h: number, isMobile: boolean) => {
    // Aggressively cap on mobile — constellation work scales with n
    const cap = isMobile ? 35 : 60;
    const count = Math.min(Math.floor((w * h) / 22000), cap);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const baseRadius = Math.random() * 1.8 + 0.8;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: baseRadius,
        baseRadius,
        alpha: 0,
        targetAlpha: Math.random() * 0.6 + 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = coarsePointer || window.innerWidth < 768;

    // On reduced-motion, paint a single static frame and skip the RAF loop entirely
    const skipAnimation = reduceMotion;
    // On mobile/coarse pointer, halve the frame rate (30fps is plenty for ambient bg)
    const targetFrameInterval = isMobile ? 1000 / 30 : 1000 / 60;
    let lastFrameTime = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initBlobs(w, h);
      initParticles(w, h, isMobile);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false };
    };

    // Listen on parent for better coverage — skip on touch devices (no mouse cursor to track)
    const parent = canvas.parentElement;
    if (parent && !coarsePointer) {
      parent.addEventListener("mousemove", onMouseMove, { passive: true });
      parent.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }

    // Pause loop when tab hidden
    const onVisibilityChange = () => {
      visibleRef.current = document.visibilityState === "visible";
      if (visibleRef.current && runningRef.current && !skipAnimation) {
        lastFrameTime = 0;
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Pause loop when hero is scrolled off-screen
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const wasVisible = visibleRef.current;
          visibleRef.current = entry.isIntersecting;
          if (visibleRef.current && !wasVisible && runningRef.current && !skipAnimation) {
            lastFrameTime = 0;
            animFrameRef.current = requestAnimationFrame(draw);
          }
        }
      },
      { threshold: 0 }
    );
    if (parent) io.observe(parent);

    /* ─── Dot grid constants ─── */
    const dotSpacing = isMobile ? 56 : 40;
    const dotBaseRadius = 0.8;
    const dotBaseAlpha = 0.08;

    /* ─── Connection constants ─── */
    const connectionDist = 140;
    const connectionDistSq = connectionDist * connectionDist;
    const mouseInfluenceDist = 200;
    const mouseInfluenceDistSq = mouseInfluenceDist * mouseInfluenceDist;
    const mouseAttractionDist = 300;
    const mouseAttractionDistSq = mouseAttractionDist * mouseAttractionDist;

    const renderFrame = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const time = timeRef.current;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const blobs = blobsRef.current;

      ctx.clearRect(0, 0, w, h);

      /* ─── Layer 0: Dot Grid (cheap — skip mouse math when inactive) ─── */
      const cols = Math.ceil(w / dotSpacing) + 1;
      const rows = Math.ceil(h / dotSpacing) + 1;
      const baseColor = `rgba(77, 100, 83, ${dotBaseAlpha})`;

      if (!mouse.active) {
        // Fast path: all dots identical → one fill color, no math per dot
        ctx.fillStyle = baseColor;
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            ctx.beginPath();
            ctx.arc(col * dotSpacing, row * dotSpacing, dotBaseRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const dx = col * dotSpacing;
            const dy = row * dotSpacing;
            const mx = dx - mouse.x;
            const my = dy - mouse.y;
            const distSq = mx * mx + my * my;

            let radius = dotBaseRadius;
            let alpha = dotBaseAlpha;
            if (distSq < mouseInfluenceDistSq) {
              const t = 1 - Math.sqrt(distSq) / mouseInfluenceDist;
              radius += t * 2.5;
              alpha += t * 0.25;
            }

            ctx.beginPath();
            ctx.arc(dx, dy, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(77, 100, 83, ${alpha})`;
            ctx.fill();
          }
        }
      }

      /* ─── Layer 1: Organic Blobs ─── */
      for (const blob of blobs) {
        blob.phase += blob.speed;
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        const pulsedRadius = blob.radius + Math.sin(blob.phase) * 30;

        if (mouse.active) {
          const mx = mouse.x - blob.x;
          const my = mouse.y - blob.y;
          const mdSq = mx * mx + my * my;
          if (mdSq < 250000 && mdSq > 0) {
            const md = Math.sqrt(mdSq);
            blob.x += (mx / md) * 0.4;
            blob.y += (my / md) * 0.4;
          }
        }

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, pulsedRadius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(250, 249, 244, 0)");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, pulsedRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      /* ─── Layer 2: Particle constellation ─── */
      const skipGlow = isMobile; // gradient-per-particle is expensive; drop on mobile
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const mx = mouse.x - p.x;
          const my = mouse.y - p.y;
          const mdSq = mx * mx + my * my;

          if (mdSq < mouseAttractionDistSq && mdSq > 0) {
            const md = Math.sqrt(mdSq);
            const force = (mouseAttractionDist - md) / mouseAttractionDist;
            p.vx += (mx / md) * force * 0.06;
            p.vy += (my / md) * force * 0.06;

            if (mdSq < 10000) {
              p.radius = p.baseRadius + (1 - md / 100) * 3;
            }
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.05;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        p.phase += 0.015;
        const pulse = Math.sin(p.phase) * 0.15;

        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        p.alpha += (p.targetAlpha - p.alpha) * 0.03;

        const finalAlpha = Math.min(p.alpha + pulse, 1);

        if (!skipGlow && p.radius > 2) {
          const glow = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.radius * 4
          );
          glow.addColorStop(0, `rgba(180, 205, 184, ${finalAlpha * 0.3})`);
          glow.addColorStop(1, "rgba(180, 205, 184, 0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 100, 83, ${finalAlpha})`;
        ctx.fill();

        // Connections — squared distance, no sqrt when over threshold
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha =
              (1 - dist / connectionDist) * Math.min(p.alpha, q.alpha) * 0.4;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(77, 100, 83, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* ─── Layer 3: Mouse aurora glow (desktop only) ─── */
      if (mouse.active && !isMobile) {
        const auroraGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 280
        );
        auroraGrad.addColorStop(0, "rgba(180, 205, 184, 0.12)");
        auroraGrad.addColorStop(0.4, "rgba(77, 100, 83, 0.06)");
        auroraGrad.addColorStop(1, "rgba(250, 249, 244, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 280, 0, Math.PI * 2);
        ctx.fillStyle = auroraGrad;
        ctx.fill();

        const shimmerPhase = Math.sin(time * 0.02) * 0.04 + 0.06;
        const ringGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 100,
          mouse.x, mouse.y, 200
        );
        ringGrad.addColorStop(0, "rgba(208, 233, 212, 0)");
        ringGrad.addColorStop(0.5, `rgba(208, 233, 212, ${shimmerPhase})`);
        ringGrad.addColorStop(1, "rgba(208, 233, 212, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fillStyle = ringGrad;
        ctx.fill();
      }

      timeRef.current = time + 1;
    };

    const draw = (now?: number) => {
      if (!visibleRef.current) {
        // Bail out; onVisibilityChange/IntersectionObserver will restart
        return;
      }

      const timestamp = now ?? performance.now();
      const elapsed = timestamp - lastFrameTime;

      if (elapsed >= targetFrameInterval) {
        lastFrameTime = timestamp - (elapsed % targetFrameInterval);
        renderFrame();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    // Always paint one static frame immediately (so bg is not blank during hero entrance)
    renderFrame();

    const startLoop = () => {
      if (runningRef.current || skipAnimation) return;
      runningRef.current = true;
      lastFrameTime = 0;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    // Defer loop start until hero entrance completes — frees main thread during title reveal
    const onHeroReady = () => startLoop();
    window.addEventListener("hero-entrance-done", onHeroReady, { once: true });

    // Safety fallback: start loop after 2.5s even if event never fires
    const fallbackTimer = window.setTimeout(startLoop, 2500);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      runningRef.current = false;
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("hero-entrance-done", onHeroReady);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      io.disconnect();
      ro.disconnect();
      if (parent && !coarsePointer) {
        parent.removeEventListener("mousemove", onMouseMove);
        parent.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [initBlobs, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
}
