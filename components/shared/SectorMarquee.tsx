import type { Locale } from "@/lib/i18n/config";

interface Props {
  locale: Locale;
}

// Auto-scrolling marquee with the sectors I serve. Reinforces the
// "professional businesses" positioning without needing client logos
// (which I don't have rights to display generically). Pure CSS animation,
// respects prefers-reduced-motion via @media query in globals.
export default function SectorMarquee({ locale }: Props) {
  const sectors =
    locale === "es"
      ? [
          "Clínicas dentales",
          "Fisioterapia",
          "Estética",
          "Abogados",
          "Gestorías",
          "Consultorías",
          "Ingenierías",
          "Industria B2B",
          "Inmobiliarias",
          "Aseguradoras",
          "Óptica",
          "Joyería",
          "Decoración",
          "Concesionarios",
        ]
      : locale === "en"
      ? [
          "Dental clinics",
          "Physiotherapy",
          "Aesthetics",
          "Law firms",
          "Accountants",
          "Consultancies",
          "Engineering",
          "B2B industry",
          "Real estate",
          "Insurance",
          "Optical",
          "Jewelry",
          "Interior design",
          "Dealerships",
        ]
      : locale === "eu"
      ? [
          "Hortz-klinikak",
          "Fisioterapia",
          "Estetika",
          "Abokatuak",
          "Gestoriak",
          "Aholkularitzak",
          "Ingeniaritzak",
          "B2B industria",
          "Inmobiliariak",
          "Aseguruak",
          "Optika",
          "Bitxidenda",
          "Dekorazioa",
          "Kontzesionarioak",
        ]
      : [
          "Cliniques dentaires",
          "Kinésithérapie",
          "Esthétique",
          "Avocats",
          "Cabinets comptables",
          "Consultants",
          "Ingénierie",
          "Industrie B2B",
          "Immobilier",
          "Assurances",
          "Optique",
          "Bijouterie",
          "Décoration",
          "Concessionnaires",
        ];

  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...sectors, ...sectors];

  return (
    <>
      <style>{`
        .sm-wrap {
          position:relative;
          width:100%;
          overflow:hidden;
          padding-block:var(--space-4);
          background:var(--color-bg-muted);
          border-block:1px solid var(--color-line);
          mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }
        .sm-track {
          display:flex;
          gap:var(--space-3);
          width:max-content;
          animation:sm-scroll 38s linear infinite;
        }
        @media(prefers-reduced-motion: reduce){
          .sm-track { animation:none; }
        }
        .sm-chip {
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:8px var(--space-4);
          background:#FFFFFF;
          border:1px solid var(--color-line-strong);
          border-radius:999px;
          font-family:var(--font-sans);
          font-size:14px;
          font-weight:500;
          color:var(--color-ink-soft);
          white-space:nowrap;
        }
        .sm-chip::before {
          content:"";
          width:6px; height:6px; border-radius:50%;
          background:var(--color-accent);
          flex-shrink:0;
        }
        @keyframes sm-scroll {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
      `}</style>
      <section className="sm-wrap" aria-label={locale === "es" ? "Sectores con los que trabajo" : locale === "en" ? "Sectors I work with" : locale === "eu" ? "Lan egiten dudan sektoreak" : "Secteurs avec lesquels je travaille"}>
        <div className="sm-track" aria-hidden="true">
          {doubled.map((s, i) => (
            <span key={i} className="sm-chip">{s}</span>
          ))}
        </div>
      </section>
    </>
  );
}
