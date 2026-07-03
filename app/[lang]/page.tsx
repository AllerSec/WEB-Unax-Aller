import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { cityLandings } from "@/lib/data/city-landings";
import HomeCtaWrapper from "@/components/home/HomeCtaWrapper";
import SocialProof from "@/components/home/SocialProof";
import PainSection from "@/components/home/PainSection";
import Testimonials from "@/components/home/Testimonials";
import PricingCard from "@/components/ui/pricing-card";
import AnimatedSection from "@/components/shared/AnimatedSection";
import GuaranteeBlock from "@/components/shared/GuaranteeBlock";
import GoogleMapsMock from "@/components/shared/GoogleMapsMock";
import PhoneMockup from "@/components/shared/PhoneMockup";
import LiveCallCounter from "@/components/shared/LiveCallCounter";
import SectorMarquee from "@/components/shared/SectorMarquee";
import { Gallery4 } from "@/components/ui/gallery4";
import { HOME_COPY } from "@/lib/i18n/home-copy";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";
  const title = "Web para negocio local · 1.300€, 1er año incluido · Unax Aller";
  const description =
    "Web para negocios de Gipuzkoa, Bizkaia y Navarra: pago único de 1.300€ + IVA con el primer año incluido (web, Google Maps, reseñas, hosting, soporte WhatsApp) y 30 días de garantía. Pensado para clínicas, despachos, industria B2B y comercio profesional.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}`,
      languages: hreflangAlternates(""),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "" }),
    twitter: buildTwitter({ title, description, locale, path: "" }),
    other: {
      "geo.region": "ES-PV",
      "geo.placename": "Irun, Gipuzkoa",
      "geo.position": "43.3390;-1.7892",
      ICBM: "43.3390, -1.7892",
    },
  };
}

function buildHomeJsonLd(
  locale: "es" | "en" | "eu" | "fr",
  faqItems: { q: string; a: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://unaxaller.com/#website",
        url: "https://unaxaller.com",
        name: "Unax Aller",
        description:
          "Webs para negocios locales de Gipuzkoa, Bizkaia y Navarra. Pago único con el primer año de mantenimiento incluido.",
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: ["es-ES", "en-GB", "eu-ES", "fr-FR"],
        // SearchAction removed: the blog index doesn't accept ?q= queries,
        // and Googlebot was indexing the template URL as an alternate page
        // (GSC: "Alternate page with proper canonical tag"). Reintroduce only
        // when there is a real /buscar endpoint backing the query.
      },
      {
        "@type": "Person",
        "@id": "https://unaxaller.com/#person",
        name: "Unax Aller Fernández",
        givenName: "Unax",
        familyName: "Aller Fernández",
        jobTitle: "Diseño de webs para negocios locales",
        url: `https://unaxaller.com/${locale}/sobre-nosotros`,
        image: "https://unaxaller.com/images/founder-unax.webp",
        email: "contacto@unaxaller.com",
        telephone: "+34620909916",
        knowsLanguage: ["es", "eu", "en", "fr"],
        knowsAbout: [
          "Diseño web para negocio local",
          "Google Business Profile",
          "Google Maps optimización",
          "SEO local",
          "Captación de reseñas",
          "Webs para pymes",
          "Web para negocio local todo incluido",
          "WhatsApp Business",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad Alfonso X el Sabio",
          sameAs: "https://www.uax.es",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          postalCode: "20300",
          addressCountry: "ES",
        },
        worksFor: { "@id": "https://unaxaller.com/#business" },
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller · Webs para negocios locales",
        legalName: "Unax Aller Fernández",
        url: "https://unaxaller.com",
        logo: {
          "@type": "ImageObject",
          url: "https://unaxaller.com/favicon.svg",
          width: 512,
          height: 512,
        },
        image: "https://unaxaller.com/images/founder-unax.webp",
        description:
          "Webs para negocios locales de Gipuzkoa, Bizkaia y Navarra: pago único de 1.300€ + IVA con el primer año incluido (diseño, hosting, dominio, Google Maps, reseñas, soporte WhatsApp).",
        founder: { "@id": "https://unaxaller.com/#person" },
        knowsLanguage: ["es", "eu", "en", "fr"],
        inLanguage: ["es", "en", "eu", "fr"],
        currenciesAccepted: "EUR",
        paymentAccepted: "Bank transfer, Bizum",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Irun",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          postalCode: "20300",
          addressCountry: "ES",
        },
        geo: { "@type": "GeoCoordinates", latitude: 43.339, longitude: -1.7892 },
        priceRange: "€€",
        email: "contacto@unaxaller.com",
        telephone: "+34620909916",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        slogan: "Más llamadas para tu negocio local · 1.300€, 1er año incluido",
        // Sincronizado con el Google Business Profile real (jun 2026):
        // "Unax Aller - Diseño y Desarrollo Web" → 5,0 con 3 reseñas.
        // NO inflar: un AggregateRating no verificable es riesgo de penalización.
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "3",
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "City", name: "Donostia-San Sebastián" },
          { "@type": "City", name: "Bilbao" },
          { "@type": "City", name: "Vitoria-Gasteiz" },
          { "@type": "City", name: "Pamplona" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
          { "@type": "AdministrativeArea", name: "Navarra" },
          { "@type": "Country", name: "España" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web para negocio local todo incluido",
          itemListElement: [
            {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: "1300",
              availability: "https://schema.org/InStock",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "1300",
                priceCurrency: "EUR",
                valueAddedTaxIncluded: false,
              },
              // Plazo de entrega real verificado: 1 semana (7 días).
              deliveryLeadTime: {
                "@type": "QuantitativeValue",
                minValue: 5,
                maxValue: 7,
                unitCode: "DAY",
              },
              itemOffered: {
                "@type": "Service",
                name: "Web para negocio local",
                description: "Web profesional, Google Maps optimizado, captación de reseñas, hosting, dominio y soporte WhatsApp. Pago único con el primer año incluido. Entrega en una semana.",
              },
            },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Optimización de Google Business Profile" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sistema de captación de reseñas" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO local para Gipuzkoa" } },
          ],
        },
      },
      {
        // FAQPage generada desde el copy visible de la sección FAQ del home,
        // para que Google/IA puedan extraer las respuestas. speakable apunta a
        // los <details>/<summary> renderizados abajo (AEO / asistentes de voz).
        "@type": "FAQPage",
        "@id": `https://unaxaller.com/${locale}#faq`,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".lp-faq-summary", ".lp-faq-answer"],
        },
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://unaxaller.com/${locale}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : locale === "eu" ? "Hasiera" : "Accueil",
            item: `https://unaxaller.com/${locale}`,
          },
        ],
      },
    ],
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";
  // Enable static rendering for this page (see layout note). Must precede any
  // next-intl API used by child Server Components.
  setRequestLocale(locale);
  const copy = HOME_COPY[locale];

  return (
    <>
      {/* JSON-LD — static server-generated data. Escapamos "<" → < para
          evitar inyección de etiquetas si el copy llegara a contenerlas. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHomeJsonLd(locale, copy.faq.items)).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── 1. HERO con shader animado ── */}
      <HomeCtaWrapper
        locale={locale}
        hero={{
          trustBadge: copy.hero.trustBadge,
          headlineLine1: copy.hero.headlineLine1,
          headlineLine2: copy.hero.headlineLine2,
          subtitle: copy.hero.subtitle,
          primaryCta: copy.hero.primaryCta,
          secondaryCta: copy.hero.secondaryCta,
        }}
        finalCta={copy.finalCta}
      />

      {/* ── 2. MÉTRICAS — confianza instantánea ── */}
      <SocialProof />

      {/* ── 3. PROBLEMA — agitar el dolor ── */}
      <PainSection />

      {/* ── 3b. VISUAL DE GOOGLE MAPS + MÓVIL — el bombazo visual del modelo ── */}
      <AnimatedSection>
        <section className="lp-mockups" aria-label={copy.mockups.ariaLabel}>
          <div className="container-xl">
            <div className="lp-mockups-grid">
              <div className="lp-mockups-text">
                <span className="lp-eyebrow">{copy.mockups.eyebrow}</span>
                <h2 className="lp-section-title">
                  {copy.mockups.titleA}
                  <span style={{ color: "var(--color-accent)" }}>{copy.mockups.titleHighlight}</span>
                  {copy.mockups.titleB}
                </h2>
                <p className="lp-body">{copy.mockups.body}</p>
                <ul className="lp-mockups-list">
                  {copy.mockups.bullets.map((b) => (
                    <li key={b}>
                      <span aria-hidden="true">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>{" "}
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lp-mockups-visuals">
                <div className="lp-mockups-maps">
                  <GoogleMapsMock locale={locale} />
                </div>
                <div className="lp-mockups-phone">
                  <PhoneMockup locale={locale} variant="maps" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 3c. SECTORES — marquee con quiénes son mis clientes ── */}
      <SectorMarquee locale={locale} />

      {/* ── 4. FUNDADOR — cara visible, humaniza la propuesta ── */}
      <AnimatedSection>
        <section className="lp-founder" aria-labelledby="lp-founder-title">
          <div className="container-xl lp-founder-inner">
            <div className="lp-founder-photo">
              <Image
                src="/images/founder-unax.webp"
                alt={copy.founder.imageAlt}
                width={400}
                height={400}
                sizes="(max-width: 768px) 260px, 400px"
              />
            </div>
            <div className="lp-founder-content">
              <span className="lp-eyebrow">{copy.founder.eyebrow}</span>
              <h2 id="lp-founder-title" className="lp-founder-title">
                {copy.founder.title}
              </h2>
              <p className="lp-body">
                {copy.founder.bodyA}
                <strong>{copy.founder.bodyStrong}</strong>
                {copy.founder.bodyB}
              </p>
              <ul className="lp-founder-facts">
                <li>
                  <svg className="lp-fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{copy.founder.location}</span>
                </li>
                <li>
                  <svg className="lp-fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>{copy.founder.whatsapp}</span>
                </li>
                <li>
                  <svg className="lp-fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                  </svg>
                  <span>{copy.founder.languages}</span>
                </li>
                <li>
                  <svg className="lp-fact-icon lp-fact-icon--star" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{copy.founder.reviews}</span>
                </li>
              </ul>
              <Link href={`/${locale}/sobre-nosotros`} className="lp-link">
                {copy.founder.link}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 4b. COUNTERS — resultados medibles del primer trimestre ── */}
      <AnimatedSection>
        <section className="lp-counters" aria-label={copy.counters.ariaLabel}>
          <div className="container-xl">
            <LiveCallCounter locale={locale} />
          </div>
        </section>
      </AnimatedSection>

      {/* ── 5. PROCESO — 7 pasos, reduce ansiedad ── */}
      <section className="lp-process" aria-labelledby="lp-process-title">
        <div className="container-xl">
          <AnimatedSection>
            <div className="lp-section-header">
              <span className="lp-eyebrow">{copy.process.eyebrow}</span>
              <h2 id="lp-process-title" className="lp-section-title lp-section-title--center">
                {copy.process.title}
              </h2>
              <p className="lp-body lp-body--center">
                {copy.process.subtitle}
              </p>
            </div>
          </AnimatedSection>
          <div className="lp-steps">
            {copy.process.steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="lp-step">
                  <div className="lp-step-icon" aria-hidden="true">
                    {i === 0 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                      </svg>
                    )}
                    {i === 1 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
                      </svg>
                    )}
                    {i === 2 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                    {i === 3 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    )}
                  </div>
                  <div className="lp-step-content">
                    <h3 className="lp-step-title">{step.title}</h3>
                    <p className="lp-step-desc">{step.desc}</p>
                  </div>
                  <span className="lp-step-number" aria-hidden="true">{step.n}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SERVICIOS ── */}
      <section className="lp-services" aria-labelledby="lp-services-title">
        <div className="container-xl">
          <AnimatedSection>
            <div className="lp-section-header">
              <span className="lp-eyebrow">{copy.services.eyebrow}</span>
              <h2 id="lp-services-title" className="lp-section-title lp-section-title--center">
                {copy.services.title}
              </h2>
            </div>
          </AnimatedSection>
          <div className="lp-services-grid">
            {[
              <svg key="i0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
              </svg>,
              <svg key="i1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9h18l-1.5 10.5a2 2 0 0 1-2 1.5h-11a2 2 0 0 1-2-1.5L3 9Z" />
                <path d="M8 9V6a4 4 0 0 1 8 0v3" />
              </svg>,
              <svg key="i2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
              </svg>,
              <svg key="i3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>,
              <svg key="i4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 20h20" />
                <path d="M4 20V10l5 4V10l5 4V6l5 4v10" />
              </svg>,
            ].map((icon, i) => {
              const s = copy.services.cards[i];
              return (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="lp-service-card">
                    <span className="lp-service-icon">{icon}</span>
                    <h3 className="lp-service-title">{s.title}</h3>
                    <p className="lp-service-desc">{s.desc}</p>
                    <div className="lp-service-tags">
                      {s.tags.map((tag) => (
                        <span key={tag} className="lp-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          <AnimatedSection className="lp-services-cta">
            <Link href={`/${locale}/servicios`} className="lp-link">
              {copy.services.seeAll}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 7. PROYECTOS — carrusel móvil con capturas reales ── */}
      <AnimatedSection>
        <Gallery4
          locale={locale}
          title={copy.gallery.title}
          description={copy.gallery.description}
          items={copy.gallery.items(locale)}
        />
      </AnimatedSection>

      {/* ── 8. PRECIOS — plan único: 1.300€ pago único, primer año incluido ── */}
      <section id="precios" aria-label={copy.pricing.ariaLabel}>
        <PricingCard locale={locale} headingLevel="h2" />
      </section>

      {/* ── 8b. GARANTÍA ROTUNDA — repetir el mantra ── */}
      <GuaranteeBlock locale={locale} />

      {/* ── 9. TESTIMONIOS ── */}
      <Testimonials />

      {/* ── 10. FAQ — eliminar objeciones ── */}
      <section className="lp-faq" aria-labelledby="lp-faq-title">
        <div className="container-xl lp-faq-inner">
          <AnimatedSection>
            <div className="lp-section-header">
              <span className="lp-eyebrow">{copy.faq.eyebrow}</span>
              <h2 id="lp-faq-title" className="lp-section-title lp-section-title--center">
                {copy.faq.title}
              </h2>
            </div>
          </AnimatedSection>
          <div className="lp-faq-grid">
            {copy.faq.items.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <details className="lp-faq-item">
                  <summary className="lp-faq-summary">
                    {item.q}
                    <svg
                      className="lp-faq-caret"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="lp-faq-answer">{item.a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final — renderizado dentro de HomeCtaWrapper (client component) */}
    </>
  );
}
