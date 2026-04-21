import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PricingCards from "@/components/pricing/PricingCards";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Precios — Web a Medida desde 1.300€ en Irun | Unax Aller",
    en: "Pricing — Custom Website from €1,300 in Irun | Unax Aller",
    eu: "Prezioak — Neurrira egindako weba 1.300€-tik Irunen | Unax Aller",
  };
  const descriptions: Record<string, string> = {
    es: "Un único plan claro: web a medida completa desde 1.300€ IVA incluido. Diseño premium, SEO técnico, multi-idioma y hosting el primer año. Sin sorpresas.",
    en: "One clear plan: complete custom website from €1,300 VAT included. Premium design, technical SEO, multi-language and hosting for the first year. No surprises.",
    eu: "Plan argi bakarra: neurrira egindako web osoa 1.300€-tik BEZ barne. Diseinu premium-a, SEO teknikoa, hizkuntza anitza eta hostinga lehen urtean.",
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
      "@type": "Offer",
      name: "Plan Completo — Web a Medida",
      description: "Web a medida completa: diseño premium, SEO técnico, multi-idioma y hosting el primer año. IVA incluido.",
      price: "1300",
      priceCurrency: "EUR",
      seller: { "@id": "https://unaxaller.com/#business" },
      areaServed: [
        { "@type": "City", name: "Irun" },
        { "@type": "AdministrativeArea", name: "Gipuzkoa" },
        { "@type": "AdministrativeArea", name: "País Vasco" },
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
