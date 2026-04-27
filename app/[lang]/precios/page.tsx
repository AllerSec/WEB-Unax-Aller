import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PricingCards from "@/components/pricing/PricingCards";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Precios — Web a Medida desde 1.500€ en Irun",
    en: "Pricing — Custom Website from €1,500 in Irun",
    eu: "Prezioak — Neurrira egindako weba 1.500€-tik Irunen",
  };
  const descriptions: Record<string, string> = {
    es: "Un único plan claro: web a medida completa desde 1.500€ IVA incluido. Diseño premium, SEO técnico, multi-idioma . El primer año el mantenimiento son 100€ (hosting, dominio, soporte). Sin sorpresas.",
    en: "One clear plan: complete custom website from €1,500 VAT included. Premium design, technical SEO, multi-language and hosting for the first year. No surprises.",
    eu: "Plan argi bakarra: neurrira egindako web osoa 1.500€-tik BEZ barne. Diseinu premium-a, SEO teknikoa, hizkuntza anitza eta hostinga lehen urtean.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/precios`,
      languages: hreflangAlternates("/precios"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/precios" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function PreciosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const faqItems = locale === "es"
    ? [
        { q: "¿Por qué cuesta 1.500€ IVA incluido?", a: "Es el precio mínimo para hacer un trabajo de calidad: diseño personalizado, desarrollo a medida, SEO técnico, dominio y hosting incluidos el primer año por 100€ adicionales (mantenimiento). Sin recortar en ningún punto." },
        { q: "¿Hay costes adicionales?", a: "No hay costes ocultos. El único coste recurrente es la renovación del dominio y hosting a partir del segundo año (aproximadamente 100-150€/año)." },
        { q: "¿Se puede pagar en plazos?", a: "Sí. El pago habitual es 50% al inicio y 50% en la entrega. Para proyectos más grandes, podemos negociar plazos." },
        { q: "¿Qué incluye exactamente el precio?", a: "Diseño UI/UX a medida, desarrollo en Next.js, SEO técnico completo, formulario de contacto, hasta 4 idiomas, y mantenimiento opcional desde 100€ el primer año (hosting, dominio, soporte)." },
        { q: "¿Puedo tener una consulta gratuita antes de decidir?", a: "Sí, ofrezco una consulta gratuita de 30 minutos por videollamada para entender tu proyecto y ver si somos un buen match." },
      ]
    : locale === "en"
    ? [
        { q: "Why does it cost €1,500 VAT included?", a: "It's the minimum price to do quality work: custom design, bespoke development, technical SEO and hosting for the first year. No cutting corners." },
        { q: "Are there additional costs?", a: "There are no hidden costs. The only recurring cost is domain and hosting renewal from the second year onwards (approximately €100-150/year)." },
        { q: "Can I pay in instalments?", a: "Yes. The usual payment is 50% at the start and 50% on delivery. For larger projects, we can negotiate payment plans." },
        { q: "What exactly does the price include?", a: "Custom UI/UX design, Next.js development, complete technical SEO, contact form, up to 4 languages, and optional maintenance from €100 the first year (hosting, domain, support)." },
        { q: "Can I have a free consultation before deciding?", a: "Yes, I offer a free 30-minute video call consultation to understand your project and see if we're a good match." },
      ]
    : [
        { q: "Zergatik kostatzen da 1.500€ BEZ barne?", a: "Kalitatezko lana egiteko gutxieneko prezioa da: diseinu pertsonalizatua, garapen pertsonalizatua, SEO teknikoa, eta mantentze-lana aukerakoa lehen urtean 100€-tik (hosting, domeinua, laguntza)." },
        { q: "Kostu gehigarririk al dago?", a: "Ez dago ezkutuko kosturik. Kostu errepikakorra bigarren urtetik aurrerako domeinu eta hosting berriztapena baino ez da." },
        { q: "Epeka ordaindu al daiteke?", a: "Bai. Ohiko ordainketa hasieran %50 eta entregatzean %50 da." },
        { q: "Zer barne hartzen du prezioaren barruan?", a: "Neurrizko UI/UX diseinua, Next.js garapena, SEO tekniko osoa, harremanetan jartzeko inprimakia, 4 hizkuntzara arte, eta mantentze-lana aukerakoa 100€-tik lehen urtean (hosting, domeinua, laguntza)." },
        { q: "Erabaki aurretik doako kontsulta bat eduki al dezaket?", a: "Bai, 30 minutuko bideo-deiari buruzko doako kontsulta eskaintzen dut." },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://unaxaller.com/${locale}/precios#webpage`,
        name: locale === "es" ? "Precios — Unax Aller" : locale === "en" ? "Pricing — Unax Aller" : "Prezioak — Unax Aller",
        url: `https://unaxaller.com/${locale}/precios`,
        inLanguage: locale,
        isPartOf: { "@id": "https://unaxaller.com/#website" },
        mainEntity: { "@id": `https://unaxaller.com/${locale}/precios#product` },
      },
      {
        "@type": "Product",
        "@id": `https://unaxaller.com/${locale}/precios#product`,
        name: locale === "es" ? "Plan Completo — Web a Medida" : locale === "en" ? "Complete Plan — Custom Website" : "Plan Osoa — Neurrizko Weba",
        description: locale === "es"
          ? "Web a medida completa: diseño premium, SEO técnico, multi-idioma (hasta 4 idiomas, incluido francés). IVA incluido."
          : locale === "en"
          ? "Complete custom website: premium design, technical SEO, multi-language (es/en/eu) and hosting for the first year. VAT included. Code is 100% yours."
          : "Neurrira egindako web osoa: diseinu premium-a, SEO teknikoa, eleaniztasuna (es/en/eu) eta hostinga lehen urtean. BEZ barne. Kodea %100 zurea da.",
        brand: { "@id": "https://unaxaller.com/#business" },
        category: locale === "es" ? "Diseño y Desarrollo Web" : locale === "en" ? "Web Design and Development" : "Web Diseinua eta Garapena",
        image: "https://unaxaller.com/opengraph-image",
        offers: {
          "@type": "Offer",
          "@id": `https://unaxaller.com/${locale}/precios#offer`,
          name: locale === "es" ? "Plan Completo — Web a Medida" : locale === "en" ? "Complete Plan — Custom Website" : "Plan Osoa — Neurrizko Weba",
          description: locale === "es"
            ? "Web a medida completa: diseño premium, SEO técnico, multi-idioma. IVA incluido. Mantenimiento opcional desde 100€/año."
            : locale === "en"
            ? "Complete custom website: premium design, technical SEO, multi-language and hosting for the first year. VAT included."
            : "Neurrira egindako web osoa: diseinu premium-a, SEO teknikoa, hizkuntza anitza eta hostinga lehen urtean. BEZ barne.",
          price: "1500",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          validFrom: "2026-01-01",
          priceValidUntil: "2026-12-31",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1500",
            priceCurrency: "EUR",
            valueAddedTaxIncluded: true,
          },
          eligibleRegion: [
            { "@type": "Country", name: "ES" },
            { "@type": "AdministrativeArea", name: "País Vasco" },
          ],
          seller: { "@id": "https://unaxaller.com/#business" },
          areaServed: [
            { "@type": "City", name: "Irun" },
            { "@type": "AdministrativeArea", name: "Gipuzkoa" },
            { "@type": "AdministrativeArea", name: "País Vasco" },
          ],
        },
      },
      {
        "@type": "FAQPage",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["details summary", "details p"],
        },
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak", item: `https://unaxaller.com/${locale}/precios` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero" aria-label="Pricing hero">
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
              { name: locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak" },
            ]}
          />
        </div>
      </section>

      <PricingCards locale={locale} />

      <section aria-label="Pricing FAQ">
        <div className="container-xl">
          <div className="faq-wrap">
            <h2 className="section-heading">
              {locale === "es" ? "Preguntas sobre el precio" : locale === "en" ? "Pricing questions" : "Prezioari buruzko galderak"}
            </h2>
            <div className="faq-list">
              {faqItems.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-summary">
                    {item.q}
                    <svg
                      className="faq-caret"
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="faq-answer">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
