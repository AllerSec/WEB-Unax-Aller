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
 */
export default function HeroVideo({ className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile !== false) return;
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
  }, [isMobile]);

  // SSR / pre-hydration: show poster only.
  if (isMobile === null || isMobile) {
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
        preload="auto"
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
