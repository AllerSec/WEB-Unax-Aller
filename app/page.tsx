import { permanentRedirect } from "next/navigation";

// 308 redirect to the default locale.
// Avoids Accept-Language sniffing — Googlebot only sees one URL (/es)
// which matches the sitemap canonical and the hreflang x-default.
// Users coming from search engines for other locales land directly
// on /en or /eu through search results, not through this root.
export default function RootPage() {
  permanentRedirect("/es");
}
