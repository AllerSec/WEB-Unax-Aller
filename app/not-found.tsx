"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = (pathname?.split("/")[1] as "es" | "en" | "eu") || "es";
  const validLocales = ["es", "en", "eu"];
  const activeLocale = validLocales.includes(locale) ? locale : "es";

  const labels = {
    es: { title: "Página no encontrada", sub: "La página que buscas no existe o ha sido movida.", back: "Volver al inicio", contact: "Contactar" },
    en: { title: "Page not found", sub: "The page you are looking for does not exist or has been moved.", back: "Back to home", contact: "Contact" },
    eu: { title: "Orria ez da aurkitu", sub: "Bilatzen ari zaren orria ez da existitzen edo mugitu egin da.", back: "Hasierara itzuli", contact: "Kontaktua" },
  };
  const l = labels[activeLocale as keyof typeof labels];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".nf-number",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".nf-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".nf-sub",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".nf-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        );

      // Float animation on the number
      gsap.to(".nf-number", {
        y: -10,
        duration: 2.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.8,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* 404 number */}
      <div className="nf-number mb-8" style={{ opacity: 0 }}>
        <span
          className="text-[120px] md:text-[180px] font-light leading-none select-none"
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            color: "var(--color-line-strong)",
            display: "block",
          }}
          aria-hidden="true"
        >
          404
        </span>
      </div>

      {/* Logo */}
      <div className="mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
          style={{ backgroundColor: "#1b3022" }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              color: "var(--color-accent)",
              fontSize: "0.8rem",
            }}
          >
            UA
          </span>
        </div>
      </div>

      <h1
        className="nf-title text-2xl md:text-3xl font-light mb-4"
        style={{
          fontFamily: "Fraunces, Georgia, serif",
          color: "var(--color-ink)",
          opacity: 0,
        }}
      >
        {l.title}
      </h1>

      <p
        className="nf-sub text-base mb-8 max-w-md"
        style={{
          color: "var(--color-ink-muted)",
          fontFamily: "Manrope, sans-serif",
          opacity: 0,
        }}
      >
        {l.sub}
      </p>

      <div className="nf-cta flex flex-col sm:flex-row items-center gap-4" style={{ opacity: 0 }}>
        <Link
          href={`/${activeLocale}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--color-ink)",
            color: "var(--color-bg)",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {l.back}
        </Link>
        <Link
          href={`/${activeLocale}/contacto`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            border: "1.5px solid var(--color-line-strong)",
            color: "var(--color-ink)",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {l.contact}
        </Link>
      </div>
    </div>
  );
}
