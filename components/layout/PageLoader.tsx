"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Only show loader on first visit (session-based)
    const hasVisited = sessionStorage.getItem("ua-visited");
    if (!hasVisited) {
      setShouldShow(true);
      sessionStorage.setItem("ua-visited", "1");
    }
  }, []);

  useGSAP(
    () => {
      if (!shouldShow || !containerRef.current) return;

      const container = containerRef.current;
      const logo = logoRef.current;

      // Start visible, animate out
      gsap.set(container, { autoAlpha: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Remove from DOM after animation
          if (container) {
            container.style.display = "none";
          }
        },
      });

      // Logo entrance
      tl.fromTo(
        logo,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      )
        .to(logo, { scale: 1.05, duration: 0.3, ease: "power1.inOut" }, "+=0.3")
        // Sweep away: scale up and fade
        .to(
          logo,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          },
          "+=0.1"
        )
        // Wipe the overlay up
        .to(
          container,
          {
            yPercent: -100,
            duration: 0.7,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
    },
    { scope: containerRef, dependencies: [shouldShow] }
  );

  if (!shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: "#061b0e",
        visibility: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #4d6453 0%, transparent 70%)",
        }}
      />

      {/* UA Monogram */}
      <div
        ref={logoRef}
        className="relative flex flex-col items-center gap-4"
        style={{ opacity: 0 }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Unax Aller UA monogram"
        >
          <rect width="80" height="80" rx="16" fill="#1b3022" />
          <text
            x="40"
            y="52"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="32"
            fontWeight="400"
            fill="#b4cdb8"
            letterSpacing="-1"
          >
            UA
          </text>
        </svg>

        <div className="flex flex-col items-center gap-1">
          <span
            style={{
              fontFamily: "Georgia, serif",
              color: "#b4cdb8",
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
              backgroundColor: "#4d6453",
            }}
          />
        </div>
      </div>
    </div>
  );
}
