"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/i18n/config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { locale: Locale };

export default function ProcessStrip({ locale }: Props) {
  const t = useTranslations("homeProcess");
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    { number: t("steps.0.number"), title: t("steps.0.title"), desc: t("steps.0.desc") },
    { number: t("steps.1.number"), title: t("steps.1.title"), desc: t("steps.1.desc") },
    { number: t("steps.2.number"), title: t("steps.2.title"), desc: t("steps.2.desc") },
    { number: t("steps.3.number"), title: t("steps.3.title"), desc: t("steps.3.desc") },
  ];

  useGSAP(
    () => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>("[data-process-step]");
      if (!items?.length) return;
      const triggers = ScrollTrigger.batch(items, {
        interval: 0.1,
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
          });
        },
      });
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="process-strip" aria-labelledby="process-strip-title">
      <div className="container-xl">
        <div className="process-strip-header">
          <span className="process-strip-eyebrow">{t("eyebrow")}</span>
          <h2 id="process-strip-title" className="process-strip-title">{t("title")}</h2>
        </div>
        <div className="process-strip-steps">
          {steps.map((step) => (
            <div
              key={step.number}
              data-process-step
              className="process-strip-step"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              <span className="process-strip-step-number" aria-hidden="true">{step.number}</span>
              <h3 className="process-strip-step-title">{step.title}</h3>
              <p className="process-strip-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="process-strip-cta">
          <Link href={`/${locale}/contacto`} className="btn btn-primary focusable">
            {t("cta")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
