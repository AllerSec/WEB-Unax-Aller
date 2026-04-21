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
  {
    slug: "seo-local-irun-gipuzkoa",
    publishedAt: "2026-04-15",
    readingTime: 7,
    titles: {
      es: "SEO local en Irun y Gipuzkoa: guía práctica 2026",
      en: "Local SEO in Irun and Gipuzkoa: practical guide 2026",
      eu: "SEO lokala Irunen eta Gipuzkoan: 2026ko gida praktikoa",
    },
    descriptions: {
      es: "Cómo posicionar un negocio en Google Maps y búsquedas locales en Irun y Gipuzkoa. Google Business Profile, reseñas, Schema local y estrategia de contenido.",
      en: "How to rank a business on Google Maps and local searches in Irun and Gipuzkoa. Google Business Profile, reviews, local Schema and content strategy.",
      eu: "Nola posizionatu negozio bat Google Mapsen eta bilaketa lokaletan Irunen eta Gipuzkoan. Google Business Profile, iritziak, Schema lokala eta eduki estrategia.",
    },
    content: {
      es: `El SEO local es la diferencia entre aparecer cuando alguien busca "restaurante en Irun" y ser invisible. Esta guía te explica qué funciona de verdad en 2026.

## Los tres pilares del SEO local

**1. Google Business Profile optimizado:** tu ficha es tu web en Google Maps. Categorías correctas, horario, fotos reales, publicaciones semanales.

**2. Reseñas auténticas:** Google prioriza perfiles con reseñas recientes. Meta: 5 reseñas en 30 días, luego 1-2 al mes.

**3. Señales locales en tu web:** Schema LocalBusiness, NAP (Nombre, Dirección, Teléfono) consistente en toda la web, contenido que mencione Irun, Hondarribia, Gipuzkoa.

## Errores típicos en negocios de Gipuzkoa

- **NAP inconsistente:** diferente dirección en Google Business, en la web y en Páginas Amarillas. Google lo detecta y penaliza.
- **Categoría principal mal elegida:** "Tienda" en vez de "Panadería artesanal". La categoría principal es la más importante.
- **Sin contenido local:** la web no menciona Irun, ni el barrio, ni los barrios vecinos. Si Google no ve señales locales, no te muestra en resultados locales.
- **Cero reseñas o todas de golpe:** 10 reseñas en un día es bandera roja. Google prefiere un goteo constante.

## Estrategia concreta para Irun / Gipuzkoa

1. **Reclamar Google Business Profile** con dirección real en Irun
2. **Categoría primaria:** la más específica que describa tu negocio
3. **Área de servicio:** Irun, Hondarribia, Fuenterrabía, Behobia, Oiartzun
4. **Publicar 1 post/semana** en el perfil (ofertas, novedades, fotos)
5. **Pedir reseñas** a clientes contentos — plantilla por WhatsApp el mismo día de la compra
6. **En la web:** Schema LocalBusiness, página de contacto con dirección y mapa, contenido que mencione barrios concretos

## Señales extra que marcan diferencia

- **Enlaces desde webs locales:** Cámara de Comercio Gipuzkoa, Diario Vasco, blogs de gastronomía de Irun
- **Citas NAP** en directorios vascos: Guía Local Gipuzkoa, Irunpedia, asociaciones de comerciantes
- **Contenido estacional:** "Mejores terrazas en Hondarribia en verano", "Rebajas en comercios de Irun en enero"

Con estos ingredientes bien hechos, pasas del puesto 30 al top 3 en 3-6 meses. No hay magia, hay consistencia.`,
      en: `Local SEO is the difference between showing up when someone searches "restaurant in Irun" and being invisible. This guide explains what actually works in 2026.

## The three pillars of local SEO

**1. Optimized Google Business Profile:** your listing is your website on Google Maps. Correct categories, hours, real photos, weekly posts.

**2. Authentic reviews:** Google prioritises profiles with recent reviews. Goal: 5 reviews in 30 days, then 1-2 a month.

**3. Local signals on your site:** LocalBusiness Schema, consistent NAP (Name, Address, Phone) across your site, content mentioning Irun, Hondarribia, Gipuzkoa.

## Typical mistakes in Gipuzkoa businesses

- **Inconsistent NAP:** different addresses on Google Business, on the site and on Yellow Pages. Google detects and penalises this.
- **Wrong primary category:** "Shop" instead of "Artisan bakery". The primary category is the most important.
- **No local content:** the site doesn't mention Irun, the district, or neighbouring towns. No local signals → no local results.
- **Zero reviews or all at once:** 10 reviews in a day is a red flag. Google prefers a steady trickle.

## Concrete strategy for Irun / Gipuzkoa

1. **Claim Google Business Profile** with real Irun address
2. **Primary category:** the most specific one that describes your business
3. **Service area:** Irun, Hondarribia, Fuenterrabía, Behobia, Oiartzun
4. **Publish 1 post/week** on the profile (offers, news, photos)
5. **Ask for reviews** from happy customers — WhatsApp template same day as purchase
6. **On the site:** LocalBusiness Schema, contact page with address and map, content mentioning specific districts

## Extra signals that make a difference

- **Links from local sites:** Gipuzkoa Chamber of Commerce, Diario Vasco, Irun gastronomy blogs
- **NAP citations** in Basque directories: Guía Local Gipuzkoa, Irunpedia, merchant associations
- **Seasonal content:** "Best terraces in Hondarribia in summer", "January sales in Irun shops"

With these ingredients done well, you move from position 30 to top 3 in 3-6 months. No magic, just consistency.`,
      eu: `SEO lokala da "jatetxea Irunen" bilatzen duenean agertzearen eta ikusezina izatearen arteko aldea. Gida honek 2026an benetan funtzionatzen duena azaltzen dizu.

## SEO lokalaren hiru zutabeak

**1. Google Business Profile optimizatua:** zure fitxa zure weba da Google Mapsen. Kategoria zuzenak, ordutegia, argazki errealak, asteroko posts-ak.

**2. Benetako iritziak:** Googlek iritzi berriak dituzten profilak lehenesten ditu. Helburua: 5 iritzi 30 egunetan, gero 1-2 hilean.

**3. Seinale lokalak zure weban:** LocalBusiness Schema, NAP (Izena, Helbidea, Telefonoa) koherentea web osoan, Irun, Hondarribia eta Gipuzkoa aipatzen dituen edukia.

## Gipuzkoako negozioetan ohiko akatsak

- **NAP ez-koherentea:** helbide desberdina Google Business-en, weban eta Orrialde Horietan. Googlek hori detektatzen du eta zigortu egiten du.
- **Kategoria nagusi oker:** "Denda" "Okindegi artisaua" beharrean. Kategoria nagusia da garrantzitsuena.
- **Eduki lokalik ez:** webak ez du Irun, auzoa, ezta inguruko herriak ere aipatzen.
- **Iritzirik ez edo denak batera:** 10 iritzi egun batean bandera gorria da.

Osagai hauek ondo eginda, 30. postutik top 3-era igarotzen zara 3-6 hilabetetan.`,
    },
    tags: ["SEO local", "Irun", "Gipuzkoa", "Google Business Profile", "negocio local"],
    keywords: {
      es: [
        "SEO local Irun",
        "SEO local Gipuzkoa",
        "Google Business Profile Irun",
        "posicionar negocio Gipuzkoa",
        "reseñas Google negocio local",
      ],
      en: ["local SEO Irun", "local SEO Gipuzkoa", "Google Business Profile Basque Country"],
      eu: ["SEO lokala Irunen", "SEO lokala Gipuzkoan", "Google Business Profile Euskadi"],
    },
  },
  {
    slug: "web-multi-idioma-euskera-castellano-ingles",
    publishedAt: "2026-04-08",
    readingTime: 6,
    titles: {
      es: "Web multi-idioma: castellano, euskera e inglés sin romper el SEO",
      en: "Multi-language website: Spanish, Basque and English without breaking SEO",
      eu: "Hizkuntza anitzeko weba: gaztelania, euskara eta ingelesa SEOa hautsi gabe",
    },
    descriptions: {
      es: "Cómo montar una web trilingüe (castellano, inglés, euskera) con URLs correctas, hreflang y contenido traducido de verdad. Sin plugins frágiles.",
      en: "How to build a trilingual website (Spanish, English, Basque) with proper URLs, hreflang and genuinely translated content. No fragile plugins.",
      eu: "Nola egin hiru hizkuntzatako weba (gaztelania, ingelesa, euskara) URL egokiekin, hreflangekin eta benetan itzulitako edukiarekin.",
    },
    content: {
      es: `En el País Vasco, muchos negocios necesitan web en castellano, euskera e inglés. La mayoría lo hace mal — plugin de traducción automática, URLs rotas, penalización SEO. Así se hace bien.

## Los tres errores típicos

**1. Plugin de traducción automática (Google Translate widget):** Google ignora el contenido traducido. No indexa nada. No posicionas en inglés ni en euskera.

**2. Subdominios sin hreflang:** \`en.tuweb.com\` sin etiquetas \`hreflang\` → Google no sabe cuál mostrar a cada usuario.

**3. Traducir solo menús:** contenido sigue en castellano pero navegación en inglés. El usuario llega y se siente engañado. Alto bounce rate.

## Cómo se hace bien

**Estructura de URLs:** subcarpetas por idioma \`/es/\`, \`/en/\`, \`/eu/\`. Cada página tiene su propia URL por idioma.

**hreflang correcto:** en cada página, \`<link rel="alternate" hreflang="es" href="..." />\` para cada idioma, más \`x-default\`.

**Contenido traducido de verdad:** textos escritos por humano o revisados. Traducción automática → posicionas a 0.

**Metadatos por idioma:** title, description, OG tags cada uno en su idioma. No reutilizar el castellano con un prefijo.

## Euskera: particularidades

- **Declinaciones:** "Bilbo" → "Bilbon", "Donostia" → "Donostiara". Las ciudades se declinan. Si no, suena a traductor.
- **Términos:** "webgunea" (página web), "diseinatzailea" (diseñador). No usar anglicismos cuando hay término vasco.
- **Euskera batua:** usa el estándar, no dialectos, a menos que tu público sea muy local.

## SEO por idioma

Cada idioma compite por sus keywords. "Diseñador web Irun" (es), "web designer Irun" (en), "web diseinatzailea Irunen" (eu). Son búsquedas distintas con competencia distinta.

Una web trilingüe bien hecha te da 3 veces más superficie de ataque en Google. Una mal hecha te penaliza en las 3.`,
      en: `In the Basque Country, many businesses need websites in Spanish, Basque and English. Most do it wrong — auto-translation plugin, broken URLs, SEO penalty. Here's how to do it right.

## The three typical mistakes

**1. Auto-translation plugin (Google Translate widget):** Google ignores translated content. Doesn't index anything. You don't rank in English or Basque.

**2. Subdomains without hreflang:** \`en.yoursite.com\` without \`hreflang\` tags → Google doesn't know which to show each user.

**3. Translating only menus:** content stays in Spanish but navigation is in English. High bounce rate.

## How to do it right

**URL structure:** language subfolders \`/es/\`, \`/en/\`, \`/eu/\`. Each page has its own URL per language.

**Proper hreflang:** on each page, \`<link rel="alternate" hreflang="es" href="..." />\` for each language, plus \`x-default\`.

**Genuinely translated content:** human-written or reviewed. Machine translation → you rank at 0.

**Per-language metadata:** title, description, OG tags each in its language.

## Basque: specifics

- **Declensions:** "Bilbo" → "Bilbon". Cities are declined. Otherwise it sounds like a translator.
- **Terms:** "webgunea" (website), "diseinatzailea" (designer). Don't use anglicisms when there's a Basque term.
- **Euskera batua:** use the standard, not dialects, unless your audience is very local.

A well-done trilingual website gives you 3× more Google attack surface. A badly-done one penalises you in all three.`,
      eu: `Euskal Herrian, negozio askok web gaztelaniaz, euskaraz eta ingelesez behar dute. Gehienek gaizki egiten dute — itzulpen automatikoko plugina, URL hautsiak, SEO zigorra. Honela egiten da ondo.

## Hiru akats tipikoak

**1. Itzulpen automatikoa (Google Translate widget):** Googlek ez du itzulitako edukia indexatzen.

**2. Azpidomeinuak hreflang gabe:** \`en.zureweb.com\` hreflang etiketarik gabe.

**3. Menuak bakarrik itzultzea:** edukia gaztelaniaz jarraitzen du baina nabigazioa ingelesez.

## Nola egiten den ondo

**URL egitura:** hizkuntzako azpikarpetak \`/es/\`, \`/en/\`, \`/eu/\`.

**hreflang zuzena:** orrialde bakoitzean hizkuntza bakoitzerako.

**Benetan itzulitako edukia:** gizakiak idatzita edo berrikusita. Itzulpen automatikoa → 0an rankeatzen duzu.

Ondo egindako hiru hizkuntzatako webak 3 aldiz eraso azalera gehiago ematen dizu Googlen.`,
    },
    tags: ["multi-idioma", "euskera", "hreflang", "internacionalización", "SEO"],
    keywords: {
      es: [
        "web multi-idioma España",
        "web en euskera",
        "hreflang SEO",
        "web trilingüe País Vasco",
        "next-intl",
      ],
      en: ["multi-language website", "Basque language website", "hreflang SEO", "trilingual website"],
      eu: ["hizkuntza anitzeko weba", "webgunea euskaraz", "hreflang SEO"],
    },
  },
  {
    slug: "disenador-web-freelance-vs-agencia",
    publishedAt: "2026-04-01",
    readingTime: 5,
    titles: {
      es: "Diseñador web freelance vs agencia: ¿qué elegir en 2026?",
      en: "Freelance web designer vs agency: what to choose in 2026?",
      eu: "Web diseinatzaile freelance vs agentzia: zer aukeratu 2026an?",
    },
    descriptions: {
      es: "Comparativa honesta entre contratar a un diseñador web freelance o una agencia. Precio, comunicación, calidad, mantenimiento. Sin humo.",
      en: "Honest comparison between hiring a freelance web designer or an agency. Price, communication, quality, maintenance. No fluff.",
      eu: "Konparaketa zintzoa web diseinatzaile freelance bat ala agentzia bat kontratatzearen artean. Prezioa, komunikazioa, kalitatea.",
    },
    content: {
      es: `Esta es la duda que me plantean casi todos los clientes potenciales: ¿freelance o agencia? No hay respuesta universal. Depende. Esta guía te ayuda a decidir.

## Lo que ofrece un freelance (como yo)

- **Precio más bajo:** no pago alquiler de oficina ni salarios. 1.300€ IVA incluido para una web completa.
- **Comunicación directa:** hablas con quien hace el trabajo. Sin intermediarios ni "te pasamos con tu gestor".
- **Flexibilidad:** proyectos adaptados, no paquetes cerrados.
- **Implicación personal:** mi reputación depende de cada proyecto.

## Lo que ofrece una agencia

- **Equipo multidisciplinar:** diseñador, desarrollador, copywriter, SEO, project manager. Todo en uno.
- **Capacidad:** pueden abordar 10 proyectos a la vez. Un freelance, 2-3.
- **Procesos establecidos:** metodologías probadas, contratos robustos.
- **Respaldo:** si cae enfermo el diseñador, otro lo coge.

## Cuándo elegir freelance

- Presupuesto menor a 5.000€
- Negocio pequeño o mediano
- Valoras trato directo y rapidez de decisión
- Proyecto de 1-3 meses

## Cuándo elegir agencia

- Presupuesto mayor a 10.000€
- Proyecto con muchas partes (app + web + marketing + branding)
- Necesitas equipo grande en plazo corto
- Empresa grande con procesos formales de compra

## Lo que NO debes hacer

Elegir por precio de forma aislada. Un freelance barato sin cartera es peor que una agencia cara. Una agencia que promete "10.000€ y web en 7 días" te va a entregar plantilla.

Mira: cartera, casos reales, reseñas, comunicación inicial. Ahí está la señal.`,
      en: `This is the question almost every potential client asks me: freelance or agency? There's no universal answer. It depends. This guide helps you decide.

## What a freelancer offers (like me)

- **Lower price:** no office rent or salaries to pay. €1,300 VAT included for a complete website.
- **Direct communication:** you talk to the person doing the work.
- **Flexibility:** adapted projects, not closed packages.
- **Personal stake:** my reputation depends on every project.

## What an agency offers

- **Multidisciplinary team:** designer, developer, copywriter, SEO, PM.
- **Capacity:** they can handle 10 projects at once. A freelancer, 2-3.
- **Established processes:** proven methodologies, robust contracts.
- **Backup:** if the designer falls ill, another takes over.

## When to choose a freelancer

- Budget under €5,000
- Small or mid-sized business
- You value direct dealing and quick decisions
- 1-3 month project

## When to choose an agency

- Budget over €10,000
- Project with many parts (app + web + marketing + branding)
- Need a large team in a short timeframe
- Large company with formal procurement

## What NOT to do

Choose on price alone. A cheap freelancer with no portfolio is worse than a pricey agency. An agency promising "€10,000 and website in 7 days" will deliver a template.

Look at: portfolio, real cases, reviews, initial communication. That's the signal.`,
      eu: `Bezero potentzial gehienek egiten didaten galdera: freelance ala agentzia? Ez dago erantzun unibertsalik. Araberakoa da.

## Freelance batek eskaintzen duena

- **Prezio baxuagoa:** 1.300€ BEZ barne web oso batentzat.
- **Komunikazio zuzena:** lana egiten duenarekin hitz egiten duzu.
- **Malgutasuna:** moldatutako proiektuak.

## Agentzia batek eskaintzen duena

- **Talde diziplina anitzeko taldea:** diseinatzailea, garatzailea, copywriter-a, SEO.
- **Gaitasuna:** aldi berean 10 proiektu. Freelance batek, 2-3.

## Noiz aukeratu freelance

- 5.000€tik beherako aurrekontua
- Negozio txikia edo ertaina
- Tratu zuzena baloratzen duzu

## Noiz aukeratu agentzia

- 10.000€tik gorako aurrekontua
- Zati askotako proiektua
- Talde handia behar duzu epe laburrean`,
    },
    tags: ["freelance", "agencia", "comparativa", "contratación web"],
    keywords: {
      es: [
        "diseñador web freelance vs agencia",
        "cuánto cobra un diseñador web freelance",
        "elegir diseñador web",
        "agencia diseño web España",
      ],
      en: ["freelance web designer vs agency", "choose web designer"],
      eu: ["web diseinatzaile freelance edo agentzia"],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];
  const scored = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt));
  return scored.slice(0, limit).map((s) => s.post);
}
