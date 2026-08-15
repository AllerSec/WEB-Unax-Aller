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
  {
    slug: "errekalde-ostatua",
    name: "Errekalde Ostatua",
    tagline: {
      es: "Web para el bar de toda la vida de Bera, con carta y terraza",
      en: "Website for Bera's lifelong bar, with menu and terrace",
      eu: "Berako betiko tabernarentzako weba, karta eta terrazarekin",
      fr: "Site pour le bar historique de Bera, avec carte et terrasse",
    },
    sector: {
      es: "Bar, pintxos y comedor",
      en: "Bar, pintxos and dining room",
      eu: "Taberna, pintxoak eta jantokia",
      fr: "Bar, pintxos et salle à manger",
    },
    city: "Bera",
    region: "Navarra",
    year: 2026,
    url: "https://errekalderestaurante.com",
    relatedCitySlug: "disenador-web-bera",
    tasks: {
      es: [
        "Diseño y desarrollo web a medida",
        "Carta digital siempre actualizada",
        "Horario en vivo: abierto o cerrado según la hora",
        "Web en 4 idiomas (es/eu/en/fr) para el cliente francés",
        "SEO local para Bera y Bortziriak",
      ],
      en: [
        "Custom web design and development",
        "Digital menu kept permanently up to date",
        "Live opening status: open or closed by the hour",
        "Site in 4 languages (es/eu/en/fr) for French visitors",
        "Local SEO for Bera and Bortziriak",
      ],
      eu: [
        "Web diseinu eta garapen pertsonalizatua",
        "Karta digitala beti eguneratuta",
        "Zuzeneko ordutegia: irekita edo itxita orduaren arabera",
        "Weba 4 hizkuntzatan (es/eu/en/fr) frantses bezeroarentzat",
        "Tokiko SEOa Bera eta Bortziriakentzat",
      ],
      fr: [
        "Conception et développement web sur mesure",
        "Carte numérique toujours à jour",
        "Horaires en direct : ouvert ou fermé selon l'heure",
        "Site en 4 langues (es/eu/en/fr) pour la clientèle française",
        "SEO local pour Bera et Bortziriak",
      ],
    },
    description: {
      es: [
        "Errekalde es el bar de Bera: barra de pino con tiradores y prensa del día, comedor y una terraza con pérgola de lamas orientables. 637 reseñas en Google y un 4,3 de valoración. Lo que no tenía era una web a la altura de lo que ya funcionaba puertas adentro.",
        "El planteamiento fue directo: que quien busque dónde comer en Bera encuentre la carta, el horario y el teléfono en tres segundos desde el móvil. El estado «abierto / cierra a las 23:00» se calcula en vivo, así que nadie se planta en la puerta un lunes que está cerrado.",
        "Al estar Bera a un paso de la frontera, la web va en castellano, euskera, inglés y francés. Mucho cliente francés cruza a comer y ahora encuentra la carta en su idioma, que es justo la diferencia entre que entre o siga de largo.",
      ],
      en: [
        "Errekalde is the bar in Bera: a pine bar with taps and the day's papers, a dining room and a terrace with an adjustable-slat pergola. 637 Google reviews and a 4.3 rating. What it lacked was a website matching what already worked indoors.",
        "The approach was straightforward: anyone searching where to eat in Bera should find the menu, the opening hours and the phone number within three seconds on their phone. The «open / closes at 23:00» status is computed live, so nobody turns up on a Monday when it's shut.",
        "With Bera a step from the border, the site runs in Spanish, Basque, English and French. Plenty of French customers cross over to eat and now find the menu in their language — precisely the difference between walking in and walking past.",
      ],
      eu: [
        "Errekalde Berako taberna da: pinuzko barra tiradore eta eguneko prentsarekin, jantokia eta lama orientagarridun pergola duen terraza. 637 iritzi Google-n eta 4,3ko balorazioa. Falta zitzaiona barruan zebilenaren pareko weba zen.",
        "Planteamendua zuzena izan zen: Beran non jan bilatzen duenak karta, ordutegia eta telefonoa hiru segundotan aurkitzea mugikorretik. «Irekita / 23:00etan ixten du» egoera zuzenean kalkulatzen da, inor ez dadin atean gelditu itxita dagoen astelehen batean.",
        "Bera mugatik pauso batera dagoenez, weba gaztelaniaz, euskaraz, ingelesez eta frantsesez dago. Frantses bezero askok zeharkatzen du jatera eta orain bere hizkuntzan aurkitzen du karta: hori da, hain zuzen, sartzearen eta aurrera jarraitzearen arteko aldea.",
      ],
      fr: [
        "Errekalde, c'est le bar de Bera : un comptoir en pin avec les tireuses et la presse du jour, une salle à manger et une terrasse avec pergola à lames orientables. 637 avis Google et une note de 4,3. Ce qui manquait, c'était un site à la hauteur de ce qui fonctionnait déjà à l'intérieur.",
        "L'approche a été directe : celui qui cherche où manger à Bera doit trouver la carte, les horaires et le téléphone en trois secondes depuis son mobile. Le statut « ouvert / ferme à 23h00 » est calculé en direct, donc personne ne se présente un lundi de fermeture.",
        "Bera étant à un pas de la frontière, le site est en espagnol, basque, anglais et français. Beaucoup de clients français traversent pour manger et trouvent désormais la carte dans leur langue : c'est exactement la différence entre entrer et passer son chemin.",
      ],
    },
    cover: "/images/projects/errekalde-ostatua.avif",
    coverAlt: {
      es: "Captura de la web de Errekalde Ostatua diseñada por Unax Aller",
      en: "Screenshot of the Errekalde Ostatua website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Errekalde Ostatua webaren irudia",
      fr: "Capture du site d'Errekalde Ostatua conçu par Unax Aller",
    },
    accent: { color: "#1f4d3d", ink: "#08130f" },
  },
  {
    slug: "sara-kafetegia",
    name: "Sara Kafetegia",
    tagline: {
      es: "Web cálida para la cafetería con terraza al Bidasoa",
      en: "Warm website for the café with a terrace on the Bidasoa",
      eu: "Web epela Bidasoara terraza duen kafetegiarentzat",
      fr: "Site chaleureux pour le café avec terrasse sur la Bidassoa",
    },
    sector: {
      es: "Cafetería, desayunos y pintxos",
      en: "Café, breakfasts and pintxos",
      eu: "Kafetegia, gosariak eta pintxoak",
      fr: "Café, petits-déjeuners et pintxos",
    },
    city: "Bera",
    region: "Navarra",
    year: 2026,
    url: "https://sarakafetegia.com",
    relatedCitySlug: "disenador-web-bera",
    tasks: {
      es: [
        "Diseño y desarrollo web a medida",
        "Identidad cálida en tonos ámbar sobre foto real del local",
        "Carta de desayunos, bollería y pintxos",
        "Web en 4 idiomas (es/eu/en/fr)",
        "SEO local para Bera y el valle del Bidasoa",
      ],
      en: [
        "Custom web design and development",
        "Warm amber identity over real photography of the café",
        "Menu of breakfasts, pastries and pintxos",
        "Site in 4 languages (es/eu/en/fr)",
        "Local SEO for Bera and the Bidasoa valley",
      ],
      eu: [
        "Web diseinu eta garapen pertsonalizatua",
        "Nortasun epela anbar tonuetan lokalaren benetako argazkiaren gainean",
        "Gosari, opil eta pintxoen karta",
        "Weba 4 hizkuntzatan (es/eu/en/fr)",
        "Tokiko SEOa Bera eta Bidasoa haranarentzat",
      ],
      fr: [
        "Conception et développement web sur mesure",
        "Identité chaleureuse en tons ambrés sur photo réelle du lieu",
        "Carte de petits-déjeuners, viennoiseries et pintxos",
        "Site en 4 langues (es/eu/en/fr)",
        "SEO local pour Bera et la vallée de la Bidassoa",
      ],
    },
    description: {
      es: [
        "Sara Kafetegia abre a las 7:30 y es donde medio Bera desayuna. Café recién hecho, bollería, tortilla y una terraza junto al Bidasoa. El interior tiene un mural de bosque y bombillas Edison que le dan carácter, y la web tenía que transmitir eso mismo antes de que nadie entre por la puerta.",
        "Por eso el diseño arranca con foto real del local a pantalla completa, no con un banco de imágenes. El ámbar de la marca sobre esa foto ya cuenta de qué va el sitio: cálido, de pueblo, sin pretensiones. Debajo, lo práctico: carta, cómo llegar y horario en vivo.",
        "Cuatro idiomas, porque en Bortziriak se mezcla el cliente de casa con el que viene de Francia. Y SEO local trabajado para «desayunar en Bera» y «cafetería Bortziriak», que es lo que la gente teclea de verdad cuando busca un sitio donde parar.",
      ],
      en: [
        "Sara Kafetegia opens at 7:30 and it's where half of Bera has breakfast. Freshly made coffee, pastries, tortilla and a terrace beside the Bidasoa. Inside there's a forest mural and Edison bulbs that give it character, and the site had to convey that before anyone walks through the door.",
        "That's why the design opens with full-screen real photography of the café rather than stock imagery. The brand's amber over that photo already tells you what the place is: warm, small-town, unpretentious. Below it, the practical part: menu, directions and live opening hours.",
        "Four languages, because in Bortziriak local customers mix with visitors from France. And local SEO worked for «breakfast in Bera» and «café Bortziriak», which is what people actually type when looking for somewhere to stop.",
      ],
      eu: [
        "Sara Kafetegia 7:30ean irekitzen da eta Berako erdiak han gosaltzen du. Kafe berri egina, opilak, tortilla eta Bidasoa ondoko terraza. Barruan basoko mural bat eta Edison bonbillak daude, nortasuna ematen diotenak, eta webak hori bera transmititu behar zuen inor atetik sartu aurretik.",
        "Horregatik diseinua lokalaren benetako argazkiarekin hasten da pantaila osoan, ez irudi-bankuarekin. Markaren anbarra argazki horren gainean dagoeneko kontatzen du zer den lekua: epela, herrikoa, itxurakeriarik gabea. Azpian, praktikoa: karta, nola iritsi eta zuzeneko ordutegia.",
        "Lau hizkuntza, Bortziriaketan etxeko bezeroa Frantziatik datorrenarekin nahasten baita. Eta tokiko SEOa «Beran gosaldu» eta «Bortziriak kafetegia» bilaketetarako landuta, hori baita jendeak benetan idazten duena gelditzeko lekua bilatzean.",
      ],
      fr: [
        "Sara Kafetegia ouvre à 7h30 et c'est là que la moitié de Bera prend son petit-déjeuner. Café fraîchement préparé, viennoiseries, tortilla et une terrasse au bord de la Bidassoa. À l'intérieur, une fresque de forêt et des ampoules Edison lui donnent du caractère, et le site devait transmettre cela avant même que l'on franchisse la porte.",
        "C'est pourquoi le design s'ouvre sur une photo réelle du lieu en plein écran, et non sur une banque d'images. L'ambre de la marque sur cette photo raconte déjà ce qu'est l'endroit : chaleureux, villageois, sans prétention. En dessous, le pratique : carte, itinéraire et horaires en direct.",
        "Quatre langues, car à Bortziriak la clientèle locale se mêle à celle qui vient de France. Et un SEO local travaillé pour « petit-déjeuner à Bera » et « café Bortziriak », ce que les gens tapent réellement quand ils cherchent où s'arrêter.",
      ],
    },
    cover: "/images/projects/sara-kafetegia.avif",
    coverAlt: {
      es: "Captura de la web de Sara Kafetegia diseñada por Unax Aller",
      en: "Screenshot of the Sara Kafetegia website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Sara Kafetegia webaren irudia",
      fr: "Capture du site de Sara Kafetegia conçu par Unax Aller",
    },
    accent: { color: "#e5a04a", ink: "#1a1005" },
  },
  {
    slug: "goxune",
    name: "Goxune",
    tagline: {
      es: "Panadería, pastelería y cafetería de Bera en una sola web",
      en: "Bakery, patisserie and café of Bera in a single website",
      eu: "Berako okindegia, gozotegia eta kafetegia web bakarrean",
      fr: "Boulangerie, pâtisserie et café de Bera sur un seul site",
    },
    sector: {
      es: "Panadería, pastelería y cafetería",
      en: "Bakery, patisserie and café",
      eu: "Okindegia, gozotegia eta kafetegia",
      fr: "Boulangerie, pâtisserie et café",
    },
    city: "Bera",
    region: "Navarra",
    year: 2026,
    url: "https://goxunekafetegia.com",
    relatedCitySlug: "disenador-web-bera",
    tasks: {
      es: [
        "Diseño y desarrollo web a medida",
        "Un solo sitio para cuatro negocios en uno",
        "Carta y galería del obrador y la cafetería",
        "Prueba social visible: 4,5 de valoración y 200+ reseñas",
        "SEO local para Bera y Bortziriak",
      ],
      en: [
        "Custom web design and development",
        "One site covering four businesses in one",
        "Menu and gallery of the bakehouse and the café",
        "Visible social proof: 4.5 rating and 200+ reviews",
        "Local SEO for Bera and Bortziriak",
      ],
      eu: [
        "Web diseinu eta garapen pertsonalizatua",
        "Gune bakarra lau negozio batentzat",
        "Obradore eta kafetegiaren karta eta galeria",
        "Gizarte-froga ikusgai: 4,5eko balorazioa eta 200+ iritzi",
        "Tokiko SEOa Bera eta Bortziriakentzat",
      ],
      fr: [
        "Conception et développement web sur mesure",
        "Un seul site pour quatre commerces en un",
        "Carte et galerie du fournil et du café",
        "Preuve sociale visible : note de 4,5 et plus de 200 avis",
        "SEO local pour Bera et Bortziriak",
      ],
    },
    description: {
      es: [
        "Goxune es cuatro cosas a la vez: okindegia, gozotegia, kafetegia y barra. Ese era justo el problema a resolver — explicar en una sola web que ahí puedes comprar el pan, encargar una tarta, desayunar y tomar algo, sin que el mensaje se convierta en un lío.",
        "La solución fue una portada que lo dice sin rodeos: «Pan recién hecho, café y buenos ratos», con foto real del local y las cuatro categorías en el encabezado. La prueba social va arriba y a la vista: 4,5 de valoración Google y más de 200 reseñas, que en un pueblo pesan más que cualquier eslogan.",
        "Web en cuatro idiomas y SEO local orientado a lo que se busca de verdad en la zona: «panadería Bera», «desayunos Bortziriak» o «tartas por encargo Navarra». La marca ya funcionaba en la calle; ahora también funciona cuando alguien la busca desde el móvil.",
      ],
      en: [
        "Goxune is four things at once: okindegia, gozotegia, kafetegia and bar. That was precisely the problem to solve — explaining on a single site that you can buy bread, order a cake, have breakfast and grab a drink there, without the message turning into a mess.",
        "The answer was a homepage that says it plainly: «Freshly baked bread, coffee and good times», with real photography of the place and the four categories in the header. Social proof sits high and visible: a 4.5 Google rating and over 200 reviews, which in a small town count for more than any slogan.",
        "The site runs in four languages, with local SEO aimed at what people actually search in the area: «bakery Bera», «breakfast Bortziriak» or «cakes to order Navarre». The brand already worked on the street; now it works when someone looks it up on their phone.",
      ],
      eu: [
        "Goxune lau gauza da aldi berean: okindegia, gozotegia, kafetegia eta barra. Hori zen, hain zuzen, ebatzi beharreko arazoa — web bakar batean azaltzea han ogia erosi, tarta bat enkargatu, gosaldu eta zerbait hartu dezakezula, mezua nahaste bihurtu gabe.",
        "Konponbidea zuzen esaten duen azala izan zen: «Ogi berri egina, kafea eta une onak», lokalaren benetako argazkiarekin eta lau kategoriak goiburuan. Gizarte-froga goian eta ikusgai doa: 4,5eko Google balorazioa eta 200 iritzi baino gehiago, herri batean edozein esloganek baino gehiago balio dutenak.",
        "Weba lau hizkuntzatan, eta tokiko SEOa inguruan benetan bilatzen denera bideratuta: «Berako okindegia», «Bortziriak gosariak» edo «enkarguzko tartak Nafarroa». Marka kalean bazebilen; orain mugikorretik bilatzen dutenean ere badabil.",
      ],
      fr: [
        "Goxune, c'est quatre choses à la fois : okindegia, gozotegia, kafetegia et bar. C'était précisément le problème à résoudre — expliquer sur un seul site qu'on peut y acheter le pain, commander un gâteau, prendre son petit-déjeuner et boire un verre, sans que le message devienne confus.",
        "La réponse a été une page d'accueil qui le dit sans détour : « Pain frais, café et bons moments », avec une photo réelle du lieu et les quatre catégories en en-tête. La preuve sociale est placée en haut et bien visible : note Google de 4,5 et plus de 200 avis, ce qui, dans un village, pèse plus que n'importe quel slogan.",
        "Site en quatre langues et SEO local orienté vers ce que l'on cherche réellement dans la zone : « boulangerie Bera », « petits-déjeuners Bortziriak » ou « gâteaux sur commande Navarre ». La marque fonctionnait déjà dans la rue ; elle fonctionne désormais aussi quand on la cherche depuis son mobile.",
      ],
    },
    cover: "/images/projects/goxune.avif",
    coverAlt: {
      es: "Captura de la web de Goxune diseñada por Unax Aller",
      en: "Screenshot of the Goxune website designed by Unax Aller",
      eu: "Unax Allerrek diseinatutako Goxune webaren irudia",
      fr: "Capture du site de Goxune conçu par Unax Aller",
    },
    accent: { color: "#c2652c", ink: "#180b04" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCity(citySlug: string): Project[] {
  return projects.filter((p) => p.relatedCitySlug === citySlug);
}
