import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ProjectTypeSelector, { type ProjectType } from "@/components/services/ProjectTypeSelector";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

// Cache the rendered HTML on the CDN for 1h. Content changes ship via
// new deploys (which bust the cache), so an hourly fallback is plenty.
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";

  const titles: Record<string, string> = {
    es: "Servicios de Diseño Web en Irun, País Vasco",
    en: "Web Design Services in Irun, Basque Country",
    eu: "Web Diseinu Zerbitzuak Irunen, Euskal Herrian",
    fr: "Services de Création de Sites Web à Irun, Pays Basque",
  };
  const descriptions: Record<string, string> = {
    es: "Servicios de diseño web en Irun, Gipuzkoa: UI/UX a medida, SEO técnico, animaciones GSAP, rendimiento web, multi-idioma y más para negocios del País Vasco.",
    en: "Web design services in Irun, Basque Country: custom UI/UX, technical SEO, GSAP animations, web performance, multi-language and more for Basque businesses.",
    eu: "Web diseinu zerbitzuak Irunen, Gipuzkoan: neurrira egindako UI/UX, SEO teknikoa, GSAP animazioak, web errendimendua, hizkuntza anitza eta gehiago.",
    fr: "Services de création de sites web à Irun, Gipuzkoa : UI/UX sur mesure, SEO technique, animations GSAP, performance web, multilingue et plus pour les entreprises du Pays basque.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}/servicios`,
      languages: hreflangAlternates("/servicios"),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: "/servicios" }),
    twitter: buildTwitter({ title, description }),
  };
}

const VALID_FROM = new Date().toISOString().slice(0, 10);
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

export default async function ServiciosPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu" | "fr";
  const t = await getTranslations({ locale, namespace: "services" });

  const faqItems = locale === "es"
    ? [
        { q: "¿Cuánto tardas en publicar la web?", a: "En una semana desde que cerramos el pago. Lo que más alarga el plazo es esperar tus textos o fotos; cuanto antes me los pases, antes está viva." },
        { q: "¿Qué necesito aportar yo para empezar?", a: "Lo justo: cuéntame qué hace tu negocio, a quién quieres atraer y, si los tienes a mano, logo y fotos. Si no tienes fotos buenas, también lo resolvemos." },
        { q: "¿Incluye el mantenimiento después de la entrega?", a: "Sí. El primer año entero está cubierto: hosting, dominio, SSL, soporte por WhatsApp y los cambios de contenido (textos, fotos, precios, horarios, añadir un servicio). A partir del segundo año, el mantenimiento es de 600€/año. No hay facturas extra." },
        { q: "¿Puedo pedir cambios durante el proyecto?", a: "Sí. Durante el desarrollo te enseño avances por WhatsApp y vamos ajustando hasta que te guste. Después del lanzamiento, los cambios menores entran en la cuota." },
        { q: "¿Trabajas solo con empresas del País Vasco?", a: "Trabajo con negocios del País Vasco y Navarra. Nos vemos por WhatsApp y videollamada, con visitas presenciales cuando el proyecto lo merece." },
      ]
    : locale === "en"
    ? [
        { q: "How long until my site goes live?", a: "In a week from the day we close the payment. What usually slows things down is waiting on your copy or photos. The sooner I get them, the sooner the site is live." },
        { q: "What do I need to provide to get started?", a: "Just enough: tell me what your business does, who you want to attract and, if you have them handy, logo and photos. If you don't have good photos, we'll sort it." },
        { q: "Does it include maintenance after launch?", a: "Yes. The whole first year is covered: hosting, domain, SSL, WhatsApp support and content changes (copy, photos, prices, hours, adding a service). From the second year, maintenance is €600/year. No extra invoices." },
        { q: "Can I request changes during the project?", a: "Yes. While I build it I send you progress over WhatsApp and we adjust until it fits. After launch, minor changes are included in the monthly fee." },
        { q: "Do you only work with Basque Country businesses?", a: "I work with businesses in the Basque Country and Navarre. We meet over WhatsApp and video call, with in-person visits when the project calls for it." },
      ]
    : locale === "eu"
    ? [
        { q: "Zenbat denbora behar da weba argitaratzeko?", a: "Aste batean sinatu eta gero. Atzeratzen duena izaten da zure testuen edo argazkien zain egotea; lehenago bidalita, lehenago dago martxan." },
        { q: "Zer eman behar dut hasteko?", a: "Justu behar dena: zer egiten duen zure negozioak, nor erakarri nahi duzun eta, eskura badituzu, logoa eta argazkiak. Argazki onik ez baduzu, hori ere konponduko dugu." },
        { q: "Mantentze-lana entregatutakoan sartzen al da?", a: "Bai. Lehen urte osoa estalita dago: hosting-a, domeinua, SSL, WhatsApp laguntza eta edukiaren aldaketak (testuak, argazkiak, prezioak, ordutegiak, zerbitzuren bat eranstea). Bigarren urtetik aurrera, mantentze-lana 600€/urteko da. Faktura gehigarririk gabe." },
        { q: "Prozesu bitartean aldaketak eskatu al ditzaket?", a: "Bai. Garapenean WhatsApp bidez aurrerapenak erakusten dizkizut eta gustatu arte doitzen ditugu. Abian jarri ondoren, aldaketa txikiak hileko kuotan sartzen dira." },
        { q: "Euskal Herriko enpresekin bakarrik lan egiten al duzu?", a: "Euskal Herriko eta Nafarroako negozioekin lan egiten dut. WhatsApp eta bideodeiez elkartzen gara, eta presentzialki proiektuak hala eskatzen duenean." },
      ]
    : [
        { q: "Combien de temps avant la mise en ligne de mon site ?", a: "Une semaine à partir du paiement. Ce qui rallonge le plus le délai, c'est l'attente de vos textes ou photos ; plus vite vous me les envoyez, plus vite le site est en ligne." },
        { q: "Qu'est-ce que je dois fournir pour commencer ?", a: "Le strict nécessaire : dites-moi ce que fait votre commerce, qui vous voulez attirer et, si vous les avez sous la main, votre logo et vos photos. Si vous n'avez pas de bonnes photos, on trouve une solution aussi." },
        { q: "La maintenance est-elle incluse après la livraison ?", a: "Oui. Toute la première année est couverte : hébergement, nom de domaine, SSL, support WhatsApp et modifications de contenu (textes, photos, prix, horaires, ajout d'un service). À partir de la deuxième année, la maintenance est de 600 €/an. Aucune facture supplémentaire." },
        { q: "Puis-je demander des changements pendant le projet ?", a: "Oui. Pendant le développement, je vous montre l'avancement par WhatsApp et on ajuste jusqu'à ce que ça vous plaise. Après le lancement, les petites modifications sont incluses dans la maintenance." },
        { q: "Vous travaillez uniquement avec des entreprises du Pays basque ?", a: "Je travaille avec des commerces du Pays basque et de Navarre, des deux côtés de la frontière. On échange par WhatsApp et en visio, avec des rendez-vous en personne quand le projet le mérite." },
      ];

  const howToSteps = locale === "es"
    ? [
        { name: "1. Te enseño una propuesta", text: "Antes de pedirte que firmes nada, te paso una propuesta visual: cómo veo tu web, la dirección de diseño y la estructura. Si no te encaja, ahí acaba y no me debes nada." },
        { name: "2. Si te gusta, firmamos", text: "Un pago único de 1.300€ + IVA, con el primer año de mantenimiento incluido. 30 días de garantía de devolución. La web es tuya, sin cuotas mensuales." },
        { name: "3. Diseño final", text: "Ya con el proyecto en marcha cerramos los detalles: tipografía, paleta, jerarquía, microcopys. Te paso avances por WhatsApp y vamos ajustando hasta que te guste de verdad." },
        { name: "4. Desarrollo", text: "Programo la web a mano, sin plantillas. SEO técnico, multi-idioma si lo necesitas y rápida en móvil. Ficha de Google Maps y sistema de reseñas configurados." },
        { name: "5. Pruebas y lanzamiento", text: "Pruebo en dispositivos reales, paso Lighthouse con Performance, Accessibility y SEO por encima de 95 y valido los datos estructurados. Subimos la web, configuramos dominio, Search Console y Analytics. En una semana desde el pago, viva." },
        { name: "6. Cambios por WhatsApp", text: "El primer año, los cambios de contenido y el mantenimiento van incluidos: me escribes por WhatsApp y lo hago yo, sin formularios ni tickets. Después, el mantenimiento es 600€/año." },
      ]
    : locale === "en"
    ? [
        { name: "1. I show you a proposal", text: "Before I ask you to sign anything, I send you a visual proposal: how I picture your site, the design direction and the structure. If it doesn't click, that's the end of it and you owe me nothing." },
        { name: "2. If you like it, we sign", text: "A one-off €1,300 + VAT, with the first year of maintenance included. 30-day money-back guarantee. The site is yours, with no monthly fees." },
        { name: "3. Final design", text: "With the project underway we lock in the details: type, palette, hierarchy, microcopy. I send progress over WhatsApp and we adjust until you actually like it." },
        { name: "4. Development", text: "I code the site by hand, no templates. Technical SEO, multi-language if you need it and fast on mobile. Google Maps profile and reviews system set up." },
        { name: "5. Testing and launch", text: "I test on real devices, run Lighthouse with Performance, Accessibility and SEO above 95, and validate structured data. We push the site, set up the domain, Search Console and Analytics. A week from the payment and it's live." },
        { name: "6. Changes over WhatsApp", text: "The first year, content changes and maintenance are included: you message me on WhatsApp and I do it, no forms, no tickets. After that, maintenance is €600/year." },
      ]
    : locale === "eu"
    ? [
        { name: "1. Proposamen bat erakusten dizut", text: "Ezer sinatu aurretik, proposamen bisual bat bidaltzen dizut: zure weba nola ikusten dudan, diseinu-norabidea eta egitura. Egokitzen ez bazaizu, hor amaitzen da eta ez didazu ezer zor." },
        { name: "2. Gustatzen bazaizu, sinatzen dugu", text: "1.300€ + BEZ ordainketa bakarra, lehen urteko mantentze-lana barne. 30 eguneko itzulketa-bermea. Weba zurea da, hileko kuotarik gabe." },
        { name: "3. Azken diseinua", text: "Proiektua martxan dugula, xehetasunak ixten ditugu: tipografia, paleta, hierarkia, mikrokopya. Aurrerapenak WhatsApp bidez bidaltzen dizkizut eta benetan gustatu arte doitzen ditugu." },
        { name: "4. Garapena", text: "Weba eskuz programatzen dut, txantiloirik gabe. SEO teknikoa, eleaniztasuna behar baduzu eta mugikorrean azkar. Google Maps fitxa eta iritzi-sistema prest." },
        { name: "5. Probak eta abiaraztea", text: "Benetako gailuetan probatzen dut, Lighthouse 95etik gora Performance, Accessibility eta SEO-n, eta datu egituratuak baliozkotzen ditut. Weba igotzen dugu, domeinua, Search Console eta Analytics konfiguratzen ditugu. Aste batean sinatu eta gero martxan." },
        { name: "6. Aldaketak WhatsApp bidez", text: "Lehen urtean, edukiaren aldaketak eta mantentze-lana barne daude: WhatsApp idazten didazu eta nik egiten dut, formulariorik gabe. Ondoren, mantentze-lana 600€/urteko da." },
      ]
    : [
        { name: "1. Je vous montre une proposition", text: "Avant de vous demander de signer quoi que ce soit, je vous envoie une proposition visuelle : comment je vois votre site, la direction artistique et la structure. Si ça ne vous correspond pas, on s'arrête là et vous ne me devez rien." },
        { name: "2. Si ça vous plaît, on signe", text: "Un paiement unique de 1 300 € + TVA, avec la première année de maintenance incluse. Garantie satisfait ou remboursé de 30 jours. Le site est à vous, sans abonnement mensuel." },
        { name: "3. Design final", text: "Une fois le projet lancé, on fixe les détails : typographie, palette, hiérarchie, microcopy. Je vous envoie l'avancement par WhatsApp et on ajuste jusqu'à ce que ça vous plaise vraiment." },
        { name: "4. Développement", text: "Je code le site à la main, sans template. SEO technique, plusieurs langues si vous en avez besoin et rapide sur mobile. Fiche Google Maps et système d'avis configurés." },
        { name: "5. Tests et lancement", text: "Je teste sur de vrais appareils, je passe Lighthouse avec Performance, Accessibility et SEO au-dessus de 95 et je valide les données structurées. On met le site en ligne, on configure le nom de domaine, Search Console et Analytics. Une semaine après le paiement, c'est en ligne." },
        { name: "6. Changements par WhatsApp", text: "La première année, les modifications de contenu et la maintenance sont incluses : vous m'écrivez sur WhatsApp et je m'en occupe, sans formulaire ni ticket. Ensuite, la maintenance est de 600 €/an." },
      ];

  const comparisonRows = locale === "es"
    ? [
        { feature: "Precio", agency: "2.500€ – 5.000€ solo diseño", unax: "1.300€ + IVA, 1er año incluido" },
        { feature: "Mantenimiento", agency: "Aparte, cada cambio se factura", unax: "1er año incluido, luego 600€/año" },
        { feature: "Tiempo de entrega", agency: "2 – 6 meses", unax: "1 semana" },
        { feature: "Interlocutor", agency: "Comercial, diseñador, dev…", unax: "Solo yo, por WhatsApp" },
        { feature: "Cambios de contenido", agency: "Cada uno se factura", unax: "Incluidos el primer año" },
        { feature: "Garantía de devolución", agency: "No suele existir", unax: "30 días sin preguntas" },
        { feature: "SEO local técnico", agency: "Coste aparte", unax: "Incluido" },
        { feature: "Lighthouse 95+", agency: "Raro", unax: "Garantizado" },
      ]
    : locale === "en"
    ? [
        { feature: "Price", agency: "€2,500 – €5,000 design only", unax: "€1,300 + VAT, first year included" },
        { feature: "Maintenance", agency: "Extra, every change billed", unax: "First year included, then €600/year" },
        { feature: "Delivery time", agency: "2 – 6 months", unax: "1 week" },
        { feature: "Point of contact", agency: "Sales, designer, dev…", unax: "Just me, on WhatsApp" },
        { feature: "Content changes", agency: "Each one billed", unax: "Included the first year" },
        { feature: "Money-back guarantee", agency: "Rarely offered", unax: "30 days, no questions" },
        { feature: "Technical local SEO", agency: "Charged separately", unax: "Included" },
        { feature: "Lighthouse 95+", agency: "Rare", unax: "Guaranteed" },
      ]
    : locale === "eu"
    ? [
        { feature: "Prezioa", agency: "2.500€ – 5.000€ diseinua bakarrik", unax: "1.300€ + BEZ, 1. urtea barne" },
        { feature: "Mantentze-lana", agency: "Aparte, aldaketa bakoitza fakturatua", unax: "1. urtea barne, gero 600€/urteko" },
        { feature: "Entrega denbora", agency: "2 – 6 hilabete", unax: "1 aste" },
        { feature: "Elkarrizketaria", agency: "Komertziala, diseinatzailea…", unax: "Ni bakarrik, WhatsApp-ez" },
        { feature: "Edukiaren aldaketak", agency: "Bakoitza fakturatzen da", unax: "Lehen urtean barne" },
        { feature: "Itzulketa bermea", agency: "Ez ohi dago", unax: "30 egun galderarik gabe" },
        { feature: "Tokiko SEO teknikoa", agency: "Apartetik kobratzen da", unax: "Barne hartuta" },
        { feature: "Lighthouse 95+", agency: "Arraroa", unax: "Bermatua" },
      ]
    : [
        { feature: "Prix", agency: "2 500 € – 5 000 € design seul", unax: "1 300 € + TVA, 1ère année incluse" },
        { feature: "Maintenance", agency: "En plus, chaque changement facturé", unax: "1ère année incluse, puis 600 €/an" },
        { feature: "Délai de livraison", agency: "2 – 6 mois", unax: "1 semaine" },
        { feature: "Interlocuteur", agency: "Commercial, designer, dev…", unax: "Moi seul, par WhatsApp" },
        { feature: "Modifications de contenu", agency: "Chacune facturée", unax: "Incluses la première année" },
        { feature: "Garantie satisfait ou remboursé", agency: "Rarement proposée", unax: "30 jours, sans justification" },
        { feature: "SEO local technique", agency: "Coût en plus", unax: "Inclus" },
        { feature: "Lighthouse 95+", agency: "Rare", unax: "Garanti" },
      ];

  const projectTypes: ProjectType[] = [
    {
      id: "salud",
      accent: "#171717",
      shortLabel:
        locale === "es" ? "Salud y bienestar"
        : locale === "en" ? "Health & wellness"
        : locale === "eu" ? "Osasuna eta ongizatea"
        : "Santé et bien-être",
      label:
        locale === "es" ? "Salud y bienestar"
        : locale === "en" ? "Health & wellness"
        : locale === "eu" ? "Osasuna eta ongizatea"
        : "Santé et bien-être",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        </svg>
      ),
      question:
        locale === "es" ? "Salud y bienestar"
        : locale === "en" ? "Health & wellness"
        : locale === "eu" ? "Osasuna eta ongizatea"
        : "Santé et bien-être",
      intro:
        locale === "es"
          ? "Ópticas, farmacias, clínicas dentales, fisio, podología, estética, peluquerías, veterinarias. Negocios donde el cliente compara antes de entrar y la confianza lo es todo."
          : locale === "en"
          ? "Opticians, pharmacies, dental clinics, physio, podiatry, aesthetics, hair salons, vets. Businesses where customers compare before stepping in and trust is everything."
          : locale === "eu"
          ? "Optikak, farmaziak, klinika dentalak, fisio, podologia, estetika, ile-apaindegiak, albaitariak. Bezeroek sartu aurretik konparatzen duten negozioak, non konfiantza dena den."
          : "Opticiens, pharmacies, cliniques dentaires, kinés, podologues, esthétique, salons de coiffure, vétérinaires. Des commerces où le client compare avant d'entrer et où la confiance fait toute la différence.",
      bullets:
        locale === "es"
          ? [
              "Diseño cuidado que transmite profesionalidad",
              "Optimizada para Google Maps de tu ciudad",
              "Reseñas de Google embebidas para reforzar confianza",
              "Información clara: horarios, servicios, precios",
              "Cita previa integrada si la necesitas",
            ]
          : locale === "en"
          ? [
              "Polished design that signals professionalism",
              "Optimised for Google Maps in your city",
              "Embedded Google reviews to build trust",
              "Clear info: hours, services, pricing",
              "Online booking integrated if you need it",
            ]
          : locale === "eu"
          ? [
              "Diseinu zaindua, profesionaltasuna adierazten duena",
              "Zure herriko Google Maps-erako optimizatua",
              "Google iritziak txertatuta konfiantza indartzeko",
              "Informazio argia: ordutegia, zerbitzuak, prezioak",
              "Online hitzordua integratuta behar baduzu",
            ]
          : [
              "Design soigné qui inspire le professionnalisme",
              "Optimisé pour Google Maps dans votre ville",
              "Avis Google intégrés pour renforcer la confiance",
              "Informations claires : horaires, services, prix",
              "Prise de rendez-vous intégrée si vous en avez besoin",
            ],
    },
    {
      id: "comercio",
      accent: "#0A0A0A",
      shortLabel:
        locale === "es" ? "Comercio local"
        : locale === "en" ? "Local retail"
        : locale === "eu" ? "Tokiko merkataritza"
        : "Commerce local",
      label:
        locale === "es" ? "Comercio local"
        : locale === "en" ? "Local retail"
        : locale === "eu" ? "Tokiko merkataritza"
        : "Commerce local",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9h18l-1.5 10.5a2 2 0 0 1-2 1.5h-11a2 2 0 0 1-2-1.5L3 9Z" />
          <path d="M8 9V6a4 4 0 0 1 8 0v3" />
        </svg>
      ),
      question:
        locale === "es" ? "Comercio local"
        : locale === "en" ? "Local retail"
        : locale === "eu" ? "Tokiko merkataritza"
        : "Commerce local",
      intro:
        locale === "es"
          ? "Tiendas de barrio, moda, joyería, decoración, alimentación, librerías, floristerías, papelerías. Tu escaparate digital cuando la tienda está cerrada."
          : locale === "en"
          ? "Neighbourhood shops, fashion, jewellery, decor, food, bookshops, florists, stationery. Your digital storefront when the shop is closed."
          : locale === "eu"
          ? "Auzoko dendak, moda, bitxitegia, dekorazioa, elikadura, liburu-dendak, lore-dendak, papertegiak. Zure erakusleiho digitala denda itxita dagoenean."
          : "Commerces de quartier, mode, bijouterie, décoration, alimentation, librairies, fleuristes, papeteries. Votre vitrine digitale quand le magasin est fermé.",
      bullets:
        locale === "es"
          ? [
              "Catálogo visual con tus productos destacados",
              "SEO local para aparecer en tu barrio o pueblo",
              "Móvil primero: el cliente te busca desde el sofá",
              "WhatsApp y teléfono visibles en cada página",
              "Integración con Google Maps y reseñas",
            ]
          : locale === "en"
          ? [
              "Visual catalogue with your featured products",
              "Local SEO so you show up in your neighbourhood",
              "Mobile-first: customers search from the sofa",
              "WhatsApp and phone visible on every page",
              "Google Maps and reviews integration",
            ]
          : locale === "eu"
          ? [
              "Katalogo bisuala produktu nabarmenduekin",
              "Tokiko SEOa zure auzoan agertzeko",
              "Mugikorra lehenik: bezeroak sofatik bilatzen zaitu",
              "WhatsApp eta telefonoa orri bakoitzean ikusgai",
              "Google Maps eta iritziekin integrazioa",
            ]
          : [
              "Catalogue visuel avec vos produits phares",
              "SEO local pour apparaître dans votre quartier",
              "Pensé mobile : le client vous cherche depuis son canapé",
              "WhatsApp et téléphone visibles sur chaque page",
              "Intégration avec Google Maps et les avis",
            ],
    },
    {
      id: "automocion",
      accent: "#047857",
      shortLabel:
        locale === "es" ? "Automoción y oficios"
        : locale === "en" ? "Automotive & trades"
        : locale === "eu" ? "Automozioa eta lanbideak"
        : "Automobile et artisanat",
      label:
        locale === "es" ? "Automoción y oficios"
        : locale === "en" ? "Automotive & trades"
        : locale === "eu" ? "Automozioa eta lanbideak"
        : "Automobile et artisanat",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
        </svg>
      ),
      question:
        locale === "es" ? "Automoción y oficios"
        : locale === "en" ? "Automotive & trades"
        : locale === "eu" ? "Automozioa eta lanbideak"
        : "Automobile et artisanat",
      intro:
        locale === "es"
          ? "Talleres mecánicos, neumáticos, chapa y pintura, fontaneros, electricistas, reformas, cerrajeros, climatización, jardinería. Quien necesita ayuda urgente busca y llama al primero que le inspira confianza."
          : locale === "en"
          ? "Mechanics, tyres, bodywork, plumbers, electricians, renovations, locksmiths, HVAC, gardening. People who need urgent help call the first business that earns their trust."
          : locale === "eu"
          ? "Tailerrak, pneumatikoak, txapa eta pintura, iturginak, elektrikariak, erreformak, sarrailariak, klimatizazioa, lorezaintza. Premiazko laguntza behar duenak konfiantza ematen dion lehenari deitzen dio."
          : "Garages mécaniques, pneus, carrosserie-peinture, plombiers, électriciens, rénovation, serruriers, climatisation, jardinage. Qui a besoin d'une aide urgente cherche et appelle le premier qui lui inspire confiance.",
      bullets:
        locale === "es"
          ? [
              "Llamada directa en un toque desde el móvil",
              "Servicios y zonas que cubres bien explicados",
              "Casos antes/después y trabajos reales",
              "SEO local para urgencias en tu comarca",
              "Formulario de presupuesto rápido",
            ]
          : locale === "en"
          ? [
              "Tap-to-call straight from mobile",
              "Services and coverage areas clearly explained",
              "Before/after cases and real jobs",
              "Local SEO for urgent calls in your area",
              "Quick quote form",
            ]
          : locale === "eu"
          ? [
              "Mugikorretik zuzeneko deia ukitu batean",
              "Zerbitzuak eta estaltzen dituzun eremuak ondo azalduta",
              "Aurretik/ondoren kasuak eta benetako lanak",
              "Tokiko SEOa zure eskualdeko presetarako",
              "Aurrekontu azkarrerako formularioa",
            ]
          : [
              "Appel direct en un geste depuis le mobile",
              "Services et zones couvertes bien expliqués",
              "Cas avant/après et vrais chantiers",
              "SEO local pour les urgences dans votre secteur",
              "Formulaire de devis rapide",
            ],
    },
    {
      id: "profesionales",
      accent: "#0a0a0a",
      shortLabel:
        locale === "es" ? "Servicios profesionales"
        : locale === "en" ? "Professional services"
        : locale === "eu" ? "Zerbitzu profesionalak"
        : "Services professionnels",
      label:
        locale === "es" ? "Servicios profesionales"
        : locale === "en" ? "Professional services"
        : locale === "eu" ? "Zerbitzu profesionalak"
        : "Services professionnels",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 4v4M16 4v4" />
        </svg>
      ),
      question:
        locale === "es" ? "Servicios profesionales"
        : locale === "en" ? "Professional services"
        : locale === "eu" ? "Zerbitzu profesionalak"
        : "Services professionnels",
      intro:
        locale === "es"
          ? "Asesorías, gestorías, abogados, despachos, consultorías, ingenierías, arquitectos, academias, autoescuelas. Servicios con ticket alto donde el cliente compara online antes de llamar."
          : locale === "en"
          ? "Accountants, lawyers, firms, consultancies, engineering, architects, academies, driving schools. High-ticket services where clients compare online before they call."
          : locale === "eu"
          ? "Aholkularitzak, kudeaketak, abokatuak, bulegoak, kontsultoretzak, ingeniaritzak, arkitektoak, akademiak, autoeskolak. Tiket altuko zerbitzuak, non bezeroak online konparatzen duten deitu aurretik."
          : "Cabinets comptables, avocats, cabinets, consultants, ingénierie, architectes, écoles, auto-écoles. Des services à panier élevé où le client compare en ligne avant d'appeler.",
      bullets:
        locale === "es"
          ? [
              "Identidad sobria que transmite autoridad",
              "Áreas de práctica y servicios claros",
              "Equipo visible con foto y especialidad",
              "Formulario cualificado que filtra leads serios",
              "Política de privacidad y RGPD impecables",
            ]
          : locale === "en"
          ? [
              "Restrained identity that signals authority",
              "Clear practice areas and services",
              "Visible team with photo and specialty",
              "Qualifying form that filters serious leads",
              "Spotless privacy policy and GDPR",
            ]
          : locale === "eu"
          ? [
              "Identitate neurritua, autoritatea adierazten duena",
              "Jarduera-arlo eta zerbitzu argiak",
              "Ekipo ikusgaia argazkiarekin eta espezialitatearekin",
              "Lead serioak iragazten dituen formularioa",
              "Pribatutasun-politika eta DBEO akatsik gabeak",
            ]
          : [
              "Identité sobre qui inspire l'autorité",
              "Domaines de pratique et services clairs",
              "Équipe visible avec photo et spécialité",
              "Formulaire qualifiant qui filtre les prospects sérieux",
              "Politique de confidentialité et RGPD irréprochables",
            ],
    },
    {
      id: "industria",
      accent: "#a16207",
      shortLabel:
        locale === "es" ? "Industria y B2B"
        : locale === "en" ? "Industry & B2B"
        : locale === "eu" ? "Industria eta B2B"
        : "Industrie et B2B",
      label:
        locale === "es" ? "Industria y B2B local"
        : locale === "en" ? "Local industry & B2B"
        : locale === "eu" ? "Tokiko industria eta B2B"
        : "Industrie et B2B local",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 20h20" />
          <path d="M4 20V10l5 4V10l5 4V6l5 4v10" />
        </svg>
      ),
      question:
        locale === "es" ? "Industria y B2B"
        : locale === "en" ? "Industry & B2B"
        : locale === "eu" ? "Industria eta B2B"
        : "Industrie et B2B",
      intro:
        locale === "es"
          ? "Pequeñas industrias de polígono, talleres de fabricación, proveedores B2B, distribución, almacenes. Capacidad técnica, certificaciones visibles y un formulario de cotización serio."
          : locale === "en"
          ? "Small industrial estate businesses, manufacturing workshops, B2B suppliers, distribution, warehouses. Technical capability, visible certifications and a serious quote form."
          : locale === "eu"
          ? "Poligonoetako industria txikiak, fabrikazio-tailerrak, B2B hornitzaileak, banaketa, biltegiak. Gaitasun teknikoa, ziurtagiri ikusgaiak eta aurrekontu serio baterako formularioa."
          : "Petites industries de zones industrielles, ateliers de fabrication, fournisseurs B2B, distribution, entrepôts. Capacité technique, certifications visibles et un formulaire de devis sérieux.",
      bullets:
        locale === "es"
          ? [
              "Hasta 4 idiomas: euskera, castellano, inglés, francés",
              "Estructura para catálogo técnico y muchas subpáginas",
              "Certificaciones y casos de éxito destacados",
              "SEO técnico para posicionar en cada mercado",
              "Formulario de cotización con datos cualificadores",
            ]
          : locale === "en"
          ? [
              "Up to 4 languages: Basque, Spanish, English, French",
              "Architecture for technical catalogue and many subpages",
              "Certifications and case studies highlighted",
              "Technical SEO that ranks in each market",
              "Quote form with qualifying data",
            ]
          : locale === "eu"
          ? [
              "4 hizkuntzatara arte: euskara, gaztelania, ingelesa, frantsesa",
              "Katalogo teknikorako eta azpiorri ugarirako egitura",
              "Ziurtagiriak eta arrakasta-kasuak nabarmenduta",
              "Merkatu bakoitzean posizionatzeko SEO teknikoa",
              "Datu kualifikatzaileak dituen aurrekontu-formularioa",
            ]
          : [
              "Jusqu'à 4 langues : basque, espagnol, anglais, français",
              "Architecture pour catalogue technique et nombreuses sous-pages",
              "Certifications et cas de succès mis en avant",
              "SEO technique pour se positionner sur chaque marché",
              "Formulaire de devis avec données qualifiantes",
            ],
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...projectTypes.map((pt) => ({
        "@type": "Service",
        "@id": `https://unaxaller.com/${locale}/servicios#${pt.id}`,
        provider: { "@id": "https://unaxaller.com/#business" },
        name: pt.label,
        description: pt.intro,
        serviceType: pt.label,
        url: `https://unaxaller.com/${locale}/servicios#${pt.id}`,
        areaServed: [
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
          { "@type": "AdministrativeArea", name: "Navarra" },
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "1300",
          availability: "https://schema.org/InStock",
        },
      })),
      {
        "@type": "Service",
        "@id": `https://unaxaller.com/${locale}/servicios#service`,
        provider: { "@id": "https://unaxaller.com/#business" },
        serviceType: "Diseño y Desarrollo Web",
        name: locale === "es" ? "Servicios de Diseño Web Profesional" : locale === "en" ? "Professional Web Design Services" : locale === "eu" ? "Web Diseinu Zerbitzu Profesionalak" : "Services de Design Web Professionnel",
        description: locale === "es"
          ? "Diseño web a medida, desarrollo en Next.js, SEO técnico, rendimiento Lighthouse 95+ y multi-idioma para negocios del País Vasco."
          : locale === "en"
          ? "Custom web design, Next.js development, technical SEO, Lighthouse 95+ performance and multi-language for Basque Country businesses."
          : locale === "eu"
          ? "Neurrira egindako web diseinua, Next.js-ekin garapena, SEO teknikoa, Lighthouse 95+ errendimendua eta eleaniztasuna Euskal Herriko negozioetarako."
          : "Design web sur mesure, développement Next.js, SEO technique, performance Lighthouse 95+ et multilingue pour les entreprises du Pays basque.",
        areaServed: [
          { "@type": "City", name: "Irun" },
          { "@type": "AdministrativeArea", name: "Gipuzkoa" },
          { "@type": "AdministrativeArea", name: "País Vasco" },
          { "@type": "AdministrativeArea", name: "Navarra" },
        ],
        audience: {
          "@type": "BusinessAudience",
          audienceType: locale === "es" ? "PyMEs, autónomos y comercios locales" : locale === "en" ? "SMEs, freelancers and local businesses" : locale === "eu" ? "ETE, autonomoak eta tokiko merkataritza" : "PME, indépendants et commerces locaux",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "1300",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "1300",
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
          },
          availability: "https://schema.org/InStock",
          validFrom: VALID_FROM,
          priceValidUntil: PRICE_VALID_UNTIL,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Servicios de Diseño Web" : locale === "en" ? "Web Design Services" : locale === "eu" ? "Web Diseinu Zerbitzuak" : "Services de Design Web",
          itemListElement: projectTypes.map((pt, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name: pt.label, description: pt.intro, serviceType: pt.label },
          })),
        },
      },
      {
        "@type": "HowTo",
        "@id": `https://unaxaller.com/${locale}/servicios#howto`,
        name: locale === "es" ? "Cómo contratar una web profesional con Unax Aller" : locale === "en" ? "How to hire a professional website with Unax Aller" : locale === "eu" ? "Nola kontratatu web profesional bat Unax Allerekin" : "Comment commander un site professionnel avec Unax Aller",
        totalTime: "P10D",
        estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
        step: howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `https://unaxaller.com/${locale}/servicios#paso-${i + 1}`,
        })),
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
          { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : locale === "eu" ? "Hasiera" : "Accueil", item: `https://unaxaller.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "es" ? "Servicios" : locale === "en" ? "Services" : locale === "eu" ? "Zerbitzuak" : "Services", item: `https://unaxaller.com/${locale}/servicios` },
        ],
      },
    ],
  };

  return (
    <>
      <style>{`
        @keyframes svcFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes svcChipIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .svc-hero { position:relative;overflow:hidden;padding-block:var(--space-16);background:linear-gradient(180deg,var(--color-bg-muted) 0%,var(--color-bg) 100%); }
        .svc-hero-mark { position:absolute;top:-6rem;right:-6rem;width:520px;height:auto;opacity:.05;pointer-events:none;user-select:none;transform:rotate(-8deg); }
        @media(max-width:768px){ .svc-hero-mark{width:320px;top:-3rem;right:-4rem;opacity:.06} }
        .svc-hero-inner { position:relative;z-index:1;animation: svcFadeUp 0.7s cubic-bezier(.16,1,.3,1) both;max-width:780px; }
        .svc-chip { display:inline-flex;align-items:center;background:#fff;border:1px solid rgba(10, 10, 10, .12);color:var(--color-ink);border-radius:var(--radius-full);padding:.35rem .85rem;font-size:var(--text-xs);font-family:var(--font-sans);font-weight:500;animation:svcChipIn .6s cubic-bezier(.16,1,.3,1) .3s both;box-shadow:0 1px 2px rgba(2,6,23,.04); }
        .svc-chip--accent { background:var(--color-ink);color:#fff;border-color:var(--color-ink); }
        .svc-chips { display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-6); }

        .svc-bento { display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-5); }
        @media(max-width:768px){ .svc-bento{grid-template-columns:1fr;gap:var(--space-4)} }
        .svc-card { position:relative;padding:2rem;border-radius:var(--radius-2xl);border:1px solid rgba(10, 10, 10, .08);overflow:hidden;background:#fff;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;display:flex;flex-direction:column; }
        .svc-card::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--svc-accent,#0A0A0A);opacity:.85; }
        .svc-card:hover { transform:translateY(-2px);border-color:rgba(10, 10, 10, .15);box-shadow:0 12px 32px rgba(2,6,23,.08); }
        .svc-card-order { position:absolute;top:1.25rem;right:1.5rem;font-family:var(--font-serif);font-size:3.5rem;line-height:1;color:rgba(10, 10, 10, .06);pointer-events:none;user-select:none;font-weight:700; }
        .svc-icon-wrap { width:48px;height:48px;border-radius:var(--radius-lg);background:color-mix(in srgb,var(--svc-accent,#0A0A0A) 12%,transparent);display:flex;align-items:center;justify-content:center;color:var(--svc-accent,#0A0A0A);margin-bottom:var(--space-5);transition:transform .25s ease; }
        .svc-card:hover .svc-icon-wrap { transform:scale(1.08) rotate(-3deg); }
        .svc-card-title { font-family:var(--font-serif);font-size:var(--text-xl);color:var(--color-ink);margin-bottom:var(--space-3);line-height:var(--lh-snug);font-weight:600; }
        .svc-card-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed);margin-bottom:var(--space-5); }
        .svc-bullets { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-2);margin-top:auto; }
        .svc-bullet { display:flex;align-items:flex-start;gap:var(--space-2);font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink);line-height:var(--lh-normal); }
        .svc-bullet-check { color:var(--svc-accent,#0A0A0A);flex-shrink:0;font-weight:700;line-height:1.4; }

        .svc-process-section { background:var(--color-bg-muted);padding-block:var(--space-16); }
        .svc-timeline { display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-6);position:relative;counter-reset:step; }
        .svc-timeline::before { content:'';position:absolute;top:1.5rem;left:6%;right:6%;border-top:2px dashed rgba(10, 10, 10, .12);pointer-events:none;z-index:0; }
        @media(max-width:900px){ .svc-timeline{grid-template-columns:1fr;gap:var(--space-5)} .svc-timeline::before{display:none} }
        .svc-step { position:relative;z-index:1; }
        .svc-step-num { display:inline-flex;align-items:center;justify-content:center;width:3rem;height:3rem;border-radius:50%;background:var(--color-ink);color:#fff;font-family:var(--font-serif);font-size:var(--text-md);font-weight:700;line-height:1;margin-bottom:var(--space-4);box-shadow:0 4px 12px rgba(2,6,23,.15); }
        .svc-step-title { font-family:var(--font-sans);font-size:var(--text-md);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-2); }
        .svc-step-desc { font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);line-height:var(--lh-relaxed); }

        .svc-table-wrap { overflow-x:auto;border-radius:var(--radius-xl);border:1px solid rgba(2,6,23,.08);background:#fff; }
        .svc-compare-table { width:100%;border-collapse:separate;border-spacing:0; }
        .svc-compare-table th,.svc-compare-table td { padding:1rem 1.25rem;text-align:left;font-family:var(--font-sans);font-size:var(--text-sm);border-bottom:1px solid rgba(10, 10, 10, .06); }
        .svc-compare-table tr:last-child td { border-bottom:0; }
        .svc-compare-table th { font-weight:600;font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.08em;color:var(--color-ink-muted);background:var(--color-bg-muted); }
        .svc-col-agency { color:var(--color-ink-muted); }
        .svc-col-unax { color:var(--color-ink);background:#fafafa;border-left:2px solid #0A0A0A;font-weight:500; }
        .svc-col-unax-head { background:var(--color-ink);color:#fff;border-left:2px solid #0A0A0A;font-weight:700; }
        .svc-check { color:#047857;font-weight:700; }
        .svc-cross { color:#9ca3af; }

        .svc-faq-section { background:var(--color-bg);padding-block:var(--space-16); }
        .svc-cta-section { background:var(--color-ink);color:#fff;padding-block:var(--space-16);text-align:center;position:relative;overflow:hidden; }
        .svc-cta-section::before { content:'';position:absolute;top:-6rem;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(220,38,38,.12) 0%,transparent 60%);pointer-events:none; }
        .svc-cta-inner { position:relative;z-index:1; }
        .svc-cta-section .lp-eyebrow { color:#0A0A0A; }
        .svc-cta-section h2 { color:#fff;font-family:var(--font-serif); }
        .svc-cta-section .svc-cta-lead { color:rgba(255,255,255,.72); }
        .svc-cta-footnote { margin-top:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(255,255,255,.5); }
        /* Button overrides for dark CTA section */
        .svc-cta-section .btn-primary { background:#0A0A0A;color:#fff;border-color:#0A0A0A;box-shadow:0 8px 24px rgba(220,38,38,.35); }
        .svc-cta-section .btn-primary:hover { background:#ef4444;border-color:#ef4444;box-shadow:0 12px 32px rgba(220,38,38,.45);transform:translateY(-2px); }
        .svc-cta-section .btn-primary:active { transform:translateY(0); }
        .svc-cta-section .btn-secondary { background:transparent;color:#fff;border-color:rgba(255,255,255,.25); }
        .svc-cta-section .btn-secondary:hover { background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.5);color:#fff;transform:translateY(-2px); }
        .svc-cta-section .btn-secondary:active { transform:translateY(0);background:rgba(255,255,255,.12); }

        /* ── Project type selector (quiz-style tabs) ── */
        .svc-quiz { max-width:1120px;margin:0 auto; }
        .svc-quiz-header { text-align:center;margin-bottom:var(--space-8); }
        .svc-quiz-eyebrow { font-family:var(--font-sans);font-size:var(--text-xs);font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--color-ink-muted);margin:0 0 var(--space-3); }
        .svc-quiz-question { font-family:var(--font-serif);font-size:clamp(1.75rem,3.4vw,2.5rem);font-weight:500;line-height:1.15;color:var(--color-ink);margin:0;letter-spacing:-.01em; }

        .svc-quiz-tablist { display:grid;grid-template-columns:repeat(5,1fr);gap:var(--space-3);margin-bottom:var(--space-8); }
        @media(max-width:1100px){ .svc-quiz-tablist{grid-template-columns:repeat(3,1fr);gap:var(--space-2)} }
        @media(max-width:720px){ .svc-quiz-tablist{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:480px){ .svc-quiz-tablist{grid-template-columns:1fr} }

        .svc-quiz-tab { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6rem;min-height:96px;padding:1rem .75rem;background:#fff;border:1px solid rgba(2,6,23,.1);border-radius:var(--radius-xl);cursor:pointer;font-family:var(--font-sans);font-size:var(--text-sm);font-weight:500;color:var(--color-ink-muted);text-align:center;line-height:1.25;transition:transform .2s var(--ease-out),border-color .2s var(--ease-out),box-shadow .2s var(--ease-out),color .2s var(--ease-out),background .2s var(--ease-out); }
        .svc-quiz-tab:hover { transform:translateY(-1px);border-color:rgba(2,6,23,.18);color:var(--color-ink);box-shadow:0 6px 18px -8px rgba(2,6,23,.12); }
        .svc-quiz-tab[data-active="true"] { background:var(--color-ink);color:#fff;border-color:var(--color-ink);box-shadow:0 8px 22px -10px rgba(2,6,23,.45); }
        .svc-quiz-tab[data-active="true"] .svc-quiz-tab-icon { background:color-mix(in srgb,var(--svc-accent,#0A0A0A) 35%,transparent);color:#fff; }
        .svc-quiz-tab-icon { display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:var(--radius-full);background:color-mix(in srgb,var(--svc-accent,#0A0A0A) 12%,transparent);color:var(--svc-accent,#0A0A0A);transition:background .2s var(--ease-out),color .2s var(--ease-out); }
        .svc-quiz-tab-label { font-weight:600;font-size:.875rem; }

        .svc-quiz-panels { position:relative; }
        .svc-quiz-panel { background:#fff;border:1px solid rgba(2,6,23,.08);border-radius:var(--radius-2xl);padding:clamp(1.5rem,3vw,2.5rem);position:relative;overflow:hidden;animation:svcFadeUp .35s cubic-bezier(.16,1,.3,1) both; }
        .svc-quiz-panel::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--svc-accent,#0A0A0A);opacity:.9; }
        .svc-quiz-panel[hidden] { display:none; }
        .svc-quiz-panel-head { display:flex;align-items:center;gap:.85rem;margin-bottom:var(--space-4); }
        .svc-quiz-panel-icon { display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:var(--radius-lg);background:color-mix(in srgb,var(--svc-accent,#0A0A0A) 14%,transparent);color:var(--svc-accent,#0A0A0A);flex-shrink:0; }
        .svc-quiz-panel-title { font-family:var(--font-serif);font-size:clamp(1.25rem,2.4vw,1.75rem);font-weight:500;color:var(--color-ink);margin:0;line-height:1.2; }
        .svc-quiz-panel-intro { font-family:var(--font-sans);font-size:clamp(.95rem,1.4vw,1.0625rem);line-height:1.65;color:var(--color-ink-muted);margin:0 0 var(--space-6);max-width:68ch; }

        .svc-quiz-bullets { list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3) var(--space-5); }
        @media(max-width:680px){ .svc-quiz-bullets{grid-template-columns:1fr} }
        .svc-quiz-bullet { display:flex;align-items:flex-start;gap:.65rem;font-family:var(--font-sans);font-size:var(--text-sm);line-height:1.55;color:var(--color-ink); }
        .svc-quiz-bullet-check { display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:var(--radius-full);background:color-mix(in srgb,var(--svc-accent,#0A0A0A) 14%,transparent);color:var(--svc-accent,#0A0A0A);flex-shrink:0;margin-top:1px; }

        @media (prefers-reduced-motion: reduce) {
          .svc-quiz-tab,.svc-quiz-panel { animation:none;transition:none; }
          .svc-quiz-tab:hover { transform:none; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ── HERO ── */}
      <section
        className="svc-hero"
        aria-label={locale === "es" ? "Servicios" : locale === "en" ? "Services" : locale === "eu" ? "Zerbitzuak" : "Services"}
      >
        <Image
          src="/images/brand/logo-mark.webp"
          alt=""
          width={602}
          height={359}
          className="svc-hero-mark"
          aria-hidden="true"
          priority={false}
        />
        <div className="container-xl">
          <div className="svc-hero-inner">
            <Breadcrumbs
              items={[
                { name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : locale === "eu" ? "Hasiera" : "Accueil", href: `/${locale}` },
                { name: locale === "es" ? "Servicios" : locale === "en" ? "Services" : locale === "eu" ? "Zerbitzuak" : "Services" },
              ]}
            />
            <p className="page-hero-eyebrow lp-eyebrow" style={{ marginTop: "var(--space-6)" }}>
              {locale === "es" ? "Lo que hago" : locale === "en" ? "What I do" : locale === "eu" ? "Zer egiten dudan" : "Ce que je fais"}
            </p>
            <h1 className="page-hero-title" style={{ fontFamily: "var(--font-serif)" }}>{t("title")}</h1>
            <p className="page-hero-subtitle">{t("subtitle")}</p>
            <div className="svc-chips">
              <span className="svc-chip svc-chip--accent">
                {locale === "es" ? "1.300€ · 1er año incluido" : locale === "en" ? "€1,300 · first year included" : locale === "eu" ? "1.300€ · 1. urtea barne" : "1 300 € · 1ère année incluse"}
              </span>
              <span className="svc-chip">{locale === "es" ? "Entrega en 1 semana" : locale === "en" ? "Delivered in a week" : locale === "eu" ? "Aste batean" : "Livré en 1 semaine"}</span>
              <span className="svc-chip">{locale === "es" ? "30 días de garantía" : locale === "en" ? "30-day guarantee" : locale === "eu" ? "30 eguneko bermea" : "Garantie 30 jours"}</span>
              <span className="svc-chip">Lighthouse 95+</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTOR POR TIPO DE NEGOCIO ── */}
      <AnimatedSection>
        <section
          aria-labelledby="services-grid-title"
          style={{ paddingBlock: "var(--space-16)" }}
        >
          <div className="container-xl">
            <ProjectTypeSelector
              types={projectTypes}
              locale={locale}
              headingId="services-grid-title"
            />
          </div>
        </section>
      </AnimatedSection>

      {/* ── PROCESO ── */}
      <AnimatedSection>
        <section className="svc-process-section" aria-labelledby="process-title">
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "El proceso" : locale === "en" ? "The process" : locale === "eu" ? "Prozesua" : "Le processus"}
            </p>
            <h2 id="process-title" className="section-heading" style={{ marginBottom: "var(--space-10)" }}>
              {locale === "es" ? "Cómo trabajo" : locale === "en" ? "How I work" : locale === "eu" ? "Nola lan egiten dudan" : "Comment je travaille"}
            </h2>
            <div className="svc-timeline">
              {howToSteps.slice(0, 4).map((step, i) => (
                <div key={i} id={`paso-${i + 1}`} className="svc-step">
                  <div className="svc-step-num" aria-hidden="true">{i + 1}</div>
                  <div className="svc-step-title">{step.name.replace(/^\d+\.\s*/, "")}</div>
                  <p className="svc-step-desc">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── TABLA COMPARATIVA ── */}
      <AnimatedSection>
        <section aria-labelledby="compare-title" style={{ paddingBlock: "var(--space-16)" }}>
          <div className="container-xl">
            <p className="lp-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {locale === "es" ? "La diferencia" : locale === "en" ? "The difference" : locale === "eu" ? "Aldea" : "La différence"}
            </p>
            <h2 id="compare-title" className="section-heading" style={{ marginBottom: "var(--space-10)" }}>
              {locale === "es" ? "Agencia vs Unax" : locale === "en" ? "Agency vs Unax" : locale === "eu" ? "Agentzia vs Unax" : "Agence vs Unax"}
            </h2>
            <div className="svc-table-wrap">
              <table className="svc-compare-table">
                <thead>
                  <tr>
                    <th style={{ width: "34%" }}>
                      {locale === "es" ? "Punto" : locale === "en" ? "Point" : locale === "eu" ? "Puntua" : "Critère"}
                    </th>
                    <th>
                      {locale === "es" ? "Agencia tradicional" : locale === "en" ? "Traditional agency" : locale === "eu" ? "Agentzia tradizionala" : "Agence traditionnelle"}
                    </th>
                    <th className="svc-col-unax-head">Unax · Tu web</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--color-ink)", fontWeight: 600 }}>{row.feature}</td>
                      <td className="svc-col-agency">
                        <span className="svc-cross" aria-hidden="true">✗</span>{" "}{row.agency}
                      </td>
                      <td className="svc-col-unax">
                        <span className="svc-check" aria-hidden="true">✓</span>{" "}{row.unax}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── FAQ ── */}
      <AnimatedSection>
        <section className="svc-faq-section" aria-labelledby="faq-services-title">
          <div className="container-xl">
            <div className="faq-wrap">
              <h2 id="faq-services-title" className="section-heading">
                {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : locale === "eu" ? "Galdera ohikoak" : "Questions fréquentes"}
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
      <section className="svc-cta-section" aria-labelledby="cta-services-title">
        <div className="container-xl svc-cta-inner">
          <p className="lp-eyebrow" style={{ marginBottom: "var(--space-4)" }}>
            {locale === "es" ? "Sin papeleo. Sin desembolso." : locale === "en" ? "No paperwork. No upfront cost." : locale === "eu" ? "Paperik gabe. Hasierako kosturik gabe." : "Sans paperasse. Sans avance de frais."}
          </p>
          <h2 id="cta-services-title" className="section-heading" style={{ marginBottom: "var(--space-4)", maxWidth: "780px", marginInline: "auto" }}>
            {locale === "es"
              ? "Cuéntame tu negocio. En 7 días tienes web."
              : locale === "en"
              ? "Tell me about your business. In 7 days you have a site."
              : locale === "eu"
              ? "Esan zure negozioari buruz. 7 egunean weba duzu."
              : "Parlez-moi de votre commerce. En 7 jours, votre site est prêt."}
          </h2>
          <p className="svc-cta-lead" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-md)", marginBottom: "var(--space-8)", maxWidth: "640px", marginInline: "auto", lineHeight: "var(--lh-relaxed)" }}>
            {locale === "es"
              ? "30 minutos por teléfono o un café. Te enseño cómo te está quitando llamadas tu competencia en Google y qué haría yo en tu caso."
              : locale === "en"
              ? "30 minutes on the phone or over coffee. I show you how competitors are taking calls from you on Google and what I'd do in your case."
              : locale === "eu"
              ? "30 minutu telefonoz edo kafe baten. Erakusten dizut lehiakideek nola kentzen dizkizuten deiak Googlen."
              : "30 minutes au téléphone ou autour d'un café. Je vous montre comment vos concurrents vous prennent des appels sur Google et ce que je ferais dans votre cas."}
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/${locale}/contacto`} className="btn btn-primary btn-lg focusable">
              {locale === "es" ? "Pedir auditoría gratis →" : locale === "en" ? "Request free audit →" : locale === "eu" ? "Doako auditoria eskatu →" : "Demander un audit gratuit →"}
            </Link>
            <a
              href="https://wa.me/34620909916"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg focusable"
            >
              {locale === "es" ? "WhatsApp directo" : locale === "en" ? "WhatsApp direct" : locale === "eu" ? "WhatsApp zuzena" : "WhatsApp direct"}
            </a>
          </div>
          <p className="svc-cta-footnote">
            {locale === "es"
              ? "Sin compromiso · Respuesta el mismo día · Hablas siempre conmigo"
              : locale === "en"
              ? "No commitment · Same-day reply · You always talk to me"
              : locale === "eu"
              ? "Konpromisorik gabe · Egun bereko erantzuna · Beti nirekin hitz egiten duzu"
              : "Sans engagement · Réponse le jour même · Vous parlez toujours avec moi"}
          </p>
        </div>
      </section>
    </>
  );
}
