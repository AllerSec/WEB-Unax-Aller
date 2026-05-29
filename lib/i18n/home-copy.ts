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

const galleryItems = (locale: HomeLocale): GalleryItem[] => {
  const t = (es: string, en: string, eu: string) =>
    locale === "es" ? es : locale === "en" ? en : eu;
  return [
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
      trustBadge: "0€ al firmar · 30 días de garantía · 149€/mes sin permanencia",
      headlineLine1: "Más llamadas para",
      headlineLine2: "tu negocio local",
      subtitle: "Tu web profesional, tu ficha de Google Maps y un sistema de reseñas — todo incluido por 149€ al mes. No pagas nada al firmar. 30 días para probarlo y devolverlo sin preguntas. Pensado para clínicas, despachos profesionales, industria B2B y comercio especializado en Gipuzkoa, Bizkaia y Navarra.",
      primaryCta: "Pedir auditoría gratis",
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
        "Sistema de reseñas activo para mantenerte arriba",
      ],
      ariaLabel: "Cómo se ve el resultado",
    },
    founder: {
      eyebrow: "Quién está detrás",
      title: "Hola, soy Unax.",
      bodyA: "Trabajo desde Irun para negocios del País Vasco y Navarra: clínicas, despachos profesionales, pequeña industria y comercio con ticket alto. Cuando llamas, me coges directamente al teléfono. Cuando necesitas un cambio, me escribes al WhatsApp. Por eso puedo permitirme firmar contigo",
      bodyStrong: " sin pedirte ni un euro al empezar y dándote 30 días para devolver",
      bodyB: ": porque me juego mi nombre con cada negocio que entra.",
      location: "Irun, Gipuzkoa",
      whatsapp: "WhatsApp directo: 620 90 99 16",
      languages: "ES · EU · EN · FR",
      reviews: "5 estrellas en Google · 14+ negocios atendidos",
      link: "Conóceme mejor",
      imageAlt: "Unax Aller, especialista en webs para negocio local en País Vasco y Navarra",
    },
    counters: { ariaLabel: "Resultados medibles" },
    process: {
      eyebrow: "Cómo funciona",
      title: "De cero a más llamadas en 7–10 días",
      subtitle: "Sin papeleo inicial. Sin reuniones infinitas. Pago la primera cuota y empezamos.",
      steps: [
        { n: "01", title: "Te paso una propuesta", desc: "Antes de firmar nada, te paso una propuesta para que veas cómo quedaría tu web: estructura, diseño y enfoque. Si no te convence, ahí se queda y no me debes un euro." },
        { n: "02", title: "Cerramos sin desembolso", desc: "Sin permanencia: cancelas cuando quieras (solo pido un mínimo de 3 meses de activación). 30 días de garantía. 0€ al firmar. La primera cuota de 149€ no se cobra hasta que tu web esté publicada." },
        { n: "03", title: "Diseño que validas tú", desc: "Tipografía, colores y maquetas reales. Te paso avances por WhatsApp y vamos ajustando hasta que te guste de verdad." },
        { n: "04", title: "Tu web, programada a mano", desc: "Sin plantillas y sin WordPress. Rápida en móvil, Lighthouse 95+, ficha de Google Maps y sistema de reseñas listos para captar clientes." },
        { n: "05", title: "Online en 7–10 días", desc: "Subimos la web, configuramos dominio, Search Console y Analytics. Te enseño el tráfico real las primeras semanas para que veas lo que entra." },
        { n: "06", title: "Cambios por WhatsApp", desc: "Textos, fotos, precios, horarios, un servicio nuevo… me escribes y lo hago yo. Sin formularios, sin tickets, sin facturas extra." },
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
        { q: "¿Por qué pagar 149€/mes y no la web de una vez?", a: "Puedes hacer las dos cosas: tienes el plan Todo Incluido (0€ al empezar, 149€/mes, yo me encargo de todo) y el pago único (1.500€, la web es tuya para siempre). La mayoría elige Todo Incluido porque no suelta 1.500€ de golpe y porque la web, el hosting, Google Maps y los cambios quedan cubiertos sin preocuparse de nada. Es una cuota fija como la del gestor o el seguro." },
        { q: "¿De verdad no pago nada al firmar?", a: "En el plan Todo Incluido, sí: 0€ al firmar. La primera cuota de 149€ se cobra cuando la web está lista, entre 7 y 10 días después. Si en los primeros 30 días no estás conforme, te devuelvo cada euro y apagamos la web. Sin preguntas." },
        { q: "¿Qué incluyen exactamente los \"cambios ilimitados\"?", a: "Cambios de contenido: textos, fotos, precios, horarios, añadir un servicio o actualizar la ficha de Google. Todo lo que un negocio necesita ir actualizando, el mismo día y por WhatsApp. No incluye rediseñar de cero toda la estructura de la web (eso ya es un proyecto nuevo y se presupuesta aparte), pero el día a día de tu negocio está cubierto sin facturas extra." },
        { q: "Si pido la devolución, ¿me quedo con la web gratis?", a: "Los 30 días son una garantía de tranquilidad, no una web gratis: si no estás conforme, te devuelvo cada euro y la web se apaga. Es justo para los dos — tú no arriesgas tu dinero y yo no regalo un trabajo hecho a mano. Si lo que quieres es tenerla en propiedad, esa es justo la opción de pago único (1.500€)." },
        { q: "¿Y si dentro de un tiempo me canso de pagar la cuota?", a: "No estás atrapado en ningún \"alquiler eterno\". El plan Todo Incluido es sin permanencia: el único compromiso es un mínimo de 3 meses de activación (para dar de alta el dominio, montar el SEO y la ficha de Google); a partir de ahí cancelas cuando quieras, solo avisando. Funciona como cualquier servicio: mientras mantienes la cuota, yo me encargo de todo y tu web sigue trabajando; si la dejas, se apaga. Eso sí, el dominio y tu ficha de Google con las reseñas son tuyos desde el primer día y te los llevas. Si lo que buscas es tener el código en propiedad desde el principio, para eso está el plan de pago único." },
        { q: "¿Necesito saber algo de internet?", a: "Nada. Tú me cuentas qué haces, a quién quieres atraer y cómo. Yo me encargo del resto: dominio, hosting, Google Maps, reseñas. Cuando necesites un cambio, me escribes al WhatsApp." },
        { q: "¿Cómo sé que de verdad va a traer clientes?", a: "Antes de firmar te hago una auditoría gratis: te enseño qué competidores tuyos están saliendo primero en tu zona, por qué, y cuántas llamadas estiman que reciben. Con datos, no con palabrería." },
      ],
    },
    finalCta: {
      badge: "Auditoría gratis · Sin firmar nada",
      title: "¿Cuántas llamadas estás perdiendo?",
      sub: "Te enseño en 30 minutos qué competidores tuyos en tu pueblo o ciudad están saliendo primero en Google y por qué. Sin compromiso, sin firmar nada — y si quieres después arrancamos con 0€ al firmar.",
      primaryCta: "Pedir auditoría gratis",
      whatsappCta: "WhatsApp directo",
      whatsappMessage: "Hola Unax, me interesa el plan Todo Incluido de 149€/mes para mi negocio",
      reassurance: "0€ al firmar · 30 días de garantía · Sin permanencia, cancela cuando quieras · Hablas siempre conmigo",
      ariaLabel: "Contacto final",
    },
  },

  en: {
    hero: {
      trustBadge: "€0 to sign · 30-day money-back · €149/month, no lock-in",
      headlineLine1: "More calls for",
      headlineLine2: "your local business",
      subtitle: "Your professional website, your Google Maps listing and a review system — all included for €149 a month. You pay nothing when you sign. 30 days to try it and return it, no questions asked. Built for clinics, professional firms, B2B industry and specialist retailers in Gipuzkoa, Biscay and Navarre.",
      primaryCta: "Request a free audit",
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
        "Active review system to keep you on top",
      ],
      ariaLabel: "What the result looks like",
    },
    founder: {
      eyebrow: "Who's behind this",
      title: "Hi, I'm Unax.",
      bodyA: "I work from Irun for businesses across the Basque Country and Navarre: clinics, professional firms, small industry and high-ticket retail. When you call, you reach me directly. When you need a change, you message me on WhatsApp. That's why I can afford to sign with you",
      bodyStrong: " without asking for a single euro upfront and giving you 30 days to return it",
      bodyB: ": because I put my name on every business that comes in.",
      location: "Irun, Gipuzkoa",
      whatsapp: "Direct WhatsApp: +34 620 90 99 16",
      languages: "ES · EU · EN · FR",
      reviews: "5 stars on Google · 14+ businesses served",
      link: "Get to know me",
      imageAlt: "Unax Aller, specialist in websites for local businesses in the Basque Country and Navarre",
    },
    counters: { ariaLabel: "Measurable results" },
    process: {
      eyebrow: "How it works",
      title: "From zero to more calls in 7–10 days",
      subtitle: "No upfront paperwork. No endless meetings. You pay the first month and we get started.",
      steps: [
        { n: "01", title: "I send you a proposal", desc: "Before you sign anything, I send a proposal so you can see how your site would look: structure, design and angle. If you don't like it, we leave it there and you owe me nothing." },
        { n: "02", title: "We close with no upfront cost", desc: "No lock-in: cancel whenever you want (I only ask for a 3-month minimum activation). 30-day money-back guarantee. €0 to sign. The first €149 fee isn't charged until your site is live." },
        { n: "03", title: "Design you sign off", desc: "Typography, colours and real mock-ups. I send progress on WhatsApp and we adjust until you genuinely like it." },
        { n: "04", title: "Your site, hand-coded", desc: "No templates, no WordPress. Fast on mobile, Lighthouse 95+, Google Maps listing and review system ready to bring in clients." },
        { n: "05", title: "Live in 7–10 days", desc: "We push it live, set up the domain, Search Console and Analytics. I show you the real traffic over the first weeks so you see what's coming in." },
        { n: "06", title: "Changes by WhatsApp", desc: "Copy, photos, prices, opening hours, a new service… you message me and I take care of it. No forms, no tickets, no extra invoices." },
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
        { q: "Why pay €149/month instead of buying the site outright?", a: "You can do either: there's the All-Inclusive plan (€0 to start, €149/month, I handle everything) and the one-off purchase (€1,500, the site is yours forever). Most pick All-Inclusive because they'd rather not drop €1,500 at once, and because the site, hosting, Google Maps and changes are all covered with nothing to worry about. It's a fixed cost like your accountant or insurance." },
        { q: "Do I really pay nothing to sign?", a: "On the All-Inclusive plan, yes: €0 to sign. The first €149 fee is charged when the site is ready, 7–10 days later. If you're not happy in the first 30 days, I refund every euro and switch the site off. No questions." },
        { q: "What exactly do the \"unlimited changes\" cover?", a: "Content changes: text, photos, prices, opening hours, adding a service or updating the Google profile. Everything a business needs to keep current, same day and over WhatsApp. It doesn't cover redesigning the whole site structure from scratch (that's a new project, quoted separately), but your day-to-day is covered with no extra invoices." },
        { q: "If I ask for the refund, do I keep the site for free?", a: "The 30 days are a peace-of-mind guarantee, not a free site: if you're not happy, I refund every euro and the site switches off. It's fair both ways — you don't risk your money and I don't give away hand-built work. If what you want is to own it, that's exactly the one-off option (€1,500)." },
        { q: "What if I get tired of paying the fee down the line?", a: "You're not trapped in any \"forever rental\". The All-Inclusive plan has no lock-in: the only commitment is a 3-month minimum activation (to register the domain, set up the SEO and the Google profile); after that you cancel whenever you want, just by letting me know. It works like any service: while you keep the subscription, I handle everything and your site keeps working; if you stop, it switches off. The domain and your Google listing with the reviews are yours from day one and you take them with you. If what you want is to own the code from the start, that's what the one-off plan is for." },
        { q: "Do I need to know anything about the internet?", a: "Nothing. You tell me what you do, who you want to attract and how. I take care of the rest: domain, hosting, Google Maps, reviews. When you need a change, you message me on WhatsApp." },
        { q: "How do I know it will actually bring clients?", a: "Before you sign I run a free audit: I show you which competitors are ranking first in your area, why, and how many calls they're estimated to receive. With data, not buzzwords." },
      ],
    },
    finalCta: {
      badge: "Free audit · No contract",
      title: "How many calls are you losing?",
      sub: "In 30 minutes I'll show you which competitors in your town or city are ranking first on Google and why. No commitment, no signature — and if you want to start, we kick off with €0 down.",
      primaryCta: "Request a free audit",
      whatsappCta: "Direct WhatsApp",
      whatsappMessage: "Hi Unax, I'm interested in the €149/month All-Inclusive plan for my business",
      reassurance: "€0 to sign · 30-day guarantee · No lock-in, cancel whenever you want · You always talk to me",
      ariaLabel: "Final contact",
    },
  },

  eu: {
    hero: {
      trustBadge: "0€ sinatzean · 30 eguneko bermea · 149€/hilean iraupenik gabe",
      headlineLine1: "Dei gehiago zure",
      headlineLine2: "tokiko negoziorako",
      subtitle: "Zure web profesionala, zure Google Maps fitxa eta iritzi sistema — dena barne 149€-tan hilean. Ez duzu ezer ordaintzen sinatzean. 30 egun probatzeko eta itzultzeko galderarik gabe. Klinikentzat, bulego profesionalentzat, B2B industriarentzat eta merkataritza espezializatuarentzat pentsatua Gipuzkoan, Bizkaian eta Nafarroan.",
      primaryCta: "Eskatu auditoria doan",
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
        "Iritzi sistema aktiboa goian mantentzeko",
      ],
      ariaLabel: "Nolakoa den emaitza",
    },
    founder: {
      eyebrow: "Nor dagoen atzean",
      title: "Kaixo, Unax naiz.",
      bodyA: "Irunetik lan egiten dut Euskal Herriko eta Nafarroako negozioentzat: klinikak, bulego profesionalak, industria txikia eta tiket altuko merkataritza. Deitzen duzunean, zuzenean ni hartzen duzu telefonoan. Aldaketa bat behar duzunean, WhatsApp-etik idazten didazu. Horregatik onar dezaket zurekin sinatzea",
      bodyStrong: " hasieran ezer eskatu gabe eta 30 egun emanez itzultzeko",
      bodyB: ": sartzen den negozio bakoitzarekin nire izena jokoan jartzen dudalako.",
      location: "Irun, Gipuzkoa",
      whatsapp: "WhatsApp zuzena: 620 90 99 16",
      languages: "ES · EU · EN · FR",
      reviews: "5 izar Google-n · 14+ negozio artatuak",
      link: "Ezagutu nazazu hobeto",
      imageAlt: "Unax Aller, Euskal Herriko eta Nafarroako tokiko negozioentzako web espezialista",
    },
    counters: { ariaLabel: "Emaitza neurgarriak" },
    process: {
      eyebrow: "Nola funtzionatzen duen",
      title: "Zerotik dei gehiagora 7–10 egunetan",
      subtitle: "Hasierako paperik gabe. Bilera amaigabeak gabe. Lehen kuota ordaindu eta hasten gara.",
      steps: [
        { n: "01", title: "Proposamena bidaltzen dizut", desc: "Ezer sinatu aurretik, proposamena bidaltzen dizut zure weba nola geratuko litzatekeen ikus dezazun: egitura, diseinua eta ikuspegia. Konbentzitzen ez bazaitu, hor geratzen da eta ez didazu euro bat ere zor." },
        { n: "02", title: "Itxi egiten dugu inolako desenbolsorik gabe", desc: "Iraupenik gabe: nahi duzunean baja eman (3 hilabeteko gutxieneko aktibazioa besterik ez dut eskatzen). 30 eguneko bermea. 0€ sinatzean. 149€-ko lehen kuota ez da kobratzen zure weba argitaratu arte." },
        { n: "03", title: "Zuk baliozkotzen duzun diseinua", desc: "Tipografia, koloreak eta benetako maketak. Aurrerapenak WhatsApp-etik pasatzen dizkizut eta egokitzen joaten gara benetan gustatu arte." },
        { n: "04", title: "Zure weba, eskuz programatua", desc: "Txantiloirik gabe eta WordPressik gabe. Azkarra mugikorrean, Lighthouse 95+, Google Maps fitxa eta iritzi sistema prest bezeroak harrapatzeko." },
        { n: "05", title: "Sarean 7–10 egunetan", desc: "Weba igotzen dugu, domeinua konfiguratzen dugu, Search Console eta Analytics. Lehen asteetako benetako trafikoa erakusten dizut sartzen dena ikus dezazun." },
        { n: "06", title: "Aldaketak WhatsApp-etik", desc: "Testuak, argazkiak, prezioak, ordutegiak, zerbitzu berri bat… idazten didazu eta nik egiten dut. Inprimakirik gabe, txartelik gabe, fakturak aparte gabe." },
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
        { q: "Zergatik 149€/hilean ordaindu eta ez weba behin erosi?", a: "Biak egin ditzakezu: Dena Barne plana duzu (0€ hasieran, 149€/hilean, nik dena egiten dut) eta ordainketa bakarra (1.500€, weba zurea betiko). Gehienek Dena Barne aukeratzen dute, 1.500€ batera ez botatzeagatik eta weba, hostinga, Google Maps eta aldaketak ezeren kezkarik gabe estalita daudelako. Kuota finkoa da, gestorearena edo aseguruarena bezala." },
        { q: "Benetan ez dut ezer ordaintzen sinatzean?", a: "Dena Barne planean, bai: 0€ sinatzean. 149€-ko lehen kuota weba prest dagoenean kobratzen da, 7-10 egun geroago. Lehen 30 egunetan ados ez bazaude, euro bakoitza itzultzen dizut eta weba itzaltzen dugu. Galderarik gabe." },
        { q: "Zer hartzen dute zehazki \"aldaketa mugagabeek\"?", a: "Edukiaren aldaketak: testuak, argazkiak, prezioak, ordutegiak, zerbitzu bat gehitu edo Google fitxa eguneratu. Negozio batek eguneratu behar duen guztia, egun berean eta WhatsApp bidez. Ez du barne hartzen web osoaren egitura zerotik birdiseinatzea (hori proiektu berria da eta aparte aurrekontatzen da), baina zure eguneroko jarduna estalita dago faktura gehigarririk gabe." },
        { q: "Itzulketa eskatzen badut, weba doan geratzen zait?", a: "30 egunak lasaitasun-bermea dira, ez web doakoa: pozik ez bazaude, euro bakoitza itzultzen dizut eta weba itzaltzen da. Bidezkoa da bientzat — zuk ez duzu dirua arriskatzen eta nik ez dut eskuz egindako lana oparitzen. Jabetzan izan nahi baduzu, hori da hain zuzen ordainketa bakarreko aukera (1.500€)." },
        { q: "Eta denborarekin kuota ordaintzeaz nekatzen banaiz?", a: "Ez zaude inolako \"betiko alokairu\" batean harrapatuta. Dena Barne plana iraupenik gabekoa da: konpromiso bakarra 3 hilabeteko gutxieneko aktibazioa da (domeinua altan emateko, SEOa eta Google fitxa muntatzeko); hortik aurrera nahi duzunean baja ematen duzu, abisatuz besterik ez. Edozein zerbitzu bezala funtzionatzen du: kuota mantentzen duzun bitartean, nik dena kudeatzen dut eta zure webak lanean jarraitzen du; uzten baduzu, itzaltzen da. Hori bai, domeinua eta zure iritziak dituen Google fitxa zureak dira lehen egunetik eta zurekin eramaten dituzu. Kodea hasieratik jabetzan izan nahi baduzu, horretarako dago ordainketa bakarreko plana." },
        { q: "Internet-eko ezer jakin behar dut?", a: "Ezer ez. Zuk kontatzen didazu zer egiten duzun, nor erakarri nahi duzun eta nola. Nik gainerakoaz arduratzen naiz: domeinua, hostinga, Google Maps, iritziak. Aldaketa bat behar duzunean, WhatsApp-etik idazten didazu." },
        { q: "Nola dakit benetan bezeroak ekarriko dituela?", a: "Sinatu aurretik auditoria doakoa egiten dizut: erakusten dizut zein lehiakide ari diren zure eremuan lehenengo ateratzen, zergatik, eta zenbat dei jasotzen estimatzen dituzten. Datuekin, ez berbekin." },
      ],
    },
    finalCta: {
      badge: "Auditoria doan · Ezer sinatu gabe",
      title: "Zenbat dei ari zara galtzen?",
      sub: "30 minututan erakutsiko dizut zure herrian edo hirian zein lehiakide ari diren Googlen lehenengo ateratzen eta zergatik. Konpromisorik gabe, ezer sinatu gabe — eta nahi baduzu gero 0€-rekin hasten gara sinatzean.",
      primaryCta: "Eskatu auditoria doan",
      whatsappCta: "WhatsApp zuzena",
      whatsappMessage: "Kaixo Unax, nire negoziorako 149€/hileko Dena Barne plana interesgarria zait",
      reassurance: "0€ sinatzean · 30 eguneko bermea · Iraupenik gabe, nahi duzunean baja eman · Beti nirekin hitz egiten duzu",
      ariaLabel: "Azken kontaktua",
    },
  },
};
