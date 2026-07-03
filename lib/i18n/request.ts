import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "es" | "en" | "eu" | "fr")) {
    locale = routing.defaultLocale;
  }

  const messages = await import(`./${locale}`);

  return {
    locale,
    messages: messages.default,
  };
});
