import type { Locale } from "@/lib/i18n/config";

interface Props {
  locale: Locale;
}

type IconKey =
  | "palette"
  | "smartphone"
  | "search"
  | "map-pin"
  | "cloud"
  | "wrench"
  | "message-circle"
  | "edit"
  | "star";

// Lucide-style icons (stroke 1.75, 24×24). Server-rendered, no runtime cost.
const ICONS: Record<IconKey, React.ReactNode> = {
  palette: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  smartphone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M12 18h.01" />
    </svg>
  ),
  search: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  "map-pin": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  cloud: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78 7 7 0 1 0-12 5.78" />
      <path d="M3 19h14.5" />
    </svg>
  ),
  wrench: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a4.5 4.5 0 0 0 6.4 6.4l-9.4 9.4a2.83 2.83 0 1 1-4-4l9.4-9.4a4.5 4.5 0 0 0-2.4-2.4z" />
    </svg>
  ),
  "message-circle": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  edit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  star: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  ),
};

// Hero-style visual showing the 9 services bundled into the monthly fee.
// Designed to sit above the 6.170€ breakdown table and give the reader an
// immediate sense of *how much* is in the package without reading numbers.
export default function PackageVisual({ locale }: Props) {
  const items: { icon: IconKey; label: string; price: string }[] =
    locale === "es"
      ? [
          { icon: "palette", label: "Diseño", price: "1.500€" },
          { icon: "smartphone", label: "Móvil", price: "400€" },
          { icon: "search", label: "SEO local", price: "900€" },
          { icon: "map-pin", label: "Google Maps", price: "600€" },
          { icon: "cloud", label: "Hosting", price: "240€" },
          { icon: "wrench", label: "Mantenimiento", price: "600€" },
          { icon: "message-circle", label: "WhatsApp", price: "480€" },
          { icon: "edit", label: "Cambios mensuales", price: "1.200€" },
          { icon: "star", label: "Reseñas", price: "250€" },
        ]
      : locale === "en"
      ? [
          { icon: "palette", label: "Design", price: "€1,500" },
          { icon: "smartphone", label: "Mobile", price: "€400" },
          { icon: "search", label: "Local SEO", price: "€900" },
          { icon: "map-pin", label: "Google Maps", price: "€600" },
          { icon: "cloud", label: "Hosting", price: "€240" },
          { icon: "wrench", label: "Maintenance", price: "€600" },
          { icon: "message-circle", label: "WhatsApp", price: "€480" },
          { icon: "edit", label: "Monthly edits", price: "€1,200" },
          { icon: "star", label: "Reviews", price: "€250" },
        ]
      : locale === "eu"
      ? [
          { icon: "palette", label: "Diseinua", price: "1.500€" },
          { icon: "smartphone", label: "Mugikorra", price: "400€" },
          { icon: "search", label: "Tokiko SEO", price: "900€" },
          { icon: "map-pin", label: "Google Maps", price: "600€" },
          { icon: "cloud", label: "Hostinga", price: "240€" },
          { icon: "wrench", label: "Mantentzea", price: "600€" },
          { icon: "message-circle", label: "WhatsApp", price: "480€" },
          { icon: "edit", label: "Hileko aldaketak", price: "1.200€" },
          { icon: "star", label: "Iritziak", price: "250€" },
        ]
      : [
          { icon: "palette", label: "Design", price: "1 500 €" },
          { icon: "smartphone", label: "Mobile", price: "400 €" },
          { icon: "search", label: "SEO local", price: "900 €" },
          { icon: "map-pin", label: "Google Maps", price: "600 €" },
          { icon: "cloud", label: "Hébergement", price: "240 €" },
          { icon: "wrench", label: "Maintenance", price: "600 €" },
          { icon: "message-circle", label: "WhatsApp", price: "480 €" },
          { icon: "edit", label: "Modifications mensuelles", price: "1 200 €" },
          { icon: "star", label: "Avis", price: "250 €" },
        ];

  return (
    <>
      <style>{`
        .pv-grid {
          display:grid;
          grid-template-columns:repeat(3, 1fr);
          gap:var(--space-3);
          max-width:680px;
          margin:0 auto var(--space-6);
        }
        @media(max-width:520px){ .pv-grid{ grid-template-columns:repeat(2, 1fr); } }
        .pv-tile {
          background:#FFFFFF;
          border:1px solid rgba(10, 10, 10, 0.08);
          border-radius:var(--radius-lg);
          padding:var(--space-4);
          text-align:left;
          display:flex; flex-direction:column; gap:8px;
          transition:transform .25s var(--ease-out), box-shadow .25s var(--ease-out), border-color .25s var(--ease-out);
          position:relative;
          overflow:hidden;
        }
        .pv-tile:hover {
          transform:translateY(-3px);
          border-color:rgba(10, 10, 10, 0.16);
          box-shadow:0 12px 32px rgba(10, 10, 10, 0.08);
        }
        .pv-tile:hover .pv-icon { background:color-mix(in srgb, #0A0A0A 16%, transparent); transform:scale(1.05) rotate(-3deg); }
        .pv-icon {
          display:inline-flex; align-items:center; justify-content:center;
          width:40px; height:40px;
          border-radius:var(--radius-md);
          background:color-mix(in srgb, #0A0A0A 10%, transparent);
          color:#0A0A0A;
          transition:background-color .25s var(--ease-out), transform .25s var(--ease-out);
        }
        .pv-label { font-family:var(--font-sans); font-size:13px; font-weight:600; color:var(--color-ink); line-height:1.3; }
        .pv-price { font-family:var(--font-sans); font-size:11px; color:var(--color-ink-muted); font-variant-numeric:tabular-nums; letter-spacing:.02em; }
        .pv-arrow {
          display:flex; align-items:center; justify-content:center;
          margin:0 auto var(--space-6);
          width:46px; height:46px; border-radius:50%;
          background:var(--color-ink);
          color:#FFFFFF;
          box-shadow:0 12px 28px rgba(10, 10, 10, 0.25);
          animation:pv-bob 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) { .pv-arrow { animation:none; } }
        @keyframes pv-bob {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(5px); }
        }
        .pv-equals {
          max-width:680px; margin:0 auto;
          display:flex; align-items:center; justify-content:space-between; gap:var(--space-4);
          padding:var(--space-5) var(--space-6);
          background:var(--color-ink);
          color:#FFFFFF;
          border-radius:var(--radius-xl);
          box-shadow:0 12px 40px rgba(10, 10, 10, 0.18);
          position:relative;
          overflow:hidden;
        }
        .pv-equals::before {
          content:""; position:absolute; top:-50%; right:-20%;
          width:300px; height:300px; border-radius:50%;
          background:radial-gradient(circle, rgba(220, 38, 38, 0.18), transparent 60%);
          pointer-events:none;
        }
        .pv-equals-label { font-family:var(--font-sans); font-size:14px; font-weight:500; color:rgba(255, 255, 255, 0.72); position:relative; z-index:1; }
        .pv-equals-value { font-family:var(--font-serif); font-size:clamp(1.5rem, 4vw, 2.25rem); font-weight:700; color:#FFFFFF; letter-spacing:-.02em; position:relative; z-index:1; }
        .pv-equals-strike { color:rgba(255, 255, 255, 0.4); text-decoration:line-through; font-size:0.9em; margin-right:var(--space-2); font-weight:400; }
      `}</style>

      <div className="pv-grid" role="list" aria-label={locale === "es" ? "Servicios incluidos el primer año" : locale === "en" ? "Services included the first year" : locale === "eu" ? "Lehen urtean barne dauden zerbitzuak" : "Services inclus la première année"}>
        {items.map((it) => (
          <div key={it.label} className="pv-tile" role="listitem">
            <span className="pv-icon" aria-hidden="true">{ICONS[it.icon]}</span>
            <span className="pv-label">{it.label}</span>
            <span className="pv-price">{it.price}</span>
          </div>
        ))}
      </div>

      <div className="pv-arrow" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
      </div>

      <div className="pv-equals">
        <span className="pv-equals-label">
          {locale === "es"
            ? "Todo esto, por solo"
            : locale === "en"
            ? "All of it, for just"
            : locale === "eu"
            ? "Hau guztia, hau bakarrik"
            : "Tout ça, pour seulement"}
        </span>
        <span className="pv-equals-value">
          <span className="pv-equals-strike">{locale === "en" ? "€6,170" : locale === "fr" ? "6 170 €" : "6.170€"}</span>
          {locale === "en" ? "€1,300" : locale === "fr" ? "1 300 €" : "1.300€"}
        </span>
      </div>
    </>
  );
}
