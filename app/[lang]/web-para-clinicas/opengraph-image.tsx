import { getSectorLanding } from "@/lib/data/sector-landings";
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
  const def = getSectorLanding("web-para-clinicas")!;
  const name = def.sectorNames[locale];
  return renderOgImage({
    eyebrow: locale === "es" ? "Diseño web por sector" : locale === "en" ? "Web design by sector" : locale === "eu" ? "Web diseinua sektorez" : "Design web par secteur",
    line1: locale === "es" ? "Webs para" : locale === "en" ? "Websites for" : locale === "eu" ? "Weba:" : "Sites pour",
    line2: name,
    subtitle: locale === "es" ? "1.300€ · 1er año incluido · unaxaller.com" : locale === "en" ? "€1,300 · first year included · unaxaller.com" : locale === "eu" ? "1.300€ · 1. urtea barne · unaxaller.com" : "1 300 € · 1ère année incluse · unaxaller.com",
  });
}
