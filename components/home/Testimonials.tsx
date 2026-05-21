"use client";

import { useRef } from "react";
import Image from "next/image";
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
      logo: "/images/testimonials/motos-arretxe.png",
    },
    {
      quote: t("items.1.quote"),
      author: t("items.1.author"),
      role: t("items.1.role"),
      logo: "/images/testimonials/farmacia-fernandez-bera.webp",
    },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const cards = section.querySelectorAll<HTMLElement>(".testimonial-card");
      const quotes = section.querySelectorAll<HTMLElement>(".testimonial-quote-mark");
      if (!cards.length) return;

      // Card entrance
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
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Scrub: big quote marks drift down + fade in as section scrolls through viewport
      // prefers-reduced-motion respected — skip scrub, leave at final state
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !quotes.length) return;

      const scrubTween = gsap.fromTo(
        quotes,
        { y: -24, opacity: 0.3 },
        {
          y: 12,
          opacity: 1,
          ease: "none",
          stagger: 0.08,
        }
      );

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
        animation: scrubTween,
      });

      return () => {
        st.kill();
        scrubTween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="container-xl">
        <div className="testimonials-header">
          <h2 id="testimonials-title" className="testimonials-title">
            {t("title")}
          </h2>
          <p className="testimonials-subtitle">{t("subtitle")}</p>
        </div>

        <div className="testimonials-grid">
          {items.map((item, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-quote-mark" aria-hidden="true">
                &ldquo;
              </div>

              <div className="testimonial-stars" aria-label="5 estrellas">
                {[...Array(5)].map((_, s) => (
                  <svg
                    key={s}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <blockquote className="testimonial-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt=""
                      width={48}
                      height={48}
                      className="testimonial-avatar-img"
                    />
                  ) : (
                    item.author.charAt(0)
                  )}
                </div>
                <div>
                  <p className="testimonial-author-name">{item.author}</p>
                  <p className="testimonial-author-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
