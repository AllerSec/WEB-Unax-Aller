import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["gsap", "@gsap/react"],
  },
  async redirects() {
    return [
      // Legacy paths without locale prefix → canonical ES version
      { source: "/sobre-nosotros", destination: "/es/sobre-nosotros", permanent: true },
      { source: "/disenador-web-pasaia", destination: "/es/disenador-web-pasaia", permanent: true },
      { source: "/disenador-web-logrono", destination: "/es/disenador-web-logrono", permanent: true },
      { source: "/disenador-web-santander", destination: "/es/disenador-web-santander", permanent: true },
      { source: "/proyectos/virtuosolve", destination: "/es/proyectos/virtuosolve", permanent: true },
      { source: "/blog/:slug", destination: "/es/blog/:slug", permanent: true },
      // Old /casos/ paths → /proyectos/
      { source: "/casos/:slug", destination: "/es/proyectos/:slug", permanent: true },
      { source: "/:lang/casos/:slug", destination: "/:lang/proyectos/:slug", permanent: true },
      // Old .html extensions
      { source: "/:lang/servicios.html", destination: "/:lang/servicios", permanent: true },
      { source: "/:lang/zerbitzuak.html", destination: "/:lang/servicios", permanent: true },
      // Orphan paths
      { source: "/mes", destination: "/es", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.pexels.com",
              "media-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
