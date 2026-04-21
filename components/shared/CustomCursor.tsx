"use client";

import { useEffect, useRef } from "react";

const DOT_SIZE = 8;
const RING_SIZE = 36;
const RING_LERP = 0.18;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotScale = 1;
    let ringScale = 1;
    let dotScaleCurrent = 1;
    let ringScaleCurrent = 1;
    let visible = false;
    let hoverActive = false;
    let pressed = false;
    let ringBorderAlpha = 0.5;

    // Initial placement
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(1)`;

    const showCursors = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hideCursors = () => {
      if (!visible) return;
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) showCursors();
    };

    // Single RAF — writes to style.transform directly, no GSAP in hot path
    let rafId = 0;
    const tick = () => {
      // Ring follows with lerp
      ringX += (mouseX - ringX) * RING_LERP;
      ringY += (mouseY - ringY) * RING_LERP;

      // Smooth scale interpolation
      dotScaleCurrent += (dotScale - dotScaleCurrent) * 0.22;
      ringScaleCurrent += (ringScale - ringScaleCurrent) * 0.22;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${dotScaleCurrent.toFixed(3)})`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${ringScaleCurrent.toFixed(3)})`;
      ring.style.borderColor = `rgba(77, 100, 83, ${ringBorderAlpha})`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const applyState = () => {
      if (pressed) {
        dotScale = hoverActive ? 0.35 : 0.7;
        ringScale = hoverActive ? 1.9 : 0.85;
      } else {
        dotScale = hoverActive ? 0.5 : 1;
        ringScale = hoverActive ? 2.2 : 1;
      }
      ringBorderAlpha = hoverActive ? 0.6 : 0.5;
    };

    const onMouseDown = () => {
      pressed = true;
      applyState();
    };
    const onMouseUp = () => {
      pressed = false;
      applyState();
    };

    const onWindowEnter = () => showCursors();
    const onWindowLeave = () => hideCursors();

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseup", onMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onWindowLeave);
    document.documentElement.addEventListener("mouseenter", onWindowEnter);

    const hoverableSelector =
      'a, button, [role="button"], input, select, textarea, label, [data-hoverable]';

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target && target.closest(hoverableSelector)) {
        if (!hoverActive) {
          hoverActive = true;
          applyState();
        }
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const related = e.relatedTarget as Element | null;
      if (
        target &&
        target.closest(hoverableSelector) &&
        (!related || !related.closest(hoverableSelector))
      ) {
        if (hoverActive) {
          hoverActive = false;
          applyState();
        }
      }
    };

    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onWindowLeave);
      document.documentElement.removeEventListener("mouseenter", onWindowEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          marginLeft: `-${DOT_SIZE / 2}px`,
          marginTop: `-${DOT_SIZE / 2}px`,
          borderRadius: "50%",
          backgroundColor: "#4d6453",
          opacity: 0,
          willChange: "transform",
          contain: "layout style paint",
          transition: "opacity 180ms ease",
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          width: `${RING_SIZE}px`,
          height: `${RING_SIZE}px`,
          marginLeft: `-${RING_SIZE / 2}px`,
          marginTop: `-${RING_SIZE / 2}px`,
          borderRadius: "50%",
          border: "1.5px solid rgba(77, 100, 83, 0.5)",
          opacity: 0,
          willChange: "transform",
          contain: "layout style paint",
          transition: "opacity 180ms ease",
        }}
        aria-hidden="true"
      />
    </>
  );
}
