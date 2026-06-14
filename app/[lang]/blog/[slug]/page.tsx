import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PostTOC from "@/components/blog/PostTOC";
import PostFAQ from "@/components/blog/PostFAQ";
import { getBlogPostBySlug, getAllBlogSlugs, getRelatedBlogPosts } from "@/lib/data/blog-posts";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { slugify } from "@/lib/utils";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ["es", "en", "eu"];
  return locales.flatMap((lang) =>
    getAllBlogSlugs().map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const title = post.titles[locale];
  const description = post.descriptions[locale];

  return {
    title,
    description,
    authors: [{ name: "Unax Aller Fernández", url: `https://unaxaller.com/${locale}/sobre-nosotros` }],
    category: post.tags[0] ?? "Diseño Web",
    alternates: {
      canonical: `https://unaxaller.com/${locale}/blog/${slug}`,
      languages: hreflangAlternates(`/blog/${slug}`),
    },
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      path: `/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["Unax Aller Fernández"],
      tags: post.tags,
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const faqs = post.faq?.[locale] ?? [];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: post.titles[locale],
      description: post.descriptions[locale],
      author: {
        "@id": "https://unaxaller.com/#person",
        "@type": "Person",
        name: "Unax Aller Fernández",
        url: `https://unaxaller.com/${locale}/sobre-nosotros`,
        jobTitle: "Diseñador y Desarrollador Web Freelance",
      },
      publisher: { "@id": "https://unaxaller.com/#business" },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      url: `https://unaxaller.com/${locale}/blog/${post.slug}`,
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://unaxaller.com/${locale}/blog/${post.slug}` },
      image: `https://unaxaller.com/${locale}/blog/${post.slug}/opengraph-image`,
      inLanguage: locale,
      wordCount: post.content[locale].split(/\s+/).length,
      timeRequired: `PT${post.readingTime}M`,
      articleSection: post.tags[0] ?? "Diseño Web",
      keywords: post.keywords[locale].join(", "),
      about: post.tags.map((t) => ({ "@type": "Thing", name: t })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `https://unaxaller.com/${locale}/blog` },
        { "@type": "ListItem", position: 3, name: post.titles[locale], item: `https://unaxaller.com/${locale}/blog/${post.slug}` },
      ],
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  const paragraphs = post.content[locale].split("\n\n");
  const related = getRelatedBlogPosts(slug, 3);

  const readingLabel =
    locale === "es" ? "min de lectura" : locale === "en" ? "min read" : "min irakurketa";
  const updatedLabel =
    locale === "es" ? "Actualizado" : locale === "en" ? "Updated" : "Eguneratua";
  const dateLocale = locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "eu-ES";
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(dateLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="page-hero" aria-label="Article header">
        <div className="container-xl">
          <div className="article-container">
            <Breadcrumbs
              items={[
                { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
                { name: "Blog", href: `/${locale}/blog` },
                { name: post.titles[locale] },
              ]}
            />

            <Link href={`/${locale}/blog`} className="back-link focusable">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              {locale === "es" ? "Volver al blog" : locale === "en" ? "Back to blog" : "Blogera itzuli"}
            </Link>

            <div className="post-meta">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="post-meta-dot" aria-hidden="true">·</span>
              <span>
                {post.readingTime} {readingLabel}
              </span>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <>
                  <span className="post-meta-dot" aria-hidden="true">·</span>
                  <span>
                    {updatedLabel}{" "}
                    <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                </>
              )}
            </div>

            <h1 className="article-title">{post.titles[locale]}</h1>

            <div className="article-author">
              <div className="article-author-avatar" aria-hidden="true">UA</div>
              <div>
                <p className="article-author-name">Unax Aller Fernández</p>
                <p className="article-author-role">
                  {locale === "es"
                    ? "Diseñador web freelance en Irun, Gipuzkoa"
                    : locale === "en"
                    ? "Freelance web designer in Irun, Gipuzkoa"
                    : "Web diseinatzaile freelance Irunen, Gipuzkoan"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="article-section">
        <div className="container-xl">
          <div className="article-container">
            <PostTOC content={post.content[locale]} locale={locale} />

            <AnimatedSection>
              <div className="prose-readable">
                {(() => {
                  const seenIds = new Set<string>();
                  return paragraphs.map((para, i) => {
                    const imgMatch = para.match(/^!\[(.*?)\]\((.*?)\)$/);
                    if (imgMatch) {
                      const [, alt, src] = imgMatch;
                      return (
                        <figure key={i} className="article-figure">
                          <Image
                            src={src}
                            alt={alt}
                            width={1200}
                            height={800}
                            sizes="(max-width: 768px) 100vw, 720px"
                            className="article-image"
                          />
                          {alt && <figcaption className="article-figcaption">{alt}</figcaption>}
                        </figure>
                      );
                    }
                    if (para.startsWith("## ")) {
                      const text = para.replace("## ", "").trim();
                      let id = slugify(text);
                      let n = 2;
                      while (seenIds.has(id)) id = `${slugify(text)}-${n++}`;
                      seenIds.add(id);
                      return (
                        <h2 key={i} id={id}>
                          {text}
                        </h2>
                      );
                    }
                    if (para.startsWith("- ")) {
                      const items = para.split("\n").filter((l) => l.startsWith("- "));
                      return (
                        <ul key={i}>
                          {items.map((item, j) => (
                            <li key={j}>
                              <span className="prose-bullet" aria-hidden="true" />
                              <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={i}
                        dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                      />
                    );
                  });
                })()}
              </div>
            </AnimatedSection>

            {faqs.length > 0 && (
              <AnimatedSection>
                <PostFAQ faqs={faqs} locale={locale} />
              </AnimatedSection>
            )}

            <div className="article-tags-footer">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>

            {related.length > 0 && (
              <AnimatedSection className="related-section">
                <h2 className="related-heading">
                  {locale === "es" ? "Sigue leyendo" : locale === "en" ? "Keep reading" : "Irakurtzen jarraitu"}
                </h2>
                <div className="related-grid related-grid-3">
                  {related.map((rp) => (
                    <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`} className="related-card focusable">
                      <div className="related-card-meta">
                        {rp.readingTime} min
                      </div>
                      <h3 className="related-card-title">{rp.titles[locale]}</h3>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <div className="article-cta">
                <p className="article-cta-heading">
                  {locale === "es"
                    ? "¿Quieres una web así para tu negocio?"
                    : locale === "en"
                    ? "Want a website like this for your business?"
                    : "Zure negoziorako horrelako web bat nahi al duzu?"}
                </p>
                <Link href={`/${locale}/contacto`} className="dark-cta-button focusable">
                  {locale === "es"
                    ? "Agenda una consulta gratuita"
                    : locale === "en"
                    ? "Book a free consultation"
                    : "Doako kontsulta bat eskatu"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </article>
    </>
  );
}
