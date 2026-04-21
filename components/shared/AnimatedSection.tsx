"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: boolean;
  once?: boolean;
};

export default function AnimatedSection({
  children,
  className = "",
  style,
  delay = 0,
  stagger = false,
  once = true,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const baseClass = stagger ? "anim-stagger" : "anim-section";
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(delay ? { ["--anim-delay" as string]: `${delay}s` } : {}),
  };

  return (
    <div ref={sectionRef} className={`${baseClass} ${className}`.trim()} style={mergedStyle}>
      {children}
    </div>
  );
}
