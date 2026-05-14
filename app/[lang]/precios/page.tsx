import type { Metadata } from "next";
import PricingCard from "@/components/ui/pricing-card";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

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
    es: "Un único plan claro: web a medida completa desde 1.500€ IVA incluido. Diseño premium, SEO técnico, multi-idioma. El primer año el mantenimiento son 100€ (hosting, dominio, soporte). Sin sorpresas.",
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

const VALID_FROM = new Date().toISOString().slice(0, 10);
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

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

  const includesItems = locale === "es"
    ? [
        { icon: "✦", title: "Diseño a medida", desc: "No hay dos webs iguales. Cada pixel pensado para tu negocio." },
        { icon: "◎", title: "SEO real", desc: "No solo meta tags. Datos estructurados, Core Web Vitals, hreflang." },
        { icon: "⟨/⟩", title: "Código tuyo", desc: "Acceso total al repositorio. Sin lock-in de plataforma." },
        { icon: "⊕", title: "Soporte post-lanzamiento", desc: "1 mes de soporte incluido. Mantenimiento opcional desde 100€/año." },
      ]
    : locale === "en"
    ? [
        { icon: "✦", title: "Custom design", desc: "No two sites alike. Every pixel crafted for your business." },
        { icon: "◎", title: "Real SEO", desc: "Not just meta tags. Structured data, Core Web Vitals, hreflang." },
        { icon: "⟨/⟩", title: "Your code", desc: "Full repository access. No platform lock-in." },
        { icon: "⊕", title: "Post-launch support", desc: "1 month support included. Optional maintenance from €100/year." },
      ]
    : [
        { icon: "✦", title: "Neurrizko diseinua", desc: "Ez daude bi web berdinik. Pixel bakoitza zure negoziorako pentsatua." },
        { icon: "◎", title: "Benetako SEO", desc: "Ez bakarrik meta tags. Datu egituratuak, Core Web Vitals, hreflang." },
        { icon: "⟨/⟩", title: "Zure kodea", desc: "Biltegirako sarbide osoa. Plataforma lock-in gabe." },
        { icon: "⊕", title: "Abiarazi osteko laguntza", desc: "1 hilabete laguntza barne. Mantentze-lan aukerakoa 100€/urtetik." },
      ];

  const marketRows = locale === "es"
    ? [
        { who: "Agencia grande", price: "5.000 € – 20.000 €", note: "Misma web, mucho más cara. Pagas su estructura.", highlight: false },
        { who: "Freelancer sin experiencia", price: "400 € – 800 €", note: "Plantilla WordPress. No convierte, no escala.", highlight: false },
        { who: "Constructor online (Wix)", price: "200 € – 500 €/año", note: "No es tuya. Lenta. Sin SEO real.", highlight: false },
        { who: "Unax Aller", price: "1.500 €", note: "Código a mano, SEO real, tuya para siempre.", highlight: true },
      ]
    : locale === "en"
    ? [
        { who: "Large agency", price: "€5,000 – €20,000", note: "Same website, much more expensive. You pay for their structure.", highlight: false },
        { who: "Inexperienced freelancer", price: "€400 – €800", note: "WordPress template. Does not convert or scale.", highlight: false },
        { who: "Online builder (Wix)", price: "€200 – €500/year", note: "Not yours. Slow. No real SEO.", highlight: false },
        { who: "Unax Aller", price: "€1,500", note: "Hand-coded, real SEO, yours forever.", highlight: true },
      ]
    : [
        { who: "Agentzia handia", price: "5.000 € – 20.000 €", note: "Web bera, askoz garestiagoa. Beren egitura ordaintzen duzu.", highlight: false },
        { who: "Esperientziarik gabeko freelance-a", price: "400 € – 800 €", note: "WordPress txantiloia. Ez du konbertsio egiten.", highlight: false },
        { who: "Online eraikitzailea (Wix)", price: "200 € – 500 €/urte", note: "Ez da zurea. Motela. SEO errealik gabe.", highlight: false },
        { who: "Unax Aller", price: "1.500 €", note: "Eskuz kodeatua, benetako SEO, zurea betirako.", highlight: true },
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
        image: `https://unaxaller.com/${locale}/opengraph-image`,
        offers: {
          "@type": "AggregateOffer",
          "@id": `https://unaxaller.com/${locale}/precios#offer`,
          priceCurrency: "EUR",
          lowPrice: "1500",
          highPrice: "2000",
          offerCount: 1,
          availability: "https://schema.org/InStock",
          validFrom: VALID_FROM,
          priceValidUntil: PRICE_VALID_UNTIL,
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
          offers: [
            {
              "@type": "Offer",
              name: locale === "es" ? "Plan Completo — Web a Medida" : locale === "en" ? "Complete Plan — Custom Website" : "Plan Osoa — Neurrizko Weba",
              price: "1500",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "1500",
                priceCurrency: "EUR",
                valueAddedTaxIncluded: true,
              },
              seller: { "@id": "https://unaxaller.com/#business" },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["details summary", "details p"] },
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
      <style>{`
        @keyframes prcFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes prcProgressBar { from{width:0%} to{width:100%} }
        @keyframes prcChipIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .prc-hero { background:linear-gradient(160deg,#0a2412 0%,#061b0e 60%,#061b0e 100%);padding-block:var(--space-16); }
        .prc-hero-inner { animation:prcFadeUp 0.7s cubic-bezier(.16,1,.3,1) both; }
        .prc-chip { display:inline-flex;align-items:center;background:rgba(180,205,184,.08);border:1px solid rgba(180,205,184,.16);color:var(--color-ink);border-radius:var(--radius-full);padding:.25rem .75rem;font-size:var(--text-xs);font-family:var(--font-sans);animation:prcChipIn .6s cubic-bezier(.16,1,.3,1) .3s both; }
        .prc-chips { display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-6); }
        .prc-progress-bar-wrap { width:100%;height:2px;background:rgba(180,205,184,.08);border-radius:var(--radius-full);overflow:hidden;margin-top:var(--space-10); }
        .prc-progress-bar { height:100%;background:linear-gradient(to right,#4ade80,#b4cdb8,transparent);border-radius:var(--radius-full);animation:prcProgressBar 1.2s ease-out .4s both;width:0%; }
        .prc-includes-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-4); }
        @media(max-width:640px){ .prc-includes-grid{grid-template-columns:1fr} }
        .prc-include-item { background:rgba(180,205,184,.04);border:1px solid rgba(180,205,184,.1);border-radius:var(--radius-xl);padding:1.5rem;display:flex;flex-direction:column;gap:var(--space-3);transition:border-color .2s ease,background .2s ease; }
        .prc-include-item:hover { background:rgba(180,205,184,.07);border-color:rgba(180,205,184,.2); }
        .prc-include-icon { font-size:1.5rem;color:#4ade80;line-height:1; }
        .prc-include-title { font-family:var(--font-sans);font-size:var(--text-md);font-weight:600;color:var(--color-ink); }
        .prc-include-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed); }
        .prc-market-section { background:var(--color-bg-alt);padding-block:var(--space-16); }
        .prc-market-grid { display:flex;flex-direction:column;gap:var(--space-2); }
        .prc-market-row { display:grid;grid-template-columns:1fr 1fr 2fr;gap:var(--space-4);align-items:center;padding:1rem 1.25rem;border-radius:var(--radius-lg);border:1px solid rgba(180,205,184,.10);background:rgba(255,255,255,.015);font-family:var(--font-sans);font-size:var(--text-sm); }
        @media(max-width:640px){ .prc-market-row{grid-template-columns:1fr;gap:var(--space-1)} }
        .prc-market-row--highlight { background:linear-gradient(90deg,rgba(74,222,128,.06) 0%,rgba(180,205,184,.04) 100%);border-color:rgba(180,205,184,.2);border-left:3px solid #4ade80; }
        .prc-market-who { color:var(--color-ink);font-weight:600; }
        .prc-market-price { color:var(--color-ink-muted); }
        .prc-market-row--highlight .prc-market-price { color:#4ade80;font-weight:700; }
        .prc-market-note { color:rgba(236,231,214,.40);font-size:var(--text-xs); }
        .prc-faq-section { background:var(--color-bg-alt);padding-block:var(--space-16); }
        .prc-cta-section { background:linear-gradient(160deg,#0a2412 0%,#061b0e 100%);border-top:1px solid rgba(180,205,184,.1);padding-block:var(--space-16);text-align:center; }
        .prc-cta-footnote { margin-top:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(236,231,214,.40); }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="prc-hero" aria-label={locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak"}>
        <div className="container-xl">
          <div className="prc-hero-inner">
            <Breadcrumbs
              items={[
                { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera", href: `/${locale}` },
                { name: locale === "es" ? "Precios" : locale === "en" ? "Pricing" : "Prezioak" },
              ]}
            />
            <p className="lp-eyebrow" style={{ marginTop: "var(--space-6)" }}>
              {locale === "es" ? "Precio transparente" : locale === "en" ? "Transparent pricing" : "Prezio gardena"}
            </p>
            <h1 className="page-hero-title" style={{ fontFamily: "var(--font-serif)" }}>
              {locale === "es"
                ? "Un único plan. Sin letra pequeña."
                : locale === "en"
                ? "One plan. No fine print."
                : "Plan bakarra. Letra txikirik gabe."}
            </h1>
            <p className="page-hero-subtitle">
              {locale === "es"
                ? "1.500€ IVA incluido. Código tuyo. Sin sorpresas."
                : locale === "en"
                ? "€1,500 VAT included. Your code. No surprises."
                : "1.500€ BEZ barne. Zure kodea. Sorpresa gabe."}
            </p>
            <div className="prc-chips">
              <span className="prc-chip">{locale === "es" ? "IVA incluido" : locale === "en" ? "VAT included" : "BEZ barne"}</span>
              <span className="prc-chip">{locale === "es" ? "Código 100% tuyo" : locale === "en" ? "Code 100% yours" : "Kodea %100 zurea"}</span>
              <span className="prc-chip">{locale === "es" ? "Precio cerrado" : locale === "en" ? "Fixed price" : "Prezio itxia"}</span>
            </div>
            <div className="prc-progress-bar-wrap" aria-hidden="true">
              <div className="prc-progress-bar" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING CARD ── */}
      <PricingCard locale={locale} />

      {/* ── QUÉ INCLUYE ── */}
      <AnimatedSection>
        <section aria-labelledby="includes-title" style={{ paddingBlock: "var(--space-16)" }}>
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "Todo incluido" : locale === "en" ? "All included" : "Dena barne"}
            </p>
            <h2 id="includes-title" className="section-heading" style={{ marginBottom: "var(--space-10)" }}>
              {locale === "es" ? "¿Qué incluye?" : locale === "en" ? "What's included?" : "Zer barne hartzen du?"}
            </h2>
            <div className="prc-includes-grid">
              {includesItems.map((item, i) => (
                <div key={i} className="prc-include-item">
                  <div className="prc-include-icon" aria-hidden="true">{item.icon}</div>
                  <div className="prc-include-title">{item.title}</div>
                  <p className="prc-include-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── TABLA DE MERCADO ── */}
      <AnimatedSection>
        <section className="prc-market-section" aria-labelledby="pricing-context-title">
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "Contexto de mercado" : locale === "en" ? "Market context" : "Merkatuaren testuingurua"}
            </p>
            <h2 id="pricing-context-title" className="section-heading" style={{ marginBottom: "var(--space-8)" }}>
              {locale === "es"
                ? "¿Qué cuesta esto en el mercado?"
                : locale === "en"
                ? "What does this cost in the market?"
                : "Zenbat kostatzen da hau merkatuan?"}
            </h2>
            <div className="prc-market-grid">
              {marketRows.map((row, i) => (
                <div key={i} className={`prc-market-row${row.highlight ? " prc-market-row--highlight" : ""}`}>
                  <div className="prc-market-who">{row.who}</div>
                  <div className="prc-market-price">{row.price}</div>
                  <div className="prc-market-note">{row.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── FAQ ── */}
      <AnimatedSection>
        <section className="prc-faq-section" aria-label={locale === "es" ? "Preguntas sobre el precio" : locale === "en" ? "Pricing questions" : "Prezioari buruzko galderak"}>
          <div className="container-xl">
            <div className="faq-wrap">
              <h2 className="section-heading">
                {locale === "es" ? "Preguntas sobre el precio" : locale === "en" ? "Pricing questions" : "Prezioari buruzko galderak"}
              </h2>
              <div className="faq-list">
                {faqItems.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary className="faq-summary focusable">
                      {item.q}
                      <svg className="faq-caret" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
      </AnimatedSection>

      {/* ── CTA FINAL ── */}
      <section className="prc-cta-section" aria-labelledby="cta-precios-title">
        <div className="container-xl">
          <p className="lp-eyebrow" style={{ marginBottom: "var(--space-4)" }}>
            {locale === "es" ? "¿Hablamos?" : locale === "en" ? "Shall we talk?" : "Hitz egiten al dugu?"}
          </p>
          <h2 id="cta-precios-title" className="section-heading" style={{ marginBottom: "var(--space-4)" }}>
            {locale === "es"
              ? "30 minutos. Sin compromiso."
              : locale === "en"
              ? "30 minutes. No commitment."
              : "30 minutu. Konpromisorik gabe."}
          </h2>
          <p style={{ color: "rgba(236,231,214,0.65)", fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", marginBottom: "var(--space-8)" }}>
            {locale === "es"
              ? "Cuéntame tu proyecto. Vemos si encajamos y te doy un precio claro."
              : locale === "en"
              ? "Tell me about your project. We'll see if we're a good fit and I'll give you a clear price."
              : "Kontatu zure proiektua. Ikusiko dugu bat egiten dugun eta prezio argi bat emango dizut."}
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/contacto`} className="btn btn-primary btn-lg focusable">
              {locale === "es" ? "Pedir consulta gratuita →" : locale === "en" ? "Request free consultation →" : "Doako kontsulta eskatu →"}
            </Link>
            <Link href={`/${locale}/proyectos`} className="btn btn-secondary btn-lg focusable">
              {locale === "es" ? "Ver proyectos" : locale === "en" ? "See projects" : "Proiektuak ikusi"}
            </Link>
          </div>
          <p className="prc-cta-footnote">
            {locale === "es"
              ? "Sin compromiso. Respondo en menos de 24h."
              : locale === "en"
              ? "No commitment. I reply in under 24h."
              : "Konpromisorik gabe. 24h baino gutxiagotan erantzuten dut."}
          </p>
        </div>
      </section>
    </>
  );
}
