"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const sectionRef = useRef<HTMLElement>(null);

  const items = [
    {
      quote: t("items.0.quote"),
      author: t("items.0.author"),
      role: t("items.0.role"),
    },
    {
      quote: t("items.1.quote"),
      author: t("items.1.author"),
      role: t("items.1.role"),
    },
  ];

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ backgroundColor: "#efeee9" }}
      aria-labelledby="testimonials-title"
    >
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            id="testimonials-title"
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ fontFamily: "Newsreader, Georgia, serif", color: "#061b0e" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base md:text-lg"
            style={{ color: "#434843", fontFamily: "Manrope, sans-serif" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Testimonial cards — always symmetric 2-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="testimonial-card relative p-8 rounded-2xl"
              style={{
                backgroundColor: "#faf9f4",
                border: "1px solid #e3e3de",
                opacity: 0,
              }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-6 right-8 text-6xl leading-none select-none"
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#e3e3de",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5" aria-label="5 estrellas">
                {[...Array(5)].map((_, s) => (
                  <svg
                    key={s}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#4d6453"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-base md:text-lg leading-relaxed mb-6 italic"
                style={{
                  fontFamily: "Newsreader, Georgia, serif",
                  color: "#1b1c19",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    backgroundColor: "#1b3022",
                    color: "#b4cdb8",
                    fontFamily: "Manrope, sans-serif",
                  }}
                  aria-hidden="true"
                >
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#061b0e", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.author}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#737973", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
