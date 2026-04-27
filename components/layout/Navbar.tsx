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

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      ScrollTrigger.create({
        start: "top-=80 top",
        onEnter: () => {
          nav.setAttribute("data-scrolled", "true");
        },
        onLeaveBack: () => {
          nav.setAttribute("data-scrolled", "false");
        },
      });

      gsap.fromTo(
        nav,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
    },
    { scope: navRef }
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Close menus when the pathname changes. React's documented pattern for
  // resetting state from a changed prop: compare in render and call setState
  // synchronously — React schedules the update before commit, so it doesn't
  // produce an extra render in practice.
  // https://react.dev/learn/you-might-not-need-an-effect#resetting-state-when-a-prop-changes
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setLangOpen(false);
  }

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  const getLocaleLink = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["es", "en", "eu"].includes(segments[0])) {
      segments[0] = targetLocale;
    }
    return "/" + segments.join("/") || `/${targetLocale}`;
  };

  return (
    <header ref={navRef} className="nav-root" data-scrolled="false">
      <div className="container-xl">
        <div className="nav-bar">
          <Link
            href={`/${locale}`}
            className="nav-logo focusable"
            aria-label="Unax Aller — Inicio"
          >
            <span className="nav-logo-mark" aria-hidden="true">UA</span>
            <span className="nav-logo-text">Unax Aller</span>
          </Link>

          <nav className="nav-links" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link focusable"
                  data-active={active ? "true" : "false"}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && <span className="nav-link-indicator" aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <div className="nav-lang">
              <button
                type="button"
                className="nav-lang-btn focusable"
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((v) => !v);
                }}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Cambiar idioma"
                data-open={langOpen ? "true" : "false"}
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
                  className="nav-lang-caret"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langOpen && (
                <div
                  className="nav-lang-menu"
                  role="listbox"
                  aria-label="Seleccionar idioma"
                >
                  {(["es", "en", "eu"] as Locale[]).map((loc) => (
                    <Link
                      key={loc}
                      href={getLocaleLink(loc)}
                      role="option"
                      aria-selected={loc === locale}
                      className="nav-lang-option focusable"
                      data-active={loc === locale ? "true" : "false"}
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

            <Link
              href={`/${locale}/contacto`}
              className="btn btn-primary btn-sm nav-cta"
            >
              {t("consultaGratuita")}
            </Link>

            <button
              type="button"
              className="nav-burger focusable"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              data-open={menuOpen ? "true" : "false"}
            >
              <span className="nav-burger-line" />
              <span className="nav-burger-line" />
              <span className="nav-burger-line" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="nav-mobile"
        data-open={menuOpen ? "true" : "false"}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-inner">
          <nav className="container-xl nav-mobile-list" aria-label="Menú móvil">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-mobile-link focusable"
                  data-active={active ? "true" : "false"}
                  aria-current={active ? "page" : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={`/${locale}/contacto`}
              className="btn btn-primary btn-block nav-mobile-cta"
              tabIndex={menuOpen ? 0 : -1}
            >
              {t("consultaGratuita")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
