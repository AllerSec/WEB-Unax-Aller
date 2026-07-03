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
    eyebrow: locale === "es" ? "Tu web sin complicaciones" : locale === "en" ? "Your site, hassle-free" : locale === "eu" ? "Zure weba arazorik gabe" : "Votre site sans complications",
    line1: locale === "es" ? "Tu web profesional" : locale === "en" ? "Your professional site" : locale === "eu" ? "Zure web profesionala" : "Votre site professionnel",
    line2: locale === "es" ? "por 1.300€" : locale === "en" ? "for €1,300" : locale === "eu" ? "1.300€" : "pour 1 300 €",
    subtitle: locale === "es" ? "1er año incluido · 30 días de garantía · unaxaller.com" : locale === "en" ? "first year included · 30-day guarantee · unaxaller.com" : locale === "eu" ? "1. urtea barne · 30 eguneko bermea · unaxaller.com" : "1re année incluse · satisfait ou remboursé 30 jours · unaxaller.com",
  });
}
