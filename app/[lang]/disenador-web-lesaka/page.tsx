import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

const SLUG = "disenador-web-lesaka";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";

  const titles: Record<string, string> = {
    es: "Diseño web en Lesaka",
    en: "Web design in Lesaka, Navarre",
    eu: "Web diseinua Lesakan",
    fr: "Création de site web à Lesaka, Navarre",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios y empresas de Lesaka (Bidasoa, Navarra). A 20 km de Irun. Webs a medida con SEO local y Google Maps, en castellano, euskera, inglés y francés. Pago único de 1.300€ + IVA, primer año incluido.",
    en: "Freelance web designer for businesses and companies in Lesaka (Bidasoa, Navarre). 20 km from Irun. Custom websites with local SEO and Google Maps, in Spanish, Basque, English and French. One-off €1,300 + VAT, first year included.",
    eu: "Web diseinatzaile freelance Lesakako (Bidasoa, Nafarroa) negozio eta enpresentzat. Iruntik 20 kmra. Neurrizko webguneak tokiko SEO eta Google Maps-ekin, gaztelaniaz, euskaraz, ingelesez eta frantsesez. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.",
    fr: "Créateur de site web freelance pour les commerces et entreprises de Lesaka (Bidasoa, Navarre). À 20 km d'Irun. Sites sur mesure avec SEO local et Google Maps, en espagnol, basque, anglais et français. Paiement unique de 1 300 € + TVA, première année incluse.",
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

export default async function LesakaPage({ params }: Props) {
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
