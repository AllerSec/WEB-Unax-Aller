import type { Locale } from "@/lib/i18n/config";

interface GuaranteeBlockProps {
  locale: Locale;
  variant?: "default" | "compact";
}

// Three-pillar guarantee that has to feel impossible to ignore: no upfront
// payment, money-back window, and price-lock during the commitment. Reused on
// the home page and the pricing page so the message gets repeated without
// duplicating markup.
export default function GuaranteeBlock({ locale, variant = "default" }: GuaranteeBlockProps) {
  const labels =
    locale === "es"
      ? {
          eyebrow: "La garantía Renting Web",
          title: "Tres promesas por escrito. Sin letra pequeña.",
          pillars: [
            {
              big: "0€",
              small: "al firmar",
              desc: "No pagas nada para empezar. La primera cuota se cobra el día que la web está viva — no antes.",
            },
            {
              big: "30 días",
              small: "de devolución",
              desc: "Si en los primeros 30 días no estás conforme con cómo ha quedado, te devuelvo lo pagado. Sin preguntas, sin papeleo.",
            },
            {
              big: "12 meses",
              small: "con cuota bloqueada",
              desc: "149€/mes durante 12 meses, sin subidas. Después, sigues mes a mes. Cualquier cambio futuro solo afecta a clientes nuevos.",
            },
          ],
        }
      : locale === "en"
      ? {
          eyebrow: "The Web Renting guarantee",
          title: "Three promises in writing. No fine print.",
          pillars: [
            {
              big: "€0",
              small: "to sign",
              desc: "Pay nothing to start. The first fee is charged the day your site goes live — not before.",
            },
            {
              big: "30 days",
              small: "money-back",
              desc: "If within the first 30 days you're not happy with the result, I refund what you've paid. No questions, no paperwork.",
            },
            {
              big: "12 months",
              small: "price-locked",
              desc: "€149/month for 12 months, no increases. After that, month-to-month. Any future change only applies to new clients.",
            },
          ],
        }
      : {
          eyebrow: "Web Errentaria bermea",
          title: "Hiru promesa idatziz. Letra txikirik gabe.",
          pillars: [
            {
              big: "0€",
              small: "sinatzean",
              desc: "Ez duzu ezer ordaintzen hasteko. Lehen kuota webgunea bizirik dagoen egunean kobratzen da, ez lehenago.",
            },
            {
              big: "30 egun",
              small: "itzulketa",
              desc: "Lehen 30 egunetan pozik ez bazaude, ordaindutakoa itzultzen dizut. Galderarik gabe, paperik gabe.",
            },
            {
              big: "12 hilabete",
              small: "kuota blokeatuta",
              desc: "149€/hilean 12 hilabetez, igoerarik gabe. Ondoren, hilez hile. Etorkizuneko aldaketak bezero berriei bakarrik aplikatuko zaizkie.",
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
