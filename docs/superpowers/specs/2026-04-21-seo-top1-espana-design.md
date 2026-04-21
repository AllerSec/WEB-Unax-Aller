# SEO Top 1 España — Diseño de Estrategia

**Fecha:** 2026-04-21
**Objetivo:** Posicionar unaxaller.com top 1 en búsquedas de diseñador web, escalando de Irun → País Vasco → España
**Dominio actual:** unaxaller.com (Next.js 16.2, 3 idiomas, Netlify)

---

## Contexto

Unax Aller es diseñador web freelance en Irun (Gipuzkoa). Trabaja desde casa (sin oficina física). Tiene proyectos reales con métricas pero sin reseñas en Google. La web tiene buena base técnica SEO (metadata, Schema LocalBusiness, sitemap, hreflang) pero le faltan capas clave de autoridad y contenido.

En 2026, Google premia E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). El contenido IA sin experiencia humana real no posiciona. La ventaja de Unax frente a agencias es ser una persona real con proyectos reales y nombre propio.

---

## Arquitectura de la Estrategia

### Capa 1 — Presencia local (Google Business Profile)
- Crear ficha como **service-area business** (sin dirección pública)
- Área de servicio: Irun, Hondarribia, Donostia, Gipuzkoa, País Vasco
- Completar al 100%: foto, descripción con keywords, servicios, horario, enlace web
- Conseguir reseñas con velocidad constante (1-2/mes), responder todas
- Factor de ranking nº1 para búsquedas locales y Google Maps

### Capa 2 — E-E-A-T en la web
- Página `sobre-nosotros` reescrita con bio extensa: nombre completo, foto real, estudios, proyectos, idiomas
- Schema `Person` propio en `/sobre-nosotros` además del existente en homepage
- Sección de autor en cada artículo del blog con foto + bio corta
- LinkedIn activo con casos de estudio (refuerza E-E-A-T del dominio)

### Capa 3 — Casos de estudio (contenido único)
- Una página por proyecto real: `/es/casos/[nombre-proyecto]`
- Estructura: cliente, problema, solución, métricas (Lighthouse, velocidad, conversiones)
- Schema `Article` + `ItemList` para listar casos en `/servicios`
- Esto es lo que las agencias no tienen: experiencia real documentada

### Capa 4 — Blog con IA + voz humana
- Sección `/es/blog/` con artículos SEO
- Proceso: borrador IA → Unax añade 1-2 párrafos de experiencia real → publicar
- Cadencia: 2 artículos/mes mínimo
- Pirámide de keywords:
  - **Local:** "diseñador web Hondarribia", "web para restaurantes Donostia-San Sebastián", "diseño web Bilbao"
  - **Regional:** "diseñador web freelance País Vasco", "diseño web Gipuzkoa"
  - **Nacional:** "diseñador web freelance España", "cuánto cuesta una página web en España", "diseñador web para pequeños negocios"
- Cada artículo: H1 con keyword, meta description única, imagen optimizada, 2+ enlaces internos

### Capa 5 — Landing pages por ciudad
- Páginas estáticas con contenido único (no duplicado) para ciudades clave
- Fase País Vasco: `/es/diseñador-web-donostia`, `/es/diseñador-web-bilbao`, `/es/diseñador-web-vitoria`
- Fase España (mes 4+): Madrid, Barcelona, Valencia, Sevilla, Zaragoza, Málaga
- Cada landing: H1 con ciudad, descripción local, testimonios/casos de esa zona si los hay, CTA

### Capa 6 — Mejoras técnicas pendientes
- Añadir Schema `FAQPage` en `/servicios` y `/precios`
- Añadir Schema `BreadcrumbList` en todas las páginas interiores
- Mejorar página `/sobre-nosotros` con Schema `Person` completo
- Verificar redirect de raíz `/` → `/es` para no perder indexación
- Página 404 con enlaces internos útiles
- Optimizar `openingHours` en Schema para reflejar disponibilidad freelance real

### Capa 7 — AEO (Answer Engine Optimization)
- Estructurar secciones FAQ que respondan preguntas concretas de los usuarios
- Ejemplos: "¿Cuánto cuesta una página web en España?", "¿Qué incluye el diseño web?", "¿Cuánto tarda en hacerse una web?"
- Objetivo: aparecer en AI Overviews de Google (SGE) y en respuestas de ChatGPT/Perplexity

### Capa 8 — Link building y menciones
- Directorios freelance: Malt, Domestika, Behance, LinkedIn, DesignRush
- Medios locales: prensa de Irun/Gipuzkoa (nota de prensa como freelance local)
- Colaboraciones: artículos como invitado en blogs de diseño/marketing españoles
- No comprar enlaces — Google penaliza en 2026

---

## Roadmap por fases

| Fase | Meses | Acciones principales | Objetivo de ranking |
|------|-------|---------------------|---------------------|
| 1 — Fundamentos | 1-4 semanas | Google Business Profile + reseñas + E-E-A-T web + casos de estudio | Aparecer en Maps Irun |
| 2 — Contenido local | 1-3 meses | Blog (keywords locales) + landings País Vasco + mejoras técnicas | Top 1 Irun, Top 3 Gipuzkoa |
| 3 — Expansión regional | 3-6 meses | Blog (keywords regionales) + más reseñas + LinkedIn activo | Top 1 Gipuzkoa, Top 5 País Vasco |
| 4 — Nacional | 6-12 meses | Landings España + blog nacional + link building | Primera página España |
| 5 — Top 1 España | 12-24 meses | Autoridad consolidada + menciones + AEO | Top 1-3 España |

---

## Expectativas realistas

| Búsqueda | Tiempo estimado |
|----------|-----------------|
| "diseñador web Irun" | 2-4 meses |
| "diseñador web Gipuzkoa" | 4-6 meses |
| "diseñador web País Vasco" | 6-9 meses |
| Primera página "diseñador web España" | 12-18 meses |
| Top 1-3 "diseñador web España" | 18-24 meses |

---

## Componentes técnicos a implementar en la web

### Nuevas rutas
- `app/[lang]/blog/page.tsx` — listado de artículos
- `app/[lang]/blog/[slug]/page.tsx` — artículo individual con Schema Article
- `app/[lang]/casos/page.tsx` — listado de casos de estudio
- `app/[lang]/casos/[slug]/page.tsx` — caso de estudio individual
- `app/[lang]/diseñador-web-[ciudad]/page.tsx` — landings de ciudad (o ruta dinámica)

### Schemas nuevos
- `FAQPage` en `/servicios` y `/precios`
- `BreadcrumbList` en todas las páginas interiores
- `Article` + `Person` (author) en artículos de blog
- `CaseStudy` / `Article` en casos de estudio
- `Person` standalone en `/sobre-nosotros`

### Contenido
- Bio extensa en `/sobre-nosotros` (500+ palabras, foto, credenciales)
- Mínimo 3 casos de estudio iniciales
- 4 artículos de blog iniciales (antes del lanzamiento del blog)
- FAQ en `/servicios` y `/precios` (5-8 preguntas cada una)

---

## Lo que NO se hará
- No comprar enlaces (penalización Google 2026)
- No generar contenido IA masivo sin revisión humana
- No duplicar contenido entre landings de ciudad
- No hacer keyword stuffing en títulos/descripciones
