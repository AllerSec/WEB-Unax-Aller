# SEO Top 1 España — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Posicionar unaxaller.com top 1 en búsquedas de "diseñador web" escalando de Irun → País Vasco → España mediante mejoras técnicas SEO, nuevas secciones de contenido (blog, casos de estudio, landings de ciudad) y optimización E-E-A-T.

**Architecture:** Todas las nuevas rutas siguen el patrón existente `app/[lang]/...` con `generateMetadata` por idioma, Schema JSON-LD incrustado, y traducciones en `lib/i18n/{es,en,eu}.ts`. El contenido de blog y casos de estudio se almacena como archivos `.ts` de datos (sin CMS externo) para mantener el stack simple.

**Tech Stack:** Next.js 16.2, next-intl (es/en/eu), TypeScript, Tailwind CSS, Schema.org JSON-LD, Netlify

---

## Mapa de archivos

### Archivos nuevos a crear
- `app/[lang]/blog/page.tsx` — listado de artículos del blog
- `app/[lang]/blog/[slug]/page.tsx` — artículo individual
- `app/[lang]/casos/page.tsx` — listado de casos de estudio
- `app/[lang]/casos/[slug]/page.tsx` — caso de estudio individual
- `app/[lang]/disenador-web-donostia/page.tsx` — landing Donostia
- `app/[lang]/disenador-web-bilbao/page.tsx` — landing Bilbao
- `app/[lang]/disenador-web-vitoria/page.tsx` — landing Vitoria
- `lib/data/blog-posts.ts` — datos de los artículos (título, slug, contenido, meta)
- `lib/data/case-studies.ts` — datos de los casos de estudio
- `components/blog/ArticleCard.tsx` — tarjeta de artículo para el listado
- `components/casos/CaseStudyCard.tsx` — tarjeta de caso de estudio

### Archivos a modificar
- `app/[lang]/servicios/page.tsx` — añadir FAQ section + Schema FAQPage + BreadcrumbList
- `app/[lang]/precios/page.tsx` — añadir FAQ section + Schema FAQPage + BreadcrumbList
- `app/[lang]/sobre-nosotros/page.tsx` — ampliar bio + Schema Person mejorado + BreadcrumbList
- `app/sitemap.ts` — añadir rutas de blog, casos y landings de ciudad
- `lib/i18n/es.ts` — añadir traducciones de blog, casos, FAQ, landings
- `lib/i18n/en.ts` — ídem en inglés
- `lib/i18n/eu.ts` — ídem en euskera

---

## Task 1: Datos de casos de estudio

**Files:**
- Create: `lib/data/case-studies.ts`

- [ ] **Step 1: Crear el archivo de datos con 3 casos de estudio reales**

```typescript
// lib/data/case-studies.ts
export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  year: number;
  problem: Record<"es" | "en" | "eu", string>;
  solution: Record<"es" | "en" | "eu", string>;
  results: Record<"es" | "en" | "eu", string[]>;
  metrics: {
    lighthouse?: number;
    loadTime?: string;
    conversion?: string;
  };
  tags: string[];
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "proyecto-1",
    client: "Cliente 1",
    sector: "Restauración",
    year: 2025,
    problem: {
      es: "El cliente no tenía presencia online y perdía reservas frente a competidores.",
      en: "The client had no online presence and was losing bookings to competitors.",
      eu: "Bezeroak lineako presentziarik ez zuen eta lehiakideen aurrean erreserbak galtzen zituen.",
    },
    solution: {
      es: "Diseñamos una web completa con sistema de reservas, SEO local y diseño mobile-first.",
      en: "We designed a complete website with booking system, local SEO and mobile-first design.",
      eu: "Web osoa diseinatu genuen erreserbazio sistemarekin, SEO lokalarekin eta mobile-first diseinuarekin.",
    },
    results: {
      es: ["Lighthouse 98/100", "Tiempo de carga < 1.5s", "Top 3 en Google Maps Irun"],
      en: ["Lighthouse 98/100", "Load time < 1.5s", "Top 3 on Google Maps Irun"],
      eu: ["Lighthouse 98/100", "Karga denbora < 1.5s", "Top 3 Google Maps Irunen"],
    },
    metrics: { lighthouse: 98, loadTime: "1.4s" },
    tags: ["restauración", "SEO local", "reservas"],
    featured: true,
  },
  {
    slug: "proyecto-2",
    client: "Cliente 2",
    sector: "Comercio local",
    year: 2025,
    problem: {
      es: "Web antigua, lenta y sin optimización móvil que ahuyentaba a los clientes.",
      en: "Old, slow website with no mobile optimisation that was driving customers away.",
      eu: "Web zaharra, motela eta mugikorrerako optimizaziorik gabea, bezeroak uxatzen zituena.",
    },
    solution: {
      es: "Rediseño completo con Next.js, animaciones GSAP y optimización de Core Web Vitals.",
      en: "Full redesign with Next.js, GSAP animations and Core Web Vitals optimisation.",
      eu: "Birbideraketa osoa Next.js-ekin, GSAP animazioekin eta Core Web Vitals optimizazioarekin.",
    },
    results: {
      es: ["Mejora del 300% en velocidad", "Bounce rate -40%", "Conversiones +25%"],
      en: ["300% speed improvement", "Bounce rate -40%", "Conversions +25%"],
      eu: ["Abiaduraren %300 hobekuntza", "Bounce rate -40%", "Bihurketak +%25"],
    },
    metrics: { lighthouse: 96, loadTime: "1.2s", conversion: "+25%" },
    tags: ["comercio", "rediseño", "performance"],
    featured: true,
  },
  {
    slug: "proyecto-3",
    client: "Cliente 3",
    sector: "Servicios profesionales",
    year: 2026,
    problem: {
      es: "Necesitaban una web multi-idioma (español/inglés) para captar clientes internacionales.",
      en: "They needed a multi-language website (Spanish/English) to attract international clients.",
      eu: "Hizkuntza anitzeko web bat behar zuten (gaztelania/ingelesa) nazioarteko bezeroak erakartzeko.",
    },
    solution: {
      es: "Web multi-idioma con next-intl, SEO por idioma y hreflang configurado correctamente.",
      en: "Multi-language website with next-intl, per-language SEO and correctly configured hreflang.",
      eu: "Hizkuntza anitzeko weba next-intl-ekin, hizkuntzako SEOa eta hreflang ongi konfiguratuta.",
    },
    results: {
      es: ["3 idiomas activos", "Tráfico internacional +60%", "Lighthouse 97/100"],
      en: ["3 active languages", "International traffic +60%", "Lighthouse 97/100"],
      eu: ["3 hizkuntza aktibo", "Nazioarteko trafikoa +%60", "Lighthouse 97/100"],
    },
    metrics: { lighthouse: 97, loadTime: "1.6s" },
    tags: ["multi-idioma", "internacional", "SEO"],
    featured: false,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}
```

> **IMPORTANTE:** Sustituye los datos de `client`, `problem`, `solution`, `results` y `metrics` con los datos reales de tus proyectos antes de hacer deploy. Los textos de ejemplo son placeholders de estructura.

- [ ] **Step 2: Commit**

```bash
git add lib/data/case-studies.ts
git commit -m "feat: datos de casos de estudio"
```

---

## Task 2: Datos de artículos de blog

**Files:**
- Create: `lib/data/blog-posts.ts`

- [ ] **Step 1: Crear el archivo de datos con 4 artículos iniciales**

```typescript
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
      es: ["cuánto cuesta una página web en España", "precio web 2026", "diseño web freelance precio"],
      en: ["how much does a website cost in Spain", "website price 2026", "freelance web design price"],
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
- **Prezio lehiakorragoa:** aurrekontuan islatzen den enpresa egitura gabe

## Noiz aukeratu freelance bat?

Enpresa txiki eta ertainentzat (denda lokala, autonomo profesionala, hasierako startup) freelancea da normalean aukera onena.`,
    },
    tags: ["freelance", "agencia", "diseño web", "comparativa"],
    keywords: {
      es: ["freelance vs agencia diseño web", "diseñador web freelance España", "contratar diseñador web"],
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
      es: ["diseñador web Irun", "diseñador web Gipuzkoa", "diseño web País Vasco", "web Hondarribia"],
      en: ["web designer Irun", "web designer Gipuzkoa", "web design Basque Country"],
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

They are three metrics that measure the real user experience on your website:

**LCP (Largest Contentful Paint):** How long does it take for the main content to appear? Target: under 2.5 seconds.

**CLS (Cumulative Layout Shift):** Do elements move while the page loads? Target: under 0.1.

**INP (Interaction to Next Paint):** How long does the website take to respond to a user interaction? Target: under 200ms.

## How do I improve them?

Most common problems and their solutions:
- **Slow LCP:** optimise images (WebP, lazy loading), remove render-blocking scripts
- **High CLS:** define fixed dimensions on images and ads
- **High INP:** reduce unnecessary JavaScript, use web workers`,
      eu: `Googlek Core Web Vitals rankeatze-faktore gisa erabiltzen ditu 2021az geroztik. 2026an, ondo rankeatzearen adierazle garrantzitsuenetako bat izaten jarraitzen dute.

## Zer dira Core Web Vitals?

Zure webgunean erabiltzaileen benetako esperientzia neurtzen duten hiru metrika dira:

**LCP:** Eduki nagusia agertzeko zenbat denbora behar du? Helburua: 2.5 segundu baino gutxiago.

**CLS:** Orrialdearen karga bitartean elementuak mugitzen al dira? Helburua: 0.1 baino gutxiago.

**INP:** Webguneak erabiltzaile interakzioari erantzuteko zenbat denbora behar du? Helburua: 200ms baino gutxiago.`,
    },
    tags: ["Core Web Vitals", "SEO técnico", "rendimiento web", "Google"],
    keywords: {
      es: ["Core Web Vitals SEO", "mejorar velocidad web", "Google PageSpeed", "diseñador web rendimiento"],
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
```

- [ ] **Step 2: Commit**

```bash
git add lib/data/blog-posts.ts
git commit -m "feat: datos de artículos de blog iniciales"
```

---

## Task 3: Traducciones para nuevas secciones

**Files:**
- Modify: `lib/i18n/es.ts`
- Modify: `lib/i18n/en.ts`
- Modify: `lib/i18n/eu.ts`

- [ ] **Step 1: Añadir traducciones al final del objeto `es` en `lib/i18n/es.ts`**

Busca el cierre del objeto principal (`};` al final) y añade antes de él:

```typescript
  blog: {
    title: "Blog",
    subtitle: "Artículos sobre diseño web, SEO y rendimiento.",
    readMore: "Leer artículo",
    readingTime: "min de lectura",
    backToBlog: "Volver al blog",
    publishedOn: "Publicado el",
  },
  casos: {
    title: "Casos de Estudio",
    subtitle: "Proyectos reales con resultados reales.",
    problem: "El problema",
    solution: "La solución",
    results: "Resultados",
    metrics: "Métricas",
    viewAll: "Ver todos los casos",
    backToCasos: "Volver a casos",
  },
  faqServicios: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Cuánto tiempo tarda en hacerse una web?",
        a: "El proceso completo desde el primer contacto hasta la entrega dura entre 3 y 6 semanas, dependiendo de la complejidad del proyecto y la velocidad de feedback.",
      },
      {
        q: "¿Qué necesito aportar yo para empezar?",
        a: "Solo necesito que me cuentes tu negocio, tus objetivos y, si los tienes, logotipo y fotos. Del resto me encargo yo.",
      },
      {
        q: "¿Incluye el mantenimiento después de la entrega?",
        a: "El precio incluye 1 mes de soporte post-lanzamiento. A partir de ahí, ofrezco planes de mantenimiento opcionales.",
      },
      {
        q: "¿Puedo pedir cambios durante el proyecto?",
        a: "Sí, el proceso es iterativo. Incluye hasta 2 rondas de revisión sin coste adicional.",
      },
      {
        q: "¿Trabajas solo con empresas del País Vasco?",
        a: "No, trabajo con clientes de toda España y también internacionales. Solo necesitamos internet para comunicarnos.",
      },
    ],
  },
  faqPrecios: {
    title: "Preguntas sobre el precio",
    items: [
      {
        q: "¿Por qué cuesta 1.300€ IVA incluido?",
        a: "Es el precio mínimo para hacer un trabajo de calidad: diseño personalizado, desarrollo a medida, SEO técnico y hosting el primer año. Sin recortar en ningún punto.",
      },
      {
        q: "¿Hay costes adicionales?",
        a: "No hay costes ocultos. El único coste recurrente es la renovación del dominio y hosting a partir del segundo año (aproximadamente 100-150€/año).",
      },
      {
        q: "¿Se puede pagar en plazos?",
        a: "Sí. El pago habitual es 50% al inicio y 50% en la entrega. Para proyectos más grandes, podemos negociar plazos.",
      },
      {
        q: "¿Qué incluye exactamente el precio?",
        a: "Diseño UI/UX a medida, desarrollo en Next.js, SEO técnico completo, formulario de contacto, hasta 3 idiomas, hosting el primer año y soporte post-lanzamiento.",
      },
      {
        q: "¿Puedo tener una consulta gratuita antes de decidir?",
        a: "Sí, ofrezco una consulta gratuita de 30 minutos por videollamada para entender tu proyecto y ver si somos un buen match.",
      },
    ],
  },
```

- [ ] **Step 2: Añadir las mismas traducciones en `lib/i18n/en.ts`**

```typescript
  blog: {
    title: "Blog",
    subtitle: "Articles about web design, SEO and performance.",
    readMore: "Read article",
    readingTime: "min read",
    backToBlog: "Back to blog",
    publishedOn: "Published on",
  },
  casos: {
    title: "Case Studies",
    subtitle: "Real projects with real results.",
    problem: "The problem",
    solution: "The solution",
    results: "Results",
    metrics: "Metrics",
    viewAll: "View all cases",
    backToCasos: "Back to cases",
  },
  faqServicios: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How long does it take to build a website?",
        a: "The complete process from first contact to delivery takes between 3 and 6 weeks, depending on project complexity and feedback speed.",
      },
      {
        q: "What do I need to provide to get started?",
        a: "I just need you to tell me about your business and goals, and if you have them, your logo and photos. I'll handle the rest.",
      },
      {
        q: "Does it include maintenance after delivery?",
        a: "The price includes 1 month of post-launch support. After that, I offer optional maintenance plans.",
      },
      {
        q: "Can I request changes during the project?",
        a: "Yes, the process is iterative. It includes up to 2 revision rounds at no additional cost.",
      },
      {
        q: "Do you only work with Basque Country businesses?",
        a: "No, I work with clients from all over Spain and internationally too. We just need the internet to communicate.",
      },
    ],
  },
  faqPrecios: {
    title: "Pricing questions",
    items: [
      {
        q: "Why does it cost €1,300 VAT included?",
        a: "It's the minimum price to do quality work: custom design, bespoke development, technical SEO and hosting for the first year. No cutting corners.",
      },
      {
        q: "Are there additional costs?",
        a: "There are no hidden costs. The only recurring cost is domain and hosting renewal from the second year onwards (approximately €100-150/year).",
      },
      {
        q: "Can I pay in instalments?",
        a: "Yes. The usual payment is 50% at the start and 50% on delivery. For larger projects, we can negotiate payment plans.",
      },
      {
        q: "What exactly does the price include?",
        a: "Custom UI/UX design, Next.js development, complete technical SEO, contact form, up to 3 languages, first-year hosting and post-launch support.",
      },
      {
        q: "Can I have a free consultation before deciding?",
        a: "Yes, I offer a free 30-minute video call consultation to understand your project and see if we're a good match.",
      },
    ],
  },
```

- [ ] **Step 3: Añadir las mismas traducciones en `lib/i18n/eu.ts`**

```typescript
  blog: {
    title: "Bloga",
    subtitle: "Web diseinuari, SEOri eta errendimenduari buruzko artikuluak.",
    readMore: "Artikulua irakurri",
    readingTime: "min irakurketa",
    backToBlog: "Blogera itzuli",
    publishedOn: "Argitaratua",
  },
  casos: {
    title: "Kasu Azterketak",
    subtitle: "Benetako proiektuak benetako emaitzeekin.",
    problem: "Arazoa",
    solution: "Irtenbidea",
    results: "Emaitzak",
    metrics: "Metrikak",
    viewAll: "Kasu guztiak ikusi",
    backToCasos: "Kasuetara itzuli",
  },
  faqServicios: {
    title: "Galdera ohikoak",
    items: [
      {
        q: "Zenbat denbora behar da web bat egiteko?",
        a: "Lehen kontaktutik entregatzeraino osoko prozesuak 3 eta 6 aste artean irauten du, proiektuaren konplexutasunaren eta feedback abiaduraren arabera.",
      },
      {
        q: "Zer eman behar dut hasteko?",
        a: "Zure negozioa eta helburuak kontatzea besterik ez. Logo eta argazkiak badituzu, hobe. Gainerakoaz ni arduratuko naiz.",
      },
      {
        q: "Mantentze-lana entregatutakoan sartzen al da?",
        a: "Prezioak abian jarri ondoren 1 hilabeteko laguntza barne hartzen du. Hortik aurrera, aukerako mantentze-planak eskaintzen ditut.",
      },
      {
        q: "Prozesu bitartean aldaketak eskatu al ditzaket?",
        a: "Bai, prozesua iteratiboa da. Gehigarrizko kosturik gabe 2 berrikuspen txanda barne hartzen du.",
      },
      {
        q: "Euskal Herriko enpresekin bakarrik lan egiten al duzu?",
        a: "Ez, Espainiatik eta nazioarteetik ere bezeroekin lan egiten dut. Internet besterik ez dugu behar komunikatzeko.",
      },
    ],
  },
  faqPrecios: {
    title: "Prezioari buruzko galderak",
    items: [
      {
        q: "Zergatik kostatzen da 1.300€ BEZ barne?",
        a: "Kalitatezko lana egiteko gutxieneko prezioa da: diseinu pertsonalizatua, garapen pertsonalizatua, SEO teknikoa eta lehen urteko hostinga.",
      },
      {
        q: "Kostu gehigarririk al dago?",
        a: "Ez dago ezkutuko kosturik. Kostu errepikakorra bigarren urtetik aurrerako domeinu eta hosting berriztapena baino ez da (gutxi gorabehera 100-150€/urte).",
      },
      {
        q: "Epeka ordaindu al daiteke?",
        a: "Bai. Ohiko ordainketa hasieran %50 eta entregatzean %50 da. Proiektu handiagoetarako, ordainketa planei buruz negozia dezakegu.",
      },
      {
        q: "Zer barne hartzen du prezioaren barruan?",
        a: "Neurrizko UI/UX diseinua, Next.js garapena, SEO tekniko osoa, harremanetan jartzeko inprimakia, 3 hizkuntzara arte, lehen urteko hostinga eta abian jarri ondoko laguntza.",
      },
      {
        q: "Erabaki aurretik doako kontsulta bat eduki al dezaket?",
        a: "Bai, 30 minutuko bideo-deiari buruzko doako kontsulta eskaintzen dut zure proiektua ulertzeko eta bat gatozen ikusteko.",
      },
    ],
  },
```

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/es.ts lib/i18n/en.ts lib/i18n/eu.ts
git commit -m "feat: traducciones para blog, casos de estudio y FAQs"
```

---

## Task 4: Sección FAQ en /servicios

**Files:**
- Modify: `app/[lang]/servicios/page.tsx`

- [ ] **Step 1: Actualizar el Schema JSON-LD para incluir FAQPage y BreadcrumbList**

Localiza el bloque `const jsonLd = {` en `app/[lang]/servicios/page.tsx` (línea 115) y reemplázalo con:

```typescript
  const faqItems = locale === "es"
    ? [
        { q: "¿Cuánto tiempo tarda en hacerse una web?", a: "El proceso completo dura entre 3 y 6 semanas, dependiendo de la complejidad del proyecto y la velocidad de feedback." },
        { q: "¿Qué necesito aportar yo para empezar?", a: "Solo necesito que me cuentes tu negocio, tus objetivos y, si los tienes, logotipo y fotos. Del resto me encargo yo." },
        { q: "¿Incluye el mantenimiento después de la entrega?", a: "El precio incluye 1 mes de soporte post-lanzamiento. A partir de ahí, ofrezco planes de mantenimiento opcionales." },
        { q: "¿Puedo pedir cambios durante el proyecto?", a: "Sí, incluye hasta 2 rondas de revisión sin coste adicional." },
        { q: "¿Trabajas solo con empresas del País Vasco?", a: "No, trabajo con clientes de toda España y también internacionales." },
      ]
    : locale === "en"
    ? [
        { q: "How long does it take to build a website?", a: "The complete process takes between 3 and 6 weeks, depending on project complexity and feedback speed." },
        { q: "What do I need to provide to get started?", a: "I just need you to tell me about your business and goals, and if you have them, your logo and photos." },
        { q: "Does it include maintenance after delivery?", a: "The price includes 1 month of post-launch support. After that, I offer optional maintenance plans." },
        { q: "Can I request changes during the project?", a: "Yes, it includes up to 2 revision rounds at no additional cost." },
        { q: "Do you only work with Basque Country businesses?", a: "No, I work with clients from all over Spain and internationally too." },
      ]
    : [
        { q: "Zenbat denbora behar da web bat egiteko?", a: "Osoko prozesuak 3 eta 6 aste artean irauten du, proiektuaren konplexutasunaren arabera." },
        { q: "Zer eman behar dut hasteko?", a: "Zure negozioa eta helburuak kontatzea besterik ez." },
        { q: "Mantentze-lana entregatutakoan sartzen al da?", a: "Prezioak abian jarri ondoren 1 hilabeteko laguntza barne hartzen du." },
        { q: "Prozesu bitartean aldaketak eskatu al ditzaket?", a: "Bai, gehigarrizko kosturik gabe 2 berrikuspen txanda barne hartzen du." },
        { q: "Euskal Herriko enpresekin bakarrik lan egiten al duzu?", a: "Ez, Espainiatik eta nazioarteetik ere bezeroekin lan egiten dut." },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        provider: { "@id": "https://unaxaller.com/#business" },
        serviceType: "Diseño y Desarrollo Web",
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Servicios de Diseño Web" : locale === "en" ? "Web Design Services" : "Web Diseinu Zerbitzuak",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Servicios" : locale === "en" ? "Services" : "Zerbitzuak", item: `https://unaxaller.com/${locale}/servicios` },
        ],
      },
    ],
  };
```

- [ ] **Step 2: Añadir la sección FAQ visual al final de la página, antes del CTA final**

Localiza el comentario `{/* CTA */}` en `app/[lang]/servicios/page.tsx` (cerca del final) y añade ANTES de él:

```tsx
          {/* FAQ */}
          <AnimatedSection className="mt-20">
            <h2
              className="text-2xl md:text-3xl font-light mb-10"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : "Galdera ohikoak"}
            </h2>
            <div className="flex flex-col divide-y" style={{ borderColor: "#e3e3de" }}>
              {faqItems.map((item, i) => (
                <details key={i} className="group py-5">
                  <summary
                    className="flex justify-between items-center cursor-pointer text-base font-medium list-none"
                    style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.q}
                    <svg
                      className="ml-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </AnimatedSection>
```

- [ ] **Step 3: Commit**

```bash
git add app/[lang]/servicios/page.tsx
git commit -m "feat: FAQ section y Schema FAQPage + BreadcrumbList en /servicios"
```

---

## Task 5: Sección FAQ en /precios

**Files:**
- Modify: `app/[lang]/precios/page.tsx`

- [ ] **Step 1: Añadir faqItems y actualizar el Schema JSON-LD en `app/[lang]/precios/page.tsx`**

Localiza `const jsonLd = {` en `app/[lang]/precios/page.tsx` (línea 33) y añade ANTES de él:

```typescript
  const faqItems = locale === "es"
    ? [
        { q: "¿Por qué cuesta 1.300€ IVA incluido?", a: "Es el precio mínimo para hacer un trabajo de calidad: diseño personalizado, desarrollo a medida, SEO técnico y hosting el primer año." },
        { q: "¿Hay costes adicionales?", a: "No hay costes ocultos. El único coste recurrente es la renovación del dominio y hosting a partir del segundo año (aproximadamente 100-150€/año)." },
        { q: "¿Se puede pagar en plazos?", a: "Sí. El pago habitual es 50% al inicio y 50% en la entrega." },
        { q: "¿Qué incluye exactamente el precio?", a: "Diseño UI/UX a medida, desarrollo en Next.js, SEO técnico completo, formulario de contacto, hasta 3 idiomas, hosting el primer año y soporte post-lanzamiento." },
        { q: "¿Puedo tener una consulta gratuita antes de decidir?", a: "Sí, ofrezco una consulta gratuita de 30 minutos por videollamada." },
      ]
    : locale === "en"
    ? [
        { q: "Why does it cost €1,300 VAT included?", a: "It's the minimum price to do quality work: custom design, bespoke development, technical SEO and hosting for the first year." },
        { q: "Are there additional costs?", a: "There are no hidden costs. The only recurring cost is domain and hosting renewal from the second year onwards (approximately €100-150/year)." },
        { q: "Can I pay in instalments?", a: "Yes. The usual payment is 50% at the start and 50% on delivery." },
        { q: "What exactly does the price include?", a: "Custom UI/UX design, Next.js development, complete technical SEO, contact form, up to 3 languages, first-year hosting and post-launch support." },
        { q: "Can I have a free consultation before deciding?", a: "Yes, I offer a free 30-minute video call consultation." },
      ]
    : [
        { q: "Zergatik kostatzen da 1.300€ BEZ barne?", a: "Kalitatezko lana egiteko gutxieneko prezioa da: diseinu pertsonalizatua, garapen pertsonalizatua, SEO teknikoa eta lehen urteko hostinga." },
        { q: "Kostu gehigarririk al dago?", a: "Ez dago ezkutuko kosturik. Kostu errekurrentea bigarren urtetik aurrerako domeinu eta hosting berriztapena baino ez da." },
        { q: "Epeka ordaindu al daiteke?", a: "Bai. Ohiko ordainketa hasieran %50 eta entregatzean %50 da." },
        { q: "Zer barne hartzen du prezioaren barruan?", a: "Neurrizko UI/UX diseinua, Next.js garapena, SEO tekniko osoa, harremanetan jartzeko inprimakia, 3 hizkuntzara arte, lehen urteko hostinga eta abian jarri ondoko laguntza." },
        { q: "Erabaki aurretik doako kontsulta bat eduki al dezaket?", a: "Bai, 30 minutuko bideo-deiari buruzko doako kontsulta eskaintzen dut." },
      ];
```

Luego reemplaza el bloque `const jsonLd = {` existente con:

```typescript
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: locale === "es" ? "Precios — Unax Aller" : locale === "en" ? "Pricing — Unax Aller" : "Prezioak — Unax Aller",
        url: `https://unaxaller.com/${locale}/precios`,
        mainEntity: {
          "@type": "Offer",
          name: locale === "es" ? "Plan Completo — Web a Medida" : locale === "en" ? "Complete Plan — Custom Website" : "Plan Osoa — Neurrizko Weba",
          description: locale === "es"
            ? "Web a medida completa: diseño premium, SEO técnico, multi-idioma y hosting el primer año. IVA incluido."
            : locale === "en"
            ? "Complete custom website: premium design, technical SEO, multi-language and hosting for the first year. VAT included."
            : "Neurrira egindako web osoa: diseinu premium-a, SEO teknikoa, hizkuntza anitza eta hostinga lehen urtean. BEZ barne.",
          price: "1300",
          priceCurrency: "EUR",
          seller: { "@id": "https://unaxaller.com/#business" },
          areaServed: [
            { "@type": "City", name: "Irun" },
            { "@type": "AdministrativeArea", name: "Gipuzkoa" },
            { "@type": "AdministrativeArea", name: "País Vasco" },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak", item: `https://unaxaller.com/${locale}/precios` },
        ],
      },
    ],
  };
```

- [ ] **Step 2: Añadir la sección FAQ visual en el JSX de `app/[lang]/precios/page.tsx`**

Localiza el cierre del `<div className="pt-16 md:pt-20">` y añade después del `<PricingCards>`:

```tsx
      {/* FAQ */}
      <section className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-light mb-10"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {locale === "es" ? "Preguntas sobre el precio" : locale === "en" ? "Pricing questions" : "Prezioari buruzko galderak"}
          </h2>
          <div className="flex flex-col divide-y" style={{ borderColor: "#e3e3de" }}>
            {faqItems.map((item, i) => (
              <details key={i} className="group py-5">
                <summary
                  className="flex justify-between items-center cursor-pointer text-base font-medium list-none"
                  style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
                >
                  {item.q}
                  <svg
                    className="ml-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Commit**

```bash
git add app/[lang]/precios/page.tsx
git commit -m "feat: FAQ section y Schema FAQPage + BreadcrumbList en /precios"
```

---

## Task 6: Casos de estudio — listado e individual

**Files:**
- Create: `app/[lang]/casos/page.tsx`
- Create: `app/[lang]/casos/[slug]/page.tsx`

- [ ] **Step 1: Crear el listado de casos de estudio**

```typescript
// app/[lang]/casos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { caseStudies } from "@/lib/data/case-studies";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Casos de Estudio — Proyectos Reales | Unax Aller",
    en: "Case Studies — Real Projects | Unax Aller",
    eu: "Kasu Azterketak — Benetako Proiektuak | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Proyectos reales de diseño web con resultados medibles. Lighthouse 95+, velocidad de carga, SEO local y conversiones mejoradas.",
    en: "Real web design projects with measurable results. Lighthouse 95+, load speed, local SEO and improved conversions.",
    eu: "Benetako web diseinu proiektuak neurgarriak diren emaitzeekin. Lighthouse 95+, karga abiadura, SEO lokala eta bihurketa hobeak.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/casos` },
  };
}

export default async function CasosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak",
        url: `https://unaxaller.com/${locale}/casos`,
        itemListElement: caseStudies.map((cs, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://unaxaller.com/${locale}/casos/${cs.slug}`,
          name: cs.client,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak", item: `https://unaxaller.com/${locale}/casos` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak"}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es"
                ? "Proyectos reales con resultados reales. Sin humo, solo métricas."
                : locale === "en"
                ? "Real projects with real results. No fluff, just metrics."
                : "Benetako proiektuak benetako emaitzeekin. Metrikak baino ez."}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <AnimatedSection key={cs.slug} delay={i * 0.05}>
                <Link
                  href={`/${locale}/casos/${cs.slug}`}
                  className="block h-full group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                  >
                    {cs.sector} · {cs.year}
                  </div>
                  <h2
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {cs.client}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {cs.solution[locale]}
                  </p>
                  {cs.metrics.lighthouse && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "#efeee9", color: "#4d6453" }}
                    >
                      Lighthouse {cs.metrics.lighthouse}/100
                    </div>
                  )}
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Crear la página individual de caso de estudio**

```typescript
// app/[lang]/casos/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/case-studies";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ["es", "en", "eu"];
  return locales.flatMap((lang) =>
    caseStudies.map((cs) => ({ lang, slug: cs.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  return {
    title: `${cs.client} — Caso de Estudio | Unax Aller`,
    description: cs.solution[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/casos/${slug}` },
  };
}

export default async function CasoPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${cs.client} — ${locale === "es" ? "Caso de Estudio" : locale === "en" ? "Case Study" : "Kasu Azterketa"}`,
        description: cs.solution[locale],
        author: { "@id": "https://unaxaller.com/#person" },
        publisher: { "@id": "https://unaxaller.com/#business" },
        url: `https://unaxaller.com/${locale}/casos/${cs.slug}`,
        datePublished: `${cs.year}-01-01`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Casos" : "Cases", item: `https://unaxaller.com/${locale}/casos` },
          { "@type": "ListItem", position: 3, name: cs.client, item: `https://unaxaller.com/${locale}/casos/${cs.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-12 md:pt-44" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <Link
            href={`/${locale}/casos`}
            className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === "es" ? "Volver a casos" : locale === "en" ? "Back to cases" : "Kasuetara itzuli"}
          </Link>

          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
          >
            {cs.sector} · {cs.year}
          </div>

          <h1
            className="text-4xl md:text-5xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {cs.client}
          </h1>
        </div>
      </section>

      <section className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <div className="flex flex-col gap-10">
            {/* Problem */}
            <AnimatedSection>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}>
                <h2
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                >
                  {locale === "es" ? "El problema" : locale === "en" ? "The problem" : "Arazoa"}
                </h2>
                <p style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>{cs.problem[locale]}</p>
              </div>
            </AnimatedSection>

            {/* Solution */}
            <AnimatedSection>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}>
                <h2
                  className="text-sm font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                >
                  {locale === "es" ? "La solución" : locale === "en" ? "The solution" : "Irtenbidea"}
                </h2>
                <p style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>{cs.solution[locale]}</p>
              </div>
            </AnimatedSection>

            {/* Results */}
            <AnimatedSection>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: "#061b0e" }}>
                <h2
                  className="text-sm font-semibold uppercase tracking-widest mb-6"
                  style={{ color: "#b4cdb8", fontFamily: "Manrope, sans-serif" }}
                >
                  {locale === "es" ? "Resultados" : locale === "en" ? "Results" : "Emaitzak"}
                </h2>
                <ul className="flex flex-col gap-3">
                  {cs.results[locale].map((r, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "#b4cdb8", fontFamily: "Manrope, sans-serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#4d6453" }} aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Tags */}
            <AnimatedSection>
              <div className="flex flex-wrap gap-2">
                {cs.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "#efeee9", color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* CTA */}
          <AnimatedSection className="mt-16 text-center">
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#061b0e", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es" ? "Quiero un proyecto así" : locale === "en" ? "I want a project like this" : "Horrelako proiektu bat nahi dut"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/[lang]/casos/page.tsx app/[lang]/casos/[slug]/page.tsx
git commit -m "feat: páginas de casos de estudio (listado + individual)"
```

---

## Task 7: Blog — listado e individual

**Files:**
- Create: `app/[lang]/blog/page.tsx`
- Create: `app/[lang]/blog/[slug]/page.tsx`

- [ ] **Step 1: Crear el listado del blog**

```typescript
// app/[lang]/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { blogPosts } from "@/lib/data/blog-posts";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Blog de Diseño Web, SEO y Rendimiento | Unax Aller",
    en: "Web Design, SEO and Performance Blog | Unax Aller",
    eu: "Web Diseinu, SEO eta Errendimendu Bloga | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Artículos sobre diseño web, SEO técnico y rendimiento web. Guías prácticas para negocios que quieren mejorar su presencia online.",
    en: "Articles about web design, technical SEO and web performance. Practical guides for businesses that want to improve their online presence.",
    eu: "Web diseinuari, SEO teknikoari eta web errendimenduari buruzko artikuluak. Gida praktikoak lineako presentzia hobetu nahi duten negozioetarako.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/blog` },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: locale === "es" ? "Blog — Unax Aller" : locale === "en" ? "Blog — Unax Aller" : "Bloga — Unax Aller",
        url: `https://unaxaller.com/${locale}/blog`,
        author: { "@id": "https://unaxaller.com/#person" },
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: locale,
        blogPost: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.titles[locale],
          url: `https://unaxaller.com/${locale}/blog/${p.slug}`,
          datePublished: p.publishedAt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `https://unaxaller.com/${locale}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              Blog
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es"
                ? "Diseño web, SEO y rendimiento. Sin relleno."
                : locale === "en"
                ? "Web design, SEO and performance. No filler."
                : "Web diseinua, SEO eta errendimendua. Betegarririk gabe."}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl">
          <div className="flex flex-col divide-y" style={{ borderColor: "#e3e3de" }}>
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="block group py-8 transition-all duration-200 hover:pl-2"
                >
                  <div
                    className="flex items-center gap-3 text-xs mb-3"
                    style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                  >
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(
                        locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "eu-ES",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} {locale === "es" ? "min de lectura" : locale === "en" ? "min read" : "min irakurketa"}</span>
                  </div>
                  <h2
                    className="text-xl md:text-2xl font-light mb-3 group-hover:underline underline-offset-4"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {post.titles[locale]}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
                  >
                    {post.descriptions[locale]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{ backgroundColor: "#efeee9", color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Crear la página individual de artículo**

```typescript
// app/[lang]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/lib/data/blog-posts";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const locales = ["es", "en", "eu"];
  return locales.flatMap((lang) =>
    getAllBlogSlugs().map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.titles[locale]} | Unax Aller`,
    description: post.descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/blog/${slug}` },
    keywords: post.keywords[locale],
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Unax Aller Fernández"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as "es" | "en" | "eu";
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.titles[locale],
        description: post.descriptions[locale],
        author: {
          "@id": "https://unaxaller.com/#person",
          "@type": "Person",
          name: "Unax Aller Fernández",
          url: "https://unaxaller.com",
          jobTitle: "Diseñador y Desarrollador Web Freelance",
        },
        publisher: { "@id": "https://unaxaller.com/#business" },
        datePublished: post.publishedAt,
        url: `https://unaxaller.com/${locale}/blog/${post.slug}`,
        inLanguage: locale,
        keywords: post.keywords[locale].join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `https://unaxaller.com/${locale}/blog` },
          { "@type": "ListItem", position: 3, name: post.titles[locale], item: `https://unaxaller.com/${locale}/blog/${post.slug}` },
        ],
      },
    ],
  };

  const paragraphs = post.content[locale].split("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-12 md:pt-44" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === "es" ? "Volver al blog" : locale === "en" ? "Back to blog" : "Blogera itzuli"}
          </Link>

          <div
            className="flex items-center gap-3 text-xs mb-6"
            style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
          >
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(
                locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "eu-ES",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} {locale === "es" ? "min de lectura" : locale === "en" ? "min read" : "min irakurketa"}</span>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-8"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {post.titles[locale]}
          </h1>

          {/* Author card */}
          <div
            className="flex items-center gap-4 p-4 rounded-xl mb-12"
            style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-light flex-shrink-0 select-none"
              style={{ backgroundColor: "#1b3022", color: "#b4cdb8", fontFamily: "Newsreader, Georgia, serif" }}
              aria-hidden="true"
            >
              UA
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}>
                Unax Aller Fernández
              </p>
              <p className="text-xs" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
                {locale === "es" ? "Diseñador web freelance en Irun, Gipuzkoa" : locale === "en" ? "Freelance web designer in Irun, Gipuzkoa" : "Web diseinatzaile freelance Irunen, Gipuzkoan"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <article className="pb-20 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <div
              className="prose prose-lg max-w-none"
              style={{ fontFamily: "Manrope, sans-serif", color: "#434843" }}
            >
              {paragraphs.map((para, i) => {
                if (para.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-2xl font-light mt-10 mb-4"
                      style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                    >
                      {para.replace("## ", "")}
                    </h2>
                  );
                }
                if (para.startsWith("**") && para.endsWith("**")) {
                  return (
                    <p key={i} className="font-semibold mb-4" style={{ color: "#061b0e" }}>
                      {para.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                if (para.startsWith("- ")) {
                  const items = para.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="mb-4 flex flex-col gap-2">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#4d6453" }} aria-hidden="true" />
                          <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
                  />
                );
              })}
            </div>
          </AnimatedSection>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-10" style={{ borderTop: "1px solid #e3e3de" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#efeee9", color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection className="mt-16 p-8 rounded-2xl text-center" style={{ backgroundColor: "#061b0e" }}>
            <p
              className="text-lg font-light mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {locale === "es" ? "¿Quieres una web así para tu negocio?" : locale === "en" ? "Want a website like this for your business?" : "Zure negoziorako horrelako web bat nahi al duzu?"}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#b4cdb8", color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es" ? "Agenda una consulta gratuita" : locale === "en" ? "Book a free consultation" : "Doako kontsulta bat eskatu"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </article>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/[lang]/blog/page.tsx app/[lang]/blog/[slug]/page.tsx
git commit -m "feat: páginas de blog (listado + artículo individual)"
```

---

## Task 8: Landing pages de ciudad — País Vasco

**Files:**
- Create: `app/[lang]/disenador-web-donostia/page.tsx`
- Create: `app/[lang]/disenador-web-bilbao/page.tsx`
- Create: `app/[lang]/disenador-web-vitoria/page.tsx`

- [ ] **Step 1: Crear landing Donostia/San Sebastián**

```typescript
// app/[lang]/disenador-web-donostia/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Diseñador Web en Donostia-San Sebastián | Unax Aller",
    en: "Web Designer in Donostia-San Sebastián | Unax Aller",
    eu: "Web Diseinatzailea Donostia-San Sebastianen | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios de Donostia-San Sebastián. Webs a medida con SEO local, diseño premium y rendimiento. Desde 1.300€ IVA incluido.",
    en: "Freelance web designer for businesses in Donostia-San Sebastián. Custom websites with local SEO, premium design and performance. From €1,300 VAT included.",
    eu: "Web diseinatzaile freelance Donostia-San Sebastianeko negozioetarako. Neurrizko webguneak SEO lokalarekin, diseinu premiuma eta errendimenduarekin. 1.300€-tik BEZ barne.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/disenador-web-donostia` },
  };
}

export default async function DonostiaPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const city = { es: "Donostia-San Sebastián", en: "Donostia-San Sebastián", eu: "Donostia-San Sebastián" };
  const region = { es: "Gipuzkoa", en: "Gipuzkoa", eu: "Gipuzkoa" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        url: "https://unaxaller.com",
        areaServed: [
          { "@type": "City", name: "Donostia-San Sebastián" },
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
        ],
        serviceType: "Diseño y Desarrollo Web",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Diseñador web Donostia" : "Web designer Donostia", item: `https://unaxaller.com/${locale}/disenador-web-donostia` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#faf9f4" }}>
        <div className="container-xl max-w-3xl">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {locale === "es"
              ? `Diseñador web en ${city[locale]}`
              : locale === "en"
              ? `Web designer in ${city[locale]}`
              : `Web diseinatzailea ${city[locale]}n`}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {locale === "es"
              ? `Soy Unax Aller, diseñador web freelance en Irun con clientes en ${city[locale]} y toda ${region[locale]}. Creo webs a medida que posicionan en Google y convierten visitantes en clientes.`
              : locale === "en"
              ? `I'm Unax Aller, a freelance web designer based in Irun with clients in ${city[locale]} and all of ${region[locale]}. I create custom websites that rank on Google and convert visitors into clients.`
              : `Unax Aller naiz, Irungo web diseinatzaile freelancea ${city[locale]}ko eta ${region[locale]}ko bezero askorekin. Googleren rankean agertzen diren eta bisitariak bezeroak bihurtzen dituzten neurrizko webguneak sortzen ditut.`}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: "#061b0e", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}
          >
            {locale === "es" ? "Solicitar presupuesto gratis" : locale === "en" ? "Request a free quote" : "Doako aurrekontua eskatu"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: "#efeee9" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
            >
              {locale === "es"
                ? `¿Por qué elegir un diseñador web local en ${city[locale]}?`
                : locale === "en"
                ? `Why choose a local web designer in ${city[locale]}?`
                : `Zergatik aukeratu bertako web diseinatzaile bat ${city[locale]}n?`}
            </h2>
            <div className="flex flex-col gap-6">
              {(locale === "es"
                ? [
                    { title: "Conoce el mercado local", desc: `Entiendo cómo buscan los clientes de ${city[locale]} y qué esperan de un negocio local. Eso se traduce en webs que conectan mejor.` },
                    { title: "SEO local de verdad", desc: "No solo pongo tus keywords. Optimizo para búsquedas locales, Google Maps y Google Business Profile." },
                    { title: "Comunicación directa", desc: "Hablas conmigo, no con un gestor de cuentas. Si necesitas una reunión presencial, puedo desplazarme." },
                    { title: "Precios justos sin letra pequeña", desc: "1.300€ IVA incluido. Sin sorpresas. Sin renovaciones forzosas." },
                  ]
                : locale === "en"
                ? [
                    { title: "Knows the local market", desc: `I understand how ${city[locale]} clients search and what they expect from a local business. That translates into websites that connect better.` },
                    { title: "Real local SEO", desc: "I don't just add keywords. I optimise for local searches, Google Maps and Google Business Profile." },
                    { title: "Direct communication", desc: "You talk to me, not an account manager. If you need an in-person meeting, I can travel." },
                    { title: "Fair prices, no small print", desc: "€1,300 VAT included. No surprises. No forced renewals." },
                  ]
                : [
                    { title: "Merkatu lokala ezagutu", desc: `${city[locale]}ko bezeroek nola bilatzen duten eta negozio lokal batetik zer espero duten ulertzen dut.` },
                    { title: "Benetako SEO lokala", desc: "Ez ditut hitz gakoak bakarrik gehitzen. Bilaketa lokaletarako, Google Maps eta Google Business Profilerako optimizatzen dut." },
                    { title: "Komunikazio zuzena", desc: "Nirekin hitz egiten duzu, ez kontu kudeatzaile batekin." },
                    { title: "Prezio justu letra txikirik gabe", desc: "1.300€ BEZ barne. Sorpresarik gabe. Beharrezko berritzapenik gabe." },
                  ]
              ).map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "#faf9f4", border: "1px solid #e3e3de" }}
                >
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#061b0e" }}>
        <div className="container-xl text-center">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-6"
              style={{ fontFamily: "Newsreader, Georgia, serif", color: "#b4cdb8" }}
            >
              {locale === "es"
                ? `¿Tienes un negocio en ${city[locale]}?`
                : locale === "en"
                ? `Do you have a business in ${city[locale]}?`
                : `${city[locale]}n negozioa al duzu?`}
            </h2>
            <p className="mb-8 text-sm" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
              {locale === "es" ? "Consulta gratuita de 30 minutos. Sin compromiso." : locale === "en" ? "Free 30-minute consultation. No commitment." : "30 minutuko doako kontsulta. Konpromisorik gabe."}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#b4cdb8", color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
            >
              {locale === "es" ? "Hablar con Unax" : locale === "en" ? "Talk to Unax" : "Unaxekin hitz egin"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Crear landing Bilbao (copia el patrón de Donostia cambiando ciudad y areaServed)**

Crea `app/[lang]/disenador-web-bilbao/page.tsx` con exactamente la misma estructura que Donostia pero con estos cambios:

- `city` → `{ es: "Bilbao", en: "Bilbao", eu: "Bilbo" }`
- `region` → `{ es: "Bizkaia", en: "Bizkaia", eu: "Bizkaia" }`
- canonical → `/disenador-web-bilbao`
- titles → `"Diseñador Web en Bilbao | Unax Aller"` / `"Web Designer in Bilbao | Unax Aller"` / `"Web Diseinatzailea Bilbon | Unax Aller"`
- descriptions → adaptadas a Bilbao
- `areaServed` en jsonLd → `[{ "@type": "City", name: "Bilbao" }, { "@type": "City", name: "Irun" }, { "@type": "AdministrativeArea", name: "Bizkaia" }]`

- [ ] **Step 3: Crear landing Vitoria-Gasteiz (mismo patrón)**

Crea `app/[lang]/disenador-web-vitoria/page.tsx` con:

- `city` → `{ es: "Vitoria-Gasteiz", en: "Vitoria-Gasteiz", eu: "Gasteiz" }`
- `region` → `{ es: "Álava", en: "Álava", eu: "Araba" }`
- canonical → `/disenador-web-vitoria`
- titles → `"Diseñador Web en Vitoria-Gasteiz | Unax Aller"`
- `areaServed` en jsonLd → `[{ "@type": "City", name: "Vitoria-Gasteiz" }, { "@type": "City", name: "Irun" }, { "@type": "AdministrativeArea", name: "Álava" }]`

- [ ] **Step 4: Commit**

```bash
git add "app/[lang]/disenador-web-donostia/page.tsx" "app/[lang]/disenador-web-bilbao/page.tsx" "app/[lang]/disenador-web-vitoria/page.tsx"
git commit -m "feat: landings de ciudad País Vasco (Donostia, Bilbao, Vitoria)"
```

---

## Task 9: Actualizar sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Añadir las nuevas rutas al sitemap**

Reemplaza el contenido de `app/sitemap.ts` con:

```typescript
import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/data/blog-posts";
import { caseStudies } from "@/lib/data/case-studies";

const BASE_URL = "https://unaxaller.com";
const LOCALES = ["es", "en", "eu"] as const;

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/servicios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sobre-nosotros", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contacto", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/casos", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/disenador-web-donostia", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-bilbao", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-vitoria", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-21");
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}${route.path}`])
          ),
        },
      });
    }

    for (const slug of getAllBlogSlugs()) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/blog/${slug}`])
          ),
        },
      });
    }

    for (const cs of caseStudies) {
      entries.push({
        url: `${BASE_URL}/${locale}/casos/${cs.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/casos/${cs.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: actualizar sitemap con blog, casos y landings de ciudad"
```

---

## Task 10: Añadir enlaces de navegación en Navbar y Footer

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/Footer.tsx` (si existe)

- [ ] **Step 1: Verificar si existe Footer**

```bash
ls components/layout/
```

- [ ] **Step 2: Añadir enlace al blog y casos en el Footer**

En `components/layout/Footer.tsx`, localiza la sección de enlaces y añade:

```tsx
<Link href={`/${locale}/blog`}>
  {locale === "es" ? "Blog" : locale === "en" ? "Blog" : "Bloga"}
</Link>
<Link href={`/${locale}/casos`}>
  {locale === "es" ? "Casos de Estudio" : locale === "en" ? "Case Studies" : "Kasu Azterketak"}
</Link>
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: añadir blog y casos en footer"
```

---

## Task 11: Verificación final y build

- [ ] **Step 1: Ejecutar build de producción para detectar errores TypeScript**

```bash
npm run build
```

Salida esperada: `✓ Compiled successfully` sin errores de tipo.

Si hay errores, son casi siempre del tipo `Promise<params>` sin await — añade `await params` donde falte.

- [ ] **Step 2: Verificar que el sitemap es correcto**

Con el servidor de desarrollo activo (`npm run dev`), visita `http://localhost:3000/sitemap.xml` y comprueba que aparecen las rutas de blog, casos y landings de ciudad.

- [ ] **Step 3: Validar Schema JSON-LD**

Visita estas URLs en el [validador de Schema.org](https://validator.schema.org/):
- `https://unaxaller.com/es/servicios` → debe tener FAQPage + BreadcrumbList
- `https://unaxaller.com/es/precios` → debe tener FAQPage + BreadcrumbList
- `https://unaxaller.com/es/blog/[slug]` → debe tener BlogPosting

- [ ] **Step 4: Commit final y deploy**

```bash
git add .
git commit -m "chore: verificación final build SEO"
```

---

## Acciones fuera del código (hacer manualmente)

Estas acciones no son código pero son críticas para el posicionamiento:

### Inmediatas (semana 1)
1. **Crear Google Business Profile** como service-area business:
   - Ve a [business.google.com](https://business.google.com)
   - Elige "Área de servicio" (no dirección fija)
   - Añade: Irun, Hondarribia, Donostia-San Sebastián, Gipuzkoa, País Vasco
   - Sube foto de perfil real, descripción con keywords, link a web
   - Verifica por postal o videollamada

2. **Pedir reseñas a tus 3 clientes actuales**:
   - Manda un mensaje directo con el link de tu ficha de Google
   - Objetivo: 3 reseñas en el primer mes

3. **Enviar sitemap a Google Search Console**:
   - Ve a [search.google.com/search-console](https://search.google.com/search-console)
   - Añade la propiedad `unaxaller.com`
   - En Sitemaps → Añadir sitemap → `https://unaxaller.com/sitemap.xml`

### Mes 1-3
4. **LinkedIn activo**: publicar 1 post/semana sobre proyectos, casos de estudio o tips de diseño web
5. **Directorios freelance**: crear perfil en Malt, Domestika, Behance con link a unaxaller.com
6. **Responder todas las reseñas de Google** (cuando lleguen)
