"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 768;

type Props = {
  className?: string;
};

/**
 * Background hero — desktop gets the autoplay video, mobile gets a static poster
 * (saves bandwidth and avoids the busy look on small screens).
 * Renders the poster on first paint to avoid SSR/hydration flash.
 *
 * Video load is deferred until after `hero-entrance-done` so the 4 MB asset
 * never competes with LCP. Poster (77 KB) is paint-ready immediately.
 */
export default function HeroVideo({ className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Defer video network load until the hero text is in. Falls back to a
  // 1.5 s timer in case the entrance event never fires (e.g. reduced motion
  // path that already dispatches it, but be safe).
  useEffect(() => {
    if (isMobile !== false) return;
    let armed = true;
    const arm = () => {
      if (!armed) return;
      armed = false;
      setShouldLoadVideo(true);
    };
    window.addEventListener("hero-entrance-done", arm, { once: true });
    const fallback = window.setTimeout(arm, 1500);
    return () => {
      armed = false;
      window.removeEventListener("hero-entrance-done", arm);
      window.clearTimeout(fallback);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile !== false) return;
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch((err) => {
          console.warn("[HeroVideo] autoplay blocked:", err);
        });
      }
    };
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("loadeddata", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [isMobile, shouldLoadVideo]);

  // SSR / pre-hydration / mobile / pre-entrance: show poster only.
  // Video <source> is mounted only after `hero-entrance-done` so it never
  // competes with the LCP H1 over the network.
  if (isMobile === null || isMobile || !shouldLoadVideo) {
    return (
      <div className={`hero-video-root ${className ?? ""}`.trim()} aria-hidden="true">
        <div
          className="hero-video-poster"
          style={{ backgroundImage: "url(/video/hero-poster.jpg)" }}
        />
      </div>
    );
  }

  return (
    <div className={`hero-video-root ${className ?? ""}`.trim()} aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-video-el"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero-poster.jpg"
        tabIndex={-1}
        onError={(e) => {
          console.error("[HeroVideo] error:", (e.target as HTMLVideoElement).error);
        }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
