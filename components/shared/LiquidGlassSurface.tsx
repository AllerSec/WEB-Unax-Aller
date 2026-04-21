import type { ReactNode, CSSProperties } from "react";

type Variant = "light" | "dark";

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span";
};

export default function LiquidGlassSurface({
  children,
  variant = "light",
  className = "",
  style,
  as: Tag = "div",
}: Props) {
  const variantClass = variant === "dark" ? "liquid-glass-dark" : "liquid-glass";
  return (
    <Tag className={`${variantClass} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
