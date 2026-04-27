"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Locale = "es" | "en" | "eu";

const LABELS: Record<Locale, {
  title: string;
  body: string;
  retry: string;
  back: string;
}> = {
  es: {
    title: "Algo ha ido mal",
    body: "Ha ocurrido un error inesperado. Puedes intentarlo de nuevo o volver al inicio.",
    retry: "Intentar de nuevo",
    back: "Volver al inicio",
  },
  en: {
    title: "Something went wrong",
    body: "An unexpected error occurred. You can try again or go back home.",
    retry: "Try again",
    back: "Back to home",
  },
  eu: {
    title: "Zerbait gaizki joan da",
    body: "Ustekabeko errore bat gertatu da. Saiatu berriro edo itzuli hasierara.",
    retry: "Saiatu berriro",
    back: "Hasierara itzuli",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = useMemo<Locale>(() => {
    const seg = pathname?.split("/")[1];
    return seg === "en" || seg === "eu" ? seg : "es";
  }, [pathname]);
  const l = LABELS[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: "var(--color-line)" }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-accent)",
            fontSize: "0.8rem",
          }}
        >
          UA
        </span>
      </div>
      <h1
        className="text-display"
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: 300,
          marginBottom: "var(--space-4)",
          color: "var(--color-ink)",
        }}
      >
        {l.title}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-ink-muted)",
          fontSize: "var(--text-base)",
          marginBottom: "var(--space-8)",
          maxWidth: "28rem",
        }}
      >
        {l.body}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-4)",
        }}
        className="sm:flex-row"
      >
        <button type="button" onClick={reset} className="btn btn-primary">
          {l.retry}
        </button>
        <Link href={`/${locale}`} className="btn btn-secondary">
          {l.back}
        </Link>
      </div>
    </div>
  );
}
