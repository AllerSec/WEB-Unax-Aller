"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/i18n/config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { locale: Locale };

interface ServiceIconProps {
  type: string;
}

function ServiceIcon({ type }: ServiceIconProps) {
  const icons: Record<string, React.ReactNode> = {
    design: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    performance: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    seo: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    mobile: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    animation: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    multilang: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };
  return icons[type] || null;
}

interface ServiceCardProps {
  iconType: string;
  title: string;
  description: string;
  index: number;
  locale: Locale;
  learnMore: string;
}

function ServiceCard({ iconType, title, description, index, locale, learnMore }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: (index % 3) * 0.1,
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
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * 6,
      rotateY: x * 6,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

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
      className="group relative p-7 rounded-2xl transition-shadow duration-300 hover:shadow-xl"
      style={{
        backgroundColor: "#f5f4ef",
        border: "1px solid #e3e3de",
        opacity: 0,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
        style={{
          backgroundColor: "#efeee9",
          color: "#4d6453",
        }}
      >
        <ServiceIcon type={iconType} />
      </div>

      {/* Content */}
      <h3
        className="text-lg font-medium mb-3"
        style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-5"
        style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
      >
        {description}
      </p>

      {/* Learn more link */}
      <Link
        href={`/${locale}/servicios`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
        style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
      >
        {learnMore}
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
      </Link>

      {/* Hover accent border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: "1px solid rgba(77, 100, 83, 0.3)" }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function ServicesGrid({ locale }: Props) {
  const t = useTranslations("services");
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

  const services = [
    { key: "design", iconType: "design", title: t("design.title"), description: t("design.description") },
    { key: "performance", iconType: "performance", title: t("performance.title"), description: t("performance.description") },
    { key: "seo", iconType: "seo", title: t("seo.title"), description: t("seo.description") },
    { key: "mobile", iconType: "mobile", title: t("mobile.title"), description: t("mobile.description") },
    { key: "animation", iconType: "animation", title: t("animation.title"), description: t("animation.description") },
    { key: "multilang", iconType: "multilang", title: t("multilang.title"), description: t("multilang.description") },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ backgroundColor: "#faf9f4" }}
      aria-labelledby="services-title"
    >
      <div className="container-xl">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-14" style={{ opacity: 0 }}>
          <h2
            id="services-title"
            className="text-3xl md:text-4xl lg:text-5xl font-light mb-5"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Services grid — 3×2, always even */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard
              key={service.key}
              iconType={service.iconType}
              title={service.title}
              description={service.description}
              index={i}
              locale={locale}
              learnMore={t("learnMore")}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href={`/${locale}/servicios`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              border: "1.5px solid #c3c8c1",
              color: "#061b0e",
              fontFamily: "Manrope, sans-serif",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#4d6453";
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#efeee9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c3c8c1";
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
            }}
          >
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
