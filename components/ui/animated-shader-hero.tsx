"use client";

import Link from "next/link";

interface HeroProps {
  trustBadge?: { text: string; icons?: string[] };
  headline: { line1: string; line2: string };
  subtitle: string;
  buttons?: {
    primary?: { text: string; href?: string; onClick?: () => void };
    secondary?: { text: string; href?: string };
  };
  className?: string;
}

/* POLAR HERO — light monochrome hero (cult-polar aesthetic).
   Replaces the old WebGL shader hero: pure CSS (dotted grid + hairline
   frames), so the LCP headline never waits on JS and mobile pays zero
   GPU cost. Class names (sh__*) are kept so globals.css owns the look. */
export function AnimatedShaderHero({
  trustBadge, headline, subtitle, buttons, className = "",
}: HeroProps) {
  return (
    <section className={`sh ${className}`} aria-labelledby="hero-h1">
      <div className="sh__inner">
        {/* Availability pill — mono uppercase, hairline frame */}
        {trustBadge && (
          <div className="sh__pill" aria-label={trustBadge.text}>
            <span className="sh__pill-dot" aria-hidden="true" />
            <span className="sh__pill-text">{trustBadge.text}</span>
          </div>
        )}

        {/* Main headline — ink line 1, muted gray line 2 */}
        <h1 id="hero-h1" className="sh__h1">
          <span className="sh__h1-plain">{headline.line1}</span>
          <span className="sh__h1-accent">{headline.line2}</span>
        </h1>

        {/* Sub */}
        <p className="sh__sub">{subtitle}</p>

        {/* CTAs */}
        {buttons && (
          <div className="sh__ctas">
            {buttons.primary && (
              buttons.primary.onClick ? (
                <button
                  type="button"
                  className="sh__btn-primary"
                  onClick={buttons.primary.onClick}
                >
                  {buttons.primary.text}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={buttons.primary.href ?? "/es/contacto"}
                  className="sh__btn-primary"
                >
                  {buttons.primary.text}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            )}
            {buttons.secondary && (
              <Link
                href={buttons.secondary.href ?? "/es/precios"}
                className="sh__btn-secondary"
              >
                {buttons.secondary.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AnimatedShaderHero;
