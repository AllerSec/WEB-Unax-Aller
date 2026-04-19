"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatProps {
  value: string;
  label: string;
  index: number;
}

function StatCard({ value, label, index }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Entrance animation
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Count-up for numeric values
      const numEl = numRef.current;
      if (!numEl) return;

      const raw = value.replace(/[^0-9.]/g, "");
      const num = parseFloat(raw);
      if (isNaN(num)) return;

      const suffix = value.replace(/[0-9.]/g, "");
      const isDecimal = raw.includes(".");

      const counter = { val: 0 };
      gsap.fromTo(
        counter,
        { val: 0 },
        {
          val: num,
          duration: 2,
          ease: "power2.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (!numEl) return;
            numEl.textContent = isDecimal
              ? counter.val.toFixed(1) + suffix
              : Math.round(counter.val) + suffix;
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 rounded-2xl"
      style={{
        backgroundColor: "#f5f4ef",
        border: "1px solid #e3e3de",
        opacity: 0,
      }}
    >
      <span
        ref={numRef}
        className="text-4xl md:text-5xl font-light mb-2 tabular-nums"
        style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
      >
        {value}
      </span>
      <span
        className="text-sm font-medium"
        style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function SocialProof() {
  const t = useTranslations("socialProof");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const stats = [
    { key: "stat1", value: t("stat1.value"), label: t("stat1.label") },
    { key: "stat2", value: t("stat2.value"), label: t("stat2.label") },
    { key: "stat3", value: t("stat3.value"), label: t("stat3.label") },
    { key: "stat4", value: t("stat4.value"), label: t("stat4.label") },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ backgroundColor: "#faf9f4" }}
      aria-labelledby="social-proof-title"
    >
      <div className="container-xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14" style={{ opacity: 0 }}>
          <h2
            id="social-proof-title"
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Stats grid — always 2×2, symmetric */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.key}
              value={stat.value}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
