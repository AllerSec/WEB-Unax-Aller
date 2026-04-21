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
  locale: Locale;
  learnMore: string;
}

function ServiceCard({ iconType, title, description, locale, learnMore }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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
      data-service-card
      className="service-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="service-card-icon">
        <ServiceIcon type={iconType} />
      </div>

      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc">{description}</p>

      <Link
        href={`/${locale}/servicios`}
        className="service-card-link focusable"
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

      <div className="service-card-accent" aria-hidden="true" />
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

      // Batch entrance for all service cards — one ScrollTrigger per card with grouped callbacks
      const batchTriggers = ScrollTrigger.batch("[data-service-card]", {
        interval: 0.1,
        batchMax: 3,
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
          });
        },
      });

      return () => {
        batchTriggers.forEach((t) => t.kill());
      };
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
      className="services-section"
      aria-labelledby="services-title"
    >
      <div className="container-xl">
        <div ref={headerRef} className="services-header">
          <h2 id="services-title" className="services-title">
            {t("title")}
          </h2>
          <p className="services-subtitle">{t("subtitle")}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              iconType={service.iconType}
              title={service.title}
              description={service.description}
              locale={locale}
              learnMore={t("learnMore")}
            />
          ))}
        </div>

        <div className="services-cta-row">
          <Link
            href={`/${locale}/servicios`}
            className="btn btn-secondary"
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
