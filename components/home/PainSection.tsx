"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Row = { bad: boolean; who: string; detail: string };

const ROWS: Row[] = [
  { bad: true, who: "Agencia local", detail: "2.500–5.000€ inicial · cambios siempre aparte · pagas y rezas" },
  { bad: true, who: "Wix / Squarespace", detail: "Lenta · plantilla genérica · te quedas sin web si dejas de pagar" },
  { bad: true, who: "Sin web (sólo Google Maps)", detail: "Ficha sin optimizar · sin reseñas · te ven, pero no te llaman" },
  { bad: false, who: "Renting Web · Unax", detail: "0€ inicial · 149€/mes todo incluido · cambios al WhatsApp" },
];

export default function PainSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>(".lp-pain-row").forEach((r) => r.classList.add("lp-pain-row--in"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headline = root.querySelector<HTMLElement>(".lp-pain-text");
      const rows = gsap.utils.toArray<HTMLElement>(".lp-pain-row");
      const highlights = root.querySelectorAll<HTMLElement>(".lp-pain-highlight");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
        },
      });

      if (headline) {
        tl.from(headline, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      tl.fromTo(
        highlights,
        { backgroundSize: "0% 0.18em" },
        {
          backgroundSize: "100% 0.18em",
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.35"
      );

      rows.forEach((row, i) => {
        const isGood = row.classList.contains("lp-pain-row--good");
        const icon = row.querySelector<HTMLElement>(".lp-pain-icon");
        const label = `row-${i}`;
        const offset = i === 0 ? "-=0.2" : "+=0.18";

        tl.add(label, offset);

        tl.to(
          row,
          {
            opacity: isGood ? 1 : 0.7,
            y: 0,
            duration: isGood ? 0.85 : 0.6,
            ease: isGood ? "power4.out" : "power3.out",
            onStart: () => row.classList.add("lp-pain-row--in"),
          },
          label
        );

        if (icon) {
          tl.fromTo(
            icon,
            { scale: 0.4, rotate: isGood ? -25 : 0 },
            {
              scale: 1,
              rotate: 0,
              duration: isGood ? 0.7 : 0.45,
              ease: isGood ? "back.out(2.4)" : "back.out(1.8)",
            },
            label + "+=0.05"
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="lp-pain" aria-labelledby="lp-pain-title">
      <div className="container-xl lp-pain-inner">
        <div className="lp-pain-text">
          <span className="lp-eyebrow">El problema real</span>
          <h2 id="lp-pain-title" className="lp-section-title">
            Tu competencia en <span className="lp-pain-highlight">tu ciudad</span> te está quitando{" "}
            <span className="lp-pain-highlight">40 llamadas al mes</span>.
            <br />
            Y la mayoría ni siquiera lo sabe.
          </h2>
          <p className="lp-body">
            Quien sale primero en Google Maps cuando alguien busca «clínica dental en Bilbao»,
            «asesoría en Donostia» o «proveedor industrial en Pamplona», se lleva el cliente.
            El resto se queda esperando el boca a boca. Yo te monto la ficha de Google,
            la web y el sistema de reseñas para que el primero seas tú.
          </p>
        </div>
        <div className="lp-pain-comparison">
          {ROWS.map((row) => (
            <div
              key={row.who}
              className={`lp-pain-row${row.bad ? " lp-pain-row--bad" : " lp-pain-row--good"}`}
            >
              <span className={`lp-pain-icon${row.bad ? "" : " lp-pain-icon--good"}`}>
                {row.bad ? "✗" : "✓"}
              </span>
              <div>
                <strong>{row.who}</strong>
                <span>{row.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
