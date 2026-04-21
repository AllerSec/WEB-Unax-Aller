import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export interface CityLandingContent {
  benefits: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  intro: string;
  heroTitle: string;
  benefitsTitle: string;
  ctaTitle: string;
  ctaSub: string;
  ctaBtn: string;
  faqTitle: string;
  breadcrumbHome: string;
  breadcrumbHere: string;
  quoteBtn: string;
}

export interface CityLandingProps {
  locale: "es" | "en" | "eu";
  slug: string;
  cityName: string;
  regionName: string;
  content: CityLandingContent;
  distanceFromIrunKm?: number;
}

export default function CityLanding({
  locale,
  slug,
  cityName,
  regionName,
  content,
  distanceFromIrunKm,
}: CityLandingProps) {
  const url = `https://unaxaller.com/${locale}/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        url: "https://unaxaller.com",
        areaServed: [
          { "@type": "City", name: cityName },
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: regionName },
        ],
        serviceType: "Diseño y Desarrollo Web",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: content.heroTitle,
        description: content.intro,
        inLanguage: locale,
        isPartOf: { "@id": "https://unaxaller.com/#website" },
        primaryImageOfPage: `https://unaxaller.com/opengraph-image`,
      },
      {
        "@type": "FAQPage",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["details summary", "details p"],
        },
        mainEntity: content.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: content.breadcrumbHome, item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: content.breadcrumbHere, item: url },
        ],
      },
    ],
  };

  const distanceLabel =
    distanceFromIrunKm !== undefined
      ? locale === "es"
        ? `A ${distanceFromIrunKm} km de Irun — reuniones presenciales posibles`
        : locale === "en"
        ? `${distanceFromIrunKm} km from Irun — in-person meetings available`
        : `Iruntik ${distanceFromIrunKm} km-ra — aurrez aurreko bilerak posibleak`
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero" aria-labelledby="hero-title">
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: content.breadcrumbHome, href: `/${locale}` },
              { name: content.breadcrumbHere },
            ]}
          />
          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">{cityName}</span>
            <h1 id="hero-title" className="page-hero-title">{content.heroTitle}</h1>
            <p className="page-hero-subtitle">{content.intro}</p>
            <div className="city-hero-cta">
              <Link href={`/${locale}/contacto`} className="btn btn-primary btn-lg focusable">
                {content.quoteBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              {distanceLabel && (
                <p className="city-hero-distance" aria-label="distance">
                  <span aria-hidden="true">📍 </span>{distanceLabel}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="city-section" aria-labelledby="benefits-title">
        <div className="container-xl">
          <div className="city-section-inner">
            <AnimatedSection>
              <h2 id="benefits-title" className="section-heading">{content.benefitsTitle}</h2>
              <div className="city-benefits-list">
                {content.benefits.map((item, i) => (
                  <div key={i} className="city-benefit-card">
                    <h3 className="city-benefit-title">{item.title}</h3>
                    <p className="city-benefit-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {content.faq.length > 0 && (
        <section className="city-faq-section" aria-labelledby="faq-title">
          <div className="container-xl">
            <div className="faq-wrap">
              <h2 id="faq-title" className="section-heading">{content.faqTitle}</h2>
              <div className="faq-list">
                {content.faq.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-summary">
                      {item.q}
                      <svg
                        className="faq-caret"
                        width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <p className="faq-answer">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="city-cta-section" aria-label="Call to action">
        <div className="container-xl">
          <div className="city-cta-inner">
            <AnimatedSection>
              <h2 className="city-cta-heading">{content.ctaTitle}</h2>
              <p className="city-cta-sub">{content.ctaSub}</p>
              <Link href={`/${locale}/contacto`} className="dark-cta-button focusable">
                {content.ctaBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
