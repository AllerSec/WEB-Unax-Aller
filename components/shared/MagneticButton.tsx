"use client";

import { useRef, useCallback, useEffect } from "react";
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
  const xSetterRef = useRef<((v: number) => void) | null>(null);
  const ySetterRef = useRef<((v: number) => void) | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    xSetterRef.current = gsap.quickTo(el, "x", { duration: 0.4, ease: "power2.out" });
    ySetterRef.current = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotionRef.current) return;
      const el = ref.current;
      if (!el || !xSetterRef.current || !ySetterRef.current) return;

      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;

      xSetterRef.current(dx);
      ySetterRef.current(dy);
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    if (reducedMotionRef.current) return;
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
