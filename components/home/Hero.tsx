"use client";

import { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "./HeroBackground";
import HeroVideo from "./HeroVideo";
import { useLiquidGlassHover } from "@/hooks/useLiquidGlassHover";
import type { Locale } from "@/lib/i18n/config";
import UrgencyBadge from "@/components/shared/UrgencyBadge";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

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
  const ctaPrimaryRef = useLiquidGlassHover<HTMLAnchorElement>();
  const ctaSecondaryRef = useLiquidGlassHover<HTMLAnchorElement>();

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

      // Helper — set the price to its final formatted value (used by every branch
      // that does NOT run the count-up animation, so the price never reads "0€").
      const setFinalPrice = () => {
        const priceEl = subtitle?.querySelector<HTMLSpanElement>(".hero-price");
        if (!priceEl) return;
        const formatted = (1300).toLocaleString(locale === "en" ? "en-US" : "es-ES");
        priceEl.textContent = locale === "en" ? `€${formatted}` : `${formatted}€`;
      };

      // Respect reduced motion — reveal everything instantly, no split, no timeline, no sweep
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([badge, ctas, scrollHint], { opacity: 1, y: 0 });
        gsap.set([decorLeft, decorRight], { scaleX: 1 });
        title.classList.add("sweep-done");
        setFinalPrice();
        window.dispatchEvent(new CustomEvent("hero-entrance-done"));
        return;
      }

      // JS will animate secondary elements — leave the H1 visible from first
      // paint so it remains the LCP candidate (no JS-blocked LCP).
      // SplitText runs on the visible title; the per-word entrance still plays
      // but the title block itself never goes opacity:0.
      if (subtitle) subtitle.style.opacity = "0";
      if (badge) (badge as HTMLElement).style.opacity = "0";
      if (ctas) (ctas as HTMLElement).style.opacity = "0";
      if (scrollHint) (scrollHint as HTMLElement).style.opacity = "0";
      // Reset price to 0 so the count-up animation has somewhere to start from.
      const priceElInit = subtitle?.querySelector<HTMLSpanElement>(".hero-price");
      if (priceElInit) priceElInit.textContent = locale === "en" ? "€0" : "0€";

      // Mobile / coarse pointer: skip SplitText + sweep. Simple fade+up on the whole title.
      // SplitText on tiny viewports is the cause of the "title appears late" issue.
      const isMobile =
        window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;

      if (isMobile) {
        gsap.set([decorLeft, decorRight], { scaleX: 1 });
        title.classList.add("is-ready", "sweep-done");

        // Mutable counter object for the price tween — read by onUpdate
        // without relying on `this`, which the React Compiler does not support.
        const priceCounter = { v: 0 };

        const tlMobile = gsap.timeline({
          onComplete: () => {
            window.dispatchEvent(new CustomEvent("hero-entrance-done"));
          },
        });

        // Title is NOT hidden — it stays visible from first paint as the LCP
        // candidate. Animate only secondary elements (badge, subtitle, CTAs).
        tlMobile
          .fromTo(
            badge,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          )
          .fromTo(
            subtitle,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            "-=0.2"
          )
          .to(
            priceCounter,
            {
              v: 1300,
              duration: 1,
              ease: "power2.out",
              snap: { v: 1 },
              onUpdate: () => {
                const priceEl = subtitle?.querySelector<HTMLSpanElement>(".hero-price");
                if (!priceEl) return;
                const v = priceCounter.v;
                const formatted = v.toLocaleString(locale === "en" ? "en-US" : "es-ES");
                priceEl.textContent = locale === "en" ? `€${formatted}` : `${formatted}€`;
              },
            },
            "<0.1"
          )
          .fromTo(
            ctas,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          )
          .fromTo(
            scrollHint,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.1"
          );

        if (scrollHint) {
          gsap.to(scrollHint, {
            y: 6,
            duration: 1.2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.5,
          });
        }

        return;
      }

      // Split title into words only (chars 3D rotation causes jank — words are enough for the reveal feel)
      const splitTitle = SplitText.create(title, {
        type: "words",
        wordsClass: "hero-word",
      });

      // Split subtitle by words too — same vocabulary as the title, lighter feel.
      // We ignore the price span so it stays one piece for the count-up.
      const splitSubtitle = subtitle
        ? SplitText.create(subtitle, {
            type: "words",
            wordsClass: "hero-sub-word",
            ignore: ".hero-price",
          })
        : null;
      if (splitSubtitle) {
        gsap.set(splitSubtitle.words, { y: 16, opacity: 0, force3D: true });
      }

      // Set initial states — no rotateX (3D per-element rasterization is the #1 hero jank source)
      // will-change applied pre-entrance, removed onComplete
      gsap.set(splitTitle.words, {
        y: 40,
        opacity: 0,
        force3D: true,
        willChange: "transform, opacity",
      });

      // Reveal the title container now that words are hidden — prevents flash of full title on mobile
      title.classList.add("is-ready");

      // Mutable counter object for the price tween — read by onUpdate
      // without relying on `this`, which the React Compiler does not support.
      const priceCounterDesktop = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          // Signal to HeroBackground that it can start its RAF loop
          window.dispatchEvent(new CustomEvent("hero-entrance-done"));
        },
      });

      // Badge fade in
      tl.fromTo(
        badge,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", force3D: true }
      )
        // Decorative lines expand
        .fromTo(
          [decorLeft, decorRight],
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power3.inOut",
            stagger: 0.05,
          },
          "-=0.2"
        )
        // Title words stagger in (much lighter than chars with rotateX)
        .to(
          splitTitle.words,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
            force3D: true,
            onComplete: () => {
              // Drop will-change after entrance to free GPU memory
              splitTitle.words.forEach((w) => {
                (w as HTMLElement).style.willChange = "auto";
              });
              // Trigger the one-shot light sweep on the title
              title.classList.add("is-sweeping");
              const onSweepEnd = () => {
                title.classList.remove("is-sweeping");
                title.classList.add("sweep-done");
                title.removeEventListener("animationend", onSweepEnd);
              };
              title.addEventListener("animationend", onSweepEnd);
            },
          },
          "-=0.4"
        )
        // Subtitle reveal — first the wrapper fades, then words stagger in
        .fromTo(
          subtitle,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        )
        .to(
          splitSubtitle?.words ?? [],
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.025,
            force3D: true,
          },
          "<"
        )
        // Count-up the price from 0 → 1300, in sync with the subtitle reveal
        .to(
          priceCounterDesktop,
          {
            v: 1300,
            duration: 1.2,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => {
              const priceEl = subtitle?.querySelector<HTMLSpanElement>(".hero-price");
              if (!priceEl) return;
              const v = priceCounterDesktop.v;
              const formatted = v.toLocaleString(locale === "en" ? "en-US" : "es-ES");
              priceEl.textContent = locale === "en" ? `€${formatted}` : `${formatted}€`;
            },
          },
          "<0.1"
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

      // Reactive sweep — re-triggers the title sweep when user scrolls back up to the hero
      const reactiveSweepST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom top",
        onEnterBack: () => {
          if (!title.classList.contains("sweep-done")) return;
          title.classList.remove("sweep-done");
          // Force reflow so the animation restarts clean
          void title.offsetWidth;
          title.classList.add("is-sweeping");
          const onEnd = () => {
            title.classList.remove("is-sweeping");
            title.classList.add("sweep-done");
            title.removeEventListener("animationend", onEnd);
          };
          title.addEventListener("animationend", onEnd);
        },
      });

      // Parallax scroll on decorative lines — subtle scale with scrub
      let decorLinesST: ScrollTrigger | null = null;
      if (decorLeft && decorRight) {
        decorLinesST = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          animation: gsap.to([decorLeft, decorRight], {
            scaleX: 0.3,
            opacity: 0.4,
            ease: "none",
          }),
        });
      }

      // Cleanup SplitText + ScrollTriggers on unmount
      return () => {
        splitTitle.revert();
        splitSubtitle?.revert();
        reactiveSweepST.kill();
        decorLinesST?.kill();
      };
    },
    { scope: containerRef }
  );

  // Parallax on mouse move — pre-created quickTo setters, no per-event tween allocation
  const parallaxRef = useRef<{
    titleX: (v: number) => void;
    titleY: (v: number) => void;
    subX: (v: number) => void;
    subY: (v: number) => void;
    badgeX: (v: number) => void;
    badgeY: (v: number) => void;
  } | null>(null);

  const parallaxEnabledRef = useRef(false);

  useEffect(() => {
    // Skip parallax on touch devices and when user prefers reduced motion
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = titleRef.current;
    const sub = subtitleRef.current;
    const badge = badgeRef.current;
    if (!title || !sub || !badge) return;
    parallaxRef.current = {
      titleX: gsap.quickTo(title, "x", { duration: 0.8, ease: "power2.out" }),
      titleY: gsap.quickTo(title, "y", { duration: 0.8, ease: "power2.out" }),
      subX: gsap.quickTo(sub, "x", { duration: 0.8, ease: "power2.out" }),
      subY: gsap.quickTo(sub, "y", { duration: 0.8, ease: "power2.out" }),
      badgeX: gsap.quickTo(badge, "x", { duration: 0.8, ease: "power2.out" }),
      badgeY: gsap.quickTo(badge, "y", { duration: 0.8, ease: "power2.out" }),
    };
    parallaxEnabledRef.current = true;
  }, []);

  // rAF-throttled mousemove — at 60Hz, mousemove fires ~120+ times/sec on high-refresh mice
  const rafPendingRef = useRef(false);
  const latestMouseRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!parallaxEnabledRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      latestMouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        const p = parallaxRef.current;
        const m = latestMouseRef.current;
        if (!p || !m) return;
        p.titleX(m.x * 10);
        p.titleY(m.y * 5);
        p.subX(m.x * 5);
        p.subY(m.y * 3);
        p.badgeX(m.x * -3);
        p.badgeY(m.y * -2);
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const p = parallaxRef.current;
    if (!p) return;
    p.titleX(0);
    p.titleY(0);
    p.subX(0);
    p.subY(0);
    p.badgeX(0);
    p.badgeY(0);
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-labelledby="hero-title"
    >
      <HeroVideo />
      <HeroBackground />

      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <div className="container-xl hero-content">
        <div className="hero-content-inner">
          <div
            ref={badgeRef}
            className="hero-badge liquid-glass"
          >
            <span className="hero-badge-dot" aria-hidden="true" />
            {t("badge")}
          </div>

          <UrgencyBadge text={t("availability")} className="hero-availability" />

          <div className="hero-title-row">
            <div
              ref={decorLineLeftRef}
              className="hero-decor-line hero-decor-line--left"
              aria-hidden="true"
            />

            <h1
              id="hero-title"
              ref={titleRef}
              className="hero-title hero-title-sweep"
            >
              {t("title")}
            </h1>

            <div
              ref={decorLineRightRef}
              className="hero-decor-line hero-decor-line--right"
              aria-hidden="true"
            />
          </div>

          <p ref={subtitleRef} className="hero-subtitle">
            {t("subtitlePre")}{" "}
            <span className="hero-price" data-price-value="1300">
              {locale === "en" ? "€1,300" : "1.300€"}
            </span>
            {t("subtitlePost")}
          </p>

          <div ref={ctasRef} className="hero-ctas">
            <Link
              ref={ctaPrimaryRef}
              href={`/${locale}/contacto`}
              className="liquid-glass-dark hero-cta-primary focusable"
            >
              {t("cta")}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="hero-cta-arrow"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              ref={ctaSecondaryRef}
              href={`/${locale}/precios`}
              className="liquid-glass hero-cta-secondary focusable"
            >
              {t("cta2")}
            </Link>
          </div>
        </div>

        <div
          ref={scrollHintRef}
          className="hero-scroll-hint"
          aria-hidden="true"
        >
          <span className="hero-scroll-hint-text">{t("scrollHint")}</span>
          <div className="hero-scroll-hint-line" />
        </div>
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  );
}
