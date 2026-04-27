import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { hreflangAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const SLUG = "/colabora";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Colabora — Appointment Setter B2B (100% remoto · comisión)",
    en: "Collaborate — B2B Appointment Setter (100% remote · commission)",
    eu: "Lankidetza — B2B Appointment Setter (100% urrutikoa · komisioa)",
  };
  const descriptions: Record<string, string> = {
    es: "Busco appointment setter freelance para captación B2B de clientes (clínicas, despachos, pymes). 15% comisión, 100% remoto, ticket 1.500-2.000€.",
    en: "Looking for a freelance appointment setter for B2B client outreach (clinics, professional firms, SMEs). 15% commission, 100% remote, ticket €1,500-2,000.",
    eu: "Appointment setter freelancea bilatzen dut B2B bezeroen kontaktazioa egiteko (klinikak, bulego profesionalak, ETEak). %15 komisioa, %100 urrutikoa, 1.500-2.000€ tiketa.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://unaxaller.com/${locale}${SLUG}`,
      languages: hreflangAlternates(SLUG),
    },
    openGraph: buildOpenGraph({ locale, title, description, path: SLUG }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ColaboraPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  // JSON-LD JobPosting — Google Jobs picks this up if posted publicly
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        "@id": `https://unaxaller.com/${locale}${SLUG}#job`,
        title:
          locale === "es"
            ? "Appointment Setter B2B — Captación de clientes"
            : locale === "en"
            ? "B2B Appointment Setter — Client outreach"
            : "B2B Appointment Setter — Bezeroen kontaktazioa",
        description:
          locale === "es"
            ? "Captación de clientes B2B en frío para servicios de diseño y desarrollo web. Modelo 100% a comisión (15%). Foco en clínicas, despachos profesionales y pymes en País Vasco, Navarra y norte de España."
            : locale === "en"
            ? "Cold B2B client outreach for web design and development services. 100% commission model (15%). Focus on clinics, professional firms and SMEs in the Basque Country, Navarra and northern Spain."
            : "Hotz B2B bezeroen kontaktazioa web diseinu eta garapen zerbitzuetarako. %100 komisio eredua (%15). Klinika, bulego profesional eta ETEetan oinarritua Euskal Herrian, Nafarroan eta Espainiako iparraldean.",
        datePosted: "2026-04-27",
        validThrough: "2026-12-31",
        employmentType: "CONTRACTOR",
        hiringOrganization: {
          "@type": "Organization",
          name: "Unax Aller — Diseño y Desarrollo Web",
          sameAs: "https://unaxaller.com",
          logo: "https://unaxaller.com/favicon.svg",
        },
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: {
          "@type": "Country",
          name: "ES",
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: {
            "@type": "QuantitativeValue",
            value: 0,
            unitText: "MONTH",
          },
        },
        jobBenefits:
          locale === "es"
            ? "100% remoto, horario flexible, sin permanencia. 15% comisión por cierre + bonus de 50€ por las primeras 5 reuniones cualificadas. Pago a 7 días."
            : locale === "en"
            ? "100% remote, flexible hours, no lock-in. 15% commission per close + €50 bonus for first 5 qualified meetings. Payment in 7 days."
            : "%100 urrutikoa, ordutegi malgua, iraunkortasunik gabe. %15 komisioa itxieragatik + 50€ bonusa lehen 5 bilera kualifikatuengatik. 7 egunetan ordainketa.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Hasiera",
            item: `https://unaxaller.com/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "es" ? "Colabora" : locale === "en" ? "Collaborate" : "Lankidetza",
            item: `https://unaxaller.com/${locale}${SLUG}`,
          },
        ],
      },
    ],
  };

  // Heavy lift: all visible copy, kept inline because it's a single-purpose page.
  // If we ever spin up a /trabaja-conmigo or similar, extract to i18n then.
  const t =
    locale === "es"
      ? {
          eyebrow: "Colabora conmigo",
          title: "Appointment Setter B2B (100% remoto · a comisión)",
          intro:
            "Estoy haciendo webs para clínicas y empresas yo solo desde Irun, y necesito a alguien que me ayude con la parte de captar clientes. Yo me quedo con el cierre y el desarrollo.",
          line2: "Busco un appointment setter freelance para prospección B2B en frío.",
          h2What: "Qué harías",
          what: "Contactar empresas por email frío y LinkedIn (clínicas dentales, fisioterapia, despachos profesionales, pymes con web vieja). Foco en País Vasco, Navarra y norte de España. Detectas interés real, cualificas y me agendas la reunión en mi calendario. Yo cierro y hago la web.",
          h2Conditions: "Condiciones",
          conditions: [
            "Modelo a comisión, estándar en el sector.",
            "15% por cada cliente cerrado (la oferta típica de mercado en este modelo está entre 10-15% según Glassdoor España y vacantes equivalentes en LinkedIn).",
            "Ticket medio: 1.500€ – 2.000€ → comisión por cierre: 225€ – 300€.",
            "Bonus de 50€ extra al agendar las primeras 5 reuniones cualificadas.",
            "Pago a los 7 días desde el primer pago del cliente.",
            "Atribución transparente: cada lead que generes queda registrado en mi calendario y correo. Si una empresa que contactaste tú cierra después por otro canal, sigue contando como tuya durante 6 meses desde el primer contacto.",
            "100% remoto, horario flexible, sin permanencia ni exclusividad.",
          ],
          h2Mine: "Qué aporto yo",
          mine: "Perfil exacto del cliente que busco, criterios claros de reunión cualificada, calendario Cal.com conectado para que agendes directo, y una sesión de onboarding al principio donde repasamos producto, nicho, objeciones y mensaje. La estrategia de canales la afinamos juntos.",
          h2About: "Sobre mí",
          about:
            "Soy autónomo registrado en España, con web propia (unaxaller.com), perfil de LinkedIn público y casos reales de clientes contactables como referencia. Si quieres validar antes de aplicar, todo es verificable.",
          h2Profile: "A quién busco",
          profile:
            'Experiencia previa en prospección B2B, SDR o similar. Constancia, buena comunicación escrita en español, resiliencia con el "no". Suma puntos si conoces el norte de España, has trabajado con clínicas o despachos, o hablas euskera, francés o inglés.',
          h2Apply: "Cómo aplicar",
          applyIntro: "Mándame un email a",
          applyList: [
            "Tu experiencia previa.",
            "Qué canal usarías para empezar y por qué.",
            "Por qué encajas en este rol (3 frases).",
            "Un email frío de 5-7 líneas que enviarías a una clínica dental de Bilbao para conseguir una reunión conmigo.",
          ],
          applyClose: "Respondo en menos de 48h.",
          ctaApply: "Enviar mi candidatura",
          breadcrumbHome: "Inicio",
          breadcrumbHere: "Colabora",
        }
      : locale === "en"
      ? {
          eyebrow: "Work with me",
          title: "B2B Appointment Setter (100% remote · commission)",
          intro:
            "I build websites for clinics and businesses, working alone from Irun, and I need someone to help me with the client outreach side. I handle closing and development.",
          line2: "Looking for a freelance appointment setter for cold B2B prospecting.",
          h2What: "What you'd do",
          what: "Reach out to businesses via cold email and LinkedIn (dental clinics, physiotherapy, professional firms, SMEs with outdated sites). Focus on the Basque Country, Navarra and northern Spain. You detect real interest, qualify and book the meeting on my calendar. I close and build the site.",
          h2Conditions: "Terms",
          conditions: [
            "Commission model, industry standard.",
            "15% per closed client (typical market offers in this model range from 10-15% per Glassdoor Spain and equivalent LinkedIn listings).",
            "Average ticket: €1,500 – €2,000 → commission per close: €225 – €300.",
            "€50 bonus when you book the first 5 qualified meetings.",
            "Payment within 7 days of the client's first payment.",
            "Transparent attribution: every lead you generate is logged in my calendar and inbox. If a business you contacted closes later through another channel, it still counts as yours for 6 months from first contact.",
            "100% remote, flexible hours, no lock-in or exclusivity.",
          ],
          h2Mine: "What I bring",
          mine: "Exact client profile I'm targeting, clear criteria for what counts as a qualified meeting, Cal.com calendar wired up so you can book directly, and an onboarding session up front where we go over product, niche, objections and messaging. We refine the channel strategy together.",
          h2About: "About me",
          about:
            "Registered self-employed in Spain, with my own website (unaxaller.com), a public LinkedIn profile, and real client cases available for reference. If you want to validate before applying, everything is verifiable.",
          h2Profile: "Who I'm looking for",
          profile:
            'Previous B2B prospecting experience, SDR or similar. Consistency, strong written Spanish, resilience to hearing "no". Bonus points if you know northern Spain, have worked with clinics or professional firms, or speak Basque, French or English.',
          h2Apply: "How to apply",
          applyIntro: "Send me an email at",
          applyList: [
            "Your previous experience.",
            "Which channel you'd start with and why.",
            "Why you fit this role (3 sentences).",
            "A 5-7 line cold email you'd send to a dental clinic in Bilbao to land a first meeting with me.",
          ],
          applyClose: "I reply within 48h.",
          ctaApply: "Send my application",
          breadcrumbHome: "Home",
          breadcrumbHere: "Collaborate",
        }
      : {
          eyebrow: "Lan egin nirekin",
          title: "B2B Appointment Setter (%100 urrutikoa · komisioa)",
          intro:
            "Klinika eta enpresentzat webguneak egiten ari naiz, Iruneko bakarrik, eta bezeroak erakartzeko zatiarekin lagunduko didan norbait behar dut. Itxiera eta garapena nik egiten ditut.",
          line2: "Appointment setter freelancea bilatzen dut B2B prospekzio hotzerako.",
          h2What: "Zer egingo zenuke",
          what: "Enpresak posta elektroniko hotzaren eta LinkedInen bidez harremanetan jarri (hortz-klinikak, fisioterapia, bulego profesionalak, web zaharreko ETEak). Euskal Herrian, Nafarroan eta Espainiako iparraldean ardaztua. Benetako interesa antzematen duzu, kualifikatzen duzu eta nire egutegian bilera antolatzen didazu. Nik itxi eta web egiten dut.",
          h2Conditions: "Baldintzak",
          conditions: [
            "Komisio-eredua, sektoreko estandarra.",
            "%15 itxitako bezero bakoitzeko (eredu honetan merkatuko ohiko eskaintza %10-15 artean dago, Glassdoor Espainiaren eta LinkedIneko lanpostu baliokideen arabera).",
            "Batezbesteko tiketa: 1.500€ – 2.000€ → itxieragatik komisioa: 225€ – 300€.",
            "50€-ko bonusa lehen 5 bilera kualifikatuak antolatzean.",
            "Bezeroaren lehen ordainketatik 7 egunera ordainketa.",
            "Atribuzio gardena: sortzen duzun lead bakoitza nire egutegian eta postan erregistratzen da. Kontaktuan jarri zenuen enpresa bat geroago beste kanal batean ixten bada, zurea izaten jarraituko du lehen kontaktutik 6 hilabetez.",
            "%100 urrutikoa, ordutegi malgua, iraunkortasun edo esklusibotasunik gabe.",
          ],
          h2Mine: "Zer eskaintzen dut nik",
          mine: "Bilatzen dudan bezeroaren profil zehatza, bilera kualifikatuaren irizpide argiak, Cal.com egutegia konektatuta zuzenean antolatu dezazun, eta hasieran onboarding-saio bat non produktua, nitxoa, eragozpenak eta mezua errepasatzen ditugun. Kanalen estrategia elkarrekin doitzen dugu.",
          h2About: "Niri buruz",
          about:
            "Espainian erregistratutako autonomoa naiz, web propioarekin (unaxaller.com), LinkedIn profil publikoarekin eta erreferentzia gisa harremanetan jartzeko bezero kasu errealekin. Aplikatu aurretik baliozkotu nahi baduzu, dena egiazta daiteke.",
          h2Profile: "Nor bilatzen dudan",
          profile:
            'B2B prospekzioan, SDR edo antzekoetan aurretiko esperientzia. Konstantzia, gaztelaniazko idazketa-komunikazio ona, "ezetz" entzuteko erresilientzia. Puntu gehiago Espainiako iparraldea ezagutzen baduzu, klinika edo bulegoekin lan egin baduzu, edo euskara, frantsesa edo ingelesa hitz egiten baduzu.',
          h2Apply: "Nola aplikatu",
          applyIntro: "Bidali emaila helbidera",
          applyList: [
            "Zure aurretiko esperientzia.",
            "Zein kanaletatik hasiko zinatekeen eta zergatik.",
            "Zergatik egokitzen zaren rol honetara (3 esaldi).",
            "Bilboko hortz-klinika bati bidaliko zenukeen 5-7 lerroko email hotz bat nirekin lehen bilera lortzeko.",
          ],
          applyClose: "48 ordu baino gutxiagotan erantzuten dut.",
          ctaApply: "Bidali nire eskaera",
          breadcrumbHome: "Hasiera",
          breadcrumbHere: "Lankidetza",
        };

  const subject = encodeURIComponent(
    locale === "es"
      ? "Aplicación a Appointment Setter — unaxaller.com"
      : locale === "en"
      ? "Application — Appointment Setter — unaxaller.com"
      : "Eskaera — Appointment Setter — unaxaller.com"
  );
  const mailto = `mailto:contacto@unaxaller.com?subject=${subject}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero" aria-labelledby="collab-title">
        <div className="container-xl">
          <Breadcrumbs
            items={[
              { name: t.breadcrumbHome, href: `/${locale}` },
              { name: t.breadcrumbHere },
            ]}
          />

          <div className="page-hero-inner">
            <span className="page-hero-eyebrow">{t.eyebrow}</span>
            <h1 id="collab-title" className="page-hero-title">{t.title}</h1>
            <p className="page-hero-subtitle">{t.intro}</p>
            <p className="page-hero-subtitle" style={{ marginTop: "1rem" }}>
              {t.line2}
            </p>
          </div>
        </div>
      </section>

      <section className="collab-section" aria-label="Detalle de la oferta">
        <div className="container-xl">
          <div className="collab-grid">
            <AnimatedSection>
              <article className="collab-block">
                <h2 className="collab-h2">{t.h2What}</h2>
                <p className="collab-body">{t.what}</p>
              </article>
            </AnimatedSection>

            <AnimatedSection>
              <article className="collab-block collab-block-highlight">
                <h2 className="collab-h2">{t.h2Conditions}</h2>
                <ul className="collab-list">
                  {t.conditions.map((c, i) => (
                    <li key={i} className="collab-list-item">
                      <span className="collab-list-dot" aria-hidden="true" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedSection>

            <AnimatedSection>
              <article className="collab-block">
                <h2 className="collab-h2">{t.h2Mine}</h2>
                <p className="collab-body">{t.mine}</p>
              </article>
            </AnimatedSection>

            <AnimatedSection>
              <article className="collab-block">
                <h2 className="collab-h2">{t.h2About}</h2>
                <p className="collab-body">{t.about}</p>
              </article>
            </AnimatedSection>

            <AnimatedSection>
              <article className="collab-block">
                <h2 className="collab-h2">{t.h2Profile}</h2>
                <p className="collab-body">{t.profile}</p>
              </article>
            </AnimatedSection>

            <AnimatedSection>
              <article className="collab-block collab-block-apply">
                <h2 className="collab-h2">{t.h2Apply}</h2>
                <p className="collab-body">
                  {t.applyIntro}{" "}
                  <a href={mailto} className="collab-mail">
                    contacto@unaxaller.com
                  </a>
                  :
                </p>
                <ul className="collab-list">
                  {t.applyList.map((item, i) => (
                    <li key={i} className="collab-list-item">
                      <span className="collab-list-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="collab-body collab-close">{t.applyClose}</p>
                <a href={mailto} className="collab-cta focusable">
                  {t.ctaApply}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </article>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
