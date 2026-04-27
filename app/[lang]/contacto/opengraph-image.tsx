import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderOgImage({
    eyebrow: locale === "es" ? "Contacto" : locale === "en" ? "Contact" : "Kontaktua",
    line1: locale === "es" ? "Cuéntame tu" : locale === "en" ? "Tell me about" : "Kontatu zure",
    line2: locale === "es" ? "proyecto" : locale === "en" ? "your project" : "proiektua",
    subtitle: locale === "es" ? "Respondo en menos de 24h · unaxaller.com" : locale === "en" ? "I reply within 24h · unaxaller.com" : "24 ordutan baino gutxiagotan erantzuten dut · unaxaller.com",
  });
}
