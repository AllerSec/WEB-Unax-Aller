import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
        { q: "¿Cuánto tardas en publicar la web?", a: "Entre 7 y 10 días desde que cerramos. Lo que más alarga el plazo es esperar tus textos o fotos; cuanto antes me los pases, antes está viva." },
        { q: "¿Qué necesito aportar yo para empezar?", a: "Lo justo: cuéntame qué hace tu negocio, a quién quieres atraer y, si los tienes a mano, logo y fotos. Si no tienes fotos buenas, también lo resolvemos." },
        { q: "¿Incluye el mantenimiento después de la entrega?", a: "Sí. Los 149€/mes ya cubren hosting, dominio, SSL, soporte por WhatsApp y los cambios menores cada mes (textos, fotos, precios, horarios, añadir un servicio). No hay facturas extra." },
        { q: "¿Puedo pedir cambios durante el proyecto?", a: "Sí. Durante el desarrollo te enseño avances por WhatsApp y vamos ajustando hasta que te guste. Después del lanzamiento, los cambios menores entran en la cuota." },
        { q: "¿Trabajas solo con empresas del País Vasco?", a: "Trabajo con negocios del País Vasco y Navarra. Nos vemos por WhatsApp y videollamada, con visitas presenciales cuando el proyecto lo merece." },
      ]
    : locale === "en"
    ? [
        { q: "How long until my site goes live?", a: "Between 7 and 10 days from the day we sign. What usually slows things down is waiting on your copy or photos — the sooner I get them, the sooner the site is live." },
        { q: "What do I need to provide to get started?", a: "Just enough: tell me what your business does, who you want to attract and, if you have them handy, logo and photos. If you don't have good photos, we'll sort it." },
        { q: "Does it include maintenance after launch?", a: "Yes. The €149/month already covers hosting, domain, SSL, WhatsApp support and minor changes every month (copy, photos, prices, hours, adding a service). No extra invoices." },
        { q: "Can I request changes during the project?", a: "Yes. While I build it I send you progress over WhatsApp and we adjust until it fits. After launch, minor changes are included in the monthly fee." },
        { q: "Do you only work with Basque Country businesses?", a: "I work with businesses in the Basque Country and Navarre. We meet over WhatsApp and video call, with in-person visits when the project calls for it." },
      ]
    : [
        { q: "Zenbat denbora behar da weba argitaratzeko?", a: "Sinatu eta 7-10 egunera. Atzeratzen duena izaten da zure testuen edo argazkien zain egotea; lehenago bidalita, lehenago dago martxan." },
        { q: "Zer eman behar dut hasteko?", a: "Justu behar dena: zer egiten duen zure negozioak, nor erakarri nahi duzun eta, eskura badituzu, logoa eta argazkiak. Argazki onik ez baduzu, hori ere konponduko dugu." },
        { q: "Mantentze-lana entregatutakoan sartzen al da?", a: "Bai. 149€/hil horretan hosting-a, domeinua, SSL, WhatsApp bidezko laguntza eta hileko aldaketa txikiak (testuak, argazkiak, prezioak, ordutegiak, zerbitzuren bat eranstea) sartzen dira. Faktura gehigarririk gabe." },
        { q: "Prozesu bitartean aldaketak eskatu al ditzaket?", a: "Bai. Garapenean WhatsApp bidez aurrerapenak erakusten dizkizut eta gustatu arte doitzen ditugu. Abian jarri ondoren, aldaketa txikiak hileko kuotan sartzen dira." },
        { q: "Euskal Herriko enpresekin bakarrik lan egiten al duzu?", a: "Euskal Herriko eta Nafarroako negozioekin lan egiten dut. WhatsApp eta bideodeiez elkartzen gara, eta presentzialki proiektuak hala eskatzen duenean." },
      ];

  const howToSteps = locale === "es"
    ? [
        { name: "1. Hablamos", text: "Una llamada de 30 minutos por teléfono o videollamada. Me cuentas qué hace tu negocio, a quién quieres atraer y de dónde te llegan ahora los clientes. Pregunto mucho." },
        { name: "2. Te enseño una propuesta", text: "Antes de pedirte que firmes nada, te paso una propuesta visual: cómo veo tu web, la dirección de diseño y la estructura. Si no te encaja, ahí acaba y no me debes nada." },
        { name: "3. Si te gusta, firmamos", text: "Contrato simple a 12 meses con 30 días de garantía. 0€ al firmar. La primera cuota de 149€ no se pasa hasta que la web esté publicada." },
        { name: "4. Diseño final", text: "Ya con el proyecto en marcha cerramos los detalles: tipografía, paleta, jerarquía, microcopys. Te paso avances por WhatsApp y vamos ajustando hasta que te guste de verdad." },
        { name: "5. Desarrollo", text: "Programo la web a mano, sin plantillas. SEO técnico, multi-idioma si lo necesitas y rápida en móvil. Ficha de Google Maps y sistema de reseñas configurados." },
        { name: "6. Pruebas y lanzamiento", text: "Pruebo en dispositivos reales, paso Lighthouse con Performance, Accessibility y SEO por encima de 95 y valido los datos estructurados. Subimos la web, configuramos dominio, Search Console y Analytics. En 7-10 días desde la firma, viva." },
        { name: "7. Cambios por WhatsApp", text: "Después, los 149€/mes cubren hosting, dominio, SSL y los cambios menores cada mes. Me escribes por WhatsApp y lo hago yo: sin formularios, sin tickets." },
      ]
    : locale === "en"
    ? [
        { name: "1. We talk", text: "A 30-minute phone or video call. You tell me what your business does, who you want to attract and where clients come from today. I ask a lot." },
        { name: "2. I show you a proposal", text: "Before I ask you to sign anything, I send you a visual proposal: how I picture your site, the design direction and the structure. If it doesn't click, that's the end of it and you owe me nothing." },
        { name: "3. If you like it, we sign", text: "A simple 12-month contract with a 30-day guarantee. €0 to sign. The first €149 fee doesn't kick in until the site is published." },
        { name: "4. Final design", text: "With the project underway we lock in the details: type, palette, hierarchy, microcopy. I send progress over WhatsApp and we adjust until you actually like it." },
        { name: "5. Development", text: "I code the site by hand, no templates. Technical SEO, multi-language if you need it and fast on mobile. Google Maps profile and reviews system set up." },
        { name: "6. Testing and launch", text: "I test on real devices, run Lighthouse with Performance, Accessibility and SEO above 95, and validate structured data. We push the site, set up the domain, Search Console and Analytics. 7-10 days from signing and it's live." },
        { name: "7. Changes over WhatsApp", text: "After that, €149/month covers hosting, domain, SSL and minor changes every month. You message me on WhatsApp and I do it: no forms, no tickets." },
      ]
    : [
        { name: "1. Hitz egiten dugu", text: "30 minutuko deia edo bideodeia. Zure negozioak zer egiten duen, nor erakarri nahi duzun eta gaur egun bezeroak nondik datozkizun kontatzen didazu." },
        { name: "2. Proposamen bat erakusten dizut", text: "Ezer sinatu aurretik, proposamen bisual bat bidaltzen dizut: zure weba nola ikusten dudan, diseinu-norabidea eta egitura. Egokitzen ez bazaizu, hor amaitzen da eta ez didazu ezer zor." },
        { name: "3. Gustatzen bazaizu, sinatzen dugu", text: "12 hilabeteko kontratu sinplea, 30 eguneko bermearekin. 0€ sinatzean. Lehen 149€-ko kuota ez da pasatzen weba argitaratu arte." },
        { name: "4. Azken diseinua", text: "Proiektua martxan dugula, xehetasunak ixten ditugu: tipografia, paleta, hierarkia, mikrokopya. Aurrerapenak WhatsApp bidez bidaltzen dizkizut eta benetan gustatu arte doitzen ditugu." },
        { name: "5. Garapena", text: "Weba eskuz programatzen dut, txantiloirik gabe. SEO teknikoa, eleaniztasuna behar baduzu eta mugikorrean azkar. Google Maps fitxa eta iritzi-sistema prest." },
        { name: "6. Probak eta abiaraztea", text: "Benetako gailuetan probatzen dut, Lighthouse 95etik gora Performance, Accessibility eta SEO-n, eta datu egituratuak baliozkotzen ditut. Weba igotzen dugu, domeinua, Search Console eta Analytics konfiguratzen ditugu. Sinatu eta 7-10 egunera martxan." },
        { name: "7. Aldaketak WhatsApp bidez", text: "Ondoren, 149€/hil hosting-a, domeinua, SSL eta hileko aldaketa txikiak dira. WhatsApp idazten didazu eta nik egiten dut: formulariorik gabe, ticketsik gabe." },
      ];

  const comparisonRows = locale === "es"
    ? [
        { feature: "Pago inicial", agency: "2.500€ – 5.000€ de golpe", unax: "0€ al firmar" },
        { feature: "Cuota mensual", agency: "Solo si pides mantenimiento", unax: "149€ todo incluido" },
        { feature: "Tiempo de entrega", agency: "2 – 6 meses", unax: "7 – 10 días" },
        { feature: "Interlocutor", agency: "Comercial, diseñador, dev…", unax: "Solo yo, por WhatsApp" },
        { feature: "Cambios mensuales", agency: "Cada uno se factura", unax: "Incluidos en la cuota" },
        { feature: "Garantía de devolución", agency: "No suele existir", unax: "30 días sin preguntas" },
        { feature: "SEO local técnico", agency: "Coste aparte", unax: "Incluido" },
        { feature: "Lighthouse 95+", agency: "Raro", unax: "Garantizado" },
      ]
    : locale === "en"
    ? [
        { feature: "Upfront payment", agency: "€2,500 – €5,000 in one go", unax: "€0 to sign" },
        { feature: "Monthly fee", agency: "Only if you add maintenance", unax: "€149 all-inclusive" },
        { feature: "Delivery time", agency: "2 – 6 months", unax: "7 – 10 days" },
        { feature: "Point of contact", agency: "Sales, designer, dev…", unax: "Just me, on WhatsApp" },
        { feature: "Monthly changes", agency: "Each one billed", unax: "Included in the fee" },
        { feature: "Money-back guarantee", agency: "Rarely offered", unax: "30 days, no questions" },
        { feature: "Technical local SEO", agency: "Charged separately", unax: "Included" },
        { feature: "Lighthouse 95+", agency: "Rare", unax: "Guaranteed" },
      ]
    : [
        { feature: "Hasierako ordainketa", agency: "2.500€ – 5.000€ batera", unax: "0€ sinatzean" },
        { feature: "Hileko kuota", agency: "Mantentze-lana eskatuz gero", unax: "149€ dena barne" },
        { feature: "Entrega denbora", agency: "2 – 6 hilabete", unax: "7 – 10 egun" },
        { feature: "Elkarrizketaria", agency: "Komertziala, diseinatzailea…", unax: "Ni bakarrik, WhatsApp-ez" },
        { feature: "Hileko aldaketak", agency: "Bakoitza fakturatzen da", unax: "Kuotan barne" },
        { feature: "Itzulketa bermea", agency: "Ez ohi dago", unax: "30 egun galderarik gabe" },
        { feature: "Tokiko SEO teknikoa", agency: "Apartetik kobratzen da", unax: "Barne hartuta" },
        { feature: "Lighthouse 95+", agency: "Arraroa", unax: "Bermatua" },
      ];

  const SERVICE_ACCENTS: Record<string, string> = {
    "local-business": "#dc2626",
    "clinic": "#0369A1",
    "multilingual": "#047857",
    "redesign": "#a16207",
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
          { "@type": "AdministrativeArea", name: "Navarra" },
        ],
        audience: {
          "@type": "BusinessAudience",
          audienceType: locale === "es" ? "PyMEs, autónomos y comercios locales" : locale === "en" ? "SMEs, freelancers and local businesses" : "ETE, autonomoak eta tokiko merkataritza",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "149",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "149",
            priceCurrency: "EUR",
            unitText: "MONTH",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
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
        totalTime: "P10D",
        estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
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
        .svc-hero { position:relative;overflow:hidden;padding-block:var(--space-16);background:linear-gradient(180deg,var(--color-bg-muted) 0%,var(--color-bg) 100%); }
        .svc-hero-mark { position:absolute;top:-6rem;right:-6rem;width:520px;height:auto;opacity:.05;pointer-events:none;user-select:none;transform:rotate(-8deg); }
        @media(max-width:768px){ .svc-hero-mark{width:320px;top:-3rem;right:-4rem;opacity:.06} }
        .svc-hero-inner { position:relative;z-index:1;animation: svcFadeUp 0.7s cubic-bezier(.16,1,.3,1) both;max-width:780px; }
        .svc-chip { display:inline-flex;align-items:center;background:#fff;border:1px solid rgba(2, 6, 23, .12);color:var(--color-ink);border-radius:var(--radius-full);padding:.35rem .85rem;font-size:var(--text-xs);font-family:var(--font-sans);font-weight:500;animation:svcChipIn .6s cubic-bezier(.16,1,.3,1) .3s both;box-shadow:0 1px 2px rgba(2,6,23,.04); }
        .svc-chip--accent { background:var(--color-ink);color:#fff;border-color:var(--color-ink); }
        .svc-chips { display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-6); }

        .svc-bento { display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-5); }
        @media(max-width:768px){ .svc-bento{grid-template-columns:1fr;gap:var(--space-4)} }
        .svc-card { position:relative;padding:2rem;border-radius:var(--radius-2xl);border:1px solid rgba(2, 6, 23, .08);overflow:hidden;background:#fff;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;display:flex;flex-direction:column; }
        .svc-card::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--svc-accent,#dc2626);opacity:.85; }
        .svc-card:hover { transform:translateY(-2px);border-color:rgba(2, 6, 23, .15);box-shadow:0 12px 32px rgba(2,6,23,.08); }
        .svc-card-order { position:absolute;top:1.25rem;right:1.5rem;font-family:var(--font-serif);font-size:3.5rem;line-height:1;color:rgba(2, 6, 23, .06);pointer-events:none;user-select:none;font-weight:700; }
        .svc-icon-wrap { width:48px;height:48px;border-radius:var(--radius-lg);background:color-mix(in srgb,var(--svc-accent,#dc2626) 12%,transparent);display:flex;align-items:center;justify-content:center;color:var(--svc-accent,#dc2626);margin-bottom:var(--space-5);transition:transform .25s ease; }
        .svc-card:hover .svc-icon-wrap { transform:scale(1.08) rotate(-3deg); }
        .svc-card-title { font-family:var(--font-serif);font-size:var(--text-xl);color:var(--color-ink);margin-bottom:var(--space-3);line-height:var(--lh-snug);font-weight:600; }
        .svc-card-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed);margin-bottom:var(--space-5); }
        .svc-bullets { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-2);margin-top:auto; }
        .svc-bullet { display:flex;align-items:flex-start;gap:var(--space-2);font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink);line-height:var(--lh-normal); }
        .svc-bullet-check { color:var(--svc-accent,#dc2626);flex-shrink:0;font-weight:700;line-height:1.4; }

        .svc-process-section { background:var(--color-bg-muted);padding-block:var(--space-16); }
        .svc-timeline { display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-6);position:relative;counter-reset:step; }
        .svc-timeline::before { content:'';position:absolute;top:1.5rem;left:6%;right:6%;border-top:2px dashed rgba(2, 6, 23, .12);pointer-events:none;z-index:0; }
        @media(max-width:900px){ .svc-timeline{grid-template-columns:1fr;gap:var(--space-5)} .svc-timeline::before{display:none} }
        .svc-step { position:relative;z-index:1; }
        .svc-step-num { display:inline-flex;align-items:center;justify-content:center;width:3rem;height:3rem;border-radius:50%;background:var(--color-ink);color:#fff;font-family:var(--font-serif);font-size:var(--text-md);font-weight:700;line-height:1;margin-bottom:var(--space-4);box-shadow:0 4px 12px rgba(2,6,23,.15); }
        .svc-step-title { font-family:var(--font-sans);font-size:var(--text-md);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-2); }
        .svc-step-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed); }

        .svc-table-wrap { overflow-x:auto;border-radius:var(--radius-xl);border:1px solid rgba(2,6,23,.08);background:#fff; }
        .svc-compare-table { width:100%;border-collapse:separate;border-spacing:0; }
        .svc-compare-table th,.svc-compare-table td { padding:1rem 1.25rem;text-align:left;font-family:var(--font-sans);font-size:var(--text-sm);border-bottom:1px solid rgba(2, 6, 23, .06); }
        .svc-compare-table tr:last-child td { border-bottom:0; }
        .svc-compare-table th { font-weight:600;font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--color-ink-muted);background:var(--color-bg-muted); }
        .svc-col-agency { color:var(--color-ink-muted); }
        .svc-col-unax { color:var(--color-ink);background:#fafaf7;border-left:2px solid #dc2626;font-weight:500; }
        .svc-col-unax-head { background:var(--color-ink);color:#fff;border-left:2px solid #dc2626;font-weight:700; }
        .svc-check { color:#047857;font-weight:700; }
        .svc-cross { color:#9ca3af; }

        .svc-faq-section { background:var(--color-bg);padding-block:var(--space-16); }
        .svc-cta-section { background:var(--color-ink);color:#fff;padding-block:var(--space-16);text-align:center;position:relative;overflow:hidden; }
        .svc-cta-section::before { content:'';position:absolute;top:-6rem;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(220,38,38,.12) 0%,transparent 60%);pointer-events:none; }
        .svc-cta-inner { position:relative;z-index:1; }
        .svc-cta-section .lp-eyebrow { color:#dc2626; }
        .svc-cta-section h2 { color:#fff;font-family:var(--font-serif); }
        .svc-cta-section .svc-cta-lead { color:rgba(255,255,255,.72); }
        .svc-cta-footnote { margin-top:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(255,255,255,.5); }
        /* Button overrides for dark CTA section */
        .svc-cta-section .btn-primary { background:#dc2626;color:#fff;border-color:#dc2626;box-shadow:0 8px 24px rgba(220,38,38,.35); }
        .svc-cta-section .btn-primary:hover { background:#ef4444;border-color:#ef4444;box-shadow:0 12px 32px rgba(220,38,38,.45);transform:translateY(-2px); }
        .svc-cta-section .btn-primary:active { transform:translateY(0); }
        .svc-cta-section .btn-secondary { background:transparent;color:#fff;border-color:rgba(255,255,255,.25); }
        .svc-cta-section .btn-secondary:hover { background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.5);color:#fff;transform:translateY(-2px); }
        .svc-cta-section .btn-secondary:active { transform:translateY(0);background:rgba(255,255,255,.12); }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section
        className="svc-hero"
        aria-label={locale === "es" ? "Servicios" : locale === "en" ? "Services" : "Zerbitzuak"}
      >
        <Image
          src="/images/brand/logo-mark.webp"
          alt=""
          width={602}
          height={359}
          className="svc-hero-mark"
          aria-hidden="true"
          priority={false}
        />
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
            <h1 className="page-hero-title" style={{ fontFamily: "var(--font-serif)" }}>{t("title")}</h1>
            <p className="page-hero-subtitle">{t("subtitle")}</p>
            <div className="svc-chips">
              <span className="svc-chip svc-chip--accent">
                {locale === "es" ? "149€/mes · 0€ inicial" : locale === "en" ? "€149/mo · €0 upfront" : "149€/hil · 0€ hasieran"}
              </span>
              <span className="svc-chip">{locale === "es" ? "Entrega 7–10 días" : locale === "en" ? "Delivered in 7–10 days" : "7–10 egunetan"}</span>
              <span className="svc-chip">{locale === "es" ? "30 días de garantía" : locale === "en" ? "30-day guarantee" : "30 eguneko bermea"}</span>
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
                <article
                  key={svc.id}
                  id={svc.id}
                  className="svc-card"
                  style={{ ["--svc-accent" as string]: SERVICE_ACCENTS[svc.id] }}
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
                </article>
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
                <div key={i} id={`paso-${i + 1}`} className="svc-step">
                  <div className="svc-step-num" aria-hidden="true">{i + 1}</div>
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
                    <th style={{ width: "34%" }}>
                      {locale === "es" ? "Punto" : locale === "en" ? "Point" : "Puntua"}
                    </th>
                    <th>
                      {locale === "es" ? "Agencia tradicional" : locale === "en" ? "Traditional agency" : "Agentzia tradizionala"}
                    </th>
                    <th className="svc-col-unax-head">Unax · Renting Web</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--color-ink)", fontWeight: 600 }}>{row.feature}</td>
                      <td className="svc-col-agency">
                        <span className="svc-cross" aria-hidden="true">✗</span>{" "}{row.agency}
                      </td>
                      <td className="svc-col-unax">
                        <span className="svc-check" aria-hidden="true">✓</span>{" "}{row.unax}
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
        <div className="container-xl svc-cta-inner">
          <p className="lp-eyebrow" style={{ marginBottom: "var(--space-4)" }}>
            {locale === "es" ? "Sin papeleo. Sin desembolso." : locale === "en" ? "No paperwork. No upfront cost." : "Paperik gabe. Hasierako kosturik gabe."}
          </p>
          <h2 id="cta-services-title" className="section-heading" style={{ marginBottom: "var(--space-4)", maxWidth: "780px", marginInline: "auto" }}>
            {locale === "es"
              ? "Cuéntame tu negocio. En 7 días tienes web."
              : locale === "en"
              ? "Tell me about your business. In 7 days you have a site."
              : "Esan zure negozioari buruz. 7 egunean weba duzu."}
          </h2>
          <p className="svc-cta-lead" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", marginBottom: "var(--space-8)", maxWidth: "640px", marginInline: "auto", lineHeight: "var(--lh-relaxed)" }}>
            {locale === "es"
              ? "30 minutos por teléfono o un café. Te enseño cómo te está quitando llamadas tu competencia en Google y qué haría yo en tu caso."
              : locale === "en"
              ? "30 minutes on the phone or over coffee. I show you how competitors are taking calls from you on Google and what I'd do in your case."
              : "30 minutu telefonoz edo kafe baten. Erakusten dizut lehiakideek nola kentzen dizkizuten deiak Googlen."}
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/contacto`} className="btn btn-primary btn-lg focusable">
              {locale === "es" ? "Pedir auditoría gratis →" : locale === "en" ? "Request free audit →" : "Doako auditoria eskatu →"}
            </Link>
            <a
              href="https://wa.me/34620909926"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg focusable"
            >
              {locale === "es" ? "WhatsApp directo" : locale === "en" ? "WhatsApp direct" : "WhatsApp zuzena"}
            </a>
          </div>
          <p className="svc-cta-footnote">
            {locale === "es"
              ? "Sin compromiso · Respuesta el mismo día · Hablas siempre conmigo"
              : locale === "en"
              ? "No commitment · Same-day reply · You always talk to me"
              : "Konpromisorik gabe · Egun bereko erantzuna · Beti nirekin hitz egiten duzu"}
          </p>
        </div>
      </section>
    </>
  );
}
