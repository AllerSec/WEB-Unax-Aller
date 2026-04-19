import type { MetadataRoute } from "next";

const BASE_URL = "https://unaxaller.com";
const LOCALES = ["es", "en", "eu"] as const;

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/servicios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sobre-nosotros", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contacto", priority: 0.8, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of routes) {
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
  }

  return entries;
}
