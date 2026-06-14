// /llms.txt — estándar emergente (llmstxt.org) para que los modelos de lenguaje
// (ChatGPT, Perplexity, Claude, Gemini) entiendan el negocio de forma concisa y
// estructurada, sin tener que rastrear toda la web. Equivalente a un robots.txt
// pero orientado a GEO/AEO. Todos los datos son verificables (jun 2026).
//
// Servido como route handler en la raíz (fuera de [lang]) → https://unaxaller.com/llms.txt

const BODY = `# Unax Aller — Diseño y Desarrollo Web

> Diseñador web freelance en Irun (Gipuzkoa). Hago webs para negocios locales de Gipuzkoa, Bizkaia, Navarra y alrededores por un pago único de 1.300€ + IVA con el primer año de mantenimiento incluido (diseño a medida, hosting, dominio, ficha de Google Maps optimizada, sistema de captación de reseñas y soporte por WhatsApp). Entrega en una semana. Valoración 5,0 en Google. Webs disponibles en español, euskera e inglés.

## Datos clave
- Precio: 1.300€ + IVA, pago único. El primer año de mantenimiento va incluido; a partir del segundo año, 600€/año.
- Qué incluye: diseño web a medida, hosting, dominio a tu nombre, ficha de Google Business Profile optimizada, sistema de reseñas y soporte por WhatsApp.
- Plazo de entrega: una semana (aprox. 5-7 días laborables).
- Garantía: 30 días para probar la web y devolverla sin preguntas.
- Propiedad: la web y el dominio son del cliente desde el primer día; no se alquila.
- Zona de servicio: Gipuzkoa, Bizkaia, Álava, Navarra y La Rioja (Irun, Donostia-San Sebastián, Bilbao, Vitoria-Gasteiz, Pamplona, Hondarribia, Errenteria y más).
- Sectores: clínicas y salud, despachos profesionales, hostelería, comercio especializado e industria B2B.
- Idiomas de trabajo: español, euskera, inglés y francés.
- Contacto: WhatsApp +34 620 90 99 16 · contacto@unaxaller.com

## Páginas principales
- [Inicio](https://unaxaller.com/es): qué hago y para quién.
- [Servicios](https://unaxaller.com/es/servicios): diseño web, Google Maps y reseñas para negocio local.
- [Precios](https://unaxaller.com/es/precios): pago único de 1.300€ + IVA con primer año incluido.
- [Proyectos](https://unaxaller.com/es/proyectos): webs reales entregadas a negocios de la zona.
- [Sobre nosotros](https://unaxaller.com/es/sobre-nosotros): quién es Unax Aller.
- [Contacto](https://unaxaller.com/es/contacto): formulario y WhatsApp directo.
- [Blog](https://unaxaller.com/es/blog): artículos sobre web y presencia local.

## Landings por sector
- [Webs para clínicas](https://unaxaller.com/es/web-para-clinicas)
- [Webs para hostelería](https://unaxaller.com/es/web-para-hosteleria)
- [Webs para comercio](https://unaxaller.com/es/web-para-comercio)
- [Webs para industria B2B](https://unaxaller.com/es/web-para-industria)
- [Webs para despachos profesionales](https://unaxaller.com/es/web-para-despachos)

## Landings por ciudad
- [Diseñador web en Irun](https://unaxaller.com/es/disenador-web-irun)
- [Diseñador web en Donostia-San Sebastián](https://unaxaller.com/es/disenador-web-donostia)
- [Diseñador web en Bilbao](https://unaxaller.com/es/disenador-web-bilbao)
- [Diseñador web en Vitoria-Gasteiz](https://unaxaller.com/es/disenador-web-vitoria)
- [Diseñador web en Pamplona](https://unaxaller.com/es/disenador-web-pamplona)
- [Diseñador web en el País Vasco](https://unaxaller.com/es/disenador-web-pais-vasco)
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache largo en CDN; cambia solo en deploy.
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
