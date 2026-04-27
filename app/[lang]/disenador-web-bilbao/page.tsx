import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

const SLUG = "disenador-web-bilbao";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Bilbao, Bizkaia",
    en: "Web Designer in Bilbao, Bizkaia",
    eu: "Web Diseinatzailea Bilbon, Bizkaian",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Bilbao y Bizkaia. Webs a medida con SEO local, diseño premium y rendimiento. Desde 1.500€ IVA incluido.",
    en: "Freelance web designer for businesses in Bilbao and Bizkaia. Custom websites with local SEO, premium design and performance. From €1,500 VAT included.",
    eu: "Web diseinatzaile freelance Bilbo eta Bizkaiko negozioetarako. Neurrizko webguneak SEO lokalarekin, diseinu premiuma eta errendimenduarekin. 1.500€-tik BEZ barne.",
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

export default async function BilbaoPage({ params }: Props) {
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
