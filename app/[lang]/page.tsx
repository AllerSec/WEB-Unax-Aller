import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { cityLandings } from "@/lib/data/city-landings";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import SocialProof from "@/components/home/SocialProof";
import Testimonials from "@/components/home/Testimonials";
import PricingCard from "@/components/ui/pricing-card";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const title = "Diseñador Web en Irun, País Vasco";
  const description =
    "Diseñador web freelance en Irun. Webs a medida desde 1.500€, entrega en 1–2 semanas. SEO técnico, Next.js, sin agencias. Hablas directamente conmigo.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}`,
      languages: hreflangAlternates(""),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "" }),
    twitter: buildTwitter({ title, description, locale, path: "" }),
    other: {
      "geo.region": "ES-PV",
      "geo.placename": "Irun, Gipuzkoa",
      "geo.position": "43.3390;-1.7892",
      ICBM: "43.3390, -1.7892",
    },
  };
}

function buildHomeJsonLd(locale: "es" | "en" | "eu") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://unaxaller.com/#website",
        url: "https://unaxaller.com",
        name: "Unax Aller",
        description:
          "Diseñador y desarrollador web freelance en Irun, País Vasco.",
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: ["es-ES", "en-GB", "eu-ES"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://unaxaller.com/${locale}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": "https://unaxaller.com/#person",
        name: "Unax Aller Fernández",
        givenName: "Unax",
        familyName: "Aller Fernández",
        jobTitle: "Diseñador y Desarrollador Web Freelance",
        url: `https://unaxaller.com/${locale}/sobre-nosotros`,
        image: "https://unaxaller.com/images/unax-square-no-bg.png",
        email: "contacto@unaxaller.com",
        telephone: "+34620909916",
        knowsLanguage: ["es", "eu", "en", "fr"],
        knowsAbout: [
          "Diseño web",
          "Desarrollo web",
          "Next.js",
          "React",
          "SEO técnico",
          "Core Web Vitals",
          "Accesibilidad web",
          "Diseño UI/UX",
        ],
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
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        legalName: "Unax Aller Fernández",
        url: "https://unaxaller.com",
        logo: {
          "@type": "ImageObject",
          url: "https://unaxaller.com/favicon.svg",
          width: 512,
          height: 512,
        },
        image: "https://unaxaller.com/images/unax-square-no-bg.png",
        description:
          "Diseñador web freelance en Irun, Gipuzkoa. Webs a medida para negocios del País Vasco: diseño premium, SEO, animaciones y rendimiento.",
        founder: { "@id": "https://unaxaller.com/#person" },
        knowsLanguage: ["es", "eu", "en", "fr"],
        inLanguage: ["es", "en", "eu"],
        currenciesAccepted: "EUR",
        paymentAccepted: "Bank transfer, Bizum",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Irun",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          postalCode: "20300",
          addressCountry: "ES",
        },
        geo: { "@type": "GeoCoordinates", latitude: 43.339, longitude: -1.7892 },
        priceRange: "€€",
        email: "contacto@unaxaller.com",
        telephone: "+34620909916",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        slogan: "Tu web a medida en 1–2 semanas desde 1.500€",
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "City", name: "Donostia-San Sebastián" },
          { "@type": "City", name: "Bilbao" },
          { "@type": "City", name: "Vitoria-Gasteiz" },
          { "@type": "City", name: "Pamplona" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
          { "@type": "AdministrativeArea", name: "Navarra" },
          { "@type": "Country", name: "España" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de Diseño y Desarrollo Web",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño Web" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo Web Next.js" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Técnico" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Multi-idioma" } },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://unaxaller.com/${locale}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera",
            item: `https://unaxaller.com/${locale}`,
          },
        ],
      },
    ],
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  return (
    <>
      {/* JSON-LD — static server-generated data, no user input */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd(locale)) }}
      />

      {/* ── 1. HERO con shader animado ── */}
      <AnimatedShaderHero
        trustBadge={{
          text: "Disponible para nuevos proyectos · Entrega en 1–2 semanas",
          icons: ["⚡"],
        }}
        headline={{
          line1: "Tu web a medida",
          line2: "desde 1.500€",
        }}
        subtitle="Diseño y desarrollo web en Next.js para negocios del País Vasco. Hablas directamente conmigo, sin agencias. SEO técnico incluido."
        buttons={{
          primary: { text: "Pedir presupuesto gratis", href: `/${locale}/contacto` },
          secondary: { text: "Ver precios", href: `/${locale}/precios` },
        }}
      />

      {/* ── 2. MÉTRICAS — confianza instantánea ── */}
      <SocialProof />

      {/* ── 3. PROBLEMA — agitar el dolor ── */}
      <AnimatedSection>
        <section className="lp-pain" aria-labelledby="lp-pain-title">
          <div className="container-xl lp-pain-inner">
            <div className="lp-pain-text">
              <span className="lp-eyebrow">El problema</span>
              <h2 id="lp-pain-title" className="lp-section-title">
                Las agencias cobran{" "}
                <span style={{ color: "#f87171" }}>5.000€</span> y tardan{" "}
                <span style={{ color: "#f87171" }}>3 meses</span>.
                <br />
                Los constructores online no son tuyos.
              </h2>
              <p className="lp-body">
                Tu negocio necesita una web que convierta visitantes en clientes, no
                una plantilla de Wix o una factura de agencia que te deja sin presupuesto.
                Mereces diseño a mano, SEO real y alguien que responda al WhatsApp.
              </p>
            </div>
            <div className="lp-pain-comparison">
              {[
                { bad: true, who: "Agencia", detail: "5.000–20.000€ · 6–12 semanas · plantillas disfrazadas" },
                { bad: true, who: "Wix / Squarespace", detail: "No es tuya · lenta · sin SEO real · pagas siempre" },
                { bad: true, who: "Freelancer barato", detail: "Plantilla WordPress · sin SEO · desaparece al mes" },
                { bad: false, who: "Unax Aller", detail: "1.500€ · 1–2 semanas · código a mano · tuya para siempre" },
              ].map((row) => (
                <div
                  key={row.who}
                  className={`lp-pain-row${row.bad ? " lp-pain-row--bad" : " lp-pain-row--good"}`}
                >
                  <span className={`lp-pain-icon${row.bad ? "" : " lp-pain-icon--good"}`}>
                    {row.bad ? "✗" : "✓"}
                  </span>
                  <div>
                    <strong>{row.who}</strong>
                    <span>{row.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 4. FUNDADOR — cara visible, humaniza la propuesta ── */}
      <AnimatedSection>
        <section className="lp-founder" aria-labelledby="lp-founder-title">
          <div className="container-xl lp-founder-inner">
            <div className="lp-founder-photo">
              <Image
                src="/images/unax-square-no-bg.png"
                alt="Unax Aller, diseñador web freelance en Irun"
                width={400}
                height={400}
                sizes="(max-width: 768px) 180px, 260px"
              />
            </div>
            <div className="lp-founder-content">
              <span className="lp-eyebrow">Quién está detrás</span>
              <h2 id="lp-founder-title" className="lp-founder-title">
                Hola, soy Unax.
              </h2>
              <p className="lp-body">
                Diseño y programo cada web a mano desde Irun. Hablas conmigo de principio
                a fin — sin gestor de cuentas, sin intermediarios, sin sorpresas en la
                factura. Llevo 4 idiomas (español, euskera, inglés, francés) y me obsesiono
                con que tu cliente sienta algo cuando entre en la web.
              </p>
              <ul className="lp-founder-facts">
                <li>📍 Irun, Gipuzkoa</li>
                <li>🎓 Ingeniería Informática — UAX</li>
                <li>🌍 4 idiomas: ES · EU · EN · FR</li>
                <li>⭐ 5 estrellas en Google · 14+ proyectos</li>
              </ul>
              <Link href={`/${locale}/sobre-nosotros`} className="lp-link">
                Conóceme mejor
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 5. PROCESO — 7 pasos, reduce ansiedad ── */}
      <section className="lp-process" aria-labelledby="lp-process-title">
        <div className="container-xl">
          <AnimatedSection>
            <div className="lp-section-header">
              <span className="lp-eyebrow">Cómo funciona</span>
              <h2 id="lp-process-title" className="lp-section-title lp-section-title--center">
                De cero a web en 1–2 semanas
              </h2>
              <p className="lp-body lp-body--center">
                Sin reuniones infinitas. Sin sorpresas. Cada paso lo ves venir.
              </p>
            </div>
          </AnimatedSection>
          <div className="lp-steps">
            {([
              { n: "01", title: "Hablamos 30 min", desc: "Me cuentas tu negocio, a quién quieres atraer y qué imagen quieres dar. Por WhatsApp, llamada o café." },
              { n: "02", title: "Presupuesto cerrado", desc: "En 24–48h recibes un presupuesto fijo. 1.500€ base. Sin letra pequeña, sin costes sorpresa." },
              { n: "03", title: "Diseño visual", desc: "Fuente, paleta, estructura. Te enseño avances e iteramos hasta que queda perfecto para tu marca." },
              { n: "04", title: "Desarrollo Next.js", desc: "Código a mano con las herramientas más actuales. SEO técnico, multi-idioma si lo necesitas, carga en menos de 1s." },
              { n: "05", title: "Pruebas reales", desc: "Lighthouse 95+ en Performance, Accessibility y SEO. Pruebo en dispositivos móviles reales." },
              { n: "06", title: "Lanzamiento", desc: "Subimos la web, configuramos dominio, Google Search Console y Analytics. Te enseño el panel." },
              { n: "07", title: "Mantenimiento", desc: "100€ el primer año (hosting + dominio + soporte). 200€/año a partir del segundo. Cambios menores incluidos." },
            ] as { n: string; title: string; desc: string }[]).map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="lp-step">
                  <span className="lp-step-number" aria-hidden="true">{step.n}</span>
                  <div className="lp-step-content">
                    <h3 className="lp-step-title">{step.title}</h3>
                    <p className="lp-step-desc">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SERVICIOS ── */}
      <section className="lp-services" aria-labelledby="lp-services-title">
        <div className="container-xl">
          <AnimatedSection>
            <div className="lp-section-header">
              <span className="lp-eyebrow">Qué hago</span>
              <h2 id="lp-services-title" className="lp-section-title lp-section-title--center">
                Webs que hacen crecer negocios reales
              </h2>
            </div>
          </AnimatedSection>
          <div className="lp-services-grid">
            {([
              {
                emoji: "🏪",
                title: "Negocio local",
                desc: "Peluquería, taller, restaurante, clínica. Una web que aparece en Google Maps y da imagen profesional.",
                tags: ["SEO local", "Google Maps", "Móvil-first"],
              },
              {
                emoji: "🏥",
                title: "Clínica o consulta",
                desc: "Dental, fisio, estética. Identidad visual de confianza, política de privacidad y sistema de citas opcional.",
                tags: ["RGPD", "Citas online", "Confianza"],
              },
              {
                emoji: "🌍",
                title: "Multi-idioma",
                desc: "Empresa exportadora o turismo. Hasta 4 idiomas reales (ES/EU/EN/FR) con hreflang correcto.",
                tags: ["4 idiomas", "hreflang", "SEO global"],
              },
              {
                emoji: "🔄",
                title: "Rediseño",
                desc: "Tu web da vergüenza o va lenta. Auditoría, migración limpia y nueva web sin perder posicionamiento.",
                tags: ["Auditoría", "Migración", "Sin perder SEO"],
              },
            ] as { emoji: string; title: string; desc: string; tags: string[] }[]).map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="lp-service-card">
                  <span className="lp-service-emoji">{s.emoji}</span>
                  <h3 className="lp-service-title">{s.title}</h3>
                  <p className="lp-service-desc">{s.desc}</p>
                  <div className="lp-service-tags">
                    {s.tags.map((tag) => (
                      <span key={tag} className="lp-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="lp-services-cta">
            <Link href={`/${locale}/servicios`} className="lp-link">
              Ver todos los servicios
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 7. PROYECTOS — carrusel móvil con capturas reales ── */}
      <AnimatedSection>
        <Gallery4
          locale={locale}
          title="Proyectos realizados"
          description="Webs reales para negocios del País Vasco y Navarra. Diseño a medida, SEO incluido, entrega en 1–2 semanas."
          items={[
            {
              id: "farmacia-fernandez-bera",
              title: "Farmacia Fernández Bera",
              description: "Web clara e intuitiva para una farmacia de pueblo. SEO local optimizado para Bera y comarca.",
              href: `/${locale}/proyectos/farmacia-fernandez-bera`,
              externalUrl: "https://farmaciafernandezbera.com",
              mobileImage: "/images/projects/mobile-farmacia-fernandez-bera.jpg",
              accent: "#c79a3a",
              meta: "Farmacia · Bera, Navarra · 2025",
            },
            {
              id: "motos-arretxe",
              title: "Motos Arretxe",
              description: "Concesionario y taller de motos en Hondarribia. Catálogo, cita previa y SEO local.",
              href: `/${locale}/proyectos/motos-arretxe`,
              externalUrl: "https://motosarretxe.com",
              mobileImage: "/images/projects/mobile-motos-arretxe.jpg",
              accent: "#dc2626",
              meta: "Motos · Hondarribia · 2025",
            },
            {
              id: "anaka-optica",
              title: "Anaka Óptica",
              description: "Web editorial para una óptica con personalidad. Galería de monturas y cita online.",
              href: `/${locale}/proyectos/anaka-optica`,
              externalUrl: "https://anakaoptica.com",
              mobileImage: "/images/projects/mobile-anaka-optica.jpg",
              accent: "#f97316",
              meta: "Óptica · Irun · 2025",
            },
            {
              id: "virtuosolve",
              title: "VirtuoSolve",
              description: "Agencia de IA con web orientada a captación B2B. Micro-animaciones y SEO técnico.",
              href: `/${locale}/proyectos/virtuosolve`,
              externalUrl: "https://virtuosolve.com",
              mobileImage: "/images/projects/mobile-virtuosolve.jpg",
              accent: "#3b82f6",
              meta: "IA · Irun · 2025",
            },
          ] satisfies Gallery4Item[]}
        />
      </AnimatedSection>

      {/* ── 8. PRECIOS ── */}
      <section id="precios" aria-label="Precios">
        <div className="container-xl">
          <AnimatedSection>
            <div className="lp-section-header">
              <span className="lp-eyebrow">Precio transparente</span>
            </div>
          </AnimatedSection>
        </div>
        <PricingCard locale={locale} headingLevel="h2" />
      </section>

      {/* ── 9. TESTIMONIOS ── */}
      <Testimonials />

      {/* ── 10. FAQ — eliminar objeciones ── */}
      <section className="lp-faq" aria-labelledby="lp-faq-title">
        <div className="container-xl lp-faq-inner">
          <AnimatedSection>
            <div className="lp-section-header">
              <span className="lp-eyebrow">Tus dudas</span>
              <h2 id="lp-faq-title" className="lp-section-title lp-section-title--center">
                Preguntas frecuentes
              </h2>
            </div>
          </AnimatedSection>
          <div className="lp-faq-grid">
            {([
              {
                q: "¿Por qué 1.500€ si hay freelancers más baratos?",
                a: "Porque con menos no puedo hacer un trabajo de calidad real: diseño personalizado, código a mano, SEO técnico y entrega rápida. Los que cobran 400€ usan plantillas WordPress sin configurar. Tú recibes una web tuya para siempre.",
              },
              {
                q: "¿Cuánto tarda realmente?",
                a: "Si no tengo otros proyectos activos, entre 1 y 2 semanas. Te digo el plazo real desde el primer día — no acepto proyectos que no puedo entregar a tiempo.",
              },
              {
                q: "¿Eres solo un estudiante?",
                a: "Sí, estudio Ingeniería Informática en la UAX y llevo 14+ proyectos reales entregados, 5 estrellas en Google y código en producción. Eso me motiva más que una agencia que ya tiene su factura asegurada.",
              },
              {
                q: "¿La web es mía o me tienes atado?",
                a: "Tuya para siempre. Te entrego el código completo, dominio a tu nombre y hosting en cualquier proveedor. No hay ninguna dependencia conmigo si no la quieres.",
              },
              {
                q: "¿Puedo tener la web en euskera o inglés?",
                a: "Sí, hasta 4 idiomas (ES/EU/EN/FR) sin coste adicional. Estudié en Francia hasta los 15, así que el francés lo trabajo igual de fino que el resto.",
              },
              {
                q: "¿Cómo sé que va a quedar bien?",
                a: "Te enseño avances durante el proceso y tienes 2 rondas de revisión sin coste. No lanzamos nada hasta que estés satisfecho.",
              },
            ] as { q: string; a: string }[]).map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <details className="lp-faq-item">
                  <summary className="lp-faq-summary">
                    {item.q}
                    <svg
                      className="lp-faq-caret"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="lp-faq-answer">{item.a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CTA FINAL — máxima urgencia, mínima fricción ── */}
      <AnimatedSection>
        <section className="lp-cta-final" aria-label="Contacto final" id="contacto">
          <div className="container-xl lp-cta-final-inner">
            <div className="lp-cta-final-badge">
              <span aria-hidden="true">⚡</span> Disponible para nuevos proyectos
            </div>
            <h2 className="lp-cta-final-title">
              ¿Hablamos esta semana?
            </h2>
            <p className="lp-cta-final-sub">
              Cuéntame tu proyecto en 2 minutos. Te respondo con un presupuesto
              cerrado en menos de 48h, sin compromiso.
            </p>
            <div className="lp-cta-final-actions">
              <Link href={`/${locale}/contacto`} className="lp-cta-final-btn-primary">
                Pedir presupuesto gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/34620909916?text=Hola%20Unax%2C%20me%20interesa%20una%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="lp-cta-final-btn-whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp directo
              </a>
            </div>
            <p className="lp-cta-final-reassurance">
              Sin compromiso · Respuesta en menos de 48h · Precio cerrado desde el inicio
            </p>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
