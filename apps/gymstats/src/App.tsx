import { useEffect, useState } from 'react';
import type { DayType, Workout } from './types';
import { listWorkouts, syncPending } from './lib/storage';
import { isAuthed, logout as doLogout } from './lib/auth';
import { Home } from './screens/Home';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CustomCursor } from './components/shared/CustomCursor';

type View =
  | { kind: 'home' }
  | { kind: 'workout'; day: DayType }
  | { kind: 'summary'; workout: Workout }
  | { kind: 'history' };

export default function App() {
  const [authed, setAuthed] = useState(isAuthed());
  const [view, setView] = useState<View>({ kind: 'home' });
  const [history, setHistory] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const all = await listWorkouts();
    setHistory(all);
    setLoading(false);
  }

  useEffect(() => {
    if (!authed) return;
    refresh();
    syncPending().then((n) => { if (n > 0) refresh(); });
    const onOnline = () => { syncPending().then((n) => { if (n > 0) refresh(); }); };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-full flex flex-col">
        <CustomCursor />
        <LoginScreen onAuthed={() => setAuthed(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col">
      <CustomCursor />
      {view.kind === 'home' && (
        <Home
          history={history}
          loading={loading}
          onStart={(day) => setView({ kind: 'workout', day })}
          onHistory={() => setView({ kind: 'history' })}
          onLogout={() => { doLogout(); setAuthed(false); }}
        />
      )}

      {view.kind === 'workout' && (
        <WorkoutScreen
          dayType={view.day}
          history={history}
          onFinish={async (w) => {
            await refresh();
            setView({ kind: 'summary', workout: w });
          }}
          onExit={() => setView({ kind: 'home' })}
        />
      )}

      {view.kind === 'summary' && (
        <SummaryScreen
          workout={view.workout}
          history={history}
          onDone={() => setView({ kind: 'home' })}
        />
      )}

      {view.kind === 'history' && (
        <HistoryScreen
          history={history}
          onBack={() => setView({ kind: 'home' })}
          onRefresh={refresh}
        />
      )}
    </div>
  );
}
