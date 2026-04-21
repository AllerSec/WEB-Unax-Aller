import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/lib/data/blog-posts";

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

  return {
    title: `${post.titles[locale]} | Unax Aller`,
    description: post.descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/blog/${slug}` },
    keywords: post.keywords[locale],
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Unax Aller Fernández"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.titles[locale],
        description: post.descriptions[locale],
        author: {
          "@id": "https://unaxaller.com/#person",
          "@type": "Person",
          name: "Unax Aller Fernández",
          url: "https://unaxaller.com",
          jobTitle: "Diseñador y Desarrollador Web Freelance",
        },
        publisher: { "@id": "https://unaxaller.com/#business" },
        datePublished: post.publishedAt,
        url: `https://unaxaller.com/${locale}/blog/${post.slug}`,
        inLanguage: locale,
        keywords: post.keywords[locale].join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `https://unaxaller.com/${locale}/blog` },
          { "@type": "ListItem", position: 3, name: post.titles[locale], item: `https://unaxaller.com/${locale}/blog/${post.slug}` },
        ],
      },
    ],
  };

  const paragraphs = post.content[locale].split("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-12 md:pt-44" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === "es" ? "Volver al blog" : locale === "en" ? "Back to blog" : "Blogera itzuli"}
          </Link>

          <div
            className="flex items-center gap-3 text-xs mb-6"
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

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-8"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {post.titles[locale]}
          </h1>

          <div
            className="flex items-center gap-4 p-4 rounded-xl mb-12"
            style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-light flex-shrink-0 select-none"
              style={{ backgroundColor: "#1b3022", color: "#b4cdb8", fontFamily: "Newsreader, Georgia, serif" }}
              aria-hidden="true"
            >
              UA
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}>
                Unax Aller Fernández
              </p>
              <p className="text-xs" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
                {locale === "es" ? "Diseñador web freelance en Irun, Gipuzkoa" : locale === "en" ? "Freelance web designer in Irun, Gipuzkoa" : "Web diseinatzaile freelance Irunen, Gipuzkoan"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <div
              className="max-w-none"
              style={{ fontFamily: "Manrope, sans-serif", color: "#434843" }}
            >
              {paragraphs.map((para, i) => {
                if (para.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-2xl font-light mt-10 mb-4"
                      style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                    >
                      {para.replace("## ", "")}
                    </h2>
                  );
                }
                if (para.startsWith("- ")) {
                  const items = para.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="mb-4 flex flex-col gap-2">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#4d6453" }} aria-hidden="true" />
                          <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                  />
                );
              })}
            </div>
          </AnimatedSection>

          <div className="flex flex-wrap gap-2 mt-10 pt-10" style={{ borderTop: "1px solid #e3e3de" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#efeee9", color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <AnimatedSection className="mt-16 p-8 rounded-2xl text-center" style={{ backgroundColor: "#061b0e" }}>
            <p
              className="text-lg font-light mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {locale === "es" ? "¿Quieres una web así para tu negocio?" : locale === "en" ? "Want a website like this for your business?" : "Zure negoziorako horrelako web bat nahi al duzu?"}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#b4cdb8", color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es" ? "Agenda una consulta gratuita" : locale === "en" ? "Book a free consultation" : "Doako kontsulta bat eskatu"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </article>
    </>
  );
}
