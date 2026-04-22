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
  return (
    <div
      data-stat-card
      data-stat-value={value}
      className="stat-card"
    >
      <span data-stat-number className="stat-card-value">
        {value}
      </span>
      <span className="stat-card-label">{label}</span>
    </div>
  );
}

export default function ContactStats() {
  const t = useTranslations("contact.stats");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        headerRef.current,
        { y: 28, opacity: 0 },
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
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              numEl.textContent = isDecimal
                ? counter.val.toFixed(1) + suffix
                : Math.round(counter.val) + suffix;
            },
          }
        );
      };

      const floatTweens: gsap.core.Tween[] = [];

      const enterTriggers = ScrollTrigger.batch("[data-stat-card]", {
        interval: 0.08,
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
            onComplete: () => {
              if (reduced) return;
              batch.forEach((card, i) => {
                const tween = gsap.to(card, {
                  y: "-=8",
                  duration: 2.4 + i * 0.15,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                  delay: i * 0.2,
                });
                floatTweens.push(tween);
              });
            },
          });
          batch.forEach(countUp);
        },
      });

      return () => {
        enterTriggers.forEach((trigger) => trigger.kill());
        floatTweens.forEach((tween) => tween.kill());
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
      className="contact-stats-section"
      aria-labelledby="contact-stats-title"
    >
      <div className="container-xl">
        <div ref={headerRef} className="social-proof-header">
          <h2 id="contact-stats-title" className="social-proof-title">
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
