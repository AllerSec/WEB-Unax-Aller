import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }, { lang: 'eu' }]
}

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderOgImage({
    eyebrow: locale === "es" ? "Proyectos" : locale === "en" ? "Projects" : "Proiektuak",
    line1: locale === "es" ? "Cada web, hecha" : locale === "en" ? "Every site," : "Webgune bakoitza,",
    line2: locale === "es" ? "a mano." : locale === "en" ? "built by hand." : "eskuz egina.",
    subtitle: locale === "es" ? "Portfolio · Diseño web premium · unaxaller.com" : locale === "en" ? "Portfolio · Premium web design · unaxaller.com" : "Portfolio · Web diseinu premium-a · unaxaller.com",
  });
}
