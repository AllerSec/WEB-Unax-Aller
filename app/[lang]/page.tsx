import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { cityLandings } from "@/lib/data/city-landings";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import SocialProof from "@/components/home/SocialProof";
import PainSection from "@/components/home/PainSection";
import Testimonials from "@/components/home/Testimonials";
import PricingCard from "@/components/ui/pricing-card";
import AnimatedSection from "@/components/shared/AnimatedSection";
import GuaranteeBlock from "@/components/shared/GuaranteeBlock";
import GoogleMapsMock from "@/components/shared/GoogleMapsMock";
import PhoneMockup from "@/components/shared/PhoneMockup";
import LiveCallCounter from "@/components/shared/LiveCallCounter";
import SectorMarquee from "@/components/shared/SectorMarquee";
import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const title = "Web para negocio local · 149€/mes, 0€ inicial · Unax Aller";
  const description =
    "Renting Web para negocios de Gipuzkoa, Bizkaia y Navarra: 149€/mes con todo incluido (web, Google Maps, reseñas, hosting, soporte WhatsApp). 0€ al firmar y 30 días de garantía. Pensado para clínicas, despachos, industria B2B y comercio profesional.";
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
          "Renting Web para negocios locales de Gipuzkoa, Bizkaia y Navarra. Cuota mensual todo incluido, sin pago inicial.",
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: ["es-ES", "en-GB", "eu-ES"],
        // SearchAction removed: the blog index doesn't accept ?q= queries,
        // and Googlebot was indexing the template URL as an alternate page
        // (GSC: "Alternate page with proper canonical tag"). Reintroduce only
        // when there is a real /buscar endpoint backing the query.
      },
      {
        "@type": "Person",
        "@id": "https://unaxaller.com/#person",
        name: "Unax Aller Fernández",
        givenName: "Unax",
        familyName: "Aller Fernández",
        jobTitle: "Renting Web para negocios locales",
        url: `https://unaxaller.com/${locale}/sobre-nosotros`,
        image: "https://unaxaller.com/images/founder-unax.webp",
        email: "contacto@unaxaller.com",
        telephone: "+34620909916",
        knowsLanguage: ["es", "eu", "en", "fr"],
        knowsAbout: [
          "Diseño web para negocio local",
          "Google Business Profile",
          "Google Maps optimización",
          "SEO local",
          "Captación de reseñas",
          "Webs para pymes",
          "Renting Web",
          "WhatsApp Business",
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
        name: "Unax Aller — Renting Web para negocios locales",
        legalName: "Unax Aller Fernández",
        url: "https://unaxaller.com",
        logo: {
          "@type": "ImageObject",
          url: "https://unaxaller.com/favicon.svg",
          width: 512,
          height: 512,
        },
        image: "https://unaxaller.com/images/founder-unax.webp",
        description:
          "Renting Web para negocios locales de Gipuzkoa, Bizkaia y Navarra: 149€/mes con todo incluido (diseño, hosting, dominio, Google Maps, reseñas, soporte WhatsApp). 0€ al firmar.",
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
        slogan: "Más llamadas para tu negocio local · 149€/mes, 0€ inicial",
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
          name: "Renting Web para negocio local",
          itemListElement: [
            { "@type": "Offer", priceCurrency: "EUR", price: "149", itemOffered: { "@type": "Service", name: "Renting Web — cuota mensual todo incluido" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Optimización de Google Business Profile" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sistema de captación de reseñas" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO local para Gipuzkoa" } },
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
          text: "0€ al firmar · 30 días de garantía · 149€/mes durante 12 meses",
          icons: ["✓"],
        }}
        headline={{
          line1: "Más llamadas para",
          line2: "tu negocio local",
        }}
        subtitle="Tu web profesional, tu ficha de Google Maps y un sistema de reseñas — todo incluido por 149€ al mes. No pagas nada al firmar. 30 días para probarlo y devolverlo sin preguntas. Pensado para clínicas, despachos profesionales, industria B2B y comercio especializado en Gipuzkoa, Bizkaia y Navarra."
        buttons={{
          primary: { text: "Pedir auditoría gratis", href: `/${locale}/contacto` },
          secondary: { text: "Ver cómo funciona", href: `/${locale}/precios` },
        }}
      />

      {/* ── 2. MÉTRICAS — confianza instantánea ── */}
      <SocialProof />

      {/* ── 3. PROBLEMA — agitar el dolor ── */}
      <PainSection />

      {/* ── 3b. VISUAL DE GOOGLE MAPS + MÓVIL — el bombazo visual del modelo ── */}
      <AnimatedSection>
        <section className="lp-mockups" aria-label="Cómo se ve el resultado">
          <div className="container-xl">
            <div className="lp-mockups-grid">
              <div className="lp-mockups-text">
                <span className="lp-eyebrow">Cómo se ve el resultado</span>
                <h2 className="lp-section-title">
                  Tu negocio, <span style={{ color: "var(--color-accent)" }}>el primero</span> cuando alguien busca tu servicio en tu ciudad.
                </h2>
                <p className="lp-body">
                  Cuando un paciente busca «dentista en tu ciudad» desde el móvil,
                  Google le enseña tres resultados con foto, valoración y botón
                  de llamada directa. El que sale primero recibe la llamada;
                  los otros dos esperan al siguiente intento.
                </p>
                <ul className="lp-mockups-list">
                  <li><span aria-hidden="true">✓</span> Ficha de Google Business Profile bien configurada</li>
                  <li><span aria-hidden="true">✓</span> Web rápida, móvil-first, con botón de llamada visible</li>
                  <li><span aria-hidden="true">✓</span> Sistema de reseñas activo para mantenerte arriba</li>
                </ul>
              </div>
              <div className="lp-mockups-visuals">
                <div className="lp-mockups-maps">
                  <GoogleMapsMock locale={locale} />
                </div>
                <div className="lp-mockups-phone">
                  <PhoneMockup locale={locale} variant="maps" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 3c. SECTORES — marquee con quiénes son mis clientes ── */}
      <SectorMarquee locale={locale} />

      {/* ── 4. FUNDADOR — cara visible, humaniza la propuesta ── */}
      <AnimatedSection>
        <section className="lp-founder" aria-labelledby="lp-founder-title">
          <div className="container-xl lp-founder-inner">
            <div className="lp-founder-photo">
              <Image
                src="/images/founder-unax.webp"
                alt="Unax Aller, especialista en webs para negocio local en País Vasco y Navarra"
                width={400}
                height={400}
                sizes="(max-width: 768px) 260px, 400px"
              />
            </div>
            <div className="lp-founder-content">
              <span className="lp-eyebrow">Quién está detrás</span>
              <h2 id="lp-founder-title" className="lp-founder-title">
                Hola, soy Unax.
              </h2>
              <p className="lp-body">
                Trabajo desde Irun para negocios del País Vasco y Navarra: clínicas,
                despachos profesionales, pequeña industria y comercio con ticket alto.
                Cuando llamas, me coges directamente al teléfono. Cuando necesitas un cambio,
                me escribes al WhatsApp. Por eso puedo permitirme firmar contigo
                <strong> sin pedirte ni un euro al empezar y dándote 30 días para devolver</strong>:
                porque me juego mi nombre con cada negocio que entra.
              </p>
              <ul className="lp-founder-facts">
                <li>
                  <svg className="lp-fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Irun, Gipuzkoa</span>
                </li>
                <li>
                  <svg className="lp-fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp directo: 620 90 99 16</span>
                </li>
                <li>
                  <svg className="lp-fact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                  </svg>
                  <span>ES · EU · EN · FR</span>
                </li>
                <li>
                  <svg className="lp-fact-icon lp-fact-icon--star" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>5 estrellas en Google · 14+ negocios atendidos</span>
                </li>
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

      {/* ── 4b. COUNTERS — resultados medibles del primer trimestre ── */}
      <AnimatedSection>
        <section className="lp-counters" aria-label="Resultados medibles">
          <div className="container-xl">
            <LiveCallCounter locale={locale} />
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
                De cero a más llamadas en 7–10 días
              </h2>
              <p className="lp-body lp-body--center">
                Sin papeleo inicial. Sin reuniones infinitas. Pago la primera cuota y empezamos.
              </p>
            </div>
          </AnimatedSection>
          <div className="lp-steps">
            {([
              { n: "01", title: "Miro tu zona contigo", desc: "Antes de nada te enseño qué competidores tuyos están saliendo primero en Google Maps en tu zona y por qué. Es gratis y no tienes que firmar nada." },
              { n: "02", title: "Hablamos 30 minutos", desc: "Por teléfono o por videollamada. Me cuentas tu negocio, de dónde te llegan ahora los clientes y a quién quieres atraer." },
              { n: "03", title: "Si encaja, lo cerramos", desc: "Contrato simple a 12 meses con 30 días de garantía. 0€ al firmar. La primera cuota no se pasa hasta que tu web esté publicada." },
              { n: "04", title: "Te enseño el diseño", desc: "Logo, colores y cómo se va a ver la web. Te paso los avances por WhatsApp y vamos ajustando hasta que te guste." },
              { n: "05", title: "Monto la web", desc: "Programo todo desde cero, sin plantillas. Va rápida en el móvil, te dejo lista la ficha de Google Maps y un sistema para pedir reseñas a tus clientes." },
              { n: "06", title: "La ponemos en marcha", desc: "Entre 7 y 10 días desde que cerramos. Subimos la web, configuramos dominio, Google Search Console y Analytics, y te enseño cómo va el tráfico las primeras semanas." },
              { n: "07", title: "Después, tú me escribes", desc: "Cambios de texto, fotos, precios, horarios o añadir un servicio… me mandas un WhatsApp y lo hago yo. Sin formularios ni tickets." },
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
              <span className="lp-eyebrow">Para quién</span>
              <h2 id="lp-services-title" className="lp-section-title lp-section-title--center">
                Pensado para negocios profesionales del País Vasco y Navarra
              </h2>
            </div>
          </AnimatedSection>
          <div className="lp-services-grid">
            {([
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5.5c-1.5-1-3-1.5-4.5-1.5C5 4 3 6 3 9c0 2 .5 3.5 1.5 6 .8 2 1.2 4.5 2.5 4.5 1.2 0 1.5-1.5 2-3 .3-1 .8-1.5 2-1.5h2c1.2 0 1.7.5 2 1.5.5 1.5.8 3 2 3 1.3 0 1.7-2.5 2.5-4.5 1-2.5 1.5-4 1.5-6 0-3-2-5-4.5-5-1.5 0-3 .5-4.5 1.5Z" />
                  </svg>
                ),
                title: "Clínicas dentales, fisio, estética",
                desc: "Pacientes que comparan 3 clínicas antes de pedir cita. Tu web tiene que generar confianza: fotos reales del equipo, reseñas visibles, información clara de servicios y cita previa fácil.",
                tags: ["Reseñas", "Confianza", "Cita previa"],
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                ),
                title: "Asesorías y despachos profesionales",
                desc: "Abogados, gestorías, consultorías, ingenierías. Servicios con ticket alto donde el cliente compara online antes de levantar el teléfono. Web seria, áreas de práctica claras y formulario cualificado.",
                tags: ["Confianza", "Áreas", "Leads"],
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                    <path d="M17 18h1" />
                    <path d="M12 18h1" />
                    <path d="M7 18h1" />
                  </svg>
                ),
                title: "Industria y servicios técnicos B2B",
                desc: "Pequeñas industrias y proveedores B2B de los polígonos del País Vasco y Navarra. Quien decide la compra compara catálogos por la noche desde el móvil. Web seria, capacidades técnicas claras y cotización rápida.",
                tags: ["Catálogo", "Capacidades", "Cotización"],
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-4" />
                    <path d="M9 9v.01" />
                    <path d="M9 12v.01" />
                    <path d="M9 15v.01" />
                    <path d="M9 18v.01" />
                  </svg>
                ),
                title: "Inmobiliarias premium",
                desc: "Inmobiliarias de obra nueva, vivienda de alto standing y locales comerciales en País Vasco y Navarra. Operaciones de ticket alto donde la marca, las fotos profesionales y un buscador de propiedades rápido marcan la diferencia entre llamar a tu oficina o a la del vecino.",
                tags: ["Marca", "Listings", "Leads"],
              },
            ] as { icon: React.ReactNode; title: string; desc: string; tags: string[] }[]).map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="lp-service-card">
                  <span className="lp-service-icon">{s.icon}</span>
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
          title="Negocios reales que ya tienen su web"
          description="Farmacia en Bera, taller de motos en Irun, óptica en Irun, agencia en Donostia. Negocios que llaman, escriben y atienden mejor desde que tienen su sistema online montado."
          items={[
            {
              id: "farmacia-fernandez-bera",
              title: "Farmacia Fernández Bera",
              description: "Web clara e intuitiva para una farmacia de pueblo. SEO local optimizado para Bera y comarca.",
              href: `/${locale}/proyectos/farmacia-fernandez-bera`,
              externalUrl: "https://farmaciafernandezbera.com",
              mobileImage: "/images/projects/mobile-farmacia-fernandez-bera.jpg",
              accent: "#c79a3a",
              meta: "Farmacia · Bera, Navarra · 2026",
            },
            {
              id: "motos-arretxe",
              title: "Motos Arretxe",
              description: "Concesionario y taller de motos en Irun. Catálogo, cita previa y SEO local.",
              href: `/${locale}/proyectos/motos-arretxe`,
              externalUrl: "https://motosarretxe.com",
              mobileImage: "/images/projects/mobile-motos-arretxe.jpg",
              mobileVideo: "/video/motos-arretxe.mp4",
              accent: "#dc2626",
              meta: "Motos · Irun · 2026",
            },
            {
              id: "anaka-optica",
              title: "Anaka Óptica",
              description: "Web editorial para una óptica con personalidad. Galería de monturas y cita online.",
              href: `/${locale}/proyectos/anaka-optica`,
              externalUrl: "https://anakaoptica.com",
              mobileImage: "/images/projects/mobile-anaka-optica.jpg",
              accent: "#f97316",
              meta: "Óptica · Irun · 2026",
            },
            {
              id: "virtuosolve",
              title: "VirtuoSolve",
              description: "Agencia de IA con web orientada a captación B2B. Micro-animaciones y SEO técnico.",
              href: `/${locale}/proyectos/virtuosolve`,
              externalUrl: "https://virtuosolve.com",
              mobileImage: "/images/projects/mobile-virtuosolve.jpg",
              mobileVideo: "/video/virtuosolve.mp4",
              accent: "#3b82f6",
              meta: "IA · Irun · 2026",
            },
            {
              id: "tecmac",
              title: "Tecmac",
              description: "Ingeniería y servicios auxiliares de laminación para industrias siderúrgicas. Web técnica con más de 30 años de trayectoria.",
              href: `/${locale}/proyectos/tecmac`,
              externalUrl: "https://tecmac.es",
              mobileImage: "/images/projects/mobile-tecmac.jpg",
              mobileVideo: "/video/tecmac.mp4",
              accent: "#ef4444",
              meta: "Industrial · Navarra · 2026",
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

      {/* ── 8b. GARANTÍA ROTUNDA — repetir el mantra ── */}
      <GuaranteeBlock locale={locale} />

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
                q: "¿Por qué Renting Web y no pagar la web de una vez?",
                a: "Porque la mayoría de negocios locales no se pueden permitir 2.000€ de golpe, pero sí pagan 149€/mes sin problema. Es una cuota fija como la del gestor, el seguro o el teléfono. Y la web empieza a traer llamadas desde el primer día.",
              },
              {
                q: "¿De verdad no pago nada al firmar?",
                a: "Sí. 0€ al firmar. La primera cuota de 149€ se cobra cuando la web está lista, entre 7 y 10 días después. Si en los primeros 30 días no estás conforme, te devuelvo lo pagado y aquí no ha pasado nada.",
              },
              {
                q: "¿Qué pasa al terminar los 12 meses?",
                a: "Sigues mes a mes sin permanencia. La cuota queda bloqueada durante los 12 meses contratados; si después subo precios para nuevos clientes, a ti no te afecta. Si quieres irte, solo avisar: el dominio te lo llevas a tu nombre y la ficha de Google Maps con tus reseñas también es tuya. Lo que se apaga es la web, porque va sobre mi sistema — como el software del taller o tu tarifa de móvil: pagas cuota, tienes servicio.",
              },
              {
                q: "¿Necesito saber algo de internet?",
                a: "Nada. Tú me cuentas qué haces, a quién quieres atraer y cómo. Yo me encargo del resto: dominio, hosting, Google Maps, reseñas. Cuando necesites un cambio, me escribes al WhatsApp.",
              },
              {
                q: "¿Funciona si mi sector es muy local (un pueblo pequeño)?",
                a: "Sí, y de hecho funciona mejor. En pueblos y comarcas pequeñas la competencia digital es muy floja: con una ficha de Google bien optimizada y unas pocas reseñas ya sales el primero.",
              },
              {
                q: "¿Cómo sé que de verdad va a traer clientes?",
                a: "Antes de firmar te hago una auditoría gratis: te enseño qué competidores tuyos están saliendo primero en tu zona, por qué, y cuántas llamadas estiman que reciben. Con datos, no con palabrería.",
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
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
              </svg>
              Auditoría gratis · Sin firmar nada
            </div>
            <h2 className="lp-cta-final-title">
              ¿Cuántas llamadas estás perdiendo?
            </h2>
            <p className="lp-cta-final-sub">
              Te enseño en 30 minutos qué competidores tuyos en tu pueblo o ciudad
              están saliendo primero en Google y por qué. Sin compromiso, sin firmar
              nada — y si quieres después arrancamos con 0€ al firmar.
            </p>
            <div className="lp-cta-final-actions">
              <Link href={`/${locale}/contacto`} className="lp-cta-final-btn-primary">
                Pedir auditoría gratis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/34620909916?text=Hola%20Unax%2C%20me%20interesa%20el%20Renting%20Web%20de%20149%E2%82%AC%2Fmes%20para%20mi%20negocio"
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
              0€ al firmar · 30 días de garantía · 12 meses con cuota bloqueada · Hablas siempre conmigo
            </p>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
