import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Sobre Mí — Diseñador Web en Irun, Gipuzkoa",
    en: "About Me — Web Designer in Irun, Basque Country",
    eu: "Ni buruz — Web Diseinatzailea Irunen, Gipuzkoan",
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
        email: "contacto@unaxaller.com",
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

      <section
        className="page-hero"
        aria-label={locale === "es" ? "Sobre mí" : locale === "en" ? "About me" : "Ni buruz"}
      >
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              { name: locale === "es" ? "Sobre mí" : locale === "en" ? "About me" : "Ni buruz" },
            ]}
          />

          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">{tNav("sobreNosotros")}</span>
            <h1 className="page-hero-title">{t("subtitle")}</h1>
            <p className="page-hero-subtitle">{t("intro")}</p>
          </div>
        </div>
      </section>

      <section className="about-section" aria-label="Perfil personal">
        <div className="container-xl">
          <AnimatedSection>
            <div className="profile-card">
              <div className="profile-avatar profile-avatar-photo" aria-hidden="true">
                <Image
                  src="/images/unax-square-no-bg.png"
                  alt=""
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 96px, 128px"
                  priority
                />
              </div>

              <div className="profile-info">
                <div>
                  <h2 className="profile-name">{profile.name}</h2>
                  <p className="profile-role">{profile.role}</p>
                  <p className="profile-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {profile.location}
                  </p>
                </div>

                <p className="profile-bio">{profile.bio}</p>

                <div className="profile-facts">
                  <div className="profile-fact">
                    <svg
                      className="profile-fact-icon"
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <p className="profile-fact-text">{profile.education}</p>
                  </div>
                  <div className="profile-fact">
                    <svg
                      className="profile-fact-icon"
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <p className="profile-fact-text">{profile.languages}</p>
                  </div>
                </div>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-linkedin focusable"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="about-section" aria-labelledby="timeline-title">
        <div className="container-xl">
          <AnimatedSection className="about-section-header">
            <h2 id="timeline-title" className="section-heading">
              {locale === "es" ? "Experiencia que marca la diferencia" : locale === "en" ? "Experience that makes a difference" : "Aldea egiten duen esperientzia"}
            </h2>
          </AnimatedSection>
          <div className="timeline">
            {[
              {
                year: "2009–2020",
                title: locale === "es" ? "Educación en Francia" : locale === "en" ? "Education in France" : "Hezkuntza Frantzian",
                desc: locale === "es"
                  ? "Estudié toda mi vida en Francia hasta los 15 años. Francés bilingüe de verdad, no de academia. Eso se nota cuando hago webs para empresas que exportan."
                  : locale === "en"
                  ? "I studied my whole life in France until I was 15. Genuinely bilingual French, not from a class. That shows when I build websites for exporting companies."
                  : "Nire bizitza osoa Frantzian ikasi nuen 15 urte bete arte. Frantses elebidun benetakoa. Hori nabaritzen da esportatzen duten enpresetarako webguneak egiten ditudanean.",
              },
              {
                year: "2022",
                title: "Erasmus",
                desc: locale === "es"
                  ? "Programa de intercambio internacional. Adaptarse a entornos nuevos rápido y sin miedo."
                  : locale === "en"
                  ? "International exchange program. Adapting to new environments fast and without fear."
                  : "Nazioarteko truke programa. Ingurune berrietara azkar eta beldurrik gabe egokitzea.",
              },
              {
                year: "2023",
                title: locale === "es" ? "Trabajo en EEUU" : locale === "en" ? "Work in the USA" : "Lana AEBetan",
                desc: locale === "es"
                  ? "Experiencia profesional en Estados Unidos. Inglés profesional en contexto real, no de examen."
                  : locale === "en"
                  ? "Professional experience in the United States. Professional English in real context, not exam English."
                  : "Esperientzia profesionala Estatu Batuetan. Ingelesa ingurune errealean landua, ez azterketa ingelesa.",
              },
              {
                year: "2024–",
                title: locale === "es" ? "Freelance en Irun" : locale === "en" ? "Freelance in Irun" : "Freelance Irunen",
                desc: locale === "es"
                  ? "14+ proyectos entregados. Farmacia, motos, IA, óptica. 5 estrellas en Google. Trabajando mientras estudio Ingeniería Informática en la UAX."
                  : locale === "en"
                  ? "14+ projects delivered. Pharmacy, motorbikes, AI, optics. 5 stars on Google. Working while studying Computer Engineering at UAX."
                  : "14+ proiektu entregatuak. Farmazia, motozikleta, IA, optika. 5 izar Google-n. UAX-en Informatika Ingeniaritza ikasten ari naizen bitartean lan egiten.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-section"
        data-surface="alt"
        aria-labelledby="values-title"
      >
        <div className="container-xl">
          <AnimatedSection className="about-section-header">
            <h2 id="values-title" className="section-heading">
              {t("values.title")}
            </h2>
          </AnimatedSection>

          <div className="values-grid">
            {values.map((value, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="value-card">
                  <div className="value-card-icon" aria-hidden="true">
                    {value.icon}
                  </div>
                  <h3 className="value-card-title">{value.title}</h3>
                  <p className="value-card-desc">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="process-title">
        <div className="container-xl">
          <AnimatedSection className="about-section-header">
            <h2 id="process-title" className="section-heading">
              {t("process.title")}
            </h2>
          </AnimatedSection>

          <div className="process-grid">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="process-step">
                  <span className="process-step-connector" aria-hidden="true" />
                  <div className="process-step-number">{step.number}</div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-cta" aria-label="Call to action">
        <div className="container-xl">
          <AnimatedSection>
            <h2 className="dark-cta-heading">{t("cta")}</h2>
            <Link href={`/${locale}/contacto`} className="dark-cta-button focusable">
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
