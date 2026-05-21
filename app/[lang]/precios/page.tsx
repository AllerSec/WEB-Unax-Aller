import type { Metadata } from "next";
import PricingCard from "@/components/ui/pricing-card";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AnimatedSection from "@/components/shared/AnimatedSection";
import GuaranteeBlock from "@/components/shared/GuaranteeBlock";
import PackageVisual from "@/components/shared/PackageVisual";
import Link from "next/link";
import Image from "next/image";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Renting Web — 149€/mes, 0€ inicial · Unax Aller",
    en: "Web Renting — €149/month, €0 upfront · Unax Aller",
    eu: "Web Errentaria — 149€/hilean, 0€ hasieran · Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Tu web profesional sin pagar nada al empezar. 149€/mes durante 12 meses con todo incluido: diseño a medida, Google Maps optimizado, reseñas, dominio, hosting y soporte por WhatsApp. 30 días de garantía.",
    en: "Your professional website with no upfront cost. €149/month for 12 months — custom design, Google Maps optimization, reviews system, domain, hosting and WhatsApp support all included. 30-day money-back guarantee.",
    eu: "Zure web profesionala hasieran ezer ordaindu gabe. 149€/hilean 12 hilabetez dena barne: neurrira egindako diseinua, Google Maps optimizatua, iritziak, domeinua, hostinga eta WhatsApp bidezko laguntza. 30 eguneko bermea.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/precios`,
      languages: hreflangAlternates("/precios"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/precios" }),
    twitter: buildTwitter({ title, description }),
  };
}

const VALID_FROM = new Date().toISOString().slice(0, 10);
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

export default async function PreciosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const faqItems = locale === "es"
    ? [
        { q: "¿Por qué 149€ al mes y no un pago único?", a: "Porque la mayoría de negocios locales no quieren soltar 2.000€ o 3.000€ de golpe por una web. Una cuota fija mensual entra en la contabilidad como un gasto más, igual que el gestor, el seguro o el teléfono. Y la web empieza a trabajar para ti desde el primer día, no cuando tengas dinero ahorrado." },
        { q: "¿Qué pasa cuando terminan los 12 meses?", a: "Sigues mes a mes sin permanencia. La cuota se queda bloqueada durante los 12 meses contratados, y si en algún momento decides irte solo tienes que avisar. No hay sorpresas." },
        { q: "¿Y si no me gusta el resultado?", a: "Tienes 30 días desde el lanzamiento para devolver lo pagado sin tener que dar explicaciones. Si no te convence cómo ha quedado, no pagas más." },
        { q: "¿Hay algún coste oculto?", a: "No. Los 149€/mes ya incluyen diseño, programación, dominio, hosting, SSL, optimización de Google Maps, sistema de reseñas, soporte por WhatsApp y cambios menores cada mes. Sin facturas extra." },
        { q: "¿Qué incluyen exactamente los cambios mensuales?", a: "Cambios de texto, fotos, precios, horarios, añadir un servicio nuevo, ajustar la ficha de Google… todo lo que un negocio necesita ir actualizando. Si pides un rediseño completo a los 6 meses, eso se cotiza aparte." },
        { q: "¿La web es mía o tuya?", a: "El dominio se registra a tu nombre desde el primer día. Si decides irte, te llevas el dominio. Solo el hosting y el código quedan vinculados al servicio." },
        { q: "¿Cuándo está lista la web?", a: "Entre 7 y 10 días desde que firmamos. Como no hay desembolso inicial, podemos arrancar enseguida." },
      ]
    : locale === "en"
    ? [
        { q: "Why €149/month instead of a one-off payment?", a: "Most local businesses don't want to drop €2,000 or €3,000 in one go on a website. A flat monthly fee sits in the books like any other operating cost — accountant, insurance, phone bill. And the site starts working for you from day one, not when you've saved up." },
        { q: "What happens after the 12 months?", a: "You continue month-to-month with no lock-in. The fee is locked for the 12 months you signed up for. If at some point you decide to leave, you just let me know. No surprises." },
        { q: "What if I don't like the result?", a: "You have 30 days from launch to ask for a full refund, no explanation required. If you're not convinced, you stop paying." },
        { q: "Are there any hidden costs?", a: "No. €149/month already covers design, development, domain, hosting, SSL, Google Maps optimization, reviews system, WhatsApp support and monthly minor changes. No extra invoices." },
        { q: "What exactly is included in the monthly changes?", a: "Text edits, photo swaps, prices, opening hours, adding a new service, tweaking the Google profile… anything a normal business needs to keep up to date. A full redesign at month 6 is quoted separately." },
        { q: "Is the website mine or yours?", a: "The domain is registered in your name from day one. If you leave, you take the domain. Only the hosting and the code stay tied to the service." },
        { q: "How fast is the site ready?", a: "Between 7 and 10 days from signing. Since there's no upfront cost, we can start immediately." },
      ]
    : [
        { q: "Zergatik 149€/hilean ordainketa bakar baten ordez?", a: "Tokiko negozio gehienek ez dute 2.000€ edo 3.000€ batera ordaindu nahi web batengatik. Hileko kuota finkoa kontabilitatean beste edozein gastu bezala sartzen da. Eta weba lehen egunetik zure alde lanean hasten da." },
        { q: "Zer gertatzen da 12 hilabete amaitu ondoren?", a: "Hilez hile jarraitzen duzu iraupenik gabe. Kuota 12 hilabetez blokeatuta dago. Joatea erabakitzen baduzu, abisatu besterik ez duzu egin behar." },
        { q: "Eta emaitza gustatzen ez bazait?", a: "30 egun dituzu abian jartzen denetik ordaindutakoa itzultzeko inolako azalpenik eman gabe." },
        { q: "Ezkutuko kosturik al dago?", a: "Ez. 149€/hilean barne sartzen dira diseinua, programazioa, domeinua, hostinga, SSL, Google Maps optimizatua, iritzien sistema, WhatsApp laguntza eta hileroko aldaketa txikiak." },
        { q: "Zer dira zehazki hileko aldaketak?", a: "Testuak, argazkiak, prezioak, ordutegiak, zerbitzu berriak gehitu, Google fitxa egokitu… negozio batek eguneratu behar duen guztia." },
        { q: "Weba nirea da edo zurea?", a: "Domeinua zure izenean erregistratzen da lehen egunetik. Joaten bazara, domeinua eramaten duzu." },
        { q: "Noiz dago weba prest?", a: "7 eta 10 egun artean sinatzen dugun unetik. Hasierako desenbolsorik ez dagoenez, berehala has gaitezke." },
      ];

  const includesItems = locale === "es"
    ? [
        { icon: "smartphone", title: "Diseño a medida", desc: "Pensado para que un cliente entre desde el móvil y, en 3 segundos, sepa qué haces y cómo llamarte." },
        { icon: "map-pin", title: "Google Maps optimizado", desc: "Tu ficha de Google Business Profile bien configurada para que aparezcas cuando alguien busque tu servicio cerca." },
        { icon: "star", title: "Sistema de reseñas", desc: "Las reseñas de 5 estrellas son lo que más mueve la aguja en negocio local. Te monto el sistema para conseguirlas." },
        { icon: "message-circle", title: "WhatsApp directo", desc: "Cuando necesites cambiar precios, horarios, fotos o lo que sea: WhatsApp y listo. Sin tickets ni esperas." },
      ]
    : locale === "en"
    ? [
        { icon: "smartphone", title: "Custom design", desc: "Built so a customer landing from mobile knows what you do and how to call you in 3 seconds." },
        { icon: "map-pin", title: "Optimized Google Maps", desc: "Your Google Business Profile properly set up to show when someone searches for your service nearby." },
        { icon: "star", title: "Reviews system", desc: "5-star reviews move the needle most in local business. I set up the system to bring them in." },
        { icon: "message-circle", title: "Direct WhatsApp", desc: "When you need to change prices, hours, photos or anything: WhatsApp and done. No tickets, no waiting." },
      ]
    : [
        { icon: "smartphone", title: "Neurrizko diseinua", desc: "Mugikorretik datorren bezeroak 3 segundotan jakin behar du zer egiten duzun eta nola deitu." },
        { icon: "map-pin", title: "Google Maps optimizatua", desc: "Zure Google Business Profile ondo konfiguratuta inguruan zerbitzua bilatzean ager dadin." },
        { icon: "star", title: "Iritzien sistema", desc: "5 izarreko iritziak dira tokiko negozioan gehien mugitzen dutenak. Sistema jartzen dizut horiek lortzeko." },
        { icon: "message-circle", title: "Zuzeneko WhatsApp", desc: "Prezioak, ordutegiak, argazkiak aldatu behar duzunean: WhatsApp eta listo. Tiketik gabe." },
      ];

  // Lucide-style SVGs (stroke 1.75, 24x24). Keep them inline so they
  // render server-side without any client JS for a static section.
  const INCLUDE_ICONS: Record<string, React.ReactNode> = {
    smartphone: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2.5" />
        <path d="M12 18h.01" />
      </svg>
    ),
    "map-pin": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    star: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
      </svg>
    ),
    "message-circle": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  };

  // Desglose exacto del valor del sistema — los 9 ítems que el cliente
  // recibe el primer año. Total bruto: 6.770€. Lo paga por 149€×12 = 1.788€.
  const valueBreakdown = locale === "es"
    ? [
        { label: "Diseño web profesional a medida", value: "1.500€", unit: "una vez" },
        { label: "Optimización móvil completa", value: "400€", unit: "una vez" },
        { label: "SEO local técnico", value: "900€", unit: "una vez" },
        { label: "Google Business Profile optimizado", value: "600€", unit: "una vez" },
        { label: "Hosting y dominio", value: "240€", unit: "al año" },
        { label: "Mantenimiento técnico", value: "600€", unit: "al año" },
        { label: "Soporte directo por WhatsApp", value: "480€", unit: "al año" },
        { label: "Cambios mensuales incluidos", value: "1.200€", unit: "al año" },
        { label: "Sistema de captación de reseñas", value: "250€", unit: "una vez" },
      ]
    : locale === "en"
    ? [
        { label: "Custom professional web design", value: "€1,500", unit: "one-time" },
        { label: "Full mobile optimization", value: "€400", unit: "one-time" },
        { label: "Technical local SEO", value: "€900", unit: "one-time" },
        { label: "Optimized Google Business Profile", value: "€600", unit: "one-time" },
        { label: "Hosting and domain", value: "€240", unit: "per year" },
        { label: "Technical maintenance", value: "€600", unit: "per year" },
        { label: "Direct WhatsApp support", value: "€480", unit: "per year" },
        { label: "Monthly changes included", value: "€1,200", unit: "per year" },
        { label: "Reviews collection system", value: "€250", unit: "one-time" },
      ]
    : [
        { label: "Neurrira egindako web diseinu profesionala", value: "1.500€", unit: "behin" },
        { label: "Mugikorrerako optimizazio osoa", value: "400€", unit: "behin" },
        { label: "Tokiko SEO teknikoa", value: "900€", unit: "behin" },
        { label: "Google Business Profile optimizatua", value: "600€", unit: "behin" },
        { label: "Hostinga eta domeinua", value: "240€", unit: "urtero" },
        { label: "Mantentze-lan teknikoa", value: "600€", unit: "urtero" },
        { label: "WhatsApp bidezko zuzeneko laguntza", value: "480€", unit: "urtero" },
        { label: "Hileko aldaketak", value: "1.200€", unit: "urtero" },
        { label: "Iritziak biltzeko sistema", value: "250€", unit: "behin" },
      ];

  const marketRows = locale === "es"
    ? [
        { who: "Agencia local", price: "2.500 € – 5.000 € inicial", note: "Pagas todo de golpe. Mantenimiento y cambios, aparte.", highlight: false },
        { who: "Plantilla WordPress", price: "400 € – 800 €", note: "Plantilla genérica. Nada de SEO local. Sin soporte.", highlight: false },
        { who: "Wix / Squarespace", price: "200 € – 500 €/año", note: "Te quedas sin la web cuando dejas de pagar. Lenta en móvil.", highlight: false },
        { who: "Renting Web (Unax)", price: "0 € inicial + 149 €/mes", note: "Sin desembolso. Todo incluido. Soporte por WhatsApp.", highlight: true },
      ]
    : locale === "en"
    ? [
        { who: "Local agency", price: "€2,500 – €5,000 upfront", note: "You pay everything in one go. Maintenance and changes are extra.", highlight: false },
        { who: "WordPress template", price: "€400 – €800", note: "Generic template. No local SEO. No support.", highlight: false },
        { who: "Wix / Squarespace", price: "€200 – €500/year", note: "You lose the site when you stop paying. Slow on mobile.", highlight: false },
        { who: "Web Renting (Unax)", price: "€0 upfront + €149/mo", note: "No upfront cost. Everything included. WhatsApp support.", highlight: true },
      ]
    : [
        { who: "Tokiko agentzia", price: "2.500 € – 5.000 € hasieran", note: "Dena batera ordaintzen duzu. Mantentze-lana eta aldaketak, aparte.", highlight: false },
        { who: "WordPress txantiloia", price: "400 € – 800 €", note: "Txantiloi generikoa. Tokiko SEO eta laguntzarik gabe.", highlight: false },
        { who: "Wix / Squarespace", price: "200 € – 500 €/urte", note: "Ordaintzeari uzten diozunean, weba galtzen duzu.", highlight: false },
        { who: "Web Errentaria (Unax)", price: "0 € hasieran + 149 €/hilean", note: "Hasierako kosturik gabe. Dena barne. WhatsApp laguntza.", highlight: true },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://unaxaller.com/${locale}/precios#webpage`,
        name: locale === "es" ? "Precios — Unax Aller" : locale === "en" ? "Pricing — Unax Aller" : "Prezioak — Unax Aller",
        url: `https://unaxaller.com/${locale}/precios`,
        inLanguage: locale,
        isPartOf: { "@id": "https://unaxaller.com/#website" },
        mainEntity: { "@id": `https://unaxaller.com/${locale}/precios#product` },
      },
      {
        "@type": "Service",
        "@id": `https://unaxaller.com/${locale}/precios#product`,
        name: locale === "es" ? "Renting Web — Cuota mensual todo incluido" : locale === "en" ? "Web Renting — All-inclusive monthly fee" : "Web Errentaria — Hileko kuota dena barne",
        serviceType: locale === "es" ? "Web subscription for local business" : locale === "en" ? "Web subscription for local business" : "Web subscription for local business",
        description: locale === "es"
          ? "Web profesional para negocios locales con cuota mensual todo incluido: diseño, hosting, dominio, SEO local, Google Business Profile, sistema de reseñas y soporte por WhatsApp. 0€ inicial. 30 días de garantía de devolución. Permanencia 12 meses con cuota bloqueada. Valor del sistema el primer año: más de 6.700€."
          : locale === "en"
          ? "Professional website for local businesses with an all-inclusive monthly fee: design, hosting, domain, local SEO, Google Business Profile, reviews system and WhatsApp support. €0 upfront. 30-day money-back guarantee. 12-month price-locked term. First-year system value: over €6,700."
          : "Tokiko negozioentzako web profesionala hileko kuota guztiarekin: diseinua, hostinga, domeinua, tokiko SEOa, Google Business Profile, iritzien sistema eta WhatsApp laguntza. 0€ hasieran. 30 eguneko itzulketa bermea. 12 hilabeteko iraupena kuota blokeatuta.",
        provider: { "@id": "https://unaxaller.com/#business" },
        brand: { "@id": "https://unaxaller.com/#business" },
        category: locale === "es" ? "Diseño Web Renting" : locale === "en" ? "Web Renting" : "Web Errentaria",
        image: `https://unaxaller.com/${locale}/opengraph-image`,
        // The 9 line items that make up the bundle — gives Google explicit
        // visibility into what the cuota covers.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Lo que incluye el Renting Web" : locale === "en" ? "What Web Renting includes" : "Zer barne hartzen duen Web Errentariak",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Diseño web profesional a medida" : locale === "en" ? "Custom professional web design" : "Web diseinu profesional pertsonalizatua" }, price: "1500", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Optimización móvil completa" : locale === "en" ? "Full mobile optimization" : "Mugikorrerako optimizazio osoa" }, price: "400", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "SEO local técnico" : locale === "en" ? "Technical local SEO" : "Tokiko SEO teknikoa" }, price: "900", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Google Business Profile optimizado" : locale === "en" ? "Optimized Google Business Profile" : "Google Business Profile optimizatua" }, price: "600", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Hosting y dominio (1 año)" : locale === "en" ? "Hosting and domain (1 year)" : "Hostinga eta domeinua (1 urte)" }, price: "240", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Mantenimiento técnico (1 año)" : locale === "en" ? "Technical maintenance (1 year)" : "Mantentze-lan teknikoa (1 urte)" }, price: "600", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Soporte directo por WhatsApp (1 año)" : locale === "en" ? "Direct WhatsApp support (1 year)" : "WhatsApp bidezko zuzeneko laguntza (1 urte)" }, price: "480", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Cambios mensuales incluidos (1 año)" : locale === "en" ? "Monthly changes included (1 year)" : "Hileko aldaketak (1 urte)" }, price: "1200", priceCurrency: "EUR" },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: locale === "es" ? "Sistema de captación de reseñas" : locale === "en" ? "Reviews collection system" : "Iritzien sistema" }, price: "250", priceCurrency: "EUR" },
          ],
        },
        offers: {
          "@type": "Offer",
          "@id": `https://unaxaller.com/${locale}/precios#offer`,
          priceCurrency: "EUR",
          price: "149",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "149",
            priceCurrency: "EUR",
            unitCode: "MON",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
            billingDuration: { "@type": "QuantitativeValue", value: 18, unitCode: "MON" },
          },
          // 30-day money-back guarantee — schema.org property that surfaces in
          // some Google rich results and is read by AI search engines.
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "ES",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
          availability: "https://schema.org/InStock",
          validFrom: VALID_FROM,
          priceValidUntil: PRICE_VALID_UNTIL,
          eligibleRegion: [
            { "@type": "Country", name: "ES" },
            { "@type": "AdministrativeArea", name: "Gipuzkoa" },
            { "@type": "AdministrativeArea", name: "País Vasco" },
          ],
          seller: { "@id": "https://unaxaller.com/#business" },
          areaServed: [
            { "@type": "City", name: "Irun" },
            { "@type": "City", name: "Hondarribia" },
            { "@type": "City", name: "Donostia-San Sebastián" },
            { "@type": "AdministrativeArea", name: "Gipuzkoa" },
            { "@type": "AdministrativeArea", name: "País Vasco" },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          ratingCount: "5",
          reviewCount: "5",
        },
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
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak", item: `https://unaxaller.com/${locale}/precios` },
        ],
      },
    ],
  };

  return (
    <>
      <style>{`
        @keyframes prcFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes prcProgressBar { from{width:0%} to{width:100%} }
        @keyframes prcChipIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .prc-hero { position:relative;overflow:hidden;background:linear-gradient(180deg,var(--color-bg-muted) 0%,var(--color-bg) 100%);padding-block:var(--space-16); }
        .prc-hero-mark { position:absolute;top:-6rem;right:-6rem;width:520px;height:auto;opacity:.05;pointer-events:none;user-select:none;transform:rotate(-8deg); }
        @media(max-width:768px){ .prc-hero-mark{width:320px;top:-3rem;right:-4rem;opacity:.06} }
        .prc-hero-inner { position:relative;z-index:1;animation:prcFadeUp 0.7s cubic-bezier(.16,1,.3,1) both;max-width:780px; }
        .prc-chip { display:inline-flex;align-items:center;background:#fff;border:1px solid rgba(2, 6, 23, .12);color:var(--color-ink);border-radius:var(--radius-full);padding:.35rem .85rem;font-size:var(--text-xs);font-family:var(--font-sans);font-weight:500;animation:prcChipIn .6s cubic-bezier(.16,1,.3,1) .3s both;box-shadow:0 1px 2px rgba(2,6,23,.04); }
        .prc-chip--accent { background:var(--color-ink);color:#fff;border-color:var(--color-ink); }
        .prc-chips { display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-6); }
        .prc-progress-bar-wrap { width:100%;height:2px;background:rgba(3, 105, 161, .08);border-radius:var(--radius-full);overflow:hidden;margin-top:var(--space-10); }
        .prc-progress-bar { height:100%;background:linear-gradient(to right,var(--color-success),var(--color-accent),transparent);border-radius:var(--radius-full);animation:prcProgressBar 1.2s ease-out .4s both;width:0%; }
        .prc-includes-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-4); }
        @media(max-width:640px){ .prc-includes-grid{grid-template-columns:1fr} }
        .prc-include-item { position:relative;background:#fff;border:1px solid rgba(2, 6, 23, .08);border-radius:var(--radius-xl);padding:1.75rem;display:flex;flex-direction:column;gap:var(--space-3);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;overflow:hidden; }
        .prc-include-item::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:#dc2626;opacity:.85; }
        .prc-include-item:hover { transform:translateY(-2px);border-color:rgba(2, 6, 23, .15);box-shadow:0 12px 32px rgba(2,6,23,.08); }
        .prc-include-icon { display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:var(--radius-lg);background:color-mix(in srgb,#dc2626 10%,transparent);color:#dc2626;margin-bottom:var(--space-1);transition:transform .25s var(--ease-out),background-color .25s var(--ease-out); }
        .prc-include-item:hover .prc-include-icon { transform:scale(1.08) rotate(-3deg);background:color-mix(in srgb,#dc2626 16%,transparent); }
        .prc-include-title { font-family:var(--font-sans);font-size:var(--text-md);font-weight:600;color:var(--color-ink); }
        .prc-include-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed); }
        .prc-value-section { background:var(--color-bg-alt);padding-block:var(--space-16); }
        .prc-value-intro { text-align:center;color:var(--color-ink-muted);font-family:var(--font-sans);font-size:var(--text-md);max-width:640px;margin:0 auto var(--space-8);line-height:var(--lh-relaxed); }
        .prc-value-grid { display:flex;flex-direction:column;gap:var(--space-2);max-width:720px;margin:0 auto; }
        .prc-value-row { display:grid;grid-template-columns:1fr auto auto;gap:var(--space-4);align-items:center;padding:1rem 1.25rem;border-radius:var(--radius-lg);border:1px solid rgba(3, 105, 161, .10);background:var(--color-bg-alt);font-family:var(--font-sans);font-size:var(--text-sm); }
        @media(max-width:640px){ .prc-value-row{grid-template-columns:1fr auto;gap:var(--space-2) var(--space-3)} .prc-value-unit{grid-column:1 / -1;font-size:var(--text-xs);color:var(--color-ink-subtle);margin-top:-.25rem} }
        .prc-value-label { color:var(--color-ink); }
        .prc-value-amount { color:var(--color-ink-muted);font-variant-numeric:tabular-nums;font-weight:600; }
        .prc-value-unit { color:var(--color-ink-subtle);font-size:var(--text-xs);text-align:right;min-width:5rem; }
        .prc-value-total { display:flex;justify-content:space-between;align-items:center;gap:var(--space-4);padding:1.25rem;border-radius:var(--radius-lg);background:linear-gradient(90deg,rgba(4, 120, 87, .10),rgba(3, 105, 161, .06));border:1px solid rgba(4, 120, 87, .25);font-family:var(--font-sans);font-size:var(--text-md);margin-top:var(--space-3); }
        .prc-value-total-num { color:var(--color-success);font-weight:700;font-size:var(--text-lg);font-variant-numeric:tabular-nums }
        .prc-value-vs { text-align:center;margin-top:var(--space-4);font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed); }
        .prc-value-vs strong { color:var(--color-success) }
        .prc-market-section { background:var(--color-bg);padding-block:var(--space-16); }
        .prc-market-grid { display:flex;flex-direction:column;gap:var(--space-2); }
        .prc-market-row { display:grid;grid-template-columns:1fr 1fr 2fr;gap:var(--space-4);align-items:center;padding:1rem 1.25rem;border-radius:var(--radius-lg);border:1px solid rgba(3, 105, 161, .10);background:var(--color-bg-alt);font-family:var(--font-sans);font-size:var(--text-sm); }
        @media(max-width:640px){ .prc-market-row{grid-template-columns:1fr;gap:var(--space-1)} }
        .prc-market-row--highlight { background:linear-gradient(90deg,rgba(4, 120, 87, .06) 0%,rgba(3, 105, 161, .04) 100%);border-color:rgba(3, 105, 161, .2);border-left:3px solid var(--color-success); }
        .prc-market-who { color:var(--color-ink);font-weight:600; }
        .prc-market-price { color:var(--color-ink-muted); }
        .prc-market-row--highlight .prc-market-price { color:var(--color-success);font-weight:700; }
        .prc-market-note { color:rgba(2, 6, 23, .40);font-size:var(--text-xs); }
        .prc-faq-section { background:var(--color-bg-alt);padding-block:var(--space-16); }
        .prc-cta-section { background:var(--color-ink);color:#fff;padding-block:var(--space-16);text-align:center;position:relative;overflow:hidden; }
        .prc-cta-section::before { content:'';position:absolute;top:-6rem;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(220,38,38,.12) 0%,transparent 60%);pointer-events:none; }
        .prc-cta-inner { position:relative;z-index:1; }
        .prc-cta-section .lp-eyebrow { color:#dc2626; }
        .prc-cta-section h2 { color:#fff;font-family:var(--font-serif); }
        .prc-cta-section .prc-cta-lead { color:rgba(255,255,255,.72); }
        .prc-cta-footnote { margin-top:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(255,255,255,.5); }
        /* Button overrides for dark CTA section */
        .prc-cta-section .btn-primary { background:#dc2626;color:#fff;border-color:#dc2626;box-shadow:0 8px 24px rgba(220,38,38,.35); }
        .prc-cta-section .btn-primary:hover { background:#ef4444;border-color:#ef4444;box-shadow:0 12px 32px rgba(220,38,38,.45);transform:translateY(-2px); }
        .prc-cta-section .btn-primary:active { transform:translateY(0); }
        .prc-cta-section .btn-secondary { background:transparent;color:#fff;border-color:rgba(255,255,255,.25); }
        .prc-cta-section .btn-secondary:hover { background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.5);color:#fff;transform:translateY(-2px); }
        .prc-cta-section .btn-secondary:active { transform:translateY(0);background:rgba(255,255,255,.12); }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="prc-hero" aria-label={locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak"}>
        <Image
          src="/images/brand/logo-mark.webp"
          alt=""
          width={602}
          height={359}
          className="prc-hero-mark"
          aria-hidden="true"
          priority={false}
        />
        <div className="container-xl">
          <div className="prc-hero-inner">
            <Breadcrumbs
              items={[
                { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
                { name: locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak" },
              ]}
            />
            <p className="lp-eyebrow" style={{ marginTop: "var(--space-6)" }}>
              {locale === "es" ? "Renting Web" : locale === "en" ? "Web Renting" : "Web Errentaria"}
            </p>
            <h1 className="page-hero-title" style={{ fontFamily: "var(--font-serif)" }}>
              {locale === "es"
                ? "Tu web profesional. Sin pagar 2.000€ de golpe."
                : locale === "en"
                ? "Your professional site. Without paying €2,000 upfront."
                : "Zure web profesionala. 2.000€ batera ordaindu gabe."}
            </h1>
            <p className="page-hero-subtitle">
              {locale === "es"
                ? "149€/mes, 0€ al firmar, 30 días de garantía. Una cuota fija como la del gestor — y tu web empieza a traer clientes desde el primer día."
                : locale === "en"
                ? "€149/month, €0 to sign, 30-day money-back guarantee. A flat fee like your accountant — and your site starts bringing in clients from day one."
                : "149€/hilean, 0€ sinatzean, 30 eguneko bermea. Gestorearena bezalako kuota finkoa — eta webak lehen egunetik bezeroak ekartzen ditu."}
            </p>
            <div className="prc-chips">
              <span className="prc-chip prc-chip--accent">{locale === "es" ? "149€/mes · 0€ inicial" : locale === "en" ? "€149/mo · €0 upfront" : "149€/hil · 0€ hasieran"}</span>
              <span className="prc-chip">{locale === "es" ? "30 días garantía" : locale === "en" ? "30-day guarantee" : "30 eguneko bermea"}</span>
              <span className="prc-chip">{locale === "es" ? "Permanencia 12 meses" : locale === "en" ? "12-month term" : "12 hilabete iraupena"}</span>
              <span className="prc-chip">{locale === "es" ? "Cambios mensuales incluidos" : locale === "en" ? "Monthly changes included" : "Hileko aldaketak barne"}</span>
            </div>
            <div className="prc-progress-bar-wrap" aria-hidden="true">
              <div className="prc-progress-bar" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING CARD ── */}
      <PricingCard locale={locale} />

      {/* ── GARANTÍA ROTUNDA ── */}
      <GuaranteeBlock locale={locale} />

      {/* ── QUÉ INCLUYE ── */}
      <AnimatedSection>
        <section aria-labelledby="includes-title" style={{ paddingBlock: "var(--space-16)" }}>
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "Lo que recibes" : locale === "en" ? "What you get" : "Zer jasotzen duzun"}
            </p>
            <h2 id="includes-title" className="section-heading" style={{ marginBottom: "var(--space-10)" }}>
              {locale === "es" ? "Cuatro cosas que mueven la aguja en negocio local" : locale === "en" ? "Four things that move the needle in local business" : "Tokiko negozioan eragiten duten lau gauza"}
            </h2>
            <div className="prc-includes-grid">
              {includesItems.map((item, i) => (
                <div key={i} className="prc-include-item">
                  <div className="prc-include-icon" aria-hidden="true">{INCLUDE_ICONS[item.icon]}</div>
                  <div className="prc-include-title">{item.title}</div>
                  <p className="prc-include-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── DESGLOSE 6.700€ ── */}
      <AnimatedSection>
        <section className="prc-value-section" aria-labelledby="value-title">
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)", textAlign: "center" }}>
              {locale === "es" ? "Valor del sistema" : locale === "en" ? "System value" : "Sistemaren balioa"}
            </p>
            <h2 id="value-title" className="section-heading" style={{ marginBottom: "var(--space-6)", textAlign: "center" }}>
              {locale === "es"
                ? "Más de 6.700€ de servicios. Por 149€ al mes."
                : locale === "en"
                ? "Over €6,700 in services. For €149/month."
                : "6.700€-tik gorako zerbitzuak. 149€/hileko."}
            </h2>
            <PackageVisual locale={locale} />
            <p className="prc-value-intro">
              {locale === "es"
                ? "Gracias a las herramientas que uso a puerta cerrada, el tiempo de desarrollo se ha reducido muchísimo. Eso me permite ofrecerte el sistema completo por una cuota fija accesible — y a ti, contratar a profesional sin tener que ahorrar 3.000€ antes."
                : locale === "en"
                ? "Thanks to the tools I use behind the scenes, development time has dropped a lot. That lets me offer the full system for an accessible flat fee — and you, hire a professional without having to save €3,000 first."
                : "Atea itxita erabiltzen ditudan tresnei esker, garatzeko denbora asko murriztu da. Horri esker, sistema osoa kuota finko eskuragarrian eskaini diezazuket — eta zuk, profesional bat kontratatu 3.000€ aurreztu behar izan gabe."}
            </p>
            <div className="prc-value-grid">
              {valueBreakdown.map((row, i) => (
                <div key={i} className="prc-value-row">
                  <span className="prc-value-label">{row.label}</span>
                  <span className="prc-value-amount">{row.value}</span>
                  <span className="prc-value-unit">{row.unit}</span>
                </div>
              ))}
              <div className="prc-value-total">
                <span>
                  {locale === "es" ? "Valor total el primer año" : locale === "en" ? "Total first-year value" : "Lehen urteko balioa guztira"}
                </span>
                <span className="prc-value-total-num">
                  {locale === "en" ? "€6,770+" : "6.770€+"}
                </span>
              </div>
              <p className="prc-value-vs">
                {locale === "es"
                  ? <>Tú pagas <strong>149€ × 12 = 1.788€</strong> el primer año. Te ahorras casi 5.000€ y empiezas sin desembolsar ni un euro.</>
                  : locale === "en"
                  ? <>You pay <strong>€149 × 12 = €1,788</strong> the first year. You save nearly €5,000 and start without spending a single euro.</>
                  : <>Zuk <strong>149€ × 12 = 1.788€</strong> ordaintzen duzu lehen urtean. Ia 5.000€ aurrezten dituzu eta euro bat ere gastatu gabe hasten zara.</>}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── TABLA DE MERCADO ── */}
      <AnimatedSection>
        <section className="prc-market-section" aria-labelledby="pricing-context-title">
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "Cómo se compara" : locale === "en" ? "How it compares" : "Nola konparatzen den"}
            </p>
            <h2 id="pricing-context-title" className="section-heading" style={{ marginBottom: "var(--space-8)" }}>
              {locale === "es"
                ? "Lo que cobran otros por lo mismo (o menos)"
                : locale === "en"
                ? "What others charge for the same (or less)"
                : "Beste batzuk gauza beragatik (edo gutxiagogatik) zer kobratzen duten"}
            </h2>
            <div className="prc-market-grid">
              {marketRows.map((row, i) => (
                <div key={i} className={`prc-market-row${row.highlight ? " prc-market-row--highlight" : ""}`}>
                  <div className="prc-market-who">{row.who}</div>
                  <div className="prc-market-price">{row.price}</div>
                  <div className="prc-market-note">{row.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── FAQ ── */}
      <AnimatedSection>
        <section className="prc-faq-section" aria-label={locale === "es" ? "Preguntas sobre el precio" : locale === "en" ? "Pricing questions" : "Prezioari buruzko galderak"}>
          <div className="container-xl">
            <div className="faq-wrap">
              <h2 className="section-heading">
                {locale === "es" ? "Preguntas sobre el precio" : locale === "en" ? "Pricing questions" : "Prezioari buruzko galderak"}
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
      <section className="prc-cta-section" aria-labelledby="cta-precios-title">
        <div className="container-xl prc-cta-inner">
          <p className="lp-eyebrow" style={{ marginBottom: "var(--space-4)" }}>
            {locale === "es" ? "Sin firmar nada. Sin pagar nada." : locale === "en" ? "No paperwork. No upfront payment." : "Ezer sinatu gabe. Ezer ordaindu gabe."}
          </p>
          <h2 id="cta-precios-title" className="section-heading" style={{ marginBottom: "var(--space-4)", maxWidth: "780px", marginInline: "auto" }}>
            {locale === "es"
              ? "Hablemos 30 minutos. Te enseño qué cambiarías."
              : locale === "en"
              ? "Let's talk for 30 minutes. I show you what to change."
              : "30 minutuz hitz egin dezagun. Erakusten dizut zer aldatu."}
          </h2>
          <p className="prc-cta-lead" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", marginBottom: "var(--space-8)", maxWidth: "640px", marginInline: "auto", lineHeight: "var(--lh-relaxed)" }}>
            {locale === "es"
              ? "Por teléfono o por un café. Te enseño cómo te está quitando llamadas tu competencia en Google y qué haría yo en tu sector."
              : locale === "en"
              ? "On the phone or over coffee. I show you how competitors are taking calls from you on Google and what I'd do in your sector."
              : "Telefonoz edo kafe baten. Erakusten dizut lehiakideek nola kentzen dizkizuten deiak Googlen eta zer egingo nukeen zure sektorean."}
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/contacto`} className="btn btn-primary btn-lg focusable">
              {locale === "es" ? "Pedir auditoría gratis →" : locale === "en" ? "Request free audit →" : "Doako auditoria eskatu →"}
            </Link>
            <a
              href="https://wa.me/34620909916?text=Hola%20Unax%2C%20me%20interesa%20el%20Renting%20Web%20de%20149%E2%82%AC%2Fmes"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg focusable"
            >
              {locale === "es" ? "WhatsApp directo" : locale === "en" ? "WhatsApp direct" : "WhatsApp zuzena"}
            </a>
          </div>
          <p className="prc-cta-footnote">
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
