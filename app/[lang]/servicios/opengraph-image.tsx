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
  return renderOgImage({
    eyebrow: locale === "es" ? "Servicios" : locale === "en" ? "Services" : locale === "eu" ? "Zerbitzuak" : "Services",
    line1: locale === "es" ? "Diseño y desarrollo web" : locale === "en" ? "Web design &" : locale === "eu" ? "Web diseinu eta" : "Design et développement",
    line2: locale === "es" ? "premium en Irun" : locale === "en" ? "development in Irun" : locale === "eu" ? "garapen premium-a Irunen" : "web premium à Irun",
    subtitle: locale === "es" ? "UI/UX · SEO · GSAP · Multi-idioma · unaxaller.com" : locale === "en" ? "UI/UX · SEO · GSAP · Multi-language · unaxaller.com" : locale === "eu" ? "UI/UX · SEO · GSAP · Eleaniztasuna · unaxaller.com" : "UI/UX · SEO · GSAP · Multilingue · unaxaller.com",
  });
}
