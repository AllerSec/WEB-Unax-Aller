import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Política de Privacidad | Unax Aller",
    en: "Privacy Policy | Unax Aller",
    eu: "Pribatutasun Politika | Unax Aller",
  };

  return {
    title: titles[locale],
    robots: { index: false, follow: false },
    alternates: { canonical: `https://unaxaller.com/${locale}/privacidad` },
  };
}

export default async function PrivacidadPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  return (
    <section
      className="pt-32 pb-20 md:pt-44 md:pb-28"
      style={{ backgroundColor: "#faf9f4" }}
    >
      <div className="container-xl max-w-3xl">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200"
          style={{ color: "#4d6453", fontFamily: "Manrope, sans-serif" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {locale === "es" ? "Volver al inicio" : locale === "en" ? "Back to home" : "Hasierara itzuli"}
        </Link>

        <h1
          className="text-4xl md:text-5xl font-light mb-3"
          style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
        >
          {locale === "es" ? "Política de Privacidad" : locale === "en" ? "Privacy Policy" : "Pribatutasun Politika"}
        </h1>
        <p className="text-sm mb-12" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
          {locale === "es" ? "Última actualización: enero 2025" : locale === "en" ? "Last updated: January 2025" : "Azken eguneraketa: 2025eko urtarrila"}
        </p>

        <div
          className="prose-legal"
          style={{ color: "#434843", fontFamily: "Manrope, sans-serif", lineHeight: "1.8" }}
        >
          {locale === "en" ? (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>1. Data Controller</h2>
              <p>Unax Aller Fernández, with email hola@unaxaller.com and registered address in the Basque Country, Spain, is the controller of personal data collected through this website.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>2. Data We Collect</h2>
              <p>We only collect data you voluntarily provide via the contact form: name, email address, company name (optional), and the message content.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>3. Purpose and Legal Basis</h2>
              <p>Your data is processed to respond to your enquiry (legitimate interest, Art. 6(1)(f) GDPR) and, if you request it, to manage the pre-contractual relationship. We do not use your data for marketing without explicit consent.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>4. Data Retention</h2>
              <p>We retain your data for as long as necessary to handle your enquiry and up to 3 years for commercial correspondence, in line with applicable statute of limitations.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>5. Your Rights</h2>
              <p>You have the right to access, rectify, erase, restrict processing, data portability, and object. To exercise these rights, email hola@unaxaller.com. You may also lodge a complaint with the Spanish Data Protection Authority (AEPD) at aepd.es.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>6. Third Parties</h2>
              <p>We may use Resend (email delivery) to forward contact messages. No data is sold or shared with third parties for marketing purposes.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>7. Cookies</h2>
              <p>This website uses only technical cookies necessary for operation. No analytical or marketing cookies are set without your consent. See our <Link href={`/${locale}/cookies`} style={{ color: "#4d6453" }}>Cookie Policy</Link> for details.</p>
            </>
          ) : locale === "eu" ? (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>1. Arduraduna</h2>
              <p>Unax Aller Fernández, hola@unaxaller.com helbide elektronikoarekin eta Euskal Herrian erregistratutako helbidearekin, webgune honetan bildutako datu pertsonalen arduraduna da.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>2. Bildutako Datuak</h2>
              <p>Kontaktu formularioan borondatez emandako datuak baino ez ditugu biltzen: izena, helbide elektronikoa, enpresa izena (aukerakoa) eta mezuaren edukia.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>3. Helburua eta Oinarri Juridikoa</h2>
              <p>Zure datuak zure eskaerari erantzuteko prozesatzen dira (interes legitimoa, GDPR 6(1)(f) art.). Ez ditugu zure datuak marketingrako erabiltzen adostasunik gabe.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>4. Datuak Gordetzea</h2>
              <p>Zure eskaerari erantzuteko beharrezkoa den bitartean gordetzen ditugu datuak, eta gehienez 3 urte merkataritza korrespondentzia araugaitzaren arabera.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>5. Zure Eskubideak</h2>
              <p>Sarbide, zuzenketa, ezabatze, prozesatzea mugatzeko, eramangarritasun eta aurkakotasun eskubideak dituzu. Eskubide hauek erabiltzeko, idatzi hola@unaxaller.com helbidera. Baita AEPD-ri (aepd.es) erreklamatu dezakezu.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>6. Hirugarrenak</h2>
              <p>Resend (posta elektronikoaren entregarako) erabil dezakegu kontaktu mezuak bidaltzeko. Ez dugu daturik saltzen edo hirugarrenekin partekatzen marketin helburuetarako.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>7. Cookieak</h2>
              <p>Webgune honek funtzionamendurako beharrezkoak diren cookie teknikoak baino ez ditu erabiltzen. Ez dira cookie analitiko edo marketin-eko cookieak ezartzen zure baimenik gabe. Ikusi gure <Link href={`/${locale}/cookies`} style={{ color: "#4d6453" }}>Cookie Politika</Link>.</p>
            </>
          ) : (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>1. Responsable del Tratamiento</h2>
              <p>Unax Aller Fernández, con correo electrónico hola@unaxaller.com y domicilio en el País Vasco, España, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>2. Datos que Recogemos</h2>
              <p>Solo recogemos los datos que voluntariamente nos facilitas a través del formulario de contacto: nombre, dirección de correo electrónico, nombre de empresa (opcional) y el contenido de tu mensaje.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>3. Finalidad y Base Legal</h2>
              <p>Tus datos se tratan para responder a tu consulta (interés legítimo, art. 6.1.f RGPD) y, si lo solicitas, para gestionar la relación precontractual. No utilizamos tus datos para comunicaciones comerciales sin tu consentimiento expreso.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>4. Conservación de Datos</h2>
              <p>Conservamos tus datos durante el tiempo necesario para gestionar tu solicitud y hasta 3 años para correspondencia comercial, conforme a los plazos de prescripción aplicables.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>5. Tus Derechos</h2>
              <p>Tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición. Para ejercerlos, escríbenos a hola@unaxaller.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en aepd.es.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>6. Terceros</h2>
              <p>Podemos utilizar Resend (servicio de entrega de correo electrónico) para reenviar los mensajes del formulario de contacto. No vendemos ni compartimos tus datos con terceros con fines comerciales.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>7. Cookies</h2>
              <p>Este sitio web utiliza únicamente cookies técnicas necesarias para su funcionamiento. No se instalan cookies analíticas o de marketing sin tu consentimiento. Consulta nuestra <Link href={`/${locale}/cookies`} style={{ color: "#4d6453" }}>Política de Cookies</Link> para más información.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
