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
    if (popular) return;
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
      className="plan-card"
      data-popular={popular ? "true" : "false"}
      style={{ opacity: 0 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {popular && (
        <div className="plan-card-popular-badge">{popularLabel}</div>
      )}

      <div className="plan-card-body">
        <div className="plan-card-header">
          <p className="plan-card-subtitle">{subtitle}</p>
          <p className="plan-card-name">{name}</p>
        </div>

        <div className="plan-card-price-row">
          <span className="plan-card-price-from">{fromLabel}</span>
          <span className="plan-card-price">{price}</span>
        </div>

        <p className="plan-card-description">{description}</p>

        <ul className="plan-card-features">
          {features.map((feature, i) => (
            <li key={i} className="plan-card-feature">
              <svg
                className="plan-card-feature-check"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onDetail}
          className="plan-card-cta focusable"
          type="button"
        >
          {ctaLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
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
        className="pricing-section"
        aria-labelledby="pricing-title"
      >
        <div className="container-xl">
          <div className="pricing-section-header">
            <HeadingTag id="pricing-title" className="pricing-section-title">
              {t("title")}
            </HeadingTag>
            <p className="pricing-section-subtitle">{t("subtitle")}</p>
          </div>

          <div className="pricing-wrap">
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
            <p className="pricing-note">{t("notePrice")}</p>
          </div>
        </div>
      </section>

      <PlanModal
        plan={activePlan}
        onClose={() => setActivePlan(null)}
        locale={locale}
      />
    </>
  );
}
