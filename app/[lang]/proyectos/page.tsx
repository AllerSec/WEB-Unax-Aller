import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ProjectsBoard from "@/components/home/ProjectsBoard";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { projects } from "@/lib/data/projects";
import type { LocaleKey } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as LocaleKey;

  const titles: Record<LocaleKey, string> = {
    es: "Proyectos — Webs reales hechas por Unax Aller",
    en: "Work — Real websites built by Unax Aller",
    eu: "Proiektuak — Unax Allerrek egindako benetako webguneak",
  };
  const descriptions: Record<LocaleKey, string> = {
    es: "Proyectos de diseño y desarrollo web hechos a mano para clientes reales del País Vasco y Navarra: farmacia, motos, óptica, agencia de IA. Visítalos.",
    en: "Hand-built web design and development projects for real clients in the Basque Country and Navarre: pharmacy, motorcycles, optician, AI agency. Visit them live.",
    eu: "Eskuz egindako web diseinu eta garapen proiektuak Euskal Herriko eta Nafarroako benetako bezeroentzat: farmazia, motoak, optika, AI agentzia. Bisitatu.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/proyectos`,
      languages: hreflangAlternates("/proyectos"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/proyectos" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ProyectosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as LocaleKey;
  const t = await getTranslations({ locale, namespace: "projects" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const homeLabel = locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://unaxaller.com/${locale}/proyectos#page`,
        url: `https://unaxaller.com/${locale}/proyectos`,
        name: t("title"),
        description: t("subtitle"),
        inLanguage: locale,
        isPartOf: { "@id": "https://unaxaller.com/#website" },
        about: { "@id": "https://unaxaller.com/#business" },
      },
      {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://unaxaller.com/${locale}/proyectos/${p.slug}`,
          name: p.name,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: tNav("proyectos"), item: `https://unaxaller.com/${locale}/proyectos` },
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

      <section className="page-hero" aria-label={tNav("proyectos")}>
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: homeLabel, href: `/${locale}` },
              { name: tNav("proyectos") },
            ]}
          />

          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">{t("eyebrow")}</span>
            <h1 className="page-hero-title">{t("title")}</h1>
            <p className="page-hero-subtitle">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      <ProjectsBoard locale={locale} />
    </>
  );
}
