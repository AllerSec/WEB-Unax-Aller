"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "#faf9f4" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: "#061b0e" }}
      >
        <span style={{ fontFamily: "Georgia, serif", color: "#b4cdb8", fontSize: "0.8rem" }}>
          UA
        </span>
      </div>
      <h1
        className="text-2xl md:text-3xl font-light mb-4"
        style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
      >
        Algo ha ido mal
      </h1>
      <p
        className="text-base mb-8 max-w-md"
        style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
      >
        Ha ocurrido un error inesperado. Puedes intentarlo de nuevo o volver al inicio.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: "#061b0e", color: "#ffffff", fontFamily: "Manrope, sans-serif" }}
        >
          Intentar de nuevo
        </button>
        <Link
          href="/es"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{ border: "1.5px solid #c3c8c1", color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
