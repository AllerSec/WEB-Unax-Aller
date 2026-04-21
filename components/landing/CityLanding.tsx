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
          {
            "@type": "ListItem",
            position: 1,
            name: content.breadcrumbHome,
            item: `https://unaxaller.com/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.breadcrumbHere,
            item: url,
          },
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
        className="pt-32 pb-20 md:pt-44 md:pb-28"
        style={{ backgroundColor: "#faf9f4" }}
        aria-labelledby="hero-title"
      >
        <div className="container-xl max-w-3xl">
          <Breadcrumbs
            items={[
              { name: content.breadcrumbHome, href: `/${locale}` },
              { name: content.breadcrumbHere },
            ]}
          />
          <h1
            id="hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {content.heroTitle}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {content.intro}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#061b0e",
              color: "#ffffff",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            {content.quoteBtn}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          {distanceFromIrunKm !== undefined && (
            <p
              className="mt-4 text-sm"
              style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es"
                ? `📍 A ${distanceFromIrunKm} km de Irun — reuniones presenciales posibles`
                : locale === "en"
                ? `📍 ${distanceFromIrunKm} km from Irun — in-person meetings available`
                : `📍 Iruntik ${distanceFromIrunKm} kmra — aurrez aurreko bilerak posibleak`}
            </p>
          )}
        </div>
      </section>

      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "#efeee9" }}
        aria-labelledby="benefits-title"
      >
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              id="benefits-title"
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {content.benefitsTitle}
            </h2>
            <div className="flex flex-col gap-6">
              {content.benefits.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "#faf9f4", border: "1px solid #e3e3de" }}
                >
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{
                      fontFamily: "Newsreader, Georgia, serif",
                      color: "#061b0e",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {content.faq.length > 0 && (
        <section
          className="py-20 md:py-28"
          style={{ backgroundColor: "#faf9f4" }}
          aria-labelledby="faq-title"
        >
          <div className="container-xl max-w-3xl">
            <h2
              id="faq-title"
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {content.faqTitle}
            </h2>
            <div className="flex flex-col divide-y" style={{ borderColor: "#e3e3de" }}>
              {content.faq.map((item, i) => (
                <details key={i} className="group py-5">
                  <summary
                    className="flex justify-between items-center cursor-pointer text-base font-medium list-none"
                    style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.q}
                    <svg
                      className="ml-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
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
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20" style={{ backgroundColor: "#061b0e" }} aria-label="Call to action">
        <div className="container-xl text-center">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {content.ctaTitle}
            </h2>
            <p
              className="mb-8 text-sm"
              style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
            >
              {content.ctaSub}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#b4cdb8",
                color: "#061b0e",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {content.ctaBtn}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
