import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/case-studies";
import { hreflangAlternates } from "@/lib/seo";

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

  return {
    title: `${cs.client} — ${locale === "es" ? "Caso de Estudio" : locale === "en" ? "Case Study" : "Kasu Azterketa"} | Unax Aller`,
    description: cs.solution[locale],
    alternates: {
      canonical: `https://unaxaller.com/${locale}/casos/${slug}`,
      languages: hreflangAlternates(`/casos/${slug}`),
    },
  };
}

export default async function CasoPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${cs.client} — ${locale === "es" ? "Caso de Estudio" : locale === "en" ? "Case Study" : "Kasu Azterketa"}`,
        description: cs.solution[locale],
        author: { "@id": "https://unaxaller.com/#person" },
        publisher: { "@id": "https://unaxaller.com/#business" },
        url: `https://unaxaller.com/${locale}/casos/${cs.slug}`,
        datePublished: `${cs.year}-01-01`,
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

      <section className="pt-32 pb-12 md:pt-44" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <Link
            href={`/${locale}/casos`}
            className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === "es" ? "Volver a casos" : locale === "en" ? "Back to cases" : "Kasuetara itzuli"}
          </Link>

          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
          >
            {cs.sector} · {cs.year}
          </div>

          <h1
            className="text-4xl md:text-5xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {cs.client}
          </h1>
        </div>
      </section>

      <section className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <div className="flex flex-col gap-10">
            <AnimatedSection>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}>
                <h2
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                >
                  {locale === "es" ? "El problema" : locale === "en" ? "The problem" : "Arazoa"}
                </h2>
                <p style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>{cs.problem[locale]}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}>
                <h2
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                >
                  {locale === "es" ? "La solución" : locale === "en" ? "The solution" : "Irtenbidea"}
                </h2>
                <p style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>{cs.solution[locale]}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: "#061b0e" }}>
                <h2
                  className="text-sm font-semibold uppercase tracking-widest mb-6"
                  style={{ color: "#b4cdb8", fontFamily: "Manrope, sans-serif" }}
                >
                  {locale === "es" ? "Resultados" : locale === "en" ? "Results" : "Emaitzak"}
                </h2>
                <ul className="flex flex-col gap-3">
                  {cs.results[locale].map((r, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "#b4cdb8", fontFamily: "Manrope, sans-serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#4d6453" }} aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="flex flex-wrap gap-2">
                {cs.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "#efeee9", color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-16 text-center">
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#061b0e", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es" ? "Quiero un proyecto así" : locale === "en" ? "I want a project like this" : "Horrelako proiektu bat nahi dut"}
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
