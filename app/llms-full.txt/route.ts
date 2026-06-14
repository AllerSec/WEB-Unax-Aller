// /llms-full.txt — versión extendida del estándar llmstxt.org. Mientras que
// /llms.txt es un índice conciso, este fichero vuelca TODO el contenido de las
// landings (ciudades + sectores) en un solo documento, para que un modelo de
// lenguaje tenga el contexto completo del negocio sin rastrear página a página.
//
// Se genera dinámicamente a partir de los mismos datos que renderizan las
// páginas (lib/data/*), así que cualquier ciudad o sector nuevo aparece aquí
// automáticamente. Todos los datos son verificables (jun 2026).
//
// Servido como route handler en la raíz → https://unaxaller.com/llms-full.txt

import { cityLandings, getCityLandingContent } from "@/lib/data/city-landings";
import { sectorLandings, getSectorLandingContent } from "@/lib/data/sector-landings";

const LOCALE = "es" as const;
const BASE = "https://unaxaller.com";

const HEADER = `# Unax Aller — Diseño y Desarrollo Web (documento completo)

> Diseñador web freelance en Irun (Gipuzkoa). Hago webs para negocios locales de Gipuzkoa, Bizkaia, Navarra y alrededores por un pago único de 1.300€ + IVA con el primer año de mantenimiento incluido (diseño a medida, hosting, dominio, ficha de Google Maps optimizada, sistema de captación de reseñas y soporte por WhatsApp). Entrega en una semana. Valoración 5,0 en Google. Webs disponibles en español, euskera e inglés.

Este es el documento extendido (llms-full): incluye el contenido completo de todas las landings por ciudad y por sector. Para un índice conciso, ver https://unaxaller.com/llms.txt

## Datos clave
- Precio: 1.300€ + IVA, pago único. El primer año de mantenimiento va incluido; a partir del segundo año, 600€/año.
- Qué incluye: diseño web a medida, hosting, dominio a tu nombre, ficha de Google Business Profile optimizada, sistema de reseñas y soporte por WhatsApp.
- Plazo de entrega: una semana (aprox. 5-7 días laborables).
- Garantía: 30 días para probar la web y devolverla sin preguntas.
- Propiedad: la web y el dominio son del cliente desde el primer día; no se alquila.
- Zona de servicio: Gipuzkoa, Bizkaia, Álava, Navarra y La Rioja.
- Sectores: clínicas y salud, despachos profesionales, hostelería, comercio especializado e industria B2B.
- Idiomas de trabajo: español, euskera, inglés y francés.
- Contacto: WhatsApp +34 620 90 99 16 · contacto@unaxaller.com

## Páginas principales
- [Inicio](${BASE}/es): qué hago y para quién.
- [Servicios](${BASE}/es/servicios): diseño web, Google Maps y reseñas para negocio local.
- [Precios](${BASE}/es/precios): pago único de 1.300€ + IVA con primer año incluido.
- [Proyectos](${BASE}/es/proyectos): webs reales entregadas a negocios de la zona.
- [Sobre nosotros](${BASE}/es/sobre-nosotros): quién es Unax Aller.
- [Contacto](${BASE}/es/contacto): formulario y WhatsApp directo.
- [Blog](${BASE}/es/blog): artículos sobre web y presencia local.`;

function buildCitySections(): string {
  return cityLandings
    .map((def) => {
      const content = getCityLandingContent(def, LOCALE);
      const url = `${BASE}/${LOCALE}/${def.slug}`;
      const city = def.cityNames[LOCALE];
      const region = def.regionNames[LOCALE];
      const touches = def.localTouches?.[LOCALE] ?? [];

      const parts: string[] = [
        `### Diseñador web en ${city} (${region})`,
        url,
        "",
        content.intro,
      ];

      if (touches.length) {
        parts.push("", touches.join("\n\n"));
      }

      if (content.faq.length) {
        parts.push("", `**Preguntas frecuentes — ${city}**`);
        for (const { q, a } of content.faq) {
          parts.push("", `P: ${q}`, `R: ${a}`);
        }
      }

      return parts.join("\n");
    })
    .join("\n\n---\n\n");
}

function buildSectorSections(): string {
  return sectorLandings
    .map((def) => {
      const content = getSectorLandingContent(def, LOCALE);
      const url = `${BASE}/${LOCALE}/${def.slug}`;
      const sector = def.sectorNames[LOCALE];
      const touches = def.touches?.[LOCALE] ?? [];

      const parts: string[] = [
        `### Webs para ${sector}`,
        url,
        "",
        content.intro,
      ];

      if (touches.length) {
        parts.push("", touches.join("\n\n"));
      }

      if (content.faq.length) {
        parts.push("", `**Preguntas frecuentes — ${sector}**`);
        for (const { q, a } of content.faq) {
          parts.push("", `P: ${q}`, `R: ${a}`);
        }
      }

      return parts.join("\n");
    })
    .join("\n\n---\n\n");
}

function buildBody(): string {
  return [
    HEADER,
    "## Landings por ciudad",
    buildCitySections(),
    "## Landings por sector",
    buildSectorSections(),
  ].join("\n\n");
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildBody(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache largo en CDN; cambia solo en deploy.
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
