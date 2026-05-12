import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Contacto — Agenda tu Consulta Gratuita",
    en: "Contact — Book Your Free Consultation",
    eu: "Kontaktua — Doako Kontsulta Antolatu",
  };
  const descriptions: Record<string, string> = {
    es: "Cuéntanos tu proyecto. Respondemos en menos de 24 horas con una propuesta inicial gratuita. Diseño y desarrollo web premium.",
    en: "Tell us about your project. We respond within 24 hours with a free initial proposal. Premium web design and development.",
    eu: "Kontatu zure proiektua. 24 ordutan baino gutxiagotan erantzuten dugu doako hasierako proposamen batekin.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/contacto`,
      languages: hreflangAlternates("/contacto"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/contacto" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ContactoPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale, namespace: "contact" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const infoItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: t("info.location"),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: t("info.email"),
      href: "mailto:contacto@unaxaller.com",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: t("info.response"),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      label: t("info.availability"),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contacto — Unax Aller",
        url: `https://unaxaller.com/${locale}/contacto`,
        mainEntity: { "@id": "https://unaxaller.com/#business" },
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        email: "contacto@unaxaller.com",
        url: "https://unaxaller.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          postalCode: "20300",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.339,
          longitude: -1.7892,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Contacto" : locale === "en" ? "Contact" : "Kontaktua", item: `https://unaxaller.com/${locale}/contacto` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="page-hero"
        data-page="contacto"
        aria-label={locale === "es" ? "Contacto" : locale === "en" ? "Contact" : "Kontaktua"}
      >
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              { name: locale === "es" ? "Contacto" : locale === "en" ? "Contact" : "Kontaktua" },
            ]}
          />

          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">{tNav("contacto")}</span>
            <h1 className="page-hero-title">{t("title")}</h1>
            <p className="page-hero-subtitle">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      <section aria-label="Contact form">
        <div className="container-xl">
          <div className="contact-grid">
            <AnimatedSection>
              <div className="contact-what-happens">
                <h2 className="contact-what-title">
                  {locale === "es" ? "¿Qué pasa cuando contactas?" : locale === "en" ? "What happens when you get in touch?" : "Zer gertatzen da kontaktuan jartzen zarenean?"}
                </h2>
                <div className="contact-steps-row">
                  {(locale === "es" ? [
                    { step: "1", text: "Me llega tu mensaje en minutos" },
                    { step: "2", text: "Te respondo en menos de 24h con una propuesta inicial" },
                    { step: "3", text: "Si encaja, agendamos una llamada de 30 min gratis" },
                  ] : locale === "en" ? [
                    { step: "1", text: "Your message reaches me in minutes" },
                    { step: "2", text: "I reply within 24h with an initial proposal" },
                    { step: "3", text: "If it fits, we schedule a free 30-min call" },
                  ] : [
                    { step: "1", text: "Zure mezua minututan iristen zait" },
                    { step: "2", text: "24 ordutan erantzuten dizut hasierako proposamen batekin" },
                    { step: "3", text: "Bat badator, 30 minutuko dei doan bat antolatzen dugu" },
                  ]).map((item) => (
                    <div key={item.step} className="contact-step">
                      <span className="contact-step-number">{item.step}</span>
                      <p className="contact-step-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <ContactForm locale={locale} />

            <aside className="contact-aside">
              <div className="contact-info-grid">
                {infoItems.map((item, i) => (
                  <div key={i} className="contact-info-card">
                    <div className="contact-info-icon" aria-hidden="true">
                      {item.icon}
                    </div>
                    {item.href ? (
                      <a href={item.href} className="contact-info-label">
                        {item.label}
                      </a>
                    ) : (
                      <span className="contact-info-label">{item.label}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="contact-trust">
                <h2 className="contact-trust-heading">
                  {locale === "es"
                    ? "¿Por qué elegirnos?"
                    : locale === "en"
                    ? "Why choose us?"
                    : "Zergatik aukeratu?"}
                </h2>
                <ul className="contact-trust-list">
                  {(locale === "es"
                    ? [
                        "Presupuesto gratuito en 24h",
                        "Sin compromiso ni permanencia",
                        "Código limpio, tuyo para siempre",
                        "Soporte post-lanzamiento incluido",
                      ]
                    : locale === "en"
                    ? [
                        "Free quote within 24 hours",
                        "No commitment or lock-in",
                        "Clean code, yours forever",
                        "Post-launch support included",
                      ]
                    : [
                        "Doako aurrekontua 24 ordutan",
                        "Konpromezurik eta permanentziarik gabe",
                        "Kode garbia, betirako zurea",
                        "Abiarazte osteko laguntza barne",
                      ]
                  ).map((item, i) => (
                    <li key={i} className="contact-trust-item">
                      <svg
                        className="contact-trust-check"
                        width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
