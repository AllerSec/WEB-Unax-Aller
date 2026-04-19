# GymStats

App web para registrar cada serie de cada ejercicio. Pensada para usar en el móvil durante el entrenamiento, con vista de progreso en ordenador.

Stack: Vite + React + TypeScript + Tailwind + GSAP + Supabase + Recharts, desplegado como PWA.

## Funcionalidades

- 4 rutinas: Push, Pull, Pierna, Hombro con los ejercicios y rangos de reps ya cargados.
- Flujo ejercicio → serie con peso recomendado basado en progresión doble (hipertrofia).
- Marcar completada/fallada con un toque, temporizador de descanso automático.
- Pantalla siempre encendida durante el entreno (wake lock).
- Guarda todo en Supabase (sincroniza entre dispositivos) con fallback a localStorage si no hay internet.
- Detecta semana ISO y muestra adherencia semanal.
- Resumen post-entreno con score 0-100, qué hiciste bien y qué mejorar.
- Historial con gráfica de volumen semanal y evolución de peso por ejercicio.
- Instalable como PWA (icono en escritorio del móvil).
- Terminar el entreno antes de tiempo sin perder nada.

## Puesta en marcha

### 1. Instala dependencias

```bash
npm install
```

### 2. Crea el proyecto de Supabase (una sola vez, ~2 minutos)

1. Entra a <https://supabase.com> → **New project** (gratis).
2. En **SQL editor**, pega el contenido de `supabase/schema.sql` y ejecuta.
3. En **Project Settings → API** copia:
   - **Project URL** (ej. `https://xxx.supabase.co`)
   - **anon public** key

### 3. Crea `.env.local` en la raíz

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=la-clave-anon-publica
VITE_APP_PASSWORD=la-contrasena-que-quieras
```

> La clave anon es pública y puede ir en el cliente. La política RLS del esquema permite lectura/escritura anónima — la protección es que la URL de tu app (`unaxaller.com/gymstats`) solo la conoces tú.
>
> `VITE_APP_PASSWORD` es la contraseña que pide la app al entrar. Se guarda un token en el navegador tras acertar, así que solo la introduces una vez por dispositivo. Hay bloqueo de 1 minuto tras 5 intentos fallidos. Si no defines la variable, la app funciona sin contraseña.

### 4. Desarrollo local

```bash
npm run dev
```

Abre <http://localhost:5173/gymstats/>

### 5. Build

```bash
npm run build
```

Genera `dist/`.

## Despliegue en Netlify bajo `unaxaller.com/gymstats`

**Opción A — Repo independiente:**

1. Sube este proyecto a un repo en GitHub.
2. En Netlify → **Add new site → Import from GitHub** → selecciona el repo.
3. Build command: `npm run build`, publish directory: `dist`.
4. En **Site settings → Environment variables** añade:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_PASSWORD`
5. Para servir en `unaxaller.com/gymstats`:
   - Si tu web principal `unaxaller.com` está en otro sitio de Netlify: usa **proxy redirects** desde allí (`/gymstats/* https://gymstats.netlify.app/gymstats/:splat 200`) o muévela al mismo sitio.
   - Si `unaxaller.com` apunta a este mismo proyecto, el `base: '/gymstats/'` de `vite.config.ts` y el `netlify.toml` ya gestionan las rutas.

**Opción B — Monorepo con tu web principal:**

1. Copia `dist/` dentro de tu web principal en `/gymstats/` y sube.

## Estructura

```
src/
  App.tsx                 # Router por estado
  screens/
    Home.tsx              # Selector de día + historial reciente
    WorkoutScreen.tsx     # Entrenamiento activo
    SummaryScreen.tsx     # Puntuación + feedback
    HistoryScreen.tsx     # Historial + gráficas
  components/
    WeightInput.tsx       # Input de peso con +/-
    RepsInput.tsx         # Input de repeticiones
    RestTimer.tsx         # Timer flotante entre series
    ConfirmModal.tsx
  lib/
    supabase.ts           # Cliente
    storage.ts            # Persistencia (Supabase + localStorage)
    progression.ts        # Motor de recomendación + score
    date.ts               # ISO week + formatters
    wakeLock.ts           # Pantalla siempre encendida
    haptics.ts            # Vibración
  data/
    routines.ts           # Las 4 rutinas con ejercicios y rangos
supabase/
  schema.sql              # Ejecutar una vez
public/
  icon-192.png, icon-512.png, favicon.svg, _redirects
```

## Personalizar rutinas

Edita `src/data/routines.ts`. Cada ejercicio tiene:

- `sets`: número de series
- `repRange`: `[min, max]` → progresión doble sube peso cuando pegas todas las series en el máximo
- `restSec`: descanso recomendado
- `category`: ajusta el salto de peso (compuestos +2.5kg, aislados de brazo +1.25kg, laterales +1kg)

## Cómo funciona la recomendación de peso

- **Primera vez en un ejercicio:** tú decides el peso inicial. A partir de ahí se guarda.
- **Todas las series completadas en el tope del rango (ej. todas a 10 reps si rango 8-10):** sube el peso el próximo día.
- **Completadas pero sin llegar al tope:** mantiene peso. Primero se ganan reps, después se sube.
- **Alguna fallada:** mantiene peso.
- **Dos sesiones seguidas con fallos:** baja 5% (descarga).

## Atajos durante el entreno

- Botones `+/-` al lado del peso ajustan en saltos de 2.5kg.
- El peso que pones en la serie 1 se propaga automáticamente a las series pendientes del mismo ejercicio.
- Toca una pestaña de ejercicio arriba para saltar a otro (no pierde datos).
- "Saltar ejercicio" lo marca como no hecho (cuenta en la puntuación).
- "Terminar entrenamiento" guarda lo hecho aunque falten series.
