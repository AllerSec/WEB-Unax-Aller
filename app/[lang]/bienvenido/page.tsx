import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "¡Bienvenido! Arrancamos con tu web · Unax Aller",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ lang: string }> };

export default async function BienvenidoPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as "es" | "en" | "eu";

  return (
    <>
      <style>{`
        @keyframes bvCheckIn {
          0%   { transform: scale(0.4) rotate(-12deg); opacity: 0; }
          60%  { transform: scale(1.12) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes bvFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bvPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(4,120,87,.35); }
          50%       { box-shadow: 0 0 0 16px rgba(4,120,87,0); }
        }

        .bv-page {
          min-height: 80dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.25rem 5rem;
          background: var(--color-bg);
        }
        .bv-card {
          width: 100%;
          max-width: 560px;
          background: #fff;
          border: 1px solid rgba(2,6,23,.08);
          border-radius: 24px;
          padding: clamp(2rem, 5vw, 3.5rem);
          box-shadow: 0 24px 64px rgba(2,6,23,.08), 0 4px 16px rgba(2,6,23,.04);
          text-align: center;
          animation: bvFadeUp .5s cubic-bezier(.16,1,.3,1) .1s both;
        }
        .bv-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          margin-bottom: 1.75rem;
          animation: bvCheckIn .55s cubic-bezier(.34,1.56,.64,1) .2s both, bvPulse 2.5s ease 1s infinite;
        }
        .bv-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 500;
          color: #0A0A0A;
          letter-spacing: -.025em;
          line-height: 1.2;
          margin: 0 0 .75rem;
        }
        .bv-subtitle {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 1rem;
          color: rgba(2,6,23,.55);
          line-height: 1.6;
          margin: 0 0 2rem;
          max-width: 420px;
          margin-inline: auto;
          margin-bottom: 2rem;
        }
        .bv-steps {
          display: flex;
          flex-direction: column;
          gap: .875rem;
          text-align: left;
          margin: 0 0 2rem;
          padding: 1.5rem;
          background: rgba(2,6,23,.025);
          border-radius: 14px;
          border: 1px solid rgba(2,6,23,.06);
        }
        .bv-step {
          display: flex;
          align-items: flex-start;
          gap: .875rem;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: .9rem;
          color: #0A0A0A;
          line-height: 1.5;
        }
        .bv-step-num {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #171717;
          color: #fff;
          font-size: .75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: .05rem;
        }
        .bv-step-text strong {
          display: block;
          font-weight: 600;
          color: #0A0A0A;
          margin-bottom: .15rem;
        }
        .bv-step-text span {
          color: rgba(2,6,23,.5);
          font-size: .84rem;
        }
        .bv-actions {
          display: flex;
          flex-direction: column;
          gap: .75rem;
        }
        .bv-btn-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .6rem;
          min-height: 52px;
          padding: 0 1.75rem;
          border-radius: 12px;
          background: #16a34a;
          color: #fff;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: .9375rem;
          font-weight: 700;
          text-decoration: none;
          transition: background .15s, transform .15s, box-shadow .15s;
          box-shadow: 0 4px 14px rgba(22,163,74,.3);
        }
        .bv-btn-wa:hover {
          background: #15803d;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(22,163,74,.38);
        }
        .bv-btn-back {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 1.5rem;
          border-radius: 12px;
          border: 1.5px solid rgba(2,6,23,.12);
          background: transparent;
          color: rgba(2,6,23,.6);
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: .875rem;
          font-weight: 500;
          text-decoration: none;
          transition: border-color .15s, color .15s, background .15s;
        }
        .bv-btn-back:hover {
          border-color: rgba(2,6,23,.25);
          color: #0A0A0A;
          background: rgba(2,6,23,.03);
        }
        .bv-footnote {
          margin-top: 1.5rem;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: .75rem;
          color: rgba(2,6,23,.35);
          line-height: 1.5;
        }
        @media (max-width: 480px) {
          .bv-card { border-radius: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bv-card, .bv-icon-wrap { animation: none; }
        }
      `}</style>

      <main className="bv-page">
        <div className="bv-card">
          {/* Icono de éxito */}
          <div className="bv-icon-wrap" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="bv-title">
            {locale === "eu" ? "Ongi etorri!" : locale === "en" ? "You're in!" : "¡Ya estás dentro!"}
          </h1>
          <p className="bv-subtitle">
            {locale === "eu"
              ? "Ordainketa jaso dut. Orain zure webarekin hasten gara, eta 30 eguneko itzulketa-bermea duzu."
              : locale === "en"
              ? "I've received your payment. Now let's get your website built — and you have a 30-day money-back guarantee."
              : "He recibido tu pago. Ahora arrancamos con tu web, y tienes 30 días de garantía de devolución."}
          </p>

          {/* Próximos pasos */}
          <div className="bv-steps" role="list">
            <div className="bv-step" role="listitem">
              <span className="bv-step-num" aria-hidden="true">1</span>
              <div className="bv-step-text">
                <strong>
                  {locale === "eu" ? "Unaxek kontaktuan jarriko da" : locale === "en" ? "Unax will reach out" : "Te contacto hoy mismo"}
                </strong>
                <span>
                  {locale === "eu"
                    ? "Gaur edo bihar deitzen dizut zure negozioaren datuak biltzeko."
                    : locale === "en"
                    ? "I'll call or message you today to gather the details about your business."
                    : "Te llamo o escribo para recoger los detalles de tu negocio."}
                </span>
              </div>
            </div>
            <div className="bv-step" role="listitem">
              <span className="bv-step-num" aria-hidden="true">2</span>
              <div className="bv-step-text">
                <strong>
                  {locale === "eu" ? "Diseinua WhatsApp-etik" : locale === "en" ? "Design over WhatsApp" : "Diseño por WhatsApp"}
                </strong>
                <span>
                  {locale === "eu"
                    ? "Aurrerapenak bidaltzen dizkizut eta zuk onartzen dituzu."
                    : locale === "en"
                    ? "I send you progress updates and you approve each step."
                    : "Te mando avances y tú los validas. Sin reuniones."}
                </span>
              </div>
            </div>
            <div className="bv-step" role="listitem">
              <span className="bv-step-num" aria-hidden="true">3</span>
              <div className="bv-step-text">
                <strong>
                  {locale === "eu" ? "Aste batean online" : locale === "en" ? "Live in a week" : "Online en una semana"}
                </strong>
                <span>
                  {locale === "eu"
                    ? "Weba publikatzen dugu. Ez baduzu gustuko, euro bakoitza itzultzen dizut."
                    : locale === "en"
                    ? "We publish your site. If you're not happy, full refund, no questions."
                    : "Publicamos la web. Si no te convence, te devuelvo cada euro."}
                </span>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="bv-actions">
            <a
              href="https://wa.me/34620909916?text=Hola%20Unax%2C%20acabo%20de%20contratar%20mi%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="bv-btn-wa"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {locale === "eu" ? "WhatsApp bidez idatzi" : locale === "en" ? "Message me on WhatsApp" : "Escríbeme por WhatsApp"}
            </a>
            <Link href={`/${locale}`} className="bv-btn-back">
              {locale === "eu" ? "Hasierara itzuli" : locale === "en" ? "Back to homepage" : "Volver al inicio"}
            </Link>
          </div>

          <p className="bv-footnote">
            {locale === "eu"
              ? "30 eguneko itzulketa-bermea. Gustuko ez baduzu, euro bakoitza itzultzen dizut."
              : locale === "en"
              ? "30-day money-back guarantee. Not happy? Full refund, no questions asked."
              : "30 días de garantía de devolución. ¿No te convence? Te devuelvo cada euro, sin preguntas."}
          </p>
        </div>
      </main>
    </>
  );
}
