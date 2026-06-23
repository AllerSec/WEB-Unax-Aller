"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CLIENTS_BY_LOCALE: Record<"es" | "en" | "eu", { name: string; url: string; sector: string }[]> = {
  es: [
    { name: "Farmacia Fernandez Bera", url: "https://farmaciafernandezbera.com", sector: "Farmacia · Bera" },
    { name: "Motos Arretxe", url: "https://motosarretxe.com", sector: "Motos · Irun" },
    { name: "Anaka Optica", url: "https://anakaoptica.com", sector: "Óptica · Irun" },
    { name: "VirtuoSolve", url: "https://virtuosolve.com", sector: "IA · Irun" },
    { name: "Tecmac", url: "https://tecmac.es", sector: "Industria · Navarra" },
    { name: "Boralan", url: "https://boralan.eus", sector: "Forestal · Navarra" },
  ],
  en: [
    { name: "Farmacia Fernandez Bera", url: "https://farmaciafernandezbera.com", sector: "Pharmacy · Bera" },
    { name: "Motos Arretxe", url: "https://motosarretxe.com", sector: "Motorbikes · Irun" },
    { name: "Anaka Optica", url: "https://anakaoptica.com", sector: "Optician · Irun" },
    { name: "VirtuoSolve", url: "https://virtuosolve.com", sector: "AI · Irun" },
    { name: "Tecmac", url: "https://tecmac.es", sector: "Industry · Navarre" },
    { name: "Boralan", url: "https://boralan.eus", sector: "Forestry · Navarre" },
  ],
  eu: [
    { name: "Farmacia Fernandez Bera", url: "https://farmaciafernandezbera.com", sector: "Farmazia · Bera" },
    { name: "Motos Arretxe", url: "https://motosarretxe.com", sector: "Motorrak · Irun" },
    { name: "Anaka Optica", url: "https://anakaoptica.com", sector: "Optika · Irun" },
    { name: "VirtuoSolve", url: "https://virtuosolve.com", sector: "AA · Irun" },
    { name: "Tecmac", url: "https://tecmac.es", sector: "Industria · Nafarroa" },
    { name: "Boralan", url: "https://boralan.eus", sector: "Basoa · Nafarroa" },
  ],
};

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
      <span
        ref={numRef}
        data-stat-number
        className="stat-card-value"
        aria-label={`${value} ${label}`}
      >
        {value}
      </span>
      <span className="stat-card-label" aria-hidden="true">{label}</span>
    </div>
  );
}

export default function SocialProof() {
  const t = useTranslations("socialProof");
  const locale = (useLocale() as "es" | "en" | "eu") ?? "es";
  const clients = CLIENTS_BY_LOCALE[locale];
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

      // Count-up helper: animate the number inside a card from 0 → target.
      // Skip values that contain a range separator (–, —, -, ‑) since
      // animating to the concatenated digits ("7‑10" → 710) is wrong.
      const countUp = (card: Element) => {
        const numEl = card.querySelector<HTMLSpanElement>("[data-stat-number]");
        const rawValue = card.getAttribute("data-stat-value") || "";
        if (!numEl || !rawValue) return;
        // Ranges like "7–10", "7-10", "7‑10": leave the static value in place
        if (/[–—\-‑]/.test(rawValue)) return;
        // Parse a localized number. A "." or "," is a thousands separator when
        // it groups 3 digits (es/eu "1.300", en "1,300") and a decimal point
        // otherwise ("1,3"). Without this, parseFloat("1.300") → 1.3, which
        // rendered "1.300€" as "1.3€".
        const numericPart = rawValue.replace(/[^0-9.,]/g, "");
        const sepMatch = numericPart.match(/[.,](\d+)$/);
        const isDecimal = sepMatch ? sepMatch[1].length <= 2 : false;
        const raw = isDecimal
          ? numericPart.replace(/[.,](?=\d+$)/, ".").replace(/[.,](?!\d*$)/g, "")
          : numericPart.replace(/[.,]/g, "");
        const num = parseFloat(raw);
        if (isNaN(num)) return;
        const suffix = rawValue.replace(/[0-9.,]/g, "");
        const decimals = isDecimal ? sepMatch![1].length : 0;
        const formatter = new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          // "always" so 4-digit values group too (es defaults to min2 grouping,
          // which would render "1300€" and mismatch the static "1.300€").
          useGrouping: "always",
        });
        const counter = { val: 0 };
        gsap.fromTo(
          counter,
          { val: 0 },
          {
            val: num,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              numEl.textContent = formatter.format(counter.val) + suffix;
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

        <div className="social-proof-clients">
          <p className="social-proof-clients-label">{t("clientsLabel")}</p>
          <div className="social-proof-clients-row">
            {clients.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-proof-client-chip focusable"
              >
                <span className="social-proof-client-name">{client.name}</span>
                <span className="social-proof-client-sector">{client.sector}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
