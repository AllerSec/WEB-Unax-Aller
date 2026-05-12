"use client";

interface UrgencyBadgeProps {
  text: string;
  className?: string;
}

export default function UrgencyBadge({ text, className = "" }: UrgencyBadgeProps) {
  return (
    <div className={`urgency-badge ${className}`} aria-live="polite">
      <span className="urgency-badge-dot" aria-hidden="true" />
      {text}
    </div>
  );
}
