import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unax Aller: Web para negocio local",
    short_name: "Unax Aller",
    description: "Web para negocios profesionales del País Vasco y Navarra: 149€/mes todo incluido, 0€ inicial, sin permanencia y 30 días de garantía.",
    start_url: "/es",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F8FAFC",
    theme_color: "#0F172A",
    lang: "es",
    categories: ["business", "design", "productivity"],
    icons: [
      {
        src: "/images/brand/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
