import type { CityLandingContent } from "@/components/landing/CityLanding";

export type LocaleKey = "es" | "en" | "eu" | "fr";

export interface CityLandingDef {
  slug: string;
  cityNames: Record<LocaleKey, string>;
  regionNames: Record<LocaleKey, string>;
  distanceFromIrunKm?: number;
  sectors?: { es: string; en: string; eu: string; fr: string };
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
    // Home turf — no distanceFromIrunKm so the auto-generated copy never says
    // "from Irun (0 km away)". This is the strongest local page on the site.
    slug: "disenador-web-irun",
    cityNames: { es: "Irun", en: "Irun", eu: "Irun", fr: "Irun" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    sectors: {
      es: "comercio, hostelería, clínicas, despachos profesionales e industria fronteriza",
      en: "retail, hospitality, clinics, professional practices and cross-border industry",
      eu: "merkataritza, ostalaritza, klinikak, bulego profesionalak eta mugako industria",
      fr: "commerce, hôtellerie-restauration, cliniques, cabinets professionnels et industrie transfrontalière",
    },
    localTouches: {
      es: [
        "Irun es mi ciudad: trabajo aquí cada día y conozco el terreno de primera mano. Sé cómo se mueve el comercio de la calle Mayor y el centro, la hostelería del casco viejo, las clínicas y despachos de la zona de Anaka y Behobia, y la industria de los polígonos de Ventas y Araso. No es teoría: son negocios que veo cuando salgo a la calle.",
        "Irun tiene una ventaja única: es frontera. Mucho cliente francés cruza para comer, comprar o ir al dentista, y casi nadie tiene la web preparada para captarlo. Por eso en los proyectos de Irun cuido especialmente el bilingüismo castellano/euskera/francés y el SEO local que pesca tanto en «dentista Irun» como en «dentiste Irun». Esa esquina la trabajan muy pocos, y es dinero que está ahí.",
        "Para SEO local cubro búsquedas tipo «diseñador web Irun», «hacer página web Irun», «web para negocio Irun», además de las de cada sector y barrio. Te monto la ficha de Google Business Profile bien configurada, con reseñas recientes y la zona de servicio que llega hasta Hondarribia, Hendaya y el Bidasoa. Estoy aquí mismo, en Irun, así que si el proyecto lo pide nos vemos en persona; el día a día lo llevamos por WhatsApp.",
      ],
      en: [
        "Irun is my city: I work here every day and know the ground first-hand. I understand the retail on Calle Mayor and the centre, the hospitality of the old town, the clinics and practices around Anaka and Behobia, and the industry in the Ventas and Araso estates. It's not theory: these are businesses I see when I walk out the door.",
        "Irun has a unique advantage: it's a border town. Plenty of French customers cross over to eat, shop or see the dentist, and almost nobody has a website set up to capture them. That's why in Irun projects I pay special attention to Spanish/Basque/French multilingual and the local SEO that catches both «dentista Irun» and «dentiste Irun». Very few work that angle, and it's money sitting on the table.",
        "For local SEO I cover searches like «web designer Irun», «build a website Irun», «website for my Irun business», plus the per-sector and per-neighbourhood ones. I set up your Google Business Profile properly, with recent reviews and a service area reaching Hondarribia, Hendaye and the Bidasoa. I'm right here: we meet over coffee, not a video call.",
      ],
      eu: [
        "Irun nire hiria da: hemen lan egiten dut egunero eta lurraldea lehen eskutik ezagutzen dut. Kale Nagusiko eta erdialdeko merkataritza, alde zaharreko ostalaritza, Anaka eta Behobiako klinikak eta bulegoak, eta Ventas eta Arasoko poligonoetako industria ezagutzen ditut. Ez da teoria: kalera ateratzean ikusten ditudan negozioak dira.",
        "Irunek abantaila berezia du: muga da. Frantses bezero asko zeharkatzen du jatera, erostera edo dentistara joatera, eta ia inork ez du weba prest haiek harrapatzeko. Horregatik Iruneko proiektuetan gaztelania/euskara/frantses eleaniztasuna eta «dentista Irun» nahiz «dentiste Irun» harrapatzen dituen tokiko SEOa zaintzen ditut bereziki.",
        "Tokiko SEO lanetan «web diseinatzaile Irun», «web orria egin Irun», «Iruneko negoziorako weba» bezalako bilaketak lantzen ditut. Zure Google Business Profile fitxa ondo konfiguratzen dizut, azken iritziekin eta Hondarribia, Hendaia eta Bidasoaraino iristen den zerbitzu-eremuarekin. Hemen bertan nago: kafe bat hartuz egiten dugu bilera, ez bideo-deiz.",
      ],
      fr: [
        "Irun, c'est ma ville : j'y travaille chaque jour et je connais le terrain de première main. Je sais comment vit le commerce de la calle Mayor et du centre, l'hôtellerie-restauration du casco viejo, les cliniques et cabinets du quartier d'Anaka et de Behobia, et l'industrie des zones d'activité de Ventas et Araso. Ce n'est pas de la théorie : ce sont des commerces que je croise en sortant dans la rue.",
        "Irun a un atout unique : c'est une ville-frontière. Beaucoup de clients français traversent pour manger, faire leurs courses ou aller chez le dentiste, et presque personne n'a un site prêt à les capter. C'est pourquoi, sur les projets d'Irun, je soigne particulièrement le multilingue espagnol/basque/français et le SEO local qui capte aussi bien «dentista Irun» que «dentiste Irun». Très peu de monde travaille cet angle-là, et c'est de l'argent qui reste sur la table.",
        "Pour le SEO local, je couvre des recherches comme «diseñador web Irun», «hacer página web Irun», «web para negocio Irun», en plus de celles propres à chaque secteur et quartier. Je vous mets en place votre fiche Google Business Profile bien configurée, avec des avis récents et une zone de service qui va jusqu'à Hondarribia, Hendaye et le Bidassoa. Je suis ici même, à Irun, donc si le projet le demande on se voit en personne ; le quotidien, on le gère par WhatsApp.",
      ],
    },
    nearbyCities: ["disenador-web-hondarribia", "disenador-web-errenteria", "disenador-web-donostia"],
  },
  {
    slug: "disenador-web-bilbao",
    cityNames: { es: "Bilbao", en: "Bilbao", eu: "Bilbo", fr: "Bilbao" },
    regionNames: { es: "Bizkaia", en: "Bizkaia", eu: "Bizkaia", fr: "Bizkaia" },
    distanceFromIrunKm: 115,
    sectors: {
      es: "industria, comercio, hostelería, servicios profesionales y startups",
      en: "industry, retail, hospitality, professional services and startups",
      eu: "industria, merkataritza, ostalaritza, zerbitzu profesionalak eta startupak",
      fr: "industrie, commerce, hôtellerie-restauration, services professionnels et startups",
    },
    localTouches: {
      es: [
        "Si tu negocio está en el Ensanche o en Indautxu, ya sabes cómo va: el de al lado tiene web, ficha de Google con reseñas y sale el primero cuando alguien busca desde el móvil. Tú no, y esas llamadas se las lleva otro. Trabajo con comercio del Casco Viejo, hostelería del Ensanche y despachos de Indautxu y Deusto. También con empresas de los polígonos de Asua y del Parque Tecnológico de Bizkaia.",
        "En Bilbao la competencia aprieta. En cualquier sector hay diez que hacen lo mismo que tú a tres calles, así que la web no está para quedar bonita: está para que el cliente que duda entre tú y otro se decida por ti. Eso son cosas concretas: que cargue rápido en el móvil, que en diez segundos se entienda qué haces y cómo contactarte, y que el botón de llamar o pedir presupuesto esté donde tiene que estar. Lo demás es decoración.",
        "Para SEO local trabajo búsquedas como «diseñador web Bilbao», «desarrollador web Bizkaia» o «agencia web Bilbao», pero la pasta está en las de barrio y sector: el que busca «asesoría Indautxu» o «restaurante Casco Viejo» quiere comprar ya. Te dejo la ficha de Google bien montada, con la zona de servicio y reseñas que te hagan salir en el mapa, y cada búsqueda apuntando a la página correcta. Un pago único de 1.300€ + IVA, con web y el primer año de mantenimiento incluidos.",
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
      fr: [
        "Si votre commerce est dans l'Ensanche ou à Indautxu, vous savez déjà comment ça marche : le voisin a un site, une fiche Google avec des avis, et il sort en premier quand quelqu'un cherche depuis son mobile. Pas vous, et ces appels-là partent chez lui. Je travaille avec des commerces du Casco Viejo, l'hôtellerie-restauration de l'Ensanche et des cabinets d'Indautxu et Deusto. Aussi avec des entreprises des zones d'activité d'Asua et du Parc Technologique de Bizkaia.",
        "À Bilbao, la concurrence est serrée. Dans n'importe quel secteur, il y a dix entreprises qui font la même chose que vous à trois rues de là, donc le site n'est pas là pour faire joli : il est là pour que le client qui hésite entre vous et un autre se décide pour vous. Ce sont des choses concrètes : que ça charge vite sur mobile, qu'en dix secondes on comprenne ce que vous faites et comment vous contacter, et que le bouton pour appeler ou demander un devis soit là où il doit être. Le reste, c'est de la décoration.",
        "Pour le SEO local, je travaille des recherches comme «diseñador web Bilbao», «desarrollador web Bizkaia» ou «agencia web Bilbao», mais l'essentiel se joue sur celles de quartier et de secteur : celui qui cherche «asesoría Indautxu» ou «restaurante Casco Viejo» veut acheter tout de suite. Je vous laisse la fiche Google bien montée, avec la zone de service et des avis qui vous font sortir sur la carte, et chaque recherche pointant vers la bonne page. Un paiement unique de 1 300 € + TVA, site et première année de maintenance inclus.",
      ],
    },
    nearbyCities: ["disenador-web-vitoria", "disenador-web-donostia"],
  },
  {
    slug: "disenador-web-donostia",
    cityNames: { es: "Donostia-San Sebastián", en: "Donostia-San Sebastián", eu: "Donostia", fr: "Donostia-San Sebastián" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    distanceFromIrunKm: 21,
    sectors: {
      es: "hostelería, turismo, comercio premium y servicios profesionales",
      en: "hospitality, tourism, premium retail and professional services",
      eu: "ostalaritza, turismoa, merkataritza premium eta zerbitzu profesionalak",
      fr: "hôtellerie-restauration, tourisme, commerce premium et services professionnels",
    },
    localTouches: {
      es: [
        "Un restaurante de la Parte Vieja con cola de turistas en la puerta puede ser invisible en Google. Lo veo constantemente en Donostia: locales llenos a mediodía que en el móvil de quien busca «dónde comer en San Sebastián» no aparecen por ningún lado, porque su web tarda cinco segundos en cargar o directamente no tienen. Esa búsqueda se la queda otro, casi siempre el de al lado. Trabajo precisamente para que cuando alguien teclee «hotel cerca de la Concha» u «óptica en Gros» el que salga seas tú.",
        "En Donostia cada barrio juega a otra cosa y la web tiene que notarlo. Un bar de la Parte Vieja vive del que pasa por delante y mira la carta en el móvil; un hotel de la zona de la Concha se juega la reserva directa frente a Booking, que le come un 15-20% de comisión; una consulta de Antiguo o Amara necesita que le encuentren por nombre y especialidad, no por fotos bonitas. No monto «webs» en abstracto: monto la página rápida en móvil, la ficha de Google bien cuadrada y las reseñas al día que hacen que entren llamadas y reservas. Eso es lo que mueve la aguja, no el diseño por el diseño.",
        "Estoy a 21 km, media hora por la A-8, así que si el proyecto lo pide nos vemos en persona en Donostia para entender a quién quieres atraer; el resto lo llevamos por WhatsApp y videollamada. Un pago único de 1.300€ + IVA con el primer año incluido: la web es tuya y sin cuotas colgando cada mes. Tú pones el negocio que ya funciona puertas adentro; yo me encargo de que también funcione cuando alguien lo busca desde el sofá.",
      ],
      en: [
        "Donostia is a small city with very demanding clients. I work with restaurants and bars in the Old Town, premium retail in the city centre and Gros, hotels around La Concha and professional practices in Antiguo and Amara. Each has its own audience and the website has to speak their language.",
        "Local SEO matters a lot here: queries like «best restaurant San Sebastián», «hotel La Concha», «optician Donostia» go to those with a well-configured Google profile and a fast mobile site. That's exactly what I build: fast mobile site, properly set up Google Business Profile and recent reviews so you rank first on the map.",
        "I'm 21 km away by car from Irun, so if the project calls for it we meet in person in Donostia; the rest we handle over WhatsApp and video call.",
      ],
      eu: [
        "Donostia hiri txikia da bezero oso exijenteekin. Parte Zaharreko jatetxe eta tabernekin, Erdialde eta Groseko denda premiumekin, Kontxa inguruko hotelekin eta Antiguo eta Amarako kontsulta profesionalekin lan egiten dut. Bakoitzak bere bezero mota du eta webak haien hizkuntza hitz egin behar du.",
        "Hemen tokiko SEO lanak pisu handia du: «San Sebastiángo jatetxe onena», «Kontxako hotela», «Donostiako optika» bilaketak ondo konfiguratutako Google fitxa eta mugikorrean azkarra den web bat dutenek eramaten dituzte. Hori da egiten dudana: web azkarra, Google Business Profile ondo konfiguratuta eta azken iritziak.",
        "Iruneik 21 km-ra nago kotxez, beraz proiektuak hala eskatzen badu Donostian aurrez aurre elkartzen gara; gainerakoa WhatsApp eta bideo-deiz.",
      ],
      fr: [
        "Un restaurant de la Parte Vieja avec une file de touristes devant la porte peut être invisible sur Google. Je le vois constamment à Donostia : des établissements pleins à midi qui, sur le mobile de celui qui cherche «dónde comer en San Sebastián», n'apparaissent nulle part, parce que leur site met cinq secondes à charger ou qu'ils n'en ont tout simplement pas. Cette recherche, c'est un autre qui la récupère, presque toujours le voisin. Je travaille justement pour que, quand quelqu'un tape «hôtel près de la Concha» ou «opticien à Gros», ce soit vous qui sortiez.",
        "À Donostia, chaque quartier joue une partition différente et le site doit s'en ressentir. Un bar de la Parte Vieja vit de celui qui passe devant et regarde la carte sur son mobile ; un hôtel du côté de la Concha joue sa réservation directe face à Booking, qui lui prend 15-20% de commission ; un cabinet d'Antiguo ou d'Amara a besoin qu'on le trouve par son nom et sa spécialité, pas par de jolies photos. Je ne monte pas «des sites» dans l'abstrait : je monte la page rapide sur mobile, la fiche Google bien réglée et les avis à jour qui font entrer les appels et les réservations. C'est ça qui fait bouger l'aiguille, pas le design pour le design.",
        "Je suis à 21 km, une demi-heure par l'A-8, donc si le projet le demande on se voit en personne à Donostia pour comprendre qui vous voulez attirer ; le reste, on le gère par WhatsApp et visioconférence. Un paiement unique de 1 300 € + TVA avec la première année incluse : le site est à vous, sans mensualités qui pendent. Vous, vous vous occupez du commerce qui fonctionne déjà en interne ; moi, je m'occupe de ce qu'il fonctionne aussi quand quelqu'un le cherche depuis son canapé.",
      ],
    },
    nearbyCities: ["disenador-web-hondarribia", "disenador-web-errenteria", "disenador-web-lasarte"],
  },
  {
    slug: "disenador-web-vitoria",
    cityNames: { es: "Vitoria-Gasteiz", en: "Vitoria-Gasteiz", eu: "Gasteiz", fr: "Vitoria-Gasteiz" },
    regionNames: { es: "Álava", en: "Álava", eu: "Araba", fr: "Alava" },
    distanceFromIrunKm: 108,
    sectors: {
      es: "administración pública, industria, servicios y bodegas de Rioja Alavesa",
      en: "public administration, industry, services and Rioja Alavesa wineries",
      eu: "administrazio publikoa, industria, zerbitzuak eta Arabako Errioxako upategiak",
      fr: "administration publique, industrie, services et domaines viticoles de la Rioja Alavesa",
    },
    localTouches: {
      es: [
        "Una nave en Júndiz fabricando para media Europa y una web que parece de 2009. Pasa mucho en Vitoria: empresas serias, con producto y clientes de verdad, escondidas detrás de una página que no las representa. Y un comprador que las busca en Google y aterriza antes en el competidor que sí cuidó su web. Esa es la pelea que vengo a ganarte.",
        "Vitoria no se vende igual a todo el mundo, y ahí está el truco. Para industria de Júndiz o Gamarra monto webs pensadas para un comprador técnico: catálogo claro, capacidades, fichas y planos descargables, y un formulario que te llega con empresa, pieza y plazo, no con curiosos. Para una bodega de Laguardia o Elciego cambio el chip por completo: foto que da sed, marca y un ecommerce que no estorba. No diseño «una web bonita»; diseño la que hace que quien la mira coja el teléfono.",
        "Que esté a hora y cuarto por la A-1 no es excusa: si el proyecto lo pide, arrancamos con una visita en persona para ver tu negocio y luego seguimos por videollamada sin perder un día. La web la entrego igual de fina y te dejo la ficha de Google afinada para «diseñador web Vitoria» y las búsquedas de tu sector. Un pago único de 1.300€ + IVA, con el primer año incluido y sin cuotas mensuales.",
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
      fr: [
        "Un hangar à Júndiz qui fabrique pour la moitié de l'Europe et un site qui date de 2009. C'est très fréquent à Vitoria : des entreprises sérieuses, avec un vrai produit et de vrais clients, cachées derrière une page qui ne les représente pas. Et un acheteur qui les cherche sur Google et atterrit d'abord chez le concurrent qui, lui, a soigné son site. C'est ce combat-là que je viens gagner pour vous.",
        "Vitoria ne se vend pas de la même façon à tout le monde, et c'est là toute l'astuce. Pour l'industrie de Júndiz ou Gamarra, je construis des sites pensés pour un acheteur technique : catalogue clair, capacités, fiches et plans téléchargeables, et un formulaire qui vous arrive avec l'entreprise, la pièce et le délai, pas avec des curieux. Pour un domaine viticole de Laguardia ou Elciego, je change complètement de registre : photo qui donne soif, marque et un e-commerce qui ne gêne pas. Je ne dessine pas «un joli site» ; je dessine celui qui fait décrocher le téléphone à celui qui le regarde.",
        "Être à une heure et quart par l'A-1 n'est pas une excuse : si le projet le demande, on commence par une visite en personne pour voir votre entreprise, puis on continue en visioconférence sans perdre un jour. Je livre le site tout aussi soigné et je vous laisse la fiche Google bien réglée pour «diseñador web Vitoria» et les recherches de votre secteur. Un paiement unique de 1 300 € + TVA, première année incluse et sans mensualités.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-donostia"],
  },
  {
    slug: "disenador-web-hondarribia",
    cityNames: { es: "Hondarribia", en: "Hondarribia", eu: "Hondarribia", fr: "Hondarribia" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Guipuscoa" },
    distanceFromIrunKm: 5,
    sectors: {
      es: "hostelería, pesca, comercio y turismo costero",
      en: "hospitality, fishing, retail and coastal tourism",
      eu: "ostalaritza, arrantza, merkataritza eta kostaldeko turismoa",
      fr: "hôtellerie-restauration, pêche, commerce et tourisme côtier",
    },
    localTouches: {
      es: [
        "Un francés cruza el puente de Hendaia, aparca en la Marina y antes de bajar del coche ya ha buscado en el móvil dónde comer esta noche. Esa búsqueda la decides tú o la decide el de al lado. Hondarribia está a 5 km de Irun: el casco medieval vive del que llega de paso, y la Marina y la playa se llenan de gente que ha encontrado el sitio en Google diez minutos antes de entrar. Si tu negocio no sale ahí, no existe para ese cliente.",
        "Por eso aquí la web no es un escaparate bonito, es la primera mesa que reservas o el comercio que el turista pisa porque apareciste tú. La monto para que cargue rápida en un móvil con cobertura de frontera y la dejo en castellano, euskera, inglés y francés, porque el francés viene fijo y comparar precios en su idioma le cuesta cero. Y el SEO lo ato a lo que la gente teclea de verdad: «restaurante Hondarribia», «dónde comer Marina Hondarribia», «hotel cerca playa Hondarribia». De ahí salen las llamadas y las reservas, no de una página que nadie encuentra.",
        "Estar a 5 km tiene una ventaja que no te da una agencia de Madrid: si quieres ver un cambio en directo, podemos quedar y mirarlo juntos en tu pantalla en lugar de por videollamada. Un pago único de 1.300€ + IVA, con el primer año incluido y la web en propiedad. Tú te ocupas de la cocina o de la tienda; del que te busca en Google me ocupo yo.",
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
      fr: [
        "Vous passez le pont d'Hendaye, vous vous garez à la Marina, et avant même de sortir de la voiture, vous avez déjà cherché sur votre mobile où dîner ce soir. Cette recherche, c'est vous ou le voisin qui la remportez. Hondarribia est à 5 km d'Irun : la vieille ville médiévale vit de qui passe par là, et la Marina et la plage se remplissent de gens qui ont trouvé l'adresse sur Google dix minutes avant d'entrer. Si votre commerce n'y apparaît pas, il n'existe pas pour ce client.",
        "C'est pourquoi ici le site n'est pas une jolie vitrine, c'est la première table que vous réservez ou le commerce où le touriste met les pieds parce que c'est vous qui êtes apparu. Je le construis pour qu'il charge vite sur un mobile avec une couverture de frontière, et je le fais en espagnol, basque, anglais et français, parce que le client français vient en nombre et comparer les prix dans sa langue ne lui coûte rien. Et le SEO, je l'attache à ce que les gens tapent vraiment : «restaurante Hondarribia», «dónde comer Marina Hondarribia», «hotel cerca playa Hondarribia». C'est de là que viennent les appels et les réservations, pas d'une page que personne ne trouve.",
        "Être à 5 km offre un avantage qu'une agence de Madrid ne vous donnera pas : si vous voulez voir un changement en direct, on peut se retrouver et le regarder ensemble sur votre écran plutôt que par visioconférence. Un paiement unique de 1 300 € + TVA, première année incluse et le site vous appartient. Vous vous occupez de la cuisine ou de la boutique ; celui qui vous cherche sur Google, c'est moi qui m'en occupe.",
      ],
    },
    nearbyCities: ["disenador-web-irun", "disenador-web-donostia", "disenador-web-errenteria"],
  },
  {
    slug: "disenador-web-errenteria",
    cityNames: { es: "Errenteria", en: "Errenteria", eu: "Errenteria", fr: "Errenteria" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    distanceFromIrunKm: 15,
    sectors: {
      es: "comercio, industria, hostelería y servicios",
      en: "retail, industry, hospitality and services",
      eu: "merkataritza, industria, ostalaritza eta zerbitzuak",
      fr: "commerce, industrie, hôtellerie-restauration et services",
    },
    localTouches: {
      es: [
        "Tienes el taller en Lintzirin o Txirrita-Maleo, llevas años trabajando bien y aun así, cuando alguien busca tu servicio en Google, salen primero tres empresas de Donostia que ni pisan Errenteria. Esa es la pelea aquí: en los polígonos la maquinaria está al día, pero la web (si existe) es de hace diez años y no la encuentra nadie. Y el cliente que necesita un proveedor ya no pregunta en el bar de al lado: lo busca desde el móvil.",
        "En Errenteria mucha consulta llega en movimiento: desde el coche parado en la A-8 o desde la furgoneta de un encargado que tiene media hora para encontrar quien le suelde una pieza hoy. Por eso la web tiene que pesar poco y cargar bien aunque haya mala cobertura. Lo importante es que en 3 segundos sepa qué haces, dónde estás y cómo te llama. Eso es lo que monto: nada de catálogos lentos, y el teléfono y la dirección donde se ven a la primera.",
        "Estoy a 15 km, así que si quieres la primera reunión la hacemos en tu local en lugar de por videollamada. Te posiciono para «diseñador web Errenteria», «taller página web Errenteria» y las búsquedas por polígono (Lintzirin, Masti, Txirrita-Maleo), y dejo tu ficha de Google configurada para que el camión que cruza por Behobia o el cliente de paso hacia la frontera te encuentre antes que a los de Donostia. Todo por un pago único de 1.300€ + IVA, con el primer año incluido.",
      ],
      en: [
        "Errenteria is a mid-sized town with strong industrial presence: estates like Lintzirin, Masti and Txirrita-Maleo have grown a lot in recent years. I work with workshops, distributors, retailers in the centre near the town hall and restaurants serving the neighbourhood.",
        "The site has to be lightweight and load well on any mobile. Much of the lookup happens from a car or a client's van searching for a supplier. What matters is that in 3 seconds they know: what you do, where you are and how to reach you. That's what I build.",
        "Errenteria is 15 km from Irun, practically next door: if you'd rather, we hold the first meeting in person instead of over video call. For local SEO I cover «web designer Errenteria», «Errenteria workshop website» and per-sector and per-estate searches (Lintzirin, Masti, Txirrita-Maleo), and I leave your Google profile set up so the client looking for a supplier in the area calls you first.",
      ],
      eu: [
        "Errenteria tamaina ertaineko hiria da industria-pisu handiarekin: Lintzirin, Masti eta Txirrita-Maleo bezalako poligonoak asko hazi dira azken urteetan. Tailerrekin, banatzaileekin, udaletxe inguruko erdialdeko dendekin eta auzoa hornitzen duten jatetxeekin lan egiten dut.",
        "Hemen webak gutxi pisatu eta edozein mugikorrean ondo kargatu behar du. Kontsulta asko kotxetik edo bezeroaren furgonetatik etortzen dira hornitzaile bila. Garrantzitsuena hauxe da: 3 segundoan jakin behar dute zer egiten duzun, non zauden eta nola kontaktatu. Hori da egiten dudana.",
        "Errenteria Iruneik 15 km-ra dago, ia ondoan: nahi baduzu lehen bilera aurrez aurre egiten dugu, bideo-deiz beharrean. Tokiko SEO lanetan «web diseinatzaile Errenteria», «Errenteriako tailer web orria» eta sektore eta poligonoetako bilaketak lantzen ditut (Lintzirin, Masti, Txirrita-Maleo), eta zure Google fitxa ondo konfiguratuta uzten dut inguruan hornitzaile bila dabilen bezeroak zuri lehena deitzeko.",
      ],
      fr: [
        "Votre atelier est à Lintzirin ou à Txirrita-Maleo, vous travaillez bien depuis des années, et pourtant, quand quelqu'un cherche votre service sur Google, ce sont trois entreprises de Saint-Sébastien qui sortent en premier alors qu'elles ne mettent jamais les pieds à Errenteria. Voilà le combat ici : dans les zones industrielles, les machines sont à la pointe, mais le site (quand il existe) date d'il y a dix ans et personne ne le trouve. Et le client qui a besoin d'un fournisseur ne demande plus au bar d'à côté : il cherche depuis son mobile.",
        "À Errenteria, beaucoup de recherches se font en déplacement : depuis la voiture arrêtée sur l'A-8, ou depuis la camionnette d'un responsable qui a une demi-heure pour trouver quelqu'un capable de souder une pièce aujourd'hui. C'est pourquoi le site doit être léger et bien charger même avec une mauvaise couverture. L'essentiel, c'est qu'en 3 secondes on sache ce que vous faites, où vous êtes et comment vous appeler. C'est exactement ce que je construis : pas de catalogue lent à charger, mais le téléphone et l'adresse visibles au premier coup d'œil.",
        "Je suis à 15 km, donc si vous préférez, on tient la première réunion dans vos locaux plutôt qu'en visioconférence. Je vous positionne sur «diseñador web Errenteria», «taller página web Errenteria» et les recherches par zone industrielle (Lintzirin, Masti, Txirrita-Maleo), et je configure votre fiche Google pour que le camion qui passe par Behobia ou le client de passage vers la frontière vous trouve avant ceux de Saint-Sébastien. Le tout pour un paiement unique de 1 300 € + TVA, première année incluse.",
      ],
    },
    nearbyCities: ["disenador-web-irun", "disenador-web-hondarribia", "disenador-web-donostia"],
  },
  {
    slug: "disenador-web-lasarte",
    cityNames: { es: "Lasarte-Oria", en: "Lasarte-Oria", eu: "Lasarte-Oria", fr: "Lasarte-Oria" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    distanceFromIrunKm: 28,
    sectors: {
      es: "comercio, hostelería, servicios profesionales e hipódromo",
      en: "retail, hospitality, professional services and racecourse",
      eu: "merkataritza, ostalaritza, zerbitzu profesionalak eta hipodromoa",
      fr: "commerce, hôtellerie-restauration, services professionnels et hippodrome",
    },
    localTouches: {
      es: [
        "A 9 km tienes Donostia tragándose casi todas las búsquedas de la zona. Cuando alguien teclea tu servicio en Google, el mapa se llena de resultados donostiarras y tu local, que lleva años funcionando a base de boca a boca, ni aparece. Yo trabajo justo eso: que la clientela que ya está aquí, en Kale Nagusia, en los polígonos junto a la N-1 o cerca del Hipódromo, te encuentre a ti y no acabe llamando a uno de San Sebastián.",
        "En Lasarte hay muchos negocios familiares, gente que se conoce de toda la vida. Ahí no quiero romper nada de lo que ya funciona offline: quiero llevarlo a Google. Por eso monto la web con testimonios reales y fotos del local de verdad. El «aquí me conocen» que te ha dado de comer sigue intacto, solo que ahora también lo ve quien busca desde el móvil sin haber pisado nunca la calle.",
        "Estoy a 28 km, en la misma N-1, así que si quieres la primera reunión la hacemos en persona en lugar de por videollamada. Te posiciono para «diseñador web Lasarte», «hacer página web Lasarte-Oria» y las búsquedas de tu sector, y te dejo afinada la ficha de Google con la zona de servicio de Lasarte-Oria, para que el del barrio te llame a ti. Un pago único de 1.300€ + IVA, con el primer año incluido: la web es tuya y sin cuotas cada mes.",
      ],
      en: [
        "Lasarte-Oria is a small town with its own commercial pull: the Racecourse area, town centre retail, industrial estates along the N-1 and professional services. I work with local businesses that need to rank in their niche without going head-to-head with Donostia.",
        "I often see family businesses on their second or third generation making the digital leap. The website has to respect what already works offline: word of mouth, neighbourhood trust. That's why I include real testimonials, photos of the actual premises and everything that conveys that «people here know me» feel.",
        "I'm 28 km from Irun, so we can hold the initial meeting in person without a problem. For local SEO I cover searches like «web designer Lasarte», «build a website Lasarte-Oria» and the per-sector ones, and I set up your Google Business Profile with the Lasarte-Oria service area. The goal is clear: when someone searches for your service, you show up first.",
      ],
      eu: [
        "Lasarte-Oria hiri txikia da bere merkataritza eraginkortasunarekin: Hipodromoa, erdialdeko merkataritza, N-1 ondoko poligonoak eta zerbitzu profesionalak. Beren nitxoan posizionatu behar duten tokiko negozioekin lan egiten dut, Donostiarekin zuzenean lehiatu gabe.",
        "Hemen sarritan ikusten ditut bigarren edo hirugarren belaunaldiko familia negozioak jauzi digitala egiten. Webak offline funtzionatzen duena errespetatu behar du: ahoz ahokoa, auzoaren konfiantza. Horregatik testigantza errealak, lokalaren argazki errealak eta «hemen ezagutzen naute» sentsazioa transmititzen duen guztia jartzen dut.",
        "Iruneik 28 km-ra nago, beraz hasierako bilera aurrez aurre egin dezakegu lasai. Tokiko SEO lanetan «web diseinatzaile Lasarte», «web orria egin Lasarte-Oria» eta sektore bakoitzeko bilaketak lantzen ditut, eta Google Business Profile fitxa Lasarte-Oria eta inguruko zerbitzu-eremuarekin konfiguratzen dut. Helburua argia da: norbaitek zure zerbitzua bilatzen duenean, zu agertzea lehena.",
      ],
      fr: [
        "À 9 km, Saint-Sébastien avale presque toutes les recherches de la zone. Quand quelqu'un tape votre service sur Google, la carte se remplit de résultats donostiars et votre commerce, qui fonctionne depuis des années grâce au bouche-à-oreille, n'apparaît nulle part. Je travaille exactement là-dessus : que la clientèle déjà présente ici, Kale Nagusia, dans les zones industrielles le long de la N-1 ou près de l'Hippodrome, vous trouve vous, et n'appelle pas quelqu'un de Saint-Sébastien.",
        "À Lasarte, il y a beaucoup d'entreprises familiales, des gens qui se connaissent depuis toujours. Je ne veux surtout pas casser ce qui fonctionne déjà hors ligne : je veux le porter sur Google. C'est pourquoi je construis le site avec de vrais témoignages et de vraies photos du commerce. Le «ici on me connaît» qui vous a fait vivre reste intact, sauf que maintenant il est aussi visible pour celui qui cherche depuis son mobile sans jamais avoir mis les pieds dans la rue.",
        "Je suis à 28 km, sur la même N-1, donc si vous préférez, on tient la première réunion en personne plutôt qu'en visioconférence. Je vous positionne sur «diseñador web Lasarte», «hacer página web Lasarte-Oria» et les recherches de votre secteur, et je vous laisse une fiche Google bien réglée avec la zone de service de Lasarte-Oria, pour que le client du quartier vous appelle vous. Un paiement unique de 1 300 € + TVA, première année incluse : le site est à vous, sans abonnement mensuel.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-tolosa", "disenador-web-errenteria"],
  },
  {
    slug: "disenador-web-eibar",
    cityNames: { es: "Eibar", en: "Eibar", eu: "Eibar", fr: "Eibar" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    distanceFromIrunKm: 65,
    sectors: {
      es: "industria de máquina-herramienta, armería, comercio y servicios",
      en: "machine-tool industry, gunsmithing, retail and services",
      eu: "makina-erreminta industria, armagintza, merkataritza eta zerbitzuak",
      fr: "industrie de la machine-outil, armurerie, commerce et services",
    },
    localTouches: {
      es: [
        "En Eibar hay talleres que llevan medio siglo mecanizando piezas para clientes de medio mundo y que, cuando un comprador nuevo busca proveedor en Google, no aparecen por ningún lado. Lo he visto: empresas familiares de Azitain o Matsaria con capacidad técnica de sobra, perdiendo encargos frente a competidores que dan peor calidad pero tienen una web que se entiende. Esa es la verdadera fuga aquí, y no es de máquina, es de presencia.",
        "Cuando trabajo con una empresa industrial de Eibar, lo primero es entender que tu comprador no quiere eslóganes: quiere ver qué mecanizas, con qué tolerancias y poder descargarse la ficha sin pedir permiso. Por eso construyo la web alrededor de eso. Un catálogo que se lee en treinta segundos para que el técnico que está al otro lado no se vaya a otra pestaña. Las certificaciones a la vista, porque es lo que el comprador comprueba antes de descolgar el teléfono. Y un formulario de cotización que llega directo a tu correo o tu WhatsApp, sin que se pierda nada por el camino. Serio, pero no la web gris de los 2000 que todavía arrastra medio polígono.",
        "Eibar está a poco más de una hora de Irun: subo a la primera reunión en persona, veo el taller, y el resto lo llevamos por videollamada y WhatsApp sin que el proyecto pierda un ápice. Trabajo «diseñador web Eibar» y «página web empresa Eibar», pero sobre todo dejo tu ficha de Google afinada para que, cuando un comprador o un distribuidor busque mecanizado o proveedor en la comarca del Deba, te encuentre a ti antes que a nadie. Y arrancamos con un pago único de 1.300€ + IVA, primer año incluido, para que la decisión la tomes por lo que ves, no por lo que arriesgas.",
      ],
      en: [
        "Eibar is a particular case: historical gunsmithing and machine-tool industry with companies known worldwide. Industrial clients here know their stuff and need websites that communicate technical capability, not empty marketing. I work with central workshops, family companies in the Azitain and Matsaria estates, and specialised retail.",
        "For industrial B2B sites I focus on: clear catalogue with datasheet downloads, machining or process capabilities section, fast quote forms, and visible certifications. The aesthetic is serious but modern, without falling into the cliché of the grey 2000s industrial site.",
        "Eibar is 65 km from Irun: I combine an initial visit with video and WhatsApp follow-up, and deliver the site just as polished. For local SEO I cover «web designer Eibar», «company website Eibar» and industrial-sector searches, plus tuning your Google profile so you show up when a buyer or distributor looks for a supplier in the Deba valley.",
      ],
      eu: [
        "Eibar kasu berezia da: historikoa den armagintza eta makina-erreminta industria mundu osoan ezagunak diren enpresekin. Hemengo industria-bezeroek beren gauzak ondo dakizkite eta gaitasun teknikoa transmititzen duen weba behar dute, ez marketing hutsa. Erdialdeko tailerrekin, Azitain eta Matsariako poligonoetako familia-enpresekin eta merkataritza espezializatuarekin lan egiten dut.",
        "B2B web industrialetarako honako hauetan jartzen dut arreta: katalogo argia fitxa teknikoen deskargarekin, mekanizazio edo prozesu gaitasunen atala, kotizazio formulario azkarrak, eta ikus daitezkeen ziurtagiriak. Estetika serioa baina modernoa da, 2000ko web industrial grisaren klixean erori gabe.",
        "Eibar Iruneik 65 km-ra dago: hasierako bisita bat bideo-dei eta WhatsApp jarraipenarekin konbinatzen dut, eta weba berdin fina entregatzen dut. Tokiko SEO lanetan «web diseinatzaile Eibar», «enpresa web orria Eibar» eta industria-sektoreko bilaketak lantzen ditut, eta zure Google fitxa afintzen dut Debako bailaran hornitzaile bila dabilen erosle edo banatzaileak zu aurkitzeko.",
      ],
      fr: [
        "À Eibar, il y a des ateliers qui usinent des pièces depuis un demi-siècle pour des clients du monde entier et qui, quand un nouvel acheteur cherche un fournisseur sur Google, n'apparaissent nulle part. Je l'ai vu : des entreprises familiales d'Azitain ou de Matsaria avec une capacité technique largement suffisante, qui perdent des commandes face à des concurrents de moins bonne qualité mais dont le site se comprend. C'est la vraie fuite ici, et elle ne vient pas des machines, elle vient de l'absence de présence en ligne.",
        "Quand je travaille avec une entreprise industrielle d'Eibar, la première chose à comprendre c'est que votre acheteur ne veut pas de slogans : il veut voir ce que vous usinez, avec quelles tolérances, et pouvoir télécharger la fiche technique sans demander la permission. C'est pour ça que je construis le site autour de ça. Un catalogue qui se lit en trente secondes pour que le technicien de l'autre côté ne parte pas sur un autre onglet. Les certifications bien visibles, parce que c'est ce que l'acheteur vérifie avant de décrocher le téléphone. Et un formulaire de devis qui arrive directement dans votre e-mail ou votre WhatsApp, sans rien perdre en chemin. Sérieux, mais pas le site gris des années 2000 que la moitié de la zone industrielle traîne encore.",
        "Eibar est à un peu plus d'une heure d'Irun : je monte pour la première réunion en personne, je vois l'atelier, et on continue ensuite par visioconférence et WhatsApp sans que le projet en pâtisse. Je travaille «diseñador web Eibar» et «página web empresa Eibar», mais surtout je vous laisse une fiche Google bien affinée pour que, quand un acheteur ou un distributeur cherche un usinage ou un fournisseur dans la vallée du Deba, ce soit vous qu'il trouve avant tout le monde. Et on démarre avec un paiement unique de 1 300 € + TVA, première année incluse, pour que vous décidiez sur ce que vous voyez, pas sur ce que vous risquez.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-tolosa", "disenador-web-vitoria"],
  },
  {
    slug: "disenador-web-tolosa",
    cityNames: { es: "Tolosa", en: "Tolosa", eu: "Tolosa", fr: "Tolosa" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    distanceFromIrunKm: 42,
    sectors: {
      es: "industria papelera, gastronomía, comercio tradicional y servicios",
      en: "paper industry, gastronomy, traditional retail and services",
      eu: "paper industria, gastronomia, merkataritza tradizionala eta zerbitzuak",
      fr: "industrie papetière, gastronomie, commerce traditionnel et services",
    },
    localTouches: {
      es: [
        "El sábado por la mañana media comarca aparca en Tolosa para comprar en el Tinglado y comer alubias en un asador. Esa misma gente, antes de subir al coche, busca en el móvil dónde reservar o qué tienda abre. Si tu negocio no sale en Google a esa hora, lo está captando el de al lado. Trabajo con asadores y restaurantes del Triángulo y el casco, con el comercio que aún resiste a las cadenas en la calle Rondilla y el Paseo, y con la industria de los polígonos de Apatta y Usabal. Cada uno necesita una web distinta, no la misma plantilla pintada de otro color.",
        "Aquí conviven dos clientes y tu web tiene que ganar a los dos. Al de toda la vida, que ya sabe dónde va, le das el dato directo (horario, reserva, dónde aparcar) sin hacerle leer un folleto. Al de fuera, que busca «dónde comer alubias en Tolosa» o «restaurante Tolosa» desde el móvil mientras llega por las txuletas o el carnaval, le das motivos para elegirte a ti y no al siguiente resultado. Eso separa una web que decora de una que llena mesas.",
        "Estoy a unos 44 km por la N-1, así que si el proyecto lo pide nos vemos en persona sin que sea una odisea. Monto la web rápida en móvil, te dejo la ficha de Google afinada con tu zona de servicio en todo el Tolosaldea, y trabajo el SEO local de «diseñador web Tolosa», «página web restaurante Tolosa» y las búsquedas concretas de tu sector. El precio: 1.300€ + IVA, pago único con el primer año incluido. El objetivo no es que tengas una web bonita guardada en un cajón, es que cuando alguien busque lo tuyo en Tolosa, te llame a ti.",
      ],
      en: [
        "Tolosa is a town with strong personality: historic paper industry, Saturday market that draws the whole region, gastronomy with its own designation (alubias beans, grill txuletas) and traditional retail that has managed to modernise. I work with steakhouses and restaurants, town centre retailers and industrial companies in Apatta and Usabal.",
        "The audience here mixes loyal locals with tourists coming for the food. The site has to serve both: clear info for those who already know and want to book, and enough context for someone searching «where to eat alubias in Tolosa» landing from Google.",
        "I'm 42 km from Irun on the same N-1, so in-person meetings are easy. For local SEO I work «web designer Tolosa», «restaurant website Tolosa» and the per-sector searches, and I leave your Google Business Profile optimized so you capture both the Tolosaldea regional customer and the food tourist deciding on their phone where to book.",
      ],
      eu: [
        "Tolosa nortasun handiko hiria da: historikoa den paper industria, eskualde osoa erakartzen duen larunbateko azoka, izen propio duen gastronomia (babarrunak, txuletak parrillan) eta modernizatzen jakin duen merkataritza tradizionala. Asadoreekin eta jatetxeekin, erdialdeko dendekin eta Apatta eta Usabaleko industria-enpresekin lan egiten dut.",
        "Hemen ikusleak tokiko fidela eta gastronomiarako etortzen diren turistak nahasten ditu. Webak biei zerbitzatu behar die: informazio argia ezagutzen duenarentzat eta erreserba egin nahi duenarentzat, eta «non jan babarrunak Tolosan» bilatzen duenarentzat testuingurua nahikoa.",
        "Iruneik 42 km-ra nago, N-1 berean: aurrez aurreko bilerak errazak dira. Tokiko SEO lanetan «web diseinatzaile Tolosa», «jatetxe web orria Tolosa» eta sektore bakoitzeko bilaketak lantzen ditut, eta zure Google Business Profile fitxa optimizatuta uzten dizut, Tolosaldeko bezeroa nahiz mugikorrean non erreserbatu erabakitzen duen turista gastronomikoa harrapatzeko.",
      ],
      fr: [
        "Le samedi matin, la moitié de la région se gare à Tolosa pour faire ses courses au Tinglado et manger des alubias dans un asador. Ces mêmes personnes, avant de remonter en voiture, cherchent déjà sur leur mobile où réserver ou quel commerce est ouvert. Si votre établissement ne sort pas sur Google à ce moment-là, c'est votre voisin qui récupère le client. Je travaille avec les asadores et restaurants du Triángulo et du centre historique, avec le commerce qui résiste encore aux chaînes rue Rondilla et sur le Paseo, et avec l'industrie des zones d'Apatta et Usabal. Chacun a besoin d'un site différent, pas du même gabarit repeint d'une autre couleur.",
        "Ici, deux types de clients cohabitent et votre site doit convaincre les deux. Au client fidèle, qui sait déjà où aller, vous donnez l'info directe (horaires, réservation, où se garer) sans lui faire lire une brochure. Au visiteur de passage, qui cherche «où manger des alubias à Tolosa» ou «restaurant Tolosa» depuis son mobile en arrivant pour les txuletas ou le carnaval, vous donnez des raisons de vous choisir plutôt que le résultat suivant. C'est ce qui distingue un site décoratif d'un site qui remplit les tables.",
        "Je suis à environ 44 km par la N-1, donc si le projet le demande, on se rencontre en personne sans que ce soit une expédition. Je construis le site rapide sur mobile, je vous laisse une fiche Google bien affinée avec votre zone de service sur tout le Tolosaldea, et je travaille le SEO local de «diseñador web Tolosa», «página web restaurante Tolosa» et les recherches précises de votre secteur. Le prix : 1 300 € + TVA, paiement unique avec la première année incluse. L'objectif n'est pas d'avoir un joli site rangé dans un tiroir, c'est que quand quelqu'un cherche votre activité à Tolosa, ce soit vous qu'il appelle.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-lasarte", "disenador-web-eibar"],
  },
  {
    slug: "disenador-web-pamplona",
    cityNames: { es: "Pamplona", en: "Pamplona", eu: "Iruñea", fr: "Pampelune" },
    regionNames: { es: "Navarra", en: "Navarre", eu: "Nafarroa", fr: "Navarre" },
    distanceFromIrunKm: 80,
    sectors: {
      es: "industria, comercio, hostelería, servicios profesionales y administración",
      en: "industry, retail, hospitality, professional services and administration",
      eu: "industria, merkataritza, ostalaritza, zerbitzu profesionalak eta administrazioa",
      fr: "industrie, commerce, hôtellerie-restauration, services professionnels et administration",
    },
    localTouches: {
      es: [
        "En Pamplona el taller de Landaben que factura a media España puede no tener una web decente, y el restaurante de Carlos III que en San Fermín se llena solo el resto del año depende de quien lo encuentre en Google. La fábrica de Mutilva o Cordovilla necesita una web seria para que un comprador B2B la tome en serio; la tienda del Casco Antiguo solo necesita salir la primera cuando alguien busca con el móvil a dos calles. Trabajo las dos, porque no son el mismo cliente ni la misma web.",
        "Pamplona vende en tres direcciones a la vez: industria de automoción y agroalimentaria que coloca fuera, comercio y despachos de barrio en Iturrama y Ermitagaña que viven del de al lado, y gente que cruza desde el resto de España y desde Francia. Mucho de ese tráfico busca en castellano, pero también en euskera y en francés, y casi nadie tiene la web preparada para los tres. Ahí hay clientes que hoy se están yendo a otro porque no apareces.",
        "Y luego está la velocidad. Que tu web cargue sin hacer esperar a alguien con el móvil en la mano no es un extra: es la diferencia entre que llame o se vaya. Pamplona está a hora y cuarto de Irun, así que arrancamos por videollamada y nos vemos en persona cuando el proyecto lo pide; el trato de cerca no lo pierdes por la distancia. En SEO local peleo «diseñador web Pamplona», «hacer página web Iruñea» y las búsquedas por sector y por barrio (Iturrama, Ermitagaña, Casco Antiguo, los polígonos). Y para que empezar no sea una excusa: un pago único de 1.300€ + IVA, con el primer año incluido.",
      ],
      en: [
        "Pamplona is a capital with a strong business fabric: automotive and agri-food industry in Landaben, Mutilva, Imárcoain and Cordovilla industrial estates, premium retail in the Old Town and Carlos III, and professional services in Iturrama and Ermitagaña. I work with clients who need serious B2B sites and others closer to retail and service.",
        "What matters here is understanding that many potential clients search during San Fermín or as they pass through from the rest of Spain and France. The site has to load fast on any connection and serve es/eu bilingual properly (often French too). I set up Google Business Profile with service areas and local SEO pegged to the neighbourhood.",
        "Pamplona is 80 km from Irun: we start with a video call and meet in person when the project calls for it. For local SEO I cover «web designer Pamplona», «build a website Iruñea» and the per-sector and per-neighbourhood searches (Iturrama, Ermitagaña, Old Town, the industrial estates). The goal: when a client searches for your service in their part of Pamplona, your business is the first they see.",
      ],
      eu: [
        "Iruñea hiriburua da enpresa-egitura sendoa duena: automozio eta nekazaritza-elikagaien industria Landaben, Mutiloa, Imarkoain eta Cordovillako poligonoetan, merkataritza premium-a Alde Zaharrean eta Karlos III.an, eta zerbitzu profesionalak Iturramen eta Ermitaganan. B2B web serioak behar dituzten bezeroekin eta merkataritza eta zerbitzurako gertukoagoekin lan egiten dut.",
        "Hemen garrantzitsuena ulertzea da bezero potentzial askok San Ferminetan edo Espainia eta Frantziatik pasatzean bilatzen dutela. Webak edozein konexioan azkar kargatu behar du eta es/eu elebitasuna ondo zerbitzatu (askotan frantsesa ere bai). Google Business Profile zerbitzu eremuekin eta auzoari lotutako tokiko SEOa konfiguratzen ditut.",
        "Iruñea Iruneik 80 km-ra dago: bideo-deiarekin hasten gara eta aurrez aurre elkartzen gara proiektuak eskatzen duenean. Tokiko SEO lanetan «web diseinatzaile Iruñea», «web orria egin Iruñea» eta sektore eta auzoetako bilaketak lantzen ditut (Iturrama, Ermitagaña, Alde Zaharra, poligonoak). Helburua: bezero batek bere Iruñeko auzoan zure zerbitzua bilatzen duenean, zure negozioa lehena izatea.",
      ],
      fr: [
        "À Pampelune, l'atelier de Landaben qui facture dans toute l'Espagne peut très bien ne pas avoir de site correct, et le restaurant de Carlos III qui se remplit tout seul pendant la San Fermín dépend, le reste de l'année, de ceux qui le trouvent sur Google. L'usine de Mutilva ou de Cordovilla a besoin d'un site sérieux pour qu'un acheteur B2B la prenne au sérieux ; le commerce de la vieille ville a juste besoin de sortir en premier quand quelqu'un cherche depuis son mobile à deux rues de là. Je travaille les deux, parce que ce n'est ni le même client ni le même site.",
        "Pampelune vend dans trois directions à la fois : industrie automobile et agroalimentaire qui exporte, commerces et cabinets de quartier à Iturrama et Ermitagaña qui vivent du voisinage, et des gens qui viennent du reste de l'Espagne et de France. Une grande partie de ce trafic cherche en espagnol, mais aussi en basque et en français, et presque personne n'a de site prêt pour les trois. Ce sont des clients qui, aujourd'hui, partent chez un autre parce que vous n'apparaissez pas.",
        "Et puis il y a la vitesse. Que votre site charge sans faire attendre quelqu'un le mobile à la main n'est pas un extra : c'est ce qui fait qu'il appelle ou qu'il s'en va. Pampelune est à une heure et quart d'Irun, donc on démarre en visioconférence et on se rencontre en personne quand le projet le demande ; la proximité ne se perd pas avec la distance. En SEO local, je travaille «diseñador web Pamplona», «hacer página web Iruñea» et les recherches par secteur et par quartier (Iturrama, Ermitagaña, vieille ville, zones industrielles). Et pour que démarrer ne soit pas un problème : un paiement unique de 1 300 € + TVA, première année incluse.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-vitoria", "disenador-web-logrono"],
  },
  {
    slug: "disenador-web-logrono",
    cityNames: { es: "Logroño", en: "Logroño", eu: "Logroño", fr: "Logroño" },
    regionNames: { es: "La Rioja", en: "La Rioja", eu: "Errioxa", fr: "La Rioja" },
    distanceFromIrunKm: 180,
    sectors: {
      es: "bodegas y vino, hostelería, comercio, servicios y agroalimentaria",
      en: "wineries and wine, hospitality, retail, services and agri-food",
      eu: "upategiak eta ardoa, ostalaritza, merkataritza, zerbitzuak eta nekazaritza-elikagaien",
      fr: "caves et vin, hôtellerie-restauration, commerce, services et agroalimentaire",
    },
    localTouches: {
      es: [
        "Un turista aparca en Logroño un jueves, abre el móvil y busca «dónde comer en la calle Laurel» o «bodega para visitar en Rioja». El que sale primero en Google se lleva la reserva; el resto, a esperar. Esa pelea no la gana quien tiene la web más bonita, sino quien la tiene rápida en el móvil y la ficha de Google bien montada. Y en Logroño la mayoría todavía la tiene a medias.",
        "Pero La Rioja no es solo vino y pintxos. Trabajo igual con el comercio de Portales y Gran Vía, con despachos y servicios profesionales del centro, y con empresas de los polígonos de Cantabria o de El Sequero, en Agoncillo. Cada uno vende a un cliente distinto y la web tiene que ir a por ese cliente: una bodega que quiere visitas necesita reservas claras y SEO que pesque también en francés e inglés; un comercio de barrio necesita salir el primero cuando alguien busca su producto desde el sofá. No te monto «una web»: te monto la que te trae llamadas.",
        "Logroño está a 180 km de Irun, y prefiero decírtelo de frente: lo llevo en remoto, por videollamada y WhatsApp, y a estas alturas eso no resta nada al resultado. Tú decides cómo arrancamos: un pago único de 1.300€ + IVA, primer año incluido. En SEO local trabajo «diseñador web Logroño», «página web bodega Rioja» y las búsquedas de enoturismo en varios idiomas, y te dejo la ficha de Google lista para que el de fuera que llega sin conocer la ciudad te encuentre a ti antes que al de al lado.",
      ],
      en: [
        "Logroño and La Rioja live on wine and food: wineries in Haro and La Rioja Alta, restaurants and bars in Calle Laurel and San Juan, and the whole wine-tourism ecosystem drawing visitors from northern Spain, France and the UK. Sites here have to smell of earth and wine, not look like a generic template.",
        "For wineries I work strong visual experience (own photography, simple ecommerce in some cases, integration with platforms like Vivino or Vinissimus if appropriate) and local SEO plus international SEO. For Laurel/San Juan hospitality, fast mobile and clear bookings. I adapt the site to who's going to buy.",
        "Logroño is far from Irun (180 km), so I run the project remotely with the same standards: video calls, WhatsApp day-to-day and impeccable delivery. For local SEO I work «web designer Logroño», «Rioja winery website» and multilingual wine-tourism searches, and I leave your Google profile ready so the visitor arriving from elsewhere finds you first.",
      ],
      eu: [
        "Logroño eta Errioxa ardo eta gastronomiari esker bizi dira: Haro eta Errioxa Garaiko upategiak, Laurel eta San Juan kaleko jatetxe eta tabernak, eta enoturismoaren ekosistema osoa, Espainiar iparraldeko, Frantziako eta Erresuma Batuko bisitariak erakartzen dituena. Hemengo webek lurra eta ardoa usaindu behar dute, ez plantilla generiko bat eman.",
        "Upategientzat esperientzia bisual sendoa lantzen dut (argazki propioak, ekomertzio sinplea kasu batzuetan, Vivino edo Vinissimus bezalako plataformekin integrazioa egokia bada) eta tokiko SEOa nazioarteko merkatuetako SEOa gehiago. Laurel/San Juango ostalaritzarako, mugikor azkarra eta erreserba argiak. Weba erosiko duenari egokitzen diot.",
        "Logroño Iruneik urrun dago (180 km), beraz proiektua urrunetik eramaten dut exijentzia berarekin: bideo-deiak, WhatsApp egunerokoan eta entrega akasgabea. Tokiko SEO lanetan «web diseinatzaile Logroño», «Errioxako upategi web orria» eta hizkuntza askotako enoturismo bilaketak lantzen ditut, eta zure Google fitxa prest uzten dut kanpotik datorren bisitariak zu lehena aurkitzeko.",
      ],
      fr: [
        "Un touriste se gare à Logroño un jeudi, ouvre son téléphone et cherche « où manger calle Laurel » ou « bodega à visiter en Rioja ». Celui qui sort en premier sur Google récupère la réservation ; les autres attendent. Cette bataille, ce n'est pas celui qui a le plus beau site qui la gagne, mais celui dont le site est rapide sur mobile et dont la fiche Google est bien tenue. Et à Logroño, la plupart l'ont encore à moitié faite.",
        "Mais La Rioja, ce n'est pas que le vin et les pintxos. Je travaille aussi avec le commerce de Portales et Gran Vía, avec les cabinets et services professionnels du centre, et avec des entreprises des zones industrielles de Cantabria ou d'El Sequero, à Agoncillo. Chacun vend à un client différent et le site doit viser ce client précis : une bodega qui veut des visites a besoin de réservations claires et d'un SEO qui capte aussi en français et en anglais ; un commerce de quartier a besoin de sortir en premier quand quelqu'un cherche son produit depuis son canapé. Je ne vous monte pas « un site » : je vous monte celui qui vous apporte des appels.",
        "Logroño est à 180 km d'Irun, et je préfère vous le dire franchement : je gère ça à distance, par visioconférence et WhatsApp, et à ce niveau d'exigence cela ne change rien au résultat. C'est vous qui décidez comment on démarre : un paiement unique de 1 300 € + TVA, première année incluse. Côté SEO local, je travaille « diseñador web Logroño », « página web bodega Rioja » et les recherches d'œnotourisme en plusieurs langues, et je vous laisse la fiche Google prête pour que le visiteur qui arrive sans connaître la ville vous trouve avant le voisin.",
      ],
    },
    nearbyCities: ["disenador-web-pamplona", "disenador-web-vitoria"],
  },
  {
    slug: "disenador-web-santander",
    cityNames: { es: "Santander", en: "Santander", eu: "Santander", fr: "Santander" },
    regionNames: { es: "Cantabria", en: "Cantabria", eu: "Kantabria", fr: "Cantabrie" },
    distanceFromIrunKm: 200,
    sectors: {
      es: "turismo, hostelería, comercio, servicios profesionales e industria",
      en: "tourism, hospitality, retail, professional services and industry",
      eu: "turismoa, ostalaritza, merkataritza, zerbitzu profesionalak eta industria",
      fr: "tourisme, hôtellerie-restauration, commerce, services professionnels et industrie",
    },
    localTouches: {
      es: [
        "En verano El Sardinero se llena y, cuando alguien busca «hotel en Santander» o «restaurante en El Sardinero» desde el móvil, en la playa, decidiendo dónde comer en los próximos veinte minutos, tu competencia aparece la primera. Si tu web no carga rápido o no sale en esa búsqueda, ese cliente entra en otro sitio. Así se gana o se pierde en Santander, y se decide en el teléfono.",
        "Santander no es un solo negocio: es el bufete del Centro que necesita parecer serio, el restaurante de Puertochico que vive de reservas y la empresa de los polígonos de Raos o Candina que cierra contratos por catálogo. No te monto «una web bonita» para cualquiera; te monto la que trae llamadas y clientes a TU caso, con la ficha de Google afinada por barrio para que aparezcas donde la gente busca de verdad.",
        "Estoy a 200 km, en Irun, y eso no cambia nada en el resultado: videollamada, WhatsApp directo y la web entregada igual que si trabajara en la calle de al lado. Te posiciono donde te buscan de verdad, por El Sardinero, por el Centro, por Puertochico, y arrancas con un pago único de 1.300€ + IVA, primer año incluido. Tu pico de verano lo aprovechas tú, no el de al lado.",
      ],
      en: [
        "Santander is a coastal city with a strong tourism weight and premium residential life in El Sardinero, the centre and Pedreña. Hotels, restaurants and retail mix with professional services and law firms in the centre, and industrial companies in the Raos and Candina estates. Each client expects a different level.",
        "The challenge here is seasonality: the site has to handle the summer traffic peak without falling over and respond fast to people searching «hotel Santander», «restaurant El Sardinero» or «notary Santander» from mobile. I build it fast on mobile and with the Google profile finely tuned to your area.",
        "Santander is 200 km from Irun, so we work remotely without it showing in the result: video calls, direct WhatsApp and a site delivered with the same care as if I were next door. For local SEO I cover «web designer Santander», «Santander hotel website» and per-neighbourhood searches (El Sardinero, Centro, Puertochico), so you capture both the tourist and the local client deciding on their phone.",
      ],
      eu: [
        "Santander kostaldeko hiria da turismo pisu handiarekin eta El Sardinero, Erdialde eta Pedreñako bizitza erresidentzial premiumarekin. Hotelak, jatetxeak eta merkataritza zerbitzu profesionalekin eta erdialdeko bulegoekin nahasten dira, baita Raos eta Candinako poligonoetako industria-enpresekin ere. Bezero bakoitzak maila desberdina espero du.",
        "Hemengo erronka denboraldikotasuna da: webak udako trafiko-puntua eutsi behar du erori gabe eta «Santander hotela», «El Sardineroko jatetxea» edo «Santander notarioa» mugikorretik bilatzen duenari azkar erantzun. Mugikorrerako azkar eta zure eremurako ondo afinatutako Google fitxarekin egiten dut.",
        "Santander Iruneik 200 km-ra dago, beraz urrunetik lan egiten dugu emaitzan nabaritu gabe: bideo-deiak, WhatsApp zuzena eta ondoan banengo bezain arretaz entregatutako weba. Tokiko SEO lanetan «web diseinatzaile Santander», «Santander hotel web orria» eta auzoetako bilaketak lantzen ditut (El Sardinero, Erdialdea, Puertochico), turista nahiz mugikorrean erabakitzen duen tokiko bezeroa harrapatzeko.",
      ],
      fr: [
        "En été, El Sardinero se remplit et, quand quelqu'un cherche « hôtel à Santander » ou « restaurant à El Sardinero » depuis son téléphone, sur la plage, en train de décider où manger dans les vingt prochaines minutes, c'est votre concurrent qui apparaît en premier. Si votre site ne charge pas vite ou ne sort pas dans cette recherche, ce client va ailleurs. C'est comme ça qu'on gagne ou qu'on perd à Santander, et ça se décide sur le téléphone.",
        "Santander, ce n'est pas un seul type de commerce : c'est le cabinet du Centro qui doit paraître sérieux, le restaurant de Puertochico qui vit de ses réservations et l'entreprise des zones industrielles de Raos ou Candina qui signe ses contrats sur catalogue. Je ne vous monte pas « un joli site » standard ; je vous monte celui qui apporte des appels et des clients à VOTRE cas précis, avec la fiche Google affinée par quartier pour que vous appariassiez là où les gens cherchent vraiment.",
        "Je suis à 200 km, à Irun, et cela ne change rien au résultat : visioconférence, WhatsApp direct et un site livré avec le même soin que si je travaillais dans la rue d'à côté. Je vous positionne là où l'on vous cherche vraiment, sur El Sardinero, sur le Centro, sur Puertochico, et vous démarrez avec un paiement unique de 1 300 € + TVA, première année incluse. Votre pic d'été, c'est vous qui en profitez, pas le voisin.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao"],
  },
  {
    slug: "disenador-web-pasaia",
    cityNames: { es: "Pasaia", en: "Pasaia", eu: "Pasaia", fr: "Pasaia" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    distanceFromIrunKm: 18,
    sectors: {
      es: "puerto, pesca, industria naval, hostelería y comercio",
      en: "port, fishing, naval industry, hospitality and retail",
      eu: "portua, arrantza, ontzi-industria, ostalaritza eta merkataritza",
      fr: "port, pêche, industrie navale, hôtellerie-restauration et commerce",
    },
    localTouches: {
      es: [
        "Hay empresas en el puerto de Pasaia con años de recorrido cuya web parece hecha en 2009 o directamente no existe. Naves serias, negocios sólidos, y ni rastro en Google cuando un cliente busca proveedor. En un puerto donde la mitad del trabajo se cierra por contactos de toda la vida, el que aparece bien online se lleva al cliente nuevo que aún no conoce a nadie. Esa es la pelea, y casi nadie la está dando.",
        "Y es que en Pasaia conviven dos mundos en cuatro barrios con muy poca cosa en común. Por un lado el B2B portuario de Antxo y Trintxerpe (industria naval, pesca, logística): ahí necesitas una web en castellano e inglés, con tus capacidades técnicas claras, catálogo y un formulario que te traiga peticiones serias, no curiosos. Por otro, la hostelería de Donibane y San Pedro, que vive del turista que cruza la bahía en barco desde Donostia para comer mirando el agua: ahí lo que vende son reservas fáciles, fotos que den hambre y la carta en castellano, euskera, inglés y francés. Mismo pueblo, dos proyectos distintos, y los planto cada uno donde toca.",
        "Estoy a 18 km, en Irun, así que si quieres la reunión la tenemos en tu nave en lugar de por videollamada. Para que te encuentren trabajo búsquedas como «diseñador web Pasaia» o «página web empresa Pasaia», las de cada distrito (Antxo, Trintxerpe, Donibane, San Pedro) y las de tu sector, y te dejo la ficha de Google bien montada para que salgas el primero cuando alguien de la bahía te busque. Todo eso por un pago único de 1.300€ + IVA, con el primer año incluido y la web en propiedad.",
      ],
      en: [
        "Pasaia has four districts with very different personalities: Antxo, San Pedro, Donibane and Trintxerpe. Activity revolves around the port: naval industry, fishing, logistics and associated retail. I work with port companies, restaurants with bay views and neighbourhood retailers.",
        "Many clients here are port B2B: they need serious es/en sites with catalogue, technical capabilities and qualified forms. Others are hospitality businesses targeting tourists arriving by boat from Donostia, and need clear bookings and es/eu/en/fr multilingual. Same project, two approaches.",
        "Pasaia is 18 km from Irun: practically next door, in-person meetings no problem. For local SEO I cover «web designer Pasaia», «company website Pasaia» and the per-district (Antxo, Trintxerpe, Donibane, San Pedro) and per-sector searches, and I leave your Google profile set up so the bay-area customer finds you first.",
      ],
      eu: [
        "Pasaiak lau auzo ditu nortasun oso desberdinekoak: Antxo, San Pedro, Donibane eta Trintxerpe. Jarduera portuaren inguruan dabil: ontzi-industria, arrantza, logistika eta merkataritza erlazionatua. Portu-enpresekin, badiarako bistak dituzten jatetxeekin eta auzoko dendekin lan egiten dut.",
        "Hemen bezero asko portuko B2B dira: katalogoa, gaitasun teknikoak eta formulario kualifikatuak dituzten es/en web serioak behar dituzte. Beste batzuk Donostiatik itsasontziz iristen diren turistei begira dauden ostalaritza-negozioak dira, eta erreserba argiak eta es/eu/en/fr eleaniztasuna behar dute. Proiektu bera, bi ikuspegi.",
        "Pasaia Iruneik 18 km-ra dago: ia ondoan, aurrez aurreko bilerak arazorik gabe. Tokiko SEO lanetan «web diseinatzaile Pasaia», «enpresa web orria Pasaia» eta auzoetako (Antxo, Trintxerpe, Donibane, San Pedro) eta sektoreko bilaketak lantzen ditut, eta zure Google fitxa ondo konfiguratuta uzten dut badiako bezeroak zu lehena aurkitzeko.",
      ],
      fr: [
        "Il y a des entreprises dans le port de Pasaia qui existent depuis des années et dont le site a l'air d'avoir été fait en 2009, quand il existe. Des locaux sérieux, des affaires solides, et aucune trace sur Google quand un client cherche un fournisseur. Dans un port où la moitié du travail se conclut par des contacts de toujours, celui qui apparaît bien en ligne récupère le nouveau client qui ne connaît encore personne. C'est cette bataille-là, et presque personne ne la mène.",
        "À Pasaia cohabitent deux mondes dans quatre quartiers qui n'ont presque rien en commun. D'un côté, le B2B portuaire d'Antxo et Trintxerpe (industrie navale, pêche, logistique) : là il vous faut un site en espagnol et en anglais, avec vos capacités techniques claires, un catalogue et un formulaire qui vous amène de vraies demandes, pas des curieux. De l'autre, l'hôtellerie-restauration de Donibane et San Pedro, qui vit du touriste qui traverse la baie en bateau depuis Donostia pour manger face à l'eau : là ce qui vend, ce sont des réservations faciles, des photos qui donnent faim et la carte en espagnol, basque, anglais et français. Même village, deux projets différents, et je place chacun là où il doit être.",
        "Je suis à 18 km, à Irun, donc si vous préférez, on tient la réunion dans vos locaux plutôt qu'en visioconférence. Pour qu'on vous trouve, je travaille des recherches comme « diseñador web Pasaia » ou « página web empresa Pasaia », celles de chaque quartier (Antxo, Trintxerpe, Donibane, San Pedro) et celles de votre secteur, et je vous laisse la fiche Google bien montée pour que vous sortiez en premier quand quelqu'un de la baie vous cherche. Tout cela pour un paiement unique de 1 300 € + TVA, première année incluse et le site vous appartient.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-errenteria", "disenador-web-hondarribia"],
  },
  {
    slug: "disenador-web-zarautz",
    cityNames: { es: "Zarautz", en: "Zarautz", eu: "Zarautz", fr: "Zarautz" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa", fr: "Gipuzkoa" },
    distanceFromIrunKm: 36,
    sectors: {
      es: "turismo costero, hostelería, comercio premium y servicios",
      en: "coastal tourism, hospitality, premium retail and services",
      eu: "kostaldeko turismoa, ostalaritza, merkataritza premium eta zerbitzuak",
      fr: "tourisme côtier, hôtellerie-restauration, commerce haut de gamme et services",
    },
    localTouches: {
      es: [
        "Un sábado de agosto en Zarautz la playa se llena de gente que no es de aquí. Surfistas que bajan a Talaimendi, familias que aparcan donde pueden y turistas que, mientras pasean por el Malecón, sacan el móvil y escriben «dónde comer en Zarautz». Quien sale en esos tres primeros resultados llena mesas esa misma noche; quien no, ve pasar la temporada desde la cocina. Trabajo con restaurantes y bares de la Kale Nagusia y el centro, surf shops de la zona de la playa y casas de huéspedes que viven de esos meses y necesitan exprimirlos.",
        "El problema de fondo es que en Zarautz el cliente busca con prisa y desde el móvil, muchas veces en pleno paseo. Si tu web tarda en cargar o la ficha de Google está a medias, el de al lado se lleva la reserva. Por eso monto webs rápidas en el móvil de verdad y configuro bien tu ficha de Google (horarios, fotos actuales, reseñas recientes), que es lo que decide búsquedas como «hotel Zarautz playa» o «clase de surf Zarautz». No es hacerte una web bonita: es que suene el teléfono y se llene la agenda.",
        "Estoy a 36 km, en Irun, misma costa y misma autopista, así que si el proyecto lo pide nos vemos en persona sin problema. Y como aquí entra mucho visitante de fuera, incluido el cliente francés que cruza la frontera en verano, trabajo la web en castellano, euskera, inglés y francés para que te encuentre el primero, lo entienda y reserve. Todo esto por un pago único de 1.300€ + IVA, con el primer año incluido.",
      ],
      en: [
        "Zarautz lives on surfing, the longest beach in Gipuzkoa, top-tier hospitality (with a 3-Michelin-star restaurant included) and premium retail that knows the average client here has buying power. I work with surf shops, restaurants and guesthouses in the centre and the beach area.",
        "Local SEO matters a lot here because searches like «Zarautz restaurant», «Zarautz beach hotel» or «Zarautz surf class» are decided in the first 3 results. To get there I combine a very well-optimized Google Business Profile with a fast mobile site and a reviews system that keeps your business active on the map.",
        "I'm 36 km from Irun, on the same coast: driving up to Zarautz for a meeting is a plan, not a problem. Since many clients arrive in season from elsewhere, I look after es/eu/en/fr multilingual and impeccable mobile, so the visitor searching where to eat or sleep finds you first and books without friction.",
      ],
      eu: [
        "Zarautz surf-aren, Gipuzkoako hondartza luzeenaren, maila handiko ostalaritzaren (3 izar Michelin duen jatetxe bat barne) eta hemengo bezero ertainak erosteko ahalmena duela dakien merkataritza premium baten bidez bizi da. Erdialdeko eta hondartza inguruko surf-dendekin, jatetxeekin eta ostatuekin lan egiten dut.",
        "Tokiko SEOk pisu handia du, «Zarautz jatetxea», «Zarautz hondartza hotela» edo «Zarautz surf eskola» bilaketak lehen 3 emaitzetan erabakitzen direlako. Lortzeko, oso ondo optimizatutako Google Business Profile, mugikorrean azkarra den web bat eta zure negozioa mapan aktibo mantentzen duen iritzien sistema konbinatzen ditut.",
        "Iruneik 36 km-ra nago, kostalde berean: Zarautzera bilera baterako igotzea plana da, ez arazoa. Bezero asko denboraldian kanpotik iristen direnez, es/eu/en/fr eleaniztasuna eta mugikor akasgabea zaintzen ditut, non jan edo non lo egin bilatzen duen bisitariak zu lehena aurkitu eta marruskadurarik gabe erreserba dezan.",
      ],
      fr: [
        "Un samedi d'août à Zarautz, la plage se remplit de gens qui ne sont pas d'ici. Des surfeurs qui descendent à Talaimendi, des familles qui se garent où elles peuvent et des touristes qui, en se promenant sur le Malecón, sortent leur téléphone et tapent « où manger à Zarautz ». Celui qui sort dans ces trois premiers résultats remplit ses tables le soir même ; celui qui n'y est pas voit la saison passer depuis sa cuisine. Je travaille avec des restaurants et bars de la Kale Nagusia et du centre, des surf shops du quartier de la plage et des maisons d'hôtes qui vivent de ces mois-là et doivent en tirer le maximum.",
        "Le vrai problème, c'est qu'à Zarautz le client cherche vite et depuis son téléphone, souvent en pleine promenade. Si votre site met du temps à charger ou que votre fiche Google est à moitié remplie, c'est le voisin qui récupère la réservation. C'est pour ça que je monte des sites vraiment rapides sur mobile et que je configure bien votre fiche Google (horaires, photos actuelles, avis récents), ce qui fait la différence sur des recherches comme « hôtel Zarautz plage » ou « cours de surf Zarautz ». Il ne s'agit pas de vous faire un joli site : il s'agit que le téléphone sonne et que l'agenda se remplisse.",
        "Je suis à 36 km, à Irun, même côte et même autoroute, donc si le projet le demande on se voit en personne sans problème. Et comme beaucoup de visiteurs viennent d'ailleurs ici, y compris le client français qui traverse la frontière en été, je travaille le site en espagnol, basque, anglais et français pour qu'il vous trouve en premier, comprenne votre offre et réserve. Tout cela pour un paiement unique de 1 300 € + TVA, première année incluse.",
      ],
    },
    nearbyCities: ["disenador-web-donostia", "disenador-web-tolosa", "disenador-web-lasarte"],
  },
  {
    slug: "disenador-web-getxo",
    cityNames: { es: "Getxo", en: "Getxo", eu: "Getxo", fr: "Getxo" },
    regionNames: { es: "Bizkaia", en: "Bizkaia", eu: "Bizkaia", fr: "Bizkaia" },
    distanceFromIrunKm: 130,
    sectors: {
      es: "residencial premium, servicios profesionales, hostelería y comercio",
      en: "premium residential, professional services, hospitality and retail",
      eu: "egoitza premium, zerbitzu profesionalak, ostalaritza eta merkataritza",
      fr: "résidentiel haut de gamme, services professionnels, hôtellerie-restauration et commerce",
    },
    localTouches: {
      es: [
        "Un cliente que vive en Neguri o pasea por el Muelle de Las Arenas no perdona una web lenta ni una ficha de Google a medias: si la tuya no carga bien en el móvil, se va a la siguiente sin pensarlo. Ese es el problema real en Getxo. Aquí hay dinero y exigencia a partes iguales, pero la mayoría de clínicas, despachos y restaurantes tienen una web que no está a la altura del barrio en el que trabajan. Y eso, en la práctica, son llamadas y reservas que se pierden cada semana.",
        "Conozco el terreno: el Puerto Viejo de Algorta lleno de gente a la hora del pintxo, la avenida Zugazarte con sus despachos y comercio de Las Arenas, el Romo más de calle, las consultas profesionales repartidas entre Algorta y Neguri. No es lo mismo posicionar un restaurante junto al Puente Colgante que una clínica dental en Zugazarte, y la web tiene que reflejar eso. Para clínicas y despachos voy a confianza visual de verdad (fotografía propia, equipo a la vista, formulario de cita que se rellena en treinta segundos) y para hostelería, un móvil impecable con reservas integradas. Nada de relleno «de postín»: lo que convierte es claridad, no fuegos artificiales.",
        "Getxo está a 130 km de Irun, así que el proyecto lo llevo por videollamada con alguna visita puntual a Bizkaia cuando merece la pena, y lo entrego igual de fino. Trabajo el SEO local que importa: «diseñador web Getxo», «página web clínica Getxo» y las búsquedas por zona (Neguri, Algorta, Las Arenas, Romo) para que cuando alguien busque tu servicio aparezcas tú primero en el mapa y no la competencia. Te dejo la ficha de Google afinada y reseñas recientes trabajándose, todo por un pago único de 1.300€ + IVA, con el primer año incluido.",
      ],
      en: [
        "Getxo is one of the highest-purchasing-power municipalities in the Basque Country: Neguri, Algorta, Las Arenas. Clients here expect refined brands, personalised attention and sites that respect the residential elegance of the municipality. I work with clinics, professional firms, restaurants and premium retail.",
        "For clinics and firms I focus on visual trust (professional photography, visible certifications) and a fast booking form. For hospitality in Algorta and Las Arenas, impeccable mobile and integrated bookings. The aesthetic always refined, without falling into the cliché of the «posh» site that ends up overwrought.",
        "Getxo is 130 km from Irun: I run the project combining video calls and the occasional visit to Bizkaia when it's worth it. For local SEO I cover «web designer Getxo», «Getxo clinic website» and per-area searches (Neguri, Algorta, Las Arenas), so when a high-purchasing-power client searches for your service, your business is the one that conveys the most trust and shows up first.",
      ],
      eu: [
        "Getxo Euskal Herriko erosteko ahalmen handiena duen udalerrietako bat da: Neguri, Algorta, Areeta. Hemengo bezeroek marka zainduak, arreta pertsonalizatua eta udalerriaren dotorezia erresidentziala errespetatzen duten webguneak espero dituzte. Klinikekin, bulego profesionalekin, jatetxeekin eta merkataritza premium-arekin lan egiten dut.",
        "Klinika eta bulegoetarako konfiantza bisualean jartzen dut arreta (argazki profesionalak, ziurtagiri ikusgarriak) eta hitzordu formulario azkarra. Algorta eta Areetako ostalaritzarako, mugikor akasgabea eta integratutako erreserbak. Estetika beti zaindua, web «dotore» kargatuegiaren klixean erori gabe.",
        "Getxo Iruneik 130 km-ra dago: proiektua bideo-deia eta noizbehinkako Bizkaiako bisitaren bidez eramaten dut, merezi duenean. Tokiko SEO lanetan «web diseinatzaile Getxo», «Getxo klinika web orria» eta eremuetako bilaketak lantzen ditut (Neguri, Algorta, Areeta), erosteko ahalmen handiko bezero batek zure zerbitzua bilatzean, zure negozioa konfiantza gehien transmititzen duena eta lehena agertzen dena izateko.",
      ],
      fr: [
        "Un client qui habite à Neguri ou qui se promène sur le quai de Las Arenas ne pardonne ni un site lent ni une fiche Google à moitié faite : si le vôtre ne charge pas bien sur mobile, il passe au suivant sans hésiter. C'est le vrai problème à Getxo. Il y a ici autant d'argent que d'exigence, mais la plupart des cliniques, cabinets et restaurants ont un site qui n'est pas à la hauteur du quartier où ils travaillent. Et concrètement, ce sont des appels et des réservations qui se perdent chaque semaine.",
        "Je connais le terrain : le Puerto Viejo d'Algorta plein de monde à l'heure du pintxo, l'avenue Zugazarte avec ses cabinets et le commerce de Las Arenas, Romo plus populaire, les consultations professionnelles réparties entre Algorta et Neguri. Ce n'est pas la même chose de positionner un restaurant près du Puente Colgante qu'une clinique dentaire à Zugazarte, et le site doit le refléter. Pour les cliniques et cabinets, je mise sur une vraie confiance visuelle (photographie propre, équipe visible, formulaire de rendez-vous qui se remplit en trente secondes), et pour l'hôtellerie-restauration, un mobile impeccable avec réservations intégrées. Rien de superflu «chic» : ce qui convertit, c'est la clarté, pas les effets.",
        "Getxo est à 130 km d'Irun, donc je mène le projet par visioconférence avec quelques visites ponctuelles en Bizkaia quand cela en vaut la peine, et je livre le site tout aussi soigné. Je travaille le SEO local qui compte : «diseñador web Getxo», «página web clínica Getxo» et les recherches par zone (Neguri, Algorta, Las Arenas, Romo) pour que, quand quelqu'un cherche votre service, ce soit vous qui sortiez en premier sur la carte, pas la concurrence. Je vous laisse la fiche Google bien réglée et des avis récents en cours de collecte, le tout pour un paiement unique de 1 300 € + TVA, première année incluse.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-bermeo"],
  },
  {
    slug: "disenador-web-bermeo",
    cityNames: { es: "Bermeo", en: "Bermeo", eu: "Bermeo", fr: "Bermeo" },
    regionNames: { es: "Bizkaia", en: "Bizkaia", eu: "Bizkaia", fr: "Bizkaia" },
    distanceFromIrunKm: 145,
    sectors: {
      es: "pesca, conservas, hostelería costera y turismo",
      en: "fishing, canned goods, coastal hospitality and tourism",
      eu: "arrantza, kontserbak, kostaldeko ostalaritza eta turismoa",
      fr: "pêche, conserverie, hôtellerie-restauration côtière et tourisme",
    },
    localTouches: {
      es: [
        "El turista que baja a San Juan de Gaztelugatxe o recorre la Reserva de la Biosfera de Urdaibai busca dónde comer en el móvil, ahí mismo, en el coche. Si tu restaurante de la dársena o tu hotel del casco viejo no sale en ese primer vistazo de Google, comen en el de al lado. Lo mismo con la conservera que vende fuera de Bizkaia: si el comprador no te encuentra, va a comprarle a otro.",
        "Para conserveras y empresas pesqueras monto webs B2B con catálogo claro, certificaciones de origen a la vista y una sección que enseña cómo y dónde se elabora el producto, que es lo que acaba cerrando ventas. Para los bares y restaurantes del puerto, junto a la lonja, y los hoteles cerca de la Torre de Ercilla, lo que cuenta es otra cosa: carga rápida en el móvil, carta y reservas a un toque. Y la web en castellano, euskera, inglés y francés, porque por aquí pasa de todo.",
        "Estoy en Irun, a 145 km, y eso no cambia nada: trabajo por videollamada y WhatsApp, y reviso cada entrega con la misma lupa que si estuviera en el muelle. En Google peleo por «diseñador web Bermeo», «página web conservera» y las búsquedas del turismo de Urdaibai, para que te encuentre tanto el comprador de fuera como el visitante que llega por la costa. Un pago único de 1.300€ + IVA con el primer año incluido: la web es tuya, sin cuotas cada mes.",
      ],
      en: [
        "Bermeo is a historic Bizkaia fishing port with canned goods, seafood gastronomy and growing tourism arriving via Urdaibai and the coast. I work with canneries, port restaurants, boutique hotels and fishing companies that need a serious digital presence.",
        "For canneries and fishing: B2B sites with simple ecommerce, visible origin certifications and a production process section (it's what adds most value). For hospitality: fast mobile and es/eu/en/fr multilingual. The visitor coming to Bermeo expects authenticity, and the site has to convey it.",
        "Bermeo is 145 km from Irun: I work remotely with video calls and WhatsApp, and delivery is just as careful. For local SEO I cover «web designer Bermeo», «cannery website» and Urdaibai tourism searches, so both the B2B buyer and the visitor arriving along the coast find you first and see a serious business behind it.",
      ],
      eu: [
        "Bermeo Bizkaiko historiako arrantza-portua da, kontserbak, itsas-gastronomia eta Urdaibai eta kostaldetik iristen den turismo gero eta handiagoarekin. Kontserba-fabrikekin, portuko jatetxeekin, hotel boutikekin eta presentzia digital serioa behar duten arrantza-enpresekin lan egiten dut.",
        "Kontserba eta arrantzarako: B2B webguneak ekomertzio sinplearekin, jatorri-ziurtagiri ikusgaiekin eta elaborazio-prozesuaren atalarekin (gehien balio eransten duena). Ostalaritzarako: mugikor azkarra eta es/eu/en/fr eleaniztasuna. Bermeora etortzen den bezeroak benetakotasuna espero du, eta webak hori transmititu behar du.",
        "Bermeo Iruneik 145 km-ra dago: urrunetik lan egiten dut bideo-dei eta WhatsApp bidez, eta entrega berdin zaindua da. Tokiko SEO lanetan «web diseinatzaile Bermeo», «kontserba-fabrika web orria» eta Urdaibaiko turismo bilaketak lantzen ditut, B2B erosleak nahiz kostaldetik iristen den bisitariak zu lehena aurkitu eta atzean negozio serioa ikus dezaten.",
      ],
      fr: [
        "Le touriste qui descend vers San Juan de Gaztelugatxe ou parcourt la Réserve de Biosphère d'Urdaibai cherche où manger sur son mobile, là, dans la voiture. Si votre restaurant du bassin portuaire ou votre hôtel de la vieille ville ne sort pas dans ce premier coup d'œil sur Google, c'est chez le voisin qu'il ira manger. Pareil pour la conserverie qui vend hors de Bizkaia : si l'acheteur ne vous trouve pas, il achète ailleurs.",
        "Pour les conserveries et entreprises de pêche, je construis des sites B2B avec un catalogue clair, des certifications d'origine bien visibles et une section qui montre comment et où le produit est élaboré, ce qui finit par faire la vente. Pour les bars et restaurants du port, à côté de la criée, et les hôtels près de la Torre de Ercilla, ce qui compte est différent : chargement rapide sur mobile, carte et réservations en un clic. Et le site en espagnol, basque, anglais et français, parce qu'ici passe un peu de tout le monde.",
        "Je suis à Irun, à 145 km, et cela ne change rien : je travaille par visioconférence et WhatsApp, et je révise chaque livraison avec la même exigence que si j'étais sur le quai. Sur Google, je me bats pour «diseñador web Bermeo», «página web conservera» et les recherches du tourisme d'Urdaibai, pour que vous trouve aussi bien l'acheteur venu d'ailleurs que le visiteur qui arrive par la côte. Un paiement unique de 1 300 € + TVA avec la première année incluse : le site est à vous, sans mensualités.",
      ],
    },
    nearbyCities: ["disenador-web-bilbao", "disenador-web-getxo"],
  },
  {
    slug: "disenador-web-bera",
    cityNames: { es: "Bera", en: "Bera", eu: "Bera", fr: "Bera" },
    regionNames: { es: "Navarra", en: "Navarre", eu: "Nafarroa", fr: "Navarre" },
    distanceFromIrunKm: 16,
    sectors: {
      es: "comercio, hostelería, industria del valle e turismo de montaña",
      en: "retail, hospitality, valley industry and mountain tourism",
      eu: "merkataritza, ostalaritza, haraneko industria eta mendi-turismoa",
      fr: "commerce, hôtellerie-restauration, industrie de la vallée et tourisme de montagne",
    },
    localTouches: {
      es: [
        "Bera es la primera de las Cinco Villas del Bidasoa subiendo desde la frontera, y eso le da una ventaja que casi nadie aprovecha: por aquí pasa mucho francés que cruza por Dantxarinea o baja de Sara y Ainhoa a comer, comprar o repostar. Cuando esa gente saca el móvil y busca dónde parar, el que sale primero en Google se lleva la visita. Trabajo con el comercio del centro, la hostelería de la plaza y los caseríos y negocios del valle que viven tanto del vecino como del que llega de paso.",
        "Aquí la web tiene que hablar varios idiomas de verdad. Bera es zona euskaldun, el cliente local busca en euskera y en castellano, y el de Francia busca en francés sin pensárselo. Casi ningún negocio de la zona tiene la web preparada para los tres, y ahí se escapan clientes cada semana. Por eso monto las webs en castellano, euskera, inglés y francés, con URLs separadas y hreflang bien hecho, no un plugin que traduce a medias. Y rápida en el móvil, porque la mayoría de esas búsquedas se hacen desde el coche o caminando por la calle.",
        "Estoy en Irun, a 16 km por la N-121-A, así que si el proyecto lo pide nos vemos en persona sin que sea ninguna odisea; el resto lo llevamos por WhatsApp y videollamada. Trabajo el SEO local de «diseñador web Bera», «página web negocio Bera» y las búsquedas de tu sector, y te dejo la ficha de Google Business Profile montada con la zona de servicio del Bidasoa y las Cinco Villas. Todo por un pago único de 1.300€ + IVA, con el primer año incluido y la web en propiedad.",
      ],
      en: [
        "Bera is the first of the Cinco Villas in the Bidasoa valley coming up from the border, and that gives it an edge almost nobody uses: plenty of French visitors cross through Dantxarinea or come down from Sare and Ainhoa to eat, shop or fill up. When they pull out their phone to find somewhere to stop, whoever ranks first on Google gets the visit. I work with town-centre retail, the hospitality around the square and the valley businesses that live off both the neighbour and the passer-by.",
        "Here the website genuinely has to speak several languages. Bera is a Basque-speaking area: the local client searches in Basque and Spanish, and the French visitor searches in French without a second thought. Almost no local business has a site ready for all three, and that's where clients slip away every week. That's why I build sites in Spanish, Basque, English and French, with separate URLs and proper hreflang, not a half-baked translation plugin. And fast on mobile, because most of those searches happen from the car or walking down the street.",
        "I'm based in Irun, 16 km away on the N-121-A, so if the project calls for it we meet in person without it being a trek; the rest we handle over WhatsApp and video call. For local SEO I work «web designer Bera», «Bera business website» and your sector searches, and I set up your Google Business Profile with the Bidasoa and Cinco Villas service area. All for a one-off €1,300 + VAT, with the first year included and the site yours to keep.",
      ],
      eu: [
        "Bera Bidasoako Bortzirietako lehena da mugatik gora, eta horrek ia inork aprobetxatzen ez duen abantaila ematen dio: hemendik frantses asko pasatzen da, Dantxarineatik zeharkatuz edo Sara eta Ainhoatik jaitsiz, jatera, erostera edo erregaia hartzera. Jende horrek mugikorra ateratzen duenean non gelditu bilatzeko, Googlen lehena agertzen denak eramaten du bisita. Erdialdeko merkataritzarekin, plazako ostalaritzarekin eta auzokoaz nahiz bidean datorrenaz bizi diren haraneko baserri eta negozioekin lan egiten dut.",
        "Hemen webak benetan hizkuntza bat baino gehiago hitz egin behar du. Bera euskalduna da: bertako bezeroak euskaraz eta gaztelaniaz bilatzen du, eta Frantziakoak frantsesez bilatzen du pentsatu gabe. Inguruko ia negoziorik ez du weba hiru hizkuntzetarako prest, eta hor astero ihes egiten dute bezeroek. Horregatik gaztelaniaz, euskaraz, ingelesez eta frantsesez egiten ditut webguneak, URL bereiziekin eta hreflang ondo eginekin, ez erdizka itzultzen duen plugin batekin. Eta mugikorrean azkar, bilaketa horietako gehienak kotxetik edo kalean oinez egiten direlako.",
        "Irunen nago, 16 km-ra N-121-A errepidetik, beraz proiektuak hala eskatzen badu aurrez aurre elkartzen gara arazorik gabe; gainerakoa WhatsApp eta bideo-deiz. Tokiko SEO lanetan «web diseinatzaile Bera», «Berako negozio web orria» eta zure sektoreko bilaketak lantzen ditut, eta zure Google Business Profile fitxa Bidasoa eta Bortzirietako zerbitzu-eremuarekin konfiguratzen dut. Dena 1.300€ + BEZ ordainketa bakarrean, lehen urtea barne eta weba zurea.",
      ],
      fr: [
        "Bera est le premier des Cinco Villas de la vallée du Bidasoa en remontant depuis la frontière, et ça lui donne un avantage que presque personne n'exploite : vous êtes nombreux à passer par Dantxarinea ou à descendre de Sare et d'Ainhoa pour manger, faire vos courses ou prendre de l'essence. Quand vous sortez votre mobile pour chercher où vous arrêter, c'est celui qui sort en premier sur Google qui récupère la visite. Je travaille avec le commerce du centre, l'hôtellerie-restauration de la place et les fermes et commerces de la vallée qui vivent aussi bien du voisin que du client de passage comme vous.",
        "Ici, le site doit vraiment parler plusieurs langues. Bera est une zone bascophone : le client local cherche en basque et en espagnol, et vous, en tant que client français, cherchez en français sans même y penser. Presque aucun commerce du coin n'a de site prêt pour les trois langues, et c'est là que des clients s'échappent chaque semaine. C'est pourquoi je construis les sites en espagnol, basque, anglais et français, avec des URL séparées et un hreflang bien fait, pas un plugin qui traduit à moitié. Et rapide sur mobile, parce que la plupart de ces recherches se font depuis la voiture ou en marchant dans la rue, juste après avoir passé la frontière.",
        "Je suis basé à Irun, à 16 km par la N-121-A, donc si le projet le demande on se voit en personne sans que ce soit une expédition ; le reste se gère par WhatsApp et visioconférence. Je travaille le SEO local de «diseñador web Bera», «página web negocio Bera» et les recherches de votre secteur, et je vous laisse la fiche Google Business Profile montée avec la zone de service du Bidasoa et des Cinco Villas. Le tout pour un paiement unique de 1 300 € + TVA, première année incluse et le site vous appartient.",
      ],
    },
    nearbyCities: ["disenador-web-lesaka", "disenador-web-irun", "disenador-web-hondarribia"],
  },
  {
    slug: "disenador-web-lesaka",
    cityNames: { es: "Lesaka", en: "Lesaka", eu: "Lesaka", fr: "Lesaka" },
    regionNames: { es: "Navarra", en: "Navarre", eu: "Nafarroa", fr: "Navarre" },
    distanceFromIrunKm: 20,
    sectors: {
      es: "industria, comercio, hostelería y turismo rural",
      en: "industry, retail, hospitality and rural tourism",
      eu: "industria, merkataritza, ostalaritza eta landa-turismoa",
      fr: "industrie, commerce, hôtellerie-restauration et tourisme rural",
    },
    localTouches: {
      es: [
        "Lesaka es de las Cinco Villas del Bidasoa con más peso industrial: hay empresas en los polígonos de la zona que llevan años fabricando y vendiendo fuera, y aun así, cuando un comprador nuevo busca proveedor en Google, no aparecen. Lo he visto en otros valles iguales: capacidad técnica de sobra, pero una web de hace diez años o directamente ninguna. Y el cliente que necesita un proveedor ya no pregunta en el bar, lo busca desde el móvil. Esa es la fuga real aquí, y no es de máquina, es de presencia.",
        "Pero Lesaka no es solo industria. Está el comercio y la hostelería del casco, con sus casas blasonadas y el río cruzando el pueblo, y el turismo rural que sube a hacer rutas por la zona y por Peñas de Aia. Cada uno necesita una web distinta: a la empresa del polígono le monto una web seria en castellano e inglés, con sus capacidades técnicas claras y un formulario que traiga peticiones reales; al bar, la casa rural o el comercio les monto algo rápido en el móvil, con reservas a un toque y la web en castellano, euskera, inglés y francés, porque por el Bidasoa entra cliente francés todo el año.",
        "Estoy en Irun, a 20 km por la N-121-A, así que la primera reunión la podemos tener en tu local o tu nave en lugar de por videollamada; el día a día lo llevamos por WhatsApp. Trabajo el SEO local de «diseñador web Lesaka», «página web empresa Lesaka» y las búsquedas de tu sector y de las Cinco Villas, y te dejo la ficha de Google afinada para que te encuentre tanto el comprador de fuera como el visitante que recorre el valle. Un pago único de 1.300€ + IVA, con el primer año incluido: la web es tuya, sin cuotas cada mes.",
      ],
      en: [
        "Lesaka is one of the Cinco Villas in the Bidasoa with the strongest industrial weight: there are companies in the local estates that have spent years manufacturing and selling abroad, and yet, when a new buyer looks for a supplier on Google, they don't show up. I've seen it in valleys just like this one: plenty of technical capability, but a ten-year-old website or none at all. And the client who needs a supplier no longer asks at the bar, they search from their phone. That's the real leak here, and it's not about the machinery, it's about presence.",
        "But Lesaka isn't only industry. There's the retail and hospitality of the old town, with its crested houses and the river running through the village, and the rural tourism heading up to hike the area and Peñas de Aia. Each one needs a different site: for the estate company I build a serious es/en site, with clear technical capabilities and a form that brings real enquiries; for the bar, the rural guesthouse or the shop I build something fast on mobile, with one-tap bookings and the site in Spanish, Basque, English and French, because French clients come up the Bidasoa all year round.",
        "I'm based in Irun, 20 km away on the N-121-A, so we can hold the first meeting at your premises or your unit instead of over video call; the day-to-day we handle over WhatsApp. For local SEO I work «web designer Lesaka», «Lesaka company website» and your sector and Cinco Villas searches, and I leave your Google profile tuned so both the outside buyer and the visitor touring the valley find you. A one-off €1,300 + VAT, with the first year included: the site is yours, no monthly fees.",
      ],
      eu: [
        "Lesaka Bidasoako Bortzirietako industria-pisu handiena dutenetako bat da: inguruko poligonoetan urteak daramatzaten enpresak daude fabrikatzen eta kanpora saltzen, eta hala ere, erosle berri batek Googlen hornitzaile bila dabilenean, ez dira agertzen. Antzeko haranetan ikusi dut: gaitasun teknikoa soberan, baina duela hamar urteko weba edo bat ere ez. Eta hornitzaile bat behar duen bezeroak ez du jada tabernan galdetzen, mugikorretik bilatzen du. Hori da hemengo benetako ihesa, eta ez da makinarena, presentziarena baizik.",
        "Baina Lesaka ez da industria soilik. Alde zaharreko merkataritza eta ostalaritza dago, bere etxe blasoidunekin eta herria zeharkatzen duen ibaiarekin, eta inguruan eta Aiako Harrian ibilbideak egitera igotzen den landa-turismoa. Bakoitzak web desberdina behar du: poligonoko enpresari es/en web serioa egiten diot, bere gaitasun teknikoak argi eta benetako eskaerak ekartzen dituen formulario batekin; tabernari, landetxeari edo dendari mugikorrean azkarra den zerbait egiten diet, ukitu bakarreko erreserbekin eta weba gaztelaniaz, euskaraz, ingelesez eta frantsesez, Bidasoatik frantses bezeroa urte osoan sartzen delako.",
        "Irunen nago, 20 km-ra N-121-A errepidetik, beraz lehen bilera zure lokalean edo nabean egin dezakegu bideo-deiz beharrean; egunerokoa WhatsApp bidez. Tokiko SEO lanetan «web diseinatzaile Lesaka», «Lesakako enpresa web orria» eta zure sektoreko eta Bortzirietako bilaketak lantzen ditut, eta zure Google fitxa afinatuta uzten dut kanpoko erosleak nahiz harana ezagutzen duen bisitariak zu aurkitzeko. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne: weba zurea da, hileko kuotarik gabe.",
      ],
      fr: [
        "Lesaka est l'un des Cinco Villas du Bidasoa au poids industriel le plus fort : il y a dans les zones d'activité du coin des entreprises qui fabriquent et vendent à l'étranger depuis des années, et pourtant, quand un nouvel acheteur cherche un fournisseur sur Google, elles n'apparaissent pas. Je l'ai vu dans d'autres vallées similaires : une capacité technique largement suffisante, mais un site vieux de dix ans, ou aucun site du tout. Et le client qui a besoin d'un fournisseur ne demande plus au bar du coin, il cherche depuis son mobile. C'est la vraie fuite ici, et elle ne concerne pas la machine, mais la présence en ligne.",
        "Mais Lesaka, ce n'est pas que de l'industrie. Il y a le commerce et l'hôtellerie-restauration du centre historique, avec ses maisons blasonnées et la rivière qui traverse le village, et le tourisme rural qui monte faire des randonnées dans la zone et vers Peñas de Aia. Chacun a besoin d'un site différent : à l'entreprise de la zone d'activité, je construis un site sérieux en espagnol et anglais, avec ses capacités techniques claires et un formulaire qui apporte de vraies demandes ; au bar, au gîte rural ou au commerce, je construis quelque chose de rapide sur mobile, avec des réservations en un clic et le site en espagnol, basque, anglais et français, parce que la clientèle française remonte le Bidasoa toute l'année.",
        "Je suis basé à Irun, à 20 km par la N-121-A, donc on peut tenir la première réunion dans votre local ou votre atelier plutôt que par visioconférence ; le quotidien se gère par WhatsApp. Je travaille le SEO local de «diseñador web Lesaka», «página web empresa Lesaka» et les recherches de votre secteur et des Cinco Villas, et je vous laisse la fiche Google bien réglée pour que vous trouve aussi bien l'acheteur venu d'ailleurs que le visiteur qui parcourt la vallée. Un paiement unique de 1 300 € + TVA, première année incluse : le site est à vous, sans mensualités.",
      ],
    },
    nearbyCities: ["disenador-web-bera", "disenador-web-irun", "disenador-web-hondarribia"],
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
        : locale === "fr"
        ? `à ${def.distanceFromIrunKm} km`
        : `${def.distanceFromIrunKm} km-ra`
      : "";
  // Full distance label — for standalone uses where it isn't next to "Irun".
  const distStr =
    def.distanceFromIrunKm !== undefined
      ? locale === "es"
        ? `a ${def.distanceFromIrunKm} km de Irun`
        : locale === "en"
        ? `${def.distanceFromIrunKm} km from Irun`
        : locale === "fr"
        ? `à ${def.distanceFromIrunKm} km d'Irun`
        : `Iruntik ${def.distanceFromIrunKm} km-ra`
      : "";

  if (locale === "es") {
    return {
      breadcrumbHome: "Inicio",
      breadcrumbHere: `Diseñador web ${city}`,
      heroTitle: `Diseñador web en ${city}`,
      intro: `Cuando alguien busca tu servicio en ${city}, ¿sales tú o el de al lado? Soy Unax Aller, diseñador web freelance en Irun${
        def.distanceFromIrunKm !== undefined ? ` (${distShort})` : ""
      }. Monto webs para negocios de ${city} y ${region} que cargan rápido en el móvil y salen en Google cuando un cliente busca${
        sectors ? ` ${sectors}` : " lo que ofreces"
      }. La web, la ficha de Google Maps y las reseñas, por un pago único de 1.300€ + IVA con el primer año incluido.`,
      benefitsTitle: `Por qué los negocios de ${city} eligen tu web`,
      benefits: [
        {
          title: "Web hecha para que te llamen",
          desc: `No monto webs bonitas que no traen nada. Monto la que hace que el cliente de ${city} que te busca en el móvil acabe llamándote a ti y no al siguiente resultado.`,
        },
        {
          title: `Sales el primero en Google Maps`,
          desc: `Optimizo tu ficha de Google Business Profile para que aparezcas en búsquedas tipo «tu sector en ${city}». El que sale primero, recibe la llamada.`,
        },
        {
          title: "Hablas siempre conmigo",
          desc: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Estoy en Irun, ${distShort} de ${city}, así que si el proyecto lo pide nos vemos en persona. Y los cambios, por WhatsApp directo conmigo, no con un gestor de cuentas.`
            : `Trato directo conmigo de principio a fin, no con un gestor de cuentas. Cambios por WhatsApp directo y respuesta el mismo día.`,
        },
        {
          title: "Pago único, 30 días de garantía",
          desc: "Un pago de 1.300€ + IVA con el primer año incluido. La web es tuya, sin cuotas mensuales. Si en los primeros 30 días no estás conforme, devolución completa sin preguntas.",
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
          a: "1.300€ + IVA, pago único, con el primer año de mantenimiento incluido (diseño a medida, hosting, dominio, ficha de Google Business Profile optimizada para tu zona, sistema de reseñas, soporte por WhatsApp y cambios). A partir del segundo año, 600€/año. Sin facturas extra.",
        },
        {
          q: `¿Cuándo está lista la web?`,
          a: "En una semana desde que cerramos el pago. Arrancamos enseguida.",
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
          q: "¿La web es mía?",
          a: "Sí. El dominio se registra a tu nombre desde el primer día y la web es tuya tras el pago, no la alquilas. Tu ficha de Google Maps con las reseñas también sigue siendo de tu negocio. El mantenimiento anual (600€/año a partir del segundo año) solo sirve para tenerla online y cuidada, sin que tengas que ocuparte de nada técnico.",
        },
      ],
      ctaTitle: `¿Tienes un negocio en ${city}?`,
      ctaSub: "Auditoría gratuita: te enseño quién te está quitando llamadas en Google y por qué. Sin compromiso.",
      ctaBtn: "Hablar con Unax",
      quoteBtn: "Ver cómo quedaría mi web (gratis)",
    };
  }

  if (locale === "en") {
    return {
      breadcrumbHome: "Home",
      breadcrumbHere: `Web designer ${city}`,
      heroTitle: `Web designer in ${city}`,
      intro: `More calls for your ${city} business. I'm Unax Aller, a freelance web designer based in Irun${
        def.distanceFromIrunKm !== undefined ? ` (${distShort})` : ""
      } working with local businesses in ${city} and ${region}. I set up your website, your Google Maps profile and a reviews system${
        sectors ? ` built for ${sectors}` : ""
      } for a one-off €1,300 + VAT with the first year included.`,
      benefitsTitle: `Why ${city} businesses choose your website`,
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
          title: "One-off payment, 30-day money-back",
          desc: "A one-off €1,300 + VAT with the first year included. The site is yours, with no monthly fees. If in the first 30 days you're not happy, full refund, no questions asked.",
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
          a: "€1,300 + VAT, paid once, with the first year of maintenance included (custom design, hosting, domain, optimized Google Business Profile for your area, reviews system, WhatsApp support and changes). From the second year, €600/year. No extra invoices.",
        },
        {
          q: "How fast is the site ready?",
          a: "In a week from closing the payment. We start straight away.",
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
          q: "Is the website mine?",
          a: "Yes. The domain is registered in your name from day one and the site is yours after payment — you don't rent it. Your Google Maps profile with its reviews stays with your business too. The annual maintenance (€600/year from the second year) just keeps it online and looked after, with nothing technical for you to handle.",
        },
      ],
      ctaTitle: `Have a business in ${city}?`,
      ctaSub: "Free audit: I show you who's taking calls from you on Google and why. No commitment.",
      ctaBtn: "Talk to Unax",
      quoteBtn: "See how my site would look (free)",
    };
  }

  if (locale === "fr") {
    return {
      breadcrumbHome: "Accueil",
      breadcrumbHere: `Créateur de site web ${city}`,
      heroTitle: `Créateur de site web à ${city}`,
      intro: `Quand quelqu'un cherche votre service à ${city}, c'est vous qui sortez ou c'est votre voisin ? Je suis Unax Aller, créateur de site web freelance basé à Irun${
        def.distanceFromIrunKm !== undefined ? ` (${distShort})` : ""
      }. Je conçois des sites pour les commerces de ${city} et de ${region} qui chargent vite sur mobile et qui sortent sur Google quand un client cherche${
        sectors ? ` ${sectors}` : " ce que vous proposez"
      }. Le site, la fiche Google Maps et les avis, pour un paiement unique de 1 300 € + TVA avec la première année incluse.`,
      benefitsTitle: `Pourquoi les commerces de ${city} choisissent votre site`,
      benefits: [
        {
          title: "Un site fait pour qu'on vous appelle",
          desc: `Je ne conçois pas de jolis sites qui ne rapportent rien. Je conçois celui qui fait que le client de ${city} qui vous cherche sur son mobile finit par vous appeler, vous, et pas le résultat suivant.`,
        },
        {
          title: `Vous sortez en premier sur Google Maps`,
          desc: `J'optimise votre fiche Google Business Profile pour que vous apparaissiez dans les résultats type «votre secteur à ${city}». Celui qui sort en premier reçoit l'appel.`,
        },
        {
          title: "Vous me parlez toujours directement",
          desc: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Je suis à Irun, ${distShort} de ${city}, donc si le projet le demande on se voit en personne. Et les changements, par WhatsApp directement avec moi, pas avec un chargé de compte.`
            : `Vous êtes en contact direct avec moi du début à la fin, pas avec un chargé de compte. Changements par WhatsApp direct et réponse le jour même.`,
        },
        {
          title: "Paiement unique, garantie 30 jours",
          desc: "Un paiement de 1 300 € + TVA avec la première année incluse. Le site est à vous, sans mensualités. Si dans les 30 premiers jours vous n'êtes pas satisfait, remboursement intégral sans questions.",
        },
      ],
      faqTitle: `Questions fréquentes pour les commerces de ${city}`,
      faq: [
        {
          q: `Travaillez-vous en personne avec des clients à ${city} ?`,
          a: def.distanceFromIrunKm !== undefined && def.distanceFromIrunKm < 30
            ? `Oui. Je suis à Irun, ${distShort} de ${city}, et je peux me déplacer pour le rendez-vous initial et des révisions ponctuelles. Le quotidien se gère par WhatsApp, sans besoin de passer au bureau.`
            : `Je travaille avec les clients de ${city} en combinant un premier appel vidéo, WhatsApp au quotidien et une visite ponctuelle quand le projet le mérite. Je suis à Irun, ${distStr}.`,
        },
        {
          q: `Combien coûte un site pour un commerce de ${city} ?`,
          a: "1 300 € + TVA, paiement unique, avec la première année de maintenance incluse (design sur mesure, hébergement, domaine, fiche Google Business Profile optimisée pour votre zone, système d'avis, support WhatsApp et modifications). À partir de la deuxième année, 600 €/an. Sans factures supplémentaires.",
        },
        {
          q: `Quand le site est-il prêt ?`,
          a: "Une semaine après la validation du paiement. On démarre tout de suite.",
        },
        {
          q: `Comment cela m'aide-t-il à recevoir plus d'appels à ${city} ?`,
          a: `Quand quelqu'un à ${city} cherche sur Google «votre service + ${city}» depuis son mobile, ce qu'il voit surtout, c'est Google Maps. Si votre fiche sort en premier et a des avis récents, le client vous appelle directement. C'est ce que je mets en place, optimisé pour votre zone et votre secteur.`,
        },
        {
          q: "Puis-je avoir le site en basque ou en espagnol ?",
          a: "Oui, jusqu'à 4 langues (basque, espagnol, anglais et français) sans coût supplémentaire. Dans les zones avec une clientèle française, c'est très utile. J'ai fait toute ma scolarité en France jusqu'à 15 ans, donc le français est travaillé avec le même soin que les autres langues.",
        },
        {
          q: "Le site m'appartient-il ?",
          a: "Oui. Le domaine est enregistré à votre nom dès le premier jour et le site est à vous après paiement, vous ne le louez pas. Votre fiche Google Maps avec les avis reste aussi la propriété de votre entreprise. La maintenance annuelle (600 €/an à partir de la deuxième année) sert uniquement à le garder en ligne et entretenu, sans que vous ayez à vous occuper de rien de technique.",
        },
      ],
      ctaTitle: `Vous avez un commerce à ${city} ?`,
      ctaSub: "Audit gratuit : je vous montre qui vous prend des appels sur Google et pourquoi. Sans engagement.",
      ctaBtn: "Parler à Unax",
      quoteBtn: "Voir à quoi ressemblerait mon site (gratuit)",
    };
  }

  // euskera
  const cityIn = cityDeclEu(city);
  const cityFrom = cityDeclEuFrom(city);
  return {
    breadcrumbHome: "Hasiera",
    breadcrumbHere: `Web diseinatzailea ${city}`,
    heroTitle: `Web diseinatzailea ${cityIn}`,
    intro: `Dei gehiago zure ${city}ko negoziorako. Unax Aller naiz, web diseinatzaile freelancea Irunen${
      def.distanceFromIrunKm !== undefined ? ` (${distShort})` : ""
    }, ${cityIn} eta ${region}ko tokiko negozioekin lanean. Weba, Google Maps fitxa eta iritzien sistema jartzen dizkizut${
      sectors ? ` (${sectors})` : ""
    } 1.300€ + BEZ ordainketa bakarrean, lehen urtea barne.`,
    benefitsTitle: `Zergatik aukeratzen duten ${city}ko negozioek zure weba`,
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
        title: "Ordainketa bakarra, 30 eguneko bermea",
        desc: "1.300€ + BEZ ordainketa bakarra, lehen urtea barne. Weba zurea da, hileko kuotarik gabe. Lehen 30 egunetan pozik ez bazaude, dirua osorik itzultzen dizut.",
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
        a: "1.300€ + BEZ, ordainketa bakarra, lehen urteko mantentze-lana barne (neurrizko diseinua, hostinga, domeinua, zure eremurako optimizatutako Google Business Profile fitxa, iritzien sistema, WhatsApp laguntza eta aldaketak). Bigarren urtetik aurrera, 600€/urteko. Faktura gehigarririk gabe.",
      },
      {
        q: "Noiz dago weba prest?",
        a: "Aste batean ordainketa ixten dugunetik. Berehala hasten gara.",
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
        q: "Weba nirea da?",
        a: "Bai. Domeinua zure izenean erregistratzen da lehen egunetik eta weba zurea da ordainketaren ondoren, ez duzu alokatzen. Zure Google Maps fitxa iritziekin ere zure negoziorena izaten jarraitzen du. Urteko mantentze-lanak (600€/urteko bigarren urtetik) sarean eta zainduta edukitzeko balio du, ezer tekniko egin behar izan gabe.",
      },
    ],
    ctaTitle: `${cityIn} negozioa al duzu?`,
    ctaSub: "Doako auditoria: Googlen nork kentzen dizkizun deiak eta zergatik erakusten dizut. Konpromisorik gabe.",
    ctaBtn: "Unaxekin hitz egin",
    quoteBtn: "Ikusi nire weba nola geratuko litzatekeen (doan)",
  };
}

export function getCityLanding(slug: string): CityLandingDef | undefined {
  return cityLandings.find((c) => c.slug === slug);
}
