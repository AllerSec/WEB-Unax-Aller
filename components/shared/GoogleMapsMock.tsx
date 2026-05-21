"use client";

import type { Locale } from "@/lib/i18n/config";

interface Props {
  locale: Locale;
}

// Pure CSS/SVG mock of a Google Maps top-3 results card. Designed to be the
// visual proof of the value proposition: "your business shows first when
// someone searches «your service + your city»". No external assets — all
// inline so it ships in HTML and Lighthouse stays green.
export default function GoogleMapsMock({ locale }: Props) {
  const labels =
    locale === "es"
      ? {
          search: "Clínica dental Donostia",
          you: "Tu clínica",
          youNote: "Su web · Cita previa · 5,0 ★ (87)",
          comp1: "Clínica del centro",
          comp1Note: "Sin web · 4,2 ★ (12)",
          comp2: "Dentista Donostia Norte",
          comp2Note: "Web antigua · 3,8 ★ (6)",
          badge: "Resultado #1",
        }
      : locale === "en"
      ? {
          search: "Dental clinic Donostia",
          you: "Your clinic",
          youNote: "Website · Booking · 5.0 ★ (87)",
          comp1: "Town centre clinic",
          comp1Note: "No website · 4.2 ★ (12)",
          comp2: "Donostia North Dentist",
          comp2Note: "Old website · 3.8 ★ (6)",
          badge: "Result #1",
        }
      : {
          search: "Hortz klinika Donostia",
          you: "Zure klinika",
          youNote: "Weba · Hitzordua · 5,0 ★ (87)",
          comp1: "Erdialdeko klinika",
          comp1Note: "Webgunerik gabe · 4,2 ★ (12)",
          comp2: "Donostia Iparraldeko dentista",
          comp2Note: "Web zaharra · 3,8 ★ (6)",
          badge: "1. emaitza",
        };

  return (
    <>
      <style>{`
        .gmm-card { position:relative; width:100%; max-width:380px; background:#FFFFFF; border:1px solid var(--color-line); border-radius:14px; box-shadow:0 18px 40px rgba(15,23,42,0.12), 0 4px 12px rgba(15,23,42,0.06); overflow:hidden; font-family:var(--font-sans); }
        .gmm-header { display:flex; align-items:center; gap:8px; padding:10px 14px; border-bottom:1px solid var(--color-line); }
        .gmm-search { flex:1; display:flex; align-items:center; gap:8px; background:var(--color-bg-muted); border-radius:999px; padding:7px 12px; font-size:13px; color:var(--color-ink); }
        .gmm-search svg { color:var(--color-ink-muted); flex-shrink:0; }
        .gmm-row { display:flex; align-items:flex-start; gap:12px; padding:14px; border-bottom:1px solid var(--color-line); position:relative; }
        .gmm-row:last-child { border-bottom:none; }
        .gmm-row--you { background:linear-gradient(180deg, rgba(3,105,161,0.06) 0%, rgba(3,105,161,0.02) 100%); }
        .gmm-pin { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:50%; flex-shrink:0; font-family:var(--font-serif); font-size:14px; font-weight:700; color:#FFFFFF; }
        .gmm-pin--1 { background:#0369A1; box-shadow:0 0 0 4px rgba(3,105,161,0.18); }
        .gmm-pin--2 { background:#94A3B8; }
        .gmm-pin--3 { background:#CBD5E1; color:var(--color-ink); }
        .gmm-content { flex:1; min-width:0; }
        .gmm-name { font-size:14px; font-weight:600; color:var(--color-ink); line-height:1.2; margin-bottom:3px; display:flex; align-items:center; gap:6px; }
        .gmm-meta { font-size:12px; color:var(--color-ink-muted); line-height:1.4; }
        .gmm-badge { position:absolute; top:14px; right:14px; background:#0369A1; color:#FFFFFF; font-size:10px; font-weight:700; padding:3px 8px; border-radius:999px; letter-spacing:0.04em; text-transform:uppercase; }
        .gmm-call { display:inline-flex; align-items:center; gap:4px; margin-top:6px; color:var(--color-accent); font-size:12px; font-weight:600; }
        .gmm-pulse { position:absolute; left:8px; top:8px; width:8px; height:8px; border-radius:50%; background:#10B981; box-shadow:0 0 0 0 rgba(16,185,129,0.6); animation:gmm-live 2s ease-out infinite; }
        @keyframes gmm-live {
          0% { box-shadow:0 0 0 0 rgba(16,185,129,0.5); }
          70% { box-shadow:0 0 0 8px rgba(16,185,129,0); }
          100% { box-shadow:0 0 0 0 rgba(16,185,129,0); }
        }
      `}</style>
      <div className="gmm-card" role="img" aria-label="Google Maps top results mockup">
        <span className="gmm-pulse" aria-hidden="true" />
        <div className="gmm-header">
          <div className="gmm-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>
            <span>{labels.search}</span>
          </div>
        </div>

        <div className="gmm-row gmm-row--you">
          <span className="gmm-badge">{labels.badge}</span>
          <span className="gmm-pin gmm-pin--1">1</span>
          <div className="gmm-content">
            <div className="gmm-name">{labels.you}</div>
            <div className="gmm-meta">{labels.youNote}</div>
            <div className="gmm-call">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {locale === "es" ? "Llamando ahora" : locale === "en" ? "Calling now" : "Orain deitzen"}
            </div>
          </div>
        </div>

        <div className="gmm-row">
          <span className="gmm-pin gmm-pin--2">2</span>
          <div className="gmm-content">
            <div className="gmm-name">{labels.comp1}</div>
            <div className="gmm-meta">{labels.comp1Note}</div>
          </div>
        </div>

        <div className="gmm-row">
          <span className="gmm-pin gmm-pin--3">3</span>
          <div className="gmm-content">
            <div className="gmm-name">{labels.comp2}</div>
            <div className="gmm-meta">{labels.comp2Note}</div>
          </div>
        </div>
      </div>
    </>
  );
}
