import type { Locale } from "@/lib/i18n/config";

interface GuaranteeBlockProps {
  locale: Locale;
  variant?: "default" | "compact";
}

// Three-pillar guarantee that has to feel impossible to ignore: one-off price,
// money-back window, and the site being theirs (no monthly fees). Reused on the
// home page and the pricing page so the message gets repeated without
// duplicating markup.
export default function GuaranteeBlock({ locale, variant = "default" }: GuaranteeBlockProps) {
  const labels =
    locale === "es"
      ? {
          eyebrow: "La garantía",
          title: "Tres promesas por escrito. Sin letra pequeña.",
          pillars: [
            {
              big: "1.300€",
              small: "un solo pago",
              desc: "Un pago único, más IVA, con el primer año de mantenimiento incluido. Sin cuotas mensuales colgando. A partir del año 2, solo 600€/año para tenerla cuidada.",
            },
            {
              big: "30 días",
              small: "y te devuelvo el dinero",
              desc: "Si en los primeros 30 días no estás conforme, te devuelvo cada euro y apagamos la web. Sin preguntas y sin riesgo para ti.",
            },
            {
              big: "Tuya",
              small: "desde el primer día",
              desc: "El dominio se registra a tu nombre y la web es tuya tras el pago, no la alquilas. Tu ficha de Google y tus reseñas se quedan siempre contigo.",
            },
          ],
        }
      : locale === "en"
      ? {
          eyebrow: "The guarantee",
          title: "Three promises in writing. No fine print.",
          pillars: [
            {
              big: "€1,300",
              small: "one single payment",
              desc: "A one-off payment, plus VAT, with the first year of maintenance included. No monthly fees hanging over you. From year 2, just €600/year to keep it looked after.",
            },
            {
              big: "30 days",
              small: "and I refund you",
              desc: "If within the first 30 days you're not happy, I refund every euro and we switch the site off. No questions, no risk to you.",
            },
            {
              big: "Yours",
              small: "from day one",
              desc: "The domain is registered in your name and the site is yours after payment — you don't rent it. Your Google listing and reviews always stay with you.",
            },
          ],
        }
      : locale === "eu"
      ? {
          eyebrow: "Bermea",
          title: "Hiru promesa idatziz. Letra txikirik gabe.",
          pillars: [
            {
              big: "1.300€",
              small: "ordainketa bakarra",
              desc: "Ordainketa bakarra, gehi BEZ, lehen urteko mantentze-lana barne. Hilero zintzilik dauden kuotarik gabe. 2. urtetik aurrera, 600€/urteko bakarrik zainduta edukitzeko.",
            },
            {
              big: "30 egun",
              small: "eta dirua itzultzen dizut",
              desc: "Lehen 30 egunetan pozik ez bazaude, euro bakoitza itzultzen dizut eta weba itzaltzen dugu. Galderarik gabe eta arriskurik gabe zuretzat.",
            },
            {
              big: "Zurea",
              small: "lehen egunetik",
              desc: "Domeinua zure izenean erregistratzen da eta weba zurea da ordainketaren ondoren, ez duzu alokatzen. Zure Google fitxa eta iritziak beti zurekin geratzen dira.",
            },
          ],
        }
      : {
          eyebrow: "La garantie",
          title: "Trois promesses par écrit. Sans petites lignes.",
          pillars: [
            {
              big: "1 300 €",
              small: "un seul paiement",
              desc: "Un paiement unique, plus TVA, avec la première année de maintenance incluse. Pas de mensualités qui s'accumulent. À partir de l'année 2, seulement 600 €/an pour l'entretien.",
            },
            {
              big: "30 jours",
              small: "et je vous rembourse",
              desc: "Si dans les 30 premiers jours vous n'êtes pas satisfait, je vous rembourse chaque euro et nous coupons le site. Sans questions, sans risque pour vous.",
            },
            {
              big: "À vous",
              small: "dès le premier jour",
              desc: "Le domaine est enregistré à votre nom et le site vous appartient après paiement, vous ne le louez pas. Votre fiche Google et vos avis restent toujours avec vous.",
            },
          ],
        };

  return (
    <section
      className={`gb-section${variant === "compact" ? " gb-section--compact" : ""}`}
      aria-labelledby="gb-title"
    >
      <style>{`
        .gb-section{padding-block:clamp(3rem,6vw,5rem);background:#FFFFFF;border-top:1px solid var(--color-line);border-bottom:1px solid var(--color-line)}
        .gb-section--compact{padding-block:clamp(2rem,4vw,3rem)}
        .gb-inner{max-width:1100px;margin:0 auto;padding-inline:clamp(1rem,4vw,2rem);text-align:center}
        .gb-eyebrow{font-family:var(--font-sans);font-size:var(--text-xs);font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--color-accent);margin:0 0 var(--space-3)}
        .gb-title{font-family:var(--font-serif);font-size:clamp(1.5rem,3.5vw,2.5rem);font-weight:500;line-height:var(--lh-tight);color:var(--color-ink);margin:0 0 var(--space-10);letter-spacing:-.02em}
        .gb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-5)}
        @media(max-width:768px){.gb-grid{grid-template-columns:1fr;gap:var(--space-3)}}
        .gb-pillar{background:var(--color-bg);border:1px solid var(--color-line);border-radius:var(--radius-xl);padding:clamp(1.5rem,3vw,2rem);text-align:left;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
        .gb-pillar:hover{border-color:var(--color-accent);box-shadow:var(--shadow-md);transform:translateY(-3px)}
        .gb-pillar-num{display:flex;align-items:baseline;gap:.5rem;margin-bottom:var(--space-3);font-family:var(--font-serif);color:var(--color-primary);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
        .gb-pillar-big{font-size:clamp(2.5rem,5vw,3.25rem);font-weight:500;line-height:1}
        .gb-pillar-small{font-family:var(--font-sans);font-size:var(--text-sm);font-weight:600;color:var(--color-accent);letter-spacing:.02em}
        .gb-pillar-desc{font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--lh-relaxed);color:var(--color-ink-muted);margin:0}
      `}</style>
      <div className="gb-inner">
        <p className="gb-eyebrow">{labels.eyebrow}</p>
        <h2 id="gb-title" className="gb-title">{labels.title}</h2>
        <div className="gb-grid">
          {labels.pillars.map((p, i) => (
            <article key={i} className="gb-pillar">
              <p className="gb-pillar-num">
                <span className="gb-pillar-big">{p.big}</span>
                <span className="gb-pillar-small">{p.small}</span>
              </p>
              <p className="gb-pillar-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
