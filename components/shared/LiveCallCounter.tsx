"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";

interface Props {
  locale: Locale;
}

// Counter that ticks up to a deterministic anchor when scrolled into view.
// Honors prefers-reduced-motion (sets the final value immediately) and uses
// IntersectionObserver so it only animates when actually on screen.
export default function LiveCallCounter({ locale }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [calls, setCalls] = useState(0);
  const [searches, setSearches] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const TARGETS = { calls: 40, searches: 1240, reviews: 87 };
    if (reduceMotion) {
      setCalls(TARGETS.calls);
      setSearches(TARGETS.searches);
      setReviews(TARGETS.reviews);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const DURATION = 1600;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          const k = ease(p);
          setCalls(Math.round(TARGETS.calls * k));
          setSearches(Math.round(TARGETS.searches * k));
          setReviews(Math.round(TARGETS.reviews * k));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "-80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const labels =
    locale === "es"
      ? {
          eyebrow: "Lo que ven mis clientes en el primer trimestre",
          calls: "llamadas nuevas al mes",
          searches: "veces que tu negocio aparece en Google",
          reviews: "reseñas de 5 estrellas",
        }
      : locale === "en"
      ? {
          eyebrow: "What my clients see in the first quarter",
          calls: "new calls per month",
          searches: "times your business shows on Google",
          reviews: "5-star reviews",
        }
      : {
          eyebrow: "Lehen hiruhilekoan bezeroek ikusten dutena",
          calls: "hileko dei berriak",
          searches: "Googlen agertzen den aldiak",
          reviews: "5 izarreko iritziak",
        };

  return (
    <>
      <style>{`
        .lcc-wrap {
          background:#FFFFFF;
          border:1px solid var(--color-line);
          border-radius:var(--radius-xl);
          padding:clamp(1.5rem, 3vw, 2.5rem);
          box-shadow:var(--shadow-md);
          max-width:920px;
          margin:0 auto;
        }
        .lcc-eyebrow { font-family:var(--font-sans); font-size:var(--text-xs); font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--color-accent); margin:0 0 var(--space-5); text-align:center; }
        .lcc-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:var(--space-4); }
        @media(max-width:680px){ .lcc-grid{ grid-template-columns:1fr; gap:var(--space-3); } }
        .lcc-item { text-align:center; padding:var(--space-4); border-radius:var(--radius-lg); position:relative; }
        .lcc-item + .lcc-item { border-left:1px solid var(--color-line); }
        @media(max-width:680px){ .lcc-item + .lcc-item { border-left:none; border-top:1px solid var(--color-line); } }
        .lcc-num { font-family:var(--font-serif); font-size:clamp(2.5rem, 5vw, 3.5rem); font-weight:600; color:var(--color-primary); letter-spacing:-.03em; font-variant-numeric:tabular-nums; line-height:1; margin-bottom:6px; }
        .lcc-num-plus { color:var(--color-accent); font-size:0.7em; vertical-align:super; }
        .lcc-label { font-family:var(--font-sans); font-size:var(--text-sm); color:var(--color-ink-muted); line-height:1.4; max-width:200px; margin:0 auto; }
        .lcc-live { display:inline-flex; align-items:center; gap:6px; font-size:11px; color:#047857; font-weight:600; margin-top:8px; }
        .lcc-live-dot { width:6px; height:6px; border-radius:50%; background:#10B981; animation:lcc-pulse 1.6s ease-in-out infinite; }
        @keyframes lcc-pulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.4; transform:scale(1.4); } }
      `}</style>
      <div ref={ref} className="lcc-wrap">
        <p className="lcc-eyebrow">{labels.eyebrow}</p>
        <div className="lcc-grid">
          <div className="lcc-item">
            <p className="lcc-num">+{calls}</p>
            <p className="lcc-label">{labels.calls}</p>
            <span className="lcc-live" aria-hidden="true">
              <span className="lcc-live-dot" />
              {locale === "es" ? "en vivo" : locale === "en" ? "live" : "zuzenean"}
            </span>
          </div>
          <div className="lcc-item">
            <p className="lcc-num">{searches.toLocaleString(locale === "en" ? "en" : "es")}<span className="lcc-num-plus">+</span></p>
            <p className="lcc-label">{labels.searches}</p>
          </div>
          <div className="lcc-item">
            <p className="lcc-num">{reviews}<span className="lcc-num-plus">★</span></p>
            <p className="lcc-label">{labels.reviews}</p>
          </div>
        </div>
      </div>
    </>
  );
}
