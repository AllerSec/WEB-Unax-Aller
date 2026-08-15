import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SocialProof from "@/components/home/SocialProof";
import Testimonials from "@/components/home/Testimonials";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";

  const titles: Record<string, string> = {
    es: "Diseño web en País Vasco",
    en: "Web design in Basque Country",
    eu: "Web diseinua Euskal Herrian",
    fr: "Création de site web au Pays Basque",
  };
  const descriptions: Record<string, string> = {
    es: "Diseñador web freelance para negocios del País Vasco: Bizkaia, Gipuzkoa y Álava. Webs a medida con SEO local, trilingüe (es/en/eu) y rendimiento. Pago único de 1.300€ + IVA, con el primer año incluido.",
    en: "Freelance web designer for Basque Country businesses: Bizkaia, Gipuzkoa and Álava. Custom trilingual websites (es/en/eu) with local SEO and performance. One-off €1,300 + VAT, first year included.",
    eu: "Web diseinatzaile freelance Euskal Herriko negozioetarako: Bizkaia, Gipuzkoa eta Araba. Hiru hizkuntzatan (es/en/eu) eta SEO lokalarekin. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne.",
    fr: "Créateur de sites web freelance pour les commerces du Pays basque : Biscaye, Guipuscoa et Álava. Sites sur mesure, SEO local, multilingue (es/en/eu/fr) et performance. Paiement unique de 1 300 € + TVA, première année incluse.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/disenador-web-pais-vasco`,
      languages: hreflangAlternates("/disenador-web-pais-vasco"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/disenador-web-pais-vasco" }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function PaisVascoPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";
  // Enable static rendering (see home/layout note) — must precede next-intl APIs
  // used by the SocialProof / Testimonials child components below.
  setRequestLocale(locale);

  const regionName = locale === "eu" ? "Euskal Herria" : "País Vasco";

  const faqItems = locale === "es"
    ? [
        {
          q: `¿Cuánto cuesta una web profesional en el ${regionName}?`,
          a: "Es un pago único de 1.300€ + IVA, con el primer año de mantenimiento incluido. Incluye diseño a medida, SEO técnico, Lighthouse 95+, hosting, dominio, ficha de Google Maps optimizada, sistema de reseñas y soporte directo por WhatsApp. La web es tuya, sin cuotas mensuales. A partir del segundo año, el mantenimiento es de 600€/año.",
        },
        {
          q: "¿Puedes trabajar en Bilbao, Donostia y Vitoria?",
          a: "Sí. Estoy en Irun y me desplazo a cualquiera de las tres capitales cuando el proyecto lo requiere. El resto lo llevamos por WhatsApp, email o videollamada, lo que te venga bien.",
        },
        {
          q: "¿La web puede estar en euskera, castellano, inglés y francés?",
          a: "Sí. Hasta 4 idiomas (euskera, castellano, inglés y francés) y entran en el precio. Estudié en Francia hasta los 15, así que el francés lo trabajo igual de fino que el resto. URLs separadas, hreflang correcto, todo bien hecho.",
        },
        {
          q: "¿Posicionas en Google para búsquedas locales del País Vasco?",
          a: "Sí. Configuro toda la parte técnica para que Google entienda y valore tu web. El objetivo es que tu negocio aparezca en los primeros resultados de tu nicho. Te configuro Google Business Profile y Google Search Console para que veas tú mismo cómo va.",
        },
        {
          q: "¿En cuánto tiempo estará lista la web?",
          a: "En una semana desde que cerramos el pago. Arrancamos enseguida.",
        },
        {
          q: "¿Qué incluye la cuota mensual?",
          a: "El primer año incluye hosting, dominio, SSL, ficha de Google Maps vigilada, sistema de reseñas, soporte por WhatsApp y los cambios de contenido (textos, fotos, precios, horarios, añadir un servicio). A partir del segundo año, el mantenimiento es de 600€/año (unos 50€/mes, facturado una vez al año). Sin facturas extra.",
        },
      ]
    : locale === "en"
    ? [
        {
          q: `How much does a professional website cost in the ${regionName}?`,
          a: "It's a one-off €1,300 + VAT, with the first year of maintenance included. It covers custom design, technical SEO, Lighthouse 95+, hosting, domain, optimized Google Maps profile, reviews system and direct WhatsApp support. The site is yours, with no monthly fees. From the second year, maintenance is €600/year.",
        },
        {
          q: "Can you work in Bilbao, Donostia and Vitoria?",
          a: "Yes. I'm based in Irun and I travel to any of the three capitals when the project requires it. The rest we handle via WhatsApp, email or video call, whatever works for you.",
        },
        {
          q: "Can the website be in Basque, Spanish, English and French?",
          a: "Yes. Up to 4 languages (Basque, Spanish, English and French), included in the price. I studied in France until I was 15, so French I treat with the same care as the rest. Separate URLs, proper hreflang, everything done right.",
        },
        {
          q: "Do you rank on Google for Basque Country local searches?",
          a: "Yes. I set up all the technical work that helps Google understand and value your site. The goal is for your business to show up in the top results of your niche. I configure your Google Business Profile and Google Search Console so you can see how it's doing yourself.",
        },
        {
          q: "How long will the website take?",
          a: "In a week from closing the payment. Since there's no upfront cost, we can start straight away.",
        },
        {
          q: "What does the monthly fee include?",
          a: "The first year includes hosting, domain, SSL, a monitored Google Maps profile, reviews system, WhatsApp support and content changes (text, photos, prices, hours, adding a service). From the second year, maintenance is €600/year (around €50/month, billed once a year). No extra invoices.",
        },
      ]
    : locale === "eu"
    ? [
        {
          q: `Zenbat kostatzen da web profesional bat ${regionName}n?`,
          a: "1.300€ + BEZ ordainketa bakarra da, lehen urteko mantentze-lana barne. Diseinu pertsonalizatua, SEO teknikoa, Lighthouse 95+, hosting-a, domeinua, Google Maps fitxa optimizatua, iritzi-sistema eta WhatsApp bidezko zuzeneko laguntza barne. Weba zurea da, hileko kuotarik gabe. Bigarren urtetik aurrera, mantentze-lana 600€/urteko da.",
        },
        {
          q: "Bilbon, Donostian eta Gasteizen egin dezakezu lan?",
          a: "Bai. Irunen nago eta hiru hiriburuetara joaten naiz proiektuak hala eskatzen duenean. Gainerakoa WhatsApp, posta elektroniko edo bideo-deiz, ondo datorkizun moduan.",
        },
        {
          q: "Webgunea euskaraz, gaztelaniaz, ingelesez eta frantsesez egon daiteke?",
          a: "Bai. 4 hizkuntzatara arte (euskara, gaztelania, ingelesa eta frantsesa), eta prezioan sartzen da. 15 urte bete arte Frantzian ikasi nuen, beraz frantsesa beste hizkuntzen arreta berarekin lantzen dut. URL bereiziak, hreflang zuzena, dena ondo egina.",
        },
        {
          q: "Euskal Herriko bilaketa lokaletarako posizionatzen duzu?",
          a: "Bai. Atal tekniko osoa konfiguratzen dut Googlek zure weba ulertu eta baloratzeko. Helburua zure negozioa zure nitxoko lehen emaitzetan agertzea da. Google Business Profile eta Google Search Console konfiguratzen dizkizut, zuk zeuk nola doan ikus dezazun.",
        },
        {
          q: "Zenbat denboran egongo da prest?",
          a: "Aste batean sinatu eta gero. Hasierako kosturik ez dagoenez, berehala hasi gaitezke.",
        },
        {
          q: "Zer dakar hileko kuotak?",
          a: "Lehen urteak hosting-a, domeinua, SSL, zaindutako Google Maps fitxa, iritzi-sistema, WhatsApp laguntza eta edukiaren aldaketak (testuak, argazkiak, prezioak, ordutegiak, zerbitzu bat eranstea) hartzen ditu. Bigarren urtetik aurrera, mantentze-lana 600€/urteko da (50€/hilean inguru, urtean behin fakturatua). Faktura gehigarririk gabe.",
        },
      ]
    : [
        {
          q: `Combien coûte un site web professionnel au ${regionName} ?`,
          a: "C'est un paiement unique de 1 300 € + TVA, avec la première année de maintenance incluse. Comprend un design sur mesure, SEO technique, Lighthouse 95+, hébergement, nom de domaine, fiche Google Maps optimisée, système d'avis et support direct par WhatsApp. Le site est à vous, sans abonnement mensuel. À partir de la deuxième année, la maintenance est de 600 €/an.",
        },
        {
          q: "Pouvez-vous travailler à Bilbao, Saint-Sébastien et Vitoria ?",
          a: "Oui. Je suis basé à Irun et je me déplace dans l'une des trois capitales quand le projet le demande. Le reste, on le gère par WhatsApp, email ou visioconférence, comme cela vous arrange.",
        },
        {
          q: "Le site peut-il être en basque, espagnol, anglais et français ?",
          a: "Oui. Jusqu'à 4 langues (basque, espagnol, anglais et français), incluses dans le prix. J'ai étudié en France jusqu'à mes 15 ans, donc je traite le français avec le même soin que les autres langues. URLs séparées, hreflang correct, tout est fait dans les règles.",
        },
        {
          q: "Positionnez-vous sur Google pour les recherches locales au Pays basque ?",
          a: "Oui. Je configure toute la partie technique pour que Google comprenne et valorise votre site. L'objectif est que votre commerce apparaisse dans les premiers résultats de votre secteur. Je configure votre fiche Google Business Profile et Google Search Console pour que vous puissiez suivre l'évolution vous-même.",
        },
        {
          q: "En combien de temps le site sera-t-il prêt ?",
          a: "En une semaine à partir de la validation du paiement. On démarre tout de suite.",
        },
        {
          q: "Qu'est-ce qui est inclus dans l'abonnement ?",
          a: "La première année comprend l'hébergement, le nom de domaine, le SSL, une fiche Google Maps surveillée, le système d'avis, le support WhatsApp et les modifications de contenu (textes, photos, prix, horaires, ajout d'un service). À partir de la deuxième année, la maintenance est de 600 €/an (environ 50 €/mois, facturé une fois par an). Sans factures cachées.",
        },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller · Diseñador Web",
        url: "https://unaxaller.com",
        areaServed: [
          { "@type": "AdministrativeArea", name: regionName },
          { "@type": "AdministrativeArea", name: "Bizkaia" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: locale === "eu" ? "Araba" : "Álava" },
          { "@type": "City", name: "Irun" },
          { "@type": "City", name: locale === "eu" ? "Bilbo" : "Bilbao" },
          { "@type": "City", name: locale === "eu" ? "Donostia" : "Donostia-San Sebastián" },
          { "@type": "City", name: locale === "eu" ? "Gasteiz" : "Vitoria-Gasteiz" },
        ],
        serviceType: "Diseño y Desarrollo Web",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : locale === "eu" ? "Hasiera" : "Accueil", item: `https://unaxaller.com/${locale}` },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es"
              ? `Diseñador web ${regionName}`
              : locale === "en"
              ? `Web designer ${regionName}`
              : locale === "eu"
              ? `Web diseinatzailea ${regionName}`
              : `Créateur de sites web ${regionName}`,
            item: `https://unaxaller.com/${locale}/disenador-web-pais-vasco`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `https://unaxaller.com/${locale}/disenador-web-pais-vasco#faq`,
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "[data-speakable]"],
        },
      },
    ],
  };

  const cities = [
    { name: locale === "eu" ? "Bilbo" : "Bilbao", slug: "disenador-web-bilbao", region: "Bizkaia" },
    { name: locale === "eu" ? "Donostia" : "Donostia-San Sebastián", slug: "disenador-web-donostia", region: "Gipuzkoa" },
    { name: locale === "eu" ? "Gasteiz" : "Vitoria-Gasteiz", slug: "disenador-web-vitoria", region: locale === "eu" ? "Araba" : "Álava" },
  ];

  const benefits = locale === "es"
    ? [
        { title: "Hasta cuatro idiomas, bien hechos", desc: "Castellano, euskera, inglés y francés con URLs separadas y hreflang correcto, no un plugin que traduce a medias. En zona de frontera, el francés capta clientes que el resto deja escapar." },
        { title: "SEO para el mercado vasco", desc: "Te posiciono en las búsquedas de tu zona y tu sector, y te dejo la ficha de Google Business Profile montada en cualquiera de las tres provincias." },
        { title: "Hablas siempre conmigo", desc: "Estoy en Irun. Si el proyecto lo pide me desplazo a Bilbao, Donostia o Vitoria; el resto lo llevamos por WhatsApp y videollamada, directo conmigo." },
        { title: "Hecho a mano, no una plantilla", desc: "Web a medida en Next.js, no un tema de WordPress que va lento. Rápida en el móvil y con el SEO técnico bien resuelto desde el primer día." },
      ]
    : locale === "en"
    ? [
        { title: "Trilingual out of the box", desc: "I deliver your site in Spanish, English and Basque. No fragile plugins: localized URLs and proper hreflang." },
        { title: "SEO for the Basque market", desc: "Optimization for searches across the Basque Country, Google Maps and Google Business Profile in all three provinces." },
        { title: "Real proximity", desc: "I'm based in Irun. I can travel to Bilbao, Donostia or Vitoria whenever your project needs it." },
        { title: "Hand-built, no templates", desc: "Custom Next.js site, not a WordPress theme. Fast on mobile, Lighthouse 95+ and technical SEO solved properly from day one." },
      ]
    : locale === "eu"
    ? [
        { title: "Hiru hizkuntza hasieratik", desc: "Zure weba gaztelaniaz, ingelesez eta euskaraz entregatzen dut. URL lokalizatuak eta hreflang zuzena." },
        { title: "Euskal merkaturako SEO", desc: "Euskadiko bilaketetarako optimizazioa, Google Maps eta Google Business Profile hiru lurraldeetan." },
        { title: "Benetako hurbiltasuna", desc: "Irunen nago. Bilbora, Donostiara edo Gasteizera joan naiteke proiektuak hala behar duenean." },
        { title: "Eskuz egina, txantiloirik gabe", desc: "Next.js-eko web pertsonalizatua, ez WordPress txantiloi bat. Mugikorrean azkar, Lighthouse 95+ eta SEO teknikoa ondo lehen egunetik." },
      ]
    : [
        { title: "Jusqu'à quatre langues, bien faites", desc: "Espagnol, basque, anglais et français avec URLs séparées et hreflang correct, pas un plugin qui traduit à moitié. En zone frontalière, le français capte des clients que les autres laissent filer." },
        { title: "SEO pour le marché basque", desc: "Je vous positionne sur les recherches de votre zone et de votre secteur, et je configure votre fiche Google Business Profile dans l'une des trois provinces." },
        { title: "Vous me parlez toujours à moi", desc: "Je suis basé à Irun. Si le projet le demande, je me déplace à Bilbao, Saint-Sébastien ou Vitoria ; le reste se gère par WhatsApp et visioconférence, directement avec moi." },
        { title: "Fait à la main, pas un modèle", desc: "Site sur mesure en Next.js, pas un thème WordPress qui rame. Rapide sur mobile, avec le SEO technique bien résolu dès le premier jour." },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="container-xl max-w-3xl">
          <Breadcrumbs
            items={[
              { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : locale === "eu" ? "Hasiera" : "Accueil", href: `/${locale}` },
              {
                name: locale === "es"
                  ? `Diseñador web ${regionName}`
                  : locale === "en"
                  ? `Web designer ${regionName}`
                  : locale === "eu"
                  ? `Web diseinatzailea ${regionName}`
                  : `Créateur de sites web ${regionName}`,
              },
            ]}
          />

          <div className="city-hero-author" aria-hidden="true">
            <Image
              src="/images/founder-unax.webp"
              alt=""
              width={5712}
              height={4284}
              sizes="(max-width: 768px) 110px, 140px"
              priority
            />
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
          >
            {locale === "es"
              ? `Tu web en el ${regionName}, lista para que te encuentren`
              : locale === "en"
              ? `Web designer in the ${regionName}`
              : locale === "eu"
              ? `Web diseinatzailea ${regionName}n`
              : `Votre site web au ${regionName}, prêt à être trouvé`}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-sans)" }}
          >
            {locale === "es"
              ? `Soy Unax Aller, diseñador web freelance en Irun. Trabajo con negocios de Bizkaia, Gipuzkoa y Álava, y una ventaja juega a tu favor que casi nadie aprovecha: estamos en zona de frontera, y monto las webs en castellano, euskera, inglés y francés para que también te encuentre el cliente que cruza desde Francia. Webs rápidas en el móvil, que salen en Google y hacen sonar el teléfono, por un pago único de 1.300€ + IVA, con el primer año incluido.`
              : locale === "en"
              ? `I'm Unax Aller, a freelance web designer based in Irun with clients in Bizkaia, Gipuzkoa and Álava. I build trilingual websites (Spanish, English and Basque) that rank on Google and convert visitors into clients.`
              : locale === "eu"
              ? `Unax Aller naiz, Irunen oinarritutako web diseinatzaile freelancea, Bizkaia, Gipuzkoa eta Arabako bezeroekin. Hiru hizkuntzatako webguneak egiten ditut (gaztelania, ingelesa eta euskara) Googlen agertu eta bisitariak bezero bihurtzen dituztenak.`
              : `Je suis Unax Aller, créateur de sites web freelance à Irun. Je travaille avec des commerces de Biscaye, du Guipuscoa et d'Álava, et un avantage joue en votre faveur que presque personne n'exploite : nous sommes en zone frontalière, et je construis les sites en espagnol, basque, anglais et français pour que le client qui traverse depuis la France vous trouve aussi. Des sites rapides sur mobile, bien positionnés sur Google et qui font sonner le téléphone, pour un paiement unique de 1 300 € + TVA, première année incluse.`}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--color-ink)", color: "var(--color-bg)", fontFamily: "var(--font-sans)" }}
          >
            {locale === "es" ? "Solicitar presupuesto gratis" : locale === "en" ? "Request a free quote" : locale === "eu" ? "Doako aurrekontua eskatu" : "Demander un devis gratuit"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-bg-muted)" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
            >
              {locale === "es"
                ? `¿Por qué un diseñador local del ${regionName}?`
                : locale === "en"
                ? `Why a local ${regionName} web designer?`
                : locale === "eu"
                ? `Zergatik ${regionName}ko bertako diseinatzaile bat?`
                : `Pourquoi un créateur de sites web local du ${regionName} ?`}
            </h2>
            <div className="flex flex-col gap-6">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "var(--color-bg-alt)", border: "1px solid var(--color-line)" }}
                >
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-sans)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
            >
              {locale === "es"
                ? "Cubro las tres capitales vascas"
                : locale === "en"
                ? "I cover the three Basque capitals"
                : locale === "eu"
                ? "Hiru hiriburu euskaldunak estaltzen ditut"
                : "Je couvre les trois capitales basques"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/${c.slug}`}
                  className="block p-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "var(--color-bg-alt)", border: "1px solid var(--color-line)" }}
                >
                  <div
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-sans)" }}
                  >
                    {c.region}
                  </div>
                  <div
                    className="text-xl font-medium"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="text-sm mt-2"
                    style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-sans)" }}
                  >
                    {locale === "es"
                      ? `Ver servicios para ${c.name}`
                      : locale === "en"
                      ? `See services for ${c.name}`
                      : locale === "eu"
                      ? `${c.name}rako zerbitzuak ikusi`
                      : `Voir les services pour ${c.name}`}
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Social proof — real Basque clients + testimonials. Same components the
          city landings use, so País Vasco carries the same trust weight. */}
      <SocialProof />
      <Testimonials />

      <section className="py-20 md:py-28" style={{ backgroundColor: "var(--color-bg-muted)" }}>
        <div className="container-xl max-w-3xl">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-8"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
            >
              {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : locale === "eu" ? "Ohiko galderak" : "Questions fréquentes"}
            </h2>
            <div className="flex flex-col gap-3">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="p-5 rounded-xl group"
                  style={{ backgroundColor: "var(--color-bg-alt)", border: "1px solid var(--color-line)" }}
                >
                  <summary
                    className="cursor-pointer text-base font-medium list-none flex items-start justify-between gap-4"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 transition-transform group-open:rotate-45 text-xl leading-none"
                      style={{ color: "var(--color-accent)" }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="text-sm leading-relaxed mt-3"
                    style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-sans)" }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--color-bg-alt)" }}>
        <div className="container-xl text-center">
          <AnimatedSection>
            <h2
              className="text-2xl md:text-3xl font-light mb-6"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-accent)" }}
            >
              {locale === "es"
                ? `¿Tienes un negocio en el ${regionName}?`
                : locale === "en"
                ? `Have a business in the ${regionName}?`
                : locale === "eu"
                ? `${regionName}n negozioa al duzu?`
                : `Vous avez un commerce au ${regionName} ?`}
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-sans)" }}>
              {locale === "es" ? "Consulta gratuita de 30 minutos. Sin compromiso." : locale === "en" ? "Free 30-minute consultation. No commitment." : locale === "eu" ? "30 minutuko doako kontsulta. Konpromisorik gabe." : "Consultation gratuite de 30 minutes. Sans engagement."}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-contrast)", fontFamily: "var(--font-sans)" }}
            >
              {locale === "es" ? "Hablar con Unax" : locale === "en" ? "Talk to Unax" : locale === "eu" ? "Unaxekin hitz egin" : "Parler à Unax"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
