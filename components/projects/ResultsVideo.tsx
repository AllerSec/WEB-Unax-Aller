"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  label: string;
};

/**
 * Plays a muted, looping results clip (e.g. a Google Business analytics curve)
 * once it scrolls into view, so the metric animates the first time the visitor
 * sees it instead of having already finished off-screen. Respects
 * prefers-reduced-motion by staying on the poster frame.
 */
export default function ResultsVideo({ src, poster, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Restart from the beginning so the curve always animates in full.
            video.currentTime = 0;
            const p = video.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="project-results-video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
