import type { CityLandingContent } from "@/components/landing/CityLanding";

export type LocaleKey = "es" | "en" | "eu";

/**
 * Sector landing pages — same engine as the city landings, but the unique axis
 * is the BUSINESS SECTOR instead of the location. Reuses the CityLanding
 * component (hero → founder → projects → pricing → benefits → social proof →
 * testimonials → local-knowledge prose → FAQ → nearby → CTA), so each sector
 * page carries the same trust weight and conversion structure as the cities.
 *
 * URL pattern: /{locale}/web-para-{slug}  (e.g. /es/web-para-clinicas)
 */
export interface SectorLandingDef {
  slug: string;
  /** Display name of the sector, e.g. "clínicas y centros de salud". */
  sectorNames: Record<LocaleKey, string>;
  /** Short noun for the business owner, e.g. "tu clínica". */
  businessNoun: Record<LocaleKey, string>;
  /** 2-3 paragraphs of unique, sector-specific prose (what their customers
   *  search, what the site must do, the captured opportunity). */
  touches: Record<LocaleKey, string[]>;
  /** Slugs of related sectors for internal linking. */
  nearbySectors?: string[];
}

export const sectorLandings: SectorLandingDef[] = [
  {
    slug: "web-para-clinicas",
    sectorNames: {
      es: "clínicas y centros de salud",
      en: "clinics and health centres",
      eu: "klinikak eta osasun zentroak",
    },
    businessNoun: { es: "tu clínica", en: "your clinic", eu: "zure klinika" },
    touches: {
      es: [
        "Un paciente con una muela rota a las nueve de la noche no llama: coge el móvil y busca «dentista cerca de mí» o «urgencias dental Irun». En tres segundos decide a quién llama, y lo decide mirando reseñas, fotos del centro y si puede pedir cita sin tener que esperar a mañana para que le cojan el teléfono. Si tu clínica de Anaka o Behobia no sale en ese momento, o sale con una web lenta de hace años, el paciente ya está marcando el número del de al lado.",
        "Por eso, en las clínicas, lo que de verdad decide el primer contacto no es «una web bonita»: son fotos reales del equipo y de la consulta (no banco de imágenes), tu colegiación a la vista, la cita online sin fricción y, sobre todo, la ficha de Google bien cuidada, con reseñas recientes y horarios al día. Y aquí hay un detalle que casi nadie de la zona trabaja: el paciente francés cruza la frontera para ir al dentista y busca desde Google Maps en Francia. Configuro tu ficha y tu SEO para que aparezcas tanto en «dentista Irun» como en «dentiste Irun», esa búsqueda con pacientes detrás que la competencia tiene abandonada.",
        "Y lo que una clínica no puede tener flojo, lo dejo cerrado: aviso legal y política de privacidad bien hechos (datos de salud, que son sensibles), formularios que piden lo justo y carga rápida en el móvil, porque casi toda búsqueda de salud sale del teléfono. Todo por un pago único de 1.300€ + IVA, con el primer año incluido. Estoy en Irun, así que si quieres nos vemos en persona en lugar de por videollamada.",
      ],
      en: [
        "A clinic sells trust above all. The patient searching «dentist near me» or «physio in my town» decides in seconds, looking at reviews, photos of the centre and whether they can book without calling. Your site has to convey professionalism and cleanliness from the first screen.",
        "That's why for clinic sites I focus on: real photography of the team and facilities, visible certifications and registration, a clear online booking system and an optimized Google Maps profile with recent reviews. Most new patients arrive via Google, so local SEO and a well-set-up profile are worth more than any brochure.",
        "I also cover what a clinic needs: correct legal notice and privacy policy (health data is sensitive), forms that don't over-ask, and fast mobile loading because nearly all health searches happen on the phone.",
      ],
      eu: [
        "Klinika batek konfiantza saltzen du ezer baino lehen. «Nire inguruko dentista» edo «fisioterapeuta nire herrian» bilatzen duen pazienteak segundotan erabakitzen du, iritziak, zentroaren argazkiak eta deitu gabe hitzordua eskatu dezakeen begiratuz. Zure webak profesionaltasuna eta garbitasuna transmititu behar du lehen pantailatik.",
        "Horregatik kliniketako webetan honako hauetan jartzen dut arreta: taldearen eta instalazioen benetako argazkiak, ziurtagiri ikusgaiak, online hitzordu sistema argia eta azken iritziekin optimizatutako Google Maps fitxa. Paziente berri gehienak Googletik iristen dira, beraz tokiko SEOa eta fitxa ondo konfiguratua edozein liburuxka baino gehiago balio dute.",
        "Klinika batek behar duena ere betetzen dut: lege-oharra eta pribatutasun-politika zuzenak (osasun-datuak sentikorrak dira), gehiegi eskatzen ez duten formularioak, eta mugikorrean karga azkarra, osasun-bilaketa ia guztiak telefonotik egiten direlako.",
      ],
    },
    nearbySectors: ["web-para-despachos", "web-para-comercio"],
  },
  {
    slug: "web-para-hosteleria",
    sectorNames: {
      es: "bares, restaurantes y hostelería",
      en: "bars, restaurants and hospitality",
      eu: "tabernak, jatetxeak eta ostalaritza",
    },
    businessNoun: { es: "tu restaurante", en: "your restaurant", eu: "zure jatetxea" },
    touches: {
      es: [
        "Son las dos menos cuarto, una pareja de Hendaya acaba de aparcar en el centro de Irun y busca en el móvil «restaurant Irun» o «où manger près de moi». En tres segundos eligen entre tu bar y el de la esquina, y deciden por las fotos y las reseñas que salen en Google Maps. Si tu local no aparece ahí (o aparece con una foto borrosa de 2019 y la carta en un PDF que no se abre en el teléfono) acabas de perder esa mesa sin enterarte.",
        "En Irun el casco viejo y el Paseo Colón se llenan de cliente francés que cruza la frontera a comer, y casi ningún bar de la zona tiene la web preparada para pescarlo. Por eso monto webs que cargan rápido en el móvil. La carta siempre al día, en castellano y francés, que aquí pesa. Fotos de los platos hechas como Dios manda, no con flash ni del 2019. La reserva a un toque y el enlace directo para llegar desde Hondarribia, Hendaya o el otro lado del Bidasoa. Y te dejo la ficha de Google a punto para que salgas el primero cuando alguien busca dónde comer en Irun, no en la página tres.",
        "El francés lo trabajo igual de fino que el resto (estudié en Francia hasta los 15), así que el menú que el cliente de Hendaya entiende a la primera no es un traductor automático cutre: es la diferencia entre que entre o siga de largo hacia el siguiente bar. Todo por un pago único de 1.300€ + IVA, con el primer año incluido. Tú a llenar mesas; de que Google te encuentre me ocupo yo.",
      ],
      en: [
        "In hospitality the search is decided on mobile and at mealtime: «restaurant near me», «where to eat tonight», «set menu in my town». Whoever ranks first on Google Maps with good photos and recent reviews gets the table. If your site is slow or looks bad on the phone, the customer is already looking at the place next door.",
        "That's why I build hospitality sites that are fast on mobile, with an always-updated menu (no PDF that won't read well), photos that make you hungry, clear bookings and a direct link to directions. I leave your Google Business Profile optimized so you appear when someone searches where to eat in your area.",
        "And if you get tourists (French especially on the border and the coast) I prepare the site in several languages. A menu the French customer understands at a glance is the difference between them coming in or moving on.",
      ],
      eu: [
        "Ostalaritzan bilaketa mugikorrean eta bazkaltzeko orduan erabakitzen da: «nire inguruko jatetxea», «non afaldu gaur», «eguneko menua nire herrian». Google Maps-en lehena ateratzen denak, argazki onekin eta azken iritziekin, mahaia eramaten du. Zure weba motela bada edo telefonoan gaizki ikusten bada, bezeroa ondokoa begiratzen ari da jada.",
        "Horregatik mugikorrean azkarrak diren ostalaritza-webak egiten ditut, karta beti eguneratua (ondo irakurtzen ez den PDFrik gabe), gosea ematen duten argazkiak, erreserba argiak eta nola iritsi esteka zuzena. Google Business Profile fitxa optimizatuta uzten dut zure inguruan non jan bilatzen duenean ager zaitezen.",
        "Eta turismoa baduzu (frantsesa, batez ere mugan eta kostaldean) weba hainbat hizkuntzatan prestatzen dut. Bezero frantsesak lehen begiratuan ulertzen duen menua, sartu edo bilatzen jarraitzearen arteko aldea da.",
      ],
    },
    nearbySectors: ["web-para-comercio", "web-para-clinicas"],
  },
  {
    slug: "web-para-comercio",
    sectorNames: {
      es: "comercios y tiendas locales",
      en: "local shops and retail",
      eu: "merkataritza eta tokiko dendak",
    },
    businessNoun: { es: "tu comercio", en: "your shop", eu: "zure denda" },
    touches: {
      es: [
        "Un cliente está parado delante de tu escaparate en la calle Mayor, saca el móvil y busca «¿abren los lunes?». Si no te encuentra en diez segundos, da media vuelta y se mete en la tienda de al lado. Esa es la pelea real del comercio de Irun, en la calle Mayor o en plena Avenida de Iparralde: no peleas contra una web gigante, peleas contra el que ya está a treinta metros de tu puerta y se va porque tu horario, tu dirección o lo que vendes no salen claros en Google.",
        "Por eso, para comercios del centro peatonal y de toda la ciudad, monto la web alrededor de eso: escaparate visual de lo que tienes, horario y ubicación que se ven sin buscar, botón de WhatsApp para preguntar «¿te queda mi talla?» sin sentirse comprometido. Y la ficha de Google afinada con reseñas para que aparezcas alto cuando alguien busca cerca de Luis de Uranzu o San Marcial. Si vender online tiene sentido para ti, monto una tienda sencilla; si no, la web trabaja para meter gente por la puerta, que es donde tú ganas dinero.",
        "Y hay una esquina que en Irun casi nadie aprovecha: el cliente francés que cruza la frontera a comprar. Preparo la web para que también te encuentre quien busca en su idioma desde Hendaya, no solo el de aquí. Todo por un pago único de 1.300€ + IVA, con el primer año incluido y la web en propiedad.",
      ],
      en: [
        "Local retail competes with Amazon and the big chains, but it has something they don't: closeness and personal service. Your site doesn't need to be a mega online store; it needs that when someone searches «your product + your town» they find you, know what you sell, your hours and how to get there, and feel there are real people behind it.",
        "That's why for shops I build clear, fast sites: a visual catalogue or shopfront, clearly visible hours and location, WhatsApp to ask with no commitment and an optimized Google Maps profile with reviews. If selling online makes sense, I set up a simple store; if not, the site works to bring the customer to the physical shop.",
        "The goal is for the neighbour who was about to buy elsewhere to discover you one click away, and for the passer-by searching on their phone to end up walking through your door instead of going on.",
      ],
      eu: [
        "Tokiko merkataritzak Amazon eta kate handiekin lehiatzen da, baina haiek ez duten zerbait du: hurbiltasuna eta tratua. Zure webak ez du online mega-denda bat izan behar; norbaitek «zure produktua + zure herria» bilatzean zu aurkitzea behar du, zer saltzen duzun, zure ordutegia eta nola iritsi jakitea, eta atzean benetako jendea dagoela sentitzea.",
        "Horregatik dendetarako web argiak eta azkarrak egiten ditut: katalogo edo erakusleiho bisuala, ordutegi eta kokapen ikusgaiak, WhatsApp konpromisorik gabe galdetzeko eta iritziekin optimizatutako Google Maps fitxa. Online saltzeak zentzua badu, denda sinple bat egiten dut; bestela, webak bezeroa denda fisikora ekartzeko lan egiten du.",
        "Helburua da kanpora erostera zihoan auzokoak klik batera aurkitzea, eta mugikorrean bilatzen duen bidaiariak aurrera jarraitu beharrean zure atetik sartzea.",
      ],
    },
    nearbySectors: ["web-para-hosteleria", "web-para-clinicas"],
  },
  {
    slug: "web-para-industria",
    sectorNames: {
      es: "talleres e industria B2B",
      en: "workshops and B2B industry",
      eu: "tailerrak eta B2B industria",
    },
    businessNoun: { es: "tu empresa", en: "your company", eu: "zure enpresa" },
    touches: {
      es: [
        "Los polígonos de Ventas y Araso, en Irun, están llenos de naves de mecanizado, calderería y distribución donde el trabajo es de primera y la web parece de 2009, si es que la tienen. Y el problema es real: el responsable de compras que busca proveedor en Google no pide tres referencias antes de entrar; abre tu página, ve una web vieja y cierra. Ni te llama. Has perdido un pedido que ni sabías que existía, y el de al lado se lo lleva por tener la web decente.",
        "En Irun esto pesa el doble, porque media clientela cruza el Bidasoa: empresas francesas que buscan «usinage Irun» o «sous-traitance frontière» y necesitan entender qué haces sin traductor. Por eso te monto la web en castellano y francés, con el catálogo de procesos y capacidades claro, las fichas técnicas descargables, las certificaciones donde se ven y un formulario de cotización que te llega con los datos que necesitas para presupuestar, no un «hola, info». Y en Google peleo por las búsquedas que convierten en tu nicho (mecanizado, soldadura, calderería, distribución), las dos o tres al mes que son un pedido de verdad y no un curioso.",
        "Estoy en Irun, al lado de los polígonos, así que si el proyecto lo pide la primera reunión la hacemos en tu nave, viendo las máquinas, en lugar de por videollamada. Un pago único de 1.300€ + IVA, con el primer año incluido: la web es tuya, sin cuotas cada mes.",
      ],
      en: [
        "In industry and B2B the client doesn't buy on impulse: they compare, request quotes and weigh up track record. The buyer or purchasing manager looking for a supplier on Google lands on your site and decides in 10 seconds whether you look serious. An outdated site leaves you out even if your work is excellent.",
        "That's why for workshops and industry I build B2B sites that convey technical capability: a product or service catalogue with datasheet downloads, a processes and capabilities section, clearly visible certifications and quote forms that reach you qualified. Serious but modern aesthetic, far from the grey industrial-site cliché.",
        "I tune the SEO for very specific niches in your sector (machining, boilermaking, welding, distribution…), which is where the converting searches are. Few searches, but each one is a real potential client, not idle browsing.",
      ],
      eu: [
        "Industrian eta B2Ban bezeroak ez du bulkadaz erosten: konparatu, aurrekontua eskatu eta ibilbidea baloratzen du. Googlen hornitzaile bila dabilen erosleak zure webean sartzen da, eta 10 segundotan erabakitzen du serioa zaren ala ez. Web zaharkitu batek kanpoan uzten zaitu zure lana bikaina izan arren.",
        "Horregatik tailer eta industriarako gaitasun teknikoa transmititzen duten B2B webak egiten ditut: produktu edo zerbitzu katalogoa fitxen deskargarekin, prozesu eta gaitasunen atala, ziurtagiri ikusgaiak eta kualifikatuta iristen zaizkizun kotizazio formularioak. Estetika serioa baina modernoa, web industrial grisaren klixetik urrun.",
        "SEOa zure sektoreko nitxo oso zehatzetarako afintzen dut (mekanizatua, galdaragintza, soldadura, banaketa…), bilaketa bihurtzaileak hor daudelako. Bilaketa gutxi, baina bakoitza benetako bezero potentziala da, ez kuriositatea.",
      ],
    },
    nearbySectors: ["web-para-despachos", "web-para-comercio"],
  },
  {
    slug: "web-para-despachos",
    sectorNames: {
      es: "despachos y servicios profesionales",
      en: "firms and professional services",
      eu: "bulegoak eta zerbitzu profesionalak",
    },
    businessNoun: { es: "tu despacho", en: "your firm", eu: "zure bulegoa" },
    touches: {
      es: [
        "Le acaban de notificar una inspección de Hacienda, o le ha llegado una carta de despido, y son las once de la noche. Lo primero que hace no es llamar a nadie: busca «asesoría fiscal urgente Irun» o «abogado laboralista Irun» en el móvil. En esos diez segundos decide a quién confía el problema, mirando quién aparece primero, qué reseñas tiene y si da la sensación de que controla. Si tu despacho no sale ahí, ni existes para ese cliente.",
        "Y en Irun el partido se juega en dos frentes. Por un lado, Donostia a 21 km copa muchas búsquedas y se lleva clientes que tienes al lado de casa, en Anaka, Behobia o el centro. Por otro, está la frontera: cantidad de pymes y particulares franceses cruzan el Bidasoa con dudas fiscales, laborales o mercantiles de los dos lados, y casi ningún despacho de Irun tiene la web preparada para pescar el «cabinet fiscal Irun» o el «avocat frontalier». Esa esquina la trabajan muy pocos, y es trabajo recurrente y bien pagado que está ahí parado.",
        "Para despachos monto webs sobrias y rápidas. Los servicios y especialidades quedan bien jerarquizados, con una página de equipo que pone la trayectoria y la colegiación a la vista, y cada área explicada como se la cuentas al cliente en la primera reunión, sin que tenga que ser jurista para entenderla. El formulario filtra antes de que suene el teléfono: te ahorra las llamadas que no van a ningún lado y te deja solo las que pueden acabar en encargo. El SEO local lo afino para tu especialidad y tu zona. Y en castellano y francés si te interesa el cliente de enfrente, porque ahí está quien va a contratar de verdad. Mejor diez visitas que necesitan exactamente lo que haces que mil que pasaban por ahí. Todo por un pago único de 1.300€ + IVA, con el primer año incluido.",
      ],
      en: [
        "A firm (lawyer, accountant, consultancy, architect) sells judgment and trust. The client searching «employment lawyer in my city» or «tax advisor nearby» wants to see experience, specialism and a personal approach before picking up the phone. A clean, well-built site positions you as the professional worth calling.",
        "That's why for firms I build sites with a clear hierarchy of services and specialisms, a team page with visible track record, cases or practice areas explained in language the client understands, and a contact form that filters and saves you calls that go nowhere.",
        "I work the local SEO so you appear in searches for your specialism and area, which is where the client with real intent to hire is. Better ten visits that need exactly what you offer than a thousand just passing by.",
      ],
      eu: [
        "Bulego batek (abokatua, aholkularitza, kudeaketa, arkitektoa) irizpidea eta konfiantza saltzen du. «Lan-zuzenbideko abokatua nire hirian» edo «zerga-aholkularitza gertu» bilatzen duen bezeroak esperientzia, espezialitatea eta tratu hurbila ikusi nahi ditu telefonoa hartu aurretik. Web sobrio eta ondo egin batek deitzea merezi duen profesional gisa kokatzen zaitu.",
        "Horregatik bulegoetarako zerbitzu eta espezialitateen hierarkia argia duten webak egiten ditut, ibilbide ikusgaiko talde-orria, bezeroak ulertzen duen hizkuntzan azaldutako kasuak edo jarduera-arloak, eta inora ez doazen deiak aurrezten dizkizun harremanetarako formularioa.",
        "Tokiko SEOa lantzen dut zure espezialitatearen eta eremuaren bilaketetan ager zaitezen, kontratatzeko benetako asmoa duen bezeroa hor dagoelako. Hobe eskaintzen duzuna behar duten hamar bisita, hortik pasatzen ziren mila baino.",
      ],
    },
    nearbySectors: ["web-para-clinicas", "web-para-industria"],
  },
];

export function getSectorLanding(slug: string): SectorLandingDef | undefined {
  return sectorLandings.find((s) => s.slug === slug);
}

export function getSectorLandingContent(
  def: SectorLandingDef,
  locale: LocaleKey
): CityLandingContent {
  const sector = def.sectorNames[locale];
  const noun = def.businessNoun[locale];

  if (locale === "es") {
    return {
      breadcrumbHome: "Inicio",
      breadcrumbHere: `Web para ${sector}`,
      heroTitle: `Webs para ${sector} que traen clientes`,
      intro: `Soy Unax Aller, diseñador web freelance en Irun. Monto webs para ${sector}: rápidas en móvil, con la ficha de Google Maps optimizada y un sistema de reseñas que hace que ${noun} salga el primero cuando alguien busca tu servicio. Por un pago único de 1.300€ + IVA, con el primer año incluido.`,
      benefitsTitle: `Por qué ${sector} eligen tu web`,
      benefits: [
        {
          title: "Conozco tu sector",
          desc: `Sé cómo busca tu cliente y qué espera de ${noun}. La web y la ficha de Google las monto para hablar su idioma y convertir.`,
        },
        {
          title: "Sales el primero en Google",
          desc: `Optimizo tu Google Business Profile para que aparezcas en búsquedas tipo "tu servicio cerca de mí". El que sale primero, recibe la llamada.`,
        },
        {
          title: "Soporte directo por WhatsApp",
          desc: "Hablas siempre conmigo, no con un gestor de cuentas. Cambios mensuales por WhatsApp directo, respuesta el mismo día.",
        },
        {
          title: "Pago único, 30 días de garantía",
          desc: "Un pago de 1.300€ + IVA con el primer año incluido. La web es tuya, sin cuotas mensuales. Si en los primeros 30 días no estás conforme, devolución completa sin preguntas.",
        },
      ],
      faqTitle: `Preguntas frecuentes sobre webs para ${sector}`,
      faq: [
        {
          q: `¿Cuánto cuesta una web para ${noun}?`,
          a: "1.300€ + IVA, pago único, con el primer año de mantenimiento incluido (diseño a medida, hosting, dominio, ficha de Google Business Profile optimizada, sistema de reseñas, soporte por WhatsApp y cambios). A partir del segundo año, 600€/año. Sin facturas extra.",
        },
        {
          q: "¿Cuándo está lista la web?",
          a: "En una semana desde que cerramos el pago. Arrancamos enseguida.",
        },
        {
          q: `¿Cómo me ayuda a conseguir más clientes?`,
          a: `Cuando alguien busca tu servicio en Google desde el móvil, ve principalmente Google Maps. Si tu ficha sale primero y tiene reseñas recientes, el cliente te contacta directamente. Eso es lo que monto, optimizado para tu sector y tu zona.`,
        },
        {
          q: "¿Puedo tener la web en varios idiomas?",
          a: "Sí, hasta 4 idiomas (euskera, castellano, inglés y francés) sin coste extra. En zonas con turismo francés es muy útil.",
        },
        {
          q: "¿La web es mía?",
          a: "Sí. El dominio se registra a tu nombre desde el primer día y la web es tuya tras el pago, no la alquilas. Tu ficha de Google con las reseñas sigue siendo de tu negocio. El mantenimiento anual solo sirve para tenerla online y cuidada.",
        },
      ],
      ctaTitle: `¿Tienes ${noun}?`,
      ctaSub: "Auditoría gratuita: te enseño quién te está quitando clientes en Google y por qué. Sin compromiso.",
      ctaBtn: "Hablar con Unax",
      quoteBtn: "Ver cómo quedaría mi web (gratis)",
    };
  }

  if (locale === "en") {
    return {
      breadcrumbHome: "Home",
      breadcrumbHere: `Websites for ${sector}`,
      heroTitle: `Websites for ${sector} that bring in clients`,
      intro: `I'm Unax Aller, a freelance web designer in Irun. I build websites for ${sector}: fast on mobile, with an optimized Google Maps profile and a reviews system that makes ${noun} show up first when someone searches for your service. For a one-off €1,300 + VAT, with the first year included.`,
      benefitsTitle: `Why ${sector} choose your website`,
      benefits: [
        {
          title: "I know your sector",
          desc: `I know how your client searches and what they expect from ${noun}. I build the site and the Google profile to speak their language and convert.`,
        },
        {
          title: "You rank first on Google",
          desc: `I optimize your Google Business Profile so you show up for "your service near me" searches. The first result gets the call.`,
        },
        {
          title: "Direct WhatsApp support",
          desc: "You always talk to me, not an account manager. Monthly changes via direct WhatsApp, same-day reply.",
        },
        {
          title: "One-off payment, 30-day money-back",
          desc: "A one-off €1,300 + VAT with the first year included. The site is yours, with no monthly fees. If in the first 30 days you're not happy, full refund, no questions asked.",
        },
      ],
      faqTitle: `Frequently asked questions about websites for ${sector}`,
      faq: [
        {
          q: `How much does a website cost for ${noun}?`,
          a: "€1,300 + VAT, paid once, with the first year of maintenance included (custom design, hosting, domain, optimized Google Business Profile, reviews system, WhatsApp support and changes). From the second year, €600/year. No extra invoices.",
        },
        {
          q: "How fast is the site ready?",
          a: "In a week from closing the payment. We start straight away.",
        },
        {
          q: "How does this help me get more clients?",
          a: "When someone searches for your service on Google from their phone, what they mostly see is Google Maps. If your profile ranks first and has recent reviews, the client contacts you directly. That's what I build, tuned to your sector and area.",
        },
        {
          q: "Can I have the site in several languages?",
          a: "Yes, up to 4 languages (Basque, Spanish, English, French) at no extra cost. In areas with French tourism it makes a real difference.",
        },
        {
          q: "Is the website mine?",
          a: "Yes. The domain is registered in your name from day one and the site is yours after payment — you don't rent it. Your Google profile with its reviews stays with your business. The annual maintenance just keeps it online and looked after.",
        },
      ],
      ctaTitle: `Run ${noun}?`,
      ctaSub: "Free audit: I show you who's taking clients from you on Google and why. No commitment.",
      ctaBtn: "Talk to Unax",
      quoteBtn: "See how my site would look (free)",
    };
  }

  return {
    breadcrumbHome: "Hasiera",
    breadcrumbHere: `${sector}entzako weba`,
    heroTitle: `${sector}entzako webak, bezeroak ekartzen dituztenak`,
    intro: `Unax Aller naiz, web diseinatzaile freelancea Irunen. ${sector}entzako webak egiten ditut: mugikorrean azkarrak, Google Maps fitxa optimizatuarekin eta ${noun} lehena agertzea lortzen duen iritzi-sistemarekin norbaitek zure zerbitzua bilatzean. 1.300€ + BEZ ordainketa bakarrean, lehen urtea barne.`,
    benefitsTitle: `Zergatik aukeratzen duten ${sector}ek zure weba`,
    benefits: [
      {
        title: "Zure sektorea ezagutzen dut",
        desc: `Badakit zure bezeroak nola bilatzen duen eta zer espero duen ${noun}gandik. Weba eta Google fitxa haien hizkuntzan hitz egiteko eta bihurtzeko egiten ditut.`,
      },
      {
        title: "Googlen lehena ateratzen zara",
        desc: `Zure Google Business Profile optimizatzen dut "nire inguruko zure zerbitzua" bilaketetan ager zaitezen. Lehena ateratzen denak deia jasotzen du.`,
      },
      {
        title: "WhatsApp bidezko laguntza zuzena",
        desc: "Beti nirekin hitz egiten duzu, ez kontu-kudeatzaile batekin. Hileko aldaketak WhatsApp zuzenez, egun bereko erantzuna.",
      },
      {
        title: "Ordainketa bakarra, 30 eguneko bermea",
        desc: "1.300€ + BEZ ordainketa bakarra, lehen urtea barne. Weba zurea da, hileko kuotarik gabe. Lehen 30 egunetan pozik ez bazaude, itzulketa osoa galderarik gabe.",
      },
    ],
    faqTitle: `${sector}entzako webei buruzko ohiko galderak`,
    faq: [
      {
        q: `Zenbat kostatzen da ${noun}rentzako web bat?`,
        a: "1.300€ + BEZ, ordainketa bakarra, lehen urteko mantentze-lana barne (diseinu pertsonalizatua, hosting-a, domeinua, Google Business Profile optimizatua, iritzi-sistema, WhatsApp laguntza eta aldaketak). Bigarren urtetik aurrera, 600€/urteko. Faktura gehigarririk gabe.",
      },
      {
        q: "Noiz egongo da prest weba?",
        a: "Aste batean ordainketa ixten dugunetik. Berehala hasten gara.",
      },
      {
        q: "Nola laguntzen dit bezero gehiago lortzen?",
        a: "Norbaitek zure zerbitzua Googlen mugikorretik bilatzean, Google Maps ikusten du batez ere. Zure fitxa lehena ateratzen bada eta azken iritziak baditu, bezeroak zuzenean kontaktatzen zaitu. Hori da egiten dudana, zure sektore eta eremurako optimizatua.",
      },
      {
        q: "Weba hizkuntza askotan eduki dezaket?",
        a: "Bai, 4 hizkuntzatara arte (euskara, gaztelania, ingelesa eta frantsesa) kosturik gabe. Frantses turismoa duten eremuetan oso erabilgarria da.",
      },
      {
        q: "Weba nirea da?",
        a: "Bai. Domeinua zure izenean erregistratzen da lehen egunetik eta weba zurea da ordainketaren ondoren, ez duzu alokatzen. Zure Google fitxa iritziekin zure negoziorena izaten jarraitzen du. Urteko mantentze-lanak sarean eta zainduta edukitzeko balio du.",
      },
    ],
    ctaTitle: `${noun} al duzu?`,
    ctaSub: "Doako auditoria: erakusten dizut nork kentzen dizkizun bezeroak Googlen eta zergatik. Konpromisorik gabe.",
    ctaBtn: "Unaxekin hitz egin",
    quoteBtn: "Ikusi nire weba nola geratuko litzatekeen (doan)",
  };
}
