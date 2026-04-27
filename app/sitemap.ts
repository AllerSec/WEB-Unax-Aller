import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/data/blog-posts";

const BASE_URL = "https://unaxaller.com";
const LOCALES = ["es", "en", "eu"] as const;

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/servicios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sobre-nosotros", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contacto", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/colabora", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/disenador-web-donostia", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-bilbao", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-vitoria", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-pais-vasco", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-hondarribia", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-errenteria", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-lasarte", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-eibar", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-tolosa", priority: 0.85, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-21");
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
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

    for (const slug of getAllBlogSlugs()) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/blog/${slug}`])
          ),
        },
      });
    }

  }

  return entries;
}
