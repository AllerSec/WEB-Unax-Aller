"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import PlanModal, { type PlanDetail } from "@/components/pricing/PlanModal";
import { buildPlans, planCopy } from "@/lib/i18n/pricing-copy";

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconDash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconSparkles = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
  </svg>
);

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
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const c = planCopy(locale);
  const plans = buildPlans(locale);

  return (
    <>
      <style>{`
        .pt-section{padding:clamp(3rem,7vw,6rem) 0;background:var(--color-bg)}
        .pt-head{text-align:center;max-width:680px;margin:0 auto clamp(2rem,4vw,3rem)}
        .pt-head-eyebrow{font-family:var(--font-sans);font-size:var(--text-xs);font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--color-accent);margin:0 0 var(--space-3)}
        .pt-head-title{font-family:var(--font-serif);font-size:clamp(1.6rem,3.6vw,2.5rem);font-weight:500;line-height:var(--lh-tight);letter-spacing:-.02em;color:var(--color-ink);margin:0 0 var(--space-3)}
        .pt-head-sub{font-family:var(--font-sans);font-size:var(--text-md);line-height:var(--lh-relaxed);color:var(--color-ink-muted);margin:0}

        .pt-grid{display:grid;grid-template-columns:1fr 1.18fr 1fr;gap:var(--space-4);max-width:1080px;margin:0 auto;align-items:stretch}
        @media(max-width:960px){.pt-grid{grid-template-columns:1fr;gap:var(--space-5);max-width:520px}}

        .pt-card{position:relative;display:flex;flex-direction:column;background:#FFFFFF;border:1px solid var(--color-line);border-radius:var(--radius-2xl);padding:clamp(1.5rem,3vw,2rem) clamp(1.25rem,2.5vw,1.75rem);transition:transform .25s var(--ease-out),box-shadow .25s var(--ease-out),border-color .25s var(--ease-out)}
        .pt-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);border-color:var(--color-line-strong)}
        .pt-card--star{border:2px solid var(--color-accent);box-shadow:var(--shadow-lg);background:linear-gradient(180deg,#fff 0%,#fff 70%,color-mix(in srgb,var(--color-accent) 4%,#fff) 100%)}
        .pt-card--star:hover{box-shadow:0 20px 44px rgba(3,105,161,.18),0 6px 14px rgba(15,23,42,.06)}
        @media(min-width:961px){.pt-card--star{transform:translateY(-12px)}.pt-card--star:hover{transform:translateY(-15px)}}
        .pt-card--decoy{background:var(--color-bg-muted);opacity:.92}

        .pt-ribbon{position:absolute;top:0;left:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:var(--space-1);padding:var(--space-1) var(--space-4);border-radius:var(--radius-full);background:var(--color-accent);color:#fff;font-family:var(--font-sans);font-size:var(--text-xs);font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 12px rgba(3,105,161,.3)}

        .pt-name{font-family:var(--font-sans);font-size:var(--text-xs);font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--color-accent);margin:var(--space-2) 0 var(--space-2)}
        .pt-card--decoy .pt-name{color:var(--color-ink-subtle)}
        .pt-tagline{font-family:var(--font-serif);font-size:var(--text-lg);font-weight:500;line-height:var(--lh-tight);color:var(--color-ink);margin:0 0 var(--space-4);min-height:2.6em}

        .pt-price-block{margin-bottom:var(--space-1)}
        .pt-price{display:flex;align-items:baseline;gap:.3rem;font-family:var(--font-serif);color:var(--color-primary);letter-spacing:-.03em;font-variant-numeric:tabular-nums;line-height:1}
        .pt-price-num{font-size:clamp(2.25rem,5vw,3rem);font-weight:500}
        .pt-price-unit{font-family:var(--font-sans);font-size:var(--text-sm);font-weight:600;color:var(--color-ink-muted)}
        .pt-price-upfront{font-family:var(--font-sans);font-size:var(--text-sm);font-weight:600;color:var(--color-success);margin:var(--space-2) 0 0;display:flex;align-items:center;gap:.4rem}
        .pt-price-upfront--muted{color:var(--color-ink-subtle);font-weight:500}
        .pt-price-note{font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-ink-subtle);margin:var(--space-1) 0 0}

        .pt-reframe{margin:var(--space-4) 0;padding:var(--space-3) var(--space-4);border-radius:var(--radius-lg);background:var(--color-success-bg);border:1px solid color-mix(in srgb,var(--color-success) 30%,transparent);font-family:var(--font-sans);font-size:var(--text-xs);line-height:var(--lh-normal);color:var(--color-success);font-weight:600}

        .pt-sep{height:1px;background:var(--color-line);margin:var(--space-4) 0}

        .pt-features{list-style:none;padding:0;margin:0 0 var(--space-5);display:flex;flex-direction:column;gap:var(--space-3);flex:1}
        .pt-feature{display:flex;align-items:flex-start;gap:var(--space-2);font-family:var(--font-sans);font-size:var(--text-sm);line-height:var(--lh-normal);color:var(--color-ink-soft)}
        .pt-feature--off{color:var(--color-ink-subtle)}
        .pt-feature-ic{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;margin-top:.05em}
        .pt-feature-ic--yes{background:var(--color-success-bg);color:var(--color-success)}
        .pt-feature-ic--no{background:rgba(2,6,23,.05);color:var(--color-ink-subtle)}

        .pt-actions{display:flex;flex-direction:column;gap:var(--space-2);margin-top:auto}
        .pt-cta{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);min-height:48px;padding:0 var(--space-5);border-radius:var(--radius-lg);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:700;text-decoration:none;cursor:pointer;transition:background-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)}
        .pt-cta--primary{background:var(--color-accent);color:#fff;box-shadow:var(--shadow-sm)}
        .pt-cta--primary:hover{background:var(--color-accent-hover);transform:translateY(-2px);box-shadow:var(--shadow-md)}
        .pt-cta--ghost{background:#fff;color:var(--color-ink-soft);border:1px solid var(--color-line-strong)}
        .pt-cta--ghost:hover{background:var(--color-bg);color:var(--color-accent);border-color:var(--color-accent)}
        .pt-detail{appearance:none;background:none;border:none;cursor:pointer;font-family:var(--font-sans);font-size:var(--text-xs);font-weight:600;color:var(--color-ink-muted);text-decoration:underline;text-underline-offset:3px;padding:var(--space-2);transition:color var(--dur-fast) var(--ease-out)}
        .pt-detail:hover{color:var(--color-accent)}

        .pt-note{text-align:center;margin:clamp(2rem,4vw,3rem) auto 0;max-width:760px;font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-ink-subtle);line-height:var(--lh-relaxed)}
        .pt-note strong{color:var(--color-ink-muted)}

        .pt-anim{opacity:0;transform:translateY(24px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
        .pt-anim.in-view{opacity:1;transform:translateY(0)}
        @media(prefers-reduced-motion:reduce){.pt-anim{transition:none;opacity:1;transform:none}.pt-card,.pt-card:hover{transition:none}}
      `}</style>

      <section ref={ref} className="pt-section" aria-labelledby="pt-title">
        <div className="container-xl">
          <div className="pt-head">
            <p className="pt-head-eyebrow">{c.eyebrow}</p>
            <HeadingTag id="pt-title" className="pt-head-title">
              {c.title}
            </HeadingTag>
            <p className="pt-head-sub">{c.subtitle}</p>
          </div>

          <div className="pt-grid">
            {plans.map((p, idx) => (
              <article
                key={p.id}
                className={`pt-anim pt-card pt-card--${p.variant}${isInView ? " in-view" : ""}`}
                style={{ transitionDelay: isInView ? `${idx * 90}ms` : "0ms" }}
                aria-label={p.name}
              >
                {p.variant === "star" && (
                  <span className="pt-ribbon">
                    <IconSparkles />
                    {c.recommended}
                  </span>
                )}

                <p className="pt-name">{p.name}</p>
                <p className="pt-tagline">{p.tagline}</p>

                <div className="pt-price-block">
                  <div className="pt-price">
                    <span className="pt-price-num">{p.priceNum}</span>
                    {p.priceUnit && <span className="pt-price-unit">{p.priceUnit}</span>}
                  </div>
                  <p className={`pt-price-upfront${p.upfrontMuted ? " pt-price-upfront--muted" : ""}`}>
                    {!p.upfrontMuted && (
                      <span className="pt-feature-ic pt-feature-ic--yes" aria-hidden="true">
                        <IconCheck />
                      </span>
                    )}
                    {p.upfront}
                  </p>
                  {p.priceNote && <p className="pt-price-note">{p.priceNote}</p>}
                </div>

                {p.reframe && <p className="pt-reframe">{p.reframe}</p>}

                <div className="pt-sep" aria-hidden="true" />

                <ul className="pt-features">
                  {p.features.map((f, i) => (
                    <li key={i} className={`pt-feature${f.on ? "" : " pt-feature--off"}`}>
                      <span
                        className={`pt-feature-ic pt-feature-ic--${f.on ? "yes" : "no"}`}
                        aria-hidden="true"
                      >
                        {f.on ? <IconCheck /> : <IconDash />}
                      </span>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-actions">
                  <a
                    href={`https://wa.me/34620909916?text=${encodeURIComponent(p.whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pt-cta pt-cta--${p.variant === "star" ? "primary" : "ghost"} focusable`}
                  >
                    {p.cta}
                    {p.variant === "star" && <IconArrowRight />}
                  </a>
                  {p.detail && (
                    <button
                      type="button"
                      className="pt-detail focusable"
                      onClick={() => setActivePlan(p.detail!)}
                    >
                      {c.seeDetail}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className="pt-note">{c.note}</p>
        </div>
      </section>

      <PlanModal plan={activePlan} onClose={() => setActivePlan(null)} locale={locale} />
    </>
  );
}
