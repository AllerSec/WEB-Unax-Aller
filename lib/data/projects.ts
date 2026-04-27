import type { LocaleKey } from "./city-landings";

export type Project = {
  /** URL slug — used at /[lang]/proyectos/{slug} */
  slug: string;
  /** Display name of the client / project */
  name: string;
  /** Short tagline shown on cards (per locale) */
  tagline: Record<LocaleKey, string>;
  /** Sector / industry (per locale) */
  sector: Record<LocaleKey, string>;
  /** City and region of the client (used for internal linking to city-landings) */
  city: string;
  region: string;
  /** Full year project shipped */
  year: number;
  /** Public URL of the live site (without trailing slash) */
  url: string;
  /** Slug of the related city landing, if any (for internal linking). Optional. */
  relatedCitySlug?: string;
  /** What was delivered — bullet list per locale. Each becomes a chip in the card. */
  tasks: Record<LocaleKey, string[]>;
  /** Long-form case description (per locale). Visible on the detail page. */
  description: Record<LocaleKey, string[]>;
  /** Short testimonial from the client, if available */
  testimonial?: {
    quote: Record<LocaleKey, string>;
    author: string;
    role: Record<LocaleKey, string>;
    rating: 1 | 2 | 3 | 4 | 5;
  };
  /** Path to the screenshot used on cards and detail hero */
  cover: string;
  /** Alt text per locale */
  coverAlt: Record<LocaleKey, string>;
  /** Brand accent colour — drives the per-project chrome (badge, hover ring, CTA). */
  accent: { color: string; ink: string };
};

export const projects: Project[] = [
  {
    slug: "farmacia-fernandez-bera",
    name: "Farmacia Fernández Bera",
    tagline: {
      es: "Web clara, intuitiva y profesional para una farmacia de pueblo",
      en: "Clear, intuitive, professional website for a small-town pharmacy",
      eu: "Web argia, intuitiboa eta profesionala herri farmazia batentzat",
    },
    sector: {
      es: "Farmacia y salud",
      en: "Pharmacy & health",
      eu: "Farmazia eta osasuna",
    },
    city: "Bera",
    region: "Navarra",
    year: 2025,
    url: "https://farmaciafernandezbera.com",
    tasks: {
      es: [
        "Diseño y desarrollo web a medida",
        "Identidad visual y tipografía cuidada",
        "SEO local optimizado para Bera y comarca",
        "Sección de servicios y consejos de salud",
        "Adaptación móvil completa y carga rápida",
      ],
      en: [
        "Custom web design and development",
        "Refined visual identity and typography",
        "Local SEO tuned for Bera and surroundings",
        "Services and health-tips section",
        "Full mobile adaptation and fast loading",
      ],
      eu: [
        "Web diseinu eta garapen pertsonalizatua",
        "Identitate bisuala eta tipografia zaindua",
        "Tokiko SEO Bera eta inguruentzat",
        "Zerbitzuen eta osasun-aholkuen atala",
        "Mugikorrera moldatuta eta karga azkarra",
      ],
    },
    description: {
      es: [
        "Diseñamos la web de la Farmacia Fernández Bera con un objetivo claro: que cualquier vecino o vecina pudiera encontrar lo que necesita en cuestión de segundos, sin complicaciones, y con la sensación de estar en un sitio cuidado.",
        "Trabajamos la identidad visual, los textos y la estructura de información desde cero. La web responde rápido, se adapta a cualquier dispositivo y aparece en las búsquedas locales de farmacia en Bera y alrededores.",
      ],
      en: [
        "We designed the Farmacia Fernández Bera website with one clear goal: any neighbour should find what they need in seconds, without friction, and feel they're on a polished site.",
        "We worked on the visual identity, copy and information architecture from scratch. The site responds fast, adapts to any device and shows up in local searches for pharmacy in Bera and surroundings.",
      ],
      eu: [
        "Farmacia Fernández Beraren weba helburu argi batekin diseinatu genuen: edozein bizilagunek behar duena segundotan aurkitu ahal izatea, traba gabe, eta leku zaindu batean dagoela sentitzea.",
        "Identitate bisuala, testuak eta informazio-egitura zerotik landu genituen. Weba azkar erantzuten du, edozein gailuetara egokitzen da eta Berako eta inguruko farmazia bilaketetan agertzen da.",
      ],
    },
    testimonial: {
      quote: {
        es: "Como farmacéutica, valoro mucho los detalles y la paciencia. La web ha quedado clara, intuitiva, profesional y muy fácil de manejar.",
        en: "As a pharmacist, I value attention to detail and patience. The site is clear, intuitive, professional and very easy to manage.",
        eu: "Farmazialari gisa, xehetasunak eta pazientzia asko baloratzen ditut. Weba argia, intuitiboa, profesionala eta erabiltzeko oso erraza geratu da.",
      },
      author: "Aranzazu Fernández Diez",
      role: {
        es: "Farmacéutica titular, Farmacia Fernández Bera",
        en: "Owner pharmacist, Farmacia Fernández Bera",
        eu: "Farmazialari titularra, Farmacia Fernández Bera",
      },
      rating: 5,
    },
    cover: "/images/projects/farmacia-fernandez-bera.avif",
    coverAlt: {
      es: "Captura de la web de la Farmacia Fernández Bera diseñada por Unax Aller",
      en: "Screenshot of the Farmacia Fernández Bera website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Farmacia Fernández Bera webaren irudia",
    },
    accent: { color: "#c79a3a", ink: "#1a1208" },
  },
  {
    slug: "motos-arretxe",
    name: "Motos Arretxe",
    tagline: {
      es: "Web profesional para concesionario y taller de motos",
      en: "Professional website for a motorcycle dealership and workshop",
      eu: "Web profesionala motoen kontzesionario eta tailerrarentzat",
    },
    sector: {
      es: "Motos, concesionario y taller",
      en: "Motorcycles, dealership and workshop",
      eu: "Motoak, kontzesionarioa eta tailerra",
    },
    city: "Hondarribia",
    region: "Gipuzkoa",
    year: 2025,
    url: "https://motosarretxe.com",
    relatedCitySlug: "disenador-web-hondarribia",
    tasks: {
      es: [
        "Diseño web a medida con catálogo de motos",
        "Sistema de contacto y solicitud de cita para el taller",
        "Galería profesional de stock y servicios",
        "SEO local para Hondarribia, Irun y Gipuzkoa",
        "Optimización de rendimiento y velocidad",
      ],
      en: [
        "Custom web design with motorcycle catalogue",
        "Contact and workshop booking system",
        "Professional gallery for stock and services",
        "Local SEO for Hondarribia, Irun and Gipuzkoa",
        "Performance and speed optimisation",
      ],
      eu: [
        "Neurriko web diseinua, motoen katalogoarekin",
        "Tailerrerako kontaktu eta hitzordu eskaera sistema",
        "Stock eta zerbitzuen galeria profesionala",
        "Tokiko SEO Hondarribia, Irun eta Gipuzkoarentzat",
        "Errendimendu eta abiaduraren optimizazioa",
      ],
    },
    description: {
      es: [
        "Motos Arretxe necesitaba una web que reflejase la atención y el asesoramiento que dan en el taller, no un escaparate genérico. La diseñamos pensando en quien busca una moto concreta o necesita un mecánico de confianza cerca de Hondarribia.",
        "Cada sección está pensada para resolver dudas rápido: stock, servicios, ubicación y contacto directo. La web carga en menos de un segundo y aparece en las búsquedas de la zona.",
      ],
      en: [
        "Motos Arretxe needed a site that reflects the care and advice they give at the workshop, not a generic showcase. We designed it for the person looking for a specific bike or a trusted mechanic near Hondarribia.",
        "Every section is built to solve doubts fast: stock, services, location and direct contact. The site loads in under a second and shows up in local searches.",
      ],
      eu: [
        "Motos Arretxek tailerrean ematen duten arreta eta aholkularitza islatuko zuen weba behar zuen, ez erakusleku generikoa. Hondarribia inguruan moto zehatza edo mekaniko fidagarria bilatzen duenarentzat diseinatu genuen.",
        "Atal bakoitza zalantzak azkar konpontzeko pentsatuta dago: stocka, zerbitzuak, kokalekua eta zuzeneko kontaktua. Weba segundo bat baino gutxiagoan kargatzen da eta inguruko bilaketetan agertzen da.",
      ],
    },
    testimonial: {
      quote: {
        es: "Atención y asesoramiento impecable. Gran profesional, trabajo muy serio. Gracias.",
        en: "Impeccable attention and advice. Great professional, very thorough work. Thank you.",
        eu: "Arreta eta aholkularitza ezin hobea. Profesional handia, lan oso serioa. Eskerrik asko.",
      },
      author: "Motos Arretxe SL",
      role: {
        es: "Concesionario y taller de motos en Hondarribia",
        en: "Motorcycle dealership and workshop in Hondarribia",
        eu: "Motoen kontzesionario eta tailerra Hondarribian",
      },
      rating: 5,
    },
    cover: "/images/projects/motos-arretxe.avif",
    coverAlt: {
      es: "Captura de la web de Motos Arretxe diseñada por Unax Aller",
      en: "Screenshot of the Motos Arretxe website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Motos Arretxe webaren irudia",
    },
    accent: { color: "#dc2626", ink: "#1c0a0a" },
  },
  {
    slug: "anaka-optica",
    name: "Anaka Óptica",
    tagline: {
      es: "Web cuidada para una óptica con personalidad",
      en: "Refined website for a boutique optician",
      eu: "Web zaindua nortasuna duen optika batentzat",
    },
    sector: {
      es: "Óptica y salud visual",
      en: "Optometry and visual health",
      eu: "Optika eta ikusmen osasuna",
    },
    city: "Irun",
    region: "Gipuzkoa",
    year: 2025,
    url: "https://anakaoptica.com",
    tasks: {
      es: [
        "Diseño web premium adaptado a la marca",
        "Sección de servicios y revisiones visuales",
        "Galería editorial de monturas y marcas",
        "SEO local para Irun y comarca del Bidasoa",
        "Formulario de cita y contacto directo",
      ],
      en: [
        "Premium web design tuned to the brand",
        "Services and eye-exam section",
        "Editorial gallery of frames and brands",
        "Local SEO for Irun and the Bidasoa area",
        "Booking and direct contact form",
      ],
      eu: [
        "Markari egokitutako web diseinu premium-a",
        "Zerbitzu eta ikusmen-azterketen atala",
        "Munturen eta marken galeria editoriala",
        "Tokiko SEO Irun eta Bidasoa eskualdearentzat",
        "Hitzordu eta zuzeneko kontaktu formularioa",
      ],
    },
    description: {
      es: [
        "Anaka Óptica trabaja con marcas seleccionadas y atención personalizada. Su web tenía que transmitir esa misma sensación: cuidada, calmada, sin ruido, y útil para quien busca una óptica de confianza en Irun.",
        "El diseño respira, las fotos pesan y el SEO local pone la tienda en el mapa para búsquedas como óptica en Irun, revisiones de vista o gafas graduadas en Gipuzkoa.",
      ],
      en: [
        "Anaka Óptica works with selected brands and personalised attention. Their site had to convey that same feel: refined, calm, uncluttered, and useful for someone looking for a trusted optician in Irun.",
        "The design breathes, the photos hit, and local SEO puts the shop on the map for searches like optician in Irun, eye exams or prescription glasses in Gipuzkoa.",
      ],
      eu: [
        "Anaka Optikak hautatutako markekin eta arreta pertsonalizatuarekin egiten du lan. Webak sentsazio bera transmititu behar zuen: zaindua, lasaia, zaratarik gabea, eta Irunen optika fidagarri bat bilatzen duenarentzat erabilgarria.",
        "Diseinuak arnasa hartzen du, argazkiek pisua dute, eta tokiko SEOk denda mapan kokatzen du Iruneko optika edo Gipuzkoako graduazio betaurrekoak bezalako bilaketetarako.",
      ],
    },
    cover: "/images/projects/anaka-optica.avif",
    coverAlt: {
      es: "Captura de la web de Anaka Óptica diseñada por Unax Aller",
      en: "Screenshot of the Anaka Óptica website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Anaka Optikaren webaren irudia",
    },
    accent: { color: "#f97316", ink: "#1a0d04" },
  },
  {
    slug: "virtuosolve",
    name: "VirtuoSolve",
    tagline: {
      es: "Web para una agencia de soluciones de IA",
      en: "Website for an AI solutions agency",
      eu: "Webgunea AI soluzioen agentzia batentzat",
    },
    sector: {
      es: "Inteligencia artificial y consultoría tecnológica",
      en: "Artificial intelligence and tech consultancy",
      eu: "Adimen artifiziala eta teknologia aholkularitza",
    },
    city: "Irun",
    region: "Gipuzkoa",
    year: 2025,
    url: "https://virtuosolve.com",
    tasks: {
      es: [
        "Diseño y desarrollo web a medida",
        "Estructura orientada a captación de leads B2B",
        "Animaciones y micro-interacciones cuidadas",
        "Optimización de rendimiento y SEO técnico",
        "Identidad visual y sistema tipográfico",
      ],
      en: [
        "Custom web design and development",
        "Structure tuned for B2B lead capture",
        "Refined animations and micro-interactions",
        "Performance and technical SEO tuning",
        "Visual identity and typographic system",
      ],
      eu: [
        "Neurriko web diseinu eta garapena",
        "B2B lead bilketarako egokitutako egitura",
        "Animazio eta mikro-elkarrekintza zainduak",
        "Errendimendu eta SEO teknikoaren optimizazioa",
        "Identitate bisuala eta sistema tipografikoa",
      ],
    },
    description: {
      es: [
        "VirtuoSolve ofrece soluciones de IA para empresas, y necesitaba una web que comunicara seriedad técnica sin caer en el cliché del SaaS genérico. Diseñamos una experiencia con personalidad propia: tipografía cuidada, ritmo editorial y micro-animaciones que refuerzan los mensajes clave.",
        "La estructura está orientada a captación B2B: cada sección lleva al usuario hacia un contacto cualificado, con SEO técnico afinado y rendimiento medido en cada interacción.",
      ],
      en: [
        "VirtuoSolve offers AI solutions for businesses and needed a site that signals technical depth without falling into generic SaaS clichés. We designed an experience with its own voice: refined typography, editorial rhythm and micro-animations that reinforce the key messages.",
        "The structure is built for B2B lead capture: every section leads the visitor toward a qualified contact, with sharp technical SEO and performance measured at every interaction.",
      ],
      eu: [
        "VirtuoSolvek AI soluzioak eskaintzen ditu enpresentzat, eta sakontasun teknikoa adieraziko zuen weba behar zuen, SaaS klixe generikoetan erori gabe. Bere ahotsa duen esperientzia diseinatu genuen: tipografia zaindua, erritmo editoriala eta mezu nagusiak indartzen dituzten mikro-animazioak.",
        "Egitura B2B lead bilketarako pentsatuta dago: atal bakoitzak bisitaria kontaktu kualifikatu batera daramatza, SEO tekniko zorrotzarekin eta elkarrekintza bakoitzean neurtutako errendimenduarekin.",
      ],
    },
    testimonial: {
      quote: {
        es: "Trabajar con este diseñador web ha sido una de las mejores decisiones para mi agencia de IA. Entendió perfectamente lo que necesitábamos.",
        en: "Working with this web designer has been one of the best decisions for my AI agency. He understood exactly what we needed.",
        eu: "Web diseinatzaile honekin lan egitea nire AI agentziarentzat hartu ditudan erabaki onenetako bat izan da. Behar genuena ezin hobeto ulertu zuen.",
      },
      author: "Iker Aller",
      role: {
        es: "Fundador, VirtuoSolve",
        en: "Founder, VirtuoSolve",
        eu: "Sortzailea, VirtuoSolve",
      },
      rating: 5,
    },
    cover: "/images/projects/virtuosolve.avif",
    coverAlt: {
      es: "Captura de la web de VirtuoSolve diseñada por Unax Aller",
      en: "Screenshot of the VirtuoSolve website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako VirtuoSolve webaren irudia",
    },
    accent: { color: "#3b82f6", ink: "#06101f" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCity(citySlug: string): Project[] {
  return projects.filter((p) => p.relatedCitySlug === citySlug);
}
