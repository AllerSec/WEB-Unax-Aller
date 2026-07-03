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
  /**
   * Real, measurable results for this client — shown as a proof section on the
   * detail page. Optional: only projects with verifiable data have it.
   */
  results?: {
    /** Looping, muted video of the metric (e.g. Google Business analytics curve) */
    video: string;
    /** Poster frame shown before the video plays */
    poster: string;
    /** Headline stat per locale (e.g. "+332% en 3 meses") */
    headline: Record<LocaleKey, string>;
    /** Short caption explaining the metric and its source, per locale */
    caption: Record<LocaleKey, string>;
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
    slug: "boralan",
    name: "Boralan",
    tagline: {
      es: "Web potente para una empresa de poda y tala en altura",
      en: "Bold website for a tree-climbing pruning and felling company",
      eu: "Web indartsua altuera handiko inausketa eta moztze enpresa batentzat",
      fr: "Site percutant pour une entreprise d'élagage et d'abattage en hauteur",
    },
    sector: {
      es: "Trabajos forestales y poda en altura",
      en: "Forestry and tree climbing",
      eu: "Baso-lanak eta altuera handiko inausketa",
      fr: "Travaux forestiers et élagage en hauteur",
    },
    city: "Navarra",
    region: "Navarra",
    year: 2026,
    url: "https://boralan.eus",
    tasks: {
      es: [
        "Diseño y desarrollo web a medida",
        "Identidad visual potente con acento naranja",
        "Catálogo de servicios de poda, tala y trepa",
        "SEO local para trabajos forestales en Navarra",
        "Adaptación móvil completa y carga rápida",
      ],
      en: [
        "Custom web design and development",
        "Bold visual identity with an orange accent",
        "Catalogue of pruning, felling and climbing services",
        "Local SEO for forestry work in Navarre",
        "Full mobile adaptation and fast loading",
      ],
      eu: [
        "Web diseinu eta garapen pertsonalizatua",
        "Identitate bisual indartsua laranja koloreko ukituarekin",
        "Inausketa, moztze eta igoera zerbitzuen katalogoa",
        "Tokiko SEO baso-lanetarako Nafarroan",
        "Mugikorrera moldatuta eta karga azkarra",
      ],
      fr: [
        "Design et développement web sur mesure",
        "Identité visuelle percutante avec une touche orange",
        "Catalogue de services d'élagage, d'abattage et de grimpe",
        "SEO local pour les travaux forestiers en Navarre",
        "Adaptation mobile complète et chargement rapide",
      ],
    },
    description: {
      es: [
        "Boralan trabaja donde la maquinaria no llega: talas controladas y podas de grandes árboles en zonas inaccesibles, con técnicas de trepa y apeos controlados. Su web tenía que transmitir esa misma seguridad y oficio desde el primer segundo, no parecer una más del sector.",
        "Diseñamos una experiencia con carácter: hero potente, acento naranja y una estructura clara por servicios. La web carga rápido, se ve perfecta en el móvil y aparece en las búsquedas de poda y tala en altura en Navarra.",
      ],
      en: [
        "Boralan works where machinery can't reach: controlled felling and pruning of large trees in inaccessible areas, using rope-access and controlled rigging techniques. Their site had to convey that same safety and craft from the first second, not look like just another in the sector.",
        "We designed an experience with character: a bold hero, an orange accent and a clear structure by service. The site loads fast, looks perfect on mobile and shows up in searches for tree climbing and felling in Navarre.",
      ],
      eu: [
        "Boralanek makineria iristen ez den lekuan egiten du lan: zuhaitz handien moztze eta inausketa kontrolatuak iristen zailak diren guneetan, igoera eta apeo kontrolatuen teknikekin. Bere webak segurtasun eta ofizio bera transmititu behar zituen lehen segundotik, ez sektoreko beste bat ematea.",
        "Nortasuna duen esperientzia diseinatu genuen: hero indartsua, laranja koloreko ukitua eta zerbitzuen araberako egitura argia. Weba azkar kargatzen da, mugikorrean ezin hobeto ikusten da eta Nafarroako altuera handiko inausketa eta moztze bilaketetan agertzen da.",
      ],
      fr: [
        "Boralan travaille là où les machines n'arrivent pas : abattages contrôlés et élagage de grands arbres dans des zones inaccessibles, avec des techniques de grimpe et de démontage contrôlé. Son site devait transmettre cette même sécurité et ce même savoir-faire dès la première seconde, sans ressembler à un site de plus dans le secteur.",
        "Nous avons conçu une expérience avec du caractère : un hero percutant, une touche orange et une structure claire par service. Le site charge vite, s'affiche parfaitement sur mobile et apparaît dans les recherches d'élagage et d'abattage en hauteur en Navarre.",
      ],
    },
    cover: "/images/projects/boralan.avif",
    coverAlt: {
      es: "Captura de la web de Boralan diseñada por Unax Aller",
      en: "Screenshot of the Boralan website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Boralan webaren irudia",
      fr: "Capture du site de Boralan conçu par Unax Aller",
    },
    accent: { color: "#e8602c", ink: "#1a0d05" },
  },
  {
    slug: "farmacia-fernandez-bera",
    name: "Farmacia Fernández Bera",
    tagline: {
      es: "Web clara, intuitiva y profesional para una farmacia de pueblo",
      en: "Clear, intuitive, professional website for a small-town pharmacy",
      eu: "Web argia, intuitiboa eta profesionala herri farmazia batentzat",
      fr: "Site clair, intuitif et professionnel pour une pharmacie de village",
    },
    sector: {
      es: "Farmacia y salud",
      en: "Pharmacy & health",
      eu: "Farmazia eta osasuna",
      fr: "Pharmacie et santé",
    },
    city: "Bera",
    region: "Navarra",
    year: 2026,
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
      fr: [
        "Design et développement web sur mesure",
        "Identité visuelle et typographie soignée",
        "SEO local optimisé pour Bera et ses environs",
        "Section services et conseils santé",
        "Adaptation mobile complète et chargement rapide",
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
      fr: [
        "Nous avons conçu le site de la Farmacia Fernández Bera avec un objectif clair : que chaque habitant puisse trouver ce dont il a besoin en quelques secondes, sans complications, avec le sentiment d'être sur un site soigné.",
        "Nous avons travaillé l'identité visuelle, les textes et l'architecture de l'information à partir de zéro. Le site répond vite, s'adapte à tous les appareils et apparaît dans les recherches locales de pharmacie à Bera et ses environs.",
      ],
    },
    testimonial: {
      quote: {
        es: "Como farmacéutica, valoro mucho los detalles y la paciencia. La web ha quedado clara, intuitiva, profesional y muy fácil de manejar.",
        en: "As a pharmacist, I value attention to detail and patience. The site is clear, intuitive, professional and very easy to manage.",
        eu: "Farmazialari gisa, xehetasunak eta pazientzia asko baloratzen ditut. Weba argia, intuitiboa, profesionala eta erabiltzeko oso erraza geratu da.",
        fr: "En tant que pharmacienne, j'accorde beaucoup d'importance aux détails et à la patience. Le site est clair, intuitif, professionnel et très facile à gérer.",
      },
      author: "Aranzazu Fernández Diez",
      role: {
        es: "Farmacéutica titular, Farmacia Fernández Bera",
        en: "Owner pharmacist, Farmacia Fernández Bera",
        eu: "Farmazialari titularra, Farmacia Fernández Bera",
        fr: "Pharmacienne titulaire, Farmacia Fernández Bera",
      },
      rating: 5,
    },
    cover: "/images/projects/farmacia-fernandez-bera.avif",
    coverAlt: {
      es: "Captura de la web de la Farmacia Fernández Bera diseñada por Unax Aller",
      en: "Screenshot of the Farmacia Fernández Bera website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Farmacia Fernández Bera webaren irudia",
      fr: "Capture du site de la Farmacia Fernández Bera conçu par Unax Aller",
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
      fr: "Site professionnel pour une concession et un atelier moto",
    },
    sector: {
      es: "Motos, concesionario y taller",
      en: "Motorcycles, dealership and workshop",
      eu: "Motoak, kontzesionarioa eta tailerra",
      fr: "Moto, concession et atelier",
    },
    city: "Irun",
    region: "Gipuzkoa",
    year: 2026,
    url: "https://motosarretxe.com",
    relatedCitySlug: "disenador-web-hondarribia",
    tasks: {
      es: [
        "Diseño web a medida con catálogo de motos",
        "Sistema de contacto y solicitud de cita para el taller",
        "Galería profesional de stock y servicios",
        "SEO local para Irun, Hondarribia y Gipuzkoa",
        "Optimización de rendimiento y velocidad",
      ],
      en: [
        "Custom web design with motorcycle catalogue",
        "Contact and workshop booking system",
        "Professional gallery for stock and services",
        "Local SEO for Irun, Hondarribia and Gipuzkoa",
        "Performance and speed optimisation",
      ],
      eu: [
        "Neurriko web diseinua, motoen katalogoarekin",
        "Tailerrerako kontaktu eta hitzordu eskaera sistema",
        "Stock eta zerbitzuen galeria profesionala",
        "Tokiko SEO Irun, Hondarribia eta Gipuzkoarentzat",
        "Errendimendu eta abiaduraren optimizazioa",
      ],
      fr: [
        "Design web sur mesure avec catalogue de motos",
        "Système de contact et de prise de rendez-vous pour l'atelier",
        "Galerie professionnelle du stock et des services",
        "SEO local pour Irun, Hondarribia et le Guipuscoa",
        "Optimisation des performances et de la vitesse",
      ],
    },
    description: {
      es: [
        "Motos Arretxe necesitaba una web que reflejase la atención y el asesoramiento que dan en el taller, no un escaparate genérico. La diseñamos pensando en quien busca una moto concreta o necesita un mecánico de confianza en Irun.",
        "Cada sección está pensada para resolver dudas rápido: stock, servicios, ubicación y contacto directo. La web carga en menos de un segundo y aparece en las búsquedas de la zona.",
      ],
      en: [
        "Motos Arretxe needed a site that reflects the care and advice they give at the workshop, not a generic showcase. We designed it for the person looking for a specific bike or a trusted mechanic in Irun.",
        "Every section is built to solve doubts fast: stock, services, location and direct contact. The site loads in under a second and shows up in local searches.",
      ],
      eu: [
        "Motos Arretxek tailerrean ematen duten arreta eta aholkularitza islatuko zuen weba behar zuen, ez erakusleku generikoa. Irunen moto zehatza edo mekaniko fidagarria bilatzen duenarentzat diseinatu genuen.",
        "Atal bakoitza zalantzak azkar konpontzeko pentsatuta dago: stocka, zerbitzuak, kokalekua eta zuzeneko kontaktua. Weba segundo bat baino gutxiagoan kargatzen da eta inguruko bilaketetan agertzen da.",
      ],
      fr: [
        "Motos Arretxe avait besoin d'un site qui reflète l'attention et les conseils qu'ils offrent à l'atelier, pas d'une vitrine générique. Nous l'avons conçu pour celui qui cherche une moto précise ou un mécanicien de confiance à Irun.",
        "Chaque section est pensée pour répondre vite aux questions : stock, services, localisation et contact direct. Le site charge en moins d'une seconde et apparaît dans les recherches locales.",
      ],
    },
    testimonial: {
      quote: {
        es: "Atención y asesoramiento impecable. Gran profesional, trabajo muy serio. Gracias.",
        en: "Impeccable attention and advice. Great professional, very thorough work. Thank you.",
        eu: "Arreta eta aholkularitza ezin hobea. Profesional handia, lan oso serioa. Eskerrik asko.",
        fr: "Accompagnement et conseils impeccables. Un grand professionnel, un travail très sérieux. Merci.",
      },
      author: "Motos Arretxe SL",
      role: {
        es: "Concesionario y taller de motos en Irun",
        en: "Motorcycle dealership and workshop in Irun",
        eu: "Motoen kontzesionario eta tailerra Irunen",
        fr: "Concession et atelier moto à Irun",
      },
      rating: 5,
    },
    results: {
      video: "/video/motos-arretxe-resultados.mp4",
      poster: "/video/motos-arretxe-resultados-poster.jpg",
      headline: {
        es: "+332% de interacciones en Google en 3 meses",
        en: "+332% Google interactions in 3 months",
        eu: "%332 elkarrekintza gehiago Google-n 3 hilabetean",
        fr: "+332 % d'interactions sur Google en 3 mois",
      },
      caption: {
        es: "Interacciones del perfil de empresa en Google: de 63 en enero a 272 en abril de 2026. Más de 1.000 interacciones acumuladas. Dato real del panel de Google Business de Motos Arretxe.",
        en: "Google Business Profile interactions: from 63 in January to 272 in April 2026. Over 1,000 interactions in total. Real figure from Motos Arretxe's Google Business dashboard.",
        eu: "Enpresa-profilaren elkarrekintzak Google-n: 63 urtarrilean, 272 2026ko apirilean. 1.000 elkarrekintza baino gehiago guztira. Motos Arretxeren Google Business paneleko benetako datua.",
        fr: "Interactions de la fiche Google Business : de 63 en janvier à 272 en avril 2026. Plus de 1 000 interactions cumulées. Donnée réelle issue du tableau de bord Google Business de Motos Arretxe.",
      },
    },
    cover: "/images/projects/motos-arretxe.avif",
    coverAlt: {
      es: "Captura de la web de Motos Arretxe diseñada por Unax Aller",
      en: "Screenshot of the Motos Arretxe website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Motos Arretxe webaren irudia",
      fr: "Capture du site de Motos Arretxe conçu par Unax Aller",
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
      fr: "Site soigné pour un opticien de caractère",
    },
    sector: {
      es: "Óptica y salud visual",
      en: "Optometry and visual health",
      eu: "Optika eta ikusmen osasuna",
      fr: "Optique et santé visuelle",
    },
    city: "Irun",
    region: "Gipuzkoa",
    year: 2026,
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
      fr: [
        "Design web premium adapté à la marque",
        "Section services et examens de la vue",
        "Galerie éditoriale de montures et de marques",
        "SEO local pour Irun et la région du Bidassoa",
        "Formulaire de rendez-vous et de contact direct",
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
      fr: [
        "Anaka Óptica travaille avec des marques sélectionnées et une attention personnalisée. Son site devait transmettre cette même sensation : soigné, calme, sans bruit visuel, et utile pour qui cherche un opticien de confiance à Irun.",
        "Le design respire, les photos ont du poids et le SEO local place la boutique sur la carte pour des recherches comme opticien à Irun, examen de la vue ou lunettes de vue au Guipuscoa.",
      ],
    },
    cover: "/images/projects/anaka-optica.avif",
    coverAlt: {
      es: "Captura de la web de Anaka Óptica diseñada por Unax Aller",
      en: "Screenshot of the Anaka Óptica website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Anaka Optikaren webaren irudia",
      fr: "Capture du site d'Anaka Óptica conçu par Unax Aller",
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
      fr: "Site pour une agence de solutions IA",
    },
    sector: {
      es: "Inteligencia artificial y consultoría tecnológica",
      en: "Artificial intelligence and tech consultancy",
      eu: "Adimen artifiziala eta teknologia aholkularitza",
      fr: "Intelligence artificielle et conseil technologique",
    },
    city: "Irun",
    region: "Gipuzkoa",
    year: 2026,
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
      fr: [
        "Design et développement web sur mesure",
        "Structure orientée génération de leads B2B",
        "Animations et micro-interactions soignées",
        "Optimisation des performances et du SEO technique",
        "Identité visuelle et système typographique",
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
      fr: [
        "VirtuoSolve propose des solutions d'IA pour les entreprises et avait besoin d'un site qui communique un sérieux technique sans tomber dans le cliché du SaaS générique. Nous avons conçu une expérience avec sa propre personnalité : typographie soignée, rythme éditorial et micro-animations qui renforcent les messages clés.",
        "La structure est orientée génération de leads B2B : chaque section mène le visiteur vers un contact qualifié, avec un SEO technique affiné et des performances mesurées à chaque interaction.",
      ],
    },
    testimonial: {
      quote: {
        es: "Trabajar con este diseñador web ha sido una de las mejores decisiones para mi agencia de IA. Entendió perfectamente lo que necesitábamos.",
        en: "Working with this web designer has been one of the best decisions for my AI agency. He understood exactly what we needed.",
        eu: "Web diseinatzaile honekin lan egitea nire AI agentziarentzat hartu ditudan erabaki onenetako bat izan da. Behar genuena ezin hobeto ulertu zuen.",
        fr: "Travailler avec ce designer web a été l'une des meilleures décisions pour mon agence d'IA. Il a parfaitement compris ce dont nous avions besoin.",
      },
      author: "Iker Aller",
      role: {
        es: "Fundador, VirtuoSolve",
        en: "Founder, VirtuoSolve",
        eu: "Sortzailea, VirtuoSolve",
        fr: "Fondateur, VirtuoSolve",
      },
      rating: 5,
    },
    cover: "/images/projects/virtuosolve.avif",
    coverAlt: {
      es: "Captura de la web de VirtuoSolve diseñada por Unax Aller",
      en: "Screenshot of the VirtuoSolve website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako VirtuoSolve webaren irudia",
      fr: "Capture du site de VirtuoSolve conçu par Unax Aller",
    },
    accent: { color: "#3b82f6", ink: "#06101f" },
  },
  {
    slug: "tecmac",
    name: "Tecmac",
    tagline: {
      es: "Web técnica para una ingeniería de servicios auxiliares de laminación",
      en: "Technical website for a rolling-mill auxiliary services engineering firm",
      eu: "Web teknikoa ijezketa-zerbitzu osagarrien ingeniaritza batentzat",
      fr: "Site technique pour un bureau d'ingénierie de services auxiliaires de laminage",
    },
    sector: {
      es: "Ingeniería industrial y siderurgia",
      en: "Industrial engineering and steelmaking",
      eu: "Ingeniaritza industriala eta siderurgia",
      fr: "Ingénierie industrielle et sidérurgie",
    },
    city: "Navarra",
    region: "Navarra",
    year: 2026,
    url: "https://tecmac.es",
    tasks: {
      es: [
        "Diseño y desarrollo web a medida",
        "Estructura orientada a captación B2B industrial",
        "Catálogo de servicios y sectores",
        "SEO técnico para nichos industriales",
        "Optimización de rendimiento y carga rápida",
      ],
      en: [
        "Custom web design and development",
        "Structure tuned for industrial B2B capture",
        "Services and sectors catalogue",
        "Technical SEO for industrial niches",
        "Performance and fast-loading optimisation",
      ],
      eu: [
        "Neurriko web diseinu eta garapena",
        "B2B industrialerako egokitutako egitura",
        "Zerbitzu eta sektoreen katalogoa",
        "SEO teknikoa nitxo industrialetarako",
        "Errendimendu eta karga azkarraren optimizazioa",
      ],
      fr: [
        "Design et développement web sur mesure",
        "Structure orientée génération de leads B2B industriels",
        "Catalogue de services et de secteurs",
        "SEO technique pour niches industrielles",
        "Optimisation des performances et chargement rapide",
      ],
    },
    description: {
      es: [
        "Tecmac es una ingeniería con más de 30 años de experiencia en mecanizado, fabricación y servicios auxiliares para la industria del acero. Su web tenía que transmitir solidez técnica y trayectoria, sin caer en el catálogo aburrido.",
        "Diseñamos una experiencia con identidad propia: hero potente, navegación clara por servicios y sectores, y una estructura orientada a la captación B2B de clientes industriales. El SEO técnico apunta a nichos muy específicos del sector siderúrgico.",
      ],
      en: [
        "Tecmac is an engineering firm with over 30 years of experience in machining, fabrication and auxiliary services for the steel industry. Their site needed to convey technical solidity and track record without becoming a dull catalogue.",
        "We designed an experience with its own voice: a strong hero, clear navigation through services and sectors, and a structure tuned for B2B capture of industrial clients. Technical SEO targets very specific niches in the steel sector.",
      ],
      eu: [
        "Tecmac altzairu industrian mekanizatu, fabrikazio eta zerbitzu osagarrietan 30 urtetik gorako esperientzia duen ingeniaritza da. Webak sendotasun teknikoa eta ibilbidea adierazi behar zituen, katalogo aspergarri batean erori gabe.",
        "Bere ahotsa duen esperientzia diseinatu genuen: hero indartsua, zerbitzu eta sektoreetan zehar nabigazio argia, eta bezero industrialen B2B bilketarako egokitutako egitura. SEO teknikoa siderurgia sektoreko nitxo zehatzetara bideratzen da.",
      ],
      fr: [
        "Tecmac est un bureau d'ingénierie avec plus de 30 ans d'expérience en usinage, fabrication et services auxiliaires pour l'industrie sidérurgique. Son site devait transmettre solidité technique et parcours, sans devenir un catalogue ennuyeux.",
        "Nous avons conçu une expérience avec sa propre identité : un hero percutant, une navigation claire par services et secteurs, et une structure orientée génération de leads B2B auprès de clients industriels. Le SEO technique cible des niches très spécifiques du secteur sidérurgique.",
      ],
    },
    cover: "/images/projects/tecmac.avif",
    coverAlt: {
      es: "Captura de la web de Tecmac diseñada por Unax Aller",
      en: "Screenshot of the Tecmac website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Tecmac webaren irudia",
      fr: "Capture du site de Tecmac conçu par Unax Aller",
    },
    accent: { color: "#ef4444", ink: "#1c0a0a" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCity(citySlug: string): Project[] {
  return projects.filter((p) => p.relatedCitySlug === citySlug);
}
