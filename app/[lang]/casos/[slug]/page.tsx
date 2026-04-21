import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { caseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from "@/lib/data/case-studies";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ["es", "en", "eu"];
  return locales.flatMap((lang) =>
    caseStudies.map((cs) => ({ lang, slug: cs.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  const title = `${cs.client} — ${locale === "es" ? "Caso de Estudio" : locale === "en" ? "Case Study" : "Kasu Azterketa"} | Unax Aller`;
  const description = cs.solution[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/casos/${slug}`,
      languages: hreflangAlternates(`/casos/${slug}`),
    },
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      path: `/casos/${slug}`,
      type: "article",
      publishedTime: `${cs.year}-01-01`,
      authors: ["Unax Aller Fernández"],
      tags: cs.tags,
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function CasoPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  const related = getRelatedCaseStudies(slug, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${cs.client} — ${locale === "es" ? "Caso de Estudio" : locale === "en" ? "Case Study" : "Kasu Azterketa"}`,
        description: cs.solution[locale],
        author: {
          "@id": "https://unaxaller.com/#person",
          "@type": "Person",
          name: "Unax Aller Fernández",
          url: "https://unaxaller.com/es/sobre-nosotros",
        },
        publisher: { "@id": "https://unaxaller.com/#business" },
        url: `https://unaxaller.com/${locale}/casos/${cs.slug}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://unaxaller.com/${locale}/casos/${cs.slug}` },
        datePublished: `${cs.year}-01-01`,
        dateModified: `${cs.year}-01-01`,
        image: `https://unaxaller.com/opengraph-image`,
        inLanguage: locale,
        articleSection: cs.sector,
        keywords: cs.tags.join(", "),
        about: cs.tags.map((t) => ({ "@type": "Thing", name: t })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Casos" : locale === "en" ? "Cases" : "Kasuak", item: `https://unaxaller.com/${locale}/casos` },
          { "@type": "ListItem", position: 3, name: cs.client, item: `https://unaxaller.com/${locale}/casos/${cs.slug}` },
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

      <section className="page-hero" aria-label="Case study header">
        <div className="container-xl">
          <div className="article-container">
            <Breadcrumbs
              items={[
                { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
                { name: locale === "es" ? "Casos" : locale === "en" ? "Cases" : "Kasuak", href: `/${locale}/casos` },
                { name: cs.client },
              ]}
            />

            <Link href={`/${locale}/casos`} className="back-link focusable">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {locale === "es" ? "Volver a casos" : locale === "en" ? "Back to cases" : "Kasuetara itzuli"}
            </Link>

            <div className="case-card-eyebrow">
              {cs.sector} · {cs.year}
            </div>

            <h1 className="article-title">{cs.client}</h1>
          </div>
        </div>
      </section>

      <section className="article-section">
        <div className="container-xl">
          <div className="article-container">
            <div className="case-panels">
              <AnimatedSection>
                <div className="case-panel">
                  <h2 className="case-panel-heading">
                    {locale === "es" ? "El problema" : locale === "en" ? "The problem" : "Arazoa"}
                  </h2>
                  <p className="case-panel-body">{cs.problem[locale]}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="case-panel">
                  <h2 className="case-panel-heading">
                    {locale === "es" ? "La solución" : locale === "en" ? "The solution" : "Irtenbidea"}
                  </h2>
                  <p className="case-panel-body">{cs.solution[locale]}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="case-panel-dark">
                  <h2 className="case-panel-heading">
                    {locale === "es" ? "Resultados" : locale === "en" ? "Results" : "Emaitzak"}
                  </h2>
                  <ul className="case-results-list">
                    {cs.results[locale].map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="tag-chip-row">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {related.length > 0 && (
              <AnimatedSection className="related-section">
                <h2 className="related-heading">
                  {locale === "es" ? "Otros casos" : locale === "en" ? "Other cases" : "Beste kasuak"}
                </h2>
                <div className="related-grid related-grid-2">
                  {related.map((rc) => (
                    <Link key={rc.slug} href={`/${locale}/casos/${rc.slug}`} className="related-card focusable">
                      <div className="related-card-eyebrow">
                        {rc.sector} · {rc.year}
                      </div>
                      <h3 className="related-card-title">{rc.client}</h3>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <div className="article-cta">
                <p className="article-cta-heading">
                  {locale === "es"
                    ? "¿Quieres un proyecto así?"
                    : locale === "en"
                    ? "Want a project like this?"
                    : "Horrelako proiektu bat nahi al duzu?"}
                </p>
                <Link href={`/${locale}/contacto`} className="dark-cta-button focusable">
                  {locale === "es"
                    ? "Quiero un proyecto así"
                    : locale === "en"
                    ? "I want a project like this"
                    : "Horrelako proiektu bat nahi dut"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
