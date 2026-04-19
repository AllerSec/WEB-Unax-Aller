"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import HeroBackground from "./HeroBackground";
import type { Locale } from "@/lib/i18n/config";

gsap.registerPlugin(useGSAP, SplitText);

type Props = {
  locale: Locale;
};

export default function Hero({ locale }: Props) {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const decorLineLeftRef = useRef<HTMLDivElement>(null);
  const decorLineRightRef = useRef<HTMLDivElement>(null);

  // GSAP entrance + SplitText animation
  useGSAP(
    () => {
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const badge = badgeRef.current;
      const ctas = ctasRef.current;
      const scrollHint = scrollHintRef.current;
      const decorLeft = decorLineLeftRef.current;
      const decorRight = decorLineRightRef.current;

      if (!title) return;

      // Split title into chars for staggered reveal
      const splitTitle = SplitText.create(title, {
        type: "chars,words",
        charsClass: "hero-char",
        wordsClass: "hero-word",
      });

      // Set initial states
      gsap.set(splitTitle.chars, {
        y: 60,
        opacity: 0,
        rotateX: -40,
        transformOrigin: "bottom center",
      });

      const tl = gsap.timeline({ delay: 0.4 });

      // Badge fade in
      tl.fromTo(
        badge,
        { y: 15, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      )
        // Decorative lines expand
        .fromTo(
          [decorLeft, decorRight],
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.inOut",
            stagger: 0.05,
          },
          "-=0.2"
        )
        // Title chars stagger in
        .to(
          splitTitle.chars,
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: { amount: 0.6, from: "start" },
          },
          "-=0.5"
        )
        // Subtitle
        .fromTo(
          subtitle,
          { y: 25, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // CTAs
        .fromTo(
          ctas,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        // Scroll hint
        .fromTo(
          scrollHint,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.1"
        );

      // Scroll hint bobbing
      if (scrollHint) {
        gsap.to(scrollHint, {
          y: 6,
          duration: 1.2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2,
        });
      }

      // Cleanup SplitText on unmount
      return () => {
        splitTitle.revert();
      };
    },
    { scope: containerRef }
  );

  // Parallax on mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(titleRef.current, {
        x: x * 10,
        y: y * 5,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(subtitleRef.current, {
        x: x * 5,
        y: y * 3,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(badgeRef.current, {
        x: x * -3,
        y: y * -2,
        duration: 1,
        ease: "power2.out",
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    gsap.to([titleRef.current, subtitleRef.current, badgeRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#faf9f4" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero section"
    >
      {/* Interactive canvas background */}
      <HeroBackground />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 48%, transparent 30%, rgba(250, 249, 244, 0.55) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Subtle noise texture overlay for premium feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="container-xl relative w-full pt-28 pb-20 md:pt-36 md:pb-28"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{
              backgroundColor: "rgba(239, 238, 233, 0.7)",
              color: "#4d6453",
              border: "1px solid rgba(195, 200, 193, 0.5)",
              fontFamily: "Manrope, sans-serif",
              opacity: 0,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              willChange: "transform",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#4d6453" }}
            />
            {t("badge")}
          </div>

          {/* Decorative lines around title */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div
              ref={decorLineLeftRef}
              className="hidden md:block h-px flex-1 max-w-[120px]"
              style={{
                background:
                  "linear-gradient(to left, rgba(77, 100, 83, 0.3), transparent)",
                transformOrigin: "right center",
              }}
              aria-hidden="true"
            />

            {/* Headline */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] font-light leading-[1.08] tracking-tight"
              style={{
                fontFamily: "Newsreader, Georgia, serif",
                color: "#061b0e",
                opacity: 1,
                willChange: "transform",
                perspective: "600px",
              }}
            >
              {t("title")}
            </h1>

            <div
              ref={decorLineRightRef}
              className="hidden md:block h-px flex-1 max-w-[120px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(77, 100, 83, 0.3), transparent)",
                transformOrigin: "left center",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            style={{
              color: "#434843",
              fontFamily: "Manrope, sans-serif",
              opacity: 0,
              willChange: "transform",
            }}
          >
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: 0 }}
          >
            {/* Primary CTA */}
            <Link
              href={`/${locale}/contacto`}
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-500 hover:-translate-y-1"
              style={{
                backgroundColor: "#061b0e",
                color: "#ffffff",
                fontFamily: "Manrope, sans-serif",
                boxShadow:
                  "0 4px 30px rgba(6, 27, 14, 0.25), 0 0 0 0 rgba(180, 205, 184, 0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 8px 40px rgba(6, 27, 14, 0.35), 0 0 0 3px rgba(180, 205, 184, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 4px 30px rgba(6, 27, 14, 0.25), 0 0 0 0 rgba(180, 205, 184, 0)";
              }}
            >
              {t("cta")}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Secondary CTA */}
            <Link
              href={`/${locale}/precios`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-500 hover:-translate-y-1"
              style={{
                backgroundColor: "transparent",
                color: "#061b0e",
                border: "1.5px solid rgba(195, 200, 193, 0.6)",
                fontFamily: "Manrope, sans-serif",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "#4d6453";
                el.style.backgroundColor = "rgba(239, 238, 233, 0.5)";
                el.style.boxShadow = "0 4px 20px rgba(77, 100, 83, 0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(195, 200, 193, 0.6)";
                el.style.backgroundColor = "transparent";
                el.style.boxShadow = "none";
              }}
            >
              {t("cta2")}
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <span
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{
              color: "#737973",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            {t("scrollHint")}
          </span>
          <div
            className="w-px h-12 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #4d6453, transparent)",
            }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(250, 249, 244, 0.9))",
          zIndex: 2,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
