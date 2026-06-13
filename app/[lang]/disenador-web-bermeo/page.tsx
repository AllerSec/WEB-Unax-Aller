import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

const SLUG = "disenador-web-bermeo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Bermeo, Bizkaia",
    en: "Web Designer in Bermeo, Bizkaia",
    eu: "Web Diseinatzailea Bermeon, Bizkaian",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para conserveras, hostelería marinera y empresas pesqueras de Bermeo. Webs a medida con SEO local. Pago único de 1.300€ + IVA, con el primer año incluido.",
    en: "Freelance web designer for canneries, seafood hospitality and fishing companies in Bermeo. Custom websites with local SEO. One-off €1,300 + VAT, first year included.",
    eu: "Web diseinatzaile freelance Bermeoko kontserba, itsas-ostalaritza eta arrantza-enpresentzat. Neurrizko webguneak SEO lokalarekin. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.",
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

export default async function BermeoPage({ params }: Props) {
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
