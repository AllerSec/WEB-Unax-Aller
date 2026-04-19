"use client";

import { useEffect, useRef } from "react";
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
    from: "Desde",
    visitSite: "Webgunea ikusi",
  },
};

export default function PlanModal({ plan, onClose, locale }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const l = labels[locale];

  // GSAP entrance / exit
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

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { y: 20, opacity: 0, scale: 0.97, duration: 0.3, ease: "power2.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.2, ease: "none" }, "-=0.15");
  };

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Lock scroll
  useEffect(() => {
    if (plan) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [plan]);

  if (!plan) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ backgroundColor: "rgba(6,27,14,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={plan.name}
    >
      <div
        ref={panelRef}
        className="relative w-full md:max-w-2xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto rounded-t-3xl md:rounded-2xl"
        style={{ backgroundColor: "#faf9f4" }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between px-7 pt-6 pb-5"
          style={{ backgroundColor: "#faf9f4", borderBottom: "1px solid #e3e3de" }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
            >
              {plan.subtitle}
            </p>
            <h2
              className="text-2xl font-light"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {plan.name}
            </h2>
            <p className="text-sm mt-1" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
              <span className="font-medium" style={{ color: "#061b0e" }}>{l.from} {plan.price}</span>
              {" · "}{plan.description}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: "#efeee9", color: "#434843" }}
            aria-label={l.close}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-7 py-6 space-y-8">
          {/* Features */}
          <div>
            <h3
              className="text-base font-semibold mb-4"
              style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
            >
              {l.includes}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[...plan.features, ...plan.deliverables].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4d6453" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h3
              className="text-base font-semibold mb-4"
              style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
            >
              {l.process}
            </h3>
            <ol className="space-y-3">
              {plan.process.map((p, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#1b3022", color: "#b4cdb8", fontFamily: "Manrope, sans-serif" }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}>{p.step}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Client examples */}
          {plan.clients.length > 0 && (
            <div>
              <h3
                className="text-base font-semibold mb-4"
                style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
              >
                {l.clients}
              </h3>
              <div className={`grid gap-4 ${plan.clients.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                {plan.clients.map((client) => (
                  <a
                    key={client.domain}
                    href={`https://${client.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden group transition-shadow duration-300 hover:shadow-lg"
                    style={{ border: "1px solid #e3e3de" }}
                  >
                    {/* Screenshot via microlink */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", backgroundColor: "#e9e8e3" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://api.microlink.io?url=https://${client.domain}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt={`Captura de pantalla de ${client.name}`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(6,27,14,0.5)" }}
                      >
                        <span
                          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full"
                          style={{ backgroundColor: "#b4cdb8", color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
                        >
                          {l.visitSite}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="px-4 py-3" style={{ backgroundColor: "#f5f4ef" }}>
                      <p className="text-sm font-semibold" style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}>{client.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>{client.type} · {client.domain}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky CTA */}
        <div
          className="sticky bottom-0 px-7 py-5"
          style={{ backgroundColor: "#faf9f4", borderTop: "1px solid #e3e3de" }}
        >
          <Link
            href={`/${locale}/contacto`}
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: "#061b0e", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}
          >
            {l.cta} — {plan.name}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
