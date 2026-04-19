"use client";

import { useRef, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/i18n/config";
import PlanModal, { type PlanDetail } from "./PlanModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { locale: Locale; headingLevel?: "h1" | "h2" };

interface PlanCardProps {
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  index: number;
  ctaLabel: string;
  fromLabel: string;
  popularLabel: string;
  locale: Locale;
  onDetail: () => void;
}

function PlanCard({
  name,
  subtitle,
  price,
  description,
  features,
  popular,
  index,
  ctaLabel,
  fromLabel,
  popularLabel,
  onDetail,
}: PlanCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: cardRef }
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (popular) return; // Don't tilt the featured card
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * 5,
      rotateY: x * 5,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [popular]);

  const onMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        backgroundColor: popular ? "#061b0e" : "#f5f4ef",
        border: popular ? "none" : "1px solid #e3e3de",
        opacity: 0,
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: popular
          ? "0 24px 64px rgba(6, 27, 14, 0.35)"
          : "none",
        transform: popular ? "scale(1.02)" : "none",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Popular badge */}
      {popular && (
        <div
          className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: "#b4cdb8",
            color: "#061b0e",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {popularLabel}
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Plan name */}
        <div className="mb-6">
          <h3
            className="text-sm font-semibold uppercase tracking-widest mb-1"
            style={{
              color: popular ? "#4d6453" : "#4d6453",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            {subtitle}
          </h3>
          <p
            className="text-xl font-medium"
            style={{
              fontFamily: "Newsreader, Georgia, serif",
              color: popular ? "#b4cdb8" : "#061b0e",
            }}
          >
            {name}
          </p>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span
              className="text-sm font-medium"
              style={{ color: popular ? "#737973" : "#737973", fontFamily: "Manrope, sans-serif" }}
            >
              {fromLabel}
            </span>
            <span
              className="text-4xl font-light ml-1"
              style={{
                fontFamily: "Newsreader, Georgia, serif",
                color: popular ? "#ffffff" : "#061b0e",
              }}
            >
              {price}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-7"
          style={{
            color: popular ? "#737973" : "#434843",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="flex-shrink-0 mt-0.5"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={popular ? "#4d6453" : "#4d6453"}
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                className="text-sm"
                style={{
                  color: popular ? "#b4cdb8" : "#434843",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onDetail}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 w-full cursor-pointer"
          style={{
            backgroundColor: popular ? "#b4cdb8" : "transparent",
            color: "#061b0e",
            border: popular ? "none" : "1.5px solid #c3c8c1",
            fontFamily: "Manrope, sans-serif",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            if (popular) {
              el.style.backgroundColor = "#d0e9d4";
            } else {
              el.style.borderColor = "#4d6453";
              el.style.backgroundColor = "#efeee9";
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            if (popular) {
              el.style.backgroundColor = "#b4cdb8";
            } else {
              el.style.borderColor = "#c3c8c1";
              el.style.backgroundColor = "transparent";
            }
          }}
        >
          {ctaLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function PricingCards({ locale, headingLevel = "h1" }: Props) {
  const HeadingTag = headingLevel;
  const t = useTranslations("pricing");
  const sectionRef = useRef<HTMLElement>(null);
  const [activePlan, setActivePlan] = useState<PlanDetail | null>(null);

  const planDetails: PlanDetail[] = [
    {
      name: t("plans.0.name"),
      subtitle: t("plans.0.subtitle"),
      price: t("plans.0.price"),
      description: t("plans.0.description"),
      popular: true,
      features: [
        t("plans.0.features.0"),
        t("plans.0.features.1"),
        t("plans.0.features.2"),
        t("plans.0.features.3"),
        t("plans.0.features.4"),
        t("plans.0.features.5"),
      ],
      deliverables: [
        locale === "es" ? "Dominio y hosting durante 1 año" : locale === "en" ? "Domain & hosting for 1 year" : "Domeinua eta hostinga 1 urterako",
        locale === "es" ? "Panel de administración de contenidos" : locale === "en" ? "Content management panel" : "Edukien administrazio panela",
        locale === "es" ? "Acceso y propiedad del código fuente" : locale === "en" ? "Full source code ownership" : "Iturburu-kodearen jabetza",
        locale === "es" ? "Certificado SSL + CDN incluido" : locale === "en" ? "SSL certificate + CDN included" : "SSL ziurtagiria + CDN barne",
      ],
      process: [
        { step: locale === "es" ? "Estrategia digital" : locale === "en" ? "Digital strategy" : "Estrategia digitala", desc: locale === "es" ? "Análisis de competencia y definición de objetivos." : locale === "en" ? "Competitive analysis and goal definition." : "Lehiakideen analisia eta helburuen definizioa." },
        { step: locale === "es" ? "Diseño premium" : locale === "en" ? "Premium design" : "Diseinu premium-a", desc: locale === "es" ? "Sistema de diseño completo con animaciones y microinteracciones." : locale === "en" ? "Full design system with animations and microinteractions." : "Diseinu sistema osoa animazioekin eta mikrointerakzioekin." },
        { step: locale === "es" ? "Desarrollo y pruebas" : locale === "en" ? "Development & QA" : "Garapena eta probak", desc: locale === "es" ? "Código limpio, optimizado y probado en todos los dispositivos." : locale === "en" ? "Clean, optimized code tested on all devices." : "Kode garbia, optimizatua eta gailu guztietan probatua." },
        { step: locale === "es" ? "Lanzamiento y formación" : locale === "en" ? "Launch & training" : "Abiatzea eta prestakuntza", desc: locale === "es" ? "Publicación, analytics y sesión de formación para tu equipo." : locale === "en" ? "Publishing, analytics and team training session." : "Argitalpena, analitika eta taldearen prestakuntza saioa." },
      ],
      clients: [
        { name: "Farmacia Fernández Bera", url: "https://farmaciafernandezbera.com", domain: "farmaciafernandezbera.com", type: locale === "es" ? "Farmacia" : locale === "en" ? "Pharmacy" : "Farmazia" },
        { name: "Virtuosolve", url: "https://virtuosolve.com", domain: "virtuosolve.com", type: locale === "es" ? "IA para clínicas estéticas" : locale === "en" ? "AI for aesthetic clinics" : "IA klinika estetikoetarako" },
        { name: "Arretxe Motos", url: "https://motosarretxe.com", domain: "motosarretxe.com", type: locale === "es" ? "Taller y concesionario Honda & SYM · 58 años de experiencia" : locale === "en" ? "Honda & SYM dealer & workshop · 58 years of experience" : "Honda & SYM kontzesionarioa eta tailerra · 58 urte esperientzia" },
      ],
    },
  ];

  return (
    <>
    <section
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ backgroundColor: "#faf9f4" }}
      aria-labelledby="pricing-title"
    >
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <HeadingTag
            id="pricing-title"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {t("title")}
          </HeadingTag>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Single plan — centered */}
        <div className="max-w-md mx-auto">
          {planDetails.map((plan, i) => (
            <PlanCard
              key={plan.name}
              {...plan}
              index={i}
              ctaLabel={t("cta")}
              fromLabel={t("from")}
              popularLabel={t("popular")}
              locale={locale}
              onDetail={() => setActivePlan(plan)}
            />
          ))}
          <p
            className="text-center text-sm mt-6"
            style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
          >
            {t("notePrice")}
          </p>
        </div>
      </div>
    </section>

    {/* Plan detail modal */}
    <PlanModal
      plan={activePlan}
      onClose={() => setActivePlan(null)}
      locale={locale}
    />
    </>
  );
}
