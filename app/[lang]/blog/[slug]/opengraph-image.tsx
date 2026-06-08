import { getBlogPostBySlug, blogPosts } from "@/lib/data/blog-posts";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  const locales = ['es', 'en', 'eu']
  return locales.flatMap((lang) => blogPosts.map((p) => ({ lang, slug: p.slug })))
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { lang, slug } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return renderOgImage({
      eyebrow: "Blog",
      line1: "Unax Aller",
      line2: "Blog",
      subtitle: "unaxaller.com",
    });
  }

  const title = post.titles[locale] || post.titles.es;
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return renderOgImage({
    eyebrow: locale === "es" ? "Blog · Unax Aller" : locale === "en" ? "Blog · Unax Aller" : "Bloga · Unax Aller",
    line1,
    line2,
    subtitle: `${post.readingTime} min · unaxaller.com`,
  });
}
