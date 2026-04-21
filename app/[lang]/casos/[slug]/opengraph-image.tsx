import { getCaseStudyBySlug } from "@/lib/data/case-studies";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { lang, slug } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    return renderOgImage({
      eyebrow: "Case Study",
      line1: "Unax Aller",
      line2: "Casos",
      subtitle: "unaxaller.com",
    });
  }

  return renderOgImage({
    eyebrow: `${cs.sector} · ${cs.year}`,
    line1: locale === "es" ? "Caso de estudio —" : locale === "en" ? "Case study —" : "Kasu azterketa —",
    line2: cs.client,
    subtitle: cs.metrics.lighthouse ? `Lighthouse ${cs.metrics.lighthouse}/100 · unaxaller.com` : "unaxaller.com",
  });
}
