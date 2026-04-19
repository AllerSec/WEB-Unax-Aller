import { useEffect, useState } from 'react';
import { hapticTick } from '../lib/haptics';

interface Props {
  value: number | null;
  onChange: (v: number | null) => void;
  onBlurSyncForward?: (v: number) => void;
  accent: string;
}

export function WeightInput({ value, onChange, onBlurSyncForward, accent }: Props) {
  const [text, setText] = useState<string>(value != null ? String(value) : '');

  useEffect(() => {
    setText(value != null ? String(value) : '');
  }, [value]);

  function commit(raw: string) {
    if (raw === '' || raw === '-') { onChange(null); return; }
    const n = Number(raw.replace(',', '.'));
    if (Number.isFinite(n)) onChange(n);
  }

  function step(delta: number) {
    hapticTick();
    const base = value ?? 0;
    const next = Math.max(0, Math.round((base + delta) * 4) / 4);
    onChange(next);
    if (onBlurSyncForward) onBlurSyncForward(next);
  }

  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        onClick={() => step(-2.5)}
        className="w-12 rounded-xl2 bg-surface-container border border-ink-line text-xl text-primary-tint hover:border-primary-tint hover:bg-surface-container-high active:scale-95 transition"
        style={{ borderRadius: 14 }}
        aria-label="Bajar peso"
      >−</button>
      <div className="flex-1 relative">
        <input
          inputMode="decimal"
          type="text"
          value={text}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^0-9.,]/g, '');
            setText(cleaned);
            commit(cleaned);
          }}
          onFocus={(e) => e.target.select()}
          onBlur={() => { if (value != null && onBlurSyncForward) onBlurSyncForward(value); }}
          placeholder="0"
          className="input-base w-full h-full font-serif text-3xl font-light text-center"
          style={{ caretColor: accent }}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-ink-outline font-semibold uppercase tracking-[0.2em] pointer-events-none">kg</span>
      </div>
      <button
        type="button"
        onClick={() => step(2.5)}
        className="w-12 rounded-xl2 bg-surface-container border border-ink-line text-xl text-primary-tint hover:border-primary-tint hover:bg-surface-container-high active:scale-95 transition"
        style={{ borderRadius: 14 }}
        aria-label="Subir peso"
      >+</button>
    </div>
  );
}
