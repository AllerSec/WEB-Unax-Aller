import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-[var(--color-line-strong)] bg-transparent hover:bg-[rgba(180,205,184,0.06)] text-[var(--color-ink)]",
  secondary: "bg-[var(--color-bg-alt)] text-[var(--color-ink)] hover:bg-[var(--color-bg-muted)]",
  ghost: "hover:bg-[rgba(180,205,184,0.06)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
  link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild: _asChild, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
