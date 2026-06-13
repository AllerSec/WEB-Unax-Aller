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
    // Home turf — no distanceFromIrunKm so the auto-generated copy never says
    // "from Irun (0 km away)". This is the strongest local page on the site.
    slug: "disenador-web-irun",
    cityNames: { es: "Irun", en: "Irun", eu: "Irun" },
    regionNames: { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" },
    sectors: {
      es: "comercio, hostelería, clínicas, despachos profesionales e industria fronteriza",
      en: "retail, hospitality, clinics, professional practices and cross-border industry",
      eu: "merkataritza, ostalaritza, klinikak, bulego profesionalak eta mugako industria",
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
    },
    nearbyCities: ["disenador-web-hondarribia", "disenador-web-errenteria", "disenador-web-donostia"],
  },
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
    },
    nearbyCities: ["disenador-web-irun", "disenador-web-donostia", "disenador-web-errenteria"],
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
    },
    nearbyCities: ["disenador-web-irun", "disenador-web-hondarribia", "disenador-web-donostia"],
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
      heroTitle: `Cuando alguien busca tu servicio en ${city}, ¿sales tú o el de al lado?`,
      intro: `Soy Unax Aller, diseñador web freelance en Irun${
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
      heroTitle: `More calls for your ${city} business`,
      intro: `I'm Unax Aller, based in Irun${
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
