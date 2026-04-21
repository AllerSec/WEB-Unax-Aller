import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Sobre Mí — Diseñador Web en Irun, Gipuzkoa | Unax Aller",
    en: "About Me — Web Designer in Irun, Basque Country | Unax Aller",
    eu: "Ni buruz — Web Diseinatzailea Irunen, Gipuzkoan | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Soy Unax Aller, diseñador web freelance en Irun, Gipuzkoa. Ingeniería informática en la UAX, 4 idiomas y webs a medida para negocios del País Vasco.",
    en: "I'm Unax Aller, freelance web designer in Irun, Basque Country. Computer engineering at UAX, 4 languages and custom websites for Basque businesses.",
    eu: "Unax Aller naiz, web diseinatzaile freelance Irunen, Gipuzkoan. Informatika ingeniaritza UAX-en, 4 hizkuntza eta Euskal Herriko negozioetarako webguneak.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/sobre-nosotros`,
      languages: hreflangAlternates("/sobre-nosotros"),
    },
    openGraph: {
      ...buildOpenGraph({ locale, title, description, path: "/sobre-nosotros", type: "profile" }),
    },
    twitter: buildTwitter({ title, description }),
  };
}

export default async function SobreNosotrosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  const profile = {
    name: t("profile.name"),
    location: t("profile.location"),
    role: t("profile.role"),
    education: t("profile.education"),
    linkedin: t("profile.linkedin"),
    languages: t("profile.languages"),
    bio: t("profile.bio"),
  };

  const values = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: t("values.craft.title"),
      description: t("values.craft.description"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      title: t("values.results.title"),
      description: t("values.results.description"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: t("values.transparency.title"),
      description: t("values.transparency.description"),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
    },
  ];

  const steps = [
    {
      number: t("process.steps.0.number"),
      title: t("process.steps.0.title"),
      description: t("process.steps.0.description"),
    },
    {
      number: t("process.steps.1.number"),
      title: t("process.steps.1.title"),
      description: t("process.steps.1.description"),
    },
    {
      number: t("process.steps.2.number"),
      title: t("process.steps.2.title"),
      description: t("process.steps.2.description"),
    },
    {
      number: t("process.steps.3.number"),
      title: t("process.steps.3.title"),
      description: t("process.steps.3.description"),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "Sobre Unax Aller",
        url: `https://unaxaller.com/${locale}/sobre-nosotros`,
        mainEntity: { "@id": "https://unaxaller.com/#person" },
      },
      {
        "@type": "Person",
        "@id": "https://unaxaller.com/#person",
        name: "Unax Aller Fernández",
        jobTitle: "Diseñador y Desarrollador Web Freelance",
        url: "https://unaxaller.com",
        email: "hola@unaxaller.com",
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
        knowsLanguage: ["es", "fr", "en", "eu"],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad Alfonso X el Sabio",
          sameAs: "https://www.uax.es",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          postalCode: "20300",
          addressCountry: "ES",
        },
        worksFor: { "@id": "https://unaxaller.com/#business" },
        description: t("intro"),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Sobre Nosotros" : locale === "en" ? "About" : "Ni buruz", item: `https://unaxaller.com/${locale}/sobre-nosotros` },
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

      {/* Hero */}
      <section
        className="pt-32 pb-20 md:pt-44 md:pb-28"
        style={{ backgroundColor: "#faf9f4" }}
        aria-label={locale === "es" ? "Sobre mí" : locale === "en" ? "About me" : "Ni buruz"}
      >
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              { name: locale === "es" ? "Sobre mí" : locale === "en" ? "About me" : "Ni buruz" },
            ]}
          />

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
              style={{
                backgroundColor: "#efeee9",
                color: "#4d6453",
                border: "1px solid #c3c8c1",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {tNav("sobreNosotros")}
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("subtitle")}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      {/* Profile card */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "#faf9f4" }}
        aria-label="Perfil personal"
      >
        <div className="container-xl">
          <AnimatedSection>
            <div
              className="flex flex-col md:flex-row gap-8 p-8 md:p-10 rounded-2xl"
              style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 flex items-start">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-4xl font-light select-none"
                  style={{ backgroundColor: "#1b3022", color: "#b4cdb8", fontFamily: "Newsreader, Georgia, serif" }}
                  aria-hidden="true"
                >
                  UA
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-light mb-1"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {profile.name}
                  </h2>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                  >
                    {profile.role}
                  </p>
                  <p
                    className="text-xs flex items-center gap-1.5"
                    style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {profile.location}
                  </p>
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                >
                  {profile.bio}
                </p>

                {/* Education + Languages */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div
                    className="flex items-start gap-2.5 flex-1 p-4 rounded-xl"
                    style={{ backgroundColor: "#efeee9" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4d6453" strokeWidth="2" className="mt-0.5 flex-shrink-0" aria-hidden="true">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                    <p className="text-xs leading-relaxed" style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>
                      {profile.education}
                    </p>
                  </div>
                  <div
                    className="flex items-start gap-2.5 flex-1 p-4 rounded-xl"
                    style={{ backgroundColor: "#efeee9" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4d6453" strokeWidth="2" className="mt-0.5 flex-shrink-0" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <p className="text-xs leading-relaxed" style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>
                      {profile.languages}
                    </p>
                  </div>
                </div>

                {/* LinkedIn link */}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "#0a66c2", fontFamily: "Manrope, sans-serif" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values — 2×2 grid, always symmetric */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "#efeee9" }}
        aria-labelledby="values-title"
      >
        <div className="container-xl">
          <AnimatedSection className="mb-12">
            <h2
              id="values-title"
              className="text-3xl md:text-4xl font-light"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("values.title")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((value, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className="p-8 rounded-2xl h-full"
                  style={{ backgroundColor: "#faf9f4", border: "1px solid #e3e3de" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "#efeee9", color: "#4d6453" }}
                  >
                    {value.icon}
                  </div>
                  <h3
                    className="text-lg font-medium mb-3"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process — 4 steps */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "#faf9f4" }}
        aria-labelledby="process-title"
      >
        <div className="container-xl">
          <AnimatedSection className="mb-14">
            <h2
              id="process-title"
              className="text-3xl md:text-4xl font-light mb-4"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("process.title")}
            </h2>
          </AnimatedSection>

          {/* 4 steps — 2×2 on tablet, 4×1 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative">
                  {/* Connector line (not on last) */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-5 left-full w-full h-px -translate-y-px"
                      style={{ backgroundColor: "#e3e3de" }}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-5 text-sm font-semibold"
                    style={{
                      backgroundColor: "#1b3022",
                      color: "#b4cdb8",
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: "#061b0e" }}
        aria-label="Call to action"
      >
        <div className="container-xl text-center">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-light mb-5"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {t("cta")}
            </h2>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#b4cdb8",
                color: "#061b0e",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {tHero("cta")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
