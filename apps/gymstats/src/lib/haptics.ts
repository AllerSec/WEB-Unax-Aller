export function haptic(pattern: number | number[] = 15) {
  try {
    if ('vibrate' in navigator) navigator.vibrate(pattern);
  } catch {
    // ignore
  }
}

export function hapticSuccess() { haptic([12, 40, 18]); }
export function hapticFail() { haptic([30, 50, 30]); }
export function hapticTick() { haptic(8); }
