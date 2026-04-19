"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    // Show cursors
    gsap.set([dot, ring], { autoAlpha: 1 });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.05,
        ease: "none",
      });
    };

    // Ring follows with lag (RAF loop)
    let rafId: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    const onMouseEnterHoverable = () => {
      if (isHoveringRef.current) return;
      isHoveringRef.current = true;
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, {
        scale: 2.2,
        borderColor: "rgba(77, 100, 83, 0.6)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeaveHoverable = () => {
      if (!isHoveringRef.current) return;
      isHoveringRef.current = false;
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(77, 100, 83, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.1 });
      gsap.to(ring, { scale: 0.85, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: isHoveringRef.current ? 0.5 : 1, duration: 0.2, ease: "spring(1, 100, 20, 0)" });
      gsap.to(ring, { scale: isHoveringRef.current ? 2.2 : 1, duration: 0.2, ease: "spring(1, 100, 20, 0)" });
    };

    const onMouseLeaveWindow = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    };

    const onMouseEnterWindow = () => {
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
    };

    // Attach event listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onMouseEnterWindow);

    // Delegate hover events for interactive elements
    const hoverableSelector =
      'a, button, [role="button"], input, select, textarea, label, [data-hoverable]';

    const delegateEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(hoverableSelector)) {
        onMouseEnterHoverable();
      }
    };
    const delegateLeave = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as Element | null;
      const target = e.target as Element;
      if (
        target.closest(hoverableSelector) &&
        (!relatedTarget || !relatedTarget.closest(hoverableSelector))
      ) {
        onMouseLeaveHoverable();
      }
    };

    document.addEventListener("mouseover", delegateEnter);
    document.addEventListener("mouseout", delegateLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseover", delegateEnter);
      document.removeEventListener("mouseout", delegateLeave);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#4d6453",
          transform: "translate(-50%, -50%)",
          visibility: "hidden",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(77, 100, 83, 0.5)",
          transform: "translate(-50%, -50%)",
          visibility: "hidden",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
