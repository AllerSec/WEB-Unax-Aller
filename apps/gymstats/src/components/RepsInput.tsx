import { useEffect, useState } from 'react';
import { hapticTick } from '../lib/haptics';

interface Props {
  value: number | null;
  target: [number, number];
  onChange: (v: number | null) => void;
  accent: string;
}

export function RepsInput({ value, target, onChange, accent }: Props) {
  const [text, setText] = useState<string>(value != null ? String(value) : '');

  useEffect(() => {
    setText(value != null ? String(value) : '');
  }, [value]);

  function commit(raw: string) {
    if (raw === '') { onChange(null); return; }
    const n = parseInt(raw, 10);
    if (Number.isFinite(n)) onChange(n);
  }

  function step(delta: number) {
    hapticTick();
    const base = value ?? target[0];
    const next = Math.max(0, base + delta);
    onChange(next);
  }

  const statusColor =
    value == null
      ? 'var(--primary)'
      : value >= target[1]
        ? 'var(--surface-tint)'
        : value >= target[0]
          ? 'var(--primary)'
          : '#a06a2c';

  return (
    <div className="flex items-stretch gap-2" style={{ minHeight: 56 }}>
      <button
        type="button"
        onClick={() => step(-1)}
        className="w-14 sm:w-12 rounded-xl2 bg-surface-container border border-ink-line text-2xl text-primary-tint hover:border-primary-tint hover:bg-surface-container-high active:scale-95 transition select-none"
        style={{ borderRadius: 14, minHeight: 56, touchAction: 'manipulation' }}
        aria-label="Menos reps"
      >−</button>
      <div className="flex-1 relative">
        <input
          inputMode="numeric"
          type="text"
          enterKeyHint="done"
          value={text}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^0-9]/g, '');
            setText(cleaned);
            commit(cleaned);
          }}
          onFocus={(e) => e.target.select()}
          placeholder={`${target[0]}–${target[1]}`}
          className="input-base w-full h-full font-serif text-3xl font-light text-center"
          style={{ caretColor: accent, color: statusColor, minHeight: 56 }}
        />
      </div>
      <button
        type="button"
        onClick={() => step(1)}
        className="w-14 sm:w-12 rounded-xl2 bg-surface-container border border-ink-line text-2xl text-primary-tint hover:border-primary-tint hover:bg-surface-container-high active:scale-95 transition select-none"
        style={{ borderRadius: 14, minHeight: 56, touchAction: 'manipulation' }}
        aria-label="Más reps"
      >+</button>
    </div>
  );
}
