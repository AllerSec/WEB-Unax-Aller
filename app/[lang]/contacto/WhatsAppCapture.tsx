"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";

type Props = { locale: Locale };

const COPY = {
  es: {
    emailPlaceholder: "Tu email (para enviarte el resumen)",
    emailLabel: "Correo electrónico",
    openWhatsApp: "Abrir WhatsApp",
    skipLink: "Ir directo sin dejar email",
  },
  en: {
    emailPlaceholder: "Your email (we'll send you a summary)",
    emailLabel: "Email address",
    openWhatsApp: "Open WhatsApp",
    skipLink: "Go directly without email",
  },
  eu: {
    emailPlaceholder: "Zure emaila (laburpena bidaltzeko)",
    emailLabel: "Helbide elektronikoa",
    openWhatsApp: "Ireki WhatsApp",
    skipLink: "Joan zuzenean emailik gabe",
  },
};

const WA_MESSAGES = {
  es: "Hola Unax, me gustaría hablar sobre un proyecto web.",
  en: "Hi Unax, I'd like to talk about a web project.",
  eu: "Kaixo Unax, web proiektu bati buruz hitz egin nahi nuke.",
};

export default function WhatsAppCapture({ locale }: Props) {
  const [email, setEmail] = useState("");
  const c = COPY[locale];
  const waHref = `https://wa.me/34620909916?text=${encodeURIComponent(WA_MESSAGES[locale])}`;

  const handleOpen = () => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "5da5f440-2ca9-42c4-acac-912138bd599f",
          subject: `WhatsApp lead (email capturado) - ${email}`,
          from_name: "unaxaller.com",
          email,
          source: "whatsapp-capture",
          locale,
          botcheck: "",
        }),
      }).catch(() => {});
    }
    window.open(waHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-wa-capture">
      <div className="contact-wa-capture-row">
        <label htmlFor="wa-email" className="sr-only">
          {c.emailLabel}
        </label>
        <input
          id="wa-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={c.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input contact-wa-email-input"
        />
        <button
          type="button"
          onClick={handleOpen}
          className="contact-wa-cta focusable"
          aria-label={
            locale === "es"
              ? "Abrir conversación de WhatsApp con Unax Aller"
              : locale === "en"
              ? "Open WhatsApp chat with Unax Aller"
              : "Ireki WhatsApp txata Unax Allerrekin"
          }
        >
          <span>{c.openWhatsApp}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-wa-skip"
      >
        {c.skipLink}
      </a>
    </div>
  );
}
