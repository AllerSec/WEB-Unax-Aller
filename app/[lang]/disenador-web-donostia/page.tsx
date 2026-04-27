import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

const SLUG = "disenador-web-donostia";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Donostia-San Sebastián",
    en: "Web Designer in Donostia-San Sebastián",
    eu: "Web Diseinatzailea Donostian",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Donostia-San Sebastián. A 20 km de Irun. Webs a medida con SEO local, diseño premium y rendimiento. Desde 1.500€ IVA incluido.",
    en: "Freelance web designer for businesses in Donostia-San Sebastián. 20 km from Irun. Custom websites with local SEO, premium design and performance. From €1,500 VAT included.",
    eu: "Web diseinatzaile freelance Donostiako negozioetarako. Iruntik 20 kmra. Neurrizko webguneak SEO lokalarekin. 1.500€-tik BEZ barne.",
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

export default async function DonostiaPage({ params }: Props) {
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
    />
  );
}
