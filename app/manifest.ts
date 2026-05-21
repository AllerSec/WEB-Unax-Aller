import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unax Aller — Renting Web para negocio local",
    short_name: "Unax Aller",
    description: "Renting Web para negocios profesionales del País Vasco y Navarra: 149€/mes, 0€ inicial, 30 días de garantía.",
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
