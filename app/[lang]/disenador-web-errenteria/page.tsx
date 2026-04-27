import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

const SLUG = "disenador-web-errenteria";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Errenteria, Gipuzkoa",
    en: "Web Designer in Errenteria, Gipuzkoa",
    eu: "Web Diseinatzailea Errenterian, Gipuzkoan",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Errenteria. A 15 km de Irun. Webs a medida, SEO local y rendimiento. Desde 1.500€ IVA incluido.",
    en: "Freelance web designer for businesses in Errenteria. 15 km from Irun. Custom websites, local SEO and performance. From €1,500 VAT included.",
    eu: "Web diseinatzaile freelance Errenteriako negozioetarako. Iruntik 15 kmra. Neurrizko webguneak, SEO lokala eta errendimendua. 1.500€-tik BEZ barne.",
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

export default async function ErrenteriaPage({ params }: Props) {
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
