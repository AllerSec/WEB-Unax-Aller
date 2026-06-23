// Centralised copy for the home page in es/en/eu. Kept inline (not in
// next-intl messages files) because each section is long-form prose and
// editing it as TypeScript is faster than juggling nested JSON keys.

export type HomeLocale = "es" | "en" | "eu";

type ServiceCard = { title: string; desc: string; tags: [string, string, string] };
type ProcessStep = { n: string; title: string; desc: string };
type FaqItem = { q: string; a: string };
type GalleryItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  externalUrl: string;
  mobileImage: string;
  mobileVideo?: string;
  accent: string;
  meta: string;
};

export type HomeCopy = {
  hero: {
    trustBadge: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  mockups: {
    eyebrow: string;
    titleA: string;
    titleHighlight: string;
    titleB: string;
    body: string;
    bullets: [string, string, string];
    ariaLabel: string;
  };
  founder: {
    eyebrow: string;
    title: string;
    bodyA: string;
    bodyStrong: string;
    bodyB: string;
    location: string;
    whatsapp: string;
    languages: string;
    reviews: string;
    link: string;
    imageAlt: string;
  };
  counters: { ariaLabel: string };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  services: {
    eyebrow: string;
    title: string;
    cards: ServiceCard[];
    seeAll: string;
  };
  gallery: {
    title: string;
    description: string;
    items: (locale: HomeLocale) => GalleryItem[];
  };
  pricing: { eyebrow: string; ariaLabel: string };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  finalCta: {
    badge: string;
    title: string;
    sub: string;
    primaryCta: string;
    whatsappCta: string;
    whatsappMessage: string;
    reassurance: string;
    ariaLabel: string;
  };
};

export const galleryItems = (locale: HomeLocale): GalleryItem[] => {
  const t = (es: string, en: string, eu: string) =>
    locale === "es" ? es : locale === "en" ? en : eu;
  return [
    {
      id: "boralan",
      title: "Boralan",
      description: t(
        "Poda y tala en altura en Navarra. Web potente con acento naranja, catálogo de servicios y SEO local.",
        "Tree-climbing pruning and felling in Navarre. Bold website with an orange accent, services catalogue and local SEO.",
        "Altuera handiko inausketa eta moztea Nafarroan. Web indartsua laranja koloreko ukituarekin, zerbitzu katalogoa eta tokiko SEO."
      ),
      href: `/${locale}/proyectos/boralan`,
      externalUrl: "https://boralan.eus",
      mobileImage: "/images/projects/mobile-boralan.jpg",
      mobileVideo: "/video/boralan.mp4",
      accent: "#e8602c",
      meta: t("Forestal · Navarra · 2026", "Forestry · Navarre · 2026", "Basoa · Nafarroa · 2026"),
    },
    {
      id: "farmacia-fernandez-bera",
      title: "Farmacia Fernández Bera",
      description: t(
        "Web clara e intuitiva para una farmacia de pueblo. SEO local optimizado para Bera y comarca.",
        "Clean, intuitive website for a village pharmacy. Local SEO tuned for Bera and its district.",
        "Webgune argia eta intuitiboa herri-farmazia batentzat. Tokiko SEO Berarako eta inguruko herrietarako."
      ),
      href: `/${locale}/proyectos/farmacia-fernandez-bera`,
      externalUrl: "https://farmaciafernandezbera.com",
      mobileImage: "/images/projects/mobile-farmacia-fernandez-bera.jpg",
      accent: "#c79a3a",
      meta: t("Farmacia · Bera, Navarra · 2026", "Pharmacy · Bera, Navarre · 2026", "Farmazia · Bera, Nafarroa · 2026"),
    },
    {
      id: "motos-arretxe",
      title: "Motos Arretxe",
      description: t(
        "Concesionario y taller de motos en Irun. Catálogo, cita previa y SEO local.",
        "Motorbike dealer and workshop in Irun. Catalogue, appointment booking and local SEO.",
        "Motorren kontzesionarioa eta tailerra Irunen. Katalogoa, hitzordua eta tokiko SEO."
      ),
      href: `/${locale}/proyectos/motos-arretxe`,
      externalUrl: "https://motosarretxe.com",
      mobileImage: "/images/projects/mobile-motos-arretxe.jpg",
      mobileVideo: "/video/motos-arretxe.mp4",
      accent: "#dc2626",
      meta: t("Motos · Irun · 2026", "Motorbikes · Irun · 2026", "Motorrak · Irun · 2026"),
    },
    {
      id: "anaka-optica",
      title: "Anaka Óptica",
      description: t(
        "Web editorial para una óptica con personalidad. Galería de monturas y cita online.",
        "Editorial-style site for an optician with personality. Frame gallery and online booking.",
        "Web editoriala nortasun handiko optika batentzat. Monturen galeria eta online hitzordua."
      ),
      href: `/${locale}/proyectos/anaka-optica`,
      externalUrl: "https://anakaoptica.com",
      mobileImage: "/images/projects/mobile-anaka-optica.jpg",
      accent: "#f97316",
      meta: t("Óptica · Irun · 2026", "Optician · Irun · 2026", "Optika · Irun · 2026"),
    },
    {
      id: "virtuosolve",
      title: "VirtuoSolve",
      description: t(
        "Agencia de IA con web orientada a captación B2B. Micro-animaciones y SEO técnico.",
        "AI agency with a B2B-focused website. Micro-animations and technical SEO.",
        "AA agentzia, B2B harrapaketara bideratutako webarekin. Mikro-animazioak eta SEO teknikoa."
      ),
      href: `/${locale}/proyectos/virtuosolve`,
      externalUrl: "https://virtuosolve.com",
      mobileImage: "/images/projects/mobile-virtuosolve.jpg",
      mobileVideo: "/video/virtuosolve.mp4",
      accent: "#3b82f6",
      meta: t("IA · Irun · 2026", "AI · Irun · 2026", "AA · Irun · 2026"),
    },
    {
      id: "tecmac",
      title: "Tecmac",
      description: t(
        "Ingeniería y servicios auxiliares de laminación para industrias siderúrgicas. Web técnica con más de 30 años de trayectoria.",
        "Engineering and auxiliary rolling services for steel industries. Technical site backed by 30+ years of track record.",
        "Ingeniaritza eta laminazio-zerbitzu osagarriak siderurgia industrientzat. 30 urtetik gorako ibilbidea duen web teknikoa."
      ),
      href: `/${locale}/proyectos/tecmac`,
      externalUrl: "https://tecmac.es",
      mobileImage: "/images/projects/mobile-tecmac.jpg",
      mobileVideo: "/video/tecmac.mp4",
      accent: "#ef4444",
      meta: t("Industrial · Navarra · 2026", "Industrial · Navarre · 2026", "Industriala · Nafarroa · 2026"),
    },
  ];
};

export const HOME_COPY: Record<HomeLocale, HomeCopy> = {
  es: {
    hero: {
      trustBadge: "1.300€ pago único · 1er año incluido · 30 días de garantía",
      headlineLine1: "Más llamadas para",
      headlineLine2: "tu negocio local",
      subtitle: "Tu web profesional, tu ficha de Google Maps y un sistema de reseñas por un pago único de 1.300€ + IVA, con el primer año de mantenimiento incluido. 30 días para probarla y devolverla sin preguntas. Pensado para clínicas, despachos profesionales, industria B2B y comercio especializado en Gipuzkoa, Bizkaia y Navarra.",
      primaryCta: "Quiero mi web",
      secondaryCta: "Ver cómo funciona",
    },
    mockups: {
      eyebrow: "Cómo se ve el resultado",
      titleA: "Tu negocio, ",
      titleHighlight: "el primero",
      titleB: " cuando alguien busca tu servicio en tu ciudad.",
      body: "Cuando un paciente busca «dentista en tu ciudad» desde el móvil, Google le enseña tres resultados con foto, valoración y botón de llamada directa. El que sale primero recibe la llamada; los otros dos esperan al siguiente intento.",
      bullets: [
        "Ficha de Google Business Profile bien configurada",
        "Web rápida, móvil-first, con botón de llamada visible",
        "Sistema de reseñas: enlace directo, QR para el mostrador y perfil de Google optimizado",
      ],
      ariaLabel: "Cómo se ve el resultado",
    },
    founder: {
      eyebrow: "Quién está detrás",
      title: "Hola, soy Unax.",
      bodyA: "Trabajo desde Irun para negocios del País Vasco y Navarra: clínicas, despachos profesionales, pequeña industria y comercio con ticket alto. Cuando llamas, me coges directamente al teléfono. Cuando necesitas un cambio, me escribes al WhatsApp. Por eso puedo permitirme firmar contigo",
      bodyStrong: " dándote 30 días para devolver cada euro si no te convence",
      bodyB: ": porque me juego mi nombre con cada negocio que entra.",
      location: "Irun, Gipuzkoa",
      whatsapp: "WhatsApp directo: 620 90 99 16",
      languages: "ES · EU · EN · FR",
      reviews: "5,0 en Google · entrega en una semana",
      link: "Conóceme mejor",
      imageAlt: "Unax Aller, especialista en webs para negocio local en País Vasco y Navarra",
    },
    counters: { ariaLabel: "Resultados medibles" },
    process: {
      eyebrow: "Cómo funciona",
      title: "De cero a más llamadas en una semana",
      subtitle: "Sin papeleo inicial. Sin reuniones infinitas. Cierras el pago y empezamos.",
      steps: [
        { n: "01", title: "Te paso una propuesta", desc: "Antes de pagar nada, te paso una propuesta para que veas cómo quedaría tu web: estructura, diseño y enfoque. Si no te convence, ahí se queda y no me debes un euro." },
        { n: "02", title: "Ajustamos la web a tu gusto", desc: "Tipografía, colores y maquetas reales. Te paso avances por WhatsApp y vamos ajustando hasta que te guste de verdad." },
        { n: "03", title: "Publicamos tu web", desc: "Un pago único de 1.300€ + IVA, con el primer año de mantenimiento incluido. 30 días de garantía de devolución. La web es tuya, sin cuotas mensuales." },
        { n: "04", title: "Cambios mes a mes", desc: "Textos, fotos, precios, horarios, un servicio nuevo… me escribes y lo hago yo. Sin formularios, sin tickets, sin facturas extra." },
      ],
    },
    services: {
      eyebrow: "Para quién",
      title: "Pensado para negocios profesionales del País Vasco y Navarra",
      cards: [
        { title: "Salud y bienestar", desc: "Ópticas, farmacias, clínicas dentales, fisio, podología, estética, peluquerías, veterinarias. Negocios donde el cliente compara antes de entrar y la confianza lo es todo.", tags: ["Reseñas", "Cita previa", "Confianza"] },
        { title: "Comercio local", desc: "Tiendas de barrio, moda, joyería, decoración, alimentación, librerías, floristerías, papelerías. Tu escaparate digital cuando la tienda está cerrada.", tags: ["Catálogo", "SEO local", "WhatsApp"] },
        { title: "Automoción y oficios", desc: "Talleres mecánicos, neumáticos, chapa y pintura, fontaneros, electricistas, reformas, cerrajeros, climatización, jardinería. Quien necesita ayuda urgente llama al primero que le inspira confianza.", tags: ["Llamada directa", "Urgencias", "Presupuesto"] },
        { title: "Servicios profesionales", desc: "Asesorías, gestorías, abogados, despachos, consultorías, ingenierías, arquitectos, academias, autoescuelas. Servicios con ticket alto donde el cliente compara online antes de llamar.", tags: ["Autoridad", "Áreas", "Leads"] },
        { title: "Industria y B2B local", desc: "Pequeñas industrias de polígono, talleres de fabricación, proveedores B2B, distribución, almacenes. Capacidad técnica, certificaciones visibles y cotización seria.", tags: ["Catálogo", "Multiidioma", "Cotización"] },
      ],
      seeAll: "Ver todos los servicios",
    },
    gallery: {
      title: "Negocios reales que ya tienen su web",
      description: "Farmacia en Bera, taller de motos en Irun, óptica en Irun, agencia en Donostia. Negocios que llaman, escriben y atienden mejor desde que tienen su sistema online montado.",
      items: galleryItems,
    },
    pricing: { eyebrow: "Precio transparente", ariaLabel: "Precios" },
    faq: {
      eyebrow: "Tus dudas",
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Qué incluye el pago de 1.300€?", a: "Toda la web programada a mano: diseño a medida, ficha de Google Maps optimizada y sistema de reseñas. Y el primer año de mantenimiento entero: dominio, hosting, cambios de contenido y soporte por WhatsApp. Es un pago único, más IVA. La web es tuya y no hay cuota mensual. A partir del segundo año, el mantenimiento es de 600€/año (unos 50€/mes, facturado una vez al año)." },
        { q: "¿Por qué un pago único y no una cuota mensual?", a: "Porque para la mayoría de negocios la web se hace una vez y luego trabaja en segundo plano. No tiene sentido pagar una cuota cada mes por algo que ya está hecho. Pagas una vez, la tienes en propiedad, y solo renuevas el mantenimiento una vez al año. Sin recibos colgando cada mes." },
        { q: "¿Qué incluyen exactamente los \"cambios\" del primer año?", a: "Cambios de contenido: textos, fotos, precios, horarios, añadir un servicio o actualizar la ficha de Google. Todo lo que un negocio necesita ir actualizando, el mismo día y por WhatsApp. No incluye rediseñar de cero toda la estructura de la web (eso ya es un proyecto nuevo y se presupuesta aparte), pero el día a día de tu negocio está cubierto sin facturas extra." },
        { q: "Si pido la devolución, ¿me quedo con la web gratis?", a: "Los 30 días son una garantía de tranquilidad, no una web gratis: si no estás conforme, te devuelvo cada euro y la web se apaga. Es justo para los dos: tú no arriesgas tu dinero y yo no regalo un trabajo hecho a mano." },
        { q: "¿La web es mía de verdad?", a: "Sí. El dominio se registra a tu nombre desde el primer día y la web es tuya tras el pago, no la alquilas. El mantenimiento anual (600€/año a partir del segundo año) es solo para tenerla online y cuidada, pero la propiedad es tuya desde que la entrego, con tu ficha de Google y tus reseñas incluidas." },
        { q: "¿Necesito saber algo de internet?", a: "Nada. Tú me cuentas qué haces, a quién quieres atraer y cómo. Yo me encargo del resto: dominio, hosting, Google Maps, reseñas. Cuando necesites un cambio, me escribes al WhatsApp." },
        { q: "¿Cómo sé que de verdad va a traer clientes?", a: "Antes de firmar te hago una auditoría gratis: te enseño qué competidores tuyos están saliendo primero en tu zona, por qué, y cuántas llamadas estiman que reciben. Con datos, no con palabrería." },
      ],
    },
    finalCta: {
      badge: "1.300€ pago único · 1er año incluido · 30 días de garantía",
      title: "Empieza hoy. Tu web en una semana.",
      sub: "Rellena tus datos, haces el pago y arrancamos. Tu web estará online en una semana. Si en los primeros 30 días no ves el resultado, te devuelvo cada euro sin preguntas.",
      primaryCta: "Quiero mi web",
      whatsappCta: "WhatsApp directo",
      whatsappMessage: "Hola Unax, me interesa la web de 1.300€ con el primer año incluido para mi negocio",
      reassurance: "Pago único 1.300€ + IVA · Primer año incluido · 30 días de garantía · Hablas siempre conmigo",
      ariaLabel: "Contacto final",
    },
  },

  en: {
    hero: {
      trustBadge: "€1,300 one-off · first year included · 30-day money-back",
      headlineLine1: "More calls for",
      headlineLine2: "your local business",
      subtitle: "Your professional website, your Google Maps listing and a review system for a one-off €1,300 + VAT, with the first year of maintenance included. 30 days to try it and return it, no questions asked. Built for clinics, professional firms, B2B industry and specialist retailers in Gipuzkoa, Biscay and Navarre.",
      primaryCta: "I want my website",
      secondaryCta: "See how it works",
    },
    mockups: {
      eyebrow: "What the result looks like",
      titleA: "Your business, ",
      titleHighlight: "the first one",
      titleB: " when someone searches for your service in your city.",
      body: "When a patient searches \"dentist in your city\" from their phone, Google shows three results with a photo, rating and a direct call button. Whoever ranks first gets the call; the other two wait for the next try.",
      bullets: [
        "Properly configured Google Business Profile",
        "Fast, mobile-first website with a visible call button",
        "Reviews system: direct link, printable QR for the counter and optimized Google profile",
      ],
      ariaLabel: "What the result looks like",
    },
    founder: {
      eyebrow: "Who's behind this",
      title: "Hi, I'm Unax.",
      bodyA: "I work from Irun for businesses across the Basque Country and Navarre: clinics, professional firms, small industry and high-ticket retail. When you call, you reach me directly. When you need a change, you message me on WhatsApp. That's why I can afford to sign with you",
      bodyStrong: " giving you 30 days to get every euro back if it's not for you",
      bodyB: ": because I put my name on every business that comes in.",
      location: "Irun, Gipuzkoa",
      whatsapp: "Direct WhatsApp: +34 620 90 99 16",
      languages: "ES · EU · EN · FR",
      reviews: "5.0 on Google · delivered in one week",
      link: "Get to know me",
      imageAlt: "Unax Aller, specialist in websites for local businesses in the Basque Country and Navarre",
    },
    counters: { ariaLabel: "Measurable results" },
    process: {
      eyebrow: "How it works",
      title: "From zero to more calls in a week",
      subtitle: "No upfront paperwork. No endless meetings. You close the payment and we get started.",
      steps: [
        { n: "01", title: "I show you a proposal", desc: "Before you pay anything, I send a proposal so you can see how your site would look: structure, design and angle. If you don't like it, we leave it there and you owe me nothing." },
        { n: "02", title: "We tailor it to your taste", desc: "Typography, colours and real mock-ups. I send progress on WhatsApp and we adjust until you genuinely like it." },
        { n: "03", title: "We go live", desc: "A one-off €1,300 + VAT, with the first year of maintenance included. 30-day money-back guarantee. The site is yours, with no monthly fees." },
        { n: "04", title: "Monthly updates included", desc: "Copy, photos, prices, opening hours, a new service… you message me on WhatsApp and I take care of it. No forms, no tickets, no extra invoices." },
      ],
    },
    services: {
      eyebrow: "Who it's for",
      title: "Built for professional businesses across the Basque Country and Navarre",
      cards: [
        { title: "Health and wellbeing", desc: "Opticians, pharmacies, dental clinics, physio, podiatry, aesthetics, salons, vets. Businesses where the client compares before walking in and trust is everything.", tags: ["Reviews", "Booking", "Trust"] },
        { title: "Local retail", desc: "Neighbourhood shops, fashion, jewellery, decor, food, bookshops, florists, stationers. Your digital shop window when the doors are closed.", tags: ["Catalogue", "Local SEO", "WhatsApp"] },
        { title: "Automotive and trades", desc: "Mechanics, tyres, body and paint, plumbers, electricians, renovations, locksmiths, HVAC, gardening. People who need help urgently call the first one who looks trustworthy.", tags: ["Click-to-call", "Emergencies", "Quotes"] },
        { title: "Professional services", desc: "Advisors, accountants, lawyers, firms, consultancies, engineers, architects, academies, driving schools. High-ticket services where the client compares online before calling.", tags: ["Authority", "Areas", "Leads"] },
        { title: "Local industry and B2B", desc: "Small industrial workshops, manufacturing, B2B suppliers, distribution, warehouses. Technical capacity, visible certifications and serious quoting.", tags: ["Catalogue", "Multilingual", "Quoting"] },
      ],
      seeAll: "See all services",
    },
    gallery: {
      title: "Real businesses that already have their site",
      description: "A pharmacy in Bera, a motorbike workshop in Irun, an optician in Irun, an agency in Donostia. Businesses that call, message and serve better since their online system went live.",
      items: galleryItems,
    },
    pricing: { eyebrow: "Transparent pricing", ariaLabel: "Pricing" },
    faq: {
      eyebrow: "Your questions",
      title: "Frequently asked questions",
      items: [
        { q: "What does the €1,300 cover?", a: "The whole hand-built site: custom design, optimized Google Maps profile and reviews system. Plus the entire first year of maintenance: domain, hosting, content changes and WhatsApp support. It's a one-off payment, plus VAT. The site is yours and there's no monthly fee. From the second year, maintenance is €600/year (around €50/month, billed once a year)." },
        { q: "Why a one-off payment and not a monthly fee?", a: "Because for most businesses the website is built once and then works in the background. There's no point paying a fee every month for something that's already done. You pay once, you own it, and you only renew the maintenance once a year. No invoices hanging over you every month." },
        { q: "What exactly do the first-year \"changes\" cover?", a: "Content changes: text, photos, prices, opening hours, adding a service or updating the Google profile. Everything a business needs to keep current, same day and over WhatsApp. It doesn't cover redesigning the whole site structure from scratch (that's a new project, quoted separately), but your day-to-day is covered with no extra invoices." },
        { q: "If I ask for the refund, do I keep the site for free?", a: "The 30 days are a peace-of-mind guarantee, not a free site: if you're not happy, I refund every euro and the site switches off. It's fair both ways: you don't risk your money and I don't give away hand-built work." },
        { q: "Is the site really mine?", a: "Yes. The domain is registered in your name from day one and the site is yours after payment — you don't rent it. The annual maintenance (€600/year from the second year) just keeps it online and looked after, but ownership is yours from the moment I hand it over, with your Google listing and reviews included." },
        { q: "Do I need to know anything about the internet?", a: "Nothing. You tell me what you do, who you want to attract and how. I take care of the rest: domain, hosting, Google Maps, reviews. When you need a change, you message me on WhatsApp." },
        { q: "How do I know it will actually bring clients?", a: "Before you sign I run a free audit: I show you which competitors are ranking first in your area, why, and how many calls they're estimated to receive. With data, not buzzwords." },
      ],
    },
    finalCta: {
      badge: "€1,300 one-off · first year included · 30-day money-back",
      title: "Start today. Your site in a week.",
      sub: "Fill in your details, make the payment and we get going. Your site will be live in a week. If in the first 30 days you don't see results, I refund every euro, no questions asked.",
      primaryCta: "I want my website",
      whatsappCta: "Direct WhatsApp",
      whatsappMessage: "Hi Unax, I'm interested in the €1,300 website with the first year included for my business",
      reassurance: "One-off €1,300 + VAT · First year included · 30-day guarantee · You always talk to me",
      ariaLabel: "Final contact",
    },
  },

  eu: {
    hero: {
      trustBadge: "1.300€ ordainketa bakarra · 1. urtea barne · 30 eguneko bermea",
      headlineLine1: "Dei gehiago zure",
      headlineLine2: "tokiko negoziorako",
      subtitle: "Zure web profesionala, zure Google Maps fitxa eta iritzi sistema 1.300€ + BEZ ordainketa bakarrean, lehen urteko mantentze-lana barne. 30 egun probatzeko eta itzultzeko galderarik gabe. Klinikentzat, bulego profesionalentzat, B2B industriarentzat eta merkataritza espezializatuarentzat pentsatua Gipuzkoan, Bizkaian eta Nafarroan.",
      primaryCta: "Nire weba nahi dut",
      secondaryCta: "Ikusi nola funtzionatzen duen",
    },
    mockups: {
      eyebrow: "Nolakoa den emaitza",
      titleA: "Zure negozioa, ",
      titleHighlight: "lehenengoa",
      titleB: " norbaitek zure hirian zure zerbitzua bilatzen duenean.",
      body: "Paziente batek mugikorretik «hortz-klinika zure hirian» bilatzen duenean, Googlek hiru emaitza erakusten dizkio argazkiarekin, balorazioarekin eta zuzeneko dei-botoiarekin. Lehenengoak deia jasotzen du; beste biek hurrengo saiakeraren zain geratzen dira.",
      bullets: [
        "Ondo konfiguratutako Google Business Profile fitxa",
        "Web azkarra, mobile-first, dei-botoi ikusgaiarekin",
        "Iritzi sistema: zuzeneko esteka, mostradorerakotxo QR inprimagarria eta Google profil optimizatua",
      ],
      ariaLabel: "Nolakoa den emaitza",
    },
    founder: {
      eyebrow: "Nor dagoen atzean",
      title: "Kaixo, Unax naiz.",
      bodyA: "Irunetik lan egiten dut Euskal Herriko eta Nafarroako negozioentzat: klinikak, bulego profesionalak, industria txikia eta tiket altuko merkataritza. Deitzen duzunean, zuzenean ni hartzen duzu telefonoan. Aldaketa bat behar duzunean, WhatsApp-etik idazten didazu. Horregatik onar dezaket zurekin sinatzea",
      bodyStrong: " 30 egun emanez euro bakoitza itzultzeko gustatzen ez bazaizu",
      bodyB: ": sartzen den negozio bakoitzarekin nire izena jokoan jartzen dudalako.",
      location: "Irun, Gipuzkoa",
      whatsapp: "WhatsApp zuzena: 620 90 99 16",
      languages: "ES · EU · EN · FR",
      reviews: "5,0 Google-n · astebetean entregatua",
      link: "Ezagutu nazazu hobeto",
      imageAlt: "Unax Aller, Euskal Herriko eta Nafarroako tokiko negozioentzako web espezialista",
    },
    counters: { ariaLabel: "Emaitza neurgarriak" },
    process: {
      eyebrow: "Nola funtzionatzen duen",
      title: "Zerotik dei gehiagora aste batean",
      subtitle: "Hasierako paperik gabe. Bilera amaigabeak gabe. Ordainketa ixten duzu eta hasten gara.",
      steps: [
        { n: "01", title: "Proposamen bat erakusten dizut", desc: "Ezer ordaindu aurretik, proposamena bidaltzen dizut zure weba nola geratuko litzatekeen ikus dezazun: egitura, diseinua eta ikuspegia. Konbentzitzen ez bazaitu, hor geratzen da eta ez didazu euro bat ere zor." },
        { n: "02", title: "Zure gustura egokitzen dugu", desc: "Tipografia, koloreak eta benetako maketak. Aurrerapenak WhatsApp-etik pasatzen dizkizut eta egokitzen joaten gara benetan gustatu arte." },
        { n: "03", title: "Zure weba argitaratzen dugu", desc: "1.300€ + BEZ ordainketa bakarra, lehen urteko mantentze-lana barne. 30 eguneko itzulketa-bermea. Weba zurea da, hileko kuotarik gabe." },
        { n: "04", title: "Hilero-hilero aldaketak", desc: "Testuak, argazkiak, prezioak, ordutegiak, zerbitzu berri bat… WhatsApp bidez idazten didazu eta nik egiten dut. Inprimakirik gabe, txartelik gabe, fakturak aparte gabe." },
      ],
    },
    services: {
      eyebrow: "Norentzat",
      title: "Euskal Herriko eta Nafarroako negozio profesionalentzat pentsatua",
      cards: [
        { title: "Osasuna eta ongizatea", desc: "Optikak, farmaziak, hortz-klinikak, fisio, podologia, estetika, ile-apaindegiak, albaitariak. Bezeroak sartu aurretik konparatzen duen eta konfiantza dena den negozioak.", tags: ["Iritziak", "Hitzordua", "Konfiantza"] },
        { title: "Tokiko merkataritza", desc: "Auzoko dendak, moda, bitxidenda, dekorazioa, elikadura, liburu-dendak, lore-dendak, paper-dendak. Zure erakusleiho digitala denda itxita dagoenean.", tags: ["Katalogoa", "Tokiko SEO", "WhatsApp"] },
        { title: "Automozioa eta lanbideak", desc: "Mekanika tailerrak, pneumatikoak, txapa eta pintura, iturginak, elektrikariak, erreformak, sarrailagileak, klimatizazioa, lorezaintza. Laguntza premiazkoa behar duenak konfiantza ematen dion lehenari deitzen dio.", tags: ["Zuzeneko deia", "Larrialdiak", "Aurrekontua"] },
        { title: "Zerbitzu profesionalak", desc: "Aholkularitzak, gestoriak, abokatuak, bulegoak, kontsultoreak, ingeniaritzak, arkitektoak, akademiak, autoeskolak. Tiket altuko zerbitzuak, non bezeroak online konparatzen duen deitu aurretik.", tags: ["Autoritatea", "Eremuak", "Leadak"] },
        { title: "Industria eta tokiko B2B", desc: "Poligonoko industria txikiak, fabrikazio tailerrak, B2B hornitzaileak, banaketa, biltegiak. Gaitasun teknikoa, ziurtagiri ikusgaiak eta aurrekontu seriotsua.", tags: ["Katalogoa", "Eleaniztuna", "Aurrekontua"] },
      ],
      seeAll: "Ikusi zerbitzu guztiak",
    },
    gallery: {
      title: "Beren weba duten benetako negozioak",
      description: "Berako farmazia, Irungo motor-tailerra, Irungo optika, Donostiako agentzia. Sistema online muntatuta dutenetik hobeto deitu, idatzi eta artatzen duten negozioak.",
      items: galleryItems,
    },
    pricing: { eyebrow: "Prezio gardena", ariaLabel: "Prezioak" },
    faq: {
      eyebrow: "Zure zalantzak",
      title: "Ohiko galderak",
      items: [
        { q: "Zer barne hartzen du 1.300€-ko ordainketak?", a: "Eskuz egindako web osoa: neurrira egindako diseinua, Google Maps fitxa optimizatua eta iritzi sistema. Eta lehen urteko mantentze-lan osoa: domeinua, hostinga, edukiaren aldaketak eta WhatsApp laguntza. Ordainketa bakarra da, gehi BEZ. Weba zurea da eta ez dago hileko kuotarik. Bigarren urtetik aurrera, mantentze-lana 600€/urteko da (50€/hilean inguru, urtean behin fakturatua)." },
        { q: "Zergatik ordainketa bakarra eta ez hileko kuota?", a: "Negozio gehienentzat weba behin egiten da eta gero atzeko planoan lan egiten du. Ez du zentzurik dagoeneko eginda dagoen zerbaitengatik hilero kuota bat ordaintzeak. Behin ordaintzen duzu, zurea da, eta mantentze-lana urtean behin bakarrik berritzen duzu. Hilero zintzilik dauden ordainagiririk gabe." },
        { q: "Zer hartzen dute zehazki lehen urteko \"aldaketek\"?", a: "Edukiaren aldaketak: testuak, argazkiak, prezioak, ordutegiak, zerbitzu bat gehitu edo Google fitxa eguneratu. Negozio batek eguneratu behar duen guztia, egun berean eta WhatsApp bidez. Ez du barne hartzen web osoaren egitura zerotik birdiseinatzea (hori proiektu berria da eta aparte aurrekontatzen da), baina zure eguneroko jarduna estalita dago faktura gehigarririk gabe." },
        { q: "Itzulketa eskatzen badut, weba doan geratzen zait?", a: "30 egunak lasaitasun-bermea dira, ez web doakoa: pozik ez bazaude, euro bakoitza itzultzen dizut eta weba itzaltzen da. Bidezkoa da bientzat: zuk ez duzu dirua arriskatzen eta nik ez dut eskuz egindako lana oparitzen." },
        { q: "Weba benetan nirea da?", a: "Bai. Domeinua zure izenean erregistratzen da lehen egunetik eta weba zurea da ordainketaren ondoren, ez duzu alokatzen. Urteko mantentze-lanak (600€/urteko bigarren urtetik) sarean eta zainduta edukitzeko balio du, baina jabetza zurea da entregatzen dudanetik, zure Google fitxa eta iritziekin barne." },
        { q: "Internet-eko ezer jakin behar dut?", a: "Ezer ez. Zuk kontatzen didazu zer egiten duzun, nor erakarri nahi duzun eta nola. Nik gainerakoaz arduratzen naiz: domeinua, hostinga, Google Maps, iritziak. Aldaketa bat behar duzunean, WhatsApp-etik idazten didazu." },
        { q: "Nola dakit benetan bezeroak ekarriko dituela?", a: "Sinatu aurretik auditoria doakoa egiten dizut: erakusten dizut zein lehiakide ari diren zure eremuan lehenengo ateratzen, zergatik, eta zenbat dei jasotzen estimatzen dituzten. Datuekin, ez berbekin." },
      ],
    },
    finalCta: {
      badge: "1.300€ ordainketa bakarra · 1. urtea barne · 30 eguneko bermea",
      title: "Hasi gaur. Zure weba aste batean.",
      sub: "Bete datuak, egin ordainketa eta hasten gara. Zure weba aste batean online egongo da. Lehen 30 egunetan emaitzarik ikusten ez baduzu, euro bakoitza itzultzen dizut galderarik gabe.",
      primaryCta: "Nire weba nahi dut",
      whatsappCta: "WhatsApp zuzena",
      whatsappMessage: "Kaixo Unax, nire negoziorako 1.300€-ko weba interesatzen zait, lehen urtea barne",
      reassurance: "1.300€ + BEZ ordainketa bakarra · 1. urtea barne · 30 eguneko bermea · Beti nirekin hitz egiten duzu",
      ariaLabel: "Azken kontaktua",
    },
  },
};
