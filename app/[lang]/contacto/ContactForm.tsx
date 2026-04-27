"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n/config";

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
  flag: string;
  label: { es: string; en: string; eu: string };
};

const COUNTRIES: Country[] = [
  { code: "ES", dial: "+34", flag: "🇪🇸", label: { es: "España", en: "Spain", eu: "Espainia" } },
  { code: "FR", dial: "+33", flag: "🇫🇷", label: { es: "Francia", en: "France", eu: "Frantzia" } },
  { code: "PT", dial: "+351", flag: "🇵🇹", label: { es: "Portugal", en: "Portugal", eu: "Portugal" } },
  { code: "AD", dial: "+376", flag: "🇦🇩", label: { es: "Andorra", en: "Andorra", eu: "Andorra" } },
  { code: "GB", dial: "+44", flag: "🇬🇧", label: { es: "Reino Unido", en: "United Kingdom", eu: "Erresuma Batua" } },
  { code: "DE", dial: "+49", flag: "🇩🇪", label: { es: "Alemania", en: "Germany", eu: "Alemania" } },
  { code: "IT", dial: "+39", flag: "🇮🇹", label: { es: "Italia", en: "Italy", eu: "Italia" } },
  { code: "NL", dial: "+31", flag: "🇳🇱", label: { es: "Países Bajos", en: "Netherlands", eu: "Herbehereak" } },
  { code: "BE", dial: "+32", flag: "🇧🇪", label: { es: "Bélgica", en: "Belgium", eu: "Belgika" } },
  { code: "CH", dial: "+41", flag: "🇨🇭", label: { es: "Suiza", en: "Switzerland", eu: "Suitza" } },
  { code: "US", dial: "+1", flag: "🇺🇸", label: { es: "Estados Unidos", en: "United States", eu: "Estatu Batuak" } },
  { code: "MX", dial: "+52", flag: "🇲🇽", label: { es: "México", en: "Mexico", eu: "Mexiko" } },
  { code: "AR", dial: "+54", flag: "🇦🇷", label: { es: "Argentina", en: "Argentina", eu: "Argentina" } },
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: `${country.dial} ${form.phone.trim()}`,
          countryCode: country.code,
          locale,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isNameError = touched.name && !isNameValid;
  const isEmailError = touched.email && !isEmailValid;
  const isPhoneError = touched.phone && form.phone.length > 0 && !isPhoneValid;

  const placeholders = {
    name: locale === "es" ? "Nombre completo" : locale === "en" ? "Full name" : "Izen-abizenak",
    email: locale === "es" ? "Correo electrónico" : locale === "en" ? "Email address" : "Helbide elektronikoa",
    phone: locale === "es" ? "Número de WhatsApp" : locale === "en" ? "WhatsApp number" : "WhatsApp zenbakia",
    privacy: locale === "es" ? "Acepto la" : locale === "en" ? "I accept the" : "Onartzen dut",
    privacyLink: locale === "es" ? "política de privacidad" : locale === "en" ? "privacy policy" : "pribatutasun politika",
    submit: locale === "es" ? "Solicita información" : locale === "en" ? "Request information" : "Eskatu informazioa",
    countryAria: locale === "es" ? "Selecciona tu país" : locale === "en" ? "Select your country" : "Aukeratu zure herrialdea",
  };

  if (status === "success") {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <div className="contact-success-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="contact-success-title">
          {locale === "es" ? "¡Mensaje enviado!" : locale === "en" ? "Message sent!" : "Mezua bidalia!"}
        </h3>
        <p className="contact-success-message">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="contact-form"
      aria-label={locale === "es" ? "Formulario de contacto" : locale === "en" ? "Contact form" : "Kontaktu inprimakia"}
    >
      <div className="field">
        <label htmlFor="name" className="sr-only">{placeholders.name}</label>
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
            {locale === "es" ? "Por favor, introduce tu nombre" : locale === "en" ? "Please enter your name" : "Mesedez, sartu zure izena"}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email" className="sr-only">{placeholders.email}</label>
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
            {locale === "es" ? "Email inválido" : locale === "en" ? "Invalid email" : "Email baliogabea"}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="phone" className="sr-only">{placeholders.phone}</label>
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
              <span className="phone-country-flag" aria-hidden="true">{country.flag}</span>
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
                      <span className="phone-country-flag" aria-hidden="true">{c.flag}</span>
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
            {locale === "es" ? "Número de teléfono inválido" : locale === "en" ? "Invalid phone number" : "Telefono zenbaki baliogabea"}
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
