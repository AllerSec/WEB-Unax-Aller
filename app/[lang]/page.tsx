import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FounderPhoto from "@/components/home/FounderPhoto";
import SocialProof from "@/components/home/SocialProof";
import ServicesGrid from "@/components/home/ServicesGrid";
import Testimonials from "@/components/home/Testimonials";
import PricingCards from "@/components/pricing/PricingCards";
import ProjectsBoard from "@/components/home/ProjectsBoard";
import ProcessStrip from "@/components/home/ProcessStrip";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionDivider from "@/components/shared/SectionDivider";
import Link from "next/link";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { cityLandings } from "@/lib/data/city-landings";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

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
  const title = titles[locale] || titles.es;
  const description = descriptions[locale] || descriptions.es;

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}`,
      languages: hreflangAlternates(""),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "" }),
    twitter: buildTwitter({ title, description, locale, path: "" }),
    other: {
      // Geo signals belong on pages where the business location is the
      // primary entity — the home does that. City landings declare areaServed
      // through schema instead, so we don't pin them all to Irun coordinates.
      "geo.region": "ES-PV",
      "geo.placename": "Irun, Gipuzkoa",
      "geo.position": "43.3390;-1.7892",
      ICBM: "43.3390, -1.7892",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";
  const t = await getTranslations({ locale });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://unaxaller.com/#business",
        name: "Unax Aller — Diseñador Web",
        url: "https://unaxaller.com",
        logo: "https://unaxaller.com/favicon.svg",
        image: [
          "https://unaxaller.com/es/opengraph-image",
          "https://unaxaller.com/favicon.svg",
        ],
        description:
          "Diseñador web freelance en Irun, Gipuzkoa. Webs a medida para negocios del País Vasco: diseño premium, SEO, animaciones y rendimiento.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Irun",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          postalCode: "20300",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.339,
          longitude: -1.7892,
        },
        priceRange: "€1500-€2000",
        email: "contacto@unaxaller.com",
        telephone: "+34620909916",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        currenciesAccepted: "EUR",
        paymentAccepted: "Bank transfer, SEPA",
        knowsAbout: [
          "Web Design",
          "Next.js",
          "SEO",
          "User Experience",
          "Performance Optimization",
          "Core Web Vitals",
          "Schema.org",
          "Local SEO",
        ],
        slogan: "Diseño y desarrollo web que convierte visitantes en clientes",
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
        areaServed: [
          { "@type": "City", name: "Irun" },
          ...cityLandings.map((c) => ({
            "@type": "City" as const,
            name: c.cityNames.es,
          })),
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "Bizkaia" },
          { "@type": "AdministrativeArea", name: "Álava" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://unaxaller.com/#service",
        name: "Diseño y Desarrollo Web",
        provider: { "@id": "https://unaxaller.com/#business" },
        areaServed: [
          { "@type": "City", name: "Irun" },
          ...cityLandings.map((c) => ({
            "@type": "City" as const,
            name: c.cityNames.es,
          })),
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "Bizkaia" },
          { "@type": "AdministrativeArea", name: "Álava" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planes de Diseño Web",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Plan Completo",
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: "1500",
                maxPrice: "2000",
                priceCurrency: "EUR",
                valueAddedTaxIncluded: true,
                description: "Desde 1.500€ IVA incluido. Hasta 2.000€ si requiere integraciones complejas.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://unaxaller.com/#website",
        url: "https://unaxaller.com",
        name: "Unax Aller",
        publisher: { "@id": "https://unaxaller.com/#business" },
        inLanguage: ["es", "en", "eu"],
      },
      {
        "@type": "FAQPage",
        "@id": `https://unaxaller.com/${locale}/#faq`,
        mainEntity: (locale === "es"
          ? [
              {
                q: "¿Cuánto cuesta una web profesional en Irun o Gipuzkoa?",
                a: "Una web a medida desde 1.500€, IVA incluido. Incluye diseño exclusivo, SEO técnico, velocidad Lighthouse 95+ y despliegue. Si necesitas algo más complejo (sistema de citas, automatizaciones, integraciones específicas) puede subir hasta unos 2.000€. Te paso un presupuesto cerrado antes de empezar, sin sorpresas.",
              },
              {
                q: "¿En cuánto tiempo tienes la web lista?",
                a: "Si no tengo otros proyectos activos, entre 1 y 2 semanas. Si los tengo, puede ser algo más. Te digo el plazo real desde el primer día y voy contándote cómo va.",
              },
              {
                q: "¿Trabajas solo en Irun o también para empresas de otras ciudades?",
                a: "Trabajo para empresas de todo el País Vasco, Navarra y resto de España. Las reuniones pueden ser presenciales si te viene bien, o por WhatsApp, email o videollamada. La distancia no es un problema.",
              },
              {
                q: "¿La web está optimizada para Google (SEO)?",
                a: "Sí. Configuro toda la parte técnica que hace que Google entienda y valore tu web: todo eso que no se ve pero que importa muchísimo. El objetivo es que tu negocio aparezca en los primeros resultados de tu nicho (clínica dental, ingeniería, comercio local, lo que sea). Además te configuro Google Search Console para que veas tú mismo cómo va.",
              },
              {
                q: "¿Puedo tener la web en euskera, castellano, inglés y francés?",
                a: "Sí. La web puede estar hasta en 4 idiomas (euskera, castellano, inglés y francés) y entra dentro del precio original. Estudié en Francia hasta los 15, así que el francés lo trabajo igual de fino que el resto. URLs separadas, hreflang correcto, todo bien hecho. Es una ventaja real que la mayoría de negocios no tienen.",
              },
              {
                q: "¿Qué pasa si necesito cambios o mantenimiento después del lanzamiento?",
                a: "El primer año el mantenimiento son 100€ y cubre hosting, dominio y soporte para arrancar. A partir del segundo año son 200€/año, con cambios menores incluidos (textos, imágenes, pequeños ajustes) y soporte continuo. Si vas a necesitar muchos cambios al mes, lo hablamos y ajustamos esa cantidad según lo que te haga falta. Sin permanencia, sin sorpresas.",
              },
            ]
          : locale === "en"
          ? [
              {
                q: "How much does a professional website cost in Irun or Gipuzkoa?",
                a: "A custom website from €1,500, VAT included. It comes with exclusive design, technical SEO, Lighthouse 95+ speed and deployment. If you need something more complex (booking system, automations, specific integrations) it can go up to around €2,000. I send you a fixed quote before we start, no surprises.",
              },
              {
                q: "How long until the website is ready?",
                a: "If I don't have other active projects, between 1 and 2 weeks. If I do, it can take a bit longer. I tell you the real timeline from day one and keep you posted as we go.",
              },
              {
                q: "Do you only work in Irun or also for businesses elsewhere?",
                a: "I work with businesses across the Basque Country, Navarra and the rest of Spain. Meetings can be in person if it suits you, or over WhatsApp, email or video call. Distance is not a problem.",
              },
              {
                q: "Is the website optimized for Google (SEO)?",
                a: "Yes. I set up all the technical work that helps Google understand and value your site: everything that's not visible but really matters. The goal is for your business to show up in the top results of your niche (dental clinic, engineering, local business, whatever it is). I also set up Google Search Console so you can see how it's doing yourself.",
              },
              {
                q: "Can I have the website in Basque, Spanish, English and French?",
                a: "Yes. The site can be in up to 4 languages (Basque, Spanish, English and French) and that's part of the base price. I studied in France until I was 15, so French I treat with the same care as the rest. Separate URLs, proper hreflang, everything done right. A real advantage most businesses don't have.",
              },
              {
                q: "What happens if I need changes or maintenance after launch?",
                a: "The first year maintenance is €100, covering hosting, domain and onboarding support. From the second year onwards it's €200/year, with minor changes included (text, images, small tweaks) and ongoing support. If you'll need a lot of changes per month, we talk about it and adjust based on what you actually need. No lock-in, no surprises.",
              },
            ]
          : [
              {
                q: "Zenbat kostatzen da web profesional bat Irunen edo Gipuzkoan?",
                a: "Neurrira egindako webgune bat 1.500€-tik, BEZ barne. Diseinu esklusiboa, SEO teknikoa, Lighthouse 95+ abiadura eta hedapena barne. Zerbait konplexuagoa behar baduzu (hitzorduen sistema, automatizazioak, integrazio espezifikoak) 2.000€ ingurura igo daiteke. Hasi aurretik aurrekontu itxia ematen dizut, ezustekorik gabe.",
              },
              {
                q: "Zenbat denboran izango duzu weba prest?",
                a: "Beste proiektu aktiborik ez badut, 1 eta 2 aste artean. Baditudanean, zerbait gehiago izan daiteke. Lehen egunetik benetako epea esaten dizut eta nola doan kontatzen dizut.",
              },
              {
                q: "Irunen bakarrik egiten duzu lan, ala beste hirietako enpresentzat ere bai?",
                a: "Euskal Herri osoko, Nafarroako eta Espainia osoko enpresentzat lan egiten dut. Bilerak aurrez aurre izan daitezke ondo badatorkizu, edo WhatsApp, posta elektroniko edo bideo-deiz. Distantzia ez da arazoa.",
              },
              {
                q: "Weba Googlerako optimizatuta dago (SEO)?",
                a: "Bai. Googlek zure weba ulertu eta baloratzen lagunduko dion atal teknikoa konfiguratzen dut: ikusten ez den guztia baina asko axola duena. Helburua zure negozioa zure nitxoko lehen emaitzetan agertzea da (hortz-klinika, ingeniaritza, tokiko komertzioa, dena delakoa). Gainera, Google Search Console konfiguratzen dizut, zuk zeuk nola doan ikus dezazun.",
              },
              {
                q: "Weba euskaraz, gaztelaniaz, ingelesez eta frantsesez eduki dezaket?",
                a: "Bai. Webgunea 4 hizkuntzatan egon daiteke (euskara, gaztelania, ingelesa eta frantsesa) eta jatorrizko prezioan sartzen da. 15 urte bete arte Frantzian ikasi nuen, beraz frantsesa beste hizkuntzen arreta berarekin lantzen dut. URL bereiziak, hreflang zuzena, dena ondo egina. Negozio gehienek ez duten benetako abantaila.",
              },
              {
                q: "Zer gertatzen da abian jarri ondoren aldaketak edo mantentze-lanak behar baditut?",
                a: "Lehen urteko mantentze-lana 100€ da, hosting-a, domeinua eta hasierako laguntza barne. Bigarren urtetik aurrera 200€/urtean da, aldaketa txikiak (testuak, irudiak, doikuntza txikiak) eta etengabeko laguntza barne. Hilean aldaketa asko behar badituzu, hitz egiten dugu eta benetan behar duzunaren arabera egokitzen dugu. Iraupenik gabe, ezustekorik gabe.",
              },
            ]
        ).map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "[data-speakable]"],
        },
      },
      {
        "@type": "Person",
        "@id": "https://unaxaller.com/#person",
        name: "Unax Aller Fernández",
        jobTitle: "Diseñador y Desarrollador Web",
        url: "https://unaxaller.com",
        email: "contacto@unaxaller.com",
        sameAs: [
          "https://linkedin.com/in/unax-aller-8479b428b",
          "https://instagram.com/unaxaller",
        ],
        knowsLanguage: ["es", "fr", "en", "eu"],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad Alfonso X el Sabio",
        },
        worksFor: { "@id": "https://unaxaller.com/#business" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Irun",
          addressRegion: "Gipuzkoa",
          addressCountry: "ES",
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Hero locale={locale} />

      <SectionDivider background="var(--color-bg)" />

      {/* Social Proof */}
      <SocialProof />

      {/* Who's behind — face-to-face moment right before pricing */}
      <AnimatedSection>
        <section className="founder-strip" aria-labelledby="founder-strip-title">
          <div className="container-xl founder-strip-inner">
            <FounderPhoto
              alt={
                locale === "es"
                  ? "Foto de Unax Aller, diseñador y desarrollador web"
                  : locale === "en"
                  ? "Photo of Unax Aller, web designer and developer"
                  : "Unax Aller, web diseinatzaile eta garatzailearen argazkia"
              }
            />
            <div className="founder-strip-content">
              <span className="founder-strip-eyebrow">
                {locale === "es"
                  ? "Quién está detrás"
                  : locale === "en"
                  ? "Who's behind"
                  : "Nor dago atzean"}
              </span>
              <h2 id="founder-strip-title" className="founder-strip-title">
                {locale === "es"
                  ? "Hola, soy Unax."
                  : locale === "en"
                  ? "Hi, I'm Unax."
                  : "Kaixo, Unax naiz."}
              </h2>
              <p className="founder-strip-body">
                {locale === "es"
                  ? "Diseño y desarrollo cada web a mano desde Irun. Hablas conmigo de principio a fin, sin agencias ni intermediarios. Lo que más le meto son ganas y obsesión por el detalle. Si tengo que pasar horas para resolver un detalle pequeño, las paso. Y pienso mucho en qué va a sentir el cliente cuando entre en tu web. Que se sorprenda. Que fluya."
                  : locale === "en"
                  ? "I design and code every site by hand from Irun. You talk to me from start to finish, no agencies, no middlemen. What I bring most is real drive and obsession with the detail. If I need hours to fix a small thing, I take them. And I think a lot about what your client will feel when they land on your site. That they're surprised. That it flows."
                  : "Webgune bakoitza eskuz diseinatu eta garatzen dut Irunetik. Hasieratik bukaerara nirekin hitz egiten duzu, agentziarik gabe, bitartekaririk gabe. Gehien jartzen dudana gogo bizia eta xehetasunarekiko obsesioa da. Xehetasun txiki bat konpontzeko orduak behar baditut, hartu egiten ditut. Eta asko pentsatzen dut zer sentituko duen zure bezeroak webgunera sartzean. Harrituta egotea. Erraz mugitzea."}
              </p>
              <Link
                href={`/${locale}/sobre-nosotros`}
                className="founder-strip-link focusable"
              >
                {locale === "es"
                  ? "Conóceme mejor"
                  : locale === "en"
                  ? "Get to know me"
                  : "Ezagutu nazazu hobeto"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <ProcessStrip locale={locale} />

      {/* Services Grid */}
      <ServicesGrid locale={locale} />

      {/* Projects board — corkboard with polaroids */}
      <AnimatedSection>
        <ProjectsBoard locale={locale} />
      </AnimatedSection>

      {/* Pricing preview */}
      <div className="surface-alt">
        <PricingCards locale={locale} headingLevel="h2" />
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Bottom CTA strip */}
      <AnimatedSection>
        <section className="cta-strip" aria-label="Call to action">
          <div className="container-xl cta-strip-inner">
            <h2 className="cta-strip-title">{t("contact.title")}</h2>
            <p className="cta-strip-subtitle">{t("contact.subtitle")}</p>
            <div className="cta-strip-actions">
              <Link href={`/${locale}/contacto`} className="cta-strip-btn-primary focusable">
                {t("hero.cta")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href={`/${locale}/precios`} className="cta-strip-btn-secondary focusable">
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
