import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Hondarribia | Unax Aller",
    en: "Web Designer in Hondarribia | Unax Aller",
    eu: "Web Diseinatzailea Hondarribian | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Hondarribia. A 5 km de Irun. Webs a medida con SEO local, diseño premium y rendimiento. Desde 1.300€ IVA incluido.",
    en: "Freelance web designer for businesses in Hondarribia. 5 km from Irun. Custom websites with local SEO, premium design and performance. From €1,300 VAT included.",
    eu: "Web diseinatzaile freelance Hondarribiko negozioetarako. Iruntik 5 kmra. Neurrizko webguneak SEO lokalarekin, diseinu premiuma eta errendimenduarekin. 1.300€-tik BEZ barne.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/disenador-web-hondarribia`,
      languages: hreflangAlternates("/disenador-web-hondarribia"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/disenador-web-hondarribia" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HondarribiaPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const cityName = "Hondarribia";
  const regionName = "Gipuzkoa";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        url: "https://unaxaller.com",
        areaServed: [
          { "@type": "City", name: cityName },
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: regionName },
        ],
        serviceType: "Diseño y Desarrollo Web",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? `Diseñador web ${cityName}` : locale === "en" ? `Web designer ${cityName}` : `Web diseinatzailea ${cityName}`, item: `https://unaxaller.com/${locale}/disenador-web-hondarribia` },
        ],
      },
    ],
  };

  const benefits = locale === "es"
    ? [
        { title: "A 5 km de tu negocio", desc: "Estoy en Irun, justo al lado. Si necesitas reunión presencial en Hondarribia, voy el mismo día." },
        { title: "Conozco el mercado local", desc: "Entiendo el tejido comercial de Hondarribia: hostelería, pesca, comercio, turismo. Webs que conectan con tu público real." },
        { title: "SEO local de verdad", desc: "Optimización para búsquedas en Hondarribia, Google Maps y Google Business Profile. No solo keywords: estrategia completa." },
        { title: "Precio justo, sin sorpresas", desc: "1.300€ IVA incluido. Sin permanencia. Sin renovaciones forzosas. El código es tuyo." },
      ]
    : locale === "en"
    ? [
        { title: "5 km from your business", desc: "I'm in Irun, right next door. If you need an in-person meeting in Hondarribia, I can come the same day." },
        { title: "I know the local market", desc: "I understand Hondarribia's business landscape: hospitality, fishing, retail, tourism. Websites that connect with your real audience." },
        { title: "Real local SEO", desc: "Optimization for searches in Hondarribia, Google Maps and Google Business Profile. Not just keywords — full strategy." },
        { title: "Fair price, no surprises", desc: "€1,300 VAT included. No lock-in. No forced renewals. The code is yours." },
      ]
    : [
        { title: "Zure negoziotik 5 kmra", desc: "Irunen nago, ondo-ondoan. Hondarribian aurrez aurreko bilera behar baduzu, egun berean joaten naiz." },
        { title: "Merkatu lokala ezagutzen dut", desc: "Hondarribiako merkataritza ehuna ulertzen dut: ostalaritza, arrantza, saltokia, turismoa." },
        { title: "Benetako SEO lokala", desc: "Hondarribiako bilaketetarako, Google Maps eta Google Business Profilerako optimizazioa." },
        { title: "Prezio justu, sorpresarik gabe", desc: "1.300€ BEZ barne. Iraunkortasunik gabe. Kodea zurea da." },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {locale === "es"
              ? `Diseñador web en ${cityName}`
              : locale === "en"
              ? `Web designer in ${cityName}`
              : `Web diseinatzailea ${cityName}n`}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {locale === "es"
              ? `Soy Unax Aller, diseñador web freelance en Irun, a 5 minutos de ${cityName}. Creo webs a medida para hostelería, comercio y servicios con SEO local real y diseño premium.`
              : locale === "en"
              ? `I'm Unax Aller, a freelance web designer based in Irun, 5 minutes from ${cityName}. I build custom websites for hospitality, retail and services with real local SEO and premium design.`
              : `Unax Aller naiz, Irungo web diseinatzaile freelancea, ${cityName}tik 5 minutura. Ostalaritza, merkataritza eta zerbitzuetarako neurrizko webguneak egiten ditut.`}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: "#061b0e", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}
          >
            {locale === "es" ? "Solicitar presupuesto gratis" : locale === "en" ? "Request a free quote" : "Doako aurrekontua eskatu"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: "#efeee9" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es"
                ? `¿Por qué elegir un diseñador web local en ${cityName}?`
                : locale === "en"
                ? `Why choose a local web designer in ${cityName}?`
                : `Zergatik aukeratu bertako web diseinatzaile bat ${cityName}n?`}
            </h2>
            <div className="flex flex-col gap-6">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "#faf9f4", border: "1px solid #e3e3de" }}
                >
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#061b0e" }}>
        <div className="container-xl text-center">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {locale === "es"
                ? `¿Tienes un negocio en ${cityName}?`
                : locale === "en"
                ? `Do you have a business in ${cityName}?`
                : `${cityName}n negozioa al duzu?`}
            </h2>
            <p className="mb-8 text-sm" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
              {locale === "es" ? "Consulta gratuita de 30 minutos. Puedo ir presencialmente." : locale === "en" ? "Free 30-minute consultation. I can come in person." : "30 minutuko doako kontsulta. Aurrez aurre joan naiteke."}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#b4cdb8", color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es" ? "Hablar con Unax" : locale === "en" ? "Talk to Unax" : "Unaxekin hitz egin"}
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
