"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Fluid liquid-glass hover:
 *   - Spring-like lift + scale on enter, eased return on leave
 *   - Press/release feedback (scale-down on mousedown, scale-up on mouseup)
 *   - Ripple dot at cursor position on mousedown
 * Disabled on coarse pointers and reduced-motion.
 */
export function useLiquidGlassHover<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tweenY = gsap.quickTo(el, "y", { duration: 0.55, ease: "back.out(1.7)" });
    const tweenScale = gsap.quickTo(el, "scale", { duration: 0.55, ease: "back.out(1.7)" });

    const onEnter = () => {
      tweenY(-6);
      tweenScale(1.04);
    };

    const onLeave = () => {
      tweenY(0);
      tweenScale(1);
    };

    const onDown = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        margin-left: -3px;
        margin-top: -3px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(180, 205, 184, 0.55) 0%, rgba(180, 205, 184, 0) 70%);
        pointer-events: none;
        z-index: 2;
        will-change: transform, opacity;
      `;
      el.appendChild(ripple);

      gsap.to(ripple, {
        scale: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => ripple.remove(),
      });

      gsap.to(el, { scale: 0.97, duration: 0.15, ease: "power2.out", overwrite: "auto" });
    };

    const onUp = () => {
      gsap.to(el, { scale: 1.04, duration: 0.35, ease: "back.out(2)", overwrite: "auto" });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
    };
  }, []);

  return ref;
}
