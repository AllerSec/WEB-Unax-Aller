"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Row = { bad: boolean; who: string; detail: string };

const ROWS_BY_LOCALE: Record<"es" | "en" | "eu", Row[]> = {
  es: [
    { bad: true, who: "Agencia local", detail: "2.500–5.000€ inicial · cambios siempre aparte · pagas y rezas" },
    { bad: true, who: "Wix / Squarespace", detail: "Lenta · plantilla genérica · te quedas sin web si dejas de pagar" },
    { bad: true, who: "Sin web (sólo Google Maps)", detail: "Ficha sin optimizar · sin reseñas · te ven, pero no te llaman" },
    { bad: false, who: "Renting Web · Unax", detail: "0€ inicial · 149€/mes todo incluido · cambios al WhatsApp" },
  ],
  en: [
    { bad: true, who: "Local agency", detail: "€2,500–5,000 upfront · changes always extra · pay and pray" },
    { bad: true, who: "Wix / Squarespace", detail: "Slow · generic template · lose your site if you stop paying" },
    { bad: true, who: "No website (Google Maps only)", detail: "Listing not optimized · no reviews · they see you but don't call" },
    { bad: false, who: "Renting Web · Unax", detail: "€0 upfront · €149/month all-in · changes by WhatsApp" },
  ],
  eu: [
    { bad: true, who: "Tokiko agentzia", detail: "2.500–5.000€ hasieran · aldaketak beti aparte · ordaindu eta otoitz egin" },
    { bad: true, who: "Wix / Squarespace", detail: "Geldoa · txantiloi generikoa · webgunea galtzen duzu ordaintzeari uzten badiozu" },
    { bad: true, who: "Webgunerik ez (Google Maps soilik)", detail: "Fitxa optimizatu gabe · iritzirik ez · ikusten zaituzte baina ez dizute deitzen" },
    { bad: false, who: "Renting Web · Unax", detail: "0€ hasieran · 149€/hilean dena barne · aldaketak WhatsApp-etik" },
  ],
};

const COPY = {
  es: {
    eyebrow: "El problema real",
    titleA: "Tu competencia en",
    titleHighlight1: "tu ciudad",
    titleB: "te está quitando",
    titleHighlight2: "40 llamadas al mes",
    titleC: "Y la mayoría ni siquiera lo sabe.",
    body: "Quien sale primero en Google Maps cuando alguien busca «clínica dental en Bilbao», «asesoría en Donostia» o «proveedor industrial en Pamplona», se lleva el cliente. El resto se queda esperando el boca a boca. Yo te monto la ficha de Google, la web y el sistema de reseñas para que el primero seas tú.",
  },
  en: {
    eyebrow: "The real problem",
    titleA: "Your competitors in",
    titleHighlight1: "your city",
    titleB: "are taking",
    titleHighlight2: "40 calls a month",
    titleC: "from you. And most don't even know it.",
    body: "Whoever shows up first on Google Maps when someone searches \"dentist in Bilbao\", \"accountant in Donostia\" or \"industrial supplier in Pamplona\" gets the client. The rest wait for word of mouth. I set up your Google listing, your website and your review system so that the first one is you.",
  },
  eu: {
    eyebrow: "Egiazko arazoa",
    titleA: "Zure",
    titleHighlight1: "hiriko",
    titleB: "lehiakideak hilean",
    titleHighlight2: "40 dei",
    titleC: "kentzen ari zaizkizu. Eta gehienek ez dakite.",
    body: "Norbaitek «hortz-klinika Bilbon», «aholkularitza Donostian» edo «hornitzaile industriala Iruñean» bilatzen duenean, Google Mapsen lehenengo agertzen denak eramaten du bezeroa. Gainerakoek aho-belarrizko publizitatearen zain geratzen dira. Nik prestatzen dizut Google-ko fitxa, webgunea eta iritzi sistema zu lehena izan zaitezen.",
  },
} as const;

export default function PainSection() {
  const locale = (useLocale() as "es" | "en" | "eu") ?? "es";
  const copy = COPY[locale];
  const rows = ROWS_BY_LOCALE[locale];
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
            opacity: 1,
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
          <span className="lp-eyebrow">{copy.eyebrow}</span>
          <h2 id="lp-pain-title" className="lp-section-title">
            {copy.titleA} <span className="lp-pain-highlight">{copy.titleHighlight1}</span> {copy.titleB}{" "}
            <span className="lp-pain-highlight">{copy.titleHighlight2}</span>.
            <br />
            {copy.titleC}
          </h2>
          <p className="lp-body">{copy.body}</p>
        </div>
        <div className="lp-pain-comparison">
          {rows.map((row) => (
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
