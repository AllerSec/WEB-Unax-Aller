const AUTH_KEY = 'gymstats.auth.v1';
const LOCK_KEY = 'gymstats.auth.lock.v1';
const MAX_ATTEMPTS = 5;
const LOCK_MS = 60_000;

const expected = import.meta.env.VITE_APP_PASSWORD as string | undefined;

export const hasPassword = Boolean(expected && expected.length > 0);

async function hash(s: string): Promise<string> {
  const buf = new TextEncoder().encode(s);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function isAuthed(): boolean {
  if (!hasPassword) return true;
  try {
    return localStorage.getItem(AUTH_KEY) === '1';
  } catch {
    return false;
  }
}

export function logout() {
  try { localStorage.removeItem(AUTH_KEY); } catch { /* ignore */ }
}

export interface LockState {
  attempts: number;
  lockedUntil: number | null;
}

function readLock(): LockState {
  try {
    const raw = localStorage.getItem(LOCK_KEY);
    if (!raw) return { attempts: 0, lockedUntil: null };
    return JSON.parse(raw) as LockState;
  } catch {
    return { attempts: 0, lockedUntil: null };
  }
}

function writeLock(s: LockState) {
  try { localStorage.setItem(LOCK_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

export function getLockRemainingMs(): number {
  const s = readLock();
  if (!s.lockedUntil) return 0;
  return Math.max(0, s.lockedUntil - Date.now());
}

export async function tryLogin(input: string): Promise<{ ok: boolean; lockedMs?: number; attemptsLeft?: number }> {
  if (!hasPassword) return { ok: true };

  const lockMs = getLockRemainingMs();
  if (lockMs > 0) return { ok: false, lockedMs: lockMs };

  const [a, b] = await Promise.all([hash(input), hash(expected!)]);
  if (a === b) {
    writeLock({ attempts: 0, lockedUntil: null });
    try { localStorage.setItem(AUTH_KEY, '1'); } catch { /* ignore */ }
    return { ok: true };
  }

  const state = readLock();
  const attempts = state.attempts + 1;
  if (attempts >= MAX_ATTEMPTS) {
    writeLock({ attempts: 0, lockedUntil: Date.now() + LOCK_MS });
    return { ok: false, lockedMs: LOCK_MS };
  }
  writeLock({ attempts, lockedUntil: null });
  return { ok: false, attemptsLeft: MAX_ATTEMPTS - attempts };
}
