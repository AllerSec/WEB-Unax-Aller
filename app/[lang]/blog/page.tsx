import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { blogPosts } from "@/lib/data/blog-posts";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Blog de Diseño Web, SEO y Rendimiento | Unax Aller",
    en: "Web Design, SEO and Performance Blog | Unax Aller",
    eu: "Web Diseinu, SEO eta Errendimendu Bloga | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Artículos sobre diseño web, SEO técnico y rendimiento web. Guías prácticas para negocios que quieren mejorar su presencia online.",
    en: "Articles about web design, technical SEO and web performance. Practical guides for businesses that want to improve their online presence.",
    eu: "Web diseinuari, SEO teknikoari eta web errendimenduari buruzko artikuluak. Gida praktikoak lineako presentzia hobetu nahi duten negozioetarako.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/blog` },
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
        name: locale === "es" ? "Blog — Unax Aller" : locale === "en" ? "Blog — Unax Aller" : "Bloga — Unax Aller",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              Blog
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es"
                ? "Diseño web, SEO y rendimiento. Sin relleno."
                : locale === "en"
                ? "Web design, SEO and performance. No filler."
                : "Web diseinua, SEO eta errendimendua. Betegarririk gabe."}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="flex flex-col divide-y" style={{ borderColor: "#e3e3de" }}>
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="block group py-8 transition-all duration-200 hover:pl-2"
                >
                  <div
                    className="flex items-center gap-3 text-xs mb-3"
                    style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                  >
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(
                        locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "eu-ES",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} {locale === "es" ? "min de lectura" : locale === "en" ? "min read" : "min irakurketa"}</span>
                  </div>
                  <h2
                    className="text-xl md:text-2xl font-light mb-3 group-hover:underline underline-offset-4"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {post.titles[locale]}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {post.descriptions[locale]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{ backgroundColor: "#efeee9", color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                      >
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
