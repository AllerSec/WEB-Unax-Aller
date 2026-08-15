import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

const SLUG = "disenador-web-bera";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";

  const titles: Record<string, string> = {
    es: "Diseño web en Bera",
    en: "Web design in Bera, Navarre",
    eu: "Web diseinua Beran",
    fr: "Création de site web à Bera, Navarre",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Bera (Bidasoa, Navarra). A 16 km de Irun. Webs a medida en castellano, euskera, inglés y francés, con SEO local y Google Maps. Pago único de 1.300€ + IVA, primer año incluido.",
    en: "Freelance web designer for businesses in Bera (Bidasoa, Navarre). 16 km from Irun. Custom websites in Spanish, Basque, English and French, with local SEO and Google Maps. One-off €1,300 + VAT, first year included.",
    eu: "Web diseinatzaile freelance Berako (Bidasoa, Nafarroa) negozioetarako. Iruntik 16 kmra. Neurrizko webguneak gaztelaniaz, euskaraz, ingelesez eta frantsesez, tokiko SEO eta Google Maps-ekin. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.",
    fr: "Créateur de site web freelance pour les entreprises de Bera (Bidassoa, Navarre). À 16 km d'Irun. Sites sur mesure en espagnol, basque, anglais et français, avec SEO local et Google Maps. Paiement unique de 1 300 € + TVA, première année incluse.",
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

export default async function BeraPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";
  // Enable static rendering (see home/layout note) — must precede any next-intl API.
  setRequestLocale(locale);
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
