"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { localeNames, type Locale } from "@/lib/i18n/config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LOCALES = ["es", "en", "eu"] as const satisfies readonly Locale[];

const NAV_LABELS: Record<Locale, { main: string; mobile: string; open: string; close: string; lang: string }> = {
  es: { main: "Navegación principal", mobile: "Menú móvil", open: "Abrir menú", close: "Cerrar menú", lang: "Idioma: " },
  en: { main: "Main navigation",      mobile: "Mobile menu", open: "Open menu",  close: "Close menu", lang: "Language: " },
  eu: { main: "Nabigazio nagusia",    mobile: "Mugikorreko menua", open: "Ireki menua", close: "Itxi menua", lang: "Hizkuntza: " },
};

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type Props = { locale: Locale };

export default function Navbar({ locale }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const labels = NAV_LABELS[locale];
  const closeAll = () => { setMenuOpen(false); setLangOpen(false); };

  const navLinks = [
    { href: `/${locale}`,                  label: t("inicio") },
    { href: `/${locale}/servicios`,        label: t("servicios") },
    { href: `/${locale}/precios`,          label: t("precios") },
    { href: `/${locale}/sobre-nosotros`,   label: t("sobreNosotros") },
    { href: `/${locale}/contacto`,         label: t("contacto") },
  ];

  const isActive = (href: string) =>
    href === `/${locale}`
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(href);

  const getLocaleLink = (target: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) {
      segments[0] = target;
    }
    return "/" + segments.join("/") || `/${target}`;
  };

  // ─── Scroll state + entrance + underline hovers ────────────────────────
  // HARD RULE: this hook NEVER animates `.nav-actions` (lang, CTA, burger).
  // Those are critical controls — if Safari with Reduce Protections /
  // Cross-Site Tracking blocks GSAP mid-init (matchMedia eval failure,
  // StrictMode double-cleanup, anti-fingerprinting), the burger must still
  // be visible and tappable. Animation = polish; nav = must-work.
  // We also animate ONLY `y` + `opacity`, never `autoAlpha`/`visibility`:
  // a stuck `opacity:0` is recoverable via CSS; `visibility:hidden` is not.
  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: "top-=80 top",
      onEnter: () => nav.setAttribute("data-scrolled", "true"),
      onLeaveBack: () => nav.setAttribute("data-scrolled", "false"),
    });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const logo = nav.querySelector(".nav-logo");
    const links = nav.querySelectorAll<HTMLElement>(".nav-links .nav-link");

    if (!reduce) {
      gsap.timeline({ defaults: { ease: "power3.out", duration: 0.55, clearProps: "all" } })
        .from(logo,  { opacity: 0, y: -8, duration: 0.5 })
        .from(links, { opacity: 0, y: -10, stagger: 0.06 }, "<0.1");
    }

    const cleanups: Array<() => void> = [];
    links.forEach((link) => {
      const underline = link.querySelector<HTMLElement>(".nav-link-underline");
      if (!underline) return;
      gsap.set(underline, {
        scaleX: link.dataset.active === "true" ? 1 : 0,
        transformOrigin: "left center",
      });
      // ONE quickTo drives both directions. Mixing a quickTo (enter) with a
      // separate gsap.to (leave) — and flipping transformOrigin between them —
      // let the two tweens fight over scaleX on rapid enter/leave, leaving the
      // underline stuck at scaleX:1 (the "hover won't clear" bug). A single
      // quickTo with a fixed origin always honours the latest target.
      const tween = gsap.quickTo(underline, "scaleX", { duration: 0.3, ease: "power3.out" });
      const enter = () => { tween(1); };
      const leave = () => {
        if (link.dataset.active === "true") return;
        tween(0);
      };
      link.addEventListener("mouseenter", enter);
      link.addEventListener("focus", enter);
      link.addEventListener("mouseleave", leave);
      link.addEventListener("blur", leave);
      cleanups.push(() => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("focus", enter);
        link.removeEventListener("mouseleave", leave);
        link.removeEventListener("blur", leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, { scope: navRef });

  // ─── Mobile menu open animation (stagger on links) ─────────────────────
  // CSS [data-open] owns visibility; GSAP only adds opacity/y polish. We use
  // `opacity` not `autoAlpha` so a frozen mid-tween can't leave links at
  // `visibility:hidden` (silent tap-kill) under Safari anti-fingerprinting.
  useGSAP(() => {
    if (!menuOpen) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      panel.querySelectorAll<HTMLElement>(".nav-mobile-link, .nav-mobile-cta"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.045, ease: "power3.out", clearProps: "all" }
    );
  }, { scope: mobilePanelRef, dependencies: [menuOpen] });

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  // Click-outside + Esc. Only mounts while something is open so the same tap
  // that opens the menu cannot also close it (iOS Safari race).
  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeAll();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, langOpen]);

  // Close menus on route change (prop-derived state)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    closeAll();
  }

  return (
    <header ref={navRef} className="nav-root" data-scrolled="false">
      <div className="container-xl">
        <div className="nav-bar">
          <Link href={`/${locale}`} className="nav-logo focusable" aria-label="Unax Aller — Inicio">
            <Image
              src="/images/brand/logo-mark.webp"
              alt="Unax Aller"
              width={602}
              height={359}
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 140px, 180px"
              className="nav-logo-img"
            />
          </Link>

          <nav className="nav-links" aria-label={labels.main}>
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
                  <span className="nav-link-underline" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <div className="nav-lang">
              <button
                type="button"
                className="nav-lang-btn focusable"
                onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                data-open={langOpen ? "true" : "false"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="sr-only">{labels.lang}</span>
                <span aria-hidden="true">{locale.toUpperCase()}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-lang-caret" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langOpen && (
                <div className="nav-lang-menu" role="listbox" aria-label="Seleccionar idioma">
                  {LOCALES.map((loc) => (
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

            <Link href={`/${locale}/contacto`} className="btn btn-primary btn-sm nav-cta">
              <span>{t("consultaGratuita")}</span>
              <ArrowRight />
            </Link>

            <button
              type="button"
              className="nav-burger focusable"
              onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? labels.close : labels.open}
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
        ref={mobilePanelRef}
        className="nav-mobile"
        data-open={menuOpen ? "true" : "false"}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-inner">
          <nav className="container-xl nav-mobile-list" aria-label={labels.mobile}>
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
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-mobile-link-text">{link.label}</span>
                  <ArrowRight size={18} />
                </Link>
              );
            })}
            <Link
              href={`/${locale}/contacto`}
              className="btn btn-primary btn-block nav-mobile-cta"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {t("consultaGratuita")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
