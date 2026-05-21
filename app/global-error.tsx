"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body style={{ backgroundColor: "var(--color-bg)", margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--color-line)",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontFamily: "Georgia, serif", color: "var(--color-accent)", fontSize: "0.8rem" }}>
              UA
            </span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--color-ink)", marginBottom: "1rem" }}>
            Error crítico
          </h1>
          <p style={{ color: "var(--color-ink-muted)", marginBottom: "2rem", maxWidth: "400px" }}>
            Ha ocurrido un error inesperado. Por favor, recarga la página.
          </p>
          <button
            onClick={reset}
            style={{
              backgroundColor: "var(--color-ink)",
              color: "var(--color-bg)",
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Recargar
          </button>
        </div>
      </body>
    </html>
  );
}
