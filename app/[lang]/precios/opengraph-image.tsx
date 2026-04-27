import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderOgImage({
    eyebrow: locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak",
    line1: locale === "es" ? "Web a medida" : locale === "en" ? "Custom website" : "Neurrira egindako",
    line2: locale === "es" ? "desde 1.500€ IVA inc." : locale === "en" ? "from €1,500 VAT inc." : "weba 1.500€-tik BEZ barne",
    subtitle: locale === "es" ? "Sin permanencia · Sin sorpresas · unaxaller.com" : locale === "en" ? "No lock-in · No surprises · unaxaller.com" : "Iraupenik gabe · Ezustekorik gabe · unaxaller.com",
  });
}
