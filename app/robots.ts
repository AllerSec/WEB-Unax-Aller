import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/gym", "/gym/", "/gymstats", "/gymstats/"],
      },
    ],
    sitemap: "https://unaxaller.com/sitemap.xml",
    host: "https://unaxaller.com",
  };
}
