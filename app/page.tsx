import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  const preferredLocale = parseAcceptLanguage(acceptLanguage);
  redirect(`/${preferredLocale}`);
}

function parseAcceptLanguage(acceptLanguage: string): "es" | "en" {
  if (!acceptLanguage) return "es";

  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [tag, q] = lang.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of languages) {
    if (tag === "eu" || tag.startsWith("eu-")) continue;
    if (tag === "en" || tag.startsWith("en-")) return "en";
    if (tag === "es" || tag.startsWith("es-")) return "es";
  }

  return "es";
}
