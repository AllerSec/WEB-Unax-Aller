import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

const SLUG = "disenador-web-zarautz";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Zarautz, Gipuzkoa",
    en: "Web Designer in Zarautz, Gipuzkoa",
    eu: "Web Diseinatzailea Zarautzen, Gipuzkoan",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para hostelería, surf shops y comercio premium de Zarautz. Webs a medida con SEO local. Desde 1.500€ IVA incluido.",
    en: "Freelance web designer for hospitality, surf shops and premium retail in Zarautz. Custom websites with local SEO. From €1,500 VAT included.",
    eu: "Web diseinatzaile freelance Zarauzko ostalaritza, surf-denda eta merkataritza premium-arentzat. Neurrizko webguneak SEO lokalarekin. 1.500€-tik BEZ barne.",
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

export default async function ZarautzPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
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
