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
  en: "en_GB",
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
        url: `${SITE_URL}/opengraph-image`,
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

export function buildTwitter(args: { title: string; description: string }) {
  return {
    card: "summary_large_image" as const,
    title: args.title,
    description: args.description,
    images: [`${SITE_URL}/opengraph-image`],
  };
}
