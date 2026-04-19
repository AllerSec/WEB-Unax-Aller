import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Aviso Legal | Unax Aller",
    en: "Legal Notice | Unax Aller",
    eu: "Lege Oharra | Unax Aller",
  };

  return {
    title: titles[locale],
    robots: { index: false, follow: false },
    alternates: { canonical: `https://unaxaller.com/${locale}/aviso-legal` },
  };
}

export default async function AvisoLegalPage({ params }: Props) {
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
          {locale === "es" ? "Aviso Legal" : locale === "en" ? "Legal Notice" : "Lege Oharra"}
        </h1>
        <p className="text-sm mb-12" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
          {locale === "es" ? "Última actualización: enero 2025" : locale === "en" ? "Last updated: January 2025" : "Azken eguneraketa: 2025eko urtarrila"}
        </p>

        <div style={{ color: "#434843", fontFamily: "Manrope, sans-serif", lineHeight: "1.8" }}>
          {locale === "en" ? (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>1. Owner Information</h2>
              <p>In compliance with Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is:</p>
              <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem" }}>
                <li><strong>Name:</strong> Unax Aller Fernández</li>
                <li><strong>Activity:</strong> Web design and development (freelance)</li>
                <li><strong>Registered address:</strong> País Vasco, Spain</li>
                <li><strong>Email:</strong> <a href="mailto:hola@unaxaller.com" style={{ color: "#4d6453" }}>hola@unaxaller.com</a></li>
                <li><strong>Website:</strong> https://unaxaller.com</li>
              </ul>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>2. Intellectual Property</h2>
              <p>All content on this website (text, images, code, design, logos) is the property of Unax Aller Fernández or is used under licence. Reproduction, distribution, or public communication without prior written authorisation is prohibited.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>3. Liability Disclaimer</h2>
              <p>The owner is not liable for damages arising from use of this website, including errors in content, third-party links, or unavailability of the service.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>4. Applicable Law</h2>
              <p>These conditions are governed by Spanish law. Any disputes shall be submitted to the courts of the Basque Country, Spain.</p>
            </>
          ) : locale === "eu" ? (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>1. Titularraren Informazioa</h2>
              <p>Informazioaren Gizartearen Zerbitzuei eta Merkataritza Elektronikoari buruzko uztailaren 11ko 34/2002 Legearen (LSSI-CE) betetzean, webgune honen titularra:</p>
              <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem" }}>
                <li><strong>Izena:</strong> Unax Aller Fernández</li>
                <li><strong>Jarduera:</strong> Web diseinua eta garapena (autonomoa)</li>
                <li><strong>Erregistratutako helbidea:</strong> Euskal Herria, Espainia</li>
                <li><strong>Helbide elektronikoa:</strong> <a href="mailto:hola@unaxaller.com" style={{ color: "#4d6453" }}>hola@unaxaller.com</a></li>
                <li><strong>Webgunea:</strong> https://unaxaller.com</li>
              </ul>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>2. Jabetza Intelektuala</h2>
              <p>Webgune honetako eduki guztia (testuak, irudiak, kodea, diseinua, logotipoak) Unax Aller Fernándezen jabetzakoa da edo lizentziapean erabiltzen da. Aldez aurretiko idatzizko baimenik gabe erreprodukzioa, banaketa edo komunikazio publikoa debekatuta dago.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>3. Erantzukizun Mugaketa</h2>
              <p>Titularia ez da erantzule izango webgune honen erabileraren ondoriozko kalteen erantzule, edukietan akatsak, hirugarrenen estekak edo zerbitzuaren eskuraezintasuna barne.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>4. Lege Aplikagarria</h2>
              <p>Baldintza hauek Espainiako legeak arautzen ditu. Edozein eztabaida Euskal Herriko epaitegietan aurkeztuko da.</p>
            </>
          ) : (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>1. Datos del Titular</h2>
              <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), el titular de este sitio web es:</p>
              <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem" }}>
                <li><strong>Nombre:</strong> Unax Aller Fernández</li>
                <li><strong>Actividad:</strong> Diseño y desarrollo web (autónomo)</li>
                <li><strong>Domicilio:</strong> País Vasco, España</li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:hola@unaxaller.com" style={{ color: "#4d6453" }}>hola@unaxaller.com</a></li>
                <li><strong>Sitio web:</strong> https://unaxaller.com</li>
              </ul>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>2. Propiedad Intelectual</h2>
              <p>Todo el contenido de este sitio web (textos, imágenes, código, diseño, logotipos) es propiedad de Unax Aller Fernández o se utiliza bajo licencia. Queda prohibida su reproducción, distribución o comunicación pública sin autorización escrita previa.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>3. Limitación de Responsabilidad</h2>
              <p>El titular no se responsabiliza de los daños derivados del uso de este sitio web, incluyendo errores en los contenidos, enlaces a terceros o la no disponibilidad del servicio.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>4. Ley Aplicable</h2>
              <p>Estas condiciones se rigen por la legislación española. Cualquier controversia se someterá a los tribunales del País Vasco, España.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
