import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Contacto: Agenda tu Consulta Gratuita",
    en: "Contact: Book Your Free Consultation",
    eu: "Kontaktua: Doako Kontsulta Antolatu",
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
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: t("info.phone"),
      href: "tel:+34620909916",
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
        name: "Contacto, Unax Aller",
        url: `https://unaxaller.com/${locale}/contacto`,
        mainEntity: { "@id": "https://unaxaller.com/#business" },
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller, Diseñador Web",
        email: "contacto@unaxaller.com",
        telephone: "+34620909916",
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

      <section
        className="contact-whatsapp-hero"
        aria-label={
          locale === "es"
            ? "Contacto rápido por WhatsApp"
            : locale === "en"
            ? "Quick contact via WhatsApp"
            : "Kontaktu azkarra WhatsApp bidez"
        }
      >
        <div className="container-xl">
          <div className="contact-wa-card">
            <div className="contact-wa-badge" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16.003 3C9.374 3 4 8.373 4 14.999c0 2.385.703 4.604 1.91 6.467L4 29l7.728-1.886a11.96 11.96 0 0 0 4.275.781h.005C22.628 27.895 28 22.522 28 15.896 28 12.741 26.747 9.77 24.5 7.523A11.83 11.83 0 0 0 16.003 3Zm.002 21.81h-.004a9.91 9.91 0 0 1-5.05-1.382l-.362-.215-4.187 1.022 1.038-4.083-.236-.378a9.85 9.85 0 0 1-1.51-5.275c0-5.448 4.434-9.882 9.886-9.882 2.638 0 5.118 1.029 6.984 2.897a9.83 9.83 0 0 1 2.892 6.99c-.002 5.45-4.436 9.882-9.451 9.882Zm5.42-7.395c-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.149-.668.149-.198.297-.766.967-.94 1.166-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.76-1.654-2.057-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.668-1.611-.915-2.205-.241-.58-.486-.501-.668-.51l-.57-.011a1.1 1.1 0 0 0-.793.372c-.272.298-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.095 3.202 5.078 4.49.71.306 1.262.488 1.694.625.711.226 1.359.194 1.871.118.571-.085 1.758-.719 2.006-1.414.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347Z"/>
              </svg>
            </div>

            <div className="contact-wa-body">
              <span className="contact-wa-eyebrow">
                {locale === "es"
                  ? "Forma más rápida"
                  : locale === "en"
                  ? "Fastest way"
                  : "Modu azkarrena"}
              </span>
              <h2 className="contact-wa-title">
                {locale === "es"
                  ? "Escríbeme por WhatsApp"
                  : locale === "en"
                  ? "Message me on WhatsApp"
                  : "Idatzi WhatsApp bidez"}
              </h2>
              <p className="contact-wa-subtitle">
                {locale === "es"
                  ? "Respondo el mismo día."
                  : locale === "en"
                  ? "Same-day reply."
                  : "Egun berean erantzuten dizut."}
              </p>
            </div>

            <a
              href={`https://wa.me/34620909916?text=${encodeURIComponent(
                locale === "es"
                  ? "Hola Unax, me gustaría hablar sobre un proyecto web."
                  : locale === "en"
                  ? "Hi Unax, I'd like to talk about a web project."
                  : "Kaixo Unax, web proiektu bati buruz hitz egin nahi nuke."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-wa-cta focusable"
              aria-label={
                locale === "es"
                  ? "Abrir conversación de WhatsApp con Unax Aller"
                  : locale === "en"
                  ? "Open WhatsApp chat with Unax Aller"
                  : "Ireki WhatsApp txata Unax Allerrekin"
              }
            >
              <span>
                {locale === "es"
                  ? "Abrir WhatsApp"
                  : locale === "en"
                  ? "Open WhatsApp"
                  : "Ireki WhatsApp"}
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="contact-wa-divider" aria-hidden="true">
            <span className="contact-wa-divider-line" />
            <span className="contact-wa-divider-text">
              {locale === "es"
                ? "o si prefieres, escríbeme aquí"
                : locale === "en"
                ? "or if you prefer, write to me here"
                : "edo nahiago baduzu, idatzi hemen"}
            </span>
            <span className="contact-wa-divider-line" />
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
                        "Respuesta el mismo día por WhatsApp",
                        "0€ al firmar · cuota fija de 149€/mes",
                        "30 días de garantía desde el lanzamiento",
                        "Cambios al WhatsApp incluidos cada mes",
                      ]
                    : locale === "en"
                    ? [
                        "Same-day reply over WhatsApp",
                        "€0 to sign · fixed €149/month",
                        "30-day guarantee from launch",
                        "Monthly changes over WhatsApp included",
                      ]
                    : [
                        "Egun bereko erantzuna WhatsApp bidez",
                        "0€ sinatzean · 149€/hil kuota finkoa",
                        "30 eguneko bermea abiarazi eta gero",
                        "Hileroko aldaketak WhatsApp bidez barne",
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
