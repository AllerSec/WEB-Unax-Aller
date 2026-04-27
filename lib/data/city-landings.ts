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
          desc: "Una web a medida desde 1.500€, IVA incluido. Si necesitas algo más complejo (citas, automatizaciones), puede subir hasta unos 2.000€. Te paso un presupuesto cerrado antes de empezar.",
        },
      ],
      faqTitle: `Preguntas frecuentes sobre diseño web en ${city}`,
      faq: [
        {
          q: `¿Trabajas presencialmente con clientes en ${city}?`,
          a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Sí. Estoy en Irun, ${distStr}, y puedo desplazarme a ${city} para la reunión inicial. El resto lo llevamos por WhatsApp, email o videollamada, lo que te venga bien.`
            : `Trabajo con clientes de ${city} combinando videollamadas y mensajes con visitas puntuales si el proyecto lo necesita. Estoy en Irun, ${distStr}.`,
        },
        {
          q: `¿Cuánto cuesta una web para un negocio de ${city}?`,
          a: "Una web a medida desde 1.500€, IVA incluido. Incluye diseño exclusivo, SEO técnico, velocidad Lighthouse 95+ y despliegue. Si necesitas algo más complejo (sistema de citas, automatizaciones, integraciones específicas) puede subir hasta unos 2.000€. Te paso un presupuesto cerrado antes de empezar, sin sorpresas.",
        },
        {
          q: `¿Cuánto tardas en entregar la web?`,
          a: "Si no tengo otros proyectos activos, entre 1 y 2 semanas. Si los tengo, puede ser algo más. Te digo el plazo real desde el primer día y voy contándote cómo va.",
        },
        {
          q: `¿Haces SEO local específico para ${city}?`,
          a: `Sí. Configuro toda la parte técnica para que tu web aparezca en búsquedas tipo "tu sector en ${city}". Te configuro Google Business Profile y Google Search Console para que veas tú mismo cómo va.`,
        },
        {
          q: "¿Puedo tener la web en varios idiomas?",
          a: "Sí, hasta en 4 idiomas (euskera, castellano, inglés y francés) y entra dentro del precio. Estudié en Francia hasta los 15, así que el francés lo trabajo igual de fino que el resto.",
        },
        {
          q: "¿Qué pasa con el mantenimiento después del lanzamiento?",
          a: "El primer año son 100€ y cubre hosting, dominio y soporte. A partir del segundo año son 200€/año con cambios menores incluidos (textos, imágenes, ajustes). Si vas a necesitar muchos cambios al mes, lo hablamos y ajustamos. Sin permanencia.",
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
          desc: "A custom website from €1,500, VAT included. If you need something more complex (booking, automations) it can go up to around €2,000. I give you a fixed quote before we start.",
        },
      ],
      faqTitle: `Frequently asked questions about web design in ${city}`,
      faq: [
        {
          q: `Do you work in person with clients in ${city}?`,
          a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Yes. I'm in Irun, ${distStr}, and I can travel to ${city} for the initial meeting. The rest we handle through WhatsApp, email or video call, whatever works for you.`
            : `I work with ${city} clients combining video calls and messages with occasional on-site visits when the project needs it. I'm in Irun, ${distStr}.`,
        },
        {
          q: `How much does a website cost for a ${city} business?`,
          a: "A custom website from €1,500, VAT included. It comes with exclusive design, technical SEO, Lighthouse 95+ speed and deployment. If you need something more complex (booking system, automations, specific integrations) it can go up to around €2,000. I send you a fixed quote before we start, no surprises.",
        },
        {
          q: "How long does delivery take?",
          a: "If I don't have other active projects, between 1 and 2 weeks. If I do, it can take a bit longer. I tell you the real timeline from day one and keep you posted as we go.",
        },
        {
          q: `Do you do specific local SEO for ${city}?`,
          a: `Yes. I set up all the technical work so your site ranks for "your sector in ${city}" searches. I configure your Google Business Profile and Google Search Console so you can see how it's doing yourself.`,
        },
        {
          q: "Can I have the site in several languages?",
          a: "Yes, up to 4 languages (Basque, Spanish, English and French) included in the price. I studied in France until I was 15, so French I treat with the same care as the rest.",
        },
        {
          q: "What about maintenance after launch?",
          a: "The first year maintenance is €100, covering hosting, domain and onboarding support. From the second year onwards it's €200/year, with minor changes included (text, images, tweaks) and ongoing support. If you'll need a lot of changes per month, we adjust accordingly. No lock-in.",
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
        desc: "Neurrira egindako webgune bat 1.500€-tik, BEZ barne. Zerbait konplexuagoa behar baduzu (hitzorduak, automatizazioak), 2.000€ ingurura igo daiteke. Hasi aurretik aurrekontu itxia ematen dizut.",
      },
    ],
    faqTitle: `${city}ko web diseinuari buruzko ohiko galderak`,
    faq: [
      {
        q: `Aurrez aurre egiten duzu lan ${cityIn} bezeroekin?`,
        a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
          ? `Bai. Irunen nago, ${distStr}, eta ${cityIn} joan naiteke hasierako bilerarako. Gainerakoa WhatsApp, posta elektroniko edo bideo-deiz, ondo datorkizun moduan.`
          : `${cityIn} bezeroekin bideo-deiak eta mezuak konbinatuz lan egiten dut, eta proiektuak behar duenean noizbehinkako bisitak. Irunen nago, ${distStr}.`,
      },
      {
        q: `Zenbat kostatzen da web bat ${city}ko negozio batentzat?`,
        a: "Neurrira egindako webgune bat 1.500€-tik, BEZ barne. Diseinu esklusiboa, SEO teknikoa, Lighthouse 95+ abiadura eta hedapena barne. Zerbait konplexuagoa behar baduzu (hitzorduen sistema, automatizazioak, integrazio espezifikoak) 2.000€ ingurura igo daiteke. Hasi aurretik aurrekontu itxia ematen dizut, ezustekorik gabe.",
      },
      {
        q: "Zenbat denbora behar duzu weba entregatzeko?",
        a: "Beste proiektu aktiborik ez badut, 1 eta 2 aste artean. Baditudanean, zerbait gehiago izan daiteke. Lehen egunetik benetako epea esaten dizut eta nola doan kontatzen dizut.",
      },
      {
        q: `${city}rako SEO lokal espezifikoa egiten duzu?`,
        a: `Bai. Atal tekniko osoa konfiguratzen dut zure weba "${city} zure sektorea" moduko bilaketetan ager dadin. Google Business Profile eta Google Search Console konfiguratzen dizkizut, zuk zeuk nola doan ikus dezazun.`,
      },
      {
        q: "Webgunea hizkuntza batean baino gehiagotan eduki dezaket?",
        a: "Bai, 4 hizkuntzatara arte (euskara, gaztelania, ingelesa eta frantsesa) eta prezioan sartzen da. 15 urte bete arte Frantzian ikasi nuen, beraz frantsesa beste hizkuntzen arreta berarekin lantzen dut.",
      },
      {
        q: "Zer gertatzen da abian jarri ondoren mantentze-lanekin?",
        a: "Lehen urteko mantentze-lana 100€ da, hosting-a, domeinua eta hasierako laguntza barne. Bigarren urtetik aurrera 200€/urtean da, aldaketa txikiak (testuak, irudiak, doikuntzak) eta etengabeko laguntza barne. Hilean aldaketa asko behar badituzu, egokitzen dugu. Iraupenik gabe.",
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
