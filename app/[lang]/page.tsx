import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import ServicesGrid from "@/components/home/ServicesGrid";
import Testimonials from "@/components/home/Testimonials";
import PricingCards from "@/components/pricing/PricingCards";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionDivider from "@/components/shared/SectionDivider";
import Link from "next/link";
import { siteConfig } from "@/lib/utils";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Irun, País Vasco | Unax Aller",
    en: "Web Designer in Irun, Basque Country | Unax Aller",
    eu: "Web Diseinatzailea Irunen, Euskal Herrian | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance en Irun, Gipuzkoa. Webs a medida para negocios del País Vasco: diseño premium, SEO, animaciones y rendimiento. Desde 1.300€ IVA incluido.",
    en: "Freelance web designer in Irun, Basque Country. Custom websites for Basque businesses: premium design, SEO, animations and performance. From €1,300 VAT included.",
    eu: "Web diseinatzaile freelance Irunen, Gipuzkoan. Neurrira egindako webguneak Euskal Herriko negozioetarako. 1.300€-tik BEZ barne.",
  };
  const keywords: Record<string, string[]> = {
    es: [
      "diseñador web Irun",
      "diseñador web Gipuzkoa",
      "diseñador web País Vasco",
      "desarrollador web freelance",
      "diseño web a medida",
      "web Next.js",
      "SEO local Irun",
      "páginas web profesionales Gipuzkoa",
    ],
    en: [
      "web designer Irun",
      "web designer Basque Country",
      "freelance web developer Spain",
      "custom web design",
      "Next.js developer",
      "SEO Gipuzkoa",
    ],
    eu: [
      "web diseinatzailea Irun",
      "web diseinatzailea Gipuzkoa",
      "web diseinatzailea Euskal Herria",
      "freelance garatzailea",
      "neurrira egindako webguneak",
    ],
  };

  const title = titles[locale] || titles.es;
  const description = descriptions[locale] || descriptions.es;

  return {
    title,
    description,
    keywords: keywords[locale] || keywords.es,
    alternates: {
      canonical: `https://unaxaller.com/${locale}`,
      languages: hreflangAlternates(""),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        url: "https://unaxaller.com",
        logo: "https://unaxaller.com/favicon.svg",
        description:
          "Diseñador web freelance en Irun, Gipuzkoa. Webs a medida para negocios del País Vasco: diseño premium, SEO, animaciones y rendimiento.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Irun",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          postalCode: "20300",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.339,
          longitude: -1.7892,
        },
        priceRange: "€1300-€3000",
        email: "hola@unaxaller.com",
        telephone: "+34620909916",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        currenciesAccepted: "EUR",
        paymentAccepted: "Bank transfer, SEPA",
        knowsAbout: [
          "Web Design",
          "Next.js",
          "SEO",
          "User Experience",
          "Performance Optimization",
          "Core Web Vitals",
          "Schema.org",
          "Local SEO",
        ],
        slogan: "Diseño y desarrollo web que convierte visitantes en clientes",
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://unaxaller.com/#service",
        name: "Diseño y Desarrollo Web",
        provider: { "@id": "https://unaxaller.com/#business" },
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planes de Diseño Web",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Plan Completo",
              price: "1300",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1300",
                priceCurrency: "EUR",
                description: "IVA incluido",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://unaxaller.com/#website",
        url: "https://unaxaller.com",
        name: "Unax Aller",
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: ["es", "en", "eu"],
      },
      {
        "@type": "FAQPage",
        "@id": `https://unaxaller.com/${locale}/#faq`,
        mainEntity: (locale === "es"
          ? [
              {
                q: "¿Cuánto cuesta una web profesional en Irun o Gipuzkoa?",
                a: "Una web profesional a medida desde 1.300€ IVA incluido. Incluye diseño exclusivo, hasta 5 secciones, SEO técnico, velocidad Lighthouse 95+ y despliegue. Sin suscripciones ocultas: compras la web y es tuya.",
              },
              {
                q: "¿En cuánto tiempo tienes la web lista?",
                a: "Entre 2 y 4 semanas desde la aprobación del diseño. Depende del contenido que aportes y de la velocidad de respuesta en las revisiones.",
              },
              {
                q: "¿Trabajas solo en Irun o también para empresas de otras ciudades?",
                a: "Trabajo con negocios de Irun, Donostia, Hondarribia, Errenteria, Lasarte, Tolosa, Eibar, Bilbao y Vitoria-Gasteiz. Reuniones presenciales en Gipuzkoa; resto del País Vasco y España por videollamada.",
              },
              {
                q: "¿La web está optimizada para Google (SEO)?",
                a: "Sí. Todo el SEO técnico está incluido: Schema.org, sitemap multi-idioma, hreflang, OpenGraph, Core Web Vitals optimizados y estructura semántica correcta. También configuro Google Search Console.",
              },
              {
                q: "¿Puedo tener la web en euskera, castellano e inglés?",
                a: "Sí. El multi-idioma (es/en/eu) con URLs separadas y hreflang correcto está disponible en todos los proyectos. Es una ventaja competitiva clara para negocios del País Vasco.",
              },
              {
                q: "¿Qué pasa si necesito cambios después del lanzamiento?",
                a: "Los cambios estructurales post-entrega se presupuestan aparte, pero el código es 100% tuyo: cualquier desarrollador puede tocarlo. No te atas a mí ni a un CMS cerrado.",
              },
            ]
          : locale === "en"
          ? [
              {
                q: "How much does a professional website cost in Irun or Gipuzkoa?",
                a: "A custom professional website from €1,300 VAT included. Includes exclusive design, up to 5 sections, technical SEO, Lighthouse 95+ speed and deployment. No hidden subscriptions: you buy it, it is yours.",
              },
              {
                q: "How long until the website is ready?",
                a: "Between 2 and 4 weeks from design approval, depending on content you provide and response speed during reviews.",
              },
              {
                q: "Do you only work in Irun or also for businesses elsewhere?",
                a: "I work with businesses in Irun, Donostia, Hondarribia, Errenteria, Lasarte, Tolosa, Eibar, Bilbao and Vitoria-Gasteiz. On-site meetings in Gipuzkoa; rest of the Basque Country and Spain via video call.",
              },
              {
                q: "Is the website optimized for Google (SEO)?",
                a: "Yes. All technical SEO is included: Schema.org, multi-language sitemap, hreflang, OpenGraph, optimized Core Web Vitals and correct semantic structure. I also set up Google Search Console.",
              },
              {
                q: "Can I have the website in Basque, Spanish and English?",
                a: "Yes. Multi-language (es/en/eu) with separate URLs and correct hreflang is available on every project. A clear competitive advantage for Basque Country businesses.",
              },
              {
                q: "What happens if I need changes after launch?",
                a: "Structural post-delivery changes are quoted separately, but the code is 100% yours: any developer can modify it. You are not locked in to me or a closed CMS.",
              },
            ]
          : [
              {
                q: "Zenbat kostatzen da web profesional bat Irunen edo Gipuzkoan?",
                a: "Neurrira egindako web profesional bat 1.300€-tik, BEZ barne. Diseinu esklusiboa, 5 atal arte, SEO teknikoa, Lighthouse 95+ abiadura eta hedapena barne. Harpidetza ezkuturik gabe: erosi eta zurea da.",
              },
              {
                q: "Zenbat denboran izango duzu weba prest?",
                a: "Diseinua onartu ondoren 2 eta 4 aste artean. Emandako edukiaren eta berrikuspen-erantzunen araberakoa da.",
              },
              {
                q: "Irunen bakarrik egiten duzu lan, ala beste hirietako negozioentzat ere bai?",
                a: "Irungo, Donostiako, Hondarribiko, Errenteriako, Lasarteko, Tolosako, Eibarko, Bilboko eta Gasteizko negozioekin egiten dut lan. Aurrez aurreko bilerak Gipuzkoan; Euskal Herriko eta Espainiako gainontzekoa bideo-deiz.",
              },
              {
                q: "Weba Googlerako optimizatuta dago (SEO)?",
                a: "Bai. SEO tekniko osoa barne: Schema.org, sitemap eleanitza, hreflang, OpenGraph, Core Web Vitals optimizatuak eta egitura semantiko zuzena. Google Search Console ere konfiguratzen dut.",
              },
              {
                q: "Weba euskaraz, gaztelaniaz eta ingelesez eduki dezaket?",
                a: "Bai. Eleaniztasuna (es/en/eu) URL bereiziekin eta hreflang zuzenarekin proiektu guztietan dago eskuragarri. Abantaila lehiakor argia Euskal Herriko negozioentzat.",
              },
              {
                q: "Zer gertatzen da abian jarri ondoren aldaketak behar baditut?",
                a: "Entrega ondorengo aldaketa estrukturalak aparte aurrekontatzen dira, baina kodea %100 zurea da: edozein garatzailek uki dezake. Ez zaude niri edo CMS itxi bati lotuta.",
              },
            ]
        ).map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "[data-speakable]"],
        },
      },
      {
        "@type": "Person",
        "@id": "https://unaxaller.com/#person",
        name: "Unax Aller Fernández",
        jobTitle: "Diseñador y Desarrollador Web",
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
        },
        worksFor: { "@id": "https://unaxaller.com/#business" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          addressCountry: "ES",
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Hero locale={locale} />

      {/* Pricing preview */}
      <div className="surface-alt">
        <PricingCards locale={locale} headingLevel="h2" />
      </div>

      <SectionDivider background="var(--color-bg)" />

      {/* Social Proof */}
      <SocialProof />

      <SectionDivider background="var(--color-bg)" />

      {/* Services Grid */}
      <ServicesGrid locale={locale} />

      {/* Testimonials */}
      <Testimonials />

      {/* Bottom CTA strip */}
      <AnimatedSection>
        <section className="cta-strip" aria-label="Call to action">
          <div className="container-xl cta-strip-inner">
            <h2 className="cta-strip-title">{t("contact.title")}</h2>
            <p className="cta-strip-subtitle">{t("contact.subtitle")}</p>
            <div className="cta-strip-actions">
              <Link href={`/${locale}/contacto`} className="cta-strip-btn-primary focusable">
                {t("hero.cta")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href={`/${locale}/precios`} className="cta-strip-btn-secondary focusable">
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
