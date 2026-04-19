interface Props {
  src: string;
  alt: string;
  accent: string;
  size?: number;
  className?: string;
}

export function ExerciseImage({ src, alt, accent, size = 96, className = '' }: Props) {
  return (
    <div
      className={`shrink-0 rounded-2xl overflow-hidden border flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${accent}12 0%, ${accent}04 100%)`,
        borderColor: `${accent}30`,
      }}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
