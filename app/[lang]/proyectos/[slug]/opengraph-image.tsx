import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { projects } from "@/lib/data/projects";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  const locales = ['es', 'en', 'eu', 'fr']
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })))
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { lang, slug } = await params;
  const locale = (lang as "es" | "en" | "eu" | "fr") || "es";
  const project = projects.find((p) => p.slug === slug);

  return renderOgImage({
    eyebrow: locale === "es" ? "Proyecto" : locale === "en" ? "Project" : locale === "eu" ? "Proiektua" : "Projet",
    line1: project?.name ?? (locale === "es" ? "Portafolio" : locale === "en" ? "Portfolio" : locale === "eu" ? "Portafolioa" : "Portfolio"),
    line2: "",
    subtitle: locale === "es" ? "Portafolio · unaxaller.com" : locale === "en" ? "Portfolio · unaxaller.com" : locale === "eu" ? "Portafolioa · unaxaller.com" : "Portfolio · unaxaller.com",
  });
}
