import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blog-posts";
import { projects } from "@/lib/data/projects";

const BASE_URL = "https://unaxaller.com";
const LOCALES = ["es", "en", "eu"] as const;

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/servicios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/precios", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sobre-nosotros", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contacto", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/proyectos", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/disenador-web-irun", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/disenador-web-donostia", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-bilbao", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-vitoria", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-pais-vasco", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-hondarribia", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-errenteria", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-lasarte", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-eibar", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-tolosa", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-pamplona", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/disenador-web-logrono", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-santander", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/disenador-web-pasaia", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/disenador-web-zarautz", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/disenador-web-getxo", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/disenador-web-bermeo", priority: 0.8, changeFrequency: "monthly" as const },
  // Sector landings
  { path: "/web-para-clinicas", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/web-para-hosteleria", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/web-para-comercio", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/web-para-industria", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/web-para-despachos", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Sitemap is rebuilt with the project, so build time is the natural
  // lastModified for static routes (it changes whenever copy or layout ships).
  const buildTime = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: buildTime,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}${route.path}`])
            ),
            "x-default": `${BASE_URL}/es${route.path}`,
          },
        },
      });
    }

    for (const post of blogPosts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            ...Object.fromEntries(
              LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/blog/${post.slug}`])
            ),
            "x-default": `${BASE_URL}/es/blog/${post.slug}`,
          },
        },
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${BASE_URL}/${locale}/proyectos/${project.slug}`,
        // Project shipped that year; lastModified anchors to the project year.
        lastModified: new Date(`${project.year}-12-31`),
        changeFrequency: "yearly" as const,
        priority: 0.85,
        alternates: {
          languages: {
            ...Object.fromEntries(
              LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/proyectos/${project.slug}`])
            ),
            "x-default": `${BASE_URL}/es/proyectos/${project.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
