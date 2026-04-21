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
    es: "Servicios de Diseño Web en Irun, País Vasco | Unax Aller",
    en: "Web Design Services in Irun, Basque Country | Unax Aller",
    eu: "Web Diseinu Zerbitzuak Irunen, Euskal Herrian | Unax Aller",
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

export default async function ServiciosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale, namespace: "services" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const services: Service[] = [
    {
      icon: <ServiceIcon path={<><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></>} />,
      title: t("design.title"),
      description: t("design.description"),
      bullets: locale === "es"
        ? ["Investigación de usuarios y competidores", "Wireframes y prototipos interactivos", "Sistema de diseño completo", "Pruebas de usabilidad"]
        : locale === "en"
        ? ["User & competitor research", "Wireframes & interactive prototypes", "Complete design system", "Usability testing"]
        : ["Erabiltzaile eta lehiakide ikerketa", "Wireframe eta prototipo interaktiboak", "Diseinu sistema osoa", "Erabilgarritasun probak"],
    },
    {
      icon: <ServiceIcon path={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>} />,
      title: t("performance.title"),
      description: t("performance.description"),
      bullets: locale === "es"
        ? ["Core Web Vitals en verde", "Lazy loading y optimización de imágenes", "Caché avanzado y CDN", "Auditoría Lighthouse 95+"]
        : locale === "en"
        ? ["Core Web Vitals in the green", "Lazy loading & image optimization", "Advanced caching & CDN", "Lighthouse audit 95+"]
        : ["Core Web Vitals berdean", "Lazy loading eta irudien optimizazioa", "Cache aurreratua eta CDN", "Lighthouse audita 95+"],
    },
    {
      icon: <ServiceIcon path={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />,
      title: t("seo.title"),
      description: t("seo.description"),
      bullets: locale === "es"
        ? ["Schema.org y datos estructurados", "Hreflang para multi-idioma", "Sitemaps y robots.txt", "Google My Business optimizado"]
        : locale === "en"
        ? ["Schema.org & structured data", "Hreflang for multi-language", "Sitemaps & robots.txt", "Google My Business optimised"]
        : ["Schema.org eta datu egituratuak", "Hreflang hizkuntza anitzetarako", "Sitemaps eta robots.txt", "Google My Business optimizatua"],
    },
    {
      icon: <ServiceIcon path={<><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>} />,
      title: t("mobile.title"),
      description: t("mobile.description"),
      bullets: locale === "es"
        ? ["Diseño mobile-first", "Touch gestures y micro-interacciones", "PWA opcional", "Pruebas en dispositivos reales"]
        : locale === "en"
        ? ["Mobile-first design", "Touch gestures & micro-interactions", "Optional PWA", "Tested on real devices"]
        : ["Mobile-first diseinua", "Ukipen keinuak eta mikro-interakzioak", "PWA aukerazkoa", "Benetako gailuetan probatua"],
    },
    {
      icon: <ServiceIcon path={<polygon points="5 3 19 12 5 21 5 3"/>} />,
      title: t("animation.title"),
      description: t("animation.description"),
      bullets: locale === "es"
        ? ["GSAP y ScrollTrigger", "Framer Motion para React", "Animaciones de carga", "Transiciones de página suaves"]
        : locale === "en"
        ? ["GSAP & ScrollTrigger", "Framer Motion for React", "Loading animations", "Smooth page transitions"]
        : ["GSAP eta ScrollTrigger", "Framer Motion Reactentzat", "Karga animazioak", "Orrialde trantsizio leunak"],
    },
    {
      icon: <ServiceIcon path={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />,
      title: t("multilang.title"),
      description: t("multilang.description"),
      bullets: locale === "es"
        ? ["Español, Inglés y Euskera", "URLs por idioma", "Detección automática de idioma", "Contenido adaptado culturalmente"]
        : locale === "en"
        ? ["Spanish, English & Basque", "Per-language URLs", "Automatic language detection", "Culturally adapted content"]
        : ["Gaztelania, Ingelesa eta Euskara", "Hizkuntzako URL-ak", "Hizkuntza detekzio automatikoa", "Kulturalki egokitutako edukia"],
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
        { name: "1. Primer contacto y briefing", text: "Agendamos una llamada gratuita de 30 minutos para entender tu negocio, tus objetivos y competencia. Te envío un briefing previo por email." },
        { name: "2. Propuesta y presupuesto cerrado", text: "En 48h recibes la propuesta con alcance, plazos y precio cerrado. Sin sorpresas, sin coste variable." },
        { name: "3. Diseño visual (UI)", text: "Creo un prototipo en Figma con la home y las plantillas clave. Hasta 2 rondas de revisión incluidas." },
        { name: "4. Desarrollo y programación", text: "Monto la web en Next.js con componentes reutilizables, SEO técnico y Schema.org desde el primer commit." },
        { name: "5. Pruebas, QA y Lighthouse", text: "Verifico en dispositivos reales, auditoría Lighthouse con Performance/Accessibility/SEO > 95 y validación de datos estructurados." },
        { name: "6. Despliegue y entrega", text: "Publico la web, conecto el dominio, Google Search Console, Analytics y te entrego el código. Es tuyo." },
        { name: "7. Soporte post-lanzamiento", text: "Un mes de soporte incluido para resolver cualquier duda o ajuste menor. Después, plan de mantenimiento opcional." },
      ]
    : locale === "en"
    ? [
        { name: "1. First contact and brief", text: "We schedule a free 30-minute call to understand your business, goals and competition. You receive a briefing by email beforehand." },
        { name: "2. Proposal and fixed quote", text: "Within 48h you receive the proposal with scope, timeline and fixed price. No surprises, no variable cost." },
        { name: "3. Visual design (UI)", text: "I create a Figma prototype with the homepage and key templates. Up to 2 revision rounds included." },
        { name: "4. Development and programming", text: "I build the site in Next.js with reusable components, technical SEO and Schema.org from the first commit." },
        { name: "5. Testing, QA and Lighthouse", text: "I verify on real devices, Lighthouse audit with Performance/Accessibility/SEO > 95 and structured data validation." },
        { name: "6. Deployment and handover", text: "I launch the site, connect the domain, Google Search Console, Analytics and hand you the code. It's yours." },
        { name: "7. Post-launch support", text: "One month of included support to resolve any question or minor adjustment. After that, optional maintenance plan." },
      ]
    : [
        { name: "1. Lehen kontaktua eta briefing-a", text: "Doako 30 minutuko deia antolatzen dugu zure negozioa, helburuak eta lehia ulertzeko. Aurretik briefing bat jasotzen duzu emailez." },
        { name: "2. Proposamena eta aurrekontu itxia", text: "48 ordu barru proposamena jasotzen duzu, irismena, epea eta prezio itxiarekin. Ustekaberik gabe." },
        { name: "3. Diseinu bisuala (UI)", text: "Figma prototipo bat sortzen dut home eta txantiloi garrantzitsuekin. 2 berrikuspen-txanda barne." },
        { name: "4. Garapena eta programazioa", text: "Weba Next.js-en muntatzen dut, osagai berrerabilgarriekin, SEO teknikoarekin eta Schema.org-ekin lehen commit-etik." },
        { name: "5. Probak, QA eta Lighthouse", text: "Benetako gailuetan egiaztatzen dut, Lighthouse audita Performance/Accessibility/SEO > 95, eta datu egituratuen balidazioa." },
        { name: "6. Hedapena eta entrega", text: "Weba abian jartzen dut, domeinua konektatzen dut, Google Search Console, Analytics eta kodea entregatzen dizut. Zurea da." },
        { name: "7. Abian jarri ondorengo laguntza", text: "Hilabeteko laguntza barne edozein zalantza edo doikuntza txiki konpontzeko." },
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
          "@type": "Offer",
          price: "1300",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          validFrom: "2026-01-01",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1300",
            priceCurrency: "EUR",
            valueAddedTaxIncluded: true,
          },
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
          value: "1300",
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
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="service-detail-card">
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
