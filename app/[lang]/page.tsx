import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import ServicesGrid from "@/components/home/ServicesGrid";
import Testimonials from "@/components/home/Testimonials";
import PricingCards from "@/components/pricing/PricingCards";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { siteConfig } from "@/lib/utils";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: "Unax Aller — Diseño y Desarrollo Web Premium",
    description: t("subtitle"),
    alternates: {
      canonical: `https://unaxaller.com/${locale}`,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller",
        url: "https://unaxaller.com",
        logo: "https://unaxaller.com/favicon.svg",
        description:
          "Diseño y desarrollo web premium en el País Vasco. Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "País Vasco",
          addressRegion: "Basque Country",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.263,
          longitude: -2.935,
        },
        priceRange: "€€€",
        email: "hola@unaxaller.com",
        openingHours: "Mo-Fr 09:00-18:00",
        sameAs: [
          "https://linkedin.com/company/unaxaller",
          "https://instagram.com/unaxaller",
        ],
      },
      {
        "@type": "WebDesign",
        "@id": "https://unaxaller.com/#service",
        name: "Diseño y Desarrollo Web Premium",
        provider: { "@id": "https://unaxaller.com/#business" },
        areaServed: {
          "@type": "Country",
          name: "Spain",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planes de Diseño Web",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Plan Completo",
              price: "1300",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1300",
                priceCurrency: "EUR",
                description: "IVA incluido",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://unaxaller.com/#website",
        url: "https://unaxaller.com",
        name: "Unax Aller",
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: ["es", "en", "eu"],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Hero locale={locale} />

      {/* Pricing preview */}
      <div style={{ backgroundColor: "#f5f4ef" }}>
        <PricingCards locale={locale} headingLevel="h2" />
      </div>

      {/* Social Proof */}
      <SocialProof />

      {/* Services Grid */}
      <ServicesGrid locale={locale} />

      {/* Testimonials */}
      <Testimonials />

      {/* Bottom CTA strip */}
      <AnimatedSection>
        <section
          className="py-20 md:py-28"
          style={{ backgroundColor: "#061b0e" }}
          aria-label="Call to action"
        >
          <div className="container-xl text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light mb-5"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {t("contact.title")}
            </h2>
            <p
              className="text-base md:text-lg max-w-xl mx-auto mb-10"
              style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
            >
              {t("contact.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#b4cdb8",
                  color: "#061b0e",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {t("hero.cta")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/precios`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: "1.5px solid #364c3c",
                  color: "#b4cdb8",
                  fontFamily: "Manrope, sans-serif",
                  backgroundColor: "transparent",
                }}
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
