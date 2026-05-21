"use client";

import { useEffect, useRef, useState } from "react";
const IconCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
const IconArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>;
const IconSparkles = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/></svg>;
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/lib/i18n/config";
import PlanModal, { type PlanDetail } from "@/components/pricing/PlanModal";

interface PricingCardProps {
  locale: Locale;
  headingLevel?: "h1" | "h2";
}

export default function PricingCard({ locale, headingLevel = "h2" }: PricingCardProps) {
  const HeadingTag = headingLevel;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activePlan, setActivePlan] = useState<PlanDetail | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); } },
      { rootMargin: "-80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const plan: PlanDetail = {
    name: locale === "es" ? "Renting Web" : locale === "en" ? "Web Renting" : "Web Errentaria",
    subtitle: locale === "es" ? "Tu web profesional sin pagar nada al empezar" : locale === "en" ? "Your professional site with no upfront payment" : "Zure web profesionala hasieran ezer ordaindu gabe",
    price: locale === "en" ? "€149/mo" : "149€/mes",
    description:
      locale === "es"
        ? "0€ al firmar. 149€/mes durante 12 meses. 30 días de garantía de devolución. Después, mes a mes y la web sigue siendo tuya."
        : locale === "en"
        ? "€0 to sign. €149/month for 12 months. 30-day money-back guarantee. After that, month to month and the site stays yours."
        : "0€ sinatzean. 149€/hilean 12 hilabetez. 30 eguneko itzulketa bermea. Ondoren, hilez hile eta weba zurea izaten jarraitzen du.",
    popular: true,
    features:
      locale === "es"
        ? [
            "Diseño profesional a medida para tu negocio",
            "Hasta 5 secciones (inicio, servicios, sobre ti, contacto, reseñas)",
            "Optimizada para móvil — la mayoría de tus clientes te buscan desde el teléfono",
            "Aparece en Google Maps con tu ficha optimizada",
            "Sistema para conseguir más reseñas de 5 estrellas",
            "Soporte directo por WhatsApp y cambios al mes incluidos",
          ]
        : locale === "en"
        ? [
            "Professional custom design built around your business",
            "Up to 5 sections (home, services, about, contact, reviews)",
            "Mobile-optimized — most of your customers search from a phone",
            "Shows on Google Maps with your profile properly set up",
            "System to bring in more 5-star reviews",
            "Direct WhatsApp support and monthly changes included",
          ]
        : [
            "Zure negoziorako diseinu profesional pertsonalizatua",
            "5 atal arte (hasiera, zerbitzuak, zuri buruz, harremana, iritziak)",
            "Mugikorrerako optimizatua — bezero gehienek mugikorretik bilatzen zaituzte",
            "Google Maps-en agertzen da fitxa ondo konfiguratuta",
            "5 izarreko iritzi gehiago lortzeko sistema",
            "WhatsApp bidezko zuzeneko laguntza eta hileko aldaketak barne",
          ],
    deliverables: [
      locale === "es" ? "Dominio propio y hosting incluidos (sin facturas extra)" : locale === "en" ? "Own domain & hosting included (no extra invoices)" : "Domeinu propioa eta hostinga barne (faktura gehigarririk gabe)",
      locale === "es" ? "Ficha de Google Business Profile lista para captar llamadas" : locale === "en" ? "Google Business Profile set up to capture phone calls" : "Google Business Profile fitxa deiak hartzeko prest",
      locale === "es" ? "Certificado SSL y velocidad optimizada" : locale === "en" ? "SSL certificate and speed optimization" : "SSL ziurtagiria eta abiadura optimizatua",
      locale === "es" ? "Cambios menores cada mes sin coste extra" : locale === "en" ? "Minor changes every month at no extra cost" : "Aldaketa txikiak hilero kostu gehigarririk gabe",
    ],
    process: [
      {
        step: locale === "es" ? "Llamada de 30 minutos" : locale === "en" ? "30-minute call" : "30 minutuko deia",
        desc: locale === "es" ? "Me cuentas tu negocio, qué clientes quieres atraer y qué hace tu competencia." : locale === "en" ? "You tell me about your business, the clients you want and what your competition does." : "Zure negozioa, nahi dituzun bezeroak eta lehiakideen lana kontatzen dizkidazu.",
      },
      {
        step: locale === "es" ? "Auditoría de tu competencia" : locale === "en" ? "Competitor audit" : "Lehiakideen auditoria",
        desc: locale === "es" ? "Te enseño quién te está quitando llamadas en Google y por qué." : locale === "en" ? "I show you who's taking your calls on Google and why." : "Googlen deiak nork kentzen dizkizun eta zergatik erakusten dizut.",
      },
      {
        step: locale === "es" ? "Web lista en 7–10 días" : locale === "en" ? "Site live in 7–10 days" : "Weba 7–10 egunean prest",
        desc: locale === "es" ? "La diseño, la programo y la subo. Pruebas reales en móvil antes de lanzar." : locale === "en" ? "I design, build and launch it. Real mobile tests before going live." : "Diseinatu, programatu eta jartzen dut. Mugikorreko proba errealak abiatu aurretik.",
      },
      {
        step: locale === "es" ? "Acompañamiento continuo" : locale === "en" ? "Ongoing support" : "Etengabeko laguntza",
        desc: locale === "es" ? "WhatsApp directo conmigo. Cambios menores, hosting y dominio incluidos." : locale === "en" ? "Direct WhatsApp with me. Minor changes, hosting and domain included." : "Nirekin WhatsApp zuzena. Aldaketa txikiak, hostinga eta domeinua barne.",
      },
    ],
    clients: [
      { name: "Farmacia Fernández Bera", url: "https://farmaciafernandezbera.com", domain: "farmaciafernandezbera.com", type: locale === "es" ? "Farmacia · Bera" : locale === "en" ? "Pharmacy · Bera" : "Farmazia · Bera" },
      { name: "Motos Arretxe", url: "https://motosarretxe.com", domain: "motosarretxe.com", type: locale === "es" ? "Taller y concesionario · Irun" : locale === "en" ? "Workshop & dealer · Irun" : "Tailerra eta kontzesionarioa · Irun" },
      { name: "Anaka Óptica", url: "https://anakaoptica.com", domain: "anakaoptica.com", type: locale === "es" ? "Óptica · Irun" : locale === "en" ? "Optician · Irun" : "Optika · Irun" },
    ],
  };

  const ctaLabel = locale === "es" ? "Empezar sin pagar nada" : locale === "en" ? "Start with €0 upfront" : "Hasi ezer ordaindu gabe";
  const detailLabel = locale === "es" ? "Ver todo lo que incluye" : locale === "en" ? "See everything included" : "Sartzen den guztia ikusi";
  const fromLabel = locale === "es" ? "Cuota fija" : locale === "en" ? "Flat fee" : "Kuota finkoa";
  const popularLabel = locale === "es" ? "0€ inicial" : locale === "en" ? "€0 upfront" : "0€ hasieran";
  const noteLabel =
    locale === "es"
      ? "Permanencia 12 meses. Garantía de devolución 30 días sin preguntas. Cuota bloqueada durante los 12 meses; futuros cambios solo afectan a nuevos clientes."
      : locale === "en"
      ? "12-month minimum term. 30-day no-questions-asked money-back guarantee. Price locked for 12 months; any future increases only apply to new clients."
      : "12 hilabeteko iraupena. 30 eguneko itzulketa bermea galderarik gabe. Kuota 12 hilabetez blokeatuta; etorkizuneko aldaketak bezero berriei bakarrik aplikatuko zaizkie.";

  return (
    <>
      <style>{`
        .pc-section{padding:clamp(4rem,8vw,7rem) 0;background:var(--color-bg)}
        .pc-card-wrap{max-width:920px;margin:0 auto}
        .pc-card{position:relative;display:grid;grid-template-columns:1fr 1fr;border-radius:var(--radius-2xl);background:#FFFFFF;border:1px solid var(--color-line);box-shadow:var(--shadow-lg);overflow:hidden}
        @media(max-width:640px){.pc-card{grid-template-columns:1fr}}
        .pc-badge{position:absolute;top:var(--space-5);right:var(--space-5);display:inline-flex;align-items:center;gap:var(--space-1);padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);background:var(--color-primary);color:#FFFFFF;font-family:var(--font-sans);font-size:var(--text-xs);font-weight:700;letter-spacing:.06em;text-transform:uppercase}
        .pc-left{display:flex;flex-direction:column;padding:clamp(1.5rem,4vw,2.5rem);border-right:1px solid var(--color-line)}
        @media(max-width:640px){.pc-left{border-right:none;border-bottom:1px solid var(--color-line)}}
        .pc-header{margin-bottom:var(--space-6);padding-right:clamp(0px,5vw,3rem)}
        .pc-subtitle{font-family:var(--font-sans);font-size:var(--text-xs);font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--color-accent);margin:0 0 var(--space-2)}
        .pc-name{font-family:var(--font-serif);font-size:clamp(1.5rem,3vw,2.25rem);font-weight:500;line-height:var(--lh-tight);letter-spacing:-.02em;color:var(--color-ink);margin:0 0 var(--space-3)}
        .pc-description{font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--lh-relaxed);color:var(--color-ink-muted);margin:0}
        .pc-sep{background:var(--color-line)!important;margin-bottom:var(--space-6)}
        .pc-features{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-3)}
        .pc-feature{display:flex;align-items:flex-start;gap:var(--space-3);font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--lh-normal);color:var(--color-ink-soft)}
        .pc-check{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--color-success-bg);color:var(--color-success);margin-top:.05em}
        .pc-right{display:flex;flex-direction:column;justify-content:center;padding:clamp(1.5rem,4vw,2.5rem);gap:var(--space-6);background:var(--color-bg-muted)}
        .pc-price-block{text-align:center}
        .pc-from{font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink-muted);margin:0 0 var(--space-1)}
        .pc-price{font-family:var(--font-serif);font-size:clamp(2.5rem,5vw,3.75rem);font-weight:500;line-height:1;letter-spacing:-.03em;color:var(--color-primary);margin:0;font-variant-numeric:tabular-nums}
        .pc-price-note{font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-ink-subtle);margin:var(--space-1) 0 0}
        .pc-value-strip{display:flex;justify-content:center;align-items:center;gap:var(--space-3);padding:var(--space-2) var(--space-4);background:var(--color-success-bg);border:1px solid var(--color-success);border-radius:var(--radius-full);margin:0 auto;font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-success);flex-wrap:wrap;justify-content:center;text-align:center;font-weight:600}
        .pc-value-strip strong{color:var(--color-success);font-weight:800}
        .pc-actions{display:flex;flex-direction:column;gap:var(--space-3)}
        .pc-cta-primary{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);min-height:48px;padding:0 var(--space-6);border-radius:var(--radius-lg);background:var(--color-accent);color:#FFFFFF;font-family:var(--font-sans);font-size:var(--text-sm);font-weight:700;text-decoration:none;cursor:pointer;transition:background-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);box-shadow:var(--shadow-sm)}
        .pc-cta-primary:hover{background:var(--color-accent-hover);transform:translateY(-2px);box-shadow:var(--shadow-md)}
        .pc-cta-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 var(--space-6);border-radius:var(--radius-lg);background:#FFFFFF;color:var(--color-ink-soft);border:1px solid var(--color-line-strong);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:500;cursor:pointer;transition:background-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
        .pc-cta-secondary:hover{background:var(--color-bg);color:var(--color-primary);border-color:var(--color-primary)}
        .pc-clients{display:flex;flex-direction:column;gap:var(--space-2);border-top:1px solid var(--color-line);padding-top:var(--space-4)}
        .pc-client{display:flex;align-items:center;gap:var(--space-2);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-ink-muted)}
        .pc-client-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--color-success);flex-shrink:0}
        .pc-note{text-align:center;margin-top:var(--space-5);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-ink-subtle);line-height:var(--lh-relaxed);max-width:720px;margin-left:auto;margin-right:auto}
        .pc-animate{opacity:0;transform:translateY(24px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
        .pc-animate.in-view{opacity:1;transform:translateY(0)}
        .pc-feature-animate{opacity:0;transform:translateY(16px);transition:opacity .45s cubic-bezier(.22,1,.36,1),transform .45s cubic-bezier(.22,1,.36,1)}
        .pc-feature-animate.in-view{opacity:1;transform:translateY(0)}
      `}</style>
      <section
        ref={ref}
        className="pc-section"
        aria-labelledby="pc-title"
      >
        <div className="container-xl">
          <div className={`pc-animate pc-card-wrap${isInView ? " in-view" : ""}`}>
            <div className="pc-card">
              <div className="pc-badge">
                <IconSparkles />
                {popularLabel}
              </div>

              <div className="pc-left">
                <div className="pc-header">
                  <p className="pc-subtitle">{plan.subtitle}</p>
                  <HeadingTag id="pc-title" className="pc-name">{plan.name}</HeadingTag>
                  <p className="pc-description">{plan.description}</p>
                </div>

                <Separator className="pc-sep" />

                <ul className="pc-features" aria-label="Incluido en el plan">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className={`pc-feature-animate pc-feature${isInView ? " in-view" : ""}`}
                      style={{ transitionDelay: isInView ? `${i * 80}ms` : "0ms" }}
                    >
                      <span className="pc-check" aria-hidden="true">
                        <IconCheck />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pc-right">
                <div className="pc-price-block">
                  <p className="pc-from">{fromLabel}</p>
                  <p className="pc-price">{plan.price}</p>
                  <p className="pc-price-note">
                    {locale === "es" ? "IVA no inc. · 12 meses" : locale === "en" ? "VAT excl. · 12 months" : "BEZ kanpo · 12 hilabete"}
                  </p>
                </div>

                <div className="pc-value-strip" aria-label={locale === "es" ? "Valor incluido el primer año" : locale === "en" ? "First-year value" : "Lehen urteko balioa"}>
                  <span>
                    {locale === "es"
                      ? <>Valor del sistema primer año: <strong>6.700€+</strong></>
                      : locale === "en"
                      ? <>First-year system value: <strong>€6,700+</strong></>
                      : <>Lehen urteko sistemaren balioa: <strong>6.700€+</strong></>}
                  </span>
                </div>

                <div className="pc-actions">
                  <a
                    href={`/${locale}/contacto`}
                    className="pc-cta-primary focusable"
                  >
                    {ctaLabel}
                    <IconArrowRight />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActivePlan(plan)}
                    className="pc-cta-secondary focusable"
                  >
                    {detailLabel}
                  </button>
                </div>

                <div className="pc-clients">
                  {plan.clients.map((c) => (
                    <div key={c.domain} className="pc-client">
                      <span className="pc-client-dot" aria-hidden="true" />
                      <span className="pc-client-name">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="pc-note">{noteLabel}</p>
          </div>
        </div>
      </section>

      <PlanModal plan={activePlan} onClose={() => setActivePlan(null)} locale={locale} />
    </>
  );
}
