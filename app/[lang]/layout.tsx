import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import CustomCursor from "@/components/shared/CustomCursor";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  if (!routing.locales.includes(locale)) return {};

  const t = await getTranslations({ locale, namespace: "nav" });

  const titles: Record<string, string> = {
    es: "Unax Aller — Diseño y Desarrollo Web Premium | País Vasco",
    en: "Unax Aller — Premium Web Design & Development | Basque Country",
    eu: "Unax Aller — Web Diseinu eta Garapen Premium | Euskal Herria",
  };

  const descriptions: Record<string, string> = {
    es: "Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados. Diseño y desarrollo web premium en el País Vasco. Desde 1.300€ IVA incluido.",
    en: "We craft bespoke digital experiences — sophisticated, results-driven. Premium web design and development in the Basque Country. From €1,300 VAT included.",
    eu: "Neurrira egindako esperientzia digitalak sortzen ditugu — sofistikatuak, emaitzara orientatuak. Web diseinu eta garapen premium-a Euskal Herrian. 1.300€-tik BEZ barne.",
  };

  void t;

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es,
    alternates: {
      canonical: `https://unaxaller.com/${locale}`,
      languages: {
        "es": "https://unaxaller.com/es",
        "en": "https://unaxaller.com/en",
        "eu": "https://unaxaller.com/eu",
        "x-default": "https://unaxaller.com/es",
      },
    },
    openGraph: {
      locale:
        locale === "es" ? "es_ES" : locale === "en" ? "en_GB" : "eu_ES",
      alternateLocale:
        locale === "es"
          ? ["en_GB", "eu_ES"]
          : locale === "en"
          ? ["es_ES", "eu_ES"]
          : ["es_ES", "en_GB"],
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Sync html[lang] with the active locale without hydration mismatch */}
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}"`,
        }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        style={{ backgroundColor: "#061b0e", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}
      >
        {locale === "es" ? "Ir al contenido" : locale === "en" ? "Skip to content" : "Edukira joan"}
      </a>
      <PageLoader />
      <CustomCursor />
      <Navbar locale={locale} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
