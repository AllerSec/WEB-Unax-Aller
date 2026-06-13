import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Polar/monochrome typography stack — Inter (UI + display) + Geist Mono
// (labels, eyebrows, data). Single neutral sans keeps the whole site in the
// crisp editorial register of the monochrome design system.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://unaxaller.com"),
  title: {
    default: "Unax Aller: Web para negocio local · 1.300€, 1er año incluido",
    template: "%s | Unax Aller",
  },
  description:
    "Web profesional para negocios del País Vasco y Navarra: pago único de 1.300€ + IVA con el primer año incluido y 30 días de garantía. Web, Google Maps, reseñas y soporte WhatsApp.",
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
    title: "Unax Aller: Web para negocio local · 1.300€, 1er año incluido",
    description:
      "Web para negocios del País Vasco y Navarra. Pago único de 1.300€ + IVA con el primer año incluido y 30 días de garantía.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unax Aller: Web para negocio local · 1.300€, 1er año incluido",
    description:
      "Web para negocios profesionales: pago único de 1.300€ + IVA, primer año incluido. Web, Google Maps, reseñas y soporte por WhatsApp.",
    creator: "@unaxaller",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
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
      className={`${inter.variable} ${geistMono.variable}`}
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
