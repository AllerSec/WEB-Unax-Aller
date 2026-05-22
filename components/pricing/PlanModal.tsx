"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Locale } from "@/lib/i18n/config";

gsap.registerPlugin(useGSAP);

export interface PlanDetail {
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  deliverables: string[];
  process: { step: string; desc: string }[];
  clients: {
    name: string;
    url: string;
    domain: string;
    type: string;
  }[];
}

interface Props {
  plan: PlanDetail | null;
  onClose: () => void;
  locale: Locale;
}

const labels: Record<Locale, {
  includes: string;
  process: string;
  clients: string;
  cta: string;
  close: string;
  from: string;
  visitSite: string;
}> = {
  es: {
    includes: "¿Qué incluye exactamente?",
    process: "Proceso de trabajo",
    clients: "Proyectos realizados con este plan",
    cta: "Solicitar este plan",
    close: "Cerrar",
    from: "Desde",
    visitSite: "Ver web",
  },
  en: {
    includes: "What's exactly included?",
    process: "Work process",
    clients: "Projects built with this plan",
    cta: "Request this plan",
    close: "Close",
    from: "From",
    visitSite: "Visit site",
  },
  eu: {
    includes: "Zer barne hartzen du zehazki?",
    process: "Lan prozesua",
    clients: "Plan honekin egindako proiektuak",
    cta: "Plan hau eskatu",
    close: "Itxi",
    from: "Hasieratik",
    visitSite: "Webgunea ikusi",
  },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function PlanModal({ plan, onClose, locale }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const l = labels[locale];
  const titleId = "plan-modal-title";
  const descId = "plan-modal-description";

  useGSAP(() => {
    if (!plan) return;
    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" })
      .fromTo(
        panelRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
        "-=0.1"
      );
  }, { dependencies: [plan] });

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { y: 20, opacity: 0, scale: 0.97, duration: 0.3, ease: "power2.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.2, ease: "none" }, "-=0.15");
  }, [onClose]);

  useEffect(() => {
    if (!plan) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (active === first || !panelRef.current.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [plan, handleClose]);

  if (!plan) return null;

  return (
    <div
      ref={backdropRef}
      className="plan-modal-backdrop"
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div ref={panelRef} className="plan-modal-panel">
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="plan-modal-close focusable"
          type="button"
          aria-label={l.close}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="plan-modal-header">
          <p className="plan-modal-header-subtitle">{plan.subtitle}</p>
          <h2 id={titleId} className="plan-modal-header-title">{plan.name}</h2>
        </div>

        <div className="plan-modal-value">
          <div className="plan-modal-value-price">
            <span className="plan-modal-value-amount">{plan.price}</span>
            <span className="plan-modal-value-unit">{locale === "es" ? "todo incluido" : locale === "en" ? "all-inclusive" : "dena barne"}</span>
          </div>
          <p id={descId} className="plan-modal-value-desc">{plan.description}</p>
        </div>

        <div className="plan-modal-body">
          <section aria-labelledby="plan-modal-includes-heading">
            <h3 id="plan-modal-includes-heading" className="plan-modal-section-title">
              {l.includes}
            </h3>
            <ul className="plan-modal-feature-list">
              {[...plan.features, ...plan.deliverables].map((f, i) => (
                <li key={i} className="plan-modal-feature">
                  <svg
                    className="plan-modal-feature-check"
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        <div className="plan-modal-footer">
          <Link
            href={`/${locale}/contacto`}
            onClick={handleClose}
            className="plan-modal-cta focusable"
          >
            {l.cta} — {plan.name}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
