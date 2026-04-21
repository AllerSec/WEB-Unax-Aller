// lib/data/blog-posts.ts
export interface BlogPost {
  slug: string;
  publishedAt: string;
  readingTime: number;
  titles: Record<"es" | "en" | "eu", string>;
  descriptions: Record<"es" | "en" | "eu", string>;
  content: Record<"es" | "en" | "eu", string>;
  tags: string[];
  keywords: Record<"es" | "en" | "eu", string[]>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web-en-espana",
    publishedAt: "2026-04-21",
    readingTime: 6,
    titles: {
      es: "¿Cuánto cuesta una página web en España en 2026?",
      en: "How much does a website cost in Spain in 2026?",
      eu: "Zenbat balio du webgune batek Espainian 2026an?",
    },
    descriptions: {
      es: "Guía completa de precios de páginas web en España en 2026: desde webs básicas hasta proyectos a medida. Sin letra pequeña.",
      en: "Complete guide to website prices in Spain in 2026: from basic sites to custom projects. No small print.",
      eu: "Webguneen prezioei buruzko gida osoa Espainian 2026an: oinarrizko webguneetatik neurrizko proiektuetara.",
    },
    content: {
      es: `En 2026, el precio de una página web en España varía enormemente según el tipo de proyecto y quién lo hace. Esta guía te explica exactamente qué esperar.

## Tipos de web y sus precios

**Plantillas o constructores (Wix, Squarespace):** 0 - 500€/año. Rápidas de montar pero con limitaciones de diseño, SEO y rendimiento.

**Agencia con plantilla WordPress:** 1.500 - 5.000€. El resultado depende mucho de la agencia.

**Diseño a medida con freelance:** 800 - 3.000€. La mejor relación calidad-precio para negocios pequeños y medianos.

**Desarrollo a medida enterprise:** 10.000€+. Para proyectos complejos con integraciones, e-commerce avanzado, etc.

## ¿Qué incluye una web a medida?

Cuando contratas a un diseñador web freelance, un precio razonable incluye:
- Diseño UI/UX personalizado
- Desarrollo responsive (móvil, tablet, escritorio)
- SEO técnico básico (velocidad, meta tags, Schema.org)
- Formulario de contacto funcional
- Dominio y hosting el primer año (en algunos casos)

## Mi experiencia real

En mi caso, el plan único cuesta 1.300€ IVA incluido. He visto clientes llegar desde webs que pagaron 2.000€ a una agencia y que tardaban 8 segundos en cargar. El precio no garantiza calidad — la transparencia sí.

## ¿Qué no debería incluirse en el precio?

- Contenido (fotos, textos): tú los aportas o se contratan aparte
- Posicionamiento SEO orgánico a largo plazo: es un trabajo continuo
- Mantenimiento mensual: suele ser un servicio adicional`,
      en: `In 2026, the price of a website in Spain varies enormously depending on the type of project and who builds it. This guide tells you exactly what to expect.

## Types of websites and their prices

**Templates or builders (Wix, Squarespace):** €0 - €500/year. Quick to set up but with design, SEO and performance limitations.

**Agency with WordPress template:** €1,500 - €5,000. The result depends heavily on the agency.

**Custom design with freelancer:** €800 - €3,000. Best value for small and medium businesses.

**Custom enterprise development:** €10,000+. For complex projects with integrations, advanced e-commerce, etc.

## What does a custom website include?

When you hire a freelance web designer, a reasonable price includes:
- Custom UI/UX design
- Responsive development (mobile, tablet, desktop)
- Basic technical SEO (speed, meta tags, Schema.org)
- Working contact form
- Domain and hosting for the first year (in some cases)

## My real experience

In my case, the single plan costs €1,300 VAT included. I've seen clients arrive from websites that cost €2,000 from an agency and took 8 seconds to load. Price doesn't guarantee quality — transparency does.`,
      eu: `2026an, Espainian webgune baten prezioa izugarri aldatzen da proiektu motaren eta nork egiten duen arabera.

## Webgune motak eta haien prezioak

**Txantiloiak edo eraikitzaileak (Wix, Squarespace):** 0 - 500€/urte. Azkar muntatzeko baina diseinu, SEO eta errendimendu mugapenak dituzte.

**Agentzia WordPress txantiloiarekin:** 1.500 - 5.000€. Emaitza asko aldatzen da agentziaren arabera.

**Neurrizko diseinua freelance batekin:** 800 - 3.000€. Enpresa txiki eta ertainentzako prezio-kalitate erlazio onena.

## Nire benetako esperientzia

Nire kasuan, plan bakarrak 1.300€ balio du BEZ barne.`,
    },
    tags: ["precios", "diseño web", "España", "freelance"],
    keywords: {
      es: [
        "cuánto cuesta una página web en España",
        "precio web 2026",
        "diseño web freelance precio",
      ],
      en: [
        "how much does a website cost in Spain",
        "website price 2026",
        "freelance web design price",
      ],
      eu: ["webgune baten prezioa Espainian", "web prezioa 2026"],
    },
  },
  {
    slug: "disenador-web-freelance-vs-agencia",
    publishedAt: "2026-04-28",
    readingTime: 5,
    titles: {
      es: "Freelance vs Agencia: ¿A quién contratar para tu web en 2026?",
      en: "Freelancer vs Agency: Who to hire for your website in 2026?",
      eu: "Freelance vs Agentzia: Nori kontratatu zure weba 2026an?",
    },
    descriptions: {
      es: "Comparativa honesta entre contratar un diseñador web freelance o una agencia. Pros, contras y cuándo elegir cada opción.",
      en: "Honest comparison between hiring a freelance web designer or an agency. Pros, cons and when to choose each.",
      eu: "Diseinu web freelance bat edo agentzia bat kontratatu arteko konparaketa zintzoa.",
    },
    content: {
      es: `Cuando necesitas una web, la pregunta habitual es: ¿freelance o agencia? La respuesta depende de tu proyecto, presupuesto y forma de trabajar.

## Ventajas de contratar un freelance

- **Comunicación directa:** hablas con quien hace el trabajo, sin intermediarios
- **Precio más competitivo:** sin estructura de empresa que repercutir en el presupuesto
- **Flexibilidad:** más adaptable a cambios durante el proyecto
- **Especialización:** un buen freelance suele ser mejor en su especialidad que un generalista de agencia

## Ventajas de una agencia

- **Equipo completo:** diseñador, desarrollador, SEO, redactor bajo el mismo techo
- **Proyectos grandes:** más capacidad para proyectos complejos o urgentes
- **Respaldo:** si una persona enferma, el proyecto no se para

## ¿Cuándo elegir freelance?

Para negocios pequeños y medianos (tienda local, profesional autónomo, startup en fase inicial) el freelance suele ser la mejor opción. El proyecto es más personal, el precio más justo y la atención más cuidada.

## Mi enfoque como freelance en Irun

Trabajo directamente contigo desde el primer mensaje hasta la entrega. Conozco el mercado local del País Vasco y puedo hacer tu web en español, inglés y euskera.`,
      en: `When you need a website, the usual question is: freelancer or agency? The answer depends on your project, budget and working style.

## Advantages of hiring a freelancer

- **Direct communication:** you talk to the person doing the work, no intermediaries
- **More competitive price:** no company structure to pass on to the budget
- **Flexibility:** more adaptable to changes during the project
- **Specialisation:** a good freelancer is usually better in their specialty than an agency generalist

## When to choose a freelancer?

For small and medium businesses (local shop, self-employed professional, early-stage startup) a freelancer is usually the best option.`,
      eu: `Web bat behar duzunean, ohiko galdera da: freelance ala agentzia? Erantzuna zure proiektuaren, aurrekontuaren eta lan egiteko moduaren araberakoa da.

## Freelance bat kontratatzeko abantailak

- **Komunikazio zuzena:** lana egiten duenarekin hitz egiten duzu, bitartekorik gabe
- **Prezio lehikorragoa:** aurrekontuan islatzen den enpresa egitura gabe

## Noiz aukeratu freelance bat?

Enpresa txiki eta ertainentzat (denda lokala, autonomo profesionala, hasierako startup) freelancea da normalean aukera onena.`,
    },
    tags: ["freelance", "agencia", "diseño web", "comparativa"],
    keywords: {
      es: [
        "freelance vs agencia diseño web",
        "diseñador web freelance España",
        "contratar diseñador web",
      ],
      en: ["freelancer vs agency web design", "freelance web designer Spain"],
      eu: ["freelance vs agentzia web diseinua"],
    },
  },
  {
    slug: "disenador-web-irun-gipuzkoa",
    publishedAt: "2026-05-05",
    readingTime: 4,
    titles: {
      es: "Diseñador web en Irun y Gipuzkoa: lo que necesitas saber",
      en: "Web designer in Irun and Gipuzkoa: what you need to know",
      eu: "Web diseinatzailea Irunen eta Gipuzkoan: jakin behar duzuna",
    },
    descriptions: {
      es: "Por qué contratar un diseñador web local en Irun o Gipuzkoa. Ventajas, proceso y qué esperar de un proyecto web en el País Vasco.",
      en: "Why hire a local web designer in Irun or Gipuzkoa. Advantages, process and what to expect from a web project in the Basque Country.",
      eu: "Zergatik kontratatu web diseinatzaile lokala Irunen edo Gipuzkoan. Abantailak, prozesua eta zer espero.",
    },
    content: {
      es: `Si tienes un negocio en Irun, Hondarribia, Donostia o cualquier punto de Gipuzkoa, trabajar con un diseñador web local tiene ventajas concretas.

## ¿Por qué un diseñador web local?

**Conoce el mercado:** Un freelance de Irun sabe cómo se mueve el mercado local, qué buscan los clientes de la zona y cómo posicionar tu negocio en búsquedas locales de Google.

**Comunicación en tu idioma:** En Gipuzkoa, muchos negocios necesitan su web en español y euskera. Trabajo con los dos idiomas de forma nativa.

**Disponibilidad real:** Puedo reunirme contigo en persona si lo necesitas. No soy una agencia en Madrid que gestiona tu proyecto por email.

## SEO local en Gipuzkoa

Para aparecer en Google cuando alguien busca "restaurante en Irun" o "fontanero Donostia", necesitas:
- Google Business Profile verificado
- Palabras clave locales en la web
- Contenido relevante para la zona
- Reseñas de clientes reales

## Mi experiencia en el País Vasco

He trabajado con negocios de Irun, Hondarribia y Donostia. Entiendo las particularidades del mercado vasco: la importancia del euskera, los ciclos de temporada y las búsquedas locales.`,
      en: `If you have a business in Irun, Hondarribia, Donostia or anywhere in Gipuzkoa, working with a local web designer has concrete advantages.

## Why a local web designer?

**Knows the market:** A freelancer from Irun knows how the local market works, what clients in the area are looking for and how to position your business in local Google searches.

**Communication in your language:** In Gipuzkoa, many businesses need their website in Spanish and Basque. I work with both languages natively.

## Local SEO in Gipuzkoa

To appear on Google when someone searches for "restaurant in Irun" or "plumber Donostia", you need:
- Verified Google Business Profile
- Local keywords on the website
- Relevant content for the area
- Real customer reviews`,
      eu: `Irunen, Hondarribian, Donostian edo Gipuzkoako edozein puntutan negozioa baduzu, bertako web diseinatzaile batekin lan egiteak abantaila zehatzak ditu.

## Zergatik web diseinatzaile lokala?

**Merkatu lokala ezagutu:** Irungo freelance batek bertako merkatuaren dinamika ezagutzen du.

**Zure hizkuntzan komunikazioa:** Gipuzkoan, negozio askok web bat behar dute gaztelaniaz eta euskaraz. Bi hizkuntzetan lan egiten dut.`,
    },
    tags: ["diseño web Irun", "diseño web Gipuzkoa", "SEO local", "País Vasco"],
    keywords: {
      es: [
        "diseñador web Irun",
        "diseñador web Gipuzkoa",
        "diseño web País Vasco",
        "web Hondarribia",
      ],
      en: [
        "web designer Irun",
        "web designer Gipuzkoa",
        "web design Basque Country",
      ],
      eu: ["web diseinatzailea Irun", "web diseinatzailea Gipuzkoa"],
    },
  },
  {
    slug: "que-es-core-web-vitals-y-por-que-importa",
    publishedAt: "2026-05-12",
    readingTime: 5,
    titles: {
      es: "Core Web Vitals: qué son y por qué afectan al SEO de tu web",
      en: "Core Web Vitals: what they are and why they affect your website's SEO",
      eu: "Core Web Vitals: zer diren eta zergatik eragiten dioten zure webaren SEOari",
    },
    descriptions: {
      es: "Explicación clara de qué son los Core Web Vitals de Google, cómo medirlos y cómo mejorarlos para subir posiciones en los resultados de búsqueda.",
      en: "Clear explanation of what Google's Core Web Vitals are, how to measure them and how to improve them to climb search result positions.",
      eu: "Googleren Core Web Vitals zer diren, nola neurtu eta nola hobetu argibide argia.",
    },
    content: {
      es: `Google usa Core Web Vitals como factor de posicionamiento desde 2021. En 2026 siguen siendo uno de los indicadores más importantes para rankear bien.

## ¿Qué son los Core Web Vitals?

Son tres métricas que miden la experiencia real del usuario en tu web:

**LCP (Largest Contentful Paint):** ¿Cuánto tarda en aparecer el contenido principal? Objetivo: menos de 2.5 segundos.

**CLS (Cumulative Layout Shift):** ¿Se mueven los elementos mientras carga la página? Objetivo: menos de 0.1.

**INP (Interaction to Next Paint):** ¿Cuánto tarda la web en responder a una interacción del usuario? Objetivo: menos de 200ms.

## ¿Cómo medir tus Core Web Vitals?

- **Google PageSpeed Insights:** gratis, datos reales y de laboratorio
- **Google Search Console:** sección Core Web Vitals con datos de usuarios reales
- **Lighthouse:** en Chrome DevTools, análisis detallado

## ¿Cómo los mejoro?

Los problemas más comunes y sus soluciones:
- **LCP lento:** optimizar imágenes (WebP, lazy loading), eliminar render-blocking scripts
- **CLS alto:** definir dimensiones fijas en imágenes y anuncios
- **INP alto:** reducir JavaScript innecesario, usar web workers

## Mi enfoque

Todas las webs que entrego tienen Lighthouse 95+ y Core Web Vitals en verde. No es opcional — es el estándar mínimo.`,
      en: `Google has used Core Web Vitals as a ranking factor since 2021. In 2026 they remain one of the most important indicators for ranking well.

## What are Core Web Vitals?

**LCP (Largest Contentful Paint):** How long does it take for the main content to appear? Target: under 2.5 seconds.

**CLS (Cumulative Layout Shift):** Do elements move while the page loads? Target: under 0.1.

**INP (Interaction to Next Paint):** How long does the website take to respond to a user interaction? Target: under 200ms.

## How do I improve them?

- **Slow LCP:** optimise images (WebP, lazy loading), remove render-blocking scripts
- **High CLS:** define fixed dimensions on images and ads
- **High INP:** reduce unnecessary JavaScript, use web workers`,
      eu: `Googlek Core Web Vitals rankeatze-faktore gisa erabiltzen ditu 2021az geroztik. 2026an, ondo rankeatzearen adierazle garrantzitsuenetako bat izaten jarraitzen dute.

## Zer dira Core Web Vitals?

**LCP:** Eduki nagusia agertzeko zenbat denbora behar du? Helburua: 2.5 segundu baino gutxiago.

**CLS:** Orrialdearen karga bitartean elementuak mugitzen al dira? Helburua: 0.1 baino gutxiago.

**INP:** Webguneak erabiltzaile interakzioari erantzuteko zenbat denbora behar du? Helburua: 200ms baino gutxiago.`,
    },
    tags: ["Core Web Vitals", "SEO técnico", "rendimiento web", "Google"],
    keywords: {
      es: [
        "Core Web Vitals SEO",
        "mejorar velocidad web",
        "Google PageSpeed",
        "diseñador web rendimiento",
      ],
      en: ["Core Web Vitals SEO", "improve website speed", "Google PageSpeed"],
      eu: ["Core Web Vitals SEO", "webgune abiadura hobetu"],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
