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
  const regionName = locale === "eu" ? "Euskal Herria" : locale === "fr" ? "Pays basque" : "País Vasco";
  return renderOgImage({
    eyebrow: locale === "es" ? "Diseñador web trilingüe" : locale === "en" ? "Trilingual web designer" : locale === "eu" ? "Hiru hizkuntzatako web diseinatzailea" : "Créateur de site web quadrilingue",
    line1: locale === "es" ? `Webs a medida en el` : locale === "en" ? `Custom websites in the` : locale === "eu" ? `Neurrira egindako webguneak` : `Sites sur mesure au`,
    line2: regionName,
    subtitle: locale === "es" ? "es · en · eu · fr · Lighthouse 95+ · unaxaller.com" : locale === "en" ? "es · en · eu · fr · Lighthouse 95+ · unaxaller.com" : locale === "eu" ? "es · en · eu · fr · Lighthouse 95+ · unaxaller.com" : "es · en · eu · fr · Lighthouse 95+ · unaxaller.com",
  });
}
