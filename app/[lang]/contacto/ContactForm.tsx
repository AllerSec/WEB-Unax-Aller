"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Locale } from "@/lib/i18n/config";

gsap.registerPlugin(useGSAP);

type Props = { locale: Locale };

type FormState = {
  name: string;
  email: string;
  phone: string;
  privacy: boolean;
};

type Status = "idle" | "sending" | "success" | "error";

type Country = {
  code: string;
  dial: string;
  label: { es: string; en: string; eu: string; fr: string };
};

const COUNTRIES: Country[] = [
  { code: "ES", dial: "+34", label: { es: "España", en: "Spain", eu: "Espainia", fr: "Espagne" } },
  { code: "FR", dial: "+33", label: { es: "Francia", en: "France", eu: "Frantzia", fr: "France" } },
  { code: "PT", dial: "+351", label: { es: "Portugal", en: "Portugal", eu: "Portugal", fr: "Portugal" } },
  { code: "AD", dial: "+376", label: { es: "Andorra", en: "Andorra", eu: "Andorra", fr: "Andorre" } },
  { code: "GB", dial: "+44", label: { es: "Reino Unido", en: "United Kingdom", eu: "Erresuma Batua", fr: "Royaume-Uni" } },
  { code: "DE", dial: "+49", label: { es: "Alemania", en: "Germany", eu: "Alemania", fr: "Allemagne" } },
  { code: "IT", dial: "+39", label: { es: "Italia", en: "Italy", eu: "Italia", fr: "Italie" } },
  { code: "NL", dial: "+31", label: { es: "Países Bajos", en: "Netherlands", eu: "Herbehereak", fr: "Pays-Bas" } },
  { code: "BE", dial: "+32", label: { es: "Bélgica", en: "Belgium", eu: "Belgika", fr: "Belgique" } },
  { code: "CH", dial: "+41", label: { es: "Suiza", en: "Switzerland", eu: "Suitza", fr: "Suisse" } },
  { code: "US", dial: "+1", label: { es: "Estados Unidos", en: "United States", eu: "Estatu Batuak", fr: "États-Unis" } },
  { code: "MX", dial: "+52", label: { es: "México", en: "Mexico", eu: "Mexiko", fr: "Mexique" } },
  { code: "AR", dial: "+54", label: { es: "Argentina", en: "Argentina", eu: "Argentina", fr: "Argentine" } },
];

export default function ContactForm({ locale }: Props) {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    privacy: false,
  });
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const countryWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countryOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!countryWrapRef.current?.contains(e.target as Node)) setCountryOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCountryOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [countryOpen]);

  const phoneDigits = form.phone.replace(/\D/g, "");
  const isPhoneValid = phoneDigits.length >= 6 && phoneDigits.length <= 15;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isNameValid = form.name.trim().length > 1;

  const validate = () => isNameValid && isEmailValid && isPhoneValid && form.privacy;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      const fullPhone = `${country.dial} ${form.phone.trim()}`;
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "5da5f440-2ca9-42c4-acac-912138bd599f",
          subject: `Nuevo lead web - ${form.name}`,
          from_name: "unaxaller.com",
          replyto: form.email,
          name: form.name,
          email: form.email,
          phone: fullPhone,
          whatsapp: `https://wa.me/${fullPhone.replace(/\D/g, "")}`,
          country: country.code,
          locale,
          botcheck: "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        console.error("Web3Forms response:", res.status, data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form submit failed:", err);
      setStatus("error");
    }
  };

  const isNameError = touched.name && !isNameValid;
  const isEmailError = touched.email && !isEmailValid;
  const isPhoneError = touched.phone && form.phone.length > 0 && !isPhoneValid;

  const labels = {
    name: locale === "es" ? "Nombre completo" : locale === "en" ? "Full name" : locale === "eu" ? "Izen-abizenak" : "Nom complet",
    email: locale === "es" ? "Correo electrónico" : locale === "en" ? "Email address" : locale === "eu" ? "Helbide elektronikoa" : "Adresse email",
    phone: locale === "es" ? "Número de WhatsApp" : locale === "en" ? "WhatsApp number" : locale === "eu" ? "WhatsApp zenbakia" : "Numéro WhatsApp",
  };
  const placeholders = {
    name: locale === "es" ? "Ej. Ane García" : locale === "en" ? "E.g. Ane García" : locale === "eu" ? "Ad. Ane García" : "Ex. Ane García",
    email: locale === "es" ? "tucorreo@gmail.com" : locale === "en" ? "youremail@gmail.com" : locale === "eu" ? "zureemaila@gmail.com" : "votreemail@gmail.com",
    phone: locale === "es" ? "620 123 456" : locale === "en" ? "620 123 456" : locale === "eu" ? "620 123 456" : "6 12 34 56 78",
    privacy: locale === "es" ? "Acepto la" : locale === "en" ? "I accept the" : locale === "eu" ? "Onartzen dut" : "J'accepte la",
    privacyLink: locale === "es" ? "política de privacidad" : locale === "en" ? "privacy policy" : locale === "eu" ? "pribatutasun politika" : "politique de confidentialité",
    submit: locale === "es" ? "Solicita información" : locale === "en" ? "Request information" : locale === "eu" ? "Eskatu informazioa" : "Demander des informations",
    countryAria: locale === "es" ? "Selecciona tu país" : locale === "en" ? "Select your country" : locale === "eu" ? "Aukeratu zure herrialdea" : "Sélectionnez votre pays",
  };

  if (status === "success") {
    return <SuccessState locale={locale} message={t("success")} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="contact-form"
      aria-label={locale === "es" ? "Formulario de contacto" : locale === "en" ? "Contact form" : locale === "eu" ? "Kontaktu inprimakia" : "Formulaire de contact"}
    >
      <div className="field">
        <label htmlFor="name" className="field-label" data-required="">{labels.name}</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={placeholders.name}
          value={form.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          className="input contact-input"
          aria-invalid={isNameError || undefined}
          aria-describedby={isNameError ? "name-error" : undefined}
        />
        {isNameError && (
          <p id="name-error" className="field-error" role="alert">
            {locale === "es" ? "Por favor, introduce tu nombre" : locale === "en" ? "Please enter your name" : locale === "eu" ? "Mesedez, sartu zure izena" : "Merci d'indiquer votre nom"}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email" className="field-label" data-required="">{labels.email}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={placeholders.email}
          value={form.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          className="input contact-input"
          aria-invalid={isEmailError || undefined}
          aria-describedby={isEmailError ? "email-error" : undefined}
        />
        {isEmailError && (
          <p id="email-error" className="field-error" role="alert">
            {locale === "es" ? "Email inválido" : locale === "en" ? "Invalid email" : locale === "eu" ? "Email baliogabea" : "Email invalide"}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="phone" className="field-label" data-required="">{labels.phone}</label>
        <div className="phone-input" data-invalid={isPhoneError || undefined}>
          <div className="phone-country" ref={countryWrapRef}>
            <button
              type="button"
              className="phone-country-trigger focusable"
              onClick={() => setCountryOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={countryOpen}
              aria-label={`${placeholders.countryAria} (${country.label[locale]} ${country.dial})`}
            >
              <span className="phone-country-code" aria-hidden="true">{country.code}</span>
              <svg
                className="phone-country-caret"
                width="10" height="10" viewBox="0 0 12 12"
                fill="none" stroke="currentColor" strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="2 4 6 8 10 4" />
              </svg>
            </button>

            {countryOpen && (
              <ul className="phone-country-menu" role="listbox">
                {COUNTRIES.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={c.code === country.code}
                      className="phone-country-option"
                      onClick={() => {
                        setCountry(c);
                        setCountryOpen(false);
                      }}
                    >
                      <span className="phone-country-code" aria-hidden="true">{c.code}</span>
                      <span className="phone-country-name">{c.label[locale]}</span>
                      <span className="phone-country-dial">{c.dial}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <span className="phone-dial" aria-hidden="true">{country.dial}</span>

          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel-national"
            inputMode="tel"
            placeholder={placeholders.phone}
            value={form.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            className="phone-number"
            aria-invalid={isPhoneError || undefined}
            aria-describedby={isPhoneError ? "phone-error" : undefined}
          />
        </div>
        {isPhoneError && (
          <p id="phone-error" className="field-error" role="alert">
            {locale === "es" ? "Número de teléfono inválido" : locale === "en" ? "Invalid phone number" : locale === "eu" ? "Telefono zenbaki baliogabea" : "Numéro de téléphone invalide"}
          </p>
        )}
      </div>

      <label className="contact-checkbox">
        <input
          type="checkbox"
          name="privacy"
          checked={form.privacy}
          onChange={handleChange}
          required
          className="contact-checkbox-input"
          aria-describedby="privacy-text"
        />
        <span className="contact-checkbox-box" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span id="privacy-text" className="contact-checkbox-text">
          {placeholders.privacy}{" "}
          <a
            href={`/${locale}/privacidad`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-checkbox-link"
          >
            {placeholders.privacyLink}
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending" || !validate()}
        className="contact-submit focusable"
        aria-busy={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <svg
              className="contact-submit-spinner"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            {t("sending")}
          </>
        ) : (
          placeholders.submit
        )}
      </button>

      {status === "error" && (
        <p className="contact-error" role="alert">
          {t("error")}
        </p>
      )}
    </form>
  );
}

function SuccessState({ locale, message }: { locale: Locale; message: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPolylineElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const icon = iconRef.current;
      const check = checkRef.current;
      const title = titleRef.current;
      const msg = messageRef.current;
      if (!icon || !check || !title || !msg) return;

      const length = check.getTotalLength();
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Final visible state — applied for reduced-motion users and as the
      // animation end state for everyone else. Without this, the elements
      // would stay invisible if GSAP failed to run.
      if (reduce) {
        gsap.set(check, { strokeDasharray: length, strokeDashoffset: 0 });
        gsap.set([icon, title, msg], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(check, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(icon, { autoAlpha: 0, scale: 0.85, transformOrigin: "50% 50%" });
      gsap.set([title, msg], { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(icon, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.55,
        ease: "back.out(2)",
      })
        .to(
          check,
          { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" },
          "-=0.15"
        )
        .to(
          [title, msg],
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.25"
        );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="contact-success" role="status" aria-live="polite">
      <div ref={iconRef} className="contact-success-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline ref={checkRef} points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 ref={titleRef} className="contact-success-title">
        {locale === "es" ? "¡Mensaje enviado!" : locale === "en" ? "Message sent!" : locale === "eu" ? "Mezua bidalia!" : "Message envoyé !"}
      </h3>
      <p ref={messageRef} className="contact-success-message">{message}</p>
    </div>
  );
}
