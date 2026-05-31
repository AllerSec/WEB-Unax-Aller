import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { blogPosts } from "@/lib/data/blog-posts";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Blog de Diseño Web, SEO y Rendimiento",
    en: "Web Design, SEO and Performance Blog",
    eu: "Web Diseinu, SEO eta Errendimendu Bloga",
  };
  const descriptions: Record<string, string> = {
    es: "Artículos sobre diseño web, SEO técnico y rendimiento web. Guías prácticas para negocios que quieren mejorar su presencia online.",
    en: "Articles about web design, technical SEO and web performance. Practical guides for businesses that want to improve their online presence.",
    eu: "Web diseinuari, SEO teknikoari eta web errendimenduari buruzko artikuluak. Gida praktikoak lineako presentzia hobetu nahi duten negozioetarako.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/blog`,
      languages: hreflangAlternates("/blog"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/blog" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: locale === "es" ? "Blog · Unax Aller" : locale === "en" ? "Blog · Unax Aller" : "Bloga · Unax Aller",
        url: `https://unaxaller.com/${locale}/blog`,
        author: { "@id": "https://unaxaller.com/#person" },
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: locale,
        blogPost: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.titles[locale],
          url: `https://unaxaller.com/${locale}/blog/${p.slug}`,
          datePublished: p.publishedAt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `https://unaxaller.com/${locale}/blog` },
        ],
      },
    ],
  };

  const subtitle =
    locale === "es"
      ? "Diseño web, SEO y rendimiento. Sin relleno."
      : locale === "en"
      ? "Web design, SEO and performance. No filler."
      : "Web diseinua, SEO eta errendimendua. Betegarririk gabe.";

  const readingLabel =
    locale === "es" ? "min de lectura" : locale === "en" ? "min read" : "min irakurketa";

  const dateLocale = locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "eu-ES";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero" aria-label="Blog hero">
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              { name: "Blog" },
            ]}
          />

          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">Blog</span>
            <h1 className="page-hero-title">Blog</h1>
            <p className="page-hero-subtitle">{subtitle}</p>
          </div>
        </div>
      </section>

      <section className="post-list-section" aria-label="Blog posts">
        <div className="container-xl">
          <div className="post-list">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.05}>
                <Link href={`/${locale}/blog/${post.slug}`} className="post-list-item focusable">
                  <div className="post-meta">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="post-meta-dot" aria-hidden="true">·</span>
                    <span>
                      {post.readingTime} {readingLabel}
                    </span>
                  </div>
                  <h2 className="post-list-title">{post.titles[locale]}</h2>
                  <p className="post-list-excerpt">{post.descriptions[locale]}</p>
                  <div className="tag-chip-row">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
