import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderOgImage({
    eyebrow: locale === "es" ? "Renting Web" : locale === "en" ? "Web Renting" : "Web Errentaria",
    line1: locale === "es" ? "Tu web profesional" : locale === "en" ? "Your professional site" : "Zure web profesionala",
    line2: locale === "es" ? "por 149€/mes" : locale === "en" ? "for €149/month" : "149€/hilean",
    subtitle: locale === "es" ? "0€ inicial · 30 días de garantía · unaxaller.com" : locale === "en" ? "€0 upfront · 30-day guarantee · unaxaller.com" : "0€ hasieran · 30 eguneko bermea · unaxaller.com",
  });
}
