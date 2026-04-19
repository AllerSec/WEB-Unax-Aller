"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { href: `/${locale}/sobre-nosotros`, label: tNav("sobreNosotros") },
    { href: `/${locale}/servicios`, label: tNav("servicios") },
    { href: `/${locale}/precios`, label: tNav("precios") },
    { href: `/${locale}/contacto`, label: tNav("contacto") },
  ];

  const serviceLinks = [
    { href: `/${locale}/servicios`, label: "UI/UX Design" },
    { href: `/${locale}/servicios`, label: "SEO Técnico" },
    { href: `/${locale}/servicios`, label: "Performance Web" },
    { href: `/${locale}/servicios`, label: "Multi-idioma" },
  ];

  const legalLinks = [
    { href: `/${locale}`, label: t("privacyPolicy") },
    { href: `/${locale}`, label: t("cookiePolicy") },
    { href: `/${locale}`, label: t("legalNotice") },
  ];

  return (
    <footer
      style={{ backgroundColor: "#061b0e" }}
      aria-label="Pie de página"
    >
      <div className="container-xl py-16 md:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 mb-4 group"
              aria-label="Unax Aller — Inicio"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: "#1b3022" }}
              >
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#b4cdb8",
                    fontSize: "0.8rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  UA
                </span>
              </div>
              <span
                className="font-medium"
                style={{ color: "#b4cdb8", fontFamily: "Manrope, sans-serif" }}
              >
                Unax Aller
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
            >
              {t("tagline")}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: "#1b3022" }}
                aria-label="LinkedIn"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#364c3c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1b3022";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#b4cdb8" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: "#1b3022" }}
                aria-label="Instagram"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#364c3c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1b3022";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b4cdb8" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
            >
              {t("links.company")}
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#b4cdb8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#737973";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
            >
              {t("links.services")}
            </h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#b4cdb8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#737973";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
            >
              Contacto
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hola@unaxaller.com"
                className="flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#b4cdb8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#737973";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                hola@unaxaller.com
              </a>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                País Vasco, España
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ backgroundColor: "#1b3022" }} />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-sm"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            © {currentYear} Unax Aller ·{" "}
            <a
              href="https://unaxaller.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "#4d6453" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#b4cdb8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#4d6453";
              }}
            >
              unaxaller.com
            </a>
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs transition-colors duration-200"
                style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#737973";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#434843";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
