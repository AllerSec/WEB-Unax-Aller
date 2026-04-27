import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderOgImage({
    eyebrow: locale === "es" ? "Sobre mí" : locale === "en" ? "About me" : "Ni buruz",
    line1: locale === "es" ? "Hola, soy" : locale === "en" ? "Hi, I'm" : "Kaixo,",
    line2: locale === "es" ? "Unax Aller." : locale === "en" ? "Unax Aller." : "Unax Aller naiz.",
    subtitle: locale === "es" ? "Diseñador web freelance · Irun, País Vasco · unaxaller.com" : locale === "en" ? "Freelance web designer · Irun, Basque Country · unaxaller.com" : "Web diseinatzaile freelance · Irun, Euskal Herria · unaxaller.com",
  });
}
