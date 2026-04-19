import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  const titles: Record<string, string> = {
    es: "Política de Cookies | Unax Aller",
    en: "Cookie Policy | Unax Aller",
    eu: "Cookie Politika | Unax Aller",
  };

  return {
    title: titles[locale],
    robots: { index: false, follow: false },
    alternates: { canonical: `https://unaxaller.com/${locale}/cookies` },
  };
}

export default async function CookiesPage({ params }: Props) {
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
          {locale === "es" ? "Política de Cookies" : locale === "en" ? "Cookie Policy" : "Cookie Politika"}
        </h1>
        <p className="text-sm mb-12" style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}>
          {locale === "es" ? "Última actualización: enero 2025" : locale === "en" ? "Last updated: January 2025" : "Azken eguneraketa: 2025eko urtarrila"}
        </p>

        <div style={{ color: "#434843", fontFamily: "Manrope, sans-serif", lineHeight: "1.8" }}>
          {locale === "en" ? (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>What are cookies?</h2>
              <p>Cookies are small text files stored on your device by your browser when you visit a website. They allow the site to remember your preferences and improve your experience.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Cookies we use</h2>
              <p><strong>Strictly necessary (no consent required):</strong> These cookies are essential for the website to function correctly. They include session management and language preference cookies set by Next.js and next-intl.</p>
              <p style={{ marginTop: "1rem" }}><strong>Analytics cookies (only with consent):</strong> Currently, this site does not use analytics or tracking cookies. If analytics are added in the future, this policy will be updated and your consent will be requested.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Managing cookies</h2>
              <p>You can configure your browser to block or delete cookies at any time. Blocking strictly necessary cookies may affect site functionality. For instructions, visit your browser&apos;s help section.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Contact</h2>
              <p>For questions about this policy, contact us at <a href="mailto:hola@unaxaller.com" style={{ color: "#4d6453" }}>hola@unaxaller.com</a>. See also our <Link href={`/${locale}/privacidad`} style={{ color: "#4d6453" }}>Privacy Policy</Link>.</p>
            </>
          ) : locale === "eu" ? (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Zer dira cookieak?</h2>
              <p>Cookieak webgune bat bisitatzen duzunean zure arakatzaileak zure gailuan gordetzen dituen testu fitxategi txikiak dira. Webguneak zure hobespenak gogoratu eta zure esperientzia hobetzeko aukera ematen dute.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Erabiltzen ditugun cookieak</h2>
              <p><strong>Ezinbesteko cookieak (baimenik beharrik ez):</strong> Cookie hauek webguneak behar bezala funtzionatzeko ezinbestekoak dira. Next.js eta next-intl-ek ezarritako saio kudeaketa eta hizkuntza hobespen cookieak dira.</p>
              <p style={{ marginTop: "1rem" }}><strong>Cookie analitikoak (baimenarekin bakarrik):</strong> Gaur egun webgune honek ez ditu cookie analitiko edo jarraipen cookie-rik erabiltzen. Etorkizunean analisiak gehitzen badira, politika hau eguneratuko da eta zure baimena eskatuko da.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Cookieak Kudeatzea</h2>
              <p>Zure arakatzailea edozein unetan cookieak blokeatzeko edo ezabatzeko konfigura dezakezu. Ezinbesteko cookieak blokeatzeak webgunearen funtzionaltasunean eragina izan dezake.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Kontaktua</h2>
              <p>Politika honi buruzko galderak egiteko, jarri gurekin harremanetan <a href="mailto:hola@unaxaller.com" style={{ color: "#4d6453" }}>hola@unaxaller.com</a> helbidean. Ikusi baita gure <Link href={`/${locale}/privacidad`} style={{ color: "#4d6453" }}>Pribatutasun Politika</Link>.</p>
            </>
          ) : (
            <>
              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>¿Qué son las cookies?</h2>
              <p>Las cookies son pequeños archivos de texto que tu navegador almacena en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde tus preferencias y mejore tu experiencia.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Cookies que utilizamos</h2>
              <p><strong>Cookies estrictamente necesarias (sin consentimiento requerido):</strong> Son esenciales para el correcto funcionamiento del sitio. Incluyen cookies de gestión de sesión y preferencias de idioma establecidas por Next.js y next-intl.</p>
              <p style={{ marginTop: "1rem" }}><strong>Cookies analíticas (solo con consentimiento):</strong> Actualmente este sitio no utiliza cookies analíticas ni de seguimiento. Si en el futuro se añaden, esta política se actualizará y se solicitará tu consentimiento.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Gestión de cookies</h2>
              <p>Puedes configurar tu navegador para bloquear o eliminar las cookies en cualquier momento. Bloquear las cookies estrictamente necesarias puede afectar la funcionalidad del sitio. Para instrucciones, visita la sección de ayuda de tu navegador.</p>

              <h2 style={{ color: "#061b0e", fontFamily: "Newsreader, Georgia, serif", fontWeight: 400, fontSize: "1.5rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Contacto</h2>
              <p>Para preguntas sobre esta política, contáctanos en <a href="mailto:hola@unaxaller.com" style={{ color: "#4d6453" }}>hola@unaxaller.com</a>. Consulta también nuestra <Link href={`/${locale}/privacidad`} style={{ color: "#4d6453" }}>Política de Privacidad</Link>.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
