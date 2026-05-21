import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projects } from "@/lib/data/projects";
import type { LocaleKey } from "@/lib/data/city-landings";

type Props = { locale: LocaleKey };

const PERSONALITY: Record<
  string,
  {
    tilt: number;
    pinX: string;
    tapeCorner: "tl" | "tr" | "bl" | "br";
    tapeAngle: number;
    captionStyle: "marker" | "italic" | "stencil" | "serif";
    badgeText: { es: string; en: string; eu: string };
  }
> = {
  "motos-arretxe": {
    tilt: -3,
    pinX: "18%",
    tapeCorner: "tr",
    tapeAngle: 28,
    captionStyle: "stencil",
    badgeText: { es: "TALLER", en: "GARAGE", eu: "TAILERRA" },
  },
  "anaka-optica": {
    tilt: 2.5,
    pinX: "76%",
    tapeCorner: "tl",
    tapeAngle: -22,
    captionStyle: "italic",
    badgeText: { es: "Nº 02", en: "Nº 02", eu: "Nº 02" },
  },
  virtuosolve: {
    tilt: -2,
    pinX: "50%",
    tapeCorner: "br",
    tapeAngle: 18,
    captionStyle: "marker",
    badgeText: { es: "AI · 2026", en: "AI · 2026", eu: "AI · 2026" },
  },
  "farmacia-fernandez-bera": {
    tilt: 3,
    pinX: "30%",
    tapeCorner: "bl",
    tapeAngle: -32,
    captionStyle: "serif",
    badgeText: { es: "BERA", en: "BERA", eu: "BERA" },
  },
  tecmac: {
    tilt: -2.5,
    pinX: "62%",
    tapeCorner: "tr",
    tapeAngle: -18,
    captionStyle: "stencil",
    badgeText: { es: "ACERO", en: "STEEL", eu: "ALTZAIRUA" },
  },
};

export default async function ProjectsBoard({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "projects" });

  const visitLabel = locale === "es" ? "VISITAR" : locale === "en" ? "VISIT" : "BISITATU";
  const seeAllLabel =
    locale === "es" ? "Ver todos los proyectos" : locale === "en" ? "See all projects" : "Ikusi proiektu guztiak";

  return (
    <section className="corkboard" aria-label={t("eyebrow")}>
      <div className="container-xl">
        <div className="corkboard-inner">
          <span className="corkboard-banner" aria-hidden="true">
            <span>{locale === "es" ? "ESTUDIO" : locale === "en" ? "STUDIO" : "ESTUDIOA"}</span>
            <span className="corkboard-banner-dot" />
            <span>{locale === "es" ? "TABLERO 2026" : locale === "en" ? "BOARD 2026" : "TAULA 2026"}</span>
          </span>

          <div className="corkboard-heading">
            <span className="corkboard-eyebrow">{t("eyebrow")}</span>
            <h2 className="corkboard-title">{t("title")}</h2>
            <p className="corkboard-subtitle">{t("subtitle")}</p>
          </div>

          <ul className="polaroid-wall" role="list">
            {projects.map((project, idx) => {
              const p = PERSONALITY[project.slug] ?? {
                tilt: 0,
                pinX: "50%",
                tapeCorner: "tl" as const,
                tapeAngle: 0,
                captionStyle: "marker" as const,
                badgeText: { es: "", en: "", eu: "" },
              };
              const tasks = project.tasks[locale].slice(0, 3);

              return (
                <li
                  key={project.slug}
                  className="polaroid-slot"
                  style={
                    {
                      "--p-accent": project.accent.color,
                      "--p-accent-ink": project.accent.ink,
                      "--p-tilt": `${p.tilt}deg`,
                      "--p-pin-x": p.pinX,
                      "--p-tape-angle": `${p.tapeAngle}deg`,
                      animationDelay: `${idx * 0.12}s`,
                    } as React.CSSProperties
                  }
                >
                  <article className="polaroid" data-caption={p.captionStyle}>
                    <span className="polaroid-pin" aria-hidden="true">
                      <span className="polaroid-pin-head" />
                      <span className="polaroid-pin-shadow" />
                    </span>

                    <span
                      className={`polaroid-tape polaroid-tape--${p.tapeCorner}`}
                      aria-hidden="true"
                    />

                    <span className="polaroid-badge" aria-hidden="true">
                      {p.badgeText[locale]}
                    </span>

                    {project.testimonial && (
                      <span
                        className="polaroid-rating"
                        aria-label={`${project.testimonial.rating} / 5`}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                        </svg>
                        <span className="polaroid-rating-num">5.0</span>
                        <span className="polaroid-rating-label">Google</span>
                      </span>
                    )}

                    <Link
                      href={`/${locale}/proyectos/${project.slug}`}
                      className="polaroid-photo focusable"
                      aria-label={`${project.name} — ${t("aboutTitle")}`}
                    >
                      <Image
                        src={project.cover}
                        alt={project.coverAlt[locale]}
                        width={1600}
                        height={1000}
                        className="polaroid-photo-img"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                      <span className="polaroid-photo-glare" aria-hidden="true" />
                    </Link>

                    <div className="polaroid-caption">
                      <h3 className="polaroid-name">{project.name}</h3>
                      <p className="polaroid-tagline">{project.tagline[locale]}</p>

                      <ul className="polaroid-stickers" role="list">
                        {tasks.map((task) => (
                          <li key={task} className="polaroid-sticker">
                            {task}
                          </li>
                        ))}
                      </ul>

                      <div className="polaroid-meta">
                        <span>{project.city}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.sector[locale]}</span>
                      </div>
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="polaroid-stamp"
                      aria-label={`${visitLabel} ${project.url}`}
                    >
                      <span className="polaroid-stamp-text">
                        {visitLabel}
                        <span className="polaroid-stamp-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </span>
                      <span className="polaroid-stamp-host" aria-hidden="true">
                        {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                      </span>
                    </a>

                    <Link
                      href={`/${locale}/proyectos/${project.slug}`}
                      className="polaroid-case-link focusable"
                    >
                      {t("aboutTitle")}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>

          <div className="corkboard-footer">
            <Link href={`/${locale}/proyectos`} className="corkboard-see-all focusable">
              {seeAllLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
