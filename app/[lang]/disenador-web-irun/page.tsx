import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

const SLUG = "disenador-web-irun";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador y Desarrollador Web en Irun, Gipuzkoa",
    en: "Web Designer & Developer in Irun, Gipuzkoa",
    eu: "Web Diseinatzaile eta Garatzailea Irunen, Gipuzkoan",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance en Irun. Webs a medida para comercios, hostelería, clínicas y despachos de Irun, Hondarribia y el Bidasoa, con SEO local y Google Maps. Pago único de 1.300€ + IVA, primer año incluido.",
    en: "Freelance web designer in Irun. Custom websites for shops, hospitality, clinics and practices in Irun, Hondarribia and the Bidasoa, with local SEO and Google Maps. One-off €1,300 + VAT, first year included.",
    eu: "Web diseinatzaile freelance Irunen. Neurrizko webguneak Irun, Hondarribia eta Bidasoako merkataritza, ostalaritza eta klinikentzat, tokiko SEO eta Google Maps-ekin. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.",
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

export default async function IrunPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
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
