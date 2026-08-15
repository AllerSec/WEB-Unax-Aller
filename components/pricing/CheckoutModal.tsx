"use client";

import { useState, useEffect, useRef } from "react";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  locale?: string;
}

type Step = "choose" | "form";

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
    choose: {
      title: "¿Cómo prefieres empezar?",
      subtitle: "Tú eliges. Sin compromiso y sin presión.",
      talk: {
        title: "Habla conmigo primero",
        desc: "Te resuelvo dudas y vemos juntos si encajamos. Respondo yo, en persona.",
        cta: "Hablar contigo",
      },
      buy: {
        title: "Hazme ya mi web",
        desc: "Lo tienes claro. Rellena 4 datos y empezamos esta misma semana.",
        cta: "Empezar mi web",
      },
      reassure: "Pago seguro con Stripe · 30 días de garantía",
    },
    title: "Empecemos tu web",
    subtitle: "Cuéntame un poco tu negocio para ir preparando todo. Pago único de 1.300€ + IVA, con el primer año incluido y 30 días de garantía.",
    back: "Volver",
    trust: {
      a: "Pago cifrado con Stripe",
      b: "30 días de garantía: si no te convence, te devuelvo el dinero",
      c: "No se cobra nada hasta que confirmes en la pantalla de pago",
    },
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
    cta: "Ir al pago seguro",
    ctaLoading: "Preparando el pago…",
    cancel: "Cancelar",
    footnote: "Pago seguro con Stripe · 1.300€ + IVA, primer año incluido · 30 días de garantía",
    optionalBadge: "Opcional",
    closeLabel: "Cerrar",
  },
  en: {
    choose: {
      title: "How would you like to start?",
      subtitle: "Your call. No commitment, no pressure.",
      talk: {
        title: "Talk to me first",
        desc: "I'll answer your questions and we'll see if we're a fit. You'll talk to me, personally.",
        cta: "Talk to you",
      },
      buy: {
        title: "Build my website now",
        desc: "You're ready. Fill in 4 details and we start this week.",
        cta: "Start my website",
      },
      reassure: "Secure payment with Stripe · 30-day money-back guarantee",
    },
    title: "Let's start your website",
    subtitle: "Tell me a bit about your business so I can get everything ready. One-off €1,300 + VAT, with the first year included and a 30-day money-back guarantee.",
    back: "Back",
    trust: {
      a: "Encrypted payment with Stripe",
      b: "30-day guarantee: not happy, full refund",
      c: "Nothing is charged until you confirm on the payment screen",
    },
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
    cta: "Go to secure checkout",
    ctaLoading: "Preparing checkout…",
    cancel: "Cancel",
    footnote: "Secure payment with Stripe · €1,300 + VAT, first year included · 30-day money-back guarantee",
    optionalBadge: "Optional",
    closeLabel: "Close",
  },
  eu: {
    choose: {
      title: "Nola hasi nahi duzu?",
      subtitle: "Zuk erabaki. Konpromisorik eta presiorik gabe.",
      talk: {
        title: "Hitz egin nirekin lehenik",
        desc: "Zalantzak argituko dizkizut eta bat egiten dugun ikusiko dugu. Nik erantzungo dizut, pertsonalki.",
        cta: "Zurekin hitz egin",
      },
      buy: {
        title: "Egin nire weba orain",
        desc: "Argi daukazu. Bete 4 datu eta aste honetan bertan hasiko gara.",
        cta: "Hasi nire weba",
      },
      reassure: "Ordainketa segurua Striperekin · 30 eguneko bermea",
    },
    title: "Has dezagun zure weba",
    subtitle: "Kontatu zure negozioari buruz dena prest izateko. 1.300€ + BEZ ordainketa bakarra, lehen urtea barne eta 30 eguneko bermea.",
    back: "Itzuli",
    trust: {
      a: "Ordainketa zifratua Striperekin",
      b: "30 eguneko bermea: gustatzen ez bazaizu, dirua itzuliko dizut",
      c: "Ez da ezer kobratzen ordainketa pantailan baieztatu arte",
    },
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
    cta: "Ordainketa seguruentzat",
    ctaLoading: "Ordainketa prestatzen…",
    cancel: "Utzi",
    footnote: "Ordainketa segurua Striperekin · 1.300€ + BEZ, lehen urtea barne · 30 eguneko bermea",
    optionalBadge: "Aukerakoa",
    closeLabel: "Itxi",
  },
  fr: {
    choose: {
      title: "Comment préférez-vous commencer ?",
      subtitle: "C'est vous qui décidez. Sans engagement et sans pression.",
      talk: {
        title: "Parlez-moi d'abord",
        desc: "Je réponds à vos questions et nous voyons ensemble si ça colle. C'est moi qui réponds, personnellement.",
        cta: "Vous parler",
      },
      buy: {
        title: "Créez mon site maintenant",
        desc: "Vous êtes décidé. Remplissez 4 informations et nous commençons cette semaine.",
        cta: "Lancer mon site",
      },
      reassure: "Paiement sécurisé avec Stripe · Garantie 30 jours",
    },
    title: "Lançons votre site",
    subtitle: "Parlez-moi un peu de votre entreprise pour que je prépare tout. Paiement unique de 1.300€ + TVA, première année incluse et garantie 30 jours.",
    back: "Retour",
    trust: {
      a: "Paiement chiffré avec Stripe",
      b: "Garantie 30 jours : pas convaincu, remboursement intégral",
      c: "Rien n'est débité avant votre confirmation sur l'écran de paiement",
    },
    labels: {
      businessName: "Nom de l'entreprise",
      address: "Adresse ou ville",
      sector: "Que fait votre entreprise ?",
      email: "Email de contact",
      phone: "Téléphone",
    },
    placeholders: {
      businessName: "Ex. Pharmacie García, Atelier Arretxe…",
      address: "Ex. Hendaye, Saint-Sébastien, Bilbao…",
      sector: "Ex. Clinique dentaire, atelier moto, cabinet de conseil…",
      email: "votreemail@gmail.com",
      phone: "Ex. +33 6 12 34 56 78",
    },
    required: "Champ obligatoire",
    emailInvalid: "Saisissez un email valide",
    phoneInvalid: "Saisissez un numéro de téléphone valide",
    cta: "Aller au paiement sécurisé",
    ctaLoading: "Préparation du paiement…",
    cancel: "Annuler",
    footnote: "Paiement sécurisé avec Stripe · 1.300€ + TVA, première année incluse · Garantie 30 jours",
    optionalBadge: "Facultatif",
    closeLabel: "Fermer",
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

  const [step, setStep] = useState<Step>("choose");
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const contactHref = `/${lang}/contacto`;

  // Reset to the choice step every time the modal opens.
  useEffect(() => {
    if (open) {
      setStep("choose");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus the first field only once we're on the form step.
  useEffect(() => {
    if (open && step === "form") {
      const id = setTimeout(() => firstFieldRef.current?.focus(), 80);
      return () => clearTimeout(id);
    }
  }, [open, step]);

  // Focus management: remember the opener, focus the close button on open,
  // trap Tab inside the panel, close on Escape, restore focus on unmount.
  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 50);

    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !panelRef.current.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, onClose]);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: undefined }));
    setServerError("");
  };

  // Inline validation on blur — surface errors as the user leaves a field,
  // not only on submit (ux: inline-validation).
  const blur = (field: "businessName" | "email" | "phone") => () => {
    const v = form[field].trim();
    let msg: string | undefined;
    if (!v) {
      msg = c.required;
    } else if (field === "email" && !validateEmail(v)) {
      msg = c.emailInvalid;
    } else if (field === "phone" && !validatePhone(v)) {
      msg = c.phoneInvalid;
    }
    setErrors(er => ({ ...er, [field]: msg }));
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
        setServerError(data.error ?? (lang === "es" ? "Error inesperado. Inténtalo de nuevo." : lang === "en" ? "Unexpected error. Please try again." : lang === "fr" ? "Erreur inattendue. Veuillez réessayer." : "Ustekabeko errorea. Saiatu berriro."));
        return;
      }
      window.location.href = data.url;
    } catch {
      setServerError(lang === "es" ? "No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo." : lang === "en" ? "Could not connect. Check your connection and try again." : lang === "fr" ? "Connexion impossible. Vérifiez votre connexion et réessayez." : "Ezin izan da konektatu. Egiaztatu zure konexioa eta saiatu berriro.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        .chk-overlay{position:fixed;inset:0;z-index:var(--z-modal,1100);display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(10,10,10,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:chkFadeIn .18s ease both}
        @keyframes chkFadeIn{from{opacity:0}to{opacity:1}}
        .chk-panel{position:relative;width:100%;max-width:520px;max-height:92dvh;overflow-y:auto;background:var(--color-bg,#fff);border:1px solid var(--color-line-strong,#D4D4D4);box-shadow:var(--shadow-xl);animation:chkSlideUp .28s cubic-bezier(.16,1,.3,1) both;display:flex;flex-direction:column}
        @keyframes chkSlideUp{from{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .chk-close{position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:var(--radius-full,9999px);border:none;background:rgba(10,10,10,.06);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-ink-muted,#525252);transition:background .15s,color .15s;z-index:1}
        .chk-close:hover{background:rgba(10,10,10,.10);color:var(--color-ink,#0A0A0A)}
        .chk-close:active{transform:scale(.94)}
        .chk-close:focus-visible{outline:2px solid var(--color-ink,#171717);outline-offset:2px}
        .chk-header{padding:2rem 2rem 0}
        .chk-title{font-family:var(--font-sans,system-ui,sans-serif);font-size:1.5rem;font-weight:700;color:var(--color-ink,#0A0A0A);letter-spacing:-.02em;line-height:1.25;margin:0 0 .5rem}
        .chk-subtitle{font-family:var(--font-sans,system-ui,sans-serif);font-size:.875rem;color:var(--color-ink-muted,#525252);line-height:1.55;margin:0}
        .chk-form{padding:1.5rem 2rem 2rem;display:flex;flex-direction:column;gap:1.25rem}
        .chk-field{display:flex;flex-direction:column;gap:.375rem}
        .chk-label-row{display:flex;align-items:center;gap:.5rem}
        .chk-label{font-family:var(--font-sans,system-ui,sans-serif);font-size:.8125rem;font-weight:600;color:var(--color-ink,#0A0A0A);letter-spacing:.01em}
        .chk-optional{font-size:.7rem;font-weight:500;color:var(--color-ink-muted,#525252);background:rgba(10,10,10,.06);padding:.1rem .4rem;letter-spacing:.02em;text-transform:uppercase}
        .chk-input{width:100%;min-height:48px;padding:.75rem 1rem;border:1.5px solid var(--color-line-strong,#D4D4D4);border-radius:0;font-family:var(--font-sans,system-ui,sans-serif);font-size:.9375rem;color:var(--color-ink,#0A0A0A);background:var(--color-bg,#fff);outline:none;transition:border-color .15s,box-shadow .15s;box-sizing:border-box}
        .chk-input::placeholder{color:var(--color-ink-subtle,#6B6B6B)}
        .chk-input:focus{border-color:var(--color-ink,#171717);box-shadow:0 0 0 3px rgba(10,10,10,.12)}
        .chk-input--error{border-color:var(--color-danger,#DC2626)}
        .chk-input--error:focus{border-color:var(--color-danger,#DC2626);box-shadow:0 0 0 3px rgba(220,38,38,.12)}
        textarea.chk-input{min-height:80px;resize:vertical;line-height:1.5}
        .chk-error{font-family:var(--font-sans,system-ui,sans-serif);font-size:.78rem;color:var(--color-danger,#DC2626);display:flex;align-items:center;gap:.3rem}
        .chk-server-error{background:var(--color-danger-bg,#FEE2E2);border:1px solid rgba(220,38,38,.3);padding:.875rem 1rem;font-family:var(--font-sans,system-ui,sans-serif);font-size:.84rem;color:#7F1D1D}
        .chk-footer{display:flex;flex-direction:column;gap:.75rem}
        .chk-submit{display:flex;align-items:center;justify-content:center;gap:.5rem;min-height:52px;padding:0 1.5rem;border-radius:0;border:none;background:var(--color-accent,#171717);color:var(--color-accent-contrast,#fff);font-family:var(--font-sans,system-ui,sans-serif);font-size:.9375rem;font-weight:800;cursor:pointer;transition:background .15s,transform .15s,box-shadow .15s;box-shadow:var(--shadow-md)}
        .chk-submit:active:not(:disabled){transform:scale(.98)}
        .chk-submit:disabled{opacity:.65;cursor:not-allowed}
        .chk-submit:focus-visible{outline:2px solid var(--color-ink,#171717);outline-offset:3px}
        .chk-footnote{font-family:var(--font-sans,system-ui,sans-serif);font-size:.75rem;color:var(--color-ink-subtle,#6B6B6B);text-align:center;line-height:1.5}
        .chk-spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:chkSpin .7s linear infinite;flex-shrink:0}
        @keyframes chkSpin{to{transform:rotate(360deg)}}
        .chk-lock-icon{flex-shrink:0;opacity:.5}
        .chk-arrow{flex-shrink:0}
        /* ── Choose step ── */
        .chk-choices{padding:1.5rem 2rem .5rem;display:flex;flex-direction:column;gap:.875rem}
        .chk-choice{display:flex;align-items:flex-start;gap:1rem;width:100%;text-align:left;padding:1.125rem 1.25rem;border-radius:0;border:1.5px solid var(--color-line-strong,#D4D4D4);background:var(--color-bg,#fff);cursor:pointer;text-decoration:none;color:inherit;transition:border-color .15s,box-shadow .15s,transform .15s}
        .chk-choice:active{transform:scale(.98)}
        .chk-choice:focus-visible{outline:2px solid var(--color-ink,#171717);outline-offset:2px}
        .chk-choice--primary{border-color:var(--color-ink,#171717);background:var(--color-ink,#0A0A0A);color:#fff}
        .chk-choice-ico{flex-shrink:0;width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:rgba(10,10,10,.06);color:var(--color-ink,#171717)}
        .chk-choice--primary .chk-choice-ico{background:rgba(255,255,255,.14);color:#fff}
        .chk-choice-body{display:flex;flex-direction:column;gap:.2rem;min-width:0}
        .chk-choice-title{font-family:var(--font-sans,system-ui,sans-serif);font-size:.95rem;font-weight:700;letter-spacing:-.01em}
        .chk-choice-desc{font-family:var(--font-sans,system-ui,sans-serif);font-size:.8rem;line-height:1.45;color:var(--color-ink-muted,#525252)}
        .chk-choice--primary .chk-choice-desc{color:rgba(255,255,255,.72)}
        .chk-choice-cta{margin-top:.35rem;display:inline-flex;align-items:center;gap:.3rem;font-family:var(--font-sans,system-ui,sans-serif);font-size:.8125rem;font-weight:700;color:var(--color-ink,#171717)}
        .chk-choice--primary .chk-choice-cta{color:#fff}
        .chk-reassure{display:flex;align-items:center;justify-content:center;gap:.4rem;padding:1rem 2rem 1.75rem;font-family:var(--font-sans,system-ui,sans-serif);font-size:.75rem;color:var(--color-ink-subtle,#6B6B6B);text-align:center}
        /* ── Back button ── */
        .chk-back{display:inline-flex;align-items:center;gap:.35rem;align-self:flex-start;margin-bottom:.875rem;padding:.4rem .65rem .4rem .4rem;border:none;border-radius:0;background:transparent;cursor:pointer;color:var(--color-ink-muted,#525252);font-family:var(--font-sans,system-ui,sans-serif);font-size:.8rem;font-weight:600;transition:background .15s,color .15s}
        .chk-back:hover{background:rgba(10,10,10,.06);color:var(--color-ink,#0A0A0A)}
        .chk-back:focus-visible{outline:2px solid var(--color-ink,#171717);outline-offset:2px}
        /* ── Trust panel on the form ── */
        .chk-trust{display:flex;flex-direction:column;gap:.625rem;background:var(--color-bg-muted,#F7F7F7);border:1px solid var(--color-line,#EBEBEB);padding:.875rem 1rem}
        .chk-trust-item{display:flex;align-items:flex-start;gap:.55rem;font-family:var(--font-sans,system-ui,sans-serif);font-size:.78rem;line-height:1.4;color:var(--color-ink-muted,#525252)}
        .chk-trust-check{flex-shrink:0;color:var(--color-success,#047857);margin-top:1px}
        @media(hover:hover){
          .chk-submit:hover:not(:disabled){background:var(--color-accent-hover,#000);transform:translateY(-2px);box-shadow:var(--shadow-lg)}
          .chk-choice:hover{border-color:var(--color-ink,#0A0A0A);box-shadow:var(--shadow-md);transform:translateY(-2px)}
          .chk-choice--primary:hover{background:#000;box-shadow:var(--shadow-lg)}
        }
        @media(max-width:480px){.chk-panel{max-height:96dvh;margin-top:auto;align-self:flex-end;max-width:100%;border-left:none;border-right:none;border-bottom:none}.chk-overlay{align-items:flex-end;padding:0}.chk-header{padding:1.5rem 1.5rem 0}.chk-form{padding:1.25rem 1.5rem 1.5rem}.chk-choices{padding:1.25rem 1.5rem .5rem}.chk-reassure{padding:1rem 1.5rem 1.5rem}}
        @media(prefers-reduced-motion:reduce){.chk-overlay,.chk-panel,.chk-submit,.chk-choice{animation:none;transition:none}.chk-spinner{animation-duration:1.4s}}
      `}</style>

      <div
        ref={overlayRef}
        className="chk-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chk-title"
        onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      >
        <div className="chk-panel" ref={panelRef}>
          <button
            ref={closeBtnRef}
            className="chk-close"
            onClick={onClose}
            aria-label={c.closeLabel}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {step === "choose" ? (
            <>
              <div className="chk-header">
                <h2 id="chk-title" className="chk-title">{c.choose.title}</h2>
                <p className="chk-subtitle">{c.choose.subtitle}</p>
              </div>

              <div className="chk-choices">
                <a href={contactHref} className="chk-choice" onClick={onClose}>
                  <span className="chk-choice-ico" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <span className="chk-choice-body">
                    <span className="chk-choice-title">{c.choose.talk.title}</span>
                    <span className="chk-choice-desc">{c.choose.talk.desc}</span>
                    <span className="chk-choice-cta">
                      {c.choose.talk.cta}
                      <svg className="chk-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </span>
                </a>

                <button
                  type="button"
                  className="chk-choice chk-choice--primary"
                  onClick={() => setStep("form")}
                >
                  <span className="chk-choice-ico" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
                    </svg>
                  </span>
                  <span className="chk-choice-body">
                    <span className="chk-choice-title">{c.choose.buy.title}</span>
                    <span className="chk-choice-desc">{c.choose.buy.desc}</span>
                    <span className="chk-choice-cta">
                      {c.choose.buy.cta}
                      <svg className="chk-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </span>
                </button>
              </div>

              <p className="chk-reassure">
                <svg className="chk-lock-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {c.choose.reassure}
              </p>
            </>
          ) : (
            <>
          <div className="chk-header">
            <button type="button" className="chk-back" onClick={() => setStep("choose")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              {c.back}
            </button>
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
                onBlur={blur("businessName")}
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
                onBlur={blur("email")}
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
                onBlur={blur("phone")}
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

            <div className="chk-trust">
              <span className="chk-trust-item">
                <svg className="chk-trust-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                {c.trust.a}
              </span>
              <span className="chk-trust-item">
                <svg className="chk-trust-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                {c.trust.b}
              </span>
              <span className="chk-trust-item">
                <svg className="chk-trust-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                {c.trust.c}
              </span>
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
                  <>
                    {c.cta}
                    <svg className="chk-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
