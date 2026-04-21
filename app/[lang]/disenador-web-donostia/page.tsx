import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Donostia-San Sebastián | Unax Aller",
    en: "Web Designer in Donostia-San Sebastián | Unax Aller",
    eu: "Web Diseinatzailea Donostia-San Sebastianen | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Donostia-San Sebastián. Webs a medida con SEO local, diseño premium y rendimiento. Desde 1.300€ IVA incluido.",
    en: "Freelance web designer for businesses in Donostia-San Sebastián. Custom websites with local SEO, premium design and performance. From €1,300 VAT included.",
    eu: "Web diseinatzaile freelance Donostia-San Sebastianeko negozioetarako. Neurrizko webguneak SEO lokalarekin, diseinu premiuma eta errendimenduarekin. 1.300€-tik BEZ barne.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/disenador-web-donostia` },
  };
}

export default async function DonostiaPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const cityName = locale === "eu" ? "Donostia-San Sebastián" : "Donostia-San Sebastián";
  const regionName = locale === "es" ? "Gipuzkoa" : locale === "en" ? "Gipuzkoa" : "Gipuzkoa";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        url: "https://unaxaller.com",
        areaServed: [
          { "@type": "City", name: "Donostia-San Sebastián" },
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
        ],
        serviceType: "Diseño y Desarrollo Web",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Diseñador web Donostia" : locale === "en" ? "Web designer Donostia" : "Web diseinatzailea Donostia", item: `https://unaxaller.com/${locale}/disenador-web-donostia` },
        ],
      },
    ],
  };

  const benefits = locale === "es"
    ? [
        { title: "Conoce el mercado local", desc: `Entiendo cómo buscan los clientes de ${cityName} y qué esperan de un negocio local. Eso se traduce en webs que conectan mejor.` },
        { title: "SEO local de verdad", desc: "No solo pongo tus keywords. Optimizo para búsquedas locales, Google Maps y Google Business Profile." },
        { title: "Comunicación directa", desc: "Hablas conmigo, no con un gestor de cuentas. Si necesitas una reunión presencial, puedo desplazarme." },
        { title: "Precios justos sin letra pequeña", desc: "1.300€ IVA incluido. Sin sorpresas. Sin renovaciones forzosas." },
      ]
    : locale === "en"
    ? [
        { title: "Knows the local market", desc: `I understand how ${cityName} clients search and what they expect from a local business. That translates into websites that connect better.` },
        { title: "Real local SEO", desc: "I don't just add keywords. I optimise for local searches, Google Maps and Google Business Profile." },
        { title: "Direct communication", desc: "You talk to me, not an account manager. If you need an in-person meeting, I can travel." },
        { title: "Fair prices, no small print", desc: "€1,300 VAT included. No surprises. No forced renewals." },
      ]
    : [
        { title: "Merkatu lokala ezagutu", desc: `${cityName}ko bezeroek nola bilatzen duten eta negozio lokal batetik zer espero duten ulertzen dut.` },
        { title: "Benetako SEO lokala", desc: "Ez ditut hitz gakoak bakarrik gehitzen. Bilaketa lokaletarako, Google Maps eta Google Business Profilerako optimizatzen dut." },
        { title: "Komunikazio zuzena", desc: "Nirekin hitz egiten duzu, ez kontu kudeatzaile batekin." },
        { title: "Prezio justu letra txikirik gabe", desc: "1.300€ BEZ barne. Sorpresarik gabe. Beharrezko berritzapenik gabe." },
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
              ? `Soy Unax Aller, diseñador web freelance en Irun con clientes en ${cityName} y toda ${regionName}. Creo webs a medida que posicionan en Google y convierten visitantes en clientes.`
              : locale === "en"
              ? `I'm Unax Aller, a freelance web designer based in Irun with clients in ${cityName} and all of ${regionName}. I create custom websites that rank on Google and convert visitors into clients.`
              : `Unax Aller naiz, Irungo web diseinatzaile freelancea ${cityName}ko eta ${regionName}ko bezero askorekin. Googleren rankean agertzen diren eta bisitariak bezeroak bihurtzen dituzten neurrizko webguneak sortzen ditut.`}
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
              {locale === "es" ? "Consulta gratuita de 30 minutos. Sin compromiso." : locale === "en" ? "Free 30-minute consultation. No commitment." : "30 minutuko doako kontsulta. Konpromisorik gabe."}
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
