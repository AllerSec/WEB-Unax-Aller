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
    es: "Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados. Diseño y desarrollo web premium en el País Vasco. Desde 1.200€.",
    en: "We craft bespoke digital experiences — sophisticated, results-driven. Premium web design and development in the Basque Country. From €1,200.",
    eu: "Neurrira egindako esperientzia digitalak sortzen ditugu — sofistikatuak, emaitzara orientatuak. Web diseinu eta garapen premium-a Euskal Herrian. 1.200€-tik.",
  };

  const _ = t;

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
      <PageLoader />
      <CustomCursor />
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
