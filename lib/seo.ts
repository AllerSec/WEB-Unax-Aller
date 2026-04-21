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
