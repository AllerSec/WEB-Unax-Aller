import { getSectorLanding } from "@/lib/data/sector-landings";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  const def = getSectorLanding("web-para-comercio")!;
  const name = def.sectorNames[locale];
  return renderOgImage({
    eyebrow: locale === "es" ? "Diseño web por sector" : locale === "en" ? "Web design by sector" : "Web diseinua sektorez",
    line1: locale === "es" ? "Webs para" : locale === "en" ? "Websites for" : "Weba:",
    line2: name,
    subtitle: locale === "es" ? "0€ inicial · 149€/mes · unaxaller.com" : locale === "en" ? "€0 upfront · €149/mo · unaxaller.com" : "0€ hasieran · 149€/hil · unaxaller.com",
  });
}
