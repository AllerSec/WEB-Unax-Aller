"use client";

import Link from "next/link";
import Image from "next/image";
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
    { href: `/${locale}/proyectos`, label: tNav("proyectos") },
    { href: `/${locale}/precios`, label: tNav("precios") },
    { href: `/${locale}/contacto`, label: tNav("contacto") },
    {
      href: `/${locale}/blog`,
      label: locale === "es" ? "Blog" : locale === "en" ? "Blog" : locale === "eu" ? "Bloga" : "Blog",
    },
  ];

  const serviceLinks = [
    {
      href: `/${locale}/servicios#local-business`,
      label:
        locale === "es"
          ? "Web para negocio local"
          : locale === "en"
          ? "Local business website"
          : locale === "eu"
          ? "Tokiko negoziorako weba"
          : "Site pour commerce local",
    },
    {
      href: `/${locale}/servicios#clinic`,
      label:
        locale === "es"
          ? "Web para clínica"
          : locale === "en"
          ? "Clinic website"
          : locale === "eu"
          ? "Klinikaren weba"
          : "Site pour clinique",
    },
    {
      href: `/${locale}/servicios#multilingual`,
      label:
        locale === "es"
          ? "Web multi-idioma"
          : locale === "en"
          ? "Multi-language website"
          : locale === "eu"
          ? "Web eleaniztuna"
          : "Site multilingue",
    },
    {
      href: `/${locale}/servicios#redesign`,
      label:
        locale === "es"
          ? "Rediseño de web"
          : locale === "en"
          ? "Website redesign"
          : locale === "eu"
          ? "Webaren birdiseinua"
          : "Refonte de site",
    },
  ];

  const legalLinks = [
    { href: `/${locale}/privacidad`, label: t("privacyPolicy") },
    { href: `/${locale}/cookies`, label: t("cookiePolicy") },
    { href: `/${locale}/aviso-legal`, label: t("legalNotice") },
  ];

  const cityLinks = [
    { href: `/${locale}/disenador-web-irun`, label: "Irun" },
    { href: `/${locale}/disenador-web-pais-vasco`, label: locale === "eu" ? "Euskal Herria" : "País Vasco" },
    { href: `/${locale}/disenador-web-donostia`, label: locale === "eu" ? "Donostia" : "Donostia-San Sebastián" },
    { href: `/${locale}/disenador-web-bilbao`, label: locale === "eu" ? "Bilbo" : "Bilbao" },
    { href: `/${locale}/disenador-web-vitoria`, label: locale === "eu" ? "Gasteiz" : "Vitoria-Gasteiz" },
    { href: `/${locale}/disenador-web-pamplona`, label: locale === "eu" ? "Iruñea" : "Pamplona" },
    { href: `/${locale}/disenador-web-logrono`, label: "Logroño" },
    { href: `/${locale}/disenador-web-santander`, label: "Santander" },
    { href: `/${locale}/disenador-web-hondarribia`, label: "Hondarribia" },
    { href: `/${locale}/disenador-web-errenteria`, label: "Errenteria" },
    { href: `/${locale}/disenador-web-pasaia`, label: "Pasaia" },
    { href: `/${locale}/disenador-web-lasarte`, label: "Lasarte-Oria" },
    { href: `/${locale}/disenador-web-zarautz`, label: "Zarautz" },
    { href: `/${locale}/disenador-web-tolosa`, label: "Tolosa" },
    { href: `/${locale}/disenador-web-eibar`, label: "Eibar" },
    { href: `/${locale}/disenador-web-getxo`, label: "Getxo" },
    { href: `/${locale}/disenador-web-bermeo`, label: "Bermeo" },
    { href: `/${locale}/disenador-web-bera`, label: "Bera" },
    { href: `/${locale}/disenador-web-lesaka`, label: "Lesaka" },
  ];

  const cityPrefix =
    locale === "es"
      ? "Diseñador web "
      : locale === "en"
      ? "Web designer "
      : locale === "eu"
      ? "Web diseinatzailea "
      : "Créateur de site web ";

  const sectorLinks = [
    {
      href: `/${locale}/web-para-clinicas`,
      label:
        locale === "es"
          ? "clínicas y salud"
          : locale === "en"
          ? "clinics & health"
          : locale === "eu"
          ? "klinikak eta osasuna"
          : "cliniques et santé",
    },
    {
      href: `/${locale}/web-para-hosteleria`,
      label:
        locale === "es"
          ? "bares y restaurantes"
          : locale === "en"
          ? "bars & restaurants"
          : locale === "eu"
          ? "tabernak eta jatetxeak"
          : "bars et restaurants",
    },
    {
      href: `/${locale}/web-para-comercio`,
      label:
        locale === "es"
          ? "comercios y tiendas"
          : locale === "en"
          ? "shops & retail"
          : locale === "eu"
          ? "merkataritza eta dendak"
          : "commerces et boutiques",
    },
    {
      href: `/${locale}/web-para-industria`,
      label:
        locale === "es"
          ? "talleres e industria"
          : locale === "en"
          ? "workshops & industry"
          : locale === "eu"
          ? "tailerrak eta industria"
          : "ateliers et industrie",
    },
    {
      href: `/${locale}/web-para-despachos`,
      label:
        locale === "es"
          ? "despachos profesionales"
          : locale === "en"
          ? "professional firms"
          : locale === "eu"
          ? "bulego profesionalak"
          : "cabinets professionnels",
    },
  ];

  const sectorPrefix =
    locale === "es"
      ? "Web para "
      : locale === "en"
      ? "Websites for "
      : locale === "eu"
      ? "Weba: "
      : "Site pour ";

  return (
    <footer
      className="site-footer"
      aria-label={
        locale === "es"
          ? "Pie de página"
          : locale === "en"
          ? "Footer"
          : locale === "eu"
          ? "Orri-oina"
          : "Pied de page"
      }
    >
      <div className="container-xl site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Link
              href={`/${locale}`}
              className="site-footer-logo focusable"
              aria-label="Unax Aller, Inicio"
            >
              <Image
                src="/images/brand/logo-lockup.webp"
                alt="Unax Aller"
                width={529}
                height={483}
                className="site-footer-logo-img"
                sizes="260px"
              />
            </Link>
            <p className="site-footer-tagline">{t("tagline")}</p>
            <div className="site-footer-socials">
              <a
                href="https://linkedin.com/in/unax-aller-8479b428b"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social focusable"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://instagram.com/unaxaller"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social focusable"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h2 className="site-footer-heading">{t("links.company")}</h2>
            <ul className="site-footer-list">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="site-footer-link focusable">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer-heading">{t("links.services")}</h2>
            <ul className="site-footer-list">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="site-footer-link focusable">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer-heading">
              {locale === "es"
                ? "Contacto"
                : locale === "en"
                ? "Contact"
                : locale === "eu"
                ? "Kontaktua"
                : "Contact"}
            </h2>
            <div className="site-footer-list">
              <a href="mailto:contacto@unaxaller.com" className="site-footer-link site-footer-link-icon focusable">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                contacto@unaxaller.com
              </a>
              <a
                href="https://wa.me/34620909916"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-link site-footer-link-icon focusable"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                +34 620 90 99 16
              </a>
              <div className="site-footer-info">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {locale === "es"
                  ? "País Vasco, España"
                  : locale === "en"
                  ? "Basque Country, Spain"
                  : locale === "eu"
                  ? "Euskal Herria, Espainia"
                  : "Pays basque, Espagne"}
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer-cities">
          <h2 className="site-footer-heading">
            {locale === "es"
              ? "Diseñador web en tu ciudad"
              : locale === "en"
              ? "Web designer in your city"
              : locale === "eu"
              ? "Web diseinatzailea zure hirian"
              : "Créateur de site web dans votre ville"}
          </h2>
          <ul className="site-footer-city-list">
            {cityLinks.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="site-footer-city-link focusable">
                  {cityPrefix}
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-cities">
          <h2 className="site-footer-heading">
            {locale === "es"
              ? "Diseño web por sectores"
              : locale === "en"
              ? "Web design by sector"
              : locale === "eu"
              ? "Web diseinua sektorez"
              : "Création de site par secteur"}
          </h2>
          <ul className="site-footer-city-list">
            {sectorLinks.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="site-footer-city-link focusable">
                  {sectorPrefix}
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copy">
            © {currentYear} Unax Aller ·{" "}
            <a
              href="https://unaxaller.com"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-copy-link focusable"
            >
              unaxaller.com
            </a>
          </p>

          <ul className="site-footer-legal">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="site-footer-legal-link focusable">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
