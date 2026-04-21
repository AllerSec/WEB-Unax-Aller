import type { CityLandingContent } from "@/components/landing/CityLanding";

export type LocaleKey = "es" | "en" | "eu";

export interface CityLandingDef {
  slug: string;
  cityNames: Record<LocaleKey, string>;
  regionNames: Record<LocaleKey, string>;
  distanceFromIrunKm?: number;
  sectors?: { es: string; en: string; eu: string };
}

export const cityLandings: CityLandingDef[] = [
  {
    slug: "disenador-web-bilbao",
    cityNames: { es: "Bilbao", en: "Bilbao", eu: "Bilbo" },
    regionNames: { es: "Bizkaia", en: "Bizkaia", eu: "Bizkaia" },
    distanceFromIrunKm: 115,
    sectors: {
      es: "industria, comercio, hostelería, servicios profesionales y startups",
      en: "industry, retail, hospitality, professional services and startups",
      eu: "industria, merkataritza, ostalaritza, zerbitzu profesionalak eta startupak",
    },
  },
  {
    slug: "disenador-web-donostia",
    cityNames: { es: "Donostia-San Sebastián", en: "Donostia-San Sebastián", eu: "Donostia" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 21,
    sectors: {
      es: "hostelería, turismo, comercio premium y servicios profesionales",
      en: "hospitality, tourism, premium retail and professional services",
      eu: "ostalaritza, turismoa, merkataritza premium eta zerbitzu profesionalak",
    },
  },
  {
    slug: "disenador-web-vitoria",
    cityNames: { es: "Vitoria-Gasteiz", en: "Vitoria-Gasteiz", eu: "Gasteiz" },
    regionNames: { es: "Álava", en: "Álava", eu: "Araba" },
    distanceFromIrunKm: 108,
    sectors: {
      es: "administración pública, industria, servicios y bodegas de Rioja Alavesa",
      en: "public administration, industry, services and Rioja Alavesa wineries",
      eu: "administrazio publikoa, industria, zerbitzuak eta Arabako Errioxako upategiak",
    },
  },
  {
    slug: "disenador-web-hondarribia",
    cityNames: { es: "Hondarribia", en: "Hondarribia", eu: "Hondarribia" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 5,
    sectors: {
      es: "hostelería, pesca, comercio y turismo costero",
      en: "hospitality, fishing, retail and coastal tourism",
      eu: "ostalaritza, arrantza, merkataritza eta kostaldeko turismoa",
    },
  },
  {
    slug: "disenador-web-errenteria",
    cityNames: { es: "Errenteria", en: "Errenteria", eu: "Errenteria" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 15,
    sectors: {
      es: "comercio, industria, hostelería y servicios",
      en: "retail, industry, hospitality and services",
      eu: "merkataritza, industria, ostalaritza eta zerbitzuak",
    },
  },
  {
    slug: "disenador-web-lasarte",
    cityNames: { es: "Lasarte-Oria", en: "Lasarte-Oria", eu: "Lasarte-Oria" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 28,
    sectors: {
      es: "comercio, hostelería, servicios profesionales e hipódromo",
      en: "retail, hospitality, professional services and racecourse",
      eu: "merkataritza, ostalaritza, zerbitzu profesionalak eta hipodromoa",
    },
  },
  {
    slug: "disenador-web-eibar",
    cityNames: { es: "Eibar", en: "Eibar", eu: "Eibar" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 65,
    sectors: {
      es: "industria de máquina-herramienta, armería, comercio y servicios",
      en: "machine-tool industry, gunsmithing, retail and services",
      eu: "makina-erreminta industria, armagintza, merkataritza eta zerbitzuak",
    },
  },
  {
    slug: "disenador-web-tolosa",
    cityNames: { es: "Tolosa", en: "Tolosa", eu: "Tolosa" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 42,
    sectors: {
      es: "industria papelera, gastronomía, comercio tradicional y servicios",
      en: "paper industry, gastronomy, traditional retail and services",
      eu: "paper industria, gastronomia, merkataritza tradizionala eta zerbitzuak",
    },
  },
];

function cityDeclEu(city: string): string {
  // euskera inesivo aproximado: ciudad termina en vocal -> +n ; en consonante -> +en
  if (/[aeiou]$/i.test(city)) return `${city}n`;
  return `${city}en`;
}

function cityDeclEuFrom(city: string): string {
  // ablativo euskera: para "desde ciudad"
  if (/[aeiou]$/i.test(city)) return `${city}tik`;
  return `${city}etik`;
}

export function getCityLandingContent(
  def: CityLandingDef,
  locale: LocaleKey
): CityLandingContent {
  const city = def.cityNames[locale];
  const region = def.regionNames[locale];
  const sectors = def.sectors?.[locale] ?? "";
  const distStr =
    def.distanceFromIrunKm !== undefined
      ? locale === "es"
        ? `a ${def.distanceFromIrunKm} km de Irun`
        : locale === "en"
        ? `${def.distanceFromIrunKm} km from Irun`
        : `Iruntik ${def.distanceFromIrunKm} km-ra`
      : "";

  if (locale === "es") {
    return {
      breadcrumbHome: "Inicio",
      breadcrumbHere: `Diseñador web ${city}`,
      heroTitle: `Diseñador web en ${city}`,
      intro: `Soy Unax Aller, diseñador web freelance en Irun ${
        def.distanceFromIrunKm !== undefined ? `(${distStr})` : ""
      } con clientes en ${city} y ${region}. Creo webs a medida${
        sectors ? ` para ${sectors}` : ""
      } que posicionan en Google y convierten visitantes en clientes.`,
      benefitsTitle: `¿Por qué elegir un diseñador web local para ${city}?`,
      benefits: [
        {
          title: "Conozco el mercado de " + city,
          desc: `Entiendo cómo buscan los clientes de ${city} y qué esperan de un negocio local. Eso se traduce en webs que conectan de verdad.`,
        },
        {
          title: "SEO local real",
          desc: `Optimización para búsquedas "${"mejor [tu sector] " + city}", Google Maps y Google Business Profile. Estrategia completa, no solo keywords.`,
        },
        {
          title: "Cercanía y comunicación directa",
          desc: def.distanceFromIrunKm !== undefined
            ? `Estoy en Irun, ${distStr}. Si necesitas reunión presencial en ${city}, puedo desplazarme.`
            : `Hablas conmigo, no con un gestor de cuentas. Respuesta en 24h garantizada.`,
        },
        {
          title: "Precio justo sin letra pequeña",
          desc: "1.300€ IVA incluido. Web completa, sin permanencia, sin renovaciones forzosas. El código es tuyo desde el día 1.",
        },
      ],
      faqTitle: `Preguntas frecuentes sobre diseño web en ${city}`,
      faq: [
        {
          q: `¿Trabajas presencialmente con clientes en ${city}?`,
          a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Sí. Estoy en Irun, ${distStr}, y puedo desplazarme a ${city} para la reunión inicial y entregables clave. El resto lo llevamos por videollamada y email.`
            : `Trabajo con clientes de ${city} combinando videollamadas con visitas puntuales cuando el proyecto lo necesita. Estoy en Irun, ${distStr}.`,
        },
        {
          q: `¿Cuánto cuesta una web para un negocio de ${city}?`,
          a: "El plan es único: 1.300€ IVA incluido. Incluye diseño a medida, desarrollo en Next.js, SEO técnico completo, multi-idioma (hasta 3) y hosting el primer año.",
        },
        {
          q: `¿Cuánto tardas en entregar la web?`,
          a: "Entre 3 y 6 semanas desde la firma, según complejidad. Contenidos y feedback rápido del cliente aceleran el proceso.",
        },
        {
          q: `¿Haces SEO local específico para ${city}?`,
          a: `Sí. Optimizo tu web para que aparezca en búsquedas tipo "tu sector en ${city}", te configuro Google Business Profile y te dejo una estrategia de contenido y reseñas.`,
        },
        {
          q: "¿El código es mío o me quedo atado a una plataforma?",
          a: "El código es tuyo desde el día 1. No hay ataduras a plataformas propietarias. Si un día quieres llevarlo a otro desarrollador, puedes.",
        },
      ],
      ctaTitle: `¿Tienes un negocio en ${city}?`,
      ctaSub: "Consulta gratuita de 30 minutos. Sin compromiso.",
      ctaBtn: "Hablar con Unax",
      quoteBtn: "Solicitar presupuesto gratis",
    };
  }

  if (locale === "en") {
    return {
      breadcrumbHome: "Home",
      breadcrumbHere: `Web designer ${city}`,
      heroTitle: `Web designer in ${city}`,
      intro: `I'm Unax Aller, a freelance web designer based in Irun ${
        def.distanceFromIrunKm !== undefined ? `(${distStr})` : ""
      } with clients in ${city} and ${region}. I build custom websites${
        sectors ? ` for ${sectors}` : ""
      } that rank on Google and convert visitors into clients.`,
      benefitsTitle: `Why choose a local web designer for ${city}?`,
      benefits: [
        {
          title: `I know the ${city} market`,
          desc: `I understand how ${city} clients search and what they expect from a local business. That translates into websites that truly connect.`,
        },
        {
          title: "Real local SEO",
          desc: `Optimization for "best [your sector] ${city}" searches, Google Maps and Google Business Profile. Full strategy — not just keywords.`,
        },
        {
          title: "Proximity and direct communication",
          desc: def.distanceFromIrunKm !== undefined
            ? `I'm in Irun, ${distStr}. If you need an in-person meeting in ${city}, I can travel.`
            : `You talk to me, not an account manager. Response within 24h guaranteed.`,
        },
        {
          title: "Fair price, no small print",
          desc: "€1,300 VAT included. Complete website, no lock-in, no forced renewals. The code is yours from day one.",
        },
      ],
      faqTitle: `Frequently asked questions about web design in ${city}`,
      faq: [
        {
          q: `Do you work in person with clients in ${city}?`,
          a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Yes. I'm in Irun, ${distStr}, and I can travel to ${city} for the initial meeting and key deliverables. The rest we handle via video call and email.`
            : `I work with ${city} clients combining video calls with occasional on-site visits when the project needs it. I'm in Irun, ${distStr}.`,
        },
        {
          q: `How much does a website cost for a ${city} business?`,
          a: "The plan is a single price: €1,300 VAT included. It covers custom design, Next.js development, full technical SEO, multi-language (up to 3) and first-year hosting.",
        },
        {
          q: "How long does delivery take?",
          a: "Between 3 and 6 weeks from signing, depending on complexity. Quick client feedback and ready content speed the process up.",
        },
        {
          q: `Do you do specific local SEO for ${city}?`,
          a: `Yes. I optimize your site so it ranks for "your sector in ${city}" searches, set up your Google Business Profile, and leave you a content and reviews strategy.`,
        },
        {
          q: "Is the code mine, or am I locked into a platform?",
          a: "The code is yours from day one. No proprietary platform lock-in. If you ever want to move it to another developer, you can.",
        },
      ],
      ctaTitle: `Have a business in ${city}?`,
      ctaSub: "Free 30-minute consultation. No commitment.",
      ctaBtn: "Talk to Unax",
      quoteBtn: "Request a free quote",
    };
  }

  // euskera
  const cityIn = cityDeclEu(city);
  const cityFrom = cityDeclEuFrom(city);
  return {
    breadcrumbHome: "Hasiera",
    breadcrumbHere: `Web diseinatzailea ${city}`,
    heroTitle: `Web diseinatzailea ${cityIn}`,
    intro: `Unax Aller naiz, Irungo web diseinatzaile freelancea ${
      def.distanceFromIrunKm !== undefined ? `(${distStr})` : ""
    }, ${cityIn} eta ${region}n bezeroekin. Googlen agertzen diren eta bisitariak bezeroak bihurtzen dituzten neurrizko webguneak sortzen ditut${
      sectors ? ` ${sectors}entzat` : ""
    }.`,
    benefitsTitle: `Zergatik aukeratu bertako web diseinatzaile bat ${cityIn}?`,
    benefits: [
      {
        title: `${city}ko merkatua ezagutzen dut`,
        desc: `${cityIn} bezeroek nola bilatzen duten eta negozio lokal batetik zer espero duten ulertzen dut. Benetan konektatzen duten webguneak sortzen ditut.`,
      },
      {
        title: "Benetako SEO lokala",
        desc: `"${city} zure sektorea" bilaketetarako optimizazioa, Google Maps eta Google Business Profile. Estrategia osoa, ez hitz gakoak bakarrik.`,
      },
      {
        title: "Hurbiltasuna eta komunikazio zuzena",
        desc: def.distanceFromIrunKm !== undefined
          ? `Irunen nago, ${distStr}. ${cityIn} aurrez aurreko bilera behar baduzu, joan naiteke.`
          : `Nirekin hitz egiten duzu, ez kontu kudeatzaile batekin. 24 ordutan erantzuna bermatuta.`,
      },
      {
        title: "Prezio justu letra txikirik gabe",
        desc: "1.300€ BEZ barne. Web osoa, iraunkortasunik gabe, beharrezko berritzapenik gabe. Kodea lehen egunetik zurea.",
      },
    ],
    faqTitle: `${city}ko web diseinuari buruzko ohiko galderak`,
    faq: [
      {
        q: `Aurrez aurre egiten duzu lan ${cityIn} bezeroekin?`,
        a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
          ? `Bai. Irunen nago, ${distStr}, eta ${cityIn} joan naiteke hasierako bilerarako eta entrega giltzarrietarako. Gainerakoa bideo-deien eta emailaren bidez egiten dugu.`
          : `${cityIn} bezeroekin bideo-deiak eta noizbehinkako bisitak konbinatuz lan egiten dut. Irunen nago, ${distStr}.`,
      },
      {
        q: `Zenbat kostatzen da web bat ${city}ko negozio batentzat?`,
        a: "Plan bakarra: 1.300€ BEZ barne. Neurrizko diseinua, Next.js garapena, SEO tekniko osoa, hizkuntza anitza (3ra arte) eta lehen urteko hostinga barne.",
      },
      {
        q: "Zenbat denbora behar duzu weba entregatzeko?",
        a: "Sinatzetik 3-6 aste, konplexutasunaren arabera. Bezeroaren feedback azkarra eta prest dagoen edukia prozesua bizkortzen dute.",
      },
      {
        q: `${city}rako SEO lokal espezifikoa egiten duzu?`,
        a: `Bai. Zure weba "${city} zure sektorea" moduko bilaketetarako optimizatzen dut, Google Business Profile konfiguratzen dizut, eta edukia eta iritzien estrategia uzten dizut.`,
      },
      {
        q: "Kodea nirea da, ala plataforma bati lotuta geratzen naiz?",
        a: "Kodea lehen egunetik zurea da. Plataforma pribatiboekin loturarik gabe. Beste garatzaile batengana eraman nahi baduzu, ahal duzu.",
      },
    ],
    ctaTitle: `${cityIn} negozioa al duzu?`,
    ctaSub: "30 minutuko doako kontsulta. Konpromisorik gabe.",
    ctaBtn: "Unaxekin hitz egin",
    quoteBtn: "Doako aurrekontua eskatu",
  };
}

export function getCityLanding(slug: string): CityLandingDef | undefined {
  return cityLandings.find((c) => c.slug === slug);
}
