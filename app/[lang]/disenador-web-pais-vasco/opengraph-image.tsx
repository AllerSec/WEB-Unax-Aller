import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  const regionName = locale === "eu" ? "Euskal Herria" : "País Vasco";
  return renderOgImage({
    eyebrow: locale === "es" ? "Diseñador web trilingüe" : locale === "en" ? "Trilingual web designer" : "Hiru hizkuntzatako web diseinatzailea",
    line1: locale === "es" ? `Webs a medida en el` : locale === "en" ? `Custom websites in the` : `Neurrira egindako webguneak`,
    line2: regionName,
    subtitle: locale === "es" ? "es · en · eu · Lighthouse 95+ · unaxaller.com" : locale === "en" ? "es · en · eu · Lighthouse 95+ · unaxaller.com" : "es · en · eu · Lighthouse 95+ · unaxaller.com",
  });
}
