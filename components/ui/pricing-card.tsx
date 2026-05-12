"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/lib/i18n/config";
import PlanModal, { type PlanDetail } from "@/components/pricing/PlanModal";

interface PricingCardProps {
  locale: Locale;
  headingLevel?: "h1" | "h2";
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function PricingCard({ locale, headingLevel = "h2" }: PricingCardProps) {
  const HeadingTag = headingLevel;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activePlan, setActivePlan] = useState<PlanDetail | null>(null);

  const plan: PlanDetail = {
    name: locale === "es" ? "Plan Completo" : locale === "en" ? "Complete Plan" : "Plan Osoa",
    subtitle: locale === "es" ? "Web a medida" : locale === "en" ? "Custom website" : "Neurrizko weba",
    price: locale === "en" ? "€1,500" : "1.500€",
    description:
      locale === "es"
        ? "Todo lo que necesitas para lanzar una web profesional, rápida y que convierta. IVA incluido."
        : locale === "en"
        ? "Everything you need to launch a professional, fast, high-converting website. VAT included."
        : "Web profesional, azkarra eta konbertsio handikoa. BEZ barne.",
    popular: true,
    features:
      locale === "es"
        ? [
            "Diseño premium a medida con animaciones",
            "Páginas necesarias para tu proyecto",
            "SEO técnico completo + Google Analytics",
            "Multi-idioma si lo necesitas",
            "Adaptada a móvil desde el primer pixel",
            "Mantenimiento opcional desde 100€/año",
          ]
        : locale === "en"
        ? [
            "Premium custom design with animations",
            "Pages tailored to your project",
            "Full technical SEO + Google Analytics",
            "Multi-language support if needed",
            "Mobile-first from the very first pixel",
            "Optional maintenance from €100/year",
          ]
        : [
            "Diseinu premium pertsonalizatua animazioekin",
            "Zure proiekturako beharrezko orriak",
            "SEO tekniko osoa + Google Analytics",
            "Eleaniztasuna behar baduzu",
            "Mugikorrerako egokitua lehen pixelatik",
            "Mantentze-lana aukerakoa 100€/urtetik",
          ],
    deliverables: [
      locale === "es" ? "Dominio y hosting durante 1 año" : locale === "en" ? "Domain & hosting for 1 year" : "Domeinua eta hostinga 1 urterako",
      locale === "es" ? "Panel de administración de contenidos" : locale === "en" ? "Content management panel" : "Edukien administrazio panela",
      locale === "es" ? "Acceso y propiedad del código fuente" : locale === "en" ? "Full source code ownership" : "Iturburu-kodearen jabetza",
      locale === "es" ? "Certificado SSL + CDN incluido" : locale === "en" ? "SSL certificate + CDN included" : "SSL ziurtagiria + CDN barne",
    ],
    process: [
      {
        step: locale === "es" ? "Estrategia digital" : locale === "en" ? "Digital strategy" : "Estrategia digitala",
        desc: locale === "es" ? "Análisis de competencia y definición de objetivos." : locale === "en" ? "Competitive analysis and goal definition." : "Lehiakideen analisia eta helburuen definizioa.",
      },
      {
        step: locale === "es" ? "Diseño premium" : locale === "en" ? "Premium design" : "Diseinu premium-a",
        desc: locale === "es" ? "Sistema de diseño completo con animaciones y microinteracciones." : locale === "en" ? "Full design system with animations and microinteractions." : "Diseinu sistema osoa animazioekin eta mikrointerakzioekin.",
      },
      {
        step: locale === "es" ? "Desarrollo y pruebas" : locale === "en" ? "Development & QA" : "Garapena eta probak",
        desc: locale === "es" ? "Código limpio, optimizado y probado en todos los dispositivos." : locale === "en" ? "Clean, optimized code tested on all devices." : "Kode garbia, optimizatua eta gailu guztietan probatua.",
      },
      {
        step: locale === "es" ? "Lanzamiento y formación" : locale === "en" ? "Launch & training" : "Abiatzea eta prestakuntza",
        desc: locale === "es" ? "Publicación, analytics y sesión de formación para tu equipo." : locale === "en" ? "Publishing, analytics and team training session." : "Argitalpena, analitika eta taldearen prestakuntza saioa.",
      },
    ],
    clients: [
      { name: "Farmacia Fernández Bera", url: "https://farmaciafernandezbera.com", domain: "farmaciafernandezbera.com", type: locale === "es" ? "Farmacia" : locale === "en" ? "Pharmacy" : "Farmazia" },
      { name: "Virtuosolve", url: "https://virtuosolve.com", domain: "virtuosolve.com", type: locale === "es" ? "IA para clínicas estéticas" : locale === "en" ? "AI for aesthetic clinics" : "IA klinika estetikoetarako" },
      { name: "Arretxe Motos", url: "https://motosarretxe.com", domain: "motosarretxe.com", type: locale === "es" ? "Taller y concesionario Honda & SYM · 58 años" : locale === "en" ? "Honda & SYM dealer · 58 years" : "Honda & SYM kontzesionarioa · 58 urte" },
    ],
  };

  const ctaLabel = locale === "es" ? "Empezar ahora" : locale === "en" ? "Get started" : "Hasi orain";
  const detailLabel = locale === "es" ? "Ver todos los detalles" : locale === "en" ? "See full details" : "Xehetasun guztiak ikusi";
  const fromLabel = locale === "es" ? "Desde" : locale === "en" ? "From" : "Honetatik";
  const popularLabel = locale === "es" ? "Recomendado" : locale === "en" ? "Recommended" : "Gomendatua";
  const noteLabel =
    locale === "es"
      ? "Precio orientativo. Para proyectos más complejos, hasta 2.000€. Siempre precio cerrado antes de empezar."
      : locale === "en"
      ? "Indicative price. For more complex projects, up to €2,000. Always a fixed price before starting."
      : "Gutxi gorabeherako prezioa. Proiektu konplexuagoetarako, 2.000€ arte. Beti prezio itxia hasi aurretik.";

  return (
    <>
      <style>{`
        .pc-section{padding:clamp(4rem,8vw,7rem) 0;background:var(--color-bg)}
        .pc-card-wrap{max-width:860px;margin:0 auto}
        .pc-card{position:relative;display:grid;grid-template-columns:1fr 1fr;border-radius:var(--radius-2xl);background:linear-gradient(160deg,#0a2412 0%,#162b1c 100%);border:1px solid rgba(180,205,184,.18);box-shadow:0 32px 80px rgba(0,0,0,.55),0 0 0 1px rgba(180,205,184,.08);overflow:hidden}
        @media(max-width:640px){.pc-card{grid-template-columns:1fr}}
        .pc-badge{position:absolute;top:var(--space-5);right:var(--space-5);display:inline-flex;align-items:center;gap:var(--space-1);padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);background:rgba(180,205,184,.18);color:#b4cdb8;font-family:var(--font-sans);font-size:var(--text-xs);font-weight:600;letter-spacing:.06em;text-transform:uppercase}
        .pc-left{display:flex;flex-direction:column;padding:clamp(1.5rem,4vw,2.5rem);border-right:1px solid rgba(180,205,184,.1)}
        @media(max-width:640px){.pc-left{border-right:none;border-bottom:1px solid rgba(180,205,184,.1)}}
        .pc-header{margin-bottom:var(--space-6);padding-right:clamp(0px,5vw,3rem)}
        .pc-subtitle{font-family:var(--font-sans);font-size:var(--text-xs);font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b4cdb8;margin:0 0 var(--space-2)}
        .pc-name{font-family:var(--font-serif);font-size:clamp(1.5rem,3vw,2.25rem);font-weight:400;line-height:var(--lh-tight);letter-spacing:-.02em;color:#ece7d6;margin:0 0 var(--space-3)}
        .pc-description{font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--lh-relaxed);color:rgba(236,231,214,.55);margin:0}
        .pc-sep{background:rgba(180,205,184,.12)!important;margin-bottom:var(--space-6)}
        .pc-features{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-3)}
        .pc-feature{display:flex;align-items:flex-start;gap:var(--space-3);font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--lh-normal);color:rgba(236,231,214,.75)}
        .pc-check{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:rgba(74,222,128,.12);color:#4ade80;margin-top:.05em}
        .pc-right{display:flex;flex-direction:column;justify-content:center;padding:clamp(1.5rem,4vw,2.5rem);gap:var(--space-6)}
        .pc-price-block{text-align:center}
        .pc-from{font-family:var(--font-sans);font-size:var(--text-sm);color:rgba(236,231,214,.45);margin:0 0 var(--space-1)}
        .pc-price{font-family:var(--font-serif);font-size:clamp(2.5rem,5vw,3.75rem);font-weight:400;line-height:1;letter-spacing:-.03em;color:#ece7d6;margin:0;font-variant-numeric:tabular-nums}
        .pc-price-note{font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(236,231,214,.4);margin:var(--space-1) 0 0}
        .pc-actions{display:flex;flex-direction:column;gap:var(--space-3)}
        .pc-cta-primary{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);min-height:48px;padding:0 var(--space-6);border-radius:var(--radius-lg);background:#b4cdb8;color:#061b0e;font-family:var(--font-sans);font-size:var(--text-sm);font-weight:700;text-decoration:none;cursor:pointer;transition:background-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)}
        .pc-cta-primary:hover{background:#ece7d6;transform:translateY(-2px);box-shadow:0 8px 24px rgba(180,205,184,.35)}
        .pc-cta-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 var(--space-6);border-radius:var(--radius-lg);background:transparent;color:rgba(236,231,214,.6);border:1px solid rgba(180,205,184,.18);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:500;cursor:pointer;transition:background-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)}
        .pc-cta-secondary:hover{background:rgba(180,205,184,.06);color:#ece7d6;border-color:rgba(180,205,184,.3)}
        .pc-clients{display:flex;flex-direction:column;gap:var(--space-2);border-top:1px solid rgba(180,205,184,.1);padding-top:var(--space-4)}
        .pc-client{display:flex;align-items:center;gap:var(--space-2);font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(236,231,214,.45)}
        .pc-client-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:#4ade80;flex-shrink:0}
        .pc-note{text-align:center;margin-top:var(--space-5);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-ink-subtle);line-height:var(--lh-relaxed)}
      `}</style>
      <section
        ref={ref}
        className="pc-section"
        aria-labelledby="pc-title"
      >
        <motion.div
          className="container-xl"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Card */}
          <motion.div variants={itemVariants} className="pc-card-wrap">
            <div className="pc-card">
              {/* Popular badge */}
              <div className="pc-badge">
                <Sparkles size={13} aria-hidden="true" />
                {popularLabel}
              </div>

              {/* Left: header + features */}
              <div className="pc-left">
                <div className="pc-header">
                  <p className="pc-subtitle">{plan.subtitle}</p>
                  <HeadingTag id="pc-title" className="pc-name">{plan.name}</HeadingTag>
                  <p className="pc-description">{plan.description}</p>
                </div>

                <Separator className="pc-sep" />

                <ul className="pc-features" aria-label="Incluido en el plan">
                  {plan.features.map((f, i) => (
                    <motion.li
                      key={i}
                      variants={itemVariants}
                      className="pc-feature"
                    >
                      <span className="pc-check" aria-hidden="true">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right: price + CTA */}
              <div className="pc-right">
                <div className="pc-price-block">
                  <p className="pc-from">{fromLabel}</p>
                  <p className="pc-price">{plan.price}</p>
                  <p className="pc-price-note">IVA incl.</p>
                </div>

                <div className="pc-actions">
                  <a
                    href={`/${locale}/contacto`}
                    className="pc-cta-primary focusable"
                  >
                    {ctaLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActivePlan(plan)}
                    className="pc-cta-secondary focusable"
                  >
                    {detailLabel}
                  </button>
                </div>

                {/* Mini client proofs */}
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
          </motion.div>
        </motion.div>
      </section>

      <PlanModal plan={activePlan} onClose={() => setActivePlan(null)} locale={locale} />
    </>
  );
}
