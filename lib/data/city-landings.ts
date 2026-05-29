import type { CityLandingContent } from "@/components/landing/CityLanding";

export type LocaleKey = "es" | "en" | "eu";

export interface CityLandingDef {
  slug: string;
  cityNames: Record<LocaleKey, string>;
  regionNames: Record<LocaleKey, string>;
  distanceFromIrunKm?: number;
  sectors?: { es: string; en: string; eu: string };
  /** 2-3 paragraphs of unique, location-specific copy. Mention real
   *  neighbourhoods, industrial estates, landmarks. Lifts the page out of
   *  doorway-territory by providing genuine local content Google can verify. */
  localTouches?: Record<LocaleKey, string[]>;
  /** Slugs of nearby city-landings — internal linking that demonstrates
   *  real geographic coverage rather than scattered keyword targeting. */
  nearbyCities?: string[];
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
    localTouches: {
      es: [
        "Bilbao no es una ciudad cualquiera: ha pasado de ser un puerto industrial a referente cultural y de diseño en Europa. Tu web tiene que estar a esa altura. Trabajo con negocios del Casco Viejo, del Ensanche, de Indautxu y de Deusto, además de empresas de los polígonos de Zamudio, Asua o el Parque Tecnológico de Bizkaia.",
        "Lo que veo es que en Bilbao hay clientes acostumbrados a estándares altos: el Guggenheim, BilbaoBerria, las nuevas torres de la Ría... la gente espera diseño cuidado en cualquier sitio, también en una web. Por eso en los proyectos de Bilbao pongo especial atención en tipografía, jerarquía visual y sensación premium sin caer en lo recargado.",
        "Para SEO local cubro búsquedas tipo «diseñador web Bilbao», «desarrollador web Bizkaia», «agencia web Bilbao», pero también las más específicas de barrio o sector. Configuro Google Business Profile con todas las zonas de servicio y vinculamos cada búsqueda a la página correcta.",
      ],
      en: [
        "Bilbao isn't an ordinary city: it has gone from industrial port to a European reference for culture and design. Your website has to match that level. I work with businesses in the Casco Viejo, Ensanche, Indautxu and Deusto, plus companies from the Zamudio, Asua and Bizkaia Technology Park industrial estates.",
        "What I see is that Bilbao clients expect high standards: the Guggenheim, BilbaoBerria, the new Ría towers... people expect quality design everywhere, including websites. That's why I put extra care in typography, visual hierarchy and a premium feel without being overwrought.",
        "For local SEO I cover queries like «web designer Bilbao», «web developer Bizkaia», «web agency Bilbao», plus the more specific by-neighbourhood or by-sector searches. I set up Google Business Profile with all service zones and tie each query to the right page.",
      ],
      eu: [
        "Bilbo ez da edozein hiri: portu industrial izatetik Europako kultura eta diseinu erreferentzia izatera pasatu da. Zure webguneak maila horretara iritsi behar du. Alde Zaharreko, Zabalguneko, Indautxuko eta Deustuko negozioekin lan egiten dut, baita Zamudio, Asua eta Bizkaia Teknologi Parkeko poligonoetako enpresekin ere.",
        "Bilbon bezeroak maila altuko estandarretara ohituta daudela ikusten dut: Guggenheim, BilbaoBerria, Ibaiko dorre berriak... edozein lekutan diseinu zaindua espero da, baita web batean ere. Horregatik tipografian, hierarkia bisualean eta premium sentsazioan jartzen dut arreta berezia, gehiegizkoa izan gabe.",
        "Tokiko SEO lanetan «diseinatzaile web Bilbao», «garatzailea web Bizkaia», «web agentzia Bilbao» bezalako bilaketak lantzen ditut, eta auzo edo sektoreko bilaketa zehatzagoak ere bai. Google Business Profile zerbitzu eremu guztiekin konfiguratzen dut.",
      ],
    },
    nearbyCities: ["disenador-web-vitoria", "disenador-web-donostia"],
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
    localTouches: {
      es: [
        "Donostia es ciudad pequeña con clientes muy exigentes. Trabajo con restaurantes y bares de la Parte Vieja, comercios premium del Centro y Gros, hoteles de la zona de la Concha y consultas profesionales de Antiguo y Amara. Cada uno tiene una clientela específica y la web tiene que hablar su idioma.",
        "Aquí el SEO local pesa mucho: las búsquedas «mejor restaurante en San Sebastián», «hotel en la Concha», «óptica en Donostia» se las llevan los que tienen ficha de Google bien configurada y web rápida en móvil. Eso es exactamente lo que monto: web rápida en móvil, ficha de Google Business Profile bien configurada y reseñas recientes para que salgas el primero en el mapa.",
        "Estoy a 21 km en coche desde Irun, así que reuniones presenciales en Donostia son habituales. Tomar café cerca del Boulevard antes de cerrar un proyecto pasa a menudo.",
      ],
      en: [
        "Donostia is a small city with very demanding clients. I work with restaurants and bars in the Old Town, premium retail in the city centre and Gros, hotels around La Concha and professional practices in Antiguo and Amara. Each has its own audience and the website has to speak their language.",
        "Local SEO matters a lot here: queries like «best restaurant San Sebastián», «hotel La Concha», «optician Donostia» go to those with a well-configured Google profile and a fast mobile site. That's exactly what I build: fast mobile site, properly set up Google Business Profile and recent reviews so you rank first on the map.",
        "I'm 21 km away by car from Irun, so in-person meetings in Donostia are common. Coffee near the Boulevard before closing a project happens often.",
      ],
      eu: [
        "Donostia hiri txikia da bezero oso exijenteekin. Parte Zaharreko jatetxe eta tabernekin, Erdialde eta Groseko denda premiumekin, Kontxa inguruko hotelekin eta Antiguo eta Amarako kontsulta profesionalekin lan egiten dut. Bakoitzak bere bezero mota du eta webak haien hizkuntza hitz egin behar du.",
        "Hemen tokiko SEO lanak pisu handia du: «San Sebastiángo jatetxe onena», «Kontxako hotela», «Donostiako optika» bilaketak ondo konfiguratutako Google fitxa eta mugikorrean azkarra den web bat dutenek eramaten dituzte. Hori da egiten dudana: web azkarra, Google Business Profile ondo konfiguratuta eta azken iritziak.",
        "Iruneik 21 km-ra nago kotxez, beraz Donostian aurrez aurreko bilerak ohikoak dira. Boulevard inguruan kafea hartzea proiektu bat itxi aurretik askotan gertatzen da.",
      ],
    },
    nearbyCities: ["disenador-web-hondarribia", "disenador-web-errenteria", "disenador-web-lasarte"],
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
    localTouches: {
      es: [
        "Vitoria-Gasteiz tiene un tejido empresarial diferente al resto del País Vasco: sede del Gobierno Vasco, grandes industrias en Júndiz y Gamarra, comercio de calidad en el Casco Medieval y la calle Dato, y todo el ecosistema de bodegas de Rioja Alavesa a una hora. Cada cliente tiene una mentalidad distinta.",
        "Para industria de Júndiz/Gamarra suelo trabajar webs B2B muy técnicas: catálogo, sección de capacidades, descarga de fichas, formularios cualificados. Para bodegas de Laguardia y Elciego, en cambio, lo importante es la experiencia visual, la marca y el ecommerce sencillo. La web la adapto a quién va a comprar.",
        "Vitoria está a 108 km de Irun. Para reuniones presenciales suelo combinar una visita inicial con seguimiento por videollamada. La parte buena: la web la entrego igual de fina aunque no esté pisando tu oficina cada semana.",
      ],
      en: [
        "Vitoria-Gasteiz has a different business fabric than the rest of the Basque Country: Basque Government headquarters, big industry in Júndiz and Gamarra, quality retail in the Medieval Quarter and Dato street, and the full Rioja Alavesa winery ecosystem an hour away. Each client has a different mindset.",
        "For industry in Júndiz/Gamarra I usually build very technical B2B sites: catalogue, capabilities section, datasheet downloads, qualified forms. For wineries in Laguardia and Elciego instead the priority is visual experience, brand and a simple ecommerce. I adapt the site to who's going to buy.",
        "Vitoria is 108 km from Irun. For in-person meetings I usually combine an initial visit with video follow-up. The upside: I deliver the website just as polished even if I'm not physically in your office every week.",
      ],
      eu: [
        "Vitoria-Gasteizek Euskal Herriko gainerakoaren ezberdina den enpresa-egitura du: Eusko Jaurlaritzaren egoitza, industria handiak Juniz eta Gamarran, kalitatezko merkataritza Erdi Aroko Alde Zaharrean eta Dato kalean, eta Arabako Errioxako upategi sistema osoa orduerdira. Bezero bakoitzak mentalitate desberdina du.",
        "Juniz/Gamarrako industriarako web tekniko oso B2B-ak egiten ditut: katalogoa, gaitasun atala, fitxen deskarga, formulario kualifikatuak. Laguardia eta Elciegoko upategientzat, aldiz, garrantzitsuena esperientzia bisuala, marka eta ekomertzio sinple bat dira. Weba erosiko duenari egokitzen diot.",
        "Vitoria Iruneik 108 km-ra dago. Aurrez aurreko bilerentzat hasierako bisita bat bideo-deiekin konbinatzen dut. Onura: weba berdin fina entregatzen dut nahiz eta zure bulegoan astero ez egon.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-donostia"],
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
    localTouches: {
      es: [
        "Hondarribia es básicamente la puerta de al lado: 5 km desde Irun, voy y vuelvo en bici. Trabajo con bares y restaurantes del casco medieval, comercios de la Marina, hoteles boutique cerca de la playa y empresas pequeñas del polígono Zubieta.",
        "Aquí la temporada turística manda: la web tiene que cargar rápido cuando los visitantes franceses, vascos del interior y madrileños buscan reservar. Optimizo para móvil con conexión lenta, bilingüismo es/eu/en/fr (porque el francés viene fijo) y SEO local pegado al nombre del establecimiento.",
        "Estar a 5 km significa que reuniones presenciales son tan fáciles como un café. Si quieres revisar un cambio en directo, paso por la mañana antes de comer y lo vemos juntos en tu pantalla.",
      ],
      en: [
        "Hondarribia is basically next door: 5 km from Irun, I bike there and back. I work with bars and restaurants in the medieval old town, retailers in the Marina, boutique hotels near the beach and small companies in the Zubieta industrial estate.",
        "Tourist season rules here: the site has to load fast when French visitors, Basque locals from inland and Madrid travellers come looking to book. I optimise for mobile on slow connections, multilingual es/eu/en/fr (French is a given here) and local SEO tied to the venue name.",
        "Being 5 km away means in-person meetings are as easy as coffee. If you want to review a change live, I drop by mid-morning and we look at it together on your screen.",
      ],
      eu: [
        "Hondarribia funtsean ondoko atea da: Iruneik 5 km-ra, bizikletaz joan-etorria egiten dut. Erdi Aroko alde zaharreko taberna eta jatetxeekin lan egiten dut, Marinako dendekin, hondartza inguruko hotel boutikeekin eta Zubieta poligonoko enpresa txikiekin.",
        "Hemen turismo denboraldiak agintzen du: webak azkar kargatu behar du frantziar bisitariak, barnealdeko euskaldunak eta madrildarrak bila datozenean. Mugikorrerako optimizatzen dut konexio motelarekin, eleaniztuna es/eu/en/fr (frantsesa hemen ezinbestekoa da) eta tokiko SEOa establezimenduaren izenari lotuta.",
        "5 km-ra egotea aurrez aurreko bilerak kafea bezain errazak izatea esan nahi du. Aldaketa bat zuzenean ikusi nahi baduzu, goizez pasatzen naiz eta zure pantailan ikusten dugu elkarrekin.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-errenteria"],
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
    localTouches: {
      es: [
        "Errenteria es ciudad de tamaño medio con un peso industrial fuerte: polígonos como Lintzirin, Galtzaraborda y Masti han crecido mucho en los últimos años. Trabajo con talleres, distribuidores, comercios del centro junto al ayuntamiento y restaurantes que abastecen al barrio.",
        "Aquí la web tiene que pesar poco y cargar bien en cualquier móvil. Mucha consulta llega desde el coche o desde la furgoneta de un cliente buscando un proveedor. Lo importante es que en 3 segundos sepa: qué haces, dónde estás y cómo te contacta. Eso es lo que monto.",
      ],
      en: [
        "Errenteria is a mid-sized town with strong industrial presence: estates like Lintzirin, Galtzaraborda and Masti have grown a lot in recent years. I work with workshops, distributors, retailers in the centre near the town hall and restaurants serving the neighbourhood.",
        "The site has to be lightweight and load well on any mobile. Much of the lookup happens from a car or a client's van searching for a supplier. What matters is that in 3 seconds they know: what you do, where you are and how to reach you. That's what I build.",
      ],
      eu: [
        "Errenteria tamaina ertaineko hiria da industria-pisu handiarekin: Lintzirin, Galtzaraborda eta Mastiren bezalako poligonoak asko hazi dira azken urteetan. Tailerrekin, banatzaileekin, udaletxe inguruko erdialdeko dendekin eta auzoa hornitzen duten jatetxeekin lan egiten dut.",
        "Hemen webak gutxi pisatu eta edozein mugikorrean ondo kargatu behar du. Kontsulta asko kotxetik edo bezeroaren furgonetatik etortzen dira hornitzaile bila. Garrantzitsuena hauxe da: 3 segundoan jakin behar dute zer egiten duzun, non zauden eta nola kontaktatu. Hori da egiten dudana.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-hondarribia", "disenador-web-lasarte"],
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
    localTouches: {
      es: [
        "Lasarte-Oria es ciudad pequeña con tirón comercial propio: la zona del Hipódromo, el comercio del centro, los polígonos junto a la N-1 y los servicios profesionales. Trabajo con negocios locales que necesitan posicionar en su nicho sin competir directamente con Donostia.",
        "Aquí veo a menudo negocios familiares de segunda o tercera generación que están dando el salto digital. La web tiene que respetar lo que ya funciona offline: el boca a boca, la confianza del barrio. Por eso pongo testimonios, fotos reales del local y todo lo que ayude a transmitir ese «aquí me conocen».",
      ],
      en: [
        "Lasarte-Oria is a small town with its own commercial pull: the Racecourse area, town centre retail, industrial estates along the N-1 and professional services. I work with local businesses that need to rank in their niche without going head-to-head with Donostia.",
        "I often see family businesses on their second or third generation making the digital leap. The website has to respect what already works offline: word of mouth, neighbourhood trust. That's why I include real testimonials, photos of the actual premises and everything that conveys that «people here know me» feel.",
      ],
      eu: [
        "Lasarte-Oria hiri txikia da bere merkataritza eraginkortasunarekin: Hipodromoa, erdialdeko merkataritza, N-1 ondoko poligonoak eta zerbitzu profesionalak. Beren nitxoan posizionatu behar duten tokiko negozioekin lan egiten dut, Donostiarekin zuzenean lehiatu gabe.",
        "Hemen sarritan ikusten ditut bigarren edo hirugarren belaunaldiko familia negozioak jauzi digitala egiten. Webak offline funtzionatzen duena errespetatu behar du: ahoz ahokoa, auzoaren konfiantza. Horregatik testigantza errealak, lokalaren argazki errealak eta «hemen ezagutzen naute» sentsazioa transmititzen duen guztia jartzen dut.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-tolosa", "disenador-web-errenteria"],
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
    localTouches: {
      es: [
        "Eibar es un caso particular: industria histórica de armería y máquina-herramienta con empresas conocidas en todo el mundo. Los clientes industriales aquí saben mucho de lo suyo y necesitan webs que comuniquen capacidad técnica, no marketing vacío. Trabajo con talleres del centro, empresas familiares de los polígonos de Azitain y Matsaria, y comercio especializado.",
        "Para webs B2B industriales pongo el foco en: catálogo claro con descarga de fichas técnicas, sección de capacidades de mecanizado o procesos, formularios de cotización rápidos, y certificaciones visibles. La estética es seria pero moderna, sin caer en el cliché de la web industrial gris de los 2000.",
      ],
      en: [
        "Eibar is a particular case: historical gunsmithing and machine-tool industry with companies known worldwide. Industrial clients here know their stuff and need websites that communicate technical capability, not empty marketing. I work with central workshops, family companies in the Azitain and Matsaria estates, and specialised retail.",
        "For industrial B2B sites I focus on: clear catalogue with datasheet downloads, machining or process capabilities section, fast quote forms, and visible certifications. The aesthetic is serious but modern, without falling into the cliché of the grey 2000s industrial site.",
      ],
      eu: [
        "Eibar kasu berezia da: historikoa den armagintza eta makina-erreminta industria mundu osoan ezagunak diren enpresekin. Hemengo industria-bezeroek beren gauzak ondo dakizkite eta gaitasun teknikoa transmititzen duen weba behar dute, ez marketing hutsa. Erdialdeko tailerrekin, Azitain eta Matsariako poligonoetako familia-enpresekin eta merkataritza espezializatuarekin lan egiten dut.",
        "B2B web industrialetarako honako hauetan jartzen dut arreta: katalogo argia fitxa teknikoen deskargarekin, mekanizazio edo prozesu gaitasunen atala, kotizazio formulario azkarrak, eta ikus daitezkeen ziurtagiriak. Estetika serioa baina modernoa da, 2000ko web industrial grisaren klixean erori gabe.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-tolosa", "disenador-web-vitoria"],
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
    localTouches: {
      es: [
        "Tolosa es ciudad con personalidad fuerte: industria papelera histórica, mercado del sábado que mueve a toda la comarca, gastronomía con denominación propia (alubias, txuletas a la parrilla) y un comercio tradicional que ha sabido modernizarse. Trabajo con asadores y restaurantes, comercios del centro y empresas industriales del Apatta y Usabal.",
        "Aquí el público mezcla local fiel con turistas que vienen por la gastronomía. La web tiene que servir a los dos: información clara para quien ya conoce y va a reservar, y contexto suficiente para quien busca «dónde comer alubias en Tolosa» y entra desde Google.",
      ],
      en: [
        "Tolosa is a town with strong personality: historic paper industry, Saturday market that draws the whole region, gastronomy with its own designation (alubias beans, grill txuletas) and traditional retail that has managed to modernise. I work with steakhouses and restaurants, town centre retailers and industrial companies in Apatta and Usabal.",
        "The audience here mixes loyal locals with tourists coming for the food. The site has to serve both: clear info for those who already know and want to book, and enough context for someone searching «where to eat alubias in Tolosa» landing from Google.",
      ],
      eu: [
        "Tolosa nortasun handiko hiria da: historikoa den paper industria, eskualde osoa erakartzen duen larunbateko azoka, izen propio duen gastronomia (babarrunak, txuletak parrillan) eta modernizatzen jakin duen merkataritza tradizionala. Asadoreekin eta jatetxeekin, erdialdeko dendekin eta Apatta eta Usabaleko industria-enpresekin lan egiten dut.",
        "Hemen ikusleak tokiko fidela eta gastronomiarako etortzen diren turistak nahasten ditu. Webak biei zerbitzatu behar die: informazio argia ezagutzen duenarentzat eta erreserba egin nahi duenarentzat, eta «non jan babarrunak Tolosan» bilatzen duenarentzat testuingurua nahikoa.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-lasarte", "disenador-web-eibar"],
  },
  {
    slug: "disenador-web-pamplona",
    cityNames: { es: "Pamplona", en: "Pamplona", eu: "Iruñea" },
    regionNames: { es: "Navarra", en: "Navarre", eu: "Nafarroa" },
    distanceFromIrunKm: 80,
    sectors: {
      es: "industria, comercio, hostelería, servicios profesionales y administración",
      en: "industry, retail, hospitality, professional services and administration",
      eu: "industria, merkataritza, ostalaritza, zerbitzu profesionalak eta administrazioa",
    },
    localTouches: {
      es: [
        "Pamplona es capital con tejido empresarial fuerte: industria automoción y agroalimentaria en los polígonos de Landaben, Mutilva, Imárcoain y Cordovilla, comercio premium en el Casco Antiguo y Carlos III, y servicios profesionales en Iturrama y Ermitagaña. Trabajo con clientes que necesitan webs serias para B2B y otras más cercanas para tienda y servicio.",
        "Aquí lo importante es entender que mucho cliente potencial busca en San Fermín o cuando viene de paso desde el resto de España y Francia. La web tiene que cargar rápido en cualquier conexión y servir bien el bilingüismo es/eu (en muchos casos también francés). Configuro Google Business Profile con áreas de servicio y SEO local pegado al barrio.",
      ],
      en: [
        "Pamplona is a capital with a strong business fabric: automotive and agri-food industry in Landaben, Mutilva, Imárcoain and Cordovilla industrial estates, premium retail in the Old Town and Carlos III, and professional services in Iturrama and Ermitagaña. I work with clients who need serious B2B sites and others closer to retail and service.",
        "What matters here is understanding that many potential clients search during San Fermín or as they pass through from the rest of Spain and France. The site has to load fast on any connection and serve es/eu bilingual properly (often French too). I set up Google Business Profile with service areas and local SEO pegged to the neighbourhood.",
      ],
      eu: [
        "Iruñea hiriburua da enpresa-egitura sendoa duena: automozio eta nekazaritza-elikagaien industria Landaben, Mutiloa, Imarkoain eta Cordovillako poligonoetan, merkataritza premium-a Alde Zaharrean eta Karlos III.an, eta zerbitzu profesionalak Iturramen eta Ermitaganan. B2B web serioak behar dituzten bezeroekin eta merkataritza eta zerbitzurako gertukoagoekin lan egiten dut.",
        "Hemen garrantzitsuena ulertzea da bezero potentzial askok San Ferminetan edo Espainia eta Frantziatik pasatzean bilatzen dutela. Webak edozein konexioan azkar kargatu behar du eta es/eu elebitasuna ondo zerbitzatu (askotan frantsesa ere bai). Google Business Profile zerbitzu eremuekin eta auzoari lotutako tokiko SEOa konfiguratzen ditut.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-vitoria", "disenador-web-logrono"],
  },
  {
    slug: "disenador-web-logrono",
    cityNames: { es: "Logroño", en: "Logroño", eu: "Logroño" },
    regionNames: { es: "La Rioja", en: "La Rioja", eu: "Errioxa" },
    distanceFromIrunKm: 180,
    sectors: {
      es: "bodegas y vino, hostelería, comercio, servicios y agroalimentaria",
      en: "wineries and wine, hospitality, retail, services and agri-food",
      eu: "upategiak eta ardoa, ostalaritza, merkataritza, zerbitzuak eta nekazaritza-elikagaien",
    },
    localTouches: {
      es: [
        "Logroño y La Rioja viven del vino y la gastronomía: bodegas de Haro y la Rioja Alta, restaurantes y bares de la calle Laurel y San Juan, y todo el ecosistema enoturístico que mueve a visitantes del norte de España, Francia y Reino Unido. Las webs aquí tienen que oler a tierra y vino, no parecer una plantilla genérica.",
        "Para bodegas trabajo experiencia visual fuerte (fotografía propia, ecommerce sencillo en algunos casos, integración con plataformas como Vivino o Vinissimus si conviene) y SEO local más SEO en mercados internacionales. Para hostelería de Laurel/San Juan, móvil rápido y reservas claras. La web la adapto a quién va a comprar.",
      ],
      en: [
        "Logroño and La Rioja live on wine and food: wineries in Haro and La Rioja Alta, restaurants and bars in Calle Laurel and San Juan, and the whole wine-tourism ecosystem drawing visitors from northern Spain, France and the UK. Sites here have to smell of earth and wine, not look like a generic template.",
        "For wineries I work strong visual experience (own photography, simple ecommerce in some cases, integration with platforms like Vivino or Vinissimus if appropriate) and local SEO plus international SEO. For Laurel/San Juan hospitality, fast mobile and clear bookings. I adapt the site to who's going to buy.",
      ],
      eu: [
        "Logroño eta Errioxa ardo eta gastronomiari esker bizi dira: Haro eta Errioxa Garaiko upategiak, Laurel eta San Juan kaleko jatetxe eta tabernak, eta enoturismoaren ekosistema osoa, Espainiar iparraldeko, Frantziako eta Erresuma Batuko bisitariak erakartzen dituena. Hemengo webek lurra eta ardoa usaindu behar dute, ez plantilla generiko bat eman.",
        "Upategientzat esperientzia bisual sendoa lantzen dut (argazki propioak, ekomertzio sinplea kasu batzuetan, Vivino edo Vinissimus bezalako plataformekin integrazioa egokia bada) eta tokiko SEOa nazioarteko merkatuetako SEOa gehiago. Laurel/San Juango ostalaritzarako, mugikor azkarra eta erreserba argiak. Weba erosiko duenari egokitzen diot.",
      ],
    },
    nearbyCities: ["disenador-web-pamplona", "disenador-web-vitoria"],
  },
  {
    slug: "disenador-web-santander",
    cityNames: { es: "Santander", en: "Santander", eu: "Santander" },
    regionNames: { es: "Cantabria", en: "Cantabria", eu: "Kantabria" },
    distanceFromIrunKm: 200,
    sectors: {
      es: "turismo, hostelería, comercio, servicios profesionales e industria",
      en: "tourism, hospitality, retail, professional services and industry",
      eu: "turismoa, ostalaritza, merkataritza, zerbitzu profesionalak eta industria",
    },
    localTouches: {
      es: [
        "Santander es ciudad costera con un peso turístico fuerte y vida residencial premium en El Sardinero, Centro y Pedreña. Hoteles, restaurantes y comercio se mezclan con servicios profesionales y bufetes en el centro, y empresas industriales en los polígonos de Raos y Candina. Cada cliente espera un nivel distinto.",
        "El reto aquí es la temporada: la web tiene que aguantar el pico de tráfico de verano sin caerse y dar respuesta rápida a quien busca «hotel en Santander», «restaurante en El Sardinero» o «notario en Santander» desde el móvil. Lo monto rápido para móvil y con la ficha de Google bien afinada para tu zona.",
      ],
      en: [
        "Santander is a coastal city with a strong tourism weight and premium residential life in El Sardinero, the centre and Pedreña. Hotels, restaurants and retail mix with professional services and law firms in the centre, and industrial companies in the Raos and Candina estates. Each client expects a different level.",
        "The challenge here is seasonality: the site has to handle the summer traffic peak without falling over and respond fast to people searching «hotel Santander», «restaurant El Sardinero» or «notary Santander» from mobile. I build it fast on mobile and with the Google profile finely tuned to your area.",
      ],
      eu: [
        "Santander kostaldeko hiria da turismo pisu handiarekin eta El Sardinero, Erdialde eta Pedreñako bizitza erresidentzial premiumarekin. Hotelak, jatetxeak eta merkataritza zerbitzu profesionalekin eta erdialdeko bulegoekin nahasten dira, baita Raos eta Candinako poligonoetako industria-enpresekin ere. Bezero bakoitzak maila desberdina espero du.",
        "Hemengo erronka denboraldikotasuna da: webak udako trafiko-puntua eutsi behar du erori gabe eta «Santander hotela», «El Sardineroko jatetxea» edo «Santander notarioa» mugikorretik bilatzen duenari azkar erantzun. Mugikorrerako azkar eta zure eremurako ondo afinatutako Google fitxarekin egiten dut.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao"],
  },
  {
    slug: "disenador-web-pasaia",
    cityNames: { es: "Pasaia", en: "Pasaia", eu: "Pasaia" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 18,
    sectors: {
      es: "puerto, pesca, industria naval, hostelería y comercio",
      en: "port, fishing, naval industry, hospitality and retail",
      eu: "portua, arrantza, ontzi-industria, ostalaritza eta merkataritza",
    },
    localTouches: {
      es: [
        "Pasaia tiene cuatro distritos con personalidad muy distinta: Antxo, San Pedro, Donibane y Trintxerpe. La actividad gira alrededor del puerto: industria naval, pesca, logística y un comercio asociado. Trabajo con empresas portuarias, restaurantes con vistas a la bahía y comercios de barrio.",
        "Aquí muchos clientes son B2B portuarios: necesitan webs serias en es/en con catálogo, capacidades técnicas y formularios cualificados. Otros son hosteleros buscando turistas que llegan en barco desde Donostia, y necesitan reservas claras y bilingüismo es/eu/en/fr. El mismo proyecto, dos enfoques.",
      ],
      en: [
        "Pasaia has four districts with very different personalities: Antxo, San Pedro, Donibane and Trintxerpe. Activity revolves around the port: naval industry, fishing, logistics and associated retail. I work with port companies, restaurants with bay views and neighbourhood retailers.",
        "Many clients here are port B2B: they need serious es/en sites with catalogue, technical capabilities and qualified forms. Others are hospitality businesses targeting tourists arriving by boat from Donostia, and need clear bookings and es/eu/en/fr multilingual. Same project, two approaches.",
      ],
      eu: [
        "Pasaiak lau auzo ditu nortasun oso desberdinekoak: Antxo, San Pedro, Donibane eta Trintxerpe. Jarduera portuaren inguruan dabil: ontzi-industria, arrantza, logistika eta merkataritza erlazionatua. Portu-enpresekin, badiarako bistak dituzten jatetxeekin eta auzoko dendekin lan egiten dut.",
        "Hemen bezero asko portuko B2B dira: katalogoa, gaitasun teknikoak eta formulario kualifikatuak dituzten es/en web serioak behar dituzte. Beste batzuk Donostiatik itsasontziz iristen diren turistei begira dauden ostalaritza-negozioak dira, eta erreserba argiak eta es/eu/en/fr eleaniztasuna behar dute. Proiektu bera, bi ikuspegi.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-errenteria", "disenador-web-hondarribia"],
  },
  {
    slug: "disenador-web-zarautz",
    cityNames: { es: "Zarautz", en: "Zarautz", eu: "Zarautz" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    distanceFromIrunKm: 36,
    sectors: {
      es: "turismo costero, hostelería, comercio premium y servicios",
      en: "coastal tourism, hospitality, premium retail and services",
      eu: "kostaldeko turismoa, ostalaritza, merkataritza premium eta zerbitzuak",
    },
    localTouches: {
      es: [
        "Zarautz vive del surf, la playa más larga de Gipuzkoa, una hostelería de altura (con restaurante 3 estrellas Michelin incluido) y un comercio premium que sabe que el cliente medio aquí tiene poder adquisitivo. Trabajo con surf shops, restaurantes y casas de huéspedes del centro y la zona de la playa.",
        "El SEO local pesa fuerte porque la búsqueda «restaurante Zarautz», «hotel Zarautz playa» o «clase de surf Zarautz» se decide en los primeros 3 resultados. Para conseguirlo combino una ficha de Google Business Profile muy bien optimizada con una web rápida en móvil y un sistema de reseñas que mantiene tu negocio activo en el mapa.",
      ],
      en: [
        "Zarautz lives on surfing, the longest beach in Gipuzkoa, top-tier hospitality (with a 3-Michelin-star restaurant included) and premium retail that knows the average client here has buying power. I work with surf shops, restaurants and guesthouses in the centre and the beach area.",
        "Local SEO matters a lot here because searches like «Zarautz restaurant», «Zarautz beach hotel» or «Zarautz surf class» are decided in the first 3 results. To get there I combine a very well-optimized Google Business Profile with a fast mobile site and a reviews system that keeps your business active on the map.",
      ],
      eu: [
        "Zarautz surf-aren, Gipuzkoako hondartza luzeenaren, maila handiko ostalaritzaren (3 izar Michelin duen jatetxe bat barne) eta hemengo bezero ertainak erosteko ahalmena duela dakien merkataritza premium baten bidez bizi da. Erdialdeko eta hondartza inguruko surf-dendekin, jatetxeekin eta ostatuekin lan egiten dut.",
        "Tokiko SEOk pisu handia du, «Zarautz jatetxea», «Zarautz hondartza hotela» edo «Zarautz surf eskola» bilaketak lehen 3 emaitzetan erabakitzen direlako. Lortzeko, oso ondo optimizatutako Google Business Profile, mugikorrean azkarra den web bat eta zure negozioa mapan aktibo mantentzen duen iritzien sistema konbinatzen ditut.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-tolosa", "disenador-web-lasarte"],
  },
  {
    slug: "disenador-web-getxo",
    cityNames: { es: "Getxo", en: "Getxo", eu: "Getxo" },
    regionNames: { es: "Bizkaia", en: "Bizkaia", eu: "Bizkaia" },
    distanceFromIrunKm: 130,
    sectors: {
      es: "residencial premium, servicios profesionales, hostelería y comercio",
      en: "premium residential, professional services, hospitality and retail",
      eu: "egoitza premium, zerbitzu profesionalak, ostalaritza eta merkataritza",
    },
    localTouches: {
      es: [
        "Getxo es uno de los municipios con mayor poder adquisitivo del País Vasco: Neguri, Algorta, Las Arenas. La clientela aquí espera marcas cuidadas, atención personalizada y webs que respeten la elegancia residencial del municipio. Trabajo con clínicas, despachos profesionales, restaurantes y comercio premium.",
        "Para clínicas y despachos pongo el foco en confianza visual (fotografía profesional, certificaciones visibles) y formulario de cita rápido. Para hostelería de Algorta y Las Arenas, móvil impecable y reservas integradas. La estética siempre cuidada, sin caer en el cliché de la web «de postín» que se ve recargada.",
      ],
      en: [
        "Getxo is one of the highest-purchasing-power municipalities in the Basque Country: Neguri, Algorta, Las Arenas. Clients here expect refined brands, personalised attention and sites that respect the residential elegance of the municipality. I work with clinics, professional firms, restaurants and premium retail.",
        "For clinics and firms I focus on visual trust (professional photography, visible certifications) and a fast booking form. For hospitality in Algorta and Las Arenas, impeccable mobile and integrated bookings. The aesthetic always refined, without falling into the cliché of the «posh» site that ends up overwrought.",
      ],
      eu: [
        "Getxo Euskal Herriko erosteko ahalmen handiena duen udalerrietako bat da: Neguri, Algorta, Areeta. Hemengo bezeroek marka zainduak, arreta pertsonalizatua eta udalerriaren dotorezia erresidentziala errespetatzen duten webguneak espero dituzte. Klinikekin, bulego profesionalekin, jatetxeekin eta merkataritza premium-arekin lan egiten dut.",
        "Klinika eta bulegoetarako konfiantza bisualean jartzen dut arreta (argazki profesionalak, ziurtagiri ikusgarriak) eta hitzordu formulario azkarra. Algorta eta Areetako ostalaritzarako, mugikor akasgabea eta integratutako erreserbak. Estetika beti zaindua, web «dotore» kargatuegiaren klixean erori gabe.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-bermeo"],
  },
  {
    slug: "disenador-web-bermeo",
    cityNames: { es: "Bermeo", en: "Bermeo", eu: "Bermeo" },
    regionNames: { es: "Bizkaia", en: "Bizkaia", eu: "Bizkaia" },
    distanceFromIrunKm: 145,
    sectors: {
      es: "pesca, conservas, hostelería costera y turismo",
      en: "fishing, canned goods, coastal hospitality and tourism",
      eu: "arrantza, kontserbak, kostaldeko ostalaritza eta turismoa",
    },
    localTouches: {
      es: [
        "Bermeo es puerto pesquero histórico de Bizkaia, con conservas, gastronomía marinera y un turismo creciente que llega por el Urdaibai y la costa. Trabajo con conserveras, restaurantes del puerto, hoteles boutique y empresas pesqueras que necesitan presencia digital seria.",
        "Para conserveras y pesca: webs B2B con ecommerce sencillo, certificaciones de origen visibles y sección de proceso de elaboración (es lo que más valor añade). Para hostelería: móvil rápido y bilingüismo es/eu/en/fr. El cliente que viene a Bermeo espera autenticidad, y la web la transmite.",
      ],
      en: [
        "Bermeo is a historic Bizkaia fishing port with canned goods, seafood gastronomy and growing tourism arriving via Urdaibai and the coast. I work with canneries, port restaurants, boutique hotels and fishing companies that need a serious digital presence.",
        "For canneries and fishing: B2B sites with simple ecommerce, visible origin certifications and a production process section (it's what adds most value). For hospitality: fast mobile and es/eu/en/fr multilingual. The visitor coming to Bermeo expects authenticity, and the site has to convey it.",
      ],
      eu: [
        "Bermeo Bizkaiko historiako arrantza-portua da, kontserbak, itsas-gastronomia eta Urdaibai eta kostaldetik iristen den turismo gero eta handiagoarekin. Kontserba-fabrikekin, portuko jatetxeekin, hotel boutikekin eta presentzia digital serioa behar duten arrantza-enpresekin lan egiten dut.",
        "Kontserba eta arrantzarako: B2B webguneak ekomertzio sinplearekin, jatorri-ziurtagiri ikusgaiekin eta elaborazio-prozesuaren atalarekin (gehien balio eransten duena). Ostalaritzarako: mugikor azkarra eta es/eu/en/fr eleaniztasuna. Bermeora etortzen den bezeroak benetakotasuna espero du, eta webak hori transmititu behar du.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-getxo"],
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
  // Short distance label — used inside parentheses next to "Irun".
  // Doesn't repeat "Irun" because the surrounding sentence already mentions it.
  const distShort =
    def.distanceFromIrunKm !== undefined
      ? locale === "es"
        ? `a ${def.distanceFromIrunKm} km`
        : locale === "en"
        ? `${def.distanceFromIrunKm} km away`
        : `${def.distanceFromIrunKm} km-ra`
      : "";
  // Full distance label — for standalone uses where it isn't next to "Irun".
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
      heroTitle: `Más llamadas para tu negocio en ${city}`,
      intro: `Soy Unax Aller, trabajo desde Irun${
        def.distanceFromIrunKm !== undefined ? ` (${distShort})` : ""
      } con negocios locales de ${city} y ${region}. Te monto la web, la ficha de Google Maps y un sistema de reseñas${
        sectors ? ` pensado para ${sectors}` : ""
      } por 149€/mes — sin pagar nada al firmar.`,
      benefitsTitle: `Por qué los negocios de ${city} eligen el plan Todo Incluido`,
      benefits: [
        {
          title: "Conozco el mercado de " + city,
          desc: `Entiendo cómo buscan los clientes de ${city} y qué esperan de un negocio local. Eso se traduce en una ficha de Google y una web que conectan de verdad.`,
        },
        {
          title: `Sales el primero en Google Maps`,
          desc: `Optimizo tu ficha de Google Business Profile para que aparezcas en búsquedas tipo "tu sector en ${city}". El que sale primero, recibe la llamada.`,
        },
        {
          title: "Cercanía y soporte por WhatsApp",
          desc: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Estoy en Irun, ${distShort} de ${city}. Reunión presencial sin problema. Cambios mensuales por WhatsApp directo.`
            : `Hablas siempre conmigo, no con un gestor de cuentas. Cambios mensuales por WhatsApp directo, respuesta el mismo día.`,
        },
        {
          title: "0€ al firmar, 30 días de garantía",
          desc: "Plan Todo Incluido por 149€/mes sin permanencia. No pagas nada al firmar. Si en los primeros 30 días no estás conforme, devolución completa sin preguntas.",
        },
      ],
      faqTitle: `Preguntas frecuentes para negocios en ${city}`,
      faq: [
        {
          q: `¿Trabajas presencialmente con clientes en ${city}?`,
          a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Sí. Estoy en Irun, ${distShort} de ${city}, y puedo desplazarme para la reunión inicial y revisiones puntuales. El día a día lo llevamos por WhatsApp, sin necesidad de pisar la oficina.`
            : `Trabajo con clientes de ${city} combinando videollamada inicial, WhatsApp en el día a día y alguna visita puntual cuando el proyecto lo merece. Estoy en Irun, ${distStr}.`,
        },
        {
          q: `¿Cuánto cuesta una web para un negocio de ${city}?`,
          a: "149€/mes sin permanencia, con 0€ al firmar. Incluye diseño a medida, hosting, dominio, ficha de Google Business Profile optimizada para tu zona, sistema de reseñas, soporte por WhatsApp y cambios mensuales. Sin facturas extra.",
        },
        {
          q: `¿Cuándo está lista la web?`,
          a: "Entre 7 y 10 días desde que firmamos. Como no hay desembolso inicial, podemos arrancar enseguida — no tienes que esperar a ahorrar.",
        },
        {
          q: `¿Cómo me ayuda esto a recibir más llamadas en ${city}?`,
          a: `Cuando alguien en ${city} busca en Google «tu servicio + ${city}» desde el móvil, ve principalmente Google Maps. Si tu ficha sale primero y tiene reseñas recientes, el cliente te llama directamente. Eso es lo que monto, optimizado para tu zona y sector.`,
        },
        {
          q: "¿Puedo tener la web en euskera o francés?",
          a: "Sí, hasta 4 idiomas (euskera, castellano, inglés y francés) sin coste extra. En zonas con turismo francés es muy útil. Estudié en Francia hasta los 15, así que el francés lo trabajo igual de fino que el resto.",
        },
        {
          q: "¿Tengo que comprometerme a algún tiempo mínimo?",
          a: "Sin permanencia anual. El único compromiso es un mínimo de 3 meses de activación (alta de dominio, SEO local y ficha de Google); a partir del cuarto mes cancelas cuando quieras. La cuota queda bloqueada y cualquier subida futura solo afecta a nuevos clientes. Si quieres irte, solo avisar: el dominio te lo llevas a tu nombre y tu ficha de Google Maps con las reseñas sigue siendo de tu negocio. La web va sobre mis servidores, así que funciona mientras mantengas la cuota — igual que el software del taller o la tarifa del móvil.",
        },
      ],
      ctaTitle: `¿Tienes un negocio en ${city}?`,
      ctaSub: "Auditoría gratuita: te enseño quién te está quitando llamadas en Google y por qué. Sin compromiso.",
      ctaBtn: "Hablar con Unax",
      quoteBtn: "Pedir auditoría gratis",
    };
  }

  if (locale === "en") {
    return {
      breadcrumbHome: "Home",
      breadcrumbHere: `Web designer ${city}`,
      heroTitle: `More calls for your ${city} business`,
      intro: `I'm Unax Aller, based in Irun${
        def.distanceFromIrunKm !== undefined ? ` (${distShort})` : ""
      } working with local businesses in ${city} and ${region}. I set up your website, your Google Maps profile and a reviews system${
        sectors ? ` built for ${sectors}` : ""
      } for €149/month — with no upfront payment.`,
      benefitsTitle: `Why ${city} businesses choose the All-Inclusive plan`,
      benefits: [
        {
          title: `I know the ${city} market`,
          desc: `I understand how ${city} customers search and what they expect from a local business. That translates into a Google profile and a website that actually connect.`,
        },
        {
          title: `You rank first on Google Maps`,
          desc: `I optimize your Google Business Profile so you show up for "your sector in ${city}" searches. The first result gets the call.`,
        },
        {
          title: "Closeness and WhatsApp support",
          desc: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `I'm in Irun, ${distShort} from ${city}. In-person meetings no problem. Monthly changes via direct WhatsApp.`
            : `You always talk to me, not an account manager. Monthly changes via direct WhatsApp, same-day reply.`,
        },
        {
          title: "€0 to sign, 30-day money-back",
          desc: "All-Inclusive plan at €149/month for 12 months. €0 to sign. If in the first 30 days you're not happy, full refund, no questions asked.",
        },
      ],
      faqTitle: `Frequently asked questions for ${city} businesses`,
      faq: [
        {
          q: `Do you work in person with clients in ${city}?`,
          a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Yes. I'm in Irun, ${distShort} from ${city}, and I can travel for the initial meeting and occasional reviews. Day-to-day we handle it via WhatsApp.`
            : `I work with ${city} clients combining an initial video call, WhatsApp day-to-day and the occasional on-site visit when warranted. I'm in Irun, ${distStr}.`,
        },
        {
          q: `How much does a website cost for a ${city} business?`,
          a: "€149/month for 12 months, with €0 to sign. Includes custom design, hosting, domain, optimized Google Business Profile for your area, reviews system, WhatsApp support and monthly changes. No extra invoices.",
        },
        {
          q: "How fast is the site ready?",
          a: "Between 7 and 10 days from signing. Since there's no upfront cost, we can start immediately — you don't have to save up.",
        },
        {
          q: `How does this help me get more calls in ${city}?`,
          a: `When somebody in ${city} searches «your service + ${city}» from their phone, what they mostly see is Google Maps. If your profile ranks first and has recent reviews, customers call you directly. That's what I build, tuned to your area and sector.`,
        },
        {
          q: "Can I have the site in several languages?",
          a: "Yes, up to 4 languages (Basque, Spanish, English, French) at no extra cost. In tourist areas with French visitors it makes a real difference. I studied in France until I was 15.",
        },
        {
          q: "Do I have to commit to any minimum period?",
          a: "No annual lock-in. The only commitment is a 3-month minimum activation (domain setup, local SEO and the Google profile); from the fourth month you cancel whenever you want. The fee stays locked and any future increases only apply to new clients.",
        },
      ],
      ctaTitle: `Have a business in ${city}?`,
      ctaSub: "Free audit: I show you who's taking calls from you on Google and why. No commitment.",
      ctaBtn: "Talk to Unax",
      quoteBtn: "Request a free audit",
    };
  }

  // euskera
  const cityIn = cityDeclEu(city);
  const cityFrom = cityDeclEuFrom(city);
  return {
    breadcrumbHome: "Hasiera",
    breadcrumbHere: `Web diseinatzailea ${city}`,
    heroTitle: `Dei gehiago zure ${city}ko negoziorako`,
    intro: `Unax Aller naiz, Irunen lan egiten dut${
      def.distanceFromIrunKm !== undefined ? ` (${distShort})` : ""
    } ${cityIn} eta ${region}ko tokiko negozioekin. Weba, Google Maps fitxa eta iritzien sistema jartzen dizkizut${
      sectors ? ` (${sectors})` : ""
    } 149€/hilean — hasieran ezer ordaindu gabe.`,
    benefitsTitle: `Zergatik aukeratzen duten ${city}ko negozioek Dena Barne plana`,
    benefits: [
      {
        title: `${city}ko merkatua ezagutzen dut`,
        desc: `${cityIn} bezeroek nola bilatzen duten eta negozio lokal batetik zer espero duten ulertzen dut. Horrek benetan konektatzen duten Google fitxa eta web bat eskaintzen ditu.`,
      },
      {
        title: "Google Maps-en lehenengo ager zaitezen",
        desc: `Zure Google Business Profile optimizatzen dut "${city} zure sektorea" bilaketetan ager zaitezen. Lehenengo emaitzak jasotzen du deia.`,
      },
      {
        title: "Hurbiltasuna eta WhatsApp laguntza",
        desc: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
          ? `Irunen nago, ${cityFrom} ${distShort}. Aurrez aurreko bilera arazorik gabe. Hileko aldaketak WhatsApp zuzenez.`
          : `Beti nirekin hitz egiten duzu, ez kontu kudeatzaile batekin. Hileko aldaketak WhatsApp zuzenez, egun bereko erantzuna.`,
      },
      {
        title: "0€ sinatzean, 30 eguneko bermea",
        desc: "Dena Barne plana 149€/hilean iraupenik gabe. 0€ sinatzean. Lehen 30 egunetan pozik ez bazaude, dirua osorik itzultzen dizut.",
      },
    ],
    faqTitle: `${city}ko negozioentzat galdera ohikoak`,
    faq: [
      {
        q: `Aurrez aurre egiten duzu lan ${cityIn} bezeroekin?`,
        a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
          ? `Bai. Irunen nago, ${distStr}, eta ${cityIn} joan naiteke hasierako bilerarako eta noizbehinkako berrikuspenetarako. Egunerokoa WhatsApp-ez.`
          : `${cityIn} bezeroekin hasierako bideo-deia, eguneroko WhatsApp eta beharrezkoa denean bisita konbinatzen ditut. Irunen nago, ${distStr}.`,
      },
      {
        q: `Zenbat kostatzen da web bat ${city}ko negozio batentzat?`,
        a: "149€/hilean iraupenik gabe, 0€ sinatzean. Neurrizko diseinua, hostinga, domeinua, zure eremurako optimizatutako Google Business Profile fitxa, iritzien sistema, WhatsApp laguntza eta hileko aldaketak barne. Faktura gehigarririk gabe.",
      },
      {
        q: "Noiz dago weba prest?",
        a: "Sinatzen dugun unetik 7 eta 10 egun artean. Hasierako desenbolsorik ez dagoenez, berehala has gaitezke.",
      },
      {
        q: `Nola laguntzen dit honek ${cityIn} dei gehiago jasotzen?`,
        a: `${cityIn} norbaitek mugikorretik «zure zerbitzua + ${city}» bilatzen duenean, batez ere Google Maps ikusten du. Zure fitxa lehenengo ageri bada eta azken iritziak baditu, bezeroak zuzenean deitzen dizu. Hori da eraikitzen duguna, zure eremu eta sektorerako.`,
      },
      {
        q: "Webgunea hizkuntza batean baino gehiagotan eduki dezaket?",
        a: "Bai, 4 hizkuntzatara arte (euskara, gaztelania, ingelesa, frantsesa) kosturik gabe. Frantses turismoa duten eremuetan oso baliagarria da.",
      },
      {
        q: "Gutxieneko eperen batera konprometitu behar dut?",
        a: "Urteko iraupenik gabe. Konpromiso bakarra 3 hilabeteko gutxieneko aktibazioa da (domeinuaren alta, tokiko SEOa eta Google fitxa); laugarren hilabetetik aurrera nahi duzunean baja ematen duzu. Kuota blokeatuta dago eta etorkizuneko igoerak bezero berriei bakarrik aplikatuko zaizkie.",
      },
    ],
    ctaTitle: `${cityIn} negozioa al duzu?`,
    ctaSub: "Doako auditoria: Googlen nork kentzen dizkizun deiak eta zergatik erakusten dizut. Konpromisorik gabe.",
    ctaBtn: "Unaxekin hitz egin",
    quoteBtn: "Doako auditoria eskatu",
  };
}

export function getCityLanding(slug: string): CityLandingDef | undefined {
  return cityLandings.find((c) => c.slug === slug);
}
