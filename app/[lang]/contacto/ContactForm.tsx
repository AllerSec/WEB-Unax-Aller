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

  const validate = () => {
    return form.name.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.message.trim().length > 10;
  };

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

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #c3c8c1",
    backgroundColor: "#ffffff",
    color: "#1b1c19",
    fontSize: "14px",
    fontFamily: "Manrope, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    appearance: "none" as const,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#434843",
    fontFamily: "Manrope, sans-serif",
    marginBottom: "6px",
  };

  const isNameError = touched.name && form.name.trim().length < 2;
  const isEmailError = touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isMessageError = touched.message && form.message.trim().length < 10;

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center text-center p-12 rounded-2xl"
        style={{ backgroundColor: "#f5f4ef", border: "1px solid #e3e3de", minHeight: "400px" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#1b3022" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b4cdb8" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-2xl font-light mb-3"
          style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
        >
          {locale === "es" ? "¡Mensaje enviado!" : locale === "en" ? "Message sent!" : "Mezua bidalia!"}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#434843", fontFamily: "Manrope, sans-serif", maxWidth: "360px" }}
        >
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Formulario de contacto"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" style={labelStyle}>
          {t("name")} <span style={{ color: "#ba1a1a" }}>*</span>
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
          style={{
            ...inputBase,
            borderColor: isNameError ? "#ba1a1a" : "#c3c8c1",
          }}
          onFocus={(e) => {
            if (!isNameError) (e.target as HTMLInputElement).style.borderColor = "#4d6453";
          }}
          aria-invalid={isNameError}
          aria-describedby={isNameError ? "name-error" : undefined}
        />
        {isNameError && (
          <p id="name-error" className="text-xs mt-1.5" style={{ color: "#ba1a1a", fontFamily: "Manrope, sans-serif" }}>
            {locale === "es" ? "Por favor, introduce tu nombre" : locale === "en" ? "Please enter your name" : "Mesedez, sartu zure izena"}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" style={labelStyle}>
          {t("email")} <span style={{ color: "#ba1a1a" }}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          style={{
            ...inputBase,
            borderColor: isEmailError ? "#ba1a1a" : "#c3c8c1",
          }}
          onFocus={(e) => {
            if (!isEmailError) (e.target as HTMLInputElement).style.borderColor = "#4d6453";
          }}
          aria-invalid={isEmailError}
          aria-describedby={isEmailError ? "email-error" : undefined}
        />
        {isEmailError && (
          <p id="email-error" className="text-xs mt-1.5" style={{ color: "#ba1a1a", fontFamily: "Manrope, sans-serif" }}>
            {locale === "es" ? "Email inválido" : locale === "en" ? "Invalid email" : "Email baliogabea"}
          </p>
        )}
      </div>

      {/* Company + Budget row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" style={labelStyle}>
            {t("company")}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            style={inputBase}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#4d6453"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#c3c8c1"; }}
          />
        </div>
        <div>
          <label htmlFor="budget" style={labelStyle}>
            {t("budget")}
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            style={{
              ...inputBase,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737973' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "36px",
              cursor: "pointer",
            }}
            onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = "#4d6453"; }}
            onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = "#c3c8c1"; }}
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

      {/* Message */}
      <div>
        <label htmlFor="message" style={labelStyle}>
          {t("message")} <span style={{ color: "#ba1a1a" }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          onBlur={() => handleBlur("message")}
          style={{
            ...inputBase,
            borderColor: isMessageError ? "#ba1a1a" : "#c3c8c1",
            resize: "vertical",
            minHeight: "120px",
          }}
          onFocus={(e) => {
            if (!isMessageError) (e.target as HTMLTextAreaElement).style.borderColor = "#4d6453";
          }}
          aria-invalid={isMessageError}
          aria-describedby={isMessageError ? "message-error" : undefined}
        />
        {isMessageError && (
          <p id="message-error" className="text-xs mt-1.5" style={{ color: "#ba1a1a", fontFamily: "Manrope, sans-serif" }}>
            {locale === "es"
              ? "Por favor, cuéntanos más sobre tu proyecto"
              : locale === "en"
              ? "Please tell us more about your project"
              : "Mesedez, kontatu gehiago zure proiektuari buruz"}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending" || !validate()}
        className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300"
        style={{
          backgroundColor: validate() ? "#061b0e" : "#dbdad5",
          color: validate() ? "#ffffff" : "#737973",
          fontFamily: "Manrope, sans-serif",
          cursor: validate() ? "pointer" : "not-allowed",
          transform: "translateY(0)",
          border: "none",
        }}
        onMouseEnter={(e) => {
          if (validate()) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1b3022";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (validate()) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#061b0e";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }
        }}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            {t("sending")}
          </>
        ) : (
          <>
            {t("submit")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>

      {status === "error" && (
        <p
          className="text-sm text-center p-3 rounded-lg"
          style={{
            color: "#ba1a1a",
            backgroundColor: "#ffdad6",
            fontFamily: "Manrope, sans-serif",
          }}
          role="alert"
        >
          {t("error")}
        </p>
      )}

      <p
        className="text-xs text-center"
        style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
      >
        {locale === "es"
          ? "Al enviar aceptas nuestra política de privacidad. Nunca compartimos tus datos."
          : locale === "en"
          ? "By submitting you accept our privacy policy. We never share your data."
          : "Bidaltzean gure pribatutasun politika onartzen duzu. Ez ditugu zure datuak inoiz partekatzen."}
      </p>
    </form>
  );
}
