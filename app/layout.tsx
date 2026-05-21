import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Lexend } from "next/font/google";
import "./globals.css";

// Trust & Authority typography stack — Source Serif 4 (display) + Lexend (UI).
// Lexend is engineered for readability and works well in legal, healthcare and
// B2B contexts; Source Serif 4 gives the display headlines a classy gravitas
// without the playful curves of Fraunces.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://unaxaller.com"),
  title: {
    default: "Unax Aller — Renting Web para negocio local · 149€/mes",
    template: "%s | Unax Aller",
  },
  description:
    "Renting Web para negocios profesionales del País Vasco y Navarra: 149€/mes, 0€ inicial, 30 días de garantía. Todo incluido — web, Google Maps, reseñas, soporte WhatsApp.",
  applicationName: "Unax Aller",
  authors: [{ name: "Unax Aller Fernández", url: "https://unaxaller.com" }],
  creator: "Unax Aller Fernández",
  publisher: "Unax Aller Fernández",
  category: "Diseño y Desarrollo Web",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_GB", "eu_ES"],
    url: "https://unaxaller.com",
    siteName: "Unax Aller",
    title: "Unax Aller — Renting Web para negocio local · 149€/mes",
    description:
      "Renting Web para negocios del País Vasco y Navarra. 149€/mes, 0€ inicial, 30 días de garantía. Todo incluido.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unax Aller — Renting Web · 149€/mes, 0€ inicial",
    description:
      "Renting Web para negocios profesionales: web, Google Maps, reseñas, soporte por WhatsApp. Todo incluido.",
    creator: "@unaxaller",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${sourceSerif.variable} ${lexend.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
