"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  once?: boolean;
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  stagger = false,
  once = true,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      if (stagger) {
        // Batch animate direct children
        const children = el.querySelectorAll(":scope > *");
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
