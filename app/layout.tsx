import type { Metadata, Viewport } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unaxaller.com"),
  title: {
    default: "Unax Aller — Diseño y Desarrollo Web Premium",
    template: "%s",
  },
  description:
    "Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados. Diseño y desarrollo web premium en el País Vasco. Desde 1.300€ IVA incluido.",
  keywords: [
    "diseño web Irun",
    "diseñador web Irun",
    "diseño web País Vasco",
    "diseñador web País Vasco",
    "páginas web Gipuzkoa",
    "desarrollo web",
    "freelance web",
    "Basque Country",
    "SEO",
    "Next.js",
  ],
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
    title: "Unax Aller — Diseño y Desarrollo Web Premium",
    description:
      "Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados. Desde 1.300€ IVA incluido.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unax Aller — Diseño y Desarrollo Web Premium",
    description:
      "Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados.",
    creator: "@unaxaller",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#061b0e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${newsreader.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="geo.region" content="ES-PV" />
        <meta name="geo.placename" content="Irun, Gipuzkoa" />
        <meta name="geo.position" content="43.3390;-1.7892" />
        <meta name="ICBM" content="43.3390, -1.7892" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
