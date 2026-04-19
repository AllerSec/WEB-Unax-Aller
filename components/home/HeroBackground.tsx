"use client";

import { useRef, useEffect, useCallback } from "react";

/*
 * Premium interactive background:
 *   Layer 0 — Subtle dot grid
 *   Layer 1 — Floating organic blobs (mesh-gradient feel)
 *   Layer 2 — Connected particle constellation
 *   Layer 3 — Mouse-following aurora glow
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
  phase: number; // for pulsing
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

  const initBlobs = useCallback((w: number, h: number) => {
    const colors = [
      "rgba(77, 100, 83, 0.08)",   // surface-tint green
      "rgba(180, 205, 184, 0.06)", // inverse-primary
      "rgba(54, 76, 60, 0.05)",    // on-primary-fixed-variant
      "rgba(208, 233, 212, 0.07)", // primary-fixed
      "rgba(195, 200, 193, 0.04)", // outline-variant
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

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 15000), 100);
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
      initParticles(w, h);
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

    // Listen on parent for better coverage
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", onMouseMove);
      parent.addEventListener("mouseleave", onMouseLeave);
    }

    /* ─── Dot grid constants ─── */
    const dotSpacing = 40;
    const dotBaseRadius = 0.8;
    const dotBaseAlpha = 0.08;

    /* ─── Connection constants ─── */
    const connectionDist = 140;
    const mouseInfluenceDist = 200;
    const mouseAttractionDist = 300;

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const time = timeRef.current;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const blobs = blobsRef.current;

      ctx.clearRect(0, 0, w, h);

      /* ─── Layer 0: Dot Grid ─── */
      const cols = Math.ceil(w / dotSpacing) + 1;
      const rows = Math.ceil(h / dotSpacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dx = col * dotSpacing;
          const dy = row * dotSpacing;

          let radius = dotBaseRadius;
          let alpha = dotBaseAlpha;

          // Proximity to mouse — dots grow and brighten
          if (mouse.active) {
            const mx = dx - mouse.x;
            const my = dy - mouse.y;
            const dist = Math.sqrt(mx * mx + my * my);
            if (dist < mouseInfluenceDist) {
              const t = 1 - dist / mouseInfluenceDist;
              radius += t * 2.5;
              alpha += t * 0.25;
            }
          }

          ctx.beginPath();
          ctx.arc(dx, dy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(77, 100, 83, ${alpha})`;
          ctx.fill();
        }
      }

      /* ─── Layer 1: Organic Blobs ─── */
      for (const blob of blobs) {
        blob.phase += blob.speed;
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off edges softly
        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        const pulsedRadius = blob.radius + Math.sin(blob.phase) * 30;

        // Mouse attraction — blobs drift towards cursor
        if (mouse.active) {
          const mx = mouse.x - blob.x;
          const my = mouse.y - blob.y;
          const md = Math.sqrt(mx * mx + my * my);
          if (md < 500 && md > 0) {
            blob.x += (mx / md) * 0.4;
            blob.y += (my / md) * 0.4;
          }
        }

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          pulsedRadius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(250, 249, 244, 0)");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, pulsedRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      /* ─── Layer 2: Particle constellation ─── */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction — attraction + glow
        if (mouse.active) {
          const mx = mouse.x - p.x;
          const my = mouse.y - p.y;
          const md = Math.sqrt(mx * mx + my * my);

          if (md < mouseAttractionDist && md > 0) {
            const force = (mouseAttractionDist - md) / mouseAttractionDist;
            // Gentle attraction toward cursor
            p.vx += (mx / md) * force * 0.06;
            p.vy += (my / md) * force * 0.06;

            // Near cursor → pulse bigger
            if (md < 100) {
              p.radius = p.baseRadius + (1 - md / 100) * 3;
            }
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.05;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        // Gentle pulsing
        p.phase += 0.015;
        const pulse = Math.sin(p.phase) * 0.15;

        // Speed damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Fade in
        p.alpha += (p.targetAlpha - p.alpha) * 0.03;

        const finalAlpha = Math.min(p.alpha + pulse, 1);

        // Draw glow
        if (p.radius > 2) {
          const glow = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.radius * 4
          );
          glow.addColorStop(0, `rgba(180, 205, 184, ${finalAlpha * 0.3})`);
          glow.addColorStop(1, "rgba(180, 205, 184, 0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 100, 83, ${finalAlpha})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha =
              (1 - dist / connectionDist) *
              Math.min(p.alpha, q.alpha) *
              0.4;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(77, 100, 83, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      /* ─── Layer 3: Mouse aurora glow ─── */
      if (mouse.active) {
        // Main glow
        const auroraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          280
        );
        auroraGrad.addColorStop(0, "rgba(180, 205, 184, 0.12)");
        auroraGrad.addColorStop(0.4, "rgba(77, 100, 83, 0.06)");
        auroraGrad.addColorStop(1, "rgba(250, 249, 244, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 280, 0, Math.PI * 2);
        ctx.fillStyle = auroraGrad;
        ctx.fill();

        // Secondary shimmer ring
        const shimmerPhase = Math.sin(time * 0.02) * 0.04 + 0.06;
        const ringGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          100,
          mouse.x,
          mouse.y,
          200
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
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      if (parent) {
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
