// Pricing copy for the single-plan offer.
//   · One website, one price: 1.300€ + IVA, paid once.
//   · First year of maintenance (domain, hosting, support, changes) included.
//   · From year 2: 600€/year (≈50€/month) to keep it online and looked after.
//   · Anchor is UPWARD now: a local agency charges 2.500–5.000€ just for the
//     design, so 1.300€ with the first year solved reads as a deal.
//   · Hook turns the owner's real objection ("they forget they even have a
//     website") into the promise: it works while you forget about it.

import type { Locale } from "@/lib/i18n/config";
import type { PlanDetail } from "@/components/pricing/PlanModal";

type Feature = { label: string; on: boolean };

export type PricingPlan = {
  id: string;
  variant: "default" | "star" | "decoy";
  name: string;
  tagline: string;
  strikePrice?: string;
  priceNum: string;
  priceUnit?: string;
  upfront: string;
  upfrontMuted?: boolean;
  priceNote?: string;
  reframe?: string;
  features: Feature[];
  cta: string;
  whatsapp: string;
  detail?: PlanDetail;
};

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  recommended: string;
  seeDetail: string;
  note: string;
  strikeLabel: string;
};

export function planCopy(locale: Locale): Copy {
  if (locale === "en") {
    return {
      eyebrow: "One price, no surprises",
      title: "Your website, working while you forget it's there.",
      subtitle:
        "I build it once and it stays ready for people to find you on Google. One payment of €1,300 + VAT, with the whole first year looked after.",
      recommended: "What you pay",
      strikeLabel: "what an agency would charge for this",
      seeDetail: "See everything included",
      note: "Price shown is €1,300 + VAT, paid once. It includes the first year of maintenance: domain, hosting, content changes and WhatsApp support. From the second year, maintenance is €600/year (≈€50/month, billed yearly) to keep the site online, the domain renewed and your Google profile looked after. The domain is registered in your name and is yours from day one. 30-day money-back guarantee from launch.",
    };
  }
  if (locale === "eu") {
    return {
      eyebrow: "Prezio bat, sorpresarik gabe",
      title: "Zure weba lanean, ahaztu zaizun arren.",
      subtitle:
        "Behin egiten dut eta prest geratzen da jendeak Google-n aurki zaitzan. 1.300€ + BEZ ordainketa bakarrean, lehen urte osoa zainduta.",
      recommended: "Zer ordaintzen duzun",
      strikeLabel: "agentzia batek honengatik kobratuko lukeena",
      seeDetail: "Sartzen den guztia ikusi",
      note: "Erakutsitako prezioa 1.300€ + BEZ da, behin ordaindua. Lehen urteko mantentze-lana barne dauka: domeinua, hostinga, edukiaren aldaketak eta WhatsApp laguntza. Bigarren urtetik aurrera, mantentze-lana 600€/urteko da (≈50€/hilean, urtero fakturatua) weba sarean, domeinua berrituta eta zure Google fitxa zainduta edukitzeko. Domeinua zure izenean erregistratzen da eta zurea da lehen egunetik. 30 eguneko itzulketa-bermea abian jartzen denetik.",
    };
  }
  return {
    eyebrow: "Un precio, sin sorpresas",
    title: "Tu web trabajando, aunque tú te olvides de ella.",
    subtitle:
      "La hago una vez y queda lista para que te encuentren en Google. Un pago de 1.300€ + IVA, con el primer año entero resuelto.",
    recommended: "Lo que pagas",
    strikeLabel: "lo que cobraría una agencia por esto",
    seeDetail: "Ver todo lo que incluye",
    note: "El precio que ves es 1.300€ + IVA, pagados una vez. Incluye el primer año de mantenimiento: dominio, hosting, cambios de contenido y soporte por WhatsApp. A partir del segundo año, el mantenimiento es de 600€/año (≈50€/mes, facturado una vez al año) para tener la web online, el dominio renovado y tu ficha de Google cuidada. El dominio se registra a tu nombre y es tuyo desde el primer día. 30 días de garantía de devolución desde el lanzamiento.",
  };
}

const CLIENTS = (locale: Locale) => [
  { name: "Farmacia Fernández Bera", url: "https://farmaciafernandezbera.com", domain: "farmaciafernandezbera.com", type: locale === "es" ? "Farmacia · Bera" : locale === "en" ? "Pharmacy · Bera" : "Farmazia · Bera" },
  { name: "Motos Arretxe", url: "https://motosarretxe.com", domain: "motosarretxe.com", type: locale === "es" ? "Taller y concesionario · Irun" : locale === "en" ? "Workshop & dealer · Irun" : "Tailerra eta kontzesionarioa · Irun" },
  { name: "Anaka Óptica", url: "https://anakaoptica.com", domain: "anakaoptica.com", type: locale === "es" ? "Óptica · Irun" : locale === "en" ? "Optician · Irun" : "Optika · Irun" },
];

export function buildPlans(locale: Locale): PricingPlan[] {
  const clients = CLIENTS(locale);

  if (locale === "en") {
    return [
      {
        id: "web",
        variant: "star",
        name: "Your website, done",
        tagline: "You pay once. The first year, you don't touch a thing.",
        strikePrice: "€6,170",
        priceNum: "€1,300",
        upfront: "+ VAT · paid once",
        priceNote: "First year of maintenance included. From year 2: €600/year (≈€50/month).",
        reframe: "A local agency charges €2,500–5,000 just for the design. Here you get it with the whole first year solved.",
        features: [
          { label: "Hand-built site, live in a week", on: true },
          { label: "Custom design built to capture from a phone", on: true },
          { label: "Google Maps profile + 5-star review system", on: true },
          { label: "Domain + hosting included the first year", on: true },
          { label: "Content changes included the first year (text, photos, prices, hours)", on: true },
          { label: "Same-day WhatsApp support", on: true },
          { label: "The site is yours. No monthly fee — just yearly maintenance from year 2.", on: true },
        ],
        cta: "I want my website →",
        whatsapp: "Hi Unax, I'm interested in the website (€1,300 + VAT, first year included)",
        detail: {
          name: "Your website, done",
          subtitle: "One payment, with the first year looked after",
          price: "€1,300 + VAT",
          description:
            "Paid once. Includes the first year of maintenance: domain, hosting, content changes and same-day WhatsApp support. From the second year, maintenance is €600/year (≈€50/month) to keep it online and looked after. The domain is yours from day one. 30-day money-back guarantee.",
          popular: true,
          features: [
            "Professional custom design built around your business",
            "Up to 5 sections (home, services, about, contact, reviews)",
            "Mobile-optimized: most of your customers search from a phone",
            "Google Maps profile optimized to capture phone calls",
            "Reviews system: direct link, printable QR and optimized Google profile",
            "Same-day WhatsApp support the first year for price, photo or hours changes",
          ],
          deliverables: [
            "Domain registered in your name (yours from day one)",
            "Hosting included the first year (no extra invoices)",
            "SSL certificate and speed optimization",
            "Content changes included the first year",
          ],
          process: [],
          clients,
        },
      },
    ];
  }

  if (locale === "eu") {
    return [
      {
        id: "web",
        variant: "star",
        name: "Zure weba, eginda",
        tagline: "Behin ordaintzen duzu. Lehen urtean, ez duzu ezer ukitzen.",
        strikePrice: "6.170€",
        priceNum: "1.300€",
        upfront: "+ BEZ · behin ordaindua",
        priceNote: "Lehen urteko mantentze-lana barne. 2. urtetik: 600€/urteko (≈50€/hilean).",
        reframe: "Tokiko agentzia batek 2.500–5.000€ kobratzen ditu diseinuagatik bakarrik. Hemen lehen urte osoa konponduta daukazu.",
        features: [
          { label: "Eskuz egindako weba, aste batean sarean", on: true },
          { label: "Mugikorretik harrapatzeko neurrira egindako diseinua", on: true },
          { label: "Google Maps fitxa + 5 izarreko iritzi sistema", on: true },
          { label: "Domeinua + hostinga barne lehen urtean", on: true },
          { label: "Edukiaren aldaketak barne lehen urtean (testua, argazkiak, prezioak, ordutegiak)", on: true },
          { label: "Egun bereko WhatsApp laguntza", on: true },
          { label: "Weba zurea da. Hileko kuotarik gabe — 2. urtetik soilik urteko mantentze-lana.", on: true },
        ],
        cta: "Nire weba nahi dut →",
        whatsapp: "Kaixo Unax, weba interesatzen zait (1.300€ + BEZ, lehen urtea barne)",
        detail: {
          name: "Zure weba, eginda",
          subtitle: "Ordainketa bakarra, lehen urtea zainduta",
          price: "1.300€ + BEZ",
          description:
            "Behin ordaindua. Lehen urteko mantentze-lana barne dauka: domeinua, hostinga, edukiaren aldaketak eta egun bereko WhatsApp laguntza. Bigarren urtetik aurrera, mantentze-lana 600€/urteko da (≈50€/hilean) sarean eta zainduta edukitzeko. Domeinua zurea da lehen egunetik. 30 eguneko itzulketa-bermea.",
          popular: true,
          features: [
            "Zure negoziorako diseinu profesional pertsonalizatua",
            "5 atal arte (hasiera, zerbitzuak, zuri buruz, harremana, iritziak)",
            "Mugikorrerako optimizatua: bezero gehienek mugikorretik bilatzen zaituzte",
            "Google Maps fitxa optimizatua deiak hartzeko",
            "Iritzi sistema: zuzeneko esteka, QR inprimagarria eta Google profil optimizatua",
            "Egun bereko WhatsApp laguntza lehen urtean prezio, argazki edo ordutegi aldaketetarako",
          ],
          deliverables: [
            "Domeinua zure izenean erregistratua (zurea lehen egunetik)",
            "Hostinga barne lehen urtean (faktura gehigarririk gabe)",
            "SSL ziurtagiria eta abiadura optimizatua",
            "Edukiaren aldaketak barne lehen urtean",
          ],
          process: [],
          clients,
        },
      },
    ];
  }

  // es (default)
  return [
    {
      id: "web",
      variant: "star",
      name: "Tu web, hecha",
      tagline: "Pagas una vez. El primer año, no tocas nada.",
      strikePrice: "6.170€",
      priceNum: "1.300€",
      upfront: "+ IVA · pago único",
      priceNote: "Primer año de mantenimiento incluido. A partir del año 2: 600€/año (≈50€/mes).",
      reframe: "Una agencia cobra 2.500–5.000€ solo por el diseño. Aquí la tienes con el primer año entero resuelto.",
      features: [
        { label: "La web programada a mano, online en una semana", on: true },
        { label: "Diseño a medida pensado para captar desde el móvil", on: true },
        { label: "Ficha de Google Maps + sistema de reseñas 5★", on: true },
        { label: "Dominio + hosting incluidos el primer año", on: true },
        { label: "Cambios de contenido incluidos el primer año (textos, fotos, precios, horarios)", on: true },
        { label: "Soporte por WhatsApp el mismo día", on: true },
        { label: "La web es tuya. Sin cuota mensual — solo el mantenimiento anual desde el 2º año.", on: true },
      ],
      cta: "Quiero mi web →",
      whatsapp: "Hola Unax, me interesa la web (1.300€ + IVA, primer año incluido)",
      detail: {
        name: "Tu web, hecha",
        subtitle: "Un solo pago, con el primer año resuelto",
        price: "1.300€ + IVA",
        description:
          "Pago único. Incluye el primer año de mantenimiento: dominio, hosting, cambios de contenido y soporte por WhatsApp el mismo día. A partir del segundo año, el mantenimiento es de 600€/año (≈50€/mes) para tenerla online y cuidada. El dominio es tuyo desde el primer día. 30 días de garantía de devolución.",
        popular: true,
        features: [
          "Diseño profesional a medida para tu negocio",
          "Hasta 5 secciones (inicio, servicios, sobre ti, contacto, reseñas)",
          "Optimizada para móvil: la mayoría de tus clientes te buscan desde el teléfono",
          "Ficha de Google Maps optimizada para captar llamadas",
          "Sistema de reseñas: enlace directo, QR imprimible y perfil de Google optimizado",
          "Soporte por WhatsApp el mismo día el primer año: precios, fotos u horarios",
        ],
        deliverables: [
          "Dominio registrado a tu nombre (tuyo desde el primer día)",
          "Hosting incluido el primer año (sin facturas extra)",
          "Certificado SSL y velocidad optimizada",
          "Cambios de contenido incluidos el primer año",
        ],
        process: [],
        clients,
      },
    },
  ];
}
