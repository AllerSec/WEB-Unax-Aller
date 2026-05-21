import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
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
      <Navbar locale={locale} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer locale={locale} />
      <WhatsAppFloat locale={locale} />
    </NextIntlClientProvider>
  );
}
