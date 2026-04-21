"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  /** Background color of the surrounding section — divider uses this so it blends */
  background?: string;
  /** Accent color for the line gradient */
  accent?: string;
  /** Vertical padding in px. Default 48 */
  padding?: number;
};

/**
 * Thin horizontal line that paints itself on scroll — a quiet visual beat
 * between sections. Uses scaleX with transform-origin: left center and scrub,
 * so the line "draws" from left to right as the user scrolls through it.
 */
export default function SectionDivider({
  background = "#faf9f4",
  accent = "rgba(77, 100, 83, 0.35)",
  padding = 48,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      const wrapper = wrapperRef.current;
      if (!line || !wrapper) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(line, { scaleX: 1, opacity: 1 });
        return;
      }

      const tween = gsap.fromTo(
        line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: "none" }
      );

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top 85%",
        end: "bottom 65%",
        scrub: 0.5,
        animation: tween,
      });

      return () => {
        st.kill();
        tween.kill();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{ backgroundColor: background, paddingTop: padding, paddingBottom: padding }}
    >
      <div className="container-xl">
        <div
          ref={lineRef}
          className="h-px w-full max-w-[220px] mx-auto"
          style={{
            background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
            transformOrigin: "left center",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </div>
  );
}
