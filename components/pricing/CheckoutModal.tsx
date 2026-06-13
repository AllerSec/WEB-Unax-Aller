"use client";

import { useState, useEffect, useRef } from "react";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  locale?: string;
}

type Field = "businessName" | "address" | "sector" | "email" | "phone";

interface FormState {
  businessName: string;
  address: string;
  sector: string;
  email: string;
  phone: string;
}

interface FormErrors {
  businessName?: string;
  email?: string;
  phone?: string;
}

const COPY = {
  es: {
    title: "Empecemos tu web",
    subtitle: "Cuéntame un poco tu negocio para ir preparando todo. Pago único de 1.300€ + IVA, con el primer año incluido y 30 días de garantía.",
    labels: {
      businessName: "Nombre del negocio",
      address: "Dirección o ciudad",
      sector: "¿A qué se dedica tu negocio?",
      email: "Email de contacto",
      phone: "Teléfono",
    },
    placeholders: {
      businessName: "Ej. Farmacia García, Taller Arretxe…",
      address: "Ej. Irun, Donostia, Bilbao…",
      sector: "Ej. Clínica dental, taller de motos, asesoría…",
      email: "tucorreo@gmail.com",
      phone: "Ej. 620 123 456",
    },
    required: "Campo obligatorio",
    emailInvalid: "Introduce un email válido",
    phoneInvalid: "Introduce un teléfono válido",
    cta: "Ir al pago seguro →",
    ctaLoading: "Preparando el pago…",
    cancel: "Cancelar",
    footnote: "Pago seguro con Stripe · 1.300€ + IVA, primer año incluido · 30 días de garantía",
    optionalBadge: "Opcional",
    closeLabel: "Cerrar",
  },
  en: {
    title: "Let's start your website",
    subtitle: "Tell me a bit about your business so I can get everything ready. One-off €1,300 + VAT, with the first year included and a 30-day money-back guarantee.",
    labels: {
      businessName: "Business name",
      address: "Address or city",
      sector: "What does your business do?",
      email: "Contact email",
      phone: "Phone",
    },
    placeholders: {
      businessName: "E.g. García Pharmacy, Arretxe Workshop…",
      address: "E.g. San Sebastián, Bilbao, Pamplona…",
      sector: "E.g. Dental clinic, motorcycle workshop, consultancy…",
      email: "youremail@gmail.com",
      phone: "E.g. +34 620 123 456",
    },
    required: "Required field",
    emailInvalid: "Enter a valid email",
    phoneInvalid: "Enter a valid phone number",
    cta: "Go to secure checkout →",
    ctaLoading: "Preparing checkout…",
    cancel: "Cancel",
    footnote: "Secure payment with Stripe · €1,300 + VAT, first year included · 30-day money-back guarantee",
    optionalBadge: "Optional",
    closeLabel: "Close",
  },
  eu: {
    title: "Has dezagun zure weba",
    subtitle: "Kontatu zure negozioari buruz dena prest izateko. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne eta 30 eguneko bermea.",
    labels: {
      businessName: "Negozioaren izena",
      address: "Helbidea edo hiria",
      sector: "Zeri egiten dio zure negozioak?",
      email: "Harremanetarako email-a",
      phone: "Telefonoa",
    },
    placeholders: {
      businessName: "Ad. García Farmazia, Arretxe Tailerra…",
      address: "Ad. Irun, Donostia, Bilbo…",
      sector: "Ad. Hortz-klinika, moto tailerra, aholkularitza…",
      email: "zureemaila@gmail.com",
      phone: "Ad. 620 123 456",
    },
    required: "Derrigorrezko eremua",
    emailInvalid: "Idatzi baliozko email bat",
    phoneInvalid: "Idatzi baliozko telefono zenbaki bat",
    cta: "Ordainketa seguruentzat →",
    ctaLoading: "Ordainketa prestatzen…",
    cancel: "Utzi",
    footnote: "Ordainketa segurua Striperekin · 1.300€ + BEZ, lehen urtea barne · 30 eguneko bermea",
    optionalBadge: "Aukerakoa",
    closeLabel: "Itxi",
  },
} as const;

type Locale = keyof typeof COPY;

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function validatePhone(v: string) {
  return /^[+\d\s\-()]{7,}$/.test(v.trim());
}

export default function CheckoutModal({ open, onClose, locale = "es" }: CheckoutModalProps) {
  const lang: Locale = (locale as Locale) in COPY ? (locale as Locale) : "es";
  const c = COPY[lang];

  const [form, setForm] = useState<FormState>({
    businessName: "",
    address: "",
    sector: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => firstFieldRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: undefined }));
    setServerError("");
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.businessName.trim()) errs.businessName = c.required;
    if (!form.email.trim()) {
      errs.email = c.required;
    } else if (!validateEmail(form.email)) {
      errs.email = c.emailInvalid;
    }
    if (!form.phone.trim()) {
      errs.phone = c.required;
    } else if (!validatePhone(form.phone)) {
      errs.phone = c.phoneInvalid;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setServerError(data.error ?? (lang === "es" ? "Error inesperado. Inténtalo de nuevo." : lang === "en" ? "Unexpected error. Please try again." : "Ustekabeko errorea. Saiatu berriro."));
        return;
      }
      window.location.href = data.url;
    } catch {
      setServerError(lang === "es" ? "No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo." : lang === "en" ? "Could not connect. Check your connection and try again." : "Ezin izan da konektatu. Egiaztatu zure konexioa eta saiatu berriro.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        .chk-overlay{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(2,6,23,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:chkFadeIn .18s ease both}
        @keyframes chkFadeIn{from{opacity:0}to{opacity:1}}
        .chk-panel{position:relative;width:100%;max-width:520px;max-height:92dvh;overflow-y:auto;background:#fff;border-radius:20px;box-shadow:0 32px 80px rgba(2,6,23,.22),0 8px 24px rgba(2,6,23,.10);animation:chkSlideUp .28s cubic-bezier(.16,1,.3,1) both;display:flex;flex-direction:column}
        @keyframes chkSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .chk-close{position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:50%;border:none;background:rgba(2,6,23,.06);cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(2,6,23,.5);transition:background .15s,color .15s;z-index:1}
        .chk-close:hover{background:rgba(2,6,23,.10);color:rgba(2,6,23,.8)}
        .chk-close:focus-visible{outline:2px solid #171717;outline-offset:2px}
        .chk-header{padding:2rem 2rem 0}
        .chk-step-dot{width:8px;height:8px;border-radius:50%;background:#171717;display:inline-block;margin-bottom:1rem}
        .chk-title{font-family:var(--font-serif,Georgia,serif);font-size:1.5rem;font-weight:500;color:#0A0A0A;letter-spacing:-.02em;line-height:1.25;margin:0 0 .5rem}
        .chk-subtitle{font-family:var(--font-sans,system-ui,sans-serif);font-size:.875rem;color:rgba(2,6,23,.55);line-height:1.55;margin:0}
        .chk-form{padding:1.5rem 2rem 2rem;display:flex;flex-direction:column;gap:1.25rem}
        .chk-field{display:flex;flex-direction:column;gap:.375rem}
        .chk-label-row{display:flex;align-items:center;gap:.5rem}
        .chk-label{font-family:var(--font-sans,system-ui,sans-serif);font-size:.8125rem;font-weight:600;color:#0A0A0A;letter-spacing:.01em}
        .chk-optional{font-size:.7rem;font-weight:500;color:rgba(2,6,23,.4);background:rgba(2,6,23,.06);border-radius:4px;padding:.1rem .4rem;letter-spacing:.02em;text-transform:uppercase}
        .chk-input{width:100%;min-height:48px;padding:.75rem 1rem;border:1.5px solid rgba(2,6,23,.14);border-radius:10px;font-family:var(--font-sans,system-ui,sans-serif);font-size:.9375rem;color:#0A0A0A;background:#fff;outline:none;transition:border-color .15s,box-shadow .15s;box-sizing:border-box}
        .chk-input::placeholder{color:rgba(2,6,23,.32)}
        .chk-input:focus{border-color:#171717;box-shadow:0 0 0 3px rgba(10,10,10,.12)}
        .chk-input--error{border-color:#0A0A0A}
        .chk-input--error:focus{border-color:#0A0A0A;box-shadow:0 0 0 3px rgba(220,38,38,.10)}
        textarea.chk-input{min-height:80px;resize:vertical;line-height:1.5}
        .chk-error{font-family:var(--font-sans,system-ui,sans-serif);font-size:.78rem;color:#0A0A0A;display:flex;align-items:center;gap:.3rem}
        .chk-server-error{background:#fef2f2;border:1px solid rgba(220,38,38,.2);border-radius:10px;padding:.875rem 1rem;font-family:var(--font-sans,system-ui,sans-serif);font-size:.84rem;color:#0A0A0A}
        .chk-footer{display:flex;flex-direction:column;gap:.75rem}
        .chk-submit{display:flex;align-items:center;justify-content:center;gap:.5rem;min-height:52px;padding:0 1.5rem;border-radius:12px;border:none;background:linear-gradient(135deg,#262626 0%,#171717 60%,#0a0a0a 100%);color:#fff;font-family:var(--font-sans,system-ui,sans-serif);font-size:.9375rem;font-weight:800;cursor:pointer;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 14px rgba(10,10,10,.35)}
        .chk-submit:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(10,10,10,.45)}
        .chk-submit:active:not(:disabled){transform:translateY(0)}
        .chk-submit:disabled{opacity:.65;cursor:not-allowed}
        .chk-submit:focus-visible{outline:2px solid #171717;outline-offset:3px}
        .chk-footnote{font-family:var(--font-sans,system-ui,sans-serif);font-size:.75rem;color:rgba(2,6,23,.42);text-align:center;line-height:1.5}
        .chk-spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:chkSpin .7s linear infinite;flex-shrink:0}
        @keyframes chkSpin{to{transform:rotate(360deg)}}
        .chk-lock-icon{flex-shrink:0;opacity:.5}
        @media(max-width:480px){.chk-panel{border-radius:16px 16px 0 0;max-height:96dvh;margin-top:auto;align-self:flex-end;max-width:100%}.chk-overlay{align-items:flex-end;padding:0}.chk-header{padding:1.5rem 1.5rem 0}.chk-form{padding:1.25rem 1.5rem 1.5rem}}
        @media(prefers-reduced-motion:reduce){.chk-overlay,.chk-panel,.chk-submit{animation:none;transition:none}.chk-spinner{animation:none}}
      `}</style>

      <div
        ref={overlayRef}
        className="chk-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chk-title"
        onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      >
        <div className="chk-panel">
          <button
            className="chk-close"
            onClick={onClose}
            aria-label={c.closeLabel}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="chk-header">
            <span className="chk-step-dot" aria-hidden="true" />
            <h2 id="chk-title" className="chk-title">{c.title}</h2>
            <p className="chk-subtitle">{c.subtitle}</p>
          </div>

          <form className="chk-form" onSubmit={handleSubmit} noValidate>
            <div className="chk-field">
              <div className="chk-label-row">
                <label className="chk-label" htmlFor="chk-businessName">
                  {c.labels.businessName}
                </label>
              </div>
              <input
                ref={firstFieldRef}
                id="chk-businessName"
                className={`chk-input${errors.businessName ? " chk-input--error" : ""}`}
                type="text"
                value={form.businessName}
                onChange={set("businessName")}
                placeholder={c.placeholders.businessName}
                autoComplete="organization"
                aria-required="true"
                aria-describedby={errors.businessName ? "chk-err-businessName" : undefined}
              />
              {errors.businessName && (
                <span id="chk-err-businessName" className="chk-error" role="alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path fill="#fff" d="M12 8v4m0 4h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  {errors.businessName}
                </span>
              )}
            </div>

            <div className="chk-field">
              <div className="chk-label-row">
                <label className="chk-label" htmlFor="chk-address">
                  {c.labels.address}
                </label>
                <span className="chk-optional">{c.optionalBadge}</span>
              </div>
              <input
                id="chk-address"
                className="chk-input"
                type="text"
                value={form.address}
                onChange={set("address")}
                placeholder={c.placeholders.address}
                autoComplete="street-address"
              />
            </div>

            <div className="chk-field">
              <div className="chk-label-row">
                <label className="chk-label" htmlFor="chk-sector">
                  {c.labels.sector}
                </label>
                <span className="chk-optional">{c.optionalBadge}</span>
              </div>
              <input
                id="chk-sector"
                className="chk-input"
                type="text"
                value={form.sector}
                onChange={set("sector")}
                placeholder={c.placeholders.sector}
              />
            </div>

            <div className="chk-field">
              <div className="chk-label-row">
                <label className="chk-label" htmlFor="chk-email">
                  {c.labels.email}
                </label>
              </div>
              <input
                id="chk-email"
                className={`chk-input${errors.email ? " chk-input--error" : ""}`}
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder={c.placeholders.email}
                autoComplete="email"
                inputMode="email"
                aria-required="true"
                aria-describedby={errors.email ? "chk-err-email" : undefined}
              />
              {errors.email && (
                <span id="chk-err-email" className="chk-error" role="alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path fill="#fff" d="M12 8v4m0 4h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  {errors.email}
                </span>
              )}
            </div>

            <div className="chk-field">
              <div className="chk-label-row">
                <label className="chk-label" htmlFor="chk-phone">
                  {c.labels.phone}
                </label>
              </div>
              <input
                id="chk-phone"
                className={`chk-input${errors.phone ? " chk-input--error" : ""}`}
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder={c.placeholders.phone}
                autoComplete="tel"
                inputMode="tel"
                aria-required="true"
                aria-describedby={errors.phone ? "chk-err-phone" : undefined}
              />
              {errors.phone && (
                <span id="chk-err-phone" className="chk-error" role="alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path fill="#fff" d="M12 8v4m0 4h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  {errors.phone}
                </span>
              )}
            </div>

            {serverError && (
              <div className="chk-server-error" role="alert">
                {serverError}
              </div>
            )}

            <div className="chk-footer">
              <button
                type="submit"
                className="chk-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="chk-spinner" aria-hidden="true" />
                    {c.ctaLoading}
                  </>
                ) : (
                  c.cta
                )}
              </button>
              <p className="chk-footnote">
                <svg className="chk-lock-icon" style={{display:"inline",verticalAlign:"middle",marginRight:"4px"}} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                {c.footnote}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
