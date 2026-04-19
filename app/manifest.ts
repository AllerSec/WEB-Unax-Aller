import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unax Aller — Diseño y Desarrollo Web Premium",
    short_name: "Unax Aller",
    description:
      "Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados.",
    start_url: "/es",
    display: "standalone",
    background_color: "#faf9f4",
    theme_color: "#061b0e",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
