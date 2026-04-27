"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  alt: string;
};

/**
 * Founder photo: entrance reveal on scroll + continuous floating drift.
 * Float runs unconditionally — y / x / rotation yoyos with prime-ish
 * durations so they never sync, reading as weightless organic motion.
 */
export default function FounderPhoto({ alt }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        console.warn("[FounderPhoto] no wrapper ref");
        return;
      }
      console.log("[FounderPhoto] init");

      // Float starts immediately. Y + X with prime-ish durations so they
      // never realign — reads as weightless drift, no rotation.
      const floatY = gsap.to(wrapper, {
        y: "+=18",
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      const floatX = gsap.to(wrapper, {
        x: "+=12",
        duration: 4.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Entrance — fade + rise + scale on scroll (separate property: opacity)
      const enterTween = gsap.fromTo(
        wrapper,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            once: true,
          },
        }
      );

      return () => {
        floatY.kill();
        floatX.kill();
        enterTween.kill();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="founder-strip-photo founder-strip-photo-anim">
      <Image
        src="/images/unax.jpg"
        alt={alt}
        width={800}
        height={1456}
        sizes="(max-width: 768px) 80vw, 360px"
        priority={false}
      />
    </div>
  );
}
