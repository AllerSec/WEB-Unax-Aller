import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Sobre Nosotros — Estudio Web Premium | Unax Aller",
    en: "About — Premium Web Studio | Unax Aller",
    eu: "Gu buruz — Web Estudio Premium | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Conoce a Unax Aller, el estudio de diseño y desarrollo web premium del País Vasco. Nuestros valores, proceso y filosofía.",
    en: "Meet Unax Aller, the premium web design and development studio from the Basque Country. Our values, process and philosophy.",
    eu: "Ezagutu Unax Aller, Euskal Herriko web diseinu eta garapen estudio premium-a. Gure balioak, prozesua eta filosofia.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/sobre-nosotros` },
  };
}

export default async function SobreNosotrosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  const values = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: t("values.craft.title"),
      description: t("values.craft.description"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      title: t("values.results.title"),
      description: t("values.results.description"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: t("values.transparency.title"),
      description: t("values.transparency.description"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
    },
  ];

  const steps = [
    {
      number: t("process.steps.0.number"),
      title: t("process.steps.0.title"),
      description: t("process.steps.0.description"),
    },
    {
      number: t("process.steps.1.number"),
      title: t("process.steps.1.title"),
      description: t("process.steps.1.description"),
    },
    {
      number: t("process.steps.2.number"),
      title: t("process.steps.2.title"),
      description: t("process.steps.2.description"),
    },
    {
      number: t("process.steps.3.number"),
      title: t("process.steps.3.title"),
      description: t("process.steps.3.description"),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre Unax Aller",
    url: `https://unaxaller.com/${locale}/sobre-nosotros`,
    mainEntity: {
      "@type": "Organization",
      name: "Unax Aller",
      url: "https://unaxaller.com",
      description: t("intro"),
      foundingLocation: {
        "@type": "Place",
        name: "País Vasco, España",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="pt-32 pb-20 md:pt-44 md:pb-28"
        style={{ backgroundColor: "#faf9f4" }}
        aria-label="About hero"
      >
        <div className="container-xl">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
              style={{
                backgroundColor: "#efeee9",
                color: "#4d6453",
                border: "1px solid #c3c8c1",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {tNav("sobreNosotros")}
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("subtitle")}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      {/* Values — 2×2 grid, always symmetric */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "#efeee9" }}
        aria-labelledby="values-title"
      >
        <div className="container-xl">
          <AnimatedSection className="mb-12">
            <h2
              id="values-title"
              className="text-3xl md:text-4xl font-light"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("values.title")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((value, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className="p-8 rounded-2xl h-full"
                  style={{ backgroundColor: "#faf9f4", border: "1px solid #e3e3de" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "#efeee9", color: "#4d6453" }}
                  >
                    {value.icon}
                  </div>
                  <h3
                    className="text-lg font-medium mb-3"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process — 4 steps */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "#faf9f4" }}
        aria-labelledby="process-title"
      >
        <div className="container-xl">
          <AnimatedSection className="mb-14">
            <h2
              id="process-title"
              className="text-3xl md:text-4xl font-light mb-4"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("process.title")}
            </h2>
          </AnimatedSection>

          {/* 4 steps — 2×2 on tablet, 4×1 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative">
                  {/* Connector line (not on last) */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-5 left-full w-full h-px -translate-y-px"
                      style={{ backgroundColor: "#e3e3de" }}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-5 text-sm font-semibold"
                    style={{
                      backgroundColor: "#1b3022",
                      color: "#b4cdb8",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: "#061b0e" }}
        aria-label="Call to action"
      >
        <div className="container-xl text-center">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-light mb-5"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {t("cta")}
            </h2>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#b4cdb8",
                color: "#061b0e",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {tHero("cta")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
