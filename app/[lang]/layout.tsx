import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

  // Enable static rendering. Without this, next-intl reads the locale from
  // headers() which forces EVERY /[lang]/* route to render dynamically
  // (high TTFB + Cache-Control:no-store that kills the bfcache). Must be
  // called before any next-intl API (getMessages below).
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Root <html lang> is statically "es"; this server-rendered inline
          script corrects it to the active locale before paint, without the
          client-inert <Script> warning that next/script triggers in a nested
          body. */}
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
        }}
      />
      <a href="#main-content" className="skip-link focusable">
        {locale === "es" ? "Ir al contenido" : locale === "en" ? "Skip to content" : "Edukira joan"}
      </a>
      <Navbar locale={locale} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer locale={locale} />
      <WhatsAppFloat locale={locale} />
    </NextIntlClientProvider>
  );
}
