// Pricing copy for the 3-tier offer (Plan Todo Incluido / Pago único / Solo web).
// Structured around the Hormozi + behavioural-psychology playbook:
//   · Anchoring  — the one-off price (1.500€) sits ABOVE ~10 months of renting,
//     so the monthly plan no longer looks like "the expensive one".
//   · Zero-price — "0€ hoy" headlines the star plan.
//   · Decoy      — "Solo web" (1.300€, nothing included) makes the all-in plan
//     obviously better; nobody is meant to pick it.
//   · Mental accounting — "menos de 5€ al día" reframe on the star plan.
//   · Paradox of choice — exactly 3 options, one flagged "Recomendado".

import type { Locale } from "@/lib/i18n/config";
import type { PlanDetail } from "@/components/pricing/PlanModal";

type Feature = { label: string; on: boolean };

export type PricingPlan = {
  id: string;
  variant: "default" | "star" | "decoy";
  name: string;
  tagline: string;
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
};

export function planCopy(locale: Locale): Copy {
  if (locale === "en") {
    return {
      eyebrow: "Transparent pricing",
      title: "One website. Three ways to pay for it.",
      subtitle:
        "Same hand-built site in every plan. The difference is who looks after it and how you pay. Most businesses pick All-Inclusive: nothing upfront, and I take care of everything for as long as you use it.",
      recommended: "Recommended",
      seeDetail: "See everything included",
      note: "All plans include the exact site you saw in the demo. VAT not included. The All-Inclusive plan runs on my system: while your subscription is active you keep the site online, the Google Maps ranking watched and same-day WhatsApp support. No lock-in: the only commitment is a 3-month minimum activation period (it covers domain setup, local SEO and the Google profile); from the fourth month you cancel whenever you want. “Unlimited changes” means content (text, photos, prices, hours), not a full structural redesign.",
    };
  }
  if (locale === "eu") {
    return {
      eyebrow: "Prezio gardena",
      title: "Web bat. Ordaintzeko hiru modu.",
      subtitle:
        "Eskuz egindako web bera plan guztietan. Aldea da nork zaintzen duen eta nola ordaintzen duzun. Negozio gehienek Dena Barne aukeratzen dute: ezer aurreratu gabe, eta nik dena zaintzen dut erabiltzen duzun bitartean.",
      recommended: "Gomendatua",
      seeDetail: "Sartzen den guztia ikusi",
      note: "Plan guztiek demoan ikusi duzun web bera dute. BEZ kanpo. Dena Barne plana nire sisteman doa: kuota mantentzen duzun bitartean weba sarean, Google Maps posizioa zainduta eta egun bereko WhatsApp laguntza dituzu. Iraupenik gabe: konpromiso bakarra 3 hilabeteko gutxieneko aktibazioa da (domeinuaren altak, tokiko SEOak eta Google fitxak estaltzen ditu); laugarren hilabetetik aurrera nahi duzunean baja ematen duzu. “Aldaketa mugagabeak” edukia da (testua, argazkiak, prezioak, ordutegiak), ez egitura osoaren birdiseinua.",
    };
  }
  return {
    eyebrow: "Precio transparente",
    title: "Una web. Tres formas de pagarla.",
    subtitle:
      "La misma web programada a mano en los tres planes. Lo que cambia es quién se encarga de ella y cómo pagas. La mayoría elige Todo Incluido: no pagas nada al empezar y yo me ocupo de todo mientras la uses.",
    recommended: "Recomendado",
    seeDetail: "Ver todo lo que incluye",
    note: "Los tres planes incluyen la misma web que has visto en la demo. IVA no incluido. El plan Todo Incluido va sobre mi sistema: mientras mantengas la cuota, tu web sigue online, tu posición en Google Maps vigilada y el soporte por WhatsApp el mismo día. Sin permanencia: el único compromiso es un mínimo de 3 meses de activación (cubre el alta de dominio, el SEO local y la ficha de Google); a partir del cuarto mes cancelas cuando quieras. “Cambios ilimitados” se refiere a contenido (textos, fotos, precios, horarios), no a un rediseño estructural completo.",
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
        id: "starter",
        variant: "default",
        name: "Web only",
        tagline: "Just the site. You handle the rest.",
        priceNum: "€1,300",
        upfront: "One-off · no support afterwards",
        upfrontMuted: true,
        priceNote: "You arrange your own hosting, domain and changes.",
        features: [
          { label: "The hand-built site, delivered once", on: true },
          { label: "You sort out hosting & domain yourself", on: false },
          { label: "No monthly changes", on: false },
          { label: "No WhatsApp support", on: false },
          { label: "No Google Maps setup or review system", on: false },
        ],
        cta: "Ask about this option",
        whatsapp: "Hi Unax, I'm interested in the €1,300 web-only option",
      },
      {
        id: "all-inclusive",
        variant: "star",
        name: "All-Inclusive",
        tagline: "Nothing upfront. I take care of everything.",
        priceNum: "€149",
        priceUnit: "/month",
        upfront: "€0 to start today",
        priceNote: "No lock-in · cancel whenever you want · 30-day money-back guarantee",
        reframe: "Less than €5 a day. One new client a month and it has paid for itself.",
        features: [
          { label: "The hand-built site, live in 7–10 days", on: true },
          { label: "Domain + hosting included for as long as you use it", on: true },
          { label: "Unlimited content changes (text, photos, prices, hours)", on: true },
          { label: "Same-day WhatsApp support", on: true },
          { label: "Google Maps profile + 5-star review system", on: true },
          { label: "No lock-in: cancel whenever you want", on: true },
        ],
        cta: "Start with €0 today",
        whatsapp: "Hi Unax, I'm interested in the All-Inclusive plan (€149/month, €0 upfront)",
        detail: {
          name: "All-Inclusive",
          subtitle: "Your professional site with no upfront payment",
          price: "€149/mo",
          description:
            "€0 to start. Fixed €149/month with no lock-in: cancel whenever you want. 30-day money-back guarantee. While your subscription is active: site online, Google Maps ranking watched and full same-day WhatsApp support.",
          popular: true,
          features: [
            "Professional custom design built around your business",
            "Up to 5 sections (home, services, about, contact, reviews)",
            "Mobile-optimized: most of your customers search from a phone",
            "Google Maps profile optimized and monitored every month",
            "Automatic system to bring in 5-star reviews",
            "Same-day WhatsApp support for price, photo or hours changes",
          ],
          deliverables: [
            "Domain & hosting included (no extra invoices)",
            "Google Business Profile set up to capture phone calls",
            "SSL certificate and speed optimization",
            "Unlimited content changes, no extra cost",
          ],
          process: [],
          clients,
        },
      },
      {
        id: "one-off",
        variant: "default",
        name: "One-off purchase",
        tagline: "The site is yours forever, in one payment.",
        priceNum: "€1,500",
        upfront: "Paid once · first year managed",
        priceNote: "Domain + hosting included the first year.",
        features: [
          { label: "The hand-built site, yours to own", on: true },
          { label: "Domain + hosting the first year", on: true },
          { label: "Changes after delivery quoted separately", on: false },
          { label: "No included WhatsApp support", on: false },
          { label: "No monthly fee, you pay once", on: true },
        ],
        cta: "Ask about buying outright",
        whatsapp: "Hi Unax, I'm interested in the €1,500 one-off website",
      },
    ];
  }

  if (locale === "eu") {
    return [
      {
        id: "starter",
        variant: "decoy",
        name: "Web soila",
        tagline: "Weba bakarrik. Gainerakoa zuk.",
        priceNum: "1.300€",
        upfront: "Behin · gero laguntzarik gabe",
        upfrontMuted: true,
        priceNote: "Hostinga, domeinua eta aldaketak zuk antolatzen dituzu.",
        features: [
          { label: "Eskuz egindako weba, behin entregatua", on: true },
          { label: "Hostinga eta domeinua zuk kudeatzen dituzu", on: false },
          { label: "Hileko aldaketarik ez", on: false },
          { label: "WhatsApp laguntzarik ez", on: false },
          { label: "Google Maps eta iritzi sistemarik ez", on: false },
        ],
        cta: "Aukera honi buruz galdetu",
        whatsapp: "Kaixo Unax, 1.300€-ko web soilaren aukera interesatzen zait",
      },
      {
        id: "all-inclusive",
        variant: "star",
        name: "Dena Barne",
        tagline: "Ezer aurreratu gabe. Nik dena zaintzen dut.",
        priceNum: "149€",
        priceUnit: "/hilean",
        upfront: "0€ gaur hasteko",
        priceNote: "Iraupenik gabe · nahi duzunean baja eman · 30 eguneko bermea",
        reframe: "Egunean 5€ baino gutxiago. Hilean bezero berri bat eta ordainduta dago.",
        features: [
          { label: "Eskuz egindako weba, 7–10 egunean sarean", on: true },
          { label: "Domeinua + hostinga barne erabiltzen duzun bitartean", on: true },
          { label: "Edukiaren aldaketa mugagabeak (testua, argazkiak, prezioak)", on: true },
          { label: "Egun bereko WhatsApp laguntza", on: true },
          { label: "Google Maps fitxa + 5 izarreko iritzi sistema", on: true },
          { label: "Iraupenik gabe: nahi duzunean baja eman", on: true },
        ],
        cta: "Hasi 0€-rekin gaur",
        whatsapp: "Kaixo Unax, Dena Barne plana interesatzen zait (149€/hilean, 0€ hasieran)",
        detail: {
          name: "Dena Barne",
          subtitle: "Zure web profesionala hasieran ezer ordaindu gabe",
          price: "149€/hilean",
          description:
            "0€ hasieran. 149€/hileko kuota finkoa, iraupenik gabe: nahi duzunean baja eman. 30 eguneko bermea. Kuota mantentzen duzun bitartean: weba sarean, Google Maps posizioa zainduta eta egun bereko WhatsApp laguntza osoa.",
          popular: true,
          features: [
            "Zure negoziorako diseinu profesional pertsonalizatua",
            "5 atal arte (hasiera, zerbitzuak, zuri buruz, harremana, iritziak)",
            "Mugikorrerako optimizatua: bezero gehienek mugikorretik bilatzen zaituzte",
            "Google Maps fitxa optimizatua eta hilero zainduta",
            "5 izarreko iritziak lortzeko sistema automatikoa",
            "Egun bereko WhatsApp laguntza prezio, argazki edo ordutegi aldaketetarako",
          ],
          deliverables: [
            "Domeinua eta hostinga barne (faktura gehigarririk gabe)",
            "Google Business Profile fitxa deiak hartzeko prest",
            "SSL ziurtagiria eta abiadura optimizatua",
            "Edukiaren aldaketa mugagabeak, kostu gehigarririk gabe",
          ],
          process: [],
          clients,
        },
      },
      {
        id: "one-off",
        variant: "default",
        name: "Ordainketa bakarra",
        tagline: "Weba zurea betiko, ordainketa batean.",
        priceNum: "1.500€",
        upfront: "Behin ordaindua · lehen urtea kudeatua",
        priceNote: "Domeinua + hostinga barne lehen urtean.",
        features: [
          { label: "Eskuz egindako weba, zurea izateko", on: true },
          { label: "Domeinua + hostinga lehen urtean", on: true },
          { label: "Entregaren ondorengo aldaketak aparte", on: false },
          { label: "WhatsApp laguntza barne gabe", on: false },
          { label: "Hileko kuotarik gabe, behin ordaintzen duzu", on: true },
        ],
        cta: "Erosteari buruz galdetu",
        whatsapp: "Kaixo Unax, 1.500€-ko ordainketa bakarreko weba interesatzen zait",
      },
    ];
  }

  // es (default)
  return [
    {
      id: "starter",
      variant: "decoy",
      name: "Solo web",
      tagline: "Solo la web. Tú te buscas el resto.",
      priceNum: "1.300€",
      upfront: "Pago único · sin soporte después",
      upfrontMuted: true,
      priceNote: "Tú te ocupas de hosting, dominio y cambios.",
      features: [
        { label: "La web programada a mano, entregada una vez", on: true },
        { label: "Hosting y dominio los gestionas tú", on: false },
        { label: "Sin cambios mensuales", on: false },
        { label: "Sin soporte por WhatsApp", on: false },
        { label: "Sin Google Maps ni sistema de reseñas", on: false },
      ],
      cta: "Preguntar por esta opción",
      whatsapp: "Hola Unax, me interesa la opción de solo web por 1.300€",
    },
    {
      id: "all-inclusive",
      variant: "star",
      name: "Todo Incluido",
      tagline: "0€ al empezar. Yo me encargo de todo.",
      priceNum: "149€",
      priceUnit: "/mes",
      upfront: "0€ para empezar hoy",
      priceNote: "Sin permanencia · cancela cuando quieras · 30 días de garantía",
      reframe: "Menos de 5€ al día. Un solo cliente nuevo al mes y ya está pagada.",
      features: [
        { label: "La web programada a mano, online en 7–10 días", on: true },
        { label: "Dominio + hosting incluidos mientras la uses", on: true },
        { label: "Cambios de contenido ilimitados (textos, fotos, precios, horarios)", on: true },
        { label: "Soporte por WhatsApp el mismo día", on: true },
        { label: "Ficha de Google Maps + sistema de reseñas 5★", on: true },
        { label: "Sin permanencia: cancela cuando quieras", on: true },
      ],
      cta: "Empezar con 0€ hoy",
      whatsapp: "Hola Unax, me interesa el plan Todo Incluido (149€/mes, 0€ inicial)",
      detail: {
        name: "Todo Incluido",
        subtitle: "Tu web profesional sin pagar nada al empezar",
        price: "149€/mes",
        description:
          "0€ al firmar. Cuota fija de 149€/mes sin permanencia: cancela cuando quieras. 30 días de garantía. Mientras mantengas tu cuota: web online, posicionamiento en Google Maps vigilado y soporte total por WhatsApp el mismo día.",
        popular: true,
        features: [
          "Diseño profesional a medida para tu negocio",
          "Hasta 5 secciones (inicio, servicios, sobre ti, contacto, reseñas)",
          "Optimizada para móvil: la mayoría de tus clientes te buscan desde el teléfono",
          "Ficha de Google Maps optimizada y vigilada cada mes",
          "Sistema automático para conseguir reseñas de 5 estrellas",
          "Soporte por WhatsApp el mismo día: precios, fotos u horarios",
        ],
        deliverables: [
          "Dominio propio y hosting incluidos (sin facturas extra)",
          "Ficha de Google Business Profile lista para captar llamadas",
          "Certificado SSL y velocidad optimizada",
          "Cambios de contenido ilimitados, sin coste extra",
        ],
        process: [],
        clients,
      },
    },
    {
      id: "one-off",
      variant: "default",
      name: "Pago único",
      tagline: "La web es tuya para siempre, de una vez.",
      priceNum: "1.500€",
      upfront: "Se paga una vez · primer año gestionado",
      priceNote: "Dominio + hosting incluidos el primer año.",
      features: [
        { label: "La web programada a mano, tuya en propiedad", on: true },
        { label: "Dominio + hosting el primer año", on: true },
        { label: "Cambios tras la entrega se presupuestan aparte", on: false },
        { label: "Sin soporte por WhatsApp incluido", on: false },
        { label: "Sin cuota mensual, lo pagas una vez", on: true },
      ],
      cta: "Preguntar por la compra",
      whatsapp: "Hola Unax, me interesa la web a pago único por 1.500€",
    },
  ];
}
