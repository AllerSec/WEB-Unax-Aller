"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n/config";

type Props = { locale: Locale };

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ locale }: Props) {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const budgetOptions = [
    t("budgetOptions.0"),
    t("budgetOptions.1"),
    t("budgetOptions.2"),
    t("budgetOptions.3"),
  ];

  const validate = () =>
    form.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.message.trim().length > 10;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        body: JSON.stringify(form),
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

  const isNameError = touched.name && form.name.trim().length < 2;
  const isEmailError = touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isMessageError = touched.message && form.message.trim().length < 10;

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
        <label htmlFor="name" className="field-label" data-required>
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          className="input"
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
        <label htmlFor="email" className="field-label" data-required>
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={form.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          className="input"
          aria-invalid={isEmailError || undefined}
          aria-describedby={isEmailError ? "email-error" : undefined}
        />
        {isEmailError && (
          <p id="email-error" className="field-error" role="alert">
            {locale === "es" ? "Email inválido" : locale === "en" ? "Invalid email" : "Email baliogabea"}
          </p>
        )}
      </div>

      <div className="contact-row-2">
        <div className="field">
          <label htmlFor="company" className="field-label">
            {t("company")}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="budget" className="field-label">
            {t("budget")}
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="select"
          >
            <option value="">—</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message" className="field-label" data-required>
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          onBlur={() => handleBlur("message")}
          className="textarea"
          aria-invalid={isMessageError || undefined}
          aria-describedby={isMessageError ? "message-error" : undefined}
        />
        {isMessageError && (
          <p id="message-error" className="field-error" role="alert">
            {locale === "es"
              ? "Por favor, cuéntanos más sobre tu proyecto"
              : locale === "en"
              ? "Please tell us more about your project"
              : "Mesedez, kontatu gehiago zure proiektuari buruz"}
          </p>
        )}
      </div>

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
          <>
            {t("submit")}
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="contact-error" role="alert">
          {t("error")}
        </p>
      )}

      <p className="contact-legal-note">
        {locale === "es"
          ? "Al enviar aceptas nuestra política de privacidad. Nunca compartimos tus datos."
          : locale === "en"
          ? "By submitting you accept our privacy policy. We never share your data."
          : "Bidaltzean gure pribatutasun politika onartzen duzu. Ez ditugu zure datuak inoiz partekatzen."}
      </p>
    </form>
  );
}
