import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ open, title, body, confirmLabel, cancelLabel, danger, onConfirm, onCancel }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    if (backdropRef.current) {
      gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
    }
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.94, y: 16, autoAlpha: 0 },
        { scale: 1, y: 0, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.4)' },
      );
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: 'rgba(6, 27, 14, 0.4)', backdropFilter: 'blur(8px)' }}
      onClick={onCancel}
    >
      <div
        ref={cardRef}
        className="w-full max-w-sm card p-6"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 24px 60px rgba(6, 27, 14, 0.2)' }}
      >
        <h3 className="h-display text-2xl">{title}</h3>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">{body}</p>
        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <button onClick={onCancel} className="btn-ghost py-3 text-sm">{cancelLabel}</button>
          <button
            onClick={onConfirm}
            className={danger ? 'btn-danger py-3 text-sm font-semibold' : 'btn-primary py-3 text-sm'}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
