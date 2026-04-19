"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { localeNames, type Locale } from "@/lib/i18n/config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  locale: Locale;
};

export default function Navbar({ locale }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t("inicio") },
    { href: `/${locale}/servicios`, label: t("servicios") },
    { href: `/${locale}/precios`, label: t("precios") },
    { href: `/${locale}/sobre-nosotros`, label: t("sobreNosotros") },
    { href: `/${locale}/contacto`, label: t("contacto") },
  ];

  // Navbar scroll behavior
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      ScrollTrigger.create({
        start: "top-=80 top",
        onEnter: () => {
          gsap.to(nav, {
            backgroundColor: "rgba(250, 249, 244, 0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 1px 0 rgba(195, 200, 193, 0.5)",
            duration: 0.3,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(nav, {
            backgroundColor: "rgba(250, 249, 244, 0)",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });

      // Initial entrance
      gsap.fromTo(
        nav,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
    },
    { scope: navRef }
  );

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  // Build alternate locale links preserving the current page's path
  const getLocaleLink = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["es", "en", "eu"].includes(segments[0])) {
      segments[0] = targetLocale;
    }
    return "/" + segments.join("/") || `/${targetLocale}`;
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "rgba(250, 249, 244, 0)" }}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 group"
            aria-label="Unax Aller — Inicio"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "#061b0e" }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#b4cdb8",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                }}
              >
                UA
              </span>
            </div>
            <span
              className="hidden sm:block text-sm font-medium tracking-wide"
              style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
            >
              Unax Aller
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                style={{
                  color: isActive(link.href)
                    ? "#061b0e"
                    : "#434843",
                  fontFamily: "Manrope, sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#061b0e";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(6, 27, 14, 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#434843";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute bottom-0.5 left-3 right-3 h-px rounded-full"
                    style={{ backgroundColor: "#4d6453" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: lang switcher + CTA */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((v) => !v);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  color: "#434843",
                  backgroundColor: langOpen ? "rgba(6, 27, 14, 0.06)" : "transparent",
                  fontFamily: "Manrope, sans-serif",
                }}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Cambiar idioma"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{locale.toUpperCase()}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: langOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 mt-1 py-1 rounded-xl border shadow-lg min-w-[130px]"
                  style={{
                    backgroundColor: "#faf9f4",
                    borderColor: "#c3c8c1",
                    boxShadow: "0 8px 24px rgba(6, 27, 14, 0.12)",
                  }}
                  role="listbox"
                  aria-label="Seleccionar idioma"
                >
                  {(["es", "en", "eu"] as Locale[]).map((loc) => (
                    <Link
                      key={loc}
                      href={getLocaleLink(loc)}
                      role="option"
                      aria-selected={loc === locale}
                      className="flex items-center justify-between px-4 py-2 text-sm transition-colors duration-150"
                      style={{
                        color: loc === locale ? "#061b0e" : "#434843",
                        backgroundColor:
                          loc === locale ? "rgba(6, 27, 14, 0.06)" : "transparent",
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: loc === locale ? 600 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (loc !== locale) {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(6, 27, 14, 0.04)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (loc !== locale) {
                          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                        }
                      }}
                      onClick={() => setLangOpen(false)}
                    >
                      {localeNames[loc]}
                      {loc === locale && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button (desktop) */}
            <Link
              href={`/${locale}/contacto`}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "#061b0e",
                color: "#ffffff",
                fontFamily: "Manrope, sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1b3022";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#061b0e";
              }}
            >
              {t("consultaGratuita")}
            </Link>

            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              style={{
                backgroundColor: menuOpen ? "rgba(6, 27, 14, 0.06)" : "transparent",
              }}
            >
              <span
                className="block h-px w-6 transition-all duration-300"
                style={{
                  backgroundColor: "#061b0e",
                  transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px w-6 transition-all duration-300"
                style={{
                  backgroundColor: "#061b0e",
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-px w-6 transition-all duration-300"
                style={{
                  backgroundColor: "#061b0e",
                  transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          opacity: menuOpen ? 1 : 0,
        }}
        aria-hidden={!menuOpen}
      >
        <div
          className="border-t"
          style={{
            backgroundColor: "rgba(250, 249, 244, 0.98)",
            borderColor: "#c3c8c1",
            backdropFilter: "blur(12px)",
          }}
        >
          <nav className="container-xl py-4 flex flex-col gap-1" aria-label="Menú móvil">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  color: isActive(link.href) ? "#061b0e" : "#434843",
                  backgroundColor: isActive(link.href)
                    ? "rgba(6, 27, 14, 0.06)"
                    : "transparent",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: isActive(link.href) ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t" style={{ borderColor: "#c3c8c1" }}>
              <Link
                href={`/${locale}/contacto`}
                className="flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg"
                style={{
                  backgroundColor: "#061b0e",
                  color: "#ffffff",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {t("consultaGratuita")}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
