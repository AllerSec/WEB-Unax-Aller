export const SITE_URL = "https://unaxaller.com";
export const LOCALES = ["es", "en", "eu"] as const;
export type Locale = (typeof LOCALES)[number];

export function hreflangAlternates(path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((loc) => [loc, `${SITE_URL}/${loc}${path}`])
  );
  languages["x-default"] = `${SITE_URL}/es${path}`;
  return languages;
}

export function canonicalFor(locale: Locale, path: string) {
  return `${SITE_URL}/${locale}${path}`;
}

export const OG_LOCALE: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
  eu: "eu_ES",
};

export function buildOpenGraph(args: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}) {
  const { locale, title, description, path, type = "website", publishedTime, modifiedTime, authors, tags } = args;
  const primary = OG_LOCALE[locale];
  // Per-page OG image: Next.js exposes the route's opengraph-image.tsx at
  // `<page-url>/opengraph-image`. Locale-aware so the OG matches the page.
  const ogImage = `${SITE_URL}/${locale}${path}/opengraph-image`;
  return {
    type,
    title,
    description,
    url: `${SITE_URL}/${locale}${path}`,
    siteName: "Unax Aller",
    locale: primary,
    alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== primary),
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    ...(publishedTime && { publishedTime }),
    ...(modifiedTime && { modifiedTime }),
    ...(authors && { authors }),
    ...(tags && { tags }),
  };
}

export function buildTwitter(args: {
  title: string;
  description: string;
  locale?: Locale;
  path?: string;
}) {
  const { title, description, locale, path } = args;
  const ogImage =
    locale !== undefined
      ? `${SITE_URL}/${locale}${path ?? ""}/opengraph-image`
      : `${SITE_URL}/opengraph-image`;
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [ogImage],
  };
}
