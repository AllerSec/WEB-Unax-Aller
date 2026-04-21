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
}

function StatCard({ value, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  return (
    <div
      ref={ref}
      data-stat-card
      data-stat-value={value}
      className="stat-card"
    >
      <span ref={numRef} data-stat-number className="stat-card-value">
        {value}
      </span>
      <span className="stat-card-label">{label}</span>
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

      // Count-up helper: animate the number inside a card from 0 → target
      const countUp = (card: Element) => {
        const numEl = card.querySelector<HTMLSpanElement>("[data-stat-number]");
        const rawValue = card.getAttribute("data-stat-value") || "";
        if (!numEl || !rawValue) return;
        const raw = rawValue.replace(/[^0-9.]/g, "");
        const num = parseFloat(raw);
        if (isNaN(num)) return;
        const suffix = rawValue.replace(/[0-9.]/g, "");
        const isDecimal = raw.includes(".");
        const counter = { val: 0 };
        gsap.fromTo(
          counter,
          { val: 0 },
          {
            val: num,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              numEl.textContent = isDecimal
                ? counter.val.toFixed(1) + suffix
                : Math.round(counter.val) + suffix;
            },
          }
        );
      };

      // Batch entrance + count-up (fires once)
      const enterTriggers = ScrollTrigger.batch("[data-stat-card]", {
        interval: 0.08,
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: "auto",
          });
          batch.forEach(countUp);
        },
      });

      // Pulse on re-entry — scroll up then back down gives a subtle re-focus
      const pulseTriggers = ScrollTrigger.batch("[data-stat-card]", {
        interval: 0.08,
        start: "top 85%",
        onEnterBack: (batch) => {
          gsap.fromTo(
            batch,
            { scale: 0.98 },
            {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.05,
              overwrite: "auto",
            }
          );
        },
      });

      return () => {
        enterTriggers.forEach((trigger) => trigger.kill());
        pulseTriggers.forEach((trigger) => trigger.kill());
      };
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
      className="social-proof-section"
      aria-labelledby="social-proof-title"
    >
      <div className="container-xl">
        <div ref={headerRef} className="social-proof-header">
          <h2 id="social-proof-title" className="social-proof-title">
            {t("title")}
          </h2>
          <p className="social-proof-subtitle">{t("subtitle")}</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
