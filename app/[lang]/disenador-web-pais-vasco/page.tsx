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
    es: "Diseñador Web en el País Vasco | Unax Aller",
    en: "Web Designer in the Basque Country | Unax Aller",
    eu: "Web Diseinatzailea Euskal Herrian | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios del País Vasco: Bizkaia, Gipuzkoa y Álava. Webs a medida con SEO local, trilingüe (es/en/eu) y rendimiento. Desde 1.300€ IVA incluido.",
    en: "Freelance web designer for Basque Country businesses: Bizkaia, Gipuzkoa and Álava. Custom trilingual websites (es/en/eu) with local SEO and performance. From €1,300 VAT included.",
    eu: "Web diseinatzaile freelance Euskal Herriko negozioetarako: Bizkaia, Gipuzkoa eta Araba. Hiru hizkuntzatan (es/en/eu) eta SEO lokalarekin. 1.300€-tik BEZ barne.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/disenador-web-pais-vasco`,
      languages: hreflangAlternates("/disenador-web-pais-vasco"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/disenador-web-pais-vasco" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function PaisVascoPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const regionName = locale === "eu" ? "Euskal Herria" : "País Vasco";

  const faqItems = locale === "es"
    ? [
        {
          q: `¿Cuánto cuesta una web profesional en el ${regionName}?`,
          a: "Desde 1.300€ IVA incluido: diseño exclusivo, hasta 5 secciones, SEO técnico, multi-idioma (es/en/eu) y despliegue. Sin suscripciones ocultas.",
        },
        {
          q: "¿Puedes trabajar en Bilbao, Donostia y Vitoria?",
          a: "Sí. Estoy en Irun y me desplazo a cualquiera de las tres capitales cuando el proyecto lo requiere. La mayoría del trabajo se coordina por videollamada, pero la reunión inicial presencial es una opción.",
        },
        {
          q: "¿La web está disponible en euskera?",
          a: "Sí. El multi-idioma castellano, inglés y euskera viene de serie, con URLs separadas y hreflang correcto. Es una ventaja SEO clara para negocios del País Vasco.",
        },
        {
          q: "¿Posicionas en Google para búsquedas locales del País Vasco?",
          a: "Sí. Configuro SEO local por provincia y ciudad, Schema.org LocalBusiness con areaServed, y optimizo la ficha Google Business Profile.",
        },
        {
          q: "¿En cuánto tiempo estará lista la web?",
          a: "Entre 2 y 4 semanas desde la aprobación del diseño, dependiendo del contenido y las revisiones.",
        },
      ]
    : locale === "en"
    ? [
        {
          q: `How much does a professional website cost in the ${regionName}?`,
          a: "From €1,300 VAT included: exclusive design, up to 5 sections, technical SEO, multi-language (es/en/eu) and deployment. No hidden subscriptions.",
        },
        {
          q: "Can you work in Bilbao, Donostia and Vitoria?",
          a: "Yes. I'm based in Irun and I travel to any of the three capitals when the project requires it. Most of the work is coordinated via video call, but an initial in-person meeting is an option.",
        },
        {
          q: "Is the website available in Basque?",
          a: "Yes. Multi-language Spanish, English and Basque is included by default, with separate URLs and correct hreflang. A clear SEO advantage for Basque Country businesses.",
        },
        {
          q: "Do you rank on Google for Basque Country local searches?",
          a: "Yes. I configure local SEO per province and city, Schema.org LocalBusiness with areaServed, and I optimize the Google Business Profile listing.",
        },
        {
          q: "How long will the website take?",
          a: "Between 2 and 4 weeks from design approval, depending on content and reviews.",
        },
      ]
    : [
        {
          q: `Zenbat kostatzen da web profesional bat ${regionName}n?`,
          a: "1.300€-tik BEZ barne: diseinu esklusiboa, 5 atal arte, SEO teknikoa, eleaniztasuna (es/en/eu) eta hedapena. Harpidetza ezkuturik gabe.",
        },
        {
          q: "Bilbon, Donostian eta Gasteizen egin dezakezu lan?",
          a: "Bai. Irunen nago eta hiru hiriburuetara joaten naiz proiektuak hala eskatzen duenean. Lan gehiena bideo-deiz koordinatzen da, baina hasierako aurrez aurreko bilera aukera bat da.",
        },
        {
          q: "Weba euskaraz eskuragarri dago?",
          a: "Bai. Gaztelania, ingelesa eta euskara lehenetsita datoz, URL bereiziekin eta hreflang zuzenarekin. SEO abantaila argia Euskal Herriko negozioentzat.",
        },
        {
          q: "Euskal Herriko bilaketa lokaletarako posizionatzen duzu?",
          a: "Bai. SEO lokala konfiguratzen dut lurraldez lurralde eta hiriz hiri, Schema.org LocalBusiness areaServed-ekin, eta Google Business Profile fitxa optimizatzen dut.",
        },
        {
          q: "Zenbat denboran egongo da prest?",
          a: "Diseinua onartu ondoren 2 eta 4 aste artean, edukiaren eta berrikuspenen arabera.",
        },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        url: "https://unaxaller.com",
        areaServed: [
          { "@type": "AdministrativeArea", name: regionName },
          { "@type": "AdministrativeArea", name: "Bizkaia" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: locale === "eu" ? "Araba" : "Álava" },
          { "@type": "City", name: "Irun" },
          { "@type": "City", name: locale === "eu" ? "Bilbo" : "Bilbao" },
          { "@type": "City", name: locale === "eu" ? "Donostia" : "Donostia-San Sebastián" },
          { "@type": "City", name: locale === "eu" ? "Gasteiz" : "Vitoria-Gasteiz" },
        ],
        serviceType: "Diseño y Desarrollo Web",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es"
              ? `Diseñador web ${regionName}`
              : locale === "en"
              ? `Web designer ${regionName}`
              : `Web diseinatzailea ${regionName}`,
            item: `https://unaxaller.com/${locale}/disenador-web-pais-vasco`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `https://unaxaller.com/${locale}/disenador-web-pais-vasco#faq`,
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "[data-speakable]"],
        },
      },
    ],
  };

  const cities = [
    { name: locale === "eu" ? "Bilbo" : "Bilbao", slug: "disenador-web-bilbao", region: "Bizkaia" },
    { name: locale === "eu" ? "Donostia" : "Donostia-San Sebastián", slug: "disenador-web-donostia", region: "Gipuzkoa" },
    { name: locale === "eu" ? "Gasteiz" : "Vitoria-Gasteiz", slug: "disenador-web-vitoria", region: locale === "eu" ? "Araba" : "Álava" },
  ];

  const benefits = locale === "es"
    ? [
        { title: "Trilingüe de serie", desc: "Entrego tu web en castellano, inglés y euskera. Sin plugins frágiles, con URLs localizadas y hreflang correcto." },
        { title: "SEO para el mercado vasco", desc: "Optimización para búsquedas en Euskadi, Google Maps y Google Business Profile en las tres provincias." },
        { title: "Cercanía real", desc: "Estoy en Irun. Puedo desplazarme a Bilbao, Donostia o Vitoria cuando tu proyecto lo necesite." },
        { title: "Código tuyo para siempre", desc: "Web a medida en Next.js. Sin ataduras a plataformas propietarias. El código es tuyo el día 1." },
      ]
    : locale === "en"
    ? [
        { title: "Trilingual out of the box", desc: "I deliver your site in Spanish, English and Basque. No fragile plugins — localized URLs and proper hreflang." },
        { title: "SEO for the Basque market", desc: "Optimization for searches across the Basque Country, Google Maps and Google Business Profile in all three provinces." },
        { title: "Real proximity", desc: "I'm based in Irun. I can travel to Bilbao, Donostia or Vitoria whenever your project needs it." },
        { title: "Your code, forever", desc: "Custom Next.js site. No lock-in to proprietary platforms. The code is yours from day one." },
      ]
    : [
        { title: "Hiru hizkuntza hasieratik", desc: "Zure weba gaztelaniaz, ingelesez eta euskaraz entregatzen dut. URL lokalizatuak eta hreflang zuzena." },
        { title: "Euskal merkaturako SEO", desc: "Euskadiko bilaketetarako optimizazioa, Google Maps eta Google Business Profile hiru lurraldeetan." },
        { title: "Benetako hurbiltasuna", desc: "Irunen nago. Bilbora, Donostiara edo Gasteizera joan naiteke proiektuak hala behar duenean." },
        { title: "Kodea betirako zurea", desc: "Neurrira egindako weba Next.js-en. Lotura pribatibo barik. Kodea lehen egunetik zurea da." },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              {
                name: locale === "es"
                  ? `Diseñador web ${regionName}`
                  : locale === "en"
                  ? `Web designer ${regionName}`
                  : `Web diseinatzailea ${regionName}`,
              },
            ]}
          />

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {locale === "es"
              ? `Diseñador web en el ${regionName}`
              : locale === "en"
              ? `Web designer in the ${regionName}`
              : `Web diseinatzailea ${regionName}n`}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {locale === "es"
              ? `Soy Unax Aller, diseñador web freelance basado en Irun con clientes en Bizkaia, Gipuzkoa y Álava. Creo webs trilingües (castellano, inglés y euskera) que posicionan en Google y convierten visitantes en clientes.`
              : locale === "en"
              ? `I'm Unax Aller, a freelance web designer based in Irun with clients in Bizkaia, Gipuzkoa and Álava. I build trilingual websites (Spanish, English and Basque) that rank on Google and convert visitors into clients.`
              : `Unax Aller naiz, Irunen oinarritutako web diseinatzaile freelancea, Bizkaia, Gipuzkoa eta Arabako bezeroekin. Hiru hizkuntzatako webguneak egiten ditut (gaztelania, ingelesa eta euskara) Googlen agertu eta bisitariak bezero bihurtzen dituztenak.`}
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
                ? `¿Por qué un diseñador local del ${regionName}?`
                : locale === "en"
                ? `Why a local ${regionName} web designer?`
                : `Zergatik ${regionName}ko bertako diseinatzaile bat?`}
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

      <section className="py-20 md:py-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es"
                ? "Cubro las tres capitales vascas"
                : locale === "en"
                ? "I cover the three Basque capitals"
                : "Hiru hiriburu euskaldunak estaltzen ditut"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/${c.slug}`}
                  className="block p-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
                >
                  <div
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                  >
                    {c.region}
                  </div>
                  <div
                    className="text-xl font-medium"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="text-sm mt-2"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {locale === "es"
                      ? `Ver servicios para ${c.name}`
                      : locale === "en"
                      ? `See services for ${c.name}`
                      : `${c.name}rako zerbitzuak ikusi`}
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: "#efeee9" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : "Ohiko galderak"}
            </h2>
            <div className="flex flex-col gap-3">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="p-5 rounded-xl group"
                  style={{ backgroundColor: "#faf9f4", border: "1px solid #e3e3de" }}
                >
                  <summary
                    className="cursor-pointer text-base font-medium list-none flex items-start justify-between gap-4"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 transition-transform group-open:rotate-45 text-xl leading-none"
                      style={{ color: "#4d6453" }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="text-sm leading-relaxed mt-3"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.a}
                  </p>
                </details>
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
                ? `¿Tienes un negocio en el ${regionName}?`
                : locale === "en"
                ? `Have a business in the ${regionName}?`
                : `${regionName}n negozioa al duzu?`}
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
