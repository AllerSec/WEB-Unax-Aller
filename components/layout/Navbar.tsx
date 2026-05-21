"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const mobilePanelRef = useRef<HTMLDivElement>(null);
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

      // ─── Scroll-state: solidify navbar after 80px ───
      ScrollTrigger.create({
        start: "top-=80 top",
        onEnter: () => nav.setAttribute("data-scrolled", "true"),
        onLeaveBack: () => nav.setAttribute("data-scrolled", "false"),
      });

      // ─── matchMedia: handles reduced-motion + desktop/mobile splits ───
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          fullMotion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions ?? {};

          // ─── Entrance timeline: logo → links stagger → CTA ───
          const logo = nav.querySelector(".nav-logo");
          const links = nav.querySelectorAll<HTMLElement>(".nav-links .nav-link");
          const actions = nav.querySelectorAll<HTMLElement>(".nav-actions > *");

          if (reduceMotion) {
            gsap.set([logo, links, actions], { autoAlpha: 1, y: 0 });
          } else {
            const tl = gsap.timeline({
              defaults: { ease: "power3.out", duration: 0.55 },
            });
            tl.from(logo, { autoAlpha: 0, y: -8, duration: 0.5 })
              .from(
                links,
                { autoAlpha: 0, y: -10, stagger: 0.06 },
                "<0.1"
              )
              .from(
                actions,
                { autoAlpha: 0, y: -8, stagger: 0.05 },
                "<0.05"
              );
          }

          // ─── Per-link underline tween (quickTo for 60fps) ───
          const cleanups: Array<() => void> = [];
          links.forEach((link) => {
            const underline = link.querySelector<HTMLElement>(".nav-link-underline");
            if (!underline) return;
            gsap.set(underline, {
              scaleX: link.dataset.active === "true" ? 1 : 0,
              transformOrigin: "left center",
            });
            const tween = gsap.quickTo(underline, "scaleX", {
              duration: 0.35,
              ease: "power3.out",
            });
            const enter = () => {
              tween(1);
            };
            const leave = () => {
              if (link.dataset.active === "true") return;
              gsap.to(underline, {
                scaleX: 0,
                duration: 0.25,
                ease: "power2.in",
                transformOrigin: "right center",
                onComplete: () => {
                  gsap.set(underline, { transformOrigin: "left center" });
                },
              });
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
        }
      );

      return () => mm.revert();
    },
    { scope: navRef }
  );

  // ─── Mobile menu: open/close with reversible timeline ───
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const panel = mobilePanelRef.current;
      if (!panel) return;

      const items = panel.querySelectorAll<HTMLElement>(
        ".nav-mobile-link, .nav-mobile-cta"
      );

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(panel, { autoAlpha: 0 });
      gsap.set(items, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      tl.to(panel, { autoAlpha: 1, duration: reduce ? 0.01 : 0.25 })
        .to(
          items,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduce ? 0.01 : 0.4,
            stagger: reduce ? 0 : 0.045,
          },
          "<0.05"
        );

      menuTl.current = tl;
      return () => {
        tl.kill();
        menuTl.current = null;
      };
    },
    { scope: mobilePanelRef, dependencies: [] }
  );

  // Play / reverse the menu timeline when open state changes
  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    if (menuOpen) tl.play();
    else tl.reverse();
  }, [menuOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Click-outside + Esc handler
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

  // Close menus on route change (React's prop-derived state pattern)
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
    <>
      <header ref={navRef} className="nav-root" data-scrolled="false">
        <div className="container-xl">
          <div className="nav-bar">
            <Link
              href={`/${locale}`}
              className="nav-logo focusable"
              aria-label="Unax Aller — Inicio"
            >
              <Image
                src="/images/brand/logo-mark.webp"
                alt="Unax Aller"
                width={602}
                height={359}
                priority
                className="nav-logo-img"
              />
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
                <span>{t("consultaGratuita")}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
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
          ref={mobilePanelRef}
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
                    <span className="nav-mobile-link-text">{link.label}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
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
    </>
  );
}
