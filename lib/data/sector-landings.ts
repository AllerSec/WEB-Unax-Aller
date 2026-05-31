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
        "Una clínica vende confianza antes que nada. El paciente que busca «dentista cerca de mí» o «fisioterapeuta en mi pueblo» decide en segundos, y lo hace mirando reseñas, fotos del centro y si puede pedir cita sin llamar. Tu web tiene que transmitir profesionalidad y limpieza desde la primera pantalla.",
        "Por eso en webs para clínicas pongo el foco en: fotografía real del equipo y las instalaciones, certificaciones y colegiación visibles, un sistema de cita online claro y una ficha de Google Maps optimizada con reseñas recientes. La mayoría de pacientes nuevos llegan por Google, así que el SEO local y la ficha bien configurada valen más que cualquier folleto.",
        "Cumplo además con lo que una clínica necesita: aviso legal y política de privacidad correctos (datos de salud son sensibles), formularios que no piden de más, y carga rápida en móvil porque casi todas las búsquedas de salud se hacen desde el teléfono.",
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
        "En hostelería la búsqueda se decide en el móvil y a la hora de comer: «restaurante cerca de mí», «dónde cenar hoy», «menú del día en mi pueblo». El que sale primero en Google Maps con buenas fotos y reseñas recientes se lleva la mesa. Si tu web tarda en cargar o no se ve bien en el teléfono, el cliente ya está mirando al de al lado.",
        "Por eso monto webs de hostelería rápidas en móvil, con la carta siempre actualizada (sin PDF que no se lee bien), fotos que dan hambre, reservas claras y enlace directo a cómo llegar. La ficha de Google Business Profile la dejo optimizada para que aparezcas cuando alguien busca dónde comer en tu zona.",
        "Y si tienes turismo —francés, sobre todo en la frontera y la costa— preparo la web en varios idiomas. Un menú que el cliente francés entiende a la primera es la diferencia entre que entre o siga buscando.",
      ],
      en: [
        "In hospitality the search is decided on mobile and at mealtime: «restaurant near me», «where to eat tonight», «set menu in my town». Whoever ranks first on Google Maps with good photos and recent reviews gets the table. If your site is slow or looks bad on the phone, the customer is already looking at the place next door.",
        "That's why I build hospitality sites that are fast on mobile, with an always-updated menu (no PDF that won't read well), photos that make you hungry, clear bookings and a direct link to directions. I leave your Google Business Profile optimized so you appear when someone searches where to eat in your area.",
        "And if you get tourists — French especially on the border and the coast — I prepare the site in several languages. A menu the French customer understands at a glance is the difference between them coming in or moving on.",
      ],
      eu: [
        "Ostalaritzan bilaketa mugikorrean eta bazkaltzeko orduan erabakitzen da: «nire inguruko jatetxea», «non afaldu gaur», «eguneko menua nire herrian». Google Maps-en lehena ateratzen denak, argazki onekin eta azken iritziekin, mahaia eramaten du. Zure weba motela bada edo telefonoan gaizki ikusten bada, bezeroa ondokoa begiratzen ari da jada.",
        "Horregatik mugikorrean azkarrak diren ostalaritza-webak egiten ditut, karta beti eguneratua (ondo irakurtzen ez den PDFrik gabe), gosea ematen duten argazkiak, erreserba argiak eta nola iritsi esteka zuzena. Google Business Profile fitxa optimizatuta uzten dut zure inguruan non jan bilatzen duenean ager zaitezen.",
        "Eta turismoa baduzu —frantsesa, batez ere mugan eta kostaldean— weba hainbat hizkuntzatan prestatzen dut. Bezero frantsesak lehen begiratuan ulertzen duen menua, sartu edo bilatzen jarraitzearen arteko aldea da.",
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
        "El comercio local compite con Amazon y las grandes cadenas, pero tiene algo que ellos no: cercanía y trato. Tu web no necesita ser una megatienda online; necesita que cuando alguien busque «tu producto + tu pueblo» te encuentre, sepa lo que vendes, tu horario y cómo llegar, y sienta que detrás hay personas de verdad.",
        "Por eso para comercios monto webs claras y rápidas: catálogo o escaparate visual, horarios y ubicación bien visibles, WhatsApp para preguntar sin compromiso y la ficha de Google Maps optimizada con reseñas. Si tiene sentido vender online, monto una tienda sencilla; si no, la web trabaja para que el cliente venga a la tienda física.",
        "El objetivo es que el vecino que iba a comprar fuera te descubra a un clic, y que el de paso que busca en el móvil acabe entrando por tu puerta en lugar de seguir de largo.",
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
        "En industria y B2B el cliente no compra por impulso: compara, pide presupuesto y valora la trayectoria. El comprador o el responsable de compras que busca un proveedor en Google entra en tu web, y en 10 segundos decide si pareces serio o no. Una web anticuada te deja fuera aunque tu trabajo sea excelente.",
        "Por eso para talleres e industria monto webs B2B que transmiten capacidad técnica: catálogo de productos o servicios con descarga de fichas, sección de procesos y capacidades, certificaciones bien visibles y formularios de cotización que te llegan cualificados. Estética seria pero moderna, lejos del cliché de la web industrial gris.",
        "El SEO lo afino para nichos muy concretos de tu sector (mecanizado, calderería, soldadura, distribución…), que es donde está la búsqueda que convierte. Pocas búsquedas, pero cada una es un cliente potencial real, no curioseo.",
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
        "Un despacho —abogado, asesoría, gestoría, arquitecto— vende criterio y confianza. El cliente que busca «abogado laboralista en mi ciudad» o «asesoría fiscal cerca» quiere ver experiencia, especialidad y trato cercano antes de descolgar el teléfono. Una web sobria y bien hecha te posiciona como el profesional al que merece la pena llamar.",
        "Por eso para despachos monto webs con jerarquía clara de servicios y especialidades, página de equipo con trayectoria visible, casos o áreas de práctica explicadas en lenguaje que el cliente entiende, y un formulario de contacto que filtra y te ahorra llamadas que no van a ningún lado.",
        "El SEO local lo trabajo para que aparezcas en las búsquedas de tu especialidad y tu zona, que es donde está el cliente con intención real de contratar. Mejor diez visitas que necesitan exactamente lo que ofreces que mil que pasaban por ahí.",
      ],
      en: [
        "A firm — lawyer, accountant, consultancy, architect — sells judgment and trust. The client searching «employment lawyer in my city» or «tax advisor nearby» wants to see experience, specialism and a personal approach before picking up the phone. A clean, well-built site positions you as the professional worth calling.",
        "That's why for firms I build sites with a clear hierarchy of services and specialisms, a team page with visible track record, cases or practice areas explained in language the client understands, and a contact form that filters and saves you calls that go nowhere.",
        "I work the local SEO so you appear in searches for your specialism and area, which is where the client with real intent to hire is. Better ten visits that need exactly what you offer than a thousand just passing by.",
      ],
      eu: [
        "Bulego batek —abokatua, aholkularitza, kudeaketa, arkitektoa— irizpidea eta konfiantza saltzen du. «Lan-zuzenbideko abokatua nire hirian» edo «zerga-aholkularitza gertu» bilatzen duen bezeroak esperientzia, espezialitatea eta tratu hurbila ikusi nahi ditu telefonoa hartu aurretik. Web sobrio eta ondo egin batek deitzea merezi duen profesional gisa kokatzen zaitu.",
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
      intro: `Soy Unax Aller, diseñador web freelance en Irun. Monto webs para ${sector}: rápidas en móvil, con la ficha de Google Maps optimizada y un sistema de reseñas que hace que ${noun} salga el primero cuando alguien busca tu servicio. Por 149€/mes, sin pagar nada al firmar.`,
      benefitsTitle: `Por qué ${sector} eligen el plan Todo Incluido`,
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
          title: "0€ al firmar, 30 días de garantía",
          desc: "Plan Todo Incluido por 149€/mes sin permanencia. No pagas nada al firmar. Si en los primeros 30 días no estás conforme, devolución completa sin preguntas.",
        },
      ],
      faqTitle: `Preguntas frecuentes sobre webs para ${sector}`,
      faq: [
        {
          q: `¿Cuánto cuesta una web para ${noun}?`,
          a: "149€/mes sin permanencia, con 0€ al firmar. Incluye diseño a medida, hosting, dominio, ficha de Google Business Profile optimizada, sistema de reseñas, soporte por WhatsApp y cambios mensuales. Sin facturas extra.",
        },
        {
          q: "¿Cuándo está lista la web?",
          a: "Entre 7 y 10 días desde que firmamos. Como no hay desembolso inicial, podemos arrancar enseguida.",
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
          q: "¿Tengo que comprometerme a algún tiempo mínimo?",
          a: "Sin permanencia anual. Solo un mínimo de 3 meses de activación (alta de dominio, SEO local y ficha de Google); a partir del cuarto mes cancelas cuando quieras. El dominio te lo llevas a tu nombre y tu ficha de Google con las reseñas sigue siendo de tu negocio.",
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
      intro: `I'm Unax Aller, a freelance web designer in Irun. I build websites for ${sector}: fast on mobile, with an optimized Google Maps profile and a reviews system that makes ${noun} show up first when someone searches for your service. For €149/month, with no upfront payment.`,
      benefitsTitle: `Why ${sector} choose the All-Inclusive plan`,
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
          title: "€0 to sign, 30-day money-back",
          desc: "All-Inclusive plan at €149/month with no lock-in. €0 to sign. If in the first 30 days you're not happy, full refund, no questions asked.",
        },
      ],
      faqTitle: `Frequently asked questions about websites for ${sector}`,
      faq: [
        {
          q: `How much does a website cost for ${noun}?`,
          a: "€149/month with no lock-in, and €0 to sign. Includes custom design, hosting, domain, optimized Google Business Profile, reviews system, WhatsApp support and monthly changes. No extra invoices.",
        },
        {
          q: "How fast is the site ready?",
          a: "Between 7 and 10 days from signing. Since there's no upfront cost, we can start straight away.",
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
          q: "Do I have to commit to any minimum period?",
          a: "No annual lock-in. Just a 3-month minimum activation (domain setup, local SEO and the Google profile); from the fourth month you cancel whenever you want. You keep the domain in your name and your Google profile with its reviews stays with your business.",
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
    intro: `Unax Aller naiz, web diseinatzaile freelancea Irunen. ${sector}entzako webak egiten ditut: mugikorrean azkarrak, Google Maps fitxa optimizatuarekin eta ${noun} lehena agertzea lortzen duen iritzi-sistemarekin norbaitek zure zerbitzua bilatzean. 149€/hil, sinatzean ezer ordaindu gabe.`,
    benefitsTitle: `Zergatik aukeratzen duten ${sector}ek Dena Barne plana`,
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
        title: "0€ sinatzean, 30 eguneko bermea",
        desc: "Dena Barne plana 149€/hil, iraupenik gabe. Sinatzean ez duzu ezer ordaintzen. Lehen 30 egunetan pozik ez bazaude, itzulketa osoa galderarik gabe.",
      },
    ],
    faqTitle: `${sector}entzako webei buruzko ohiko galderak`,
    faq: [
      {
        q: `Zenbat kostatzen da ${noun}rentzako web bat?`,
        a: "149€/hil iraupenik gabe, 0€ sinatzean. Diseinu pertsonalizatua, hosting-a, domeinua, Google Business Profile optimizatua, iritzi-sistema, WhatsApp laguntza eta hileko aldaketak barne. Faktura gehigarririk gabe.",
      },
      {
        q: "Noiz egongo da prest weba?",
        a: "Sinatu eta 7-10 egunera. Hasierako kosturik ez dagoenez, berehala hasi gaitezke.",
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
        q: "Gutxieneko denbora batera konprometitu behar dut?",
        a: "Urteko iraupenik gabe. 3 hilabeteko gutxieneko aktibazioa besterik ez (domeinua, tokiko SEOa eta Google fitxa); laugarren hilabetetik nahi duzunean baja ematen duzu. Domeinua zure izenean eramaten duzu eta zure Google fitxa iritziekin zure negoziorena izaten jarraitzen du.",
      },
    ],
    ctaTitle: `${noun} al duzu?`,
    ctaSub: "Doako auditoria: erakusten dizut nork kentzen dizkizun bezeroak Googlen eta zergatik. Konpromisorik gabe.",
    ctaBtn: "Unaxekin hitz egin",
    quoteBtn: "Ikusi nire weba nola geratuko litzatekeen (doan)",
  };
}
