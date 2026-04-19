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
        locale === "es" ? "Acceso y propiedad del código fuente" : locale === "en" ? "Full source code ownership" : "Iturburu-kodearen jabetza",
        locale === "es" ? "Revisión de diseño incluida" : locale === "en" ? "Design revision included" : "Diseinu berrikuspena barne",
        locale === "es" ? "Certificado SSL gratuito" : locale === "en" ? "Free SSL certificate" : "SSL ziurtagiri doakoa",
      ],
      process: [
        { step: locale === "es" ? "Reunión de briefing" : locale === "en" ? "Briefing call" : "Briefing bilera", desc: locale === "es" ? "Entendemos tu negocio, objetivos y público." : locale === "en" ? "We understand your business, goals and audience." : "Zure negozioa, helburuak eta audientzia ulertzen ditugu." },
        { step: locale === "es" ? "Diseño y maquetación" : locale === "en" ? "Design & layout" : "Diseinua eta maketazioa", desc: locale === "es" ? "Diseñamos páginas únicas adaptadas a tu imagen." : locale === "en" ? "We design unique pages adapted to your brand." : "Zure irudira egokitutako orri bereziak diseinatzen ditugu." },
        { step: locale === "es" ? "Revisión conjunta" : locale === "en" ? "Joint review" : "Berrikusketa bateratua", desc: locale === "es" ? "Ajustes y aprobación antes del lanzamiento." : locale === "en" ? "Adjustments and approval before launch." : "Doiketak eta onarpena abiarazi aurretik." },
        { step: locale === "es" ? "Lanzamiento y entrega" : locale === "en" ? "Launch & handover" : "Abiatzea eta entrega", desc: locale === "es" ? "Tu web live, con formación básica incluida." : locale === "en" ? "Your site live, with basic training included." : "Zure webgunea martxan, oinarrizko prestakuntzarekin." },
      ],
      clients: [],
    },
    {
      name: t("plans.1.name"),
      subtitle: t("plans.1.subtitle"),
      price: t("plans.1.price"),
      description: t("plans.1.description"),
      popular: true,
      features: [
        t("plans.1.features.0"),
        t("plans.1.features.1"),
        t("plans.1.features.2"),
        t("plans.1.features.3"),
        t("plans.1.features.4"),
        t("plans.1.features.5"),
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
      ],
    },
    {
      name: t("plans.2.name"),
      subtitle: t("plans.2.subtitle"),
      price: t("plans.2.price"),
      description: t("plans.2.description"),
      features: [
        t("plans.2.features.0"),
        t("plans.2.features.1"),
        t("plans.2.features.2"),
        t("plans.2.features.3"),
        t("plans.2.features.4"),
        t("plans.2.features.5"),
      ],
      deliverables: [
        locale === "es" ? "Dominio y hosting durante 1 año" : locale === "en" ? "Domain & hosting for 1 year" : "Domeinua eta hostinga 1 urterako",
        locale === "es" ? "Identidad visual completa (logo, tipografía, colores)" : locale === "en" ? "Full visual identity (logo, typography, colours)" : "Identitate bisual osoa (logoa, tipografia, koloreak)",
        locale === "es" ? "Código fuente en propiedad exclusiva" : locale === "en" ? "Exclusive source code ownership" : "Iturburu-kodearen jabetza esklusiboa",
        locale === "es" ? "Soporte prioritario 3 meses post-lanzamiento" : locale === "en" ? "Priority support 3 months post-launch" : "Lehentasunezko laguntza 3 hilabete abiarazi ostean",
      ],
      process: [
        { step: locale === "es" ? "Auditoría y estrategia" : locale === "en" ? "Audit & strategy" : "Ikuskaritza eta estrategia", desc: locale === "es" ? "Análisis profundo de tu sector, competencia y oportunidades." : locale === "en" ? "In-depth analysis of your sector, competition and opportunities." : "Zure sektorearen, lehiakideen eta aukeren analisi sakona." },
        { step: locale === "es" ? "Identidad de marca" : locale === "en" ? "Brand identity" : "Marka identitatea", desc: locale === "es" ? "Logo, sistema de colores y tipografías diseñados desde cero." : locale === "en" ? "Logo, colour system and typography designed from scratch." : "Logoa, kolore sistema eta tipografiak hutsetik diseinatuta." },
        { step: locale === "es" ? "Diseño y desarrollo exclusivo" : locale === "en" ? "Exclusive design & development" : "Diseinu eta garapen esklusiboa", desc: locale === "es" ? "Web única con animaciones avanzadas, multi-idioma y optimización máxima." : locale === "en" ? "Unique website with advanced animations, multilanguage and full optimisation." : "Web bakarra animazio aurreratuekin, hizkuntza anitzekoa eta optimizazio gorena." },
        { step: locale === "es" ? "QA exhaustivo y lanzamiento" : locale === "en" ? "Exhaustive QA & launch" : "QA agortezina eta abiatzea", desc: locale === "es" ? "Testing en 20+ dispositivos, PageSpeed 95+ y go-live." : locale === "en" ? "Testing on 20+ devices, PageSpeed 95+ and go-live." : "20+ gailutan proba, PageSpeed 95+ eta abiatzea." },
        { step: locale === "es" ? "Soporte post-lanzamiento" : locale === "en" ? "Post-launch support" : "Abiarazi osteko laguntza", desc: locale === "es" ? "3 meses de acompañamiento prioritario sin coste adicional." : locale === "en" ? "3 months of priority support at no extra cost." : "3 hilabete lehentasunezko laguntzarekin koste gehigarririk gabe." },
      ],
      clients: [
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

        {/* Plans — 3 columns, symmetric, popular card slightly elevated */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
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
        </div>

        {/* Maintenance section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-light mb-3"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("maintenance.title")}
            </h2>
            <p
              className="text-base"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {t("maintenance.subtitle")}
            </p>
          </div>

          {/* Always 2 columns — symmetric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {/* Basic */}
            <div
              className="p-7 rounded-2xl"
              style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
            >
              <div className="flex items-baseline gap-2 mb-5">
                <span
                  className="text-3xl font-light"
                  style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                >
                  {t("maintenance.basic.price")}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                >
                  {t("month")}
                </span>
              </div>
              <h3
                className="text-base font-semibold mb-4"
                style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
              >
                {t("maintenance.basic.name")}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  t("maintenance.basic.features.0"),
                  t("maintenance.basic.features.1"),
                  t("maintenance.basic.features.2"),
                  t("maintenance.basic.features.3"),
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4d6453" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete */}
            <div
              className="p-7 rounded-2xl"
              style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
            >
              <div className="flex items-baseline gap-2 mb-5">
                <span
                  className="text-3xl font-light"
                  style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                >
                  {t("maintenance.complete.price")}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                >
                  {t("month")}
                </span>
              </div>
              <h3
                className="text-base font-semibold mb-4"
                style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
              >
                {t("maintenance.complete.name")}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  t("maintenance.complete.features.0"),
                  t("maintenance.complete.features.1"),
                  t("maintenance.complete.features.2"),
                  t("maintenance.complete.features.3"),
                  t("maintenance.complete.features.4"),
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4d6453" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
