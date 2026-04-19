"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
};

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as: Tag = "div",
  href,
  onClick,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const props = {
    ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    className,
    onMouseMove,
    onMouseLeave,
    onClick,
    ...(href ? { href } : {}),
    ...rest,
  };

  return (
    // @ts-expect-error dynamic tag
    <Tag {...props} style={{ display: "inline-block", willChange: "transform", ...rest.style }}>
      {children}
    </Tag>
  );
}
