import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Servicios — Diseño y Desarrollo Web Premium | Unax Aller",
    en: "Services — Premium Web Design & Development | Unax Aller",
    eu: "Zerbitzuak — Web Diseinu eta Garapen Premium | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Descubre todos nuestros servicios: UI/UX design, performance web, SEO técnico, animaciones GSAP, desarrollo multi-idioma y más.",
    en: "Discover all our services: UI/UX design, web performance, technical SEO, GSAP animations, multi-language development and more.",
    eu: "Gure zerbitzu guztiak aurkitu: UI/UX diseinua, web performancea, SEO teknikoa, GSAP animazioak, hizkuntza anitzeko garapena eta gehiago.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/servicios` },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Unax Aller",
      url: "https://unaxaller.com",
    },
    serviceType: "Web Design and Development",
    areaServed: "Spain",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design Services",
    },
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
