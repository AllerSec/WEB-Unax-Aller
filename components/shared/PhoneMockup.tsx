"use client";

import type { Locale } from "@/lib/i18n/config";

interface Props {
  locale: Locale;
  variant?: "site" | "maps";
}

// Pure CSS phone mockup showing either a website hero or a Google Maps detail
// page. Used in marketing sections to make the abstract value (web + Maps +
// reviews) feel tangible.
export default function PhoneMockup({ locale, variant = "site" }: Props) {
  const labels =
    locale === "es"
      ? {
          businessName: "Clínica Aller",
          tagline: "Hortzgintza · Donostia",
          cta: "Pedir cita",
          rating: "5,0",
          reviews: "87 reseñas",
          openNow: "Abierto ahora",
          phone: "943 12 34 56",
          web: "clinicaaller.com",
        }
      : locale === "en"
      ? {
          businessName: "Clínica Aller",
          tagline: "Dentistry · Donostia",
          cta: "Book a visit",
          rating: "5.0",
          reviews: "87 reviews",
          openNow: "Open now",
          phone: "+34 943 12 34 56",
          web: "clinicaaller.com",
        }
      : {
          businessName: "Clínica Aller",
          tagline: "Hortzgintza · Donostia",
          cta: "Hitzordua eskatu",
          rating: "5,0",
          reviews: "87 iritzi",
          openNow: "Orain irekita",
          phone: "943 12 34 56",
          web: "clinicaaller.com",
        };

  return (
    <>
      <style>{`
        .pm-frame {
          position:relative;
          width:280px;
          height:560px;
          border-radius:38px;
          background:linear-gradient(160deg, #262626, #0A0A0A);
          padding:10px;
          box-shadow:
            0 30px 60px -20px rgba(15,23,42,0.45),
            0 18px 36px -12px rgba(15,23,42,0.30),
            inset 0 0 0 2px rgba(255,255,255,0.04);
          font-family:var(--font-sans);
        }
        .pm-notch {
          position:absolute; top:14px; left:50%; transform:translateX(-50%);
          width:90px; height:22px; background:#0A0A0A; border-radius:14px;
          z-index:3;
        }
        .pm-screen {
          width:100%; height:100%;
          border-radius:30px;
          background:#FFFFFF;
          overflow:hidden;
          position:relative;
          display:flex; flex-direction:column;
        }
        /* SITE variant */
        .pm-site-hero {
          padding:42px 18px 18px;
          background:linear-gradient(160deg, #262626 0%, #0A0A0A 100%);
          color:#FFFFFF;
          text-align:center;
        }
        .pm-site-brand { font-family:var(--font-serif); font-size:20px; font-weight:700; margin:0 0 4px; letter-spacing:-0.02em; }
        .pm-site-tagline { font-size:11px; color:#A3A3A3; margin:0 0 14px; }
        .pm-site-cta {
          display:inline-flex; align-items:center; gap:6px;
          background:#171717; color:#FFFFFF;
          padding:9px 18px; border-radius:999px;
          font-size:12px; font-weight:700;
          box-shadow:0 8px 20px rgba(10,10,10,0.35);
        }
        .pm-site-body { padding:16px; flex:1; display:flex; flex-direction:column; gap:10px; }
        .pm-site-stat { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:var(--color-bg-muted); border-radius:10px; font-size:11px; }
        .pm-site-stat-label { color:var(--color-ink-muted); }
        .pm-site-stat-value { color:var(--color-primary); font-weight:700; }
        .pm-site-row { display:flex; align-items:center; gap:8px; padding:8px 10px; background:#FFFFFF; border:1px solid var(--color-line); border-radius:10px; font-size:11px; color:var(--color-ink); }
        .pm-site-row svg { color:var(--color-accent); flex-shrink:0; }
        .pm-site-reviews { background:linear-gradient(180deg, rgba(16,185,129,0.06), rgba(16,185,129,0)); border:1px solid rgba(16,185,129,0.18); border-radius:10px; padding:10px 12px; }
        .pm-site-reviews-stars { display:flex; align-items:center; gap:4px; font-size:13px; font-weight:700; color:#047857; }
        .pm-site-reviews-text { font-size:10px; color:var(--color-ink-muted); margin-top:2px; }

        /* MAPS variant */
        .pm-maps-bar { display:flex; align-items:center; gap:6px; padding:32px 12px 8px; background:var(--color-bg-muted); }
        .pm-maps-search { flex:1; display:flex; align-items:center; gap:6px; background:#FFFFFF; border:1px solid var(--color-line); border-radius:999px; padding:6px 10px; font-size:11px; color:var(--color-ink-muted); }
        .pm-maps-hero { position:relative; flex:1; background:linear-gradient(135deg, #F0F0F0 0%, #E5E5E5 50%, #D4D4D4 100%); overflow:hidden; }
        .pm-maps-hero::before {
          content:""; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px);
          background-size:20px 20px;
        }
        .pm-maps-roads {
          position:absolute; inset:0;
          background:
            linear-gradient(60deg, transparent 48%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.65) 52%, transparent 52%),
            linear-gradient(-30deg, transparent 48%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.55) 52%, transparent 52%),
            linear-gradient(15deg, transparent 48%, rgba(255,255,255,0.45) 48%, rgba(255,255,255,0.45) 52%, transparent 52%);
        }
        .pm-maps-pin {
          position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
          width:36px; height:36px; border-radius:50% 50% 50% 0; background:#171717;
          rotate:-45deg;
          box-shadow:0 8px 18px rgba(10,10,10,0.50);
          display:flex; align-items:center; justify-content:center;
        }
        .pm-maps-pin::after { content:""; width:14px; height:14px; border-radius:50%; background:#FFFFFF; rotate:45deg; }
        .pm-maps-pulse {
          position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
          width:36px; height:36px; border-radius:50%;
          border:3px solid #171717;
          animation:pm-maps-pulse 2s ease-out infinite;
        }
        @keyframes pm-maps-pulse {
          0% { transform:translate(-50%,-50%) scale(1); opacity:0.7; }
          100% { transform:translate(-50%,-50%) scale(3); opacity:0; }
        }
        .pm-maps-detail { background:#FFFFFF; padding:14px; border-top:1px solid var(--color-line); }
        .pm-maps-name { font-family:var(--font-serif); font-size:15px; font-weight:700; color:var(--color-ink); margin:0; }
        .pm-maps-meta { font-size:11px; color:var(--color-ink-muted); margin:2px 0 8px; display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
        .pm-maps-stars { color:#F59E0B; font-weight:700; }
        .pm-maps-open { color:#047857; font-weight:600; }
        .pm-maps-actions { display:flex; gap:6px; }
        .pm-maps-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:4px; padding:7px 8px; border-radius:8px; font-size:11px; font-weight:600; }
        .pm-maps-btn--primary { background:#171717; color:#FFFFFF; }
        .pm-maps-btn--secondary { background:var(--color-bg-muted); color:var(--color-ink); border:1px solid var(--color-line); }
      `}</style>

      <div
        className="pm-frame"
        role="img"
        aria-label={
          variant === "site"
            ? locale === "es" ? "Mockup de móvil con tu web" : locale === "en" ? "Mobile mockup with your website" : "Mugikorreko mockupa zure webarekin"
            : locale === "es" ? "Mockup de Google Maps con tu negocio" : locale === "en" ? "Google Maps mockup with your business" : "Google Maps mockupa zure negozioarekin"
        }
      >
        <div className="pm-notch" aria-hidden="true" />
        <div className="pm-screen">
          {variant === "site" ? (
            <>
              <div className="pm-site-hero">
                <p className="pm-site-brand">{labels.businessName}</p>
                <p className="pm-site-tagline">{labels.tagline}</p>
                <span className="pm-site-cta">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {labels.cta}
                </span>
              </div>
              <div className="pm-site-body">
                <div className="pm-site-reviews">
                  <div className="pm-site-reviews-stars">
                    ★ ★ ★ ★ ★ <span style={{ marginLeft: 4, color: "var(--color-ink)" }}>{labels.rating}</span>
                  </div>
                  <div className="pm-site-reviews-text">{labels.reviews}</div>
                </div>
                <div className="pm-site-stat">
                  <span className="pm-site-stat-label">{locale === "es" ? "Llamadas/mes" : locale === "en" ? "Calls/month" : "Deiak/hilean"}</span>
                  <span className="pm-site-stat-value">+38%</span>
                </div>
                <div className="pm-site-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {labels.openNow}
                </div>
                <div className="pm-site-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {labels.phone}
                </div>
                <div className="pm-site-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  {labels.web}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="pm-maps-bar">
                <div className="pm-maps-search">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>
                  <span>{labels.businessName}</span>
                </div>
              </div>
              <div className="pm-maps-hero">
                <div className="pm-maps-roads" aria-hidden="true" />
                <span className="pm-maps-pulse" aria-hidden="true" />
                <span className="pm-maps-pin" aria-hidden="true" />
              </div>
              <div className="pm-maps-detail">
                <p className="pm-maps-name">{labels.businessName}</p>
                <div className="pm-maps-meta">
                  <span className="pm-maps-stars">★ {labels.rating}</span>
                  <span>· {labels.reviews}</span>
                  <span>· <span className="pm-maps-open">{labels.openNow}</span></span>
                </div>
                <div className="pm-maps-actions">
                  <span className="pm-maps-btn pm-maps-btn--primary">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {locale === "es" ? "Llamar" : locale === "en" ? "Call" : "Deitu"}
                  </span>
                  <span className="pm-maps-btn pm-maps-btn--secondary">
                    {locale === "es" ? "Web" : "Web"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
