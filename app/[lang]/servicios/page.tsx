import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { hreflangAlternates } from "@/lib/seo";

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

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `https://unaxaller.com/${locale}/servicios`,
      languages: hreflangAlternates("/servicios"),
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        provider: { "@id": "https://unaxaller.com/#business" },
        serviceType: "Diseño y Desarrollo Web",
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Servicios de Diseño Web" : locale === "en" ? "Web Design Services" : "Web Diseinu Zerbitzuak",
        },
      },
      {
        "@type": "FAQPage",
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
      <section
        className="pt-32 pb-20 md:pt-44 md:pb-28"
        style={{ backgroundColor: "#faf9f4" }}
        aria-label="Services hero"
      >
        <div className="container-xl">
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
              {tNav("servicios")}
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {t("title")}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services detail grid — 2 columns on desktop, always even */}
      <section
        className="pb-20 md:pb-28"
        style={{ backgroundColor: "#faf9f4" }}
        aria-label="Services list"
      >
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div
                  className="group p-8 rounded-2xl h-full"
                  style={{
                    backgroundColor: "#f5f4ef",
                    border: "1px solid #e3e3de",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: "#efeee9", color: "#4d6453" }}
                  >
                    {service.icon}
                  </div>

                  <h2
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {service.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {service.description}
                  </p>

                  <ul className="flex flex-col gap-2.5">
                    {service.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-3 text-sm"
                        style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "#4d6453" }}
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* FAQ */}
          <AnimatedSection className="mt-20">
            <h2
              className="text-2xl md:text-3xl font-light mb-10"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : "Galdera ohikoak"}
            </h2>
            <div className="flex flex-col divide-y" style={{ borderColor: "#e3e3de" }}>
              {faqItems.map((item, i) => (
                <details key={i} className="group py-5">
                  <summary
                    className="flex justify-between items-center cursor-pointer text-base font-medium list-none"
                    style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.q}
                    <svg
                      className="ml-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="text-center mt-16">
            <h2
              className="text-2xl md:text-3xl font-light mb-5"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es"
                ? "¿Listo para empezar?"
                : locale === "en"
                ? "Ready to get started?"
                : "Prest hasteko?"}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#061b0e",
                  color: "#ffffff",
                  fontFamily: "Manrope, sans-serif",
                  boxShadow: "0 4px 24px rgba(6, 27, 14, 0.2)",
                }}
              >
                {tHero("cta")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/precios`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: "1.5px solid #c3c8c1",
                  color: "#061b0e",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {tHero("cta2")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
