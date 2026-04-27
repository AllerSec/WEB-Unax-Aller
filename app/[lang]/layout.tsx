import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import CustomCursor from "@/components/shared/CustomCursor";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";
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
    es: "Diseñador Web en Irun, País Vasco",
    en: "Web Designer in Irun, Basque Country",
    eu: "Web Diseinatzailea Irunen, Euskal Herrian",
  };

  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance en Irun, Gipuzkoa. Webs a medida para negocios del País Vasco: diseño premium, SEO, animaciones y rendimiento. Desde 1.500€ IVA incluido.",
    en: "Freelance web designer in Irun, Basque Country. Custom websites for Basque businesses: premium design, SEO, animations and performance. From €1,500 VAT included.",
    eu: "Web diseinatzaile freelance Irunen, Gipuzkoan. Neurrira egindako webguneak Euskal Herriko negozioetarako. 1.500€-tik BEZ barne.",
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
    other: {
      "content-language":
        locale === "es" ? "es-ES" : locale === "en" ? "en-GB" : "eu-ES",
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
          __html: `document.documentElement.lang="${locale}";try{if(sessionStorage.getItem("ua-visited"))document.documentElement.classList.add("ua-loader-skip")}catch(e){}`,
        }}
      />
      <a href="#main-content" className="skip-link focusable">
        {locale === "es" ? "Ir al contenido" : locale === "en" ? "Skip to content" : "Edukira joan"}
      </a>
      <PageLoader />
      <CustomCursor />
      <Navbar locale={locale} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer locale={locale} />
      <WhatsAppFloat locale={locale} />
    </NextIntlClientProvider>
  );
}
