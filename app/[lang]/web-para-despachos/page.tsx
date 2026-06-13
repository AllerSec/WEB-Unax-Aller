import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import {
  sectorLandings,
  getSectorLanding,
  getSectorLandingContent,
} from "@/lib/data/sector-landings";

export const revalidate = 3600;

const SLUG = "web-para-despachos";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const def = getSectorLanding(SLUG)!;
  const name = def.sectorNames[locale];
  const titles: Record<string, string> = {
    es: `Diseño web para ${name} · Unax Aller`,
    en: `Web design for ${name} · Unax Aller`,
    eu: `${name}entzako web diseinua · Unax Aller`,
  };
  const descriptions: Record<string, string> = {
    es: `Diseñador web freelance especializado en ${name}. Webs a medida con SEO local, Google Maps y reseñas para conseguir más clientes. Pago único de 1.300€ + IVA, primer año incluido.`,
    en: `Freelance web designer specialised in ${name}. Custom websites with local SEO, Google Maps and reviews to win more clients. One-off €1,300 + VAT, first year included.`,
    eu: `${name}etan espezializatutako web diseinatzaile freelancea. Neurrizko webguneak tokiko SEO, Google Maps eta iritziekin bezero gehiago lortzeko. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.`,
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://unaxaller.com/${locale}/${SLUG}`,
      languages: hreflangAlternates(`/${SLUG}`),
    },
    openGraph: buildOpenGraph({ locale, title: titles[locale], description: descriptions[locale], path: `/${SLUG}` }),
    twitter: buildTwitter({ title: titles[locale], description: descriptions[locale] }),
  };
}

export default async function SectorPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  setRequestLocale(locale);
  const def = getSectorLanding(SLUG)!;
  const content = getSectorLandingContent(def, locale);
  const nearbyLinks = (def.nearbySectors ?? [])
    .map((s) => sectorLandings.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((x) => ({
      href: `/${locale}/${x.slug}`,
      name: x.sectorNames[locale],
      region: locale === "en" ? "Sector" : locale === "eu" ? "Sektorea" : "Sector",
    }));
  const nearbyTitle =
    locale === "es" ? "También trabajo estos sectores" : locale === "en" ? "I also work these sectors" : "Sektore hauek ere lantzen ditut";
  return (
    <CityLanding
      locale={locale}
      slug={def.slug}
      cityName={def.sectorNames[locale]}
      regionName={locale === "eu" ? "Euskal Herria" : "País Vasco"}
      content={content}
      localTouches={def.touches[locale]}
      nearbyLinks={nearbyLinks}
      nearbyTitleOverride={nearbyTitle}
    />
  );
}
