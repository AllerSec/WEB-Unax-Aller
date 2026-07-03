"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteConfig } from "@/lib/utils";

const MESSAGES: Record<string, string> = {
  es: "Hola Unax, me gustaría una demo gratis de mi web.",
  en: "Hi Unax, I'd like a free demo of my website.",
  eu: "Kaixo Unax, nire webgunearen doako demoa nahiko nuke.",
  fr: "Bonjour Unax, je voudrais une démo gratuite de mon site.",
};

const LABELS: Record<string, string> = {
  es: "Escríbeme por WhatsApp",
  en: "Message me on WhatsApp",
  eu: "WhatsApp bidez idatzi",
  fr: "Écrivez-moi sur WhatsApp",
};

const TOOLTIPS: Record<string, string> = {
  es: "Respondo en minutos",
  en: "I reply in minutes",
  eu: "Minutuetan erantzuten dut",
  fr: "Je réponds en quelques minutes",
};

type Props = {
  locale: "es" | "en" | "eu" | "fr";
};

export default function WhatsAppFloat({ locale }: Props) {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  // Reveal after initial scroll so it doesn't compete with hero entrance
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  // Magnetic hover + icon pop — GSAP quickTo, no per-event allocation
  useEffect(() => {
    const btn = buttonRef.current;
    const icon = iconRef.current;
    if (!btn || !icon) return;

    // Disable magnetic on touch / reduced motion
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.55, ease: "power3.out" });
    const iconRot = gsap.quickTo(icon, "rotate", { duration: 0.6, ease: "power2.out" });

    const MAGNET_RADIUS = 0.35; // fraction of button size
    let rafPending = false;
    let lastEvent: MouseEvent | null = null;

    const onMove = (e: MouseEvent) => {
      lastEvent = e;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        if (!lastEvent) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = lastEvent.clientX - cx;
        const dy = lastEvent.clientY - cy;
        xTo(dx * MAGNET_RADIUS);
        yTo(dy * MAGNET_RADIUS);
      });
    };

    const onEnter = () => {
      btn.addEventListener("mousemove", onMove);
      iconRot(-12);
    };

    const onLeave = () => {
      btn.removeEventListener("mousemove", onMove);
      xTo(0);
      yTo(0);
      iconRot(0);
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mousemove", onMove);
    };
  }, []);

  const message = encodeURIComponent(MESSAGES[locale] || MESSAGES.es);
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;
  const label = LABELS[locale] || LABELS.es;
  const tooltip = TOOLTIPS[locale] || TOOLTIPS.es;

  return (
    <div
      ref={rootRef}
      className="wa-float-root"
      data-visible={visible ? "true" : "false"}
    >
      {/* Tooltip bubble — only desktop, appears on hover */}
      <div className="wa-float-tooltip" aria-hidden="true">
        <span className="wa-float-tooltip-text">{tooltip}</span>
        <span className="wa-float-tooltip-tail" />
      </div>

      <a
        ref={buttonRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="wa-float-btn"
      >
        {/* Pulse rings */}
        <span className="wa-float-ring wa-float-ring-1" aria-hidden="true" />
        <span className="wa-float-ring wa-float-ring-2" aria-hidden="true" />

        {/* Online dot */}
        <span className="wa-float-dot" aria-hidden="true" />

        {/* Icon wrapper (for rotation on hover) */}
        <span ref={iconRef} className="wa-float-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </span>
      </a>
    </div>
  );
}
