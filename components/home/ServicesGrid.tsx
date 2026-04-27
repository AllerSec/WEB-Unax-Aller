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
    localBusiness: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 9l1-5h16l1 5" />
        <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
        <path d="M9 21V13h6v8" />
      </svg>
    ),
    clinic: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    multilingual: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    redesign: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <polyline points="21 3 21 9 15 9" />
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
  const rafPendingRef = useRef(false);
  const lastCoordsRef = useRef<{ x: number; y: number; mx: number; my: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    lastCoordsRef.current = {
      x: px - 0.5,
      y: py - 0.5,
      mx: px * 100,
      my: py * 100,
    };

    if (rafPendingRef.current) return;
    rafPendingRef.current = true;
    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      const c = cardRef.current;
      const last = lastCoordsRef.current;
      if (!c || !last) return;
      // Spotlight position via CSS custom properties (cheap, no GPU layer churn)
      c.style.setProperty("--mx", `${last.mx}%`);
      c.style.setProperty("--my", `${last.my}%`);
      // 3D tilt — kept subtle so the spotlight does the heavy work
      gsap.to(c, {
        rotateX: -last.y * 6,
        rotateY: last.x * 6,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out",
      });
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
    { key: "localBusiness", iconType: "localBusiness", title: t("localBusiness.title"), description: t("localBusiness.description") },
    { key: "clinic", iconType: "clinic", title: t("clinic.title"), description: t("clinic.description") },
    { key: "multilingual", iconType: "multilingual", title: t("multilingual.title"), description: t("multilingual.description") },
    { key: "redesign", iconType: "redesign", title: t("redesign.title"), description: t("redesign.description") },
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
