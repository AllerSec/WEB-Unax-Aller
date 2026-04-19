/**
 * Mantiene la pantalla encendida durante el entrenamiento.
 * Solo disponible en contextos HTTPS / PWA instalada.
 */
let sentinel: { release: () => Promise<void> } | null = null;

export async function requestWakeLock(): Promise<boolean> {
  try {
    const nav = navigator as Navigator & { wakeLock?: { request: (type: string) => Promise<{ release: () => Promise<void> }> } };
    if (!nav.wakeLock) return false;
    sentinel = await nav.wakeLock.request('screen');
    return true;
  } catch {
    return false;
  }
}

export async function releaseWakeLock(): Promise<void> {
  try {
    await sentinel?.release();
  } catch {
    // ignore
  }
  sentinel = null;
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && sentinel === null) {
      requestWakeLock();
    }
  });
}
