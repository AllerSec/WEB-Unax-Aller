import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Lexend } from "next/font/google";
import Script from "next/script";
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
    default: "Unax Aller: Web para negocio local · 149€/mes, 0€ inicial",
    template: "%s | Unax Aller",
  },
  description:
    "Web profesional para negocios del País Vasco y Navarra: 149€/mes todo incluido, 0€ inicial, sin permanencia y 30 días de garantía. Web, Google Maps, reseñas y soporte WhatsApp.",
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
    title: "Unax Aller: Web para negocio local · 149€/mes, 0€ inicial",
    description:
      "Web para negocios del País Vasco y Navarra. 149€/mes todo incluido, 0€ inicial, sin permanencia y 30 días de garantía.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unax Aller: Web para negocio local · 149€/mes, 0€ inicial",
    description:
      "Web para negocios profesionales: 149€/mes todo incluido, sin permanencia. Web, Google Maps, reseñas y soporte por WhatsApp.",
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-LY57EXKHP3" strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LY57EXKHP3');
      `}</Script>
    </html>
  );
}
