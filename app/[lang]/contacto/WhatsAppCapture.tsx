"use client";

import type { Locale } from "@/lib/i18n/config";

type Props = { locale: Locale };

const COPY = {
  es: "Abrir WhatsApp",
  en: "Open WhatsApp",
  eu: "Ireki WhatsApp",
};

const ARIA = {
  es: "Abrir conversación de WhatsApp con Unax Aller",
  en: "Open WhatsApp chat with Unax Aller",
  eu: "Ireki WhatsApp txata Unax Allerrekin",
};

const WA_MESSAGES = {
  es: "Hola Unax, me gustaría hablar sobre un proyecto web.",
  en: "Hi Unax, I'd like to talk about a web project.",
  eu: "Kaixo Unax, web proiektu bati buruz hitz egin nahi nuke.",
};

export default function WhatsAppCapture({ locale }: Props) {
  const waHref = `https://wa.me/34620909916?text=${encodeURIComponent(WA_MESSAGES[locale])}`;

  return (
    <div className="contact-wa-capture">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-wa-cta focusable"
        aria-label={ARIA[locale]}
      >
        <span>{COPY[locale]}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}
