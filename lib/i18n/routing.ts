import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "eu"],
  defaultLocale: "es",
  // Disabled: Accept-Language sniffing forced dynamic rendering on every
  // request (TTFB ~4s on cold Netlify functions). Users land on /es by
  // default; search engines reach /en and /eu through hreflang and sitemap.
  localeDetection: false,
});
