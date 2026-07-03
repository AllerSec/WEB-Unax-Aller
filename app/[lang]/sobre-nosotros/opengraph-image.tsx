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
    eyebrow: locale === "es" ? "Sobre mí" : locale === "en" ? "About me" : locale === "eu" ? "Ni buruz" : "À propos de moi",
    line1: locale === "es" ? "Hola, soy" : locale === "en" ? "Hi, I'm" : locale === "eu" ? "Kaixo," : "Bonjour, je suis",
    line2: locale === "es" ? "Unax Aller." : locale === "en" ? "Unax Aller." : locale === "eu" ? "Unax Aller naiz." : "Unax Aller.",
    subtitle: locale === "es" ? "Diseñador web freelance · Irun, País Vasco · unaxaller.com" : locale === "en" ? "Freelance web designer · Irun, Basque Country · unaxaller.com" : locale === "eu" ? "Web diseinatzaile freelance · Irun, Euskal Herria · unaxaller.com" : "Designer web freelance · Irun, Pays basque · unaxaller.com",
  });
}
