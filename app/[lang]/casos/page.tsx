import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak"}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es"
                ? "Proyectos reales con resultados reales. Sin humo, solo métricas."
                : locale === "en"
                ? "Real projects with real results. No fluff, just metrics."
                : "Benetako proiektuak benetako emaitzeekin. Metrikak baino ez."}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <AnimatedSection key={cs.slug} delay={i * 0.05}>
                <Link
                  href={`/${locale}/casos/${cs.slug}`}
                  className="block h-full group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                  >
                    {cs.sector} · {cs.year}
                  </div>
                  <h2
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {cs.client}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {cs.solution[locale]}
                  </p>
                  {cs.metrics.lighthouse && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "#efeee9", color: "#4d6453" }}
                    >
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
