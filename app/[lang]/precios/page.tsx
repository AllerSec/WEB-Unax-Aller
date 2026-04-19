import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PricingCards from "@/components/pricing/PricingCards";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Precios — Planes Web desde 1.200€ | Unax Aller",
    en: "Pricing — Web Plans from €1,200 | Unax Aller",
    eu: "Prezioak — Web Planak 1.200€-tik | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Planes claros y sin sorpresas. Essential desde 1.200€, Visionary desde 1.800€ y Excellence desde 2.800€. Mantenimiento desde 49€/mes.",
    en: "Clear plans with no surprises. Essential from €1,200, Visionary from €1,800 and Excellence from €2,800. Maintenance from €49/month.",
    eu: "Plan argiak sorpresarik gabe. Essential 1.200€-tik, Visionary 1.800€-tik eta Excellence 2.800€-tik. Mantentze-lanak 49€/hiletik.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: { canonical: `https://unaxaller.com/${locale}/precios` },
  };
}

export default async function PreciosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Precios — Unax Aller",
    url: `https://unaxaller.com/${locale}/precios`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Offer",
          position: 1,
          name: "Plan Essential",
          price: "1200",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          position: 2,
          name: "Plan Visionary",
          price: "1800",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          position: 3,
          name: "Plan Excellence",
          price: "2800",
          priceCurrency: "EUR",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-16 md:pt-20">
        <PricingCards locale={locale} />
      </div>
    </>
  );
}
