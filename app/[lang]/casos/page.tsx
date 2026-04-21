import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { caseStudies } from "@/lib/data/case-studies";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Casos de Estudio — Proyectos Reales | Unax Aller",
    en: "Case Studies — Real Projects | Unax Aller",
    eu: "Kasu Azterketak — Benetako Proiektuak | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Proyectos reales de diseño web con resultados medibles. Lighthouse 95+, velocidad de carga, SEO local y conversiones mejoradas.",
    en: "Real web design projects with measurable results. Lighthouse 95+, load speed, local SEO and improved conversions.",
    eu: "Benetako web diseinu proiektuak neurgarriak diren emaitzeekin. Lighthouse 95+, karga abiadura, SEO lokala eta bihurketa hobeak.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/casos`,
      languages: hreflangAlternates("/casos"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/casos" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function CasosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak",
        url: `https://unaxaller.com/${locale}/casos`,
        itemListElement: caseStudies.map((cs, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://unaxaller.com/${locale}/casos/${cs.slug}`,
          name: cs.client,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak", item: `https://unaxaller.com/${locale}/casos` },
        ],
      },
    ],
  };

  const pageTitle = locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak";
  const subtitle =
    locale === "es"
      ? "Proyectos reales con resultados reales. Sin humo, solo métricas."
      : locale === "en"
      ? "Real projects with real results. No fluff, just metrics."
      : "Benetako proiektuak benetako emaitzeekin. Metrikak baino ez.";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero" aria-label="Case studies hero">
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              { name: pageTitle },
            ]}
          />

          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">
              {locale === "es" ? "Trabajo" : locale === "en" ? "Work" : "Lana"}
            </span>
            <h1 className="page-hero-title">{pageTitle}</h1>
            <p className="page-hero-subtitle">{subtitle}</p>
          </div>
        </div>
      </section>

      <section className="post-list-section" aria-label="Case studies">
        <div className="container-xl">
          <div className="case-grid">
            {caseStudies.map((cs, i) => (
              <AnimatedSection key={cs.slug} delay={i * 0.05}>
                <Link href={`/${locale}/casos/${cs.slug}`} className="case-card focusable">
                  <div className="case-card-eyebrow">
                    {cs.sector} · {cs.year}
                  </div>
                  <h2 className="case-card-title">{cs.client}</h2>
                  <p className="case-card-desc">{cs.solution[locale]}</p>
                  {cs.metrics.lighthouse && (
                    <div className="case-card-metric">
                      Lighthouse {cs.metrics.lighthouse}/100
                    </div>
                  )}
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
