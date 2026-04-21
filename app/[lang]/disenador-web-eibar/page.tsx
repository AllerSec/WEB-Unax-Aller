import type { Metadata } from "next";
import CityLanding from "@/components/landing/CityLanding";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { getCityLanding, getCityLandingContent } from "@/lib/data/city-landings";

const SLUG = "disenador-web-eibar";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Eibar, Gipuzkoa | Unax Aller",
    en: "Web Designer in Eibar, Gipuzkoa | Unax Aller",
    eu: "Web Diseinatzailea Eibarren, Gipuzkoan | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para la industria, máquina-herramienta y comercio de Eibar. Webs a medida, SEO local y rendimiento. Desde 1.300€ IVA incluido.",
    en: "Freelance web designer for Eibar's industry, machine-tool and retail. Custom websites, local SEO and performance. From €1,300 VAT included.",
    eu: "Web diseinatzaile freelance Eibarreko industria, makina-erreminta eta merkataritzarako. Neurrizko webguneak. 1.300€-tik BEZ barne.",
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

export default async function EibarPage({ params }: Props) {
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
