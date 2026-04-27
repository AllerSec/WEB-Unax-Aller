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
    es: "Servicios de Diseño Web en Irun, País Vasco",
    en: "Web Design Services in Irun, Basque Country",
    eu: "Web Diseinu Zerbitzuak Irunen, Euskal Herrian",
  };
  const descriptions: Record<string, string> = {
    es: "Servicios de diseño web en Irun, Gipuzkoa: UI/UX a medida, SEO técnico, animaciones GSAP, rendimiento web, multi-idioma y más para negocios del País Vasco.",
    en: "Web design services in Irun, Basque Country: custom UI/UX, technical SEO, GSAP animations, web performance, multi-language and more for Basque businesses.",
    eu: "Web diseinu zerbitzuak Irunen, Gipuzkoan: neurrira egindako UI/UX, SEO teknikoa, GSAP animazioak, web errendimendua, hizkuntza anitza eta gehiago.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/servicios`,
      languages: hreflangAlternates("/servicios"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/servicios" }),
    twitter: buildTwitter({ title, description }),
  };
}

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
}

function ServiceIcon({ path }: { path: React.ReactNode }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {path}
    </svg>
  );
}

// Build-time constants for JSON-LD validity dates (computed once at module
// load so the JSX renders pure values).
const VALID_FROM = new Date().toISOString().slice(0, 10);
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

export default async function ServiciosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale, namespace: "services" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const services: Service[] = [
    {
      id: "local-business",
      // storefront / local shop
      icon: <ServiceIcon path={<><path d="M3 9l1-5h16l1 5"/><path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><path d="M9 21V13h6v8"/></>} />,
      title: t("localBusiness.title"),
      description: t("localBusiness.description"),
      bullets: locale === "es"
        ? ["Diseño cuidado que da imagen profesional", "Optimizada para que aparezcas en Google Maps", "Pensada para móvil de arriba a abajo", "Información clara: horarios, contacto, servicios"]
        : locale === "en"
        ? ["Careful design that gives a professional image", "Optimised so you show up on Google Maps", "Built mobile-first from top to bottom", "Clear info: hours, contact, services"]
        : ["Diseinu zaindua, irudi profesionala ematen duena", "Google Maps-en ager zaitezen optimizatua", "Mugikorrerako lehenik pentsatua, goitik behera", "Informazio argia: ordutegia, kontaktua, zerbitzuak"],
    },
    {
      id: "clinic",
      // medical cross / health
      icon: <ServiceIcon path={<><path d="M12 4v16M4 12h16"/><rect x="3" y="3" width="18" height="18" rx="2"/></>} />,
      title: t("clinic.title"),
      description: t("clinic.description"),
      bullets: locale === "es"
        ? ["Identidad visual que transmite confianza", "Servicios y precios claros, sin letra pequeña", "Sistema de citas online si lo necesitas", "Política de privacidad y RGPD bien hechos"]
        : locale === "en"
        ? ["Visual identity that builds trust", "Clear services and pricing, no small print", "Online booking system if you need one", "Proper privacy policy and GDPR"]
        : ["Konfiantza ematen duen identitate bisuala", "Zerbitzu eta prezio argiak, letra txikirik gabe", "Online hitzorduen sistema behar baduzu", "Pribatutasun-politika eta DBEO ondo eginak"],
    },
    {
      id: "multilingual",
      // globe / international
      icon: <ServiceIcon path={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />,
      title: t("multilingual.title"),
      description: t("multilingual.description"),
      bullets: locale === "es"
        ? ["Hasta 4 idiomas: euskera, castellano, inglés, francés", "URLs separadas y hreflang correcto", "Estructura preparada para muchas subpáginas", "SEO técnico para posicionar en cada mercado"]
        : locale === "en"
        ? ["Up to 4 languages: Basque, Spanish, English, French", "Separate URLs and proper hreflang", "Architecture ready for many subpages", "Technical SEO that ranks in each market"]
        : ["4 hizkuntzatara arte: euskara, gaztelania, ingelesa, frantsesa", "URL bereiziak eta hreflang zuzena", "Azpiorri askotarako prestatutako egitura", "Merkatu bakoitzean posizionatzeko SEO teknikoa"],
    },
    {
      id: "redesign",
      // refresh / redesign
      icon: <ServiceIcon path={<><path d="M21 12a9 9 0 1 1-3-6.7"/><polyline points="21 3 21 9 15 9"/></>} />,
      title: t("redesign.title"),
      description: t("redesign.description"),
      bullets: locale === "es"
        ? ["Auditoría de tu web actual antes de empezar", "Mantenemos lo que sí funciona", "Migración limpia sin perder posicionamiento", "Web nueva, rápida y bien hecha"]
        : locale === "en"
        ? ["Audit of your current site before we start", "We keep what already works", "Clean migration without losing rankings", "A new site that's fast and well built"]
        : ["Zure egungo webgunearen auditoria hasi aurretik", "Funtzionatzen duena mantentzen dugu", "Migrazio garbia, posizionamendua galdu gabe", "Webgune berria, azkarra eta ondo egina"],
    },
  ];

  const faqItems = locale === "es"
    ? [
        { q: "¿Cuánto tiempo tarda en hacerse una web?", a: "El proceso completo desde el primer contacto hasta la entrega dura entre 3 y 6 semanas, dependiendo de la complejidad del proyecto y la velocidad de feedback." },
        { q: "¿Qué necesito aportar yo para empezar?", a: "Solo necesito que me cuentes tu negocio, tus objetivos y, si los tienes, logotipo y fotos. Del resto me encargo yo." },
        { q: "¿Incluye el mantenimiento después de la entrega?", a: "El precio incluye 1 mes de soporte post-lanzamiento. A partir de ahí, ofrezco planes de mantenimiento opcionales." },
        { q: "¿Puedo pedir cambios durante el proyecto?", a: "Sí, incluye hasta 2 rondas de revisión sin coste adicional." },
        { q: "¿Trabajas solo con empresas del País Vasco?", a: "No, trabajo con clientes de toda España y también internacionales." },
      ]
    : locale === "en"
    ? [
        { q: "How long does it take to build a website?", a: "The complete process takes between 3 and 6 weeks, depending on project complexity and feedback speed." },
        { q: "What do I need to provide to get started?", a: "I just need you to tell me about your business and goals, and if you have them, your logo and photos." },
        { q: "Does it include maintenance after delivery?", a: "The price includes 1 month of post-launch support. After that, I offer optional maintenance plans." },
        { q: "Can I request changes during the project?", a: "Yes, it includes up to 2 revision rounds at no additional cost." },
        { q: "Do you only work with Basque Country businesses?", a: "No, I work with clients from all over Spain and internationally too." },
      ]
    : [
        { q: "Zenbat denbora behar da web bat egiteko?", a: "Osoko prozesuak 3 eta 6 aste artean irauten du, proiektuaren konplexutasunaren arabera." },
        { q: "Zer eman behar dut hasteko?", a: "Zure negozioa eta helburuak kontatzea besterik ez." },
        { q: "Mantentze-lana entregatutakoan sartzen al da?", a: "Prezioak abian jarri ondoren 1 hilabeteko laguntza barne hartzen du." },
        { q: "Prozesu bitartean aldaketak eskatu al ditzaket?", a: "Bai, gehigarrizko kosturik gabe 2 berrikuspen txanda barne hartzen du." },
        { q: "Euskal Herriko enpresekin bakarrik lan egiten al duzu?", a: "Ez, Espainiatik eta nazioarteetik ere bezeroekin lan egiten dut." },
      ];

  const howToSteps = locale === "es"
    ? [
        { name: "1. Hablamos", text: "Una llamada o un café de 30 minutos. Me cuentas qué necesitas, a quién quieres atraer y qué imagen quieres dar. Pregunto mucho." },
        { name: "2. Presupuesto cerrado", text: "Te paso un presupuesto cerrado en 24-48h. 1.500€ base, hasta unos 2.000€ si necesitas algo más complejo (citas, automatizaciones, integraciones). Sin sorpresas." },
        { name: "3. Diseño", text: "Pienso primero en qué va a sentir tu cliente al entrar en la web. Fuente, paleta, microanimaciones. Te enseño avances e iteramos hasta que cuadra." },
        { name: "4. Desarrollo", text: "Programo la web a mano con las herramientas más actuales. SEO técnico, multi-idioma si lo necesitas, y que fluya bien en cualquier dispositivo." },
        { name: "5. Pruebas", text: "Compruebo en dispositivos reales, auditoría Lighthouse con Performance/Accessibility/SEO por encima de 95 y validación de datos estructurados." },
        { name: "6. Lanzamiento", text: "Subimos la web, configuramos dominio, Google Search Console y Analytics. Te enseño cómo va el tráfico las primeras semanas." },
        { name: "7. Mantenimiento", text: "Si quieres que me siga encargando, son 200€ al año e incluye hosting, dominio, cambios menores y soporte. Si vas a necesitar muchos cambios, lo ajustamos." },
      ]
    : locale === "en"
    ? [
        { name: "1. We talk", text: "A 30-minute call or coffee. You tell me what you need, who you want to attract and the image you want to give. I ask a lot." },
        { name: "2. Fixed quote", text: "I send a fixed quote in 24-48h. €1,500 base, up to around €2,000 if you need something more complex (booking, automations, integrations). No surprises." },
        { name: "3. Design", text: "I think first about what your client will feel when they land on the site. Font, palette, microanimations. I show you progress and we iterate until it fits." },
        { name: "4. Development", text: "I code the site by hand with today's tools. Technical SEO, multi-language if you need it, and that it flows on any device." },
        { name: "5. Testing", text: "I check on real devices, Lighthouse audit with Performance/Accessibility/SEO above 95 and structured data validation." },
        { name: "6. Launch", text: "We push the site, set up the domain, Google Search Console and Analytics. I show you how the traffic looks the first weeks." },
        { name: "7. Maintenance", text: "If you want me to keep handling it, it's €200 per year and covers hosting, domain, minor changes and support. If you'll need lots of changes, we adjust." },
      ]
    : [
        { name: "1. Hitz egiten dugu", text: "30 minutuko deia edo kafea. Zer behar duzun, nor erakarri nahi duzun eta zer irudi eman nahi duzun esaten didazu. Asko galdetzen dut." },
        { name: "2. Aurrekontu itxia", text: "24-48 ordutan aurrekontu itxia bidaltzen dizut. 1.500€ oinarrian, 2.000€ ingurura zerbait konplexuagoa behar baduzu (hitzorduak, automatizazioak, integrazioak). Ezustekorik gabe." },
        { name: "3. Diseinua", text: "Lehenik eta behin, zure bezeroak webgunera sartzean zer sentituko duen pentsatzen dut. Letra-tipoa, paleta, mikroanimazioak. Aurrerapenak erakusten dizkizut eta egokitu arte errepikatzen dugu." },
        { name: "4. Garapena", text: "Webgunea eskuz programatzen dut gaurko tresnekin. SEO teknikoa, eleaniztasuna behar baduzu, eta edozein gailutan ondo doala." },
        { name: "5. Probak", text: "Benetako gailuetan egiaztatzen dut, Lighthouse audita Performance/Accessibility/SEO 95 baino gehiagorekin eta datu egituratuen balidazioa." },
        { name: "6. Abiaraztea", text: "Webgunea igotzen dugu, domeinua, Google Search Console eta Analytics konfiguratzen ditugu. Lehen asteetan trafikoa nola doan erakusten dizut." },
        { name: "7. Mantentze-lana", text: "Nik jarraitzea nahi baduzu, urtean 200€ da eta hosting-a, domeinua, aldaketa txikiak eta laguntza barne ditu. Aldaketa asko behar badituzu, egokitu egiten dugu." },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://unaxaller.com/${locale}/servicios#service`,
        provider: { "@id": "https://unaxaller.com/#business" },
        serviceType: "Diseño y Desarrollo Web",
        name: locale === "es" ? "Servicios de Diseño Web Profesional" : locale === "en" ? "Professional Web Design Services" : "Web Diseinu Zerbitzu Profesionalak",
        description: locale === "es"
          ? "Diseño web a medida, desarrollo en Next.js, SEO técnico, rendimiento Lighthouse 95+ y multi-idioma para negocios del País Vasco."
          : locale === "en"
          ? "Custom web design, Next.js development, technical SEO, Lighthouse 95+ performance and multi-language for Basque Country businesses."
          : "Neurrira egindako web diseinua, Next.js-ekin garapena, SEO teknikoa, Lighthouse 95+ errendimendua eta eleaniztasuna Euskal Herriko negozioetarako.",
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
          { "@type": "Country", name: "España" },
        ],
        audience: {
          "@type": "BusinessAudience",
          audienceType: locale === "es" ? "PyMEs, autónomos y comercios locales" : locale === "en" ? "SMEs, freelancers and local businesses" : "ETE, autonomoak eta tokiko merkataritza",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "1500",
          highPrice: "2000",
          offerCount: 1,
          availability: "https://schema.org/InStock",
          validFrom: VALID_FROM,
          priceValidUntil: PRICE_VALID_UNTIL,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Servicios de Diseño Web" : locale === "en" ? "Web Design Services" : "Web Diseinu Zerbitzuak",
          itemListElement: services.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              serviceType: s.title,
            },
          })),
        },
      },
      {
        "@type": "HowTo",
        "@id": `https://unaxaller.com/${locale}/servicios#howto`,
        name: locale === "es"
          ? "Cómo contratar una web profesional con Unax Aller"
          : locale === "en"
          ? "How to hire a professional website with Unax Aller"
          : "Nola kontratatu web profesional bat Unax Allerekin",
        description: locale === "es"
          ? "Proceso paso a paso desde el primer contacto hasta la entrega final de una web profesional hecha a medida."
          : locale === "en"
          ? "Step-by-step process from first contact to final delivery of a custom-made professional website."
          : "Urratsez urratseko prozesua lehen kontaktutik neurrira egindako web profesional baten azken entregara arte.",
        totalTime: "PT21D",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: "1500",
        },
        step: howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `https://unaxaller.com/${locale}/servicios#paso-${i + 1}`,
        })),
      },
      {
        "@type": "FAQPage",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["details summary", "details p"],
        },
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Servicios" : locale === "en" ? "Services" : "Zerbitzuak", item: `https://unaxaller.com/${locale}/servicios` },
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
      <section className="page-hero" aria-label="Services hero">
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              { name: locale === "es" ? "Servicios" : locale === "en" ? "Services" : "Zerbitzuak" },
            ]}
          />

          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">{tNav("servicios")}</span>
            <h1 className="page-hero-title">{t("title")}</h1>
            <p className="page-hero-subtitle">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Services detail grid */}
      <section className="services-detail" aria-label="Services list">
        <div className="container-xl">
          <div className="services-detail-grid">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.05}>
                <div id={service.id} className="service-detail-card">
                  <div className="service-detail-icon">{service.icon}</div>

                  <h2 className="service-detail-title">{service.title}</h2>
                  <p className="service-detail-desc">{service.description}</p>

                  <ul className="service-detail-bullets">
                    {service.bullets.map((bullet, j) => (
                      <li key={j} className="service-detail-bullet">
                        <span className="service-detail-bullet-dot" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* FAQ */}
          <AnimatedSection className="faq-wrap">
            <h2 className="section-heading">
              {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : "Galdera ohikoak"}
            </h2>
            <div className="faq-list">
              {faqItems.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-summary">
                    {item.q}
                    <svg
                      className="faq-caret"
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="faq-answer">{item.a}</p>
                </details>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="page-cta">
            <h2 className="section-heading page-cta-heading">
              {locale === "es"
                ? "¿Listo para empezar?"
                : locale === "en"
                ? "Ready to get started?"
                : "Prest hasteko?"}
            </h2>
            <div className="page-cta-actions">
              <Link href={`/${locale}/contacto`} className="btn btn-primary btn-lg">
                {tHero("cta")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href={`/${locale}/precios`} className="btn btn-secondary btn-lg">
                {tHero("cta2")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
