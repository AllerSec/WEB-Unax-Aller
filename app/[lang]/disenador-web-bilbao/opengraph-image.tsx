import { getCityLanding } from "@/lib/data/city-landings";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  const def = getCityLanding("disenador-web-bilbao")!;
  const city = def.cityNames[locale];
  return renderOgImage({
    eyebrow: locale === "es" ? "Diseñador web local" : locale === "en" ? "Local web designer" : "Tokiko web diseinatzailea",
    line1: locale === "es" ? `Webs a medida en` : locale === "en" ? `Custom websites in` : `Neurrira egindako webguneak`,
    line2: city,
    subtitle: locale === "es" ? "Desde 1.500€ IVA inc. · unaxaller.com" : locale === "en" ? "From €1,500 VAT inc. · unaxaller.com" : "1.500€-tik BEZ barne · unaxaller.com",
  });
}
