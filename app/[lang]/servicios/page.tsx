import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

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

const VALID_FROM = new Date().toISOString().slice(0, 10);
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

export default async function ServiciosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale, namespace: "services" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  const services: Service[] = [
    {
      id: "local-business",
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
        { name: "2. Presupuesto cerrado", text: "Te paso un presupuesto cerrado en 24-48h. 1.500€ base, hasta unos 2.000€ si necesitas algo más complejo. Sin sorpresas." },
        { name: "3. Diseño", text: "Pienso primero en qué va a sentir tu cliente al entrar en la web. Fuente, paleta, microanimaciones. Te enseño avances e iteramos hasta que cuadra." },
        { name: "4. Desarrollo", text: "Programo la web a mano con las herramientas más actuales. SEO técnico, multi-idioma si lo necesitas, y que fluya bien en cualquier dispositivo." },
        { name: "5. Pruebas", text: "Compruebo en dispositivos reales, auditoría Lighthouse con Performance/Accessibility/SEO por encima de 95 y validación de datos estructurados." },
        { name: "6. Lanzamiento", text: "Subimos la web, configuramos dominio, Google Search Console y Analytics. Te enseño cómo va el tráfico las primeras semanas." },
        { name: "7. Mantenimiento", text: "Si quieres que me siga encargando, son 200€ al año e incluye hosting, dominio, cambios menores y soporte." },
      ]
    : locale === "en"
    ? [
        { name: "1. We talk", text: "A 30-minute call or coffee. You tell me what you need, who you want to attract and the image you want to give. I ask a lot." },
        { name: "2. Fixed quote", text: "I send a fixed quote in 24-48h. €1,500 base, up to around €2,000 if you need something more complex. No surprises." },
        { name: "3. Design", text: "I think first about what your client will feel when they land on the site. Font, palette, microanimations. I show you progress and we iterate until it fits." },
        { name: "4. Development", text: "I code the site by hand with today's tools. Technical SEO, multi-language if you need it, and that it flows on any device." },
        { name: "5. Testing", text: "I check on real devices, Lighthouse audit with Performance/Accessibility/SEO above 95 and structured data validation." },
        { name: "6. Launch", text: "We push the site, set up the domain, Google Search Console and Analytics. I show you how the traffic looks the first weeks." },
        { name: "7. Maintenance", text: "If you want me to keep handling it, it's €200 per year and covers hosting, domain, minor changes and support." },
      ]
    : [
        { name: "1. Hitz egiten dugu", text: "30 minutuko deia edo kafea. Zer behar duzun, nor erakarri nahi duzun eta zer irudi eman nahi duzun esaten didazu." },
        { name: "2. Aurrekontu itxia", text: "24-48 ordutan aurrekontu itxia bidaltzen dizut. 1.500€ oinarrian, 2.000€ ingurura konplexuagoa bada. Ezustekorik gabe." },
        { name: "3. Diseinua", text: "Lehenik eta behin, zure bezeroak webgunera sartzean zer sentituko duen pentsatzen dut. Letra-tipoa, paleta, mikroanimazioak." },
        { name: "4. Garapena", text: "Webgunea eskuz programatzen dut gaurko tresnekin. SEO teknikoa, eleaniztasuna behar baduzu." },
        { name: "5. Probak", text: "Benetako gailuetan egiaztatzen dut, Lighthouse audita 95 baino gehiagorekin." },
        { name: "6. Abiaraztea", text: "Webgunea igotzen dugu, domeinua, Google Search Console eta Analytics konfiguratzen ditugu." },
        { name: "7. Mantentze-lana", text: "Nik jarraitzea nahi baduzu, urtean 200€ da eta hosting-a, domeinua, aldaketa txikiak eta laguntza barne ditu." },
      ];

  const comparisonRows = locale === "es"
    ? [
        { feature: "Precio", agency: "5.000€ – 20.000€", unax: "1.500€" },
        { feature: "Tiempo de entrega", agency: "2 – 6 meses", unax: "1 – 2 semanas" },
        { feature: "Interlocutor", agency: "Varios departamentos", unax: "Solo yo" },
        { feature: "Equipo dedicado", agency: "3–5 especialistas", unax: "Solo yo", agencyWins: true },
        { feature: "Código propietario", agency: "A veces no", unax: "Siempre tuyo" },
        { feature: "SEO técnico real", agency: "Depende", unax: "Incluido" },
        { feature: "Lighthouse 95+", agency: "Raro", unax: "Garantizado" },
        { feature: "Cambios post-lanzamiento", agency: "De pago", unax: "1 mes gratis" },
      ]
    : locale === "en"
    ? [
        { feature: "Price", agency: "€5,000 – €20,000", unax: "€1,500" },
        { feature: "Delivery time", agency: "2 – 6 months", unax: "1 – 2 weeks" },
        { feature: "Point of contact", agency: "Multiple departments", unax: "Just me" },
        { feature: "Dedicated team", agency: "3–5 specialists", unax: "Just me", agencyWins: true },
        { feature: "Your code", agency: "Sometimes not", unax: "Always yours" },
        { feature: "Real technical SEO", agency: "Depends", unax: "Included" },
        { feature: "Lighthouse 95+", agency: "Rare", unax: "Guaranteed" },
        { feature: "Post-launch changes", agency: "Paid", unax: "1 month free" },
      ]
    : [
        { feature: "Prezioa", agency: "5.000€ – 20.000€", unax: "1.500€" },
        { feature: "Entrega denbora", agency: "2 – 6 hilabete", unax: "1 – 2 aste" },
        { feature: "Elkarrizketaria", agency: "Hainbat sail", unax: "Ni bakarrik" },
        { feature: "Talde dedikatua", agency: "3–5 espezialista", unax: "Ni bakarrik", agencyWins: true },
        { feature: "Jabetzako kodea", agency: "Batzuetan ez", unax: "Beti zurea" },
        { feature: "SEO tekniko erreala", agency: "Datorrena", unax: "Barne hartuta" },
        { feature: "Lighthouse 95+", agency: "Arraroa", unax: "Bermatua" },
        { feature: "Abiarazi osteko aldaketak", agency: "Ordainpekoa", unax: "1 hilabete doan" },
      ];

  const SERVICE_GRADIENTS: Record<string, string> = {
    "local-business": "linear-gradient(135deg, #0d2415 0%, #142e1a 100%)",
    "clinic": "linear-gradient(135deg, #0a1f22 0%, #0d2a18 100%)",
    "multilingual": "linear-gradient(135deg, #12200f 0%, #1a2d10 100%)",
    "redesign": "linear-gradient(135deg, #1a1a0a 0%, #1c2a10 100%)",
  };
  const SERVICE_ORDERS = ["01", "02", "03", "04"];

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
            itemOffered: { "@type": "Service", name: s.title, description: s.description, serviceType: s.title },
          })),
        },
      },
      {
        "@type": "HowTo",
        "@id": `https://unaxaller.com/${locale}/servicios#howto`,
        name: locale === "es" ? "Cómo contratar una web profesional con Unax Aller" : locale === "en" ? "How to hire a professional website with Unax Aller" : "Nola kontratatu web profesional bat Unax Allerekin",
        totalTime: "PT21D",
        estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "1500" },
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
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["details summary", "details p"] },
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
      <style>{`
        @keyframes svcFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes svcChipIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .svc-hero-inner { animation: svcFadeUp 0.7s cubic-bezier(.16,1,.3,1) both; }
        .svc-chip { display:inline-flex;align-items:center;background:rgba(180,205,184,.08);border:1px solid rgba(180,205,184,.16);color:var(--color-ink);border-radius:var(--radius-full);padding:.25rem .75rem;font-size:var(--text-xs);font-family:var(--font-sans);animation:svcChipIn .6s cubic-bezier(.16,1,.3,1) .3s both; }
        .svc-chips { display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-6); }
        .svc-bento { display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-6); }
        @media(max-width:768px){ .svc-bento{grid-template-columns:1fr} }
        .svc-card { position:relative;padding:2rem;border-radius:var(--radius-2xl);border:1px solid rgba(180,205,184,.12);overflow:hidden;transition:border-color .2s ease,box-shadow .2s ease; }
        .svc-card:hover { border-color:rgba(180,205,184,.28);box-shadow:0 8px 40px rgba(0,0,0,.35); }
        .svc-card-order { position:absolute;top:1rem;right:1.5rem;font-family:var(--font-serif);font-size:4rem;line-height:1;color:rgba(180,205,184,.1);pointer-events:none;user-select:none; }
        .svc-icon-wrap { width:60px;height:60px;border-radius:var(--radius-full);background:rgba(74,222,128,.08);display:flex;align-items:center;justify-content:center;color:#4ade80;margin-bottom:var(--space-5); }
        .svc-card-title { font-family:var(--font-serif);font-size:var(--text-xl);color:var(--color-ink);margin-bottom:var(--space-3);line-height:var(--lh-snug); }
        .svc-card-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed);margin-bottom:var(--space-5); }
        .svc-bullets { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-2); }
        .svc-bullet { display:flex;align-items:flex-start;gap:var(--space-2);font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-normal); }
        .svc-bullet-check { color:#4ade80;flex-shrink:0;font-style:normal; }
        .svc-process-section { background:var(--color-bg-alt);padding-block:var(--space-16); }
        .svc-timeline { display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-6);position:relative; }
        .svc-timeline::before { content:'';position:absolute;top:2rem;left:12.5%;right:12.5%;border-top:1px dashed rgba(180,205,184,.2);pointer-events:none; }
        @media(max-width:900px){ .svc-timeline{grid-template-columns:1fr} .svc-timeline::before{display:none} }
        .svc-step-num { font-family:var(--font-serif);font-size:var(--text-3xl);color:#4ade80;font-weight:700;line-height:1;margin-bottom:var(--space-3); }
        .svc-step-title { font-family:var(--font-sans);font-size:var(--text-md);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-2); }
        .svc-step-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed); }
        .svc-table-wrap { overflow-x:auto; }
        .svc-compare-table { width:100%;border-collapse:separate;border-spacing:0; }
        .svc-compare-table th,.svc-compare-table td { padding:.875rem 1.25rem;text-align:left;font-family:var(--font-sans);font-size:var(--text-sm);border-bottom:1px solid rgba(180,205,184,.10); }
        .svc-compare-table th { font-weight:600;font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--color-ink-muted); }
        .svc-col-agency { color:var(--color-ink-muted);background:rgba(255,255,255,.02); }
        .svc-col-unax { color:var(--color-ink);background:linear-gradient(160deg,#0a2412,#162b1c);border-left:1px solid rgba(180,205,184,.2);border-right:1px solid rgba(180,205,184,.2); }
        .svc-col-unax-head { background:linear-gradient(160deg,#0a2412,#162b1c);color:var(--color-accent);border-left:1px solid rgba(180,205,184,.2);border-right:1px solid rgba(180,205,184,.2);border-top:1px solid rgba(180,205,184,.2); }
        .svc-check { color:#4ade80; }
        .svc-cross { color:#f87171; }
        .svc-faq-section { background:var(--color-bg-alt);padding-block:var(--space-16); }
        .svc-cta-section { background:linear-gradient(160deg,#0a2412 0%,#061b0e 100%);border-top:1px solid rgba(180,205,184,.1);padding-block:var(--space-16);text-align:center; }
        .svc-cta-footnote { margin-top:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(236,231,214,.40); }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section
        className="page-hero"
        aria-label={locale === "es" ? "Servicios" : locale === "en" ? "Services" : "Zerbitzuak"}
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,222,128,0.04) 0%, transparent 70%)" }}
      >
        <div className="container-xl">
          <div className="svc-hero-inner">
            <Breadcrumbs
              items={[
                { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
                { name: locale === "es" ? "Servicios" : locale === "en" ? "Services" : "Zerbitzuak" },
              ]}
            />
            <p className="page-hero-eyebrow lp-eyebrow" style={{ marginTop: "var(--space-6)" }}>
              {locale === "es" ? "Lo que hago" : locale === "en" ? "What I do" : "Zer egiten dudan"}
            </p>
            <h1 className="page-hero-title">{t("title")}</h1>
            <p className="page-hero-subtitle">{t("subtitle")}</p>
            <div className="svc-chips">
              <span className="svc-chip">{locale === "es" ? "1–2 semanas" : locale === "en" ? "1–2 weeks" : "1–2 aste"}</span>
              <span className="svc-chip">{locale === "es" ? "desde 1.500€" : locale === "en" ? "from €1,500" : "1.500€-tik"}</span>
              <span className="svc-chip">Lighthouse 95+</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENTO GRID DE SERVICIOS ── */}
      <AnimatedSection>
        <section aria-labelledby="services-grid-title" style={{ paddingBlock: "var(--space-16)" }}>
          <div className="container-xl">
            <h2 id="services-grid-title" className="section-heading" style={{ marginBottom: "var(--space-10)" }}>
              {locale === "es" ? "Cuatro tipos de proyecto" : locale === "en" ? "Four project types" : "Lau proiektu mota"}
            </h2>
            <div className="svc-bento">
              {services.map((svc, idx) => (
                <div
                  key={svc.id}
                  id={svc.id}
                  className="svc-card"
                  style={{ background: SERVICE_GRADIENTS[svc.id] }}
                >
                  <span className="svc-card-order" aria-hidden="true">{SERVICE_ORDERS[idx]}</span>
                  <div className="svc-icon-wrap" aria-hidden="true">{svc.icon}</div>
                  <h3 className="svc-card-title">{svc.title}</h3>
                  <p className="svc-card-desc">{svc.description}</p>
                  <ul className="svc-bullets">
                    {svc.bullets.map((b, bi) => (
                      <li key={bi} className="svc-bullet">
                        <span className="svc-bullet-check" aria-hidden="true">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── PROCESO ── */}
      <AnimatedSection>
        <section className="svc-process-section" aria-labelledby="process-title">
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "El proceso" : locale === "en" ? "The process" : "Prozesua"}
            </p>
            <h2 id="process-title" className="section-heading" style={{ marginBottom: "var(--space-10)" }}>
              {locale === "es" ? "Cómo trabajo" : locale === "en" ? "How I work" : "Nola lan egiten dudan"}
            </h2>
            <div className="svc-timeline">
              {howToSteps.slice(0, 4).map((step, i) => (
                <div key={i} id={`paso-${i + 1}`}>
                  <div className="svc-step-num" aria-hidden="true">{step.name.split(".")[0]}</div>
                  <div className="svc-step-title">{step.name.replace(/^\d+\.\s*/, "")}</div>
                  <p className="svc-step-desc">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── TABLA COMPARATIVA ── */}
      <AnimatedSection>
        <section aria-labelledby="compare-title" style={{ paddingBlock: "var(--space-16)" }}>
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "La diferencia" : locale === "en" ? "The difference" : "Aldea"}
            </p>
            <h2 id="compare-title" className="section-heading" style={{ marginBottom: "var(--space-10)" }}>
              {locale === "es" ? "Agencia vs Unax" : locale === "en" ? "Agency vs Unax" : "Agentzia vs Unax"}
            </h2>
            <div className="svc-table-wrap">
              <table className="svc-compare-table">
                <thead>
                  <tr>
                    <th style={{ color: "rgba(236,231,214,0.40)", width: "34%" }}>
                      {locale === "es" ? "Punto" : locale === "en" ? "Point" : "Puntua"}
                    </th>
                    <th className="svc-col-agency">
                      {locale === "es" ? "Agencia" : locale === "en" ? "Agency" : "Agentzia"}
                    </th>
                    <th className="svc-col-unax-head">Unax Aller</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--color-ink)", fontWeight: 500 }}>{row.feature}</td>
                      <td className="svc-col-agency">
                        <span className={row.agencyWins ? "svc-check" : "svc-cross"} aria-hidden="true">{row.agencyWins ? "✓" : "✗"}</span>{" "}{row.agency}
                      </td>
                      <td className="svc-col-unax">
                        <span className={row.agencyWins ? "svc-cross" : "svc-check"} aria-hidden="true">{row.agencyWins ? "✗" : "✓"}</span>{" "}{row.unax}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── FAQ ── */}
      <AnimatedSection>
        <section className="svc-faq-section" aria-labelledby="faq-services-title">
          <div className="container-xl">
            <div className="faq-wrap">
              <h2 id="faq-services-title" className="section-heading">
                {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : "Galdera ohikoak"}
              </h2>
              <div className="faq-list">
                {faqItems.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-summary focusable">
                      {item.q}
                      <svg className="faq-caret" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <p className="faq-answer">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── CTA FINAL ── */}
      <section className="svc-cta-section" aria-labelledby="cta-services-title">
        <div className="container-xl">
          <p className="lp-eyebrow" style={{ marginBottom: "var(--space-4)" }}>
            {locale === "es" ? "¿Empezamos?" : locale === "en" ? "Shall we start?" : "Has egiten al dugu?"}
          </p>
          <h2 id="cta-services-title" className="section-heading" style={{ marginBottom: "var(--space-4)" }}>
            {locale === "es"
              ? "Tu proyecto merece una web que funcione."
              : locale === "en"
              ? "Your project deserves a site that works."
              : "Zure proiektuak funtzionatzen duen web bat merezi du."}
          </h2>
          <p style={{ color: "rgba(236,231,214,0.65)", fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", marginBottom: "var(--space-8)" }}>
            {locale === "es"
              ? "Cuéntame lo que necesitas. Respondo en menos de 24 horas."
              : locale === "en"
              ? "Tell me what you need. I reply in under 24 hours."
              : "Esan zer behar duzun. 24 ordutan baino gutxiagotan erantzuten dut."}
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/contacto`} className="btn btn-primary btn-lg focusable">
              {tHero("cta")}
            </Link>
            <Link href={`/${locale}/precios`} className="btn btn-secondary btn-lg focusable">
              {tHero("cta2")}
            </Link>
          </div>
          <p className="svc-cta-footnote">
            {locale === "es"
              ? "Sin compromiso. Respondo en menos de 24h."
              : locale === "en"
              ? "No commitment. I reply in under 24h."
              : "Konpromisorik gabe. 24h baino gutxiagotan erantzuten dut."}
          </p>
        </div>
      </section>
    </>
  );
}
