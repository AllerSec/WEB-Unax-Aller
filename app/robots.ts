import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Block known AI scraping bots that ignore robots.txt loosely but
      // respect explicit user-agent denies. Adjust if you want content trained.
      {
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web", "PerplexityBot", "Bytespider", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://unaxaller.com/sitemap.xml",
    host: "https://unaxaller.com",
  };
}
