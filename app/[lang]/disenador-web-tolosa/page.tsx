import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

const SLUG = "disenador-web-tolosa";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";

  const titles: Record<string, string> = {
    es: "Diseño web en Tolosa, Gipuzkoa",
    en: "Web design in Tolosa, Gipuzkoa",
    eu: "Web diseinua Tolosan, Gipuzkoan",
    fr: "Création de site web à Tolosa, Gipuzkoa",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Tolosa: gastronomía, industria papelera, comercio y servicios. Webs a medida, SEO local. Pago único de 1.300€ + IVA, con el primer año incluido.",
    en: "Freelance web designer for Tolosa businesses: gastronomy, paper industry, retail and services. Custom websites, local SEO. One-off €1,300 + VAT, first year included.",
    eu: "Web diseinatzaile freelance Tolosako negozioetarako: gastronomia, paper industria, merkataritza eta zerbitzuak. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.",
    fr: "Créateur de site web freelance pour les entreprises de Tolosa : gastronomie, industrie papetière, commerce et services. Sites sur mesure, SEO local. Paiement unique de 1 300 € + TVA, première année incluse.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/${SLUG}`,
      languages: hreflangAlternates(`/${SLUG}`),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: `/${SLUG}` }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function TolosaPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";
  const def = getCityLanding(SLUG)!;
  const content = getCityLandingContent(def, locale);

  return (
    <CityLanding
      locale={locale}
      slug={SLUG}
      cityName={def.cityNames[locale]}
      regionName={def.regionNames[locale]}
      content={content}
      distanceFromIrunKm={def.distanceFromIrunKm}
      localTouches={def.localTouches?.[locale]}
      nearbyCitySlugs={def.nearbyCities}
    />
  );
}
