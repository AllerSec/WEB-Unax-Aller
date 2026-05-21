import type { MetadataRoute } from "next";

// Robots policy.
//
// We intentionally allow /_next/static/ — Googlebot needs the CSS/JS/font
// payload to render pages and judge layout shift. Blocking /_next/ wholesale
// was producing "Blocked by robots.txt" warnings in GSC for woff2 assets, so
// we narrow the block to /_next/data and the API surface only.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/"],
        disallow: ["/api/", "/_next/data/"],
      },
      // Known AI scraping bots: leave content open (decision documented).
      {
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai", "Claude-Web", "PerplexityBot", "Bytespider", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://unaxaller.com/sitemap.xml",
    host: "https://unaxaller.com",
  };
}
