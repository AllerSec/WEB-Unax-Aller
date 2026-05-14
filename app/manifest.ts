import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unax Aller — Diseño Web Premium",
    short_name: "Unax Aller",
    description: "Diseñador web freelance en Irun, País Vasco. Webs a medida desde 1.500€.",
    start_url: "/es",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#061b0e",
    theme_color: "#061b0e",
    lang: "es",
    categories: ["business", "design", "productivity"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
