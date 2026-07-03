import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

const SLUG = "disenador-web-getxo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Getxo, Bizkaia",
    en: "Web Designer in Getxo, Bizkaia",
    eu: "Web Diseinatzailea Getxon, Bizkaian",
    fr: "Créateur de Site Web à Getxo, Biscaye",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para clínicas, despachos profesionales y comercio premium de Getxo, Algorta y Las Arenas. Pago único de 1.300€ + IVA, con el primer año incluido.",
    en: "Freelance web designer for clinics, professional firms and premium retail in Getxo, Algorta and Las Arenas. One-off €1,300 + VAT, first year included.",
    eu: "Web diseinatzaile freelance Getxo, Algorta eta Areetako klinika, bulego profesional eta merkataritza premium-arentzat. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.",
    fr: "Créateur de site web freelance pour les cliniques, cabinets professionnels et commerces premium de Getxo, Algorta et Las Arenas. Paiement unique de 1 300 € + TVA, première année incluse.",
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

export default async function GetxoPage({ params }: Props) {
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
