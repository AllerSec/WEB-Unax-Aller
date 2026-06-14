import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { projects, getProject } from "@/lib/data/projects";
import type { LocaleKey } from "@/lib/data/city-landings";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as LocaleKey;
  const project = getProject(slug);
  if (!project) return {};

  const titles: Record<LocaleKey, string> = {
    es: `${project.name}: Proyecto de Diseño Web | Unax Aller`,
    en: `${project.name}: Web Design Case Study | Unax Aller`,
    eu: `${project.name}: Web Diseinu Proiektua | Unax Aller`,
  };

  return {
    title: titles[locale],
    description: project.tagline[locale],
    alternates: {
      canonical: `https://unaxaller.com/${locale}/proyectos/${project.slug}`,
      languages: hreflangAlternates(`/proyectos/${project.slug}`),
    },
    openGraph: buildOpenGraph({
      locale,
      title: titles[locale],
      description: project.tagline[locale],
      path: `/proyectos/${project.slug}`,
      type: "article",
    }),
    twitter: buildTwitter({ title: titles[locale], description: project.tagline[locale] }),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as LocaleKey;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const homeLabel = locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera";
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `https://unaxaller.com/${locale}/proyectos/${project.slug}#work`,
        name: project.name,
        headline: project.tagline[locale],
        url: `https://unaxaller.com/${locale}/proyectos/${project.slug}`,
        image: `https://unaxaller.com${project.cover}`,
        inLanguage: locale,
        dateCreated: `${project.year}-01-01`,
        creator: { "@id": "https://unaxaller.com/#business" },
        about: project.sector[locale],
        locationCreated: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: project.city,
            addressRegion: project.region,
            addressCountry: "ES",
          },
        },
        mainEntityOfPage: `https://unaxaller.com/${locale}/proyectos/${project.slug}`,
        ...(project.testimonial && {
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: project.testimonial.rating,
              bestRating: 5,
            },
            author: { "@type": "Person", name: project.testimonial.author },
            reviewBody: project.testimonial.quote[locale],
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: tNav("proyectos"), item: `https://unaxaller.com/${locale}/proyectos` },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: `https://unaxaller.com/${locale}/proyectos/${project.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div
      className="project-detail"
      style={
        {
          "--project-accent": project.accent.color,
          "--project-accent-ink": project.accent.ink,
        } as React.CSSProperties
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="page-hero project-detail-hero" aria-label={project.name}>
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: homeLabel, href: `/${locale}` },
              { name: tNav("proyectos"), href: `/${locale}/proyectos` },
              { name: project.name },
            ]}
          />

          <div className="project-detail-hero-grid">
            <div className="project-detail-hero-text">
              <span className="project-detail-hero-eyebrow">
                <span className="project-detail-hero-eyebrow-dot" aria-hidden="true" />
                {project.sector[locale]}
              </span>
              <h1 className="project-detail-hero-title">{project.name}</h1>
              <p className="project-detail-hero-tagline">{project.tagline[locale]}</p>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-hero-cta focusable"
              >
                {t("visitSite")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </a>
            </div>

            <dl className="project-detail-hero-meta" aria-label={t("aboutTitle")}>
              <div>
                <dt>{t("cityLabel")}</dt>
                <dd>{project.city}, {project.region}</dd>
              </div>
              <div>
                <dt>{t("yearLabel")}</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>{t("sectorLabel")}</dt>
                <dd>{project.sector[locale]}</dd>
              </div>
              {project.testimonial && (
                <div>
                  <dt>{t("testimonialTitle")}</dt>
                  <dd className="project-detail-hero-meta-rating">
                    {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                      </svg>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="project-detail-cover" aria-label={project.coverAlt[locale]}>
        <div className="container-xl">
          <figure className="project-detail-cover-frame">
            <span className="project-detail-cover-pin" aria-hidden="true">
              <span className="project-detail-cover-pin-head" />
              <span className="project-detail-cover-pin-shadow" />
            </span>
            <span className="project-detail-cover-tape" aria-hidden="true" />
            <Image
              src={project.cover}
              alt={project.coverAlt[locale]}
              width={2400}
              height={1500}
              className="project-detail-cover-image"
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            <figcaption className="project-detail-cover-caption">
              <span className="project-detail-cover-caption-url">{project.url.replace(/^https?:\/\//, "")}</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-cover-caption-link"
              >
                {t("visitSite")}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
              </a>
            </figcaption>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-cover-stamp focusable"
              aria-label={`${t("visitSite")} ${project.url}`}
            >
              <span className="project-detail-cover-stamp-text">
                {t("visitSite")}
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </figure>
        </div>
      </section>

      <section className="project-detail-body" aria-label={t("aboutTitle")}>
        <div className="container-xl">
          <div className="project-detail-grid">
            <article className="project-detail-text">
              <span className="project-detail-section-label">{t("aboutTitle")}</span>
              <h2 className="project-detail-section-title">{project.tagline[locale]}</h2>
              {project.description[locale].map((paragraph, i) => (
                <p key={i} className="project-detail-paragraph">
                  {paragraph}
                </p>
              ))}
            </article>

            <aside className="project-detail-tasks">
              <span className="project-detail-section-label">{t("tasksTitle")}</span>
              <ol className="project-detail-tasks-list">
                {project.tasks[locale].map((task, i) => (
                  <li key={i} className="project-detail-task">
                    <span className="project-detail-task-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="project-detail-task-text">{task}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      {project.testimonial && (
        <section className="project-detail-testimonial" aria-label={t("testimonialTitle")}>
          <div className="container-xl">
            <figure className="project-testimonial-card">
              <span className="project-testimonial-mark" aria-hidden="true">“</span>
              <div className="project-testimonial-stars" aria-label={`${project.testimonial.rating} / 5`}>
                {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                ))}
              </div>
              <blockquote className="project-testimonial-quote">
                <p>{project.testimonial.quote[locale]}</p>
              </blockquote>
              <figcaption className="project-testimonial-attribution">
                <strong>{project.testimonial.author}</strong>
                <span>{project.testimonial.role[locale]}</span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className="project-detail-related" aria-label={t("relatedTitle")}>
        <div className="container-xl">
          <div className="project-detail-related-head">
            <span className="project-detail-section-label">{t("relatedTitle")}</span>
            <Link href={`/${locale}/proyectos`} className="project-back-link focusable">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t("backToProjects")}
            </Link>
          </div>

          <ul className="project-detail-related-grid" role="list">
            {otherProjects.map((p) => (
              <li
                key={p.slug}
                style={
                  {
                    "--project-accent": p.accent.color,
                    "--project-accent-ink": p.accent.ink,
                  } as React.CSSProperties
                }
              >
                <Link href={`/${locale}/proyectos/${p.slug}`} className="project-related-card focusable">
                  <div className="project-related-card-media">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt[locale]}
                      width={800}
                      height={500}
                      className="project-related-card-image"
                      sizes="(min-width: 1024px) 30vw, 90vw"
                    />
                  </div>
                  <div className="project-related-card-body">
                    <span className="project-related-card-sector">{p.sector[locale]}</span>
                    <h3 className="project-related-card-title">{p.name}</h3>
                    <p className="project-related-card-tagline">{p.tagline[locale]}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="projects-cta-section" aria-label={t("ctaTitle")}>
        <div className="container-xl">
          <div className="projects-cta">
            <h2 className="projects-cta-title">{t("ctaTitle")}</h2>
            <p className="projects-cta-subtitle">{t("ctaSubtitle")}</p>
            <Link href={`/${locale}/contacto`} className="projects-cta-button focusable">
              {t("ctaButton")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
