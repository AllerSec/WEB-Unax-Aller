import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderOgImage({
    eyebrow: locale === "es" ? "Servicios" : locale === "en" ? "Services" : "Zerbitzuak",
    line1: locale === "es" ? "Diseño y desarrollo web" : locale === "en" ? "Web design &" : "Web diseinu eta",
    line2: locale === "es" ? "premium en Irun" : locale === "en" ? "development in Irun" : "garapen premium-a Irunen",
    subtitle: locale === "es" ? "UI/UX · SEO · GSAP · Multi-idioma · unaxaller.com" : locale === "en" ? "UI/UX · SEO · GSAP · Multi-language · unaxaller.com" : "UI/UX · SEO · GSAP · Eleaniztasuna · unaxaller.com",
  });
}
