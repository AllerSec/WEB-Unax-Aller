"use client";

import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type Mode = "pending" | "animate" | "skip";

// External store: reads sessionStorage to decide whether the loader plays.
// On first hydration the value is "pending"; once subscribed (post-mount)
// we either mark "skip" (already visited this session) or "animate" and
// flag the visit so subsequent navigations skip it.
const subscribe = () => () => {};
const getServerSnapshot = (): Mode => "pending";
const getClientSnapshot = (): Mode => {
  try {
    if (sessionStorage.getItem("ua-visited")) return "skip";
    sessionStorage.setItem("ua-visited", "1");
    return "animate";
  } catch {
    return "animate";
  }
};

export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mode = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useGSAP(
    () => {
      if (mode !== "animate" || !containerRef.current) return;

      const container = containerRef.current;
      const logo = logoRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          if (container) {
            container.style.display = "none";
          }
        },
      });

      tl.fromTo(
        logo,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .to(logo, { scale: 1.05, duration: 0.3, ease: "power1.inOut" }, "+=0.3")
        .to(
          logo,
          { scale: 0.8, opacity: 0, duration: 0.4, ease: "power3.in" },
          "+=0.1"
        )
        // Release pointer events before the slide-out so any tap during the
        // 0.7s exit animation reaches the page underneath (avoids INP hits).
        .set(container, { pointerEvents: "none" })
        .to(
          container,
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          "-=0.1"
        );
    },
    { scope: containerRef, dependencies: [mode] }
  );

  if (mode === "skip") return null;

  return (
    <div
      ref={containerRef}
      id="ua-page-loader"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, var(--color-ink-subtle) 0%, transparent 70%)",
        }}
      />

      <div
        ref={logoRef}
        className="relative flex flex-col items-center gap-4"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Unax Aller UA monogram"
        >
          <rect width="80" height="80" rx="16" fill="var(--color-line)" />
          <text
            x="40"
            y="52"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="32"
            fontWeight="400"
            fill="var(--color-accent)"
            letterSpacing="-1"
          >
            UA
          </text>
        </svg>

        <div className="flex flex-col items-center gap-1">
          <span
            style={{
              fontFamily: "Georgia, serif",
              color: "var(--color-accent)",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Unax Aller
          </span>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "var(--color-ink-subtle)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
