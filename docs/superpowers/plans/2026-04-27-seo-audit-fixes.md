# SEO Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar todas las correcciones detectadas en la auditoría SEO/CWV/diseño del sitio unaxaller.com.

**Architecture:** 10 correcciones independientes agrupadas en tareas cohesivas — sitemap hreflang, OG images para city landings, metadata deduplication, CSS accessibility, schema enrichment, CSP header, scroll-behavior guard. El contenido de city-landings ya es bueno (localTouches ricos en todas las ciudades auditadas).

**Tech Stack:** Next.js 16.2, next-intl 4.x, TypeScript, Tailwind CSS 4, ImageResponse (next/og), Edge Runtime

---

### Task 1: Añadir x-default en sitemap hreflang

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Añadir x-default en staticRoutes**

En `app/sitemap.ts`, línea 48-53, el objeto `alternates.languages` no incluye `x-default`. Reemplazar el bloque `alternates` de staticRoutes:

```ts
// Antes (línea 48-52):
alternates: {
  languages: Object.fromEntries(
    LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}${route.path}`])
  ),
},

// Después:
alternates: {
  languages: {
    ...Object.fromEntries(
      LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}${route.path}`])
    ),
    "x-default": `${BASE_URL}/es${route.path}`,
  },
},
```

- [ ] **Step 2: Añadir x-default en blogPosts**

Mismo cambio en el bloque de blogPosts (línea 62-67):

```ts
alternates: {
  languages: {
    ...Object.fromEntries(
      LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/blog/${post.slug}`])
    ),
    "x-default": `${BASE_URL}/es/blog/${post.slug}`,
  },
},
```

- [ ] **Step 3: Añadir x-default en projects**

Mismo cambio en el bloque de projects (línea 76-81):

```ts
alternates: {
  languages: {
    ...Object.fromEntries(
      LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/proyectos/${project.slug}`])
    ),
    "x-default": `${BASE_URL}/es/proyectos/${project.slug}`,
  },
},
```

- [ ] **Step 4: Verificar que el build compila**

```bash
cd "D:\Downloads\Zona-Trabajo\Proyectos\Proyectos-en-Activa\proyectoweb-unaxaller-nuevo"
npx tsc --noEmit
```
Expected: Sin errores de tipo.

---

### Task 2: OG images para city landings y blog

**Files:**
- Create: `app/[lang]/disenador-web-[city]/opengraph-image.tsx` — necesita un archivo compartido
- Create: `app/[lang]/disenador-web-pais-vasco/opengraph-image.tsx`
- Create: `app/[lang]/blog/[slug]/opengraph-image.tsx`
- Create: `app/[lang]/proyectos/[slug]/opengraph-image.tsx`
- Modify: `lib/og-image.tsx` — añadir helper para city landings

**Strategy:** Crear un archivo `opengraph-image.tsx` en cada city landing folder. Dado que hay 16 ciudades, primero extendemos `lib/og-image.tsx` con un helper reutilizable, luego creamos cada archivo con contenido específico mínimo.

- [ ] **Step 1: Extender lib/og-image.tsx con helper para city landings**

```ts
// Añadir al final de lib/og-image.tsx:

type CityOgOptions = {
  cityName: string;
  regionName: string;
  locale: "es" | "en" | "eu";
};

export function renderCityOgImage({ cityName, regionName, locale }: CityOgOptions) {
  const line1Map = {
    es: "Diseñador web en",
    en: "Web designer in",
    eu: "Web diseinatzailea",
  };
  const line2Map = {
    es: `${cityName}, ${regionName}`,
    en: `${cityName}, ${regionName}`,
    eu: `${cityName}n`,
  };
  const subtitleMap = {
    es: `Desde 1.500€ IVA incluido · unaxaller.com`,
    en: `From €1,500 VAT inc. · unaxaller.com`,
    eu: `1.500€-tik BEZ barne · unaxaller.com`,
  };
  return renderOgImage({
    eyebrow: locale === "es" ? "Ciudad" : locale === "en" ? "Location" : "Hiria",
    line1: line1Map[locale],
    line2: line2Map[locale],
    subtitle: subtitleMap[locale],
  });
}
```

- [ ] **Step 2: Crear opengraph-image.tsx para cada city landing**

Crear un archivo idéntico en cada directorio de city landing. Ejemplo para bilbao:

`app/[lang]/disenador-web-bilbao/opengraph-image.tsx`:
```tsx
import { renderCityOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderCityOgImage({ cityName: "Bilbao", regionName: "Bizkaia", locale });
}
```

Ciudades a crear (con cityName y regionName):
- bilbao: "Bilbao", "Bizkaia"
- donostia: "Donostia-San Sebastián", "Gipuzkoa"
- vitoria: "Vitoria-Gasteiz", "Álava"
- hondarribia: "Hondarribia", "Gipuzkoa"
- errenteria: "Errenteria", "Gipuzkoa"
- lasarte: "Lasarte-Oria", "Gipuzkoa"
- eibar: "Eibar", "Gipuzkoa"
- tolosa: "Tolosa", "Gipuzkoa"
- pamplona: "Pamplona", "Navarra"
- logrono: "Logroño", "La Rioja"
- santander: "Santander", "Cantabria"
- pasaia: "Pasaia", "Gipuzkoa"
- zarautz: "Zarautz", "Gipuzkoa"
- getxo: "Getxo", "Bizkaia"
- bermeo: "Bermeo", "Bizkaia"
- pais-vasco: "País Vasco", "Euskadi"

- [ ] **Step 3: Crear opengraph-image.tsx para blog/[slug]**

`app/[lang]/blog/[slug]/opengraph-image.tsx`:
```tsx
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { blogPosts } from "@/lib/data/blog-posts";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { lang, slug } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  const post = blogPosts.find((p) => p.slug === slug);

  return renderOgImage({
    eyebrow: locale === "es" ? "Blog" : "Blog",
    line1: post?.title ?? (locale === "es" ? "Artículo" : locale === "en" ? "Article" : "Artikulua"),
    line2: "",
    subtitle: locale === "es" ? "unaxaller.com/blog" : locale === "en" ? "unaxaller.com/blog" : "unaxaller.com/blog",
  });
}
```

- [ ] **Step 4: Crear opengraph-image.tsx para proyectos/[slug]**

`app/[lang]/proyectos/[slug]/opengraph-image.tsx`:
```tsx
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { projects } from "@/lib/data/projects";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { lang, slug } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  const project = projects.find((p) => p.slug === slug);

  return renderOgImage({
    eyebrow: locale === "es" ? "Proyecto" : locale === "en" ? "Project" : "Proiektua",
    line1: project?.name ?? (locale === "es" ? "Proyecto" : locale === "en" ? "Project" : "Proiektua"),
    line2: "",
    subtitle: locale === "es" ? "Portafolio · unaxaller.com" : locale === "en" ? "Portfolio · unaxaller.com" : "Portafolioa · unaxaller.com",
  });
}
```

- [ ] **Step 5: Verificar types**

```bash
npx tsc --noEmit
```
Expected: Sin errores.

---

### Task 3: Eliminar generateMetadata duplicado del layout

**Files:**
- Modify: `app/[lang]/layout.tsx`

El `generateMetadata` en el layout repite los mismos títulos/descripciones que ya define `app/[lang]/page.tsx`. En Next.js el metadata de la página sobreescribe al del layout, pero es confuso y arriesga colisiones.

- [ ] **Step 1: Eliminar generateMetadata completo del layout**

En `app/[lang]/layout.tsx`, eliminar el bloque completo de `generateMetadata` (líneas 21-66) y el import de `Metadata`. También eliminar `getTranslations` si ya no se usa.

El layout queda:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import CustomCursor from "@/components/shared/CustomCursor";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <link
        rel="preload"
        as="image"
        href="/video/hero-poster.jpg"
        fetchPriority="high"
      />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}";try{if(sessionStorage.getItem("ua-visited"))document.documentElement.classList.add("ua-loader-skip")}catch(e){}`,
        }}
      />
      <a href="#main-content" className="skip-link focusable">
        {locale === "es" ? "Ir al contenido" : locale === "en" ? "Skip to content" : "Edukira joan"}
      </a>
      <PageLoader />
      <CustomCursor />
      <Navbar locale={locale} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer locale={locale} />
      <WhatsAppFloat locale={locale} />
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 2: Verificar que páginas que no definen su propio metadata siguen funcionando**

Las páginas que no tienen `generateMetadata` propio heredarán el title template del root layout (`app/layout.tsx`). Verificar que `/es/privacidad`, `/es/cookies`, `/es/aviso-legal` tienen metadata o que el root layout tiene un title template suficiente.

```bash
npx tsc --noEmit
```

---

### Task 4: Añadir image al nodo LocalBusiness en schema

**Files:**
- Modify: `app/[lang]/page.tsx` (línea ~69)

- [ ] **Step 1: Añadir propiedad image al nodo LocalBusiness**

En `app/[lang]/page.tsx`, en el nodo `LocalBusiness` (aprox línea 65-124), añadir la propiedad `image` después de `logo`:

```ts
// Después de: logo: "https://unaxaller.com/favicon.svg",
image: [
  "https://unaxaller.com/es/opengraph-image",
  "https://unaxaller.com/favicon.svg",
],
```

---

### Task 5: scroll-behavior con prefers-reduced-motion guard

**Files:**
- Modify: `app/globals.css` (línea 158-160)

- [ ] **Step 1: Envolver scroll-behavior en media query**

En `app/globals.css`, la línea 159 tiene `scroll-behavior: smooth` en el selector `html` sin guard. Cambiar:

```css
/* Antes (dentro de html {}): */
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Después: */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

---

### Task 6: Añadir Content-Security-Policy header

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Añadir CSP header**

En `next.config.ts`, dentro del array `headers` existente, añadir CSP al mismo bloque `source: "/(.*)"`:

```ts
{
  key: "Content-Security-Policy",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://images.pexels.com",
    "media-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
},
```

Nota: `unsafe-inline` y `unsafe-eval` son necesarios por GSAP y Next.js hydration. `frame-ancestors 'none'` duplica X-Frame-Options DENY pero es más moderno.

---

### Task 7: Verificar CustomCursor — ya correcto (solo documentar)

**Files:** Ninguno — ya está correcto.

`components/shared/CustomCursor.tsx:15-16` ya tiene:
```ts
if (window.matchMedia("(pointer: coarse)").matches) return;
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

Y `globals.css:172` usa la clase `custom-cursor-active` que solo se añade si se pasan esas guards. ✅ No requiere cambio.

---

### Task 8: Reconsiderar en_GB → quitar región para mayor reach

**Files:**
- Modify: `lib/seo.ts` (línea 19)
- Modify: `app/[lang]/layout.tsx` (si se mantiene algún OG locale)

- [ ] **Step 1: Cambiar en_GB a en_US en OG_LOCALE**

En `lib/seo.ts`, línea 19:
```ts
// Antes:
en: "en_GB",

// Después:
en: "en_US",
```

- [ ] **Step 2: Actualizar el hardcoded en layout.tsx si subsiste**

Si el layout aún tiene `locale === "en" ? "en_GB"` en algún OG, cambiarlo a `en_US`. (Tras Task 3 esto ya no existe en el layout.)

---

## Verificación final

- [ ] `npx tsc --noEmit` — sin errores
- [ ] Confirmar que el sitemap generado en `/sitemap.xml` incluye `x-default` entries
- [ ] Confirmar que `/es/disenador-web-bilbao/opengraph-image` devuelve una imagen válida (status 200)
- [ ] Confirmar que el header CSP aparece en las respuestas HTTP
