import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.microlink.io" },
      { protocol: "https", hostname: "s.microlink.io" },
    ],
  },
  experimental: {
    optimizePackageImports: ["gsap", "framer-motion"],
  },
  async rewrites() {
    return [
      { source: "/gym", destination: "/gymstats/index.html" },
      { source: "/gym/", destination: "/gymstats/index.html" },
      { source: "/gym/:path*", destination: "/gymstats/:path*" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path(gym|gymstats)(/.*)?",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
