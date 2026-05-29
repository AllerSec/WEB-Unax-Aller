import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionDivider from "@/components/shared/SectionDivider";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FounderPhoto from "@/components/home/FounderPhoto";
import PricingCard from "@/components/ui/pricing-card";
import ProjectsBoard from "@/components/home/ProjectsBoard";
import SocialProof from "@/components/home/SocialProof";
import Testimonials from "@/components/home/Testimonials";
import { cityLandings, type LocaleKey } from "@/lib/data/city-landings";

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
  locale: LocaleKey;
  slug: string;
  cityName: string;
  regionName: string;
  content: CityLandingContent;
  distanceFromIrunKm?: number;
  localTouches?: string[];
  nearbyCitySlugs?: string[];
}

// Decorative icon glyph for each benefit slot — keeps the "why local" grid
// visually rhythmic without leaning on a generic icon library.
const BENEFIT_GLYPHS = ["◐", "◓", "◑", "◒"] as const;

export default function CityLanding({
  locale,
  slug,
  cityName,
  regionName,
  content,
  distanceFromIrunKm,
  localTouches,
  nearbyCitySlugs,
}: CityLandingProps) {
  const url = `https://unaxaller.com/${locale}/${slug}`;

  const nearby = (nearbyCitySlugs ?? [])
    .map((s) => cityLandings.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: content.heroTitle,
        description: content.intro,
        inLanguage: locale,
        isPartOf: { "@id": "https://unaxaller.com/#website" },
        about: { "@id": "https://unaxaller.com/#business" },
        primaryImageOfPage: `${url}/opengraph-image`,
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

  // Localised section labels
  const localTitle =
    locale === "es"
      ? `Lo que conozco de ${cityName}`
      : locale === "en"
      ? `What I know about ${cityName}`
      : `${cityName}ri buruz dakidana`;
  const localEyebrow =
    locale === "es" ? "Conociendo el terreno" : locale === "en" ? "Knowing the ground" : "Lurraldea ezagutzen";
  const nearbyTitle =
    locale === "es"
      ? "También trabajo en estas ciudades"
      : locale === "en"
      ? "I also work in these cities"
      : "Hiri hauetan ere lan egiten dut";
  const founderEyebrow =
    locale === "es" ? "Quién está detrás" : locale === "en" ? "Who's behind" : "Nor dago atzean";
  const founderTitle =
    locale === "es" ? "Hola, soy Unax." : locale === "en" ? "Hi, I'm Unax." : "Kaixo, Unax naiz.";
  const founderBody =
    locale === "es"
      ? `Diseño y desarrollo cada web a mano desde Irun. Hablas conmigo de principio a fin, sin agencias ni intermediarios. Trabajo con clientes de ${cityName} y de toda ${regionName}: pongo el mismo cuidado, el mismo detalle, esté a 5 km o a 100. Si tengo que pasar horas para resolver un detalle pequeño, las paso.`
      : locale === "en"
      ? `I design and code every site by hand from Irun. You talk to me start to finish, no agencies, no middlemen. I work with clients in ${cityName} and across ${regionName}: same care, same attention to detail, whether you're 5 or 100 km away. If a small thing needs hours to fix, I take them.`
      : `Webgune bakoitza eskuz diseinatu eta garatzen dut Irunetik. Hasieratik amaierara nirekin hitz egiten duzu, agentziarik gabe. ${cityName} eta ${regionName} osoko bezeroekin lan egiten dut: arreta bera, xehetasun bera, 5 km-ra edo 100 km-ra egon. Xehetasun txiki batek orduak behar baditu konpontzeko, hartu egiten ditut.`;
  const founderLink =
    locale === "es" ? "Conóceme mejor" : locale === "en" ? "Get to know me" : "Ezagutu nazazu hobeto";
  const benefitsEyebrow =
    locale === "es" ? "Por qué local" : locale === "en" ? "Why local" : "Zergatik bertakoa";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero — title + intro + CTA. Distance pin moved to bottom of hero. */}
      <section className="page-hero" aria-labelledby="hero-title">
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: content.breadcrumbHome, href: `/${locale}` },
              { name: content.breadcrumbHere },
            ]}
          />
          <div className="page-hero-inner city-hero-inner">
            <div className="city-hero-author" aria-hidden="true">
              <Image
                src="/images/founder-unax.webp"
                alt=""
                width={5712}
                height={4284}
                sizes="(max-width: 768px) 110px, 140px"
              />
            </div>
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
            </div>
          </div>
        </div>
      </section>

      {/* 2. Founder strip */}
      <AnimatedSection>
        <section className="founder-strip" aria-labelledby="city-founder-title">
          <div className="container-xl founder-strip-inner">
            <FounderPhoto
              alt={
                locale === "es"
                  ? "Foto de Unax Aller, diseñador y desarrollador web"
                  : locale === "en"
                  ? "Photo of Unax Aller, web designer and developer"
                  : "Unax Aller, web diseinatzaile eta garatzailearen argazkia"
              }
            />
            <div className="founder-strip-content">
              <span className="founder-strip-eyebrow">{founderEyebrow}</span>
              <h2 id="city-founder-title" className="founder-strip-title">{founderTitle}</h2>
              <p className="founder-strip-body">{founderBody}</p>
              <Link href={`/${locale}/sobre-nosotros`} className="founder-strip-link focusable">
                {founderLink}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 3. Projects board — front and centre */}
      <AnimatedSection>
        <ProjectsBoard locale={locale} />
      </AnimatedSection>

      <SectionDivider background="var(--color-bg)" />

      {/* 4. Pricing */}
      <div className="surface-alt">
        <PricingCard locale={locale} headingLevel="h2" />
      </div>

      <SectionDivider background="var(--color-bg)" />

      {/* 5. Local benefits — playful redesign with numbered cards + glyphs */}
      <section className="city-benefits-section" aria-labelledby="benefits-title">
        <div className="container-xl">
          <AnimatedSection>
            <header className="city-benefits-header">
              <span className="city-benefits-eyebrow">{benefitsEyebrow}</span>
              <h2 id="benefits-title" className="city-benefits-title">{content.benefitsTitle}</h2>
            </header>
            <ul className="city-benefits-grid" role="list">
              {content.benefits.map((item, i) => (
                <li key={i} className="city-benefit-tile" style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="city-benefit-tile-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="city-benefit-tile-glyph" aria-hidden="true">
                    {BENEFIT_GLYPHS[i % BENEFIT_GLYPHS.length]}
                  </span>
                  <h3 className="city-benefit-tile-title">{item.title}</h3>
                  <p className="city-benefit-tile-desc">{item.desc}</p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. Social proof */}
      <SocialProof />

      <SectionDivider background="var(--color-bg)" />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Local touches — pushed down, designed as a magazine spread */}
      {localTouches && localTouches.length > 0 && (
        <section className="city-local-section" aria-labelledby="city-local-title">
          <div className="container-xl">
            <AnimatedSection>
              <div className="city-local-grid">
                <div className="city-local-aside">
                  <span className="city-local-eyebrow">{localEyebrow}</span>
                  <h2 id="city-local-title" className="city-local-title">{localTitle}</h2>
                  {distanceFromIrunKm !== undefined && (
                    <div className="city-local-pin">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>
                        {locale === "es"
                          ? `A ${distanceFromIrunKm} km · reuniones presenciales posibles`
                          : locale === "en"
                          ? `${distanceFromIrunKm} km away · in-person meetings available`
                          : `${distanceFromIrunKm} km-ra · aurrez aurreko bilerak posibleak`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="city-local-prose">
                  {localTouches.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* 9. FAQ */}
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

      {/* 10. Nearby cities */}
      {nearby.length > 0 && (
        <section className="city-section city-nearby" aria-labelledby="city-nearby-title">
          <div className="container-xl">
            <div className="city-section-inner">
              <AnimatedSection>
                <h2 id="city-nearby-title" className="section-heading">{nearbyTitle}</h2>
                <ul className="city-nearby-list" role="list">
                  {nearby.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${locale}/${c.slug}`} className="city-nearby-chip focusable">
                        <span className="city-nearby-chip-name">{c.cityNames[locale]}</span>
                        <span className="city-nearby-chip-region">{c.regionNames[locale]}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* 11. Final CTA */}
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
