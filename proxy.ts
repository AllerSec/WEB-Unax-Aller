import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

export default createMiddleware(routing);

// Orphan/legacy paths (see next.config.ts `redirects()`) must be excluded
// here too. Without the exclusion this middleware runs first, prefixes them
// with the default locale (/mes -> /es/mes), and next.config.ts's redirect
// for the un-prefixed path never gets a chance to match -> 404.
export const config = {
  matcher: [
    "/((?!api|_next|_vercel|mes|home|inicio|colabora|portfolioa|casos|.*\\..*).*)",
  ],
};
