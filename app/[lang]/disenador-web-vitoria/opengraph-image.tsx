import { getCityLanding } from "@/lib/data/city-landings";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }, { lang: 'eu' }, { lang: 'fr' }]
}

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu" | "fr") || "es";
  const def = getCityLanding("disenador-web-vitoria")!;
  const city = def.cityNames[locale];
  return renderOgImage({
    eyebrow: locale === "es" ? "Diseñador web local" : locale === "en" ? "Local web designer" : locale === "eu" ? "Tokiko web diseinatzailea" : "Créateur de site web local",
    line1: locale === "es" ? `Webs a medida en` : locale === "en" ? `Custom websites in` : locale === "eu" ? `Neurrira egindako webguneak` : `Sites sur mesure à`,
    line2: city,
    subtitle: locale === "es" ? "1.300€ · 1er año incluido · unaxaller.com" : locale === "en" ? "€1,300 · first year included · unaxaller.com" : locale === "eu" ? "1.300€ · 1. urtea barne · unaxaller.com" : "1 300 € · 1re année incluse · unaxaller.com",
  });
}
