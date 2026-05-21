# Marketing Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reestructuracion completa con estrategia de marketing solida: copy orientado a resultado, funnel de conversion optimizado, prueba social con clientes reales, proceso visual de contratacion, comparacion Agencia vs Unax y contexto de marketing documentado.

**Architecture:** Mantener arquitectura Next.js/i18n existente. Cambios en `lib/i18n/` (copy), `app/[lang]/` (secciones), `components/` (nuevos componentes), `app/globals.css` (estilos). Cero cambios arquitectonicos.

**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP, next-intl, Tailwind CSS v4

---

## Marketing Strategy Rationale

Problemas de conversion identificados tras el audit:

1. **Hero vago** — "experiencias digitales sofisticadas" es lenguaje de agencia. El cliente quiere saber: cuanto, cuanto tarda, que gana.
2. **Social proof llega tarde** — actualmente aparece despues de Pricing. Moverla arriba valida el hero inmediatamente.
3. **Sin proceso visible** — el visitante no sabe que pasa cuando contacta. Eso genera friccion.
4. **Testimonios sin empresa visible** — solo texto, poco peso de prueba social.
5. **Sin comparativa de precio** — el visitante no sabe si 1.500 EUR es caro o barato en contexto.
6. **Credenciales de Unax ocultas** — Francia, Erasmus, EEUU se mencionan en bio pero no tienen peso visual.
7. **Contacto sin reduccion de friccion** — el formulario aparece sin explicar que pasa despues.

---

## File Map

| Archivo | Cambio |
|---------|--------|
| `lib/i18n/es.ts` | hero reescrito, socialProof copy nuevo, nueva clave homeProcess |
| `lib/i18n/en.ts` | mismas claves en ingles |
| `lib/i18n/eu.ts` | mismas claves en euskera |
| `app/[lang]/page.tsx` | reordenar secciones + importar ProcessStrip |
| `components/home/Hero.tsx` | importar UrgencyBadge, usar t("availability") |
| `components/shared/UrgencyBadge.tsx` | NUEVO — badge con punto verde pulsante |
| `components/home/ProcessStrip.tsx` | NUEVO — 4 pasos de contratacion con GSAP |
| `components/home/SocialProof.tsx` | anadir chips de clientes reales |
| `app/[lang]/servicios/page.tsx` | anadir tabla Agencia vs Unax antes del FAQ |
| `app/[lang]/sobre-nosotros/page.tsx` | anadir timeline de experiencia |
| `app/[lang]/precios/page.tsx` | anadir comparativa de mercado |
| `app/[lang]/contacto/page.tsx` | anadir "que pasa cuando contactas" antes del form |
| `app/globals.css` | estilos de todos los nuevos componentes |
| `.agents/product-marketing-context.md` | NUEVO — contexto de marketing para futuras skills |

---

## Task 1: Reescribir copy del Hero

**Files:**
- Modify: `lib/i18n/es.ts`
- Modify: `lib/i18n/en.ts`
- Modify: `lib/i18n/eu.ts`

El hero actual habla de "experiencias digitales sofisticadas" — lenguaje de agencia. El nuevo copy habla del resultado concreto: web lista en 2 semanas, aparece en Google, convierte visitas en llamadas.

- [ ] **Step 1: Reemplazar bloque `hero:` en lib/i18n/es.ts**

```typescript
hero: {
  title: "Tu web nueva, lista en 2 semanas. Desde Irun, para todo el mundo.",
  subtitle:
    "Webs a medida que aparecen en Google, cargan en menos de 1 segundo y convierten visitas en llamadas. Sin agencias, sin intermediarios.",
  subtitlePre:
    "Webs a medida que aparecen en Google, cargan en menos de 1 segundo y convierten visitas en llamadas. Desde",
  subtitlePost: ", IVA incluido.",
  cta: "Quiero mi web — consulta gratis",
  cta2: "Ver proyectos reales",
  badge: "Disenador web · Irun, Pais Vasco",
  scrollHint: "Ver como funciona",
  availability: "Acepto proyectos en junio 2026",
},
```

- [ ] **Step 2: Reemplazar bloque `hero:` en lib/i18n/en.ts**

```typescript
hero: {
  title: "Your new website, live in 2 weeks. From Irun, for everyone.",
  subtitle:
    "Custom websites that rank on Google, load under 1 second and turn visits into calls. No agencies, no middlemen.",
  subtitlePre:
    "Custom websites that rank on Google, load under 1 second and turn visits into calls. From",
  subtitlePost: ", VAT included.",
  cta: "I want my website — free consultation",
  cta2: "See real projects",
  badge: "Web designer · Irun, Basque Country",
  scrollHint: "See how it works",
  availability: "Taking projects in June 2026",
},
```

- [ ] **Step 3: Reemplazar bloque `hero:` en lib/i18n/eu.ts**

```typescript
hero: {
  title: "Zure webgune berria, 2 astetan prest. Irunetik, mundu osoarentzat.",
  subtitle:
    "Neurrira egindako webguneak Google-n agertzen direnak, segundo batean kargatu eta bisitaldiak deialdietan bihurtzen dituztenak. Agentziarik gabe, bitartekaririk gabe.",
  subtitlePre:
    "Neurrira egindako webguneak Google-n agertzen direnak, segundo batean kargatu eta bisitaldiak deialdietan bihurtzen dituztenak. ",
  subtitlePost: "-tik, BEZ barne.",
  cta: "Nahi dut nire weba — kontsulta doan",
  cta2: "Ikusi benetako proiektuak",
  badge: "Web diseinatzailea · Irun, Euskal Herria",
  scrollHint: "Ikusi nola funtzionatzen duen",
  availability: "2026ko ekainean proiektuak onartzen",
},
```

- [ ] **Step 4: Verificar compilacion**

```bash
npm run dev
```

Abrir http://localhost:3000/es — confirmar hero sin errores de consola.

- [ ] **Step 5: Commit**

```bash
git add lib/i18n/es.ts lib/i18n/en.ts lib/i18n/eu.ts
git commit -m "copy(hero): headline orientado a resultado + CTA con urgencia + badge disponibilidad"
```

---

## Task 2: UrgencyBadge — disponibilidad con punto pulsante

**Files:**
- Create: `components/shared/UrgencyBadge.tsx`
- Modify: `components/home/Hero.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Crear components/shared/UrgencyBadge.tsx**

```tsx
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
```

- [ ] **Step 2: Anadir estilos al final de app/globals.css**

```css
/* === Urgency Badge === */
.urgency-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-success);
  letter-spacing: 0.02em;
}
.urgency-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-success);
  animation: urgency-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes urgency-pulse {
  0%, 100% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-success) 20%, transparent); }
  50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-success) 5%, transparent); }
}
```

- [ ] **Step 3: Anadir import y uso en components/home/Hero.tsx**

Anadir import al inicio del archivo:
```tsx
import UrgencyBadge from "@/components/shared/UrgencyBadge";
```

Dentro del JSX del Hero, justo despues del elemento `.hero-badge` existente:
```tsx
<UrgencyBadge text={t("availability")} className="hero-availability" />
```

- [ ] **Step 4: Verificar en http://localhost:3000/es**

Punto verde pulsante con "Acepto proyectos en junio 2026" visible en el hero.

- [ ] **Step 5: Commit**

```bash
git add components/shared/UrgencyBadge.tsx components/home/Hero.tsx app/globals.css
git commit -m "feat(hero): UrgencyBadge con disponibilidad y animacion pulse"
```

---

## Task 3: ProcessStrip — cómo funciona contratar

**Files:**
- Create: `components/home/ProcessStrip.tsx`
- Modify: `lib/i18n/es.ts`, `lib/i18n/en.ts`, `lib/i18n/eu.ts`
- Modify: `app/[lang]/page.tsx`
- Modify: `app/globals.css`

El visitante necesita saber que pasa cuando contacta. 4 pasos visuales entre Founder y Proyectos reducen la friccion de conversion.

- [ ] **Step 1: Anadir clave `homeProcess` en lib/i18n/es.ts** (insertar despues del bloque `services:`)

```typescript
homeProcess: {
  eyebrow: "Asi de sencillo",
  title: "De cero a live en 4 pasos.",
  steps: [
    { number: "01", title: "Hablamos", desc: "Me cuentas que necesitas en 30 minutos. Sin compromiso, sin formularios largos." },
    { number: "02", title: "Presupuesto en 24h", desc: "Te mando el precio cerrado al dia siguiente. Sin rangos, sin sorpresas." },
    { number: "03", title: "Diseno y codigo", desc: "Programo tu web a mano. Te enseno avances y ajustamos hasta que cuadra." },
    { number: "04", title: "Tu web esta viva", desc: "Lanzamos, configuramos Google y Analytics. Estoy aqui si aparece cualquier cosa." },
  ],
  cta: "Empezar con una llamada gratis",
},
```

- [ ] **Step 2: Anadir `homeProcess` en lib/i18n/en.ts** (mismo lugar)

```typescript
homeProcess: {
  eyebrow: "That simple",
  title: "From zero to live in 4 steps.",
  steps: [
    { number: "01", title: "We talk", desc: "You tell me what you need in 30 minutes. No commitment, no long forms." },
    { number: "02", title: "Quote in 24h", desc: "I send you the fixed price the next day. No ranges, no surprises." },
    { number: "03", title: "Design and code", desc: "I build your site by hand. I show you progress and we adjust until it fits." },
    { number: "04", title: "Your site is live", desc: "We launch, set up Google and Analytics. I'm here if anything comes up." },
  ],
  cta: "Start with a free call",
},
```

- [ ] **Step 3: Anadir `homeProcess` en lib/i18n/eu.ts** (mismo lugar)

```typescript
homeProcess: {
  eyebrow: "Hain sinplea",
  title: "Hutsetik bizira 4 urratsetan.",
  steps: [
    { number: "01", title: "Hitz egiten dugu", desc: "30 minututan zer behar duzun esaten didazu. Konpromiso gabe, inprimaki luzerik gabe." },
    { number: "02", title: "Aurrekontua 24 ordutan", desc: "Hurrengo egunean prezio itxia bidaltzen dizut. Tarterik gabe, ezustekorik gabe." },
    { number: "03", title: "Diseinua eta kodea", desc: "Zure weba eskuz eraikitzen dut. Aurrerapena erakusten dizut eta egokitu arte aldatzen dugu." },
    { number: "04", title: "Zure weba bizirik dago", desc: "Abiarazten dugu, Google eta Analytics konfiguratzen ditugu. Zerbait agertzen bada hemen nago." },
  ],
  cta: "Hasi dei doan batekin",
},
```

- [ ] **Step 4: Crear components/home/ProcessStrip.tsx**

```tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/lib/i18n/config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { locale: Locale };

export default function ProcessStrip({ locale }: Props) {
  const t = useTranslations("homeProcess");
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    { number: t("steps.0.number"), title: t("steps.0.title"), desc: t("steps.0.desc") },
    { number: t("steps.1.number"), title: t("steps.1.title"), desc: t("steps.1.desc") },
    { number: t("steps.2.number"), title: t("steps.2.title"), desc: t("steps.2.desc") },
    { number: t("steps.3.number"), title: t("steps.3.title"), desc: t("steps.3.desc") },
  ];

  useGSAP(
    () => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>("[data-process-step]");
      if (!items?.length) return;
      const triggers = ScrollTrigger.batch(items, {
        interval: 0.1,
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
          });
        },
      });
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="process-strip" aria-labelledby="process-strip-title">
      <div className="container-xl">
        <div className="process-strip-header">
          <span className="process-strip-eyebrow">{t("eyebrow")}</span>
          <h2 id="process-strip-title" className="process-strip-title">{t("title")}</h2>
        </div>
        <div className="process-strip-steps">
          {steps.map((step) => (
            <div
              key={step.number}
              data-process-step
              className="process-strip-step"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              <span className="process-strip-step-number" aria-hidden="true">{step.number}</span>
              <h3 className="process-strip-step-title">{step.title}</h3>
              <p className="process-strip-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="process-strip-cta">
          <Link href={`/${locale}/contacto`} className="btn btn-primary focusable">
            {t("cta")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Anadir estilos en app/globals.css** (al final del archivo)

```css
/* === Process Strip (Home) === */
.process-strip { padding-block: var(--space-20); background: var(--color-surface); }
.process-strip-header { text-align: center; margin-bottom: var(--space-12); }
.process-strip-eyebrow { display: block; font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-accent); margin-bottom: var(--space-2); }
.process-strip-title { font-family: var(--font-serif); font-size: clamp(1.75rem, 3vw, 2.5rem); color: var(--color-ink); line-height: 1.2; }
.process-strip-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-8); margin-bottom: var(--space-12); }
@media (max-width: 768px) { .process-strip-steps { grid-template-columns: 1fr 1fr; gap: var(--space-6); } }
@media (max-width: 480px) { .process-strip-steps { grid-template-columns: 1fr; } }
.process-strip-step { display: flex; flex-direction: column; gap: var(--space-2); }
.process-strip-step-number { font-family: var(--font-serif); font-size: 2.5rem; font-weight: 700; color: color-mix(in srgb, var(--color-accent) 25%, transparent); line-height: 1; margin-bottom: var(--space-1); }
.process-strip-step-title { font-family: var(--font-sans); font-size: 1rem; font-weight: 600; color: var(--color-ink); }
.process-strip-step-desc { font-family: var(--font-sans); font-size: 0.875rem; color: var(--color-ink-muted); line-height: 1.6; }
.process-strip-cta { text-align: center; }
```

- [ ] **Step 6: Integrar en app/[lang]/page.tsx**

Anadir import:
```tsx
import ProcessStrip from "@/components/home/ProcessStrip";
```

Insertar entre la seccion founder-strip y ProjectsBoard:
```tsx
{/* Process — como funciona contratar, reduce friccion */}
<ProcessStrip locale={locale} />
```

- [ ] **Step 7: Verificar en http://localhost:3000/es**

4 pasos animados entre el Founder y los Proyectos.

- [ ] **Step 8: Commit**

```bash
git add components/home/ProcessStrip.tsx app/globals.css lib/i18n/es.ts lib/i18n/en.ts lib/i18n/eu.ts "app/[lang]/page.tsx"
git commit -m "feat(home): ProcessStrip — 4 pasos de contratacion con animacion GSAP"
```

---

## Task 4: SocialProof con chips de clientes reales

**Files:**
- Modify: `components/home/SocialProof.tsx`
- Modify: `lib/i18n/es.ts`, `lib/i18n/en.ts`, `lib/i18n/eu.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Actualizar bloque `socialProof:` en lib/i18n/es.ts**

```typescript
socialProof: {
  title: "Negocios reales que ya tienen su web",
  subtitle: "Desde farmacias en Navarra hasta agencias de IA en Gipuzkoa. Cada proyecto, hecho a mano.",
  stat1: { value: "14+", label: "Proyectos entregados" },
  stat2: { value: "100%", label: "Clientes satisfechos" },
  stat3: { value: "2", label: "Semanas de entrega media" },
  stat4: { value: "5★", label: "Valoracion en Google" },
  clientsLabel: "Han confiado en mi",
},
```

- [ ] **Step 2: Actualizar bloque `socialProof:` en lib/i18n/en.ts**

```typescript
socialProof: {
  title: "Real businesses that already have their website",
  subtitle: "From pharmacies in Navarra to AI agencies in Gipuzkoa. Every project, built by hand.",
  stat1: { value: "14+", label: "Projects delivered" },
  stat2: { value: "100%", label: "Satisfied clients" },
  stat3: { value: "2", label: "Weeks average delivery" },
  stat4: { value: "5★", label: "Google rating" },
  clientsLabel: "They trusted me",
},
```

- [ ] **Step 3: Actualizar bloque `socialProof:` en lib/i18n/eu.ts**

```typescript
socialProof: {
  title: "Benetako negozioak dagoeneko beren weba dutenak",
  subtitle: "Nafarroako farmazietatik Gipuzkoako IA agentziara. Proiektu bakoitza, eskuz egina.",
  stat1: { value: "14+", label: "Entregatutako proiektuak" },
  stat2: { value: "100%", label: "Bezero poztuak" },
  stat3: { value: "2", label: "Batez besteko entrega asteak" },
  stat4: { value: "5★", label: "Google balorazioa" },
  clientsLabel: "Konfiantza eman didatenak",
},
```

- [ ] **Step 4: Modificar components/home/SocialProof.tsx**

Antes del `return`, anadir el array de clientes:
```tsx
const clients = [
  { name: "Farmacia Fernandez Bera", url: "https://farmaciafernandezbera.com", sector: "Farmacia · Bera" },
  { name: "Motos Arretxe", url: "https://motosarretxe.com", sector: "Motos · Hondarribia" },
  { name: "Anaka Optica", url: "https://anakaoptica.com", sector: "Optica · Irun" },
  { name: "VirtuoSolve", url: "https://virtuosolve.com", sector: "IA · Irun" },
];
```

Dentro del JSX, despues de `.stats-grid`:
```tsx
<div className="social-proof-clients">
  <p className="social-proof-clients-label">{t("clientsLabel")}</p>
  <div className="social-proof-clients-row">
    {clients.map((client) => (
      <a
        key={client.name}
        href={client.url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-proof-client-chip focusable"
        aria-label={`${client.name} — ${client.sector}`}
      >
        <span className="social-proof-client-name">{client.name}</span>
        <span className="social-proof-client-sector">{client.sector}</span>
      </a>
    ))}
  </div>
</div>
```

- [ ] **Step 5: Anadir estilos en app/globals.css**

```css
/* === Social Proof Client Chips === */
.social-proof-clients { margin-top: var(--space-12); text-align: center; }
.social-proof-clients-label { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-ink-muted); margin-bottom: var(--space-4); }
.social-proof-clients-row { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-3); }
.social-proof-client-chip { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: var(--space-2) var(--space-4); border: 1px solid color-mix(in srgb, var(--color-ink) 12%, transparent); border-radius: var(--radius-md); text-decoration: none; transition: border-color 0.2s ease, background 0.2s ease; }
.social-proof-client-chip:hover { border-color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 5%, transparent); }
.social-proof-client-name { font-family: var(--font-sans); font-size: 0.875rem; font-weight: 600; color: var(--color-ink); }
.social-proof-client-sector { font-family: var(--font-sans); font-size: 0.7rem; color: var(--color-ink-muted); }
```

- [ ] **Step 6: Verificar en http://localhost:3000/es**

4 chips de clientes debajo de las estadisticas con hover verde.

- [ ] **Step 7: Commit**

```bash
git add components/home/SocialProof.tsx app/globals.css lib/i18n/es.ts lib/i18n/en.ts lib/i18n/eu.ts
git commit -m "feat(social-proof): client chips con empresas reales + copy especifico"
```

---

## Task 5: Reordenar secciones de la home

**Files:**
- Modify: `app/[lang]/page.tsx`

Orden actual: Hero → Founder → Projects → Pricing → SocialProof → Services → Testimonials → CTA

Orden optimo por conversion: Hero → SocialProof → Founder → Process → Services → Projects → Pricing → Testimonials → CTA

Razon: SocialProof inmediatamente despues del Hero valida la propuesta antes de que el visitante dude. Services antes de Projects da contexto de lo que hace antes de mostrar el portfolio.

- [ ] **Step 1: Reordenar secciones en app/[lang]/page.tsx**

El nuevo orden de secciones (manteniendo el contenido de cada una sin cambios):

```
<Hero locale={locale} />
<SectionDivider background="var(--color-bg)" />
<SocialProof />
[founder-strip — sin cambios en el contenido]
<ProcessStrip locale={locale} />
<ServicesGrid locale={locale} />
<AnimatedSection><ProjectsBoard locale={locale} /></AnimatedSection>
<div className="surface-alt"><PricingCards locale={locale} headingLevel="h2" /></div>
<SectionDivider background="var(--color-bg)" />
<Testimonials />
[Bottom CTA strip — sin cambios]
```

- [ ] **Step 2: Verificar scroll completo en http://localhost:3000/es**

Confirmar orden correcto sin errores de consola.

- [ ] **Step 3: Commit**

```bash
git add "app/[lang]/page.tsx"
git commit -m "feat(home): reordenar funnel — social proof arriba, services antes de projects"
```

---

## Task 6: Tabla comparativa Agencia vs Unax en /servicios

**Files:**
- Modify: `app/[lang]/servicios/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Anadir comparacion antes del comentario `{/* FAQ */}` en app/[lang]/servicios/page.tsx**

```tsx
{/* Comparacion Agencia vs Unax */}
<AnimatedSection className="comparison-section">
  <h2 className="section-heading">
    {locale === "es" ? "Por que no una agencia?" : locale === "en" ? "Why not an agency?" : "Zergatik ez agentzia bat?"}
  </h2>
  <div className="comparison-table">
    <div className="comparison-col comparison-col-agency">
      <h3 className="comparison-col-title">
        {locale === "es" ? "Agencia de diseno" : locale === "en" ? "Design agency" : "Diseinu agentzia"}
      </h3>
      <ul className="comparison-list">
        {(locale === "es" ? [
          "3.000 EUR a 15.000 EUR por un proyecto similar",
          "Gestor de cuentas que no conoce tu proyecto",
          "6 a 12 semanas de entrega minima",
          "Plantillas disfrazadas de diseno a medida",
          "Factura por cada pequeno cambio",
        ] : locale === "en" ? [
          "EUR 3,000 to EUR 15,000 for a similar project",
          "Account manager who does not know your project",
          "6 to 12 weeks minimum delivery",
          "Templates disguised as custom design",
          "Invoice for every small change",
        ] : [
          "3.000 EUR - 15.000 EUR antzeko proiektu baterako",
          "Zure proiektua ezagutzen ez duen kontu-kudeatzailea",
          "6-12 aste gutxieneko entrega",
          "Neurrirako diseinuaz mozorrotutako txantiloiak",
          "Faktura aldaketa txiki bakoitzeko",
        ]).map((item, i) => (
          <li key={i} className="comparison-item comparison-item-bad">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="comparison-col comparison-col-unax">
      <h3 className="comparison-col-title">
        Unax Aller
        <span className="comparison-badge">
          {locale === "es" ? "Recomendado" : locale === "en" ? "Recommended" : "Gomendatua"}
        </span>
      </h3>
      <ul className="comparison-list">
        {(locale === "es" ? [
          "1.500 EUR base, todo incluido",
          "Hablas directamente conmigo de principio a fin",
          "1 a 2 semanas de entrega real",
          "Diseno hecho a mano para tu negocio especifico",
          "Cambios menores incluidos en el mantenimiento",
        ] : locale === "en" ? [
          "EUR 1,500 base, everything included",
          "You talk directly to me from start to finish",
          "1 to 2 weeks real delivery",
          "Design made by hand for your specific business",
          "Minor changes included in maintenance",
        ] : [
          "1.500 EUR oinarrian, dena barne",
          "Hasieratik bukaerara nirekin zuzenean hitz egiten duzu",
          "1-2 aste benetako entrega",
          "Zure negozio espezifikorako eskuz egindako diseinua",
          "Aldaketa txikiak mantentze-lanean barne",
        ]).map((item, i) => (
          <li key={i} className="comparison-item comparison-item-good">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
</AnimatedSection>
```

- [ ] **Step 2: Anadir estilos en app/globals.css**

```css
/* === Comparison Table === */
.comparison-section { margin-block: var(--space-16); }
.comparison-table { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: var(--space-8); }
@media (max-width: 640px) { .comparison-table { grid-template-columns: 1fr; } }
.comparison-col { padding: var(--space-6); border-radius: var(--radius-md); }
.comparison-col-agency { background: color-mix(in srgb, var(--color-danger) 6%, transparent); border: 1px solid color-mix(in srgb, var(--color-danger) 20%, transparent); }
.comparison-col-unax { background: color-mix(in srgb, var(--color-success) 6%, transparent); border: 1px solid color-mix(in srgb, var(--color-success) 30%, transparent); }
.comparison-col-title { font-family: var(--font-sans); font-size: 1rem; font-weight: 700; color: var(--color-ink); margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-2); }
.comparison-badge { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: var(--color-success); color: var(--color-surface); padding: 2px 8px; border-radius: 100px; }
.comparison-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-2); }
.comparison-item { display: flex; align-items: flex-start; gap: var(--space-2); font-family: var(--font-sans); font-size: 0.875rem; line-height: 1.5; }
.comparison-item-bad { color: var(--color-ink-muted); }
.comparison-item-bad svg { color: var(--color-danger); flex-shrink: 0; margin-top: 3px; }
.comparison-item-good { color: var(--color-ink); }
.comparison-item-good svg { color: var(--color-success); flex-shrink: 0; margin-top: 3px; }
```

- [ ] **Step 3: Verificar en http://localhost:3000/es/servicios**

Tabla visible entre los service cards y el FAQ.

- [ ] **Step 4: Commit**

```bash
git add "app/[lang]/servicios/page.tsx" app/globals.css
git commit -m "feat(servicios): tabla comparativa Agencia vs Unax"
```

---

## Task 7: Timeline de experiencia en /sobre-nosotros

**Files:**
- Modify: `app/[lang]/sobre-nosotros/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Anadir seccion timeline despues de la seccion con `aria-label="Perfil personal"` en app/[lang]/sobre-nosotros/page.tsx**

```tsx
<section className="about-section" aria-labelledby="timeline-title">
  <div className="container-xl">
    <AnimatedSection className="about-section-header">
      <h2 id="timeline-title" className="section-heading">
        {locale === "es" ? "Experiencia que marca la diferencia" : locale === "en" ? "Experience that makes a difference" : "Aldea egiten duen esperientzia"}
      </h2>
    </AnimatedSection>
    <div className="timeline">
      {[
        {
          year: "2009-2020",
          title: locale === "es" ? "Educacion en Francia" : locale === "en" ? "Education in France" : "Hezkuntza Frantzian",
          desc: locale === "es"
            ? "Estudie toda mi vida en Francia hasta los 15 anos. Frances bilingue de verdad, no de academia. Eso se nota cuando hago webs para empresas que exportan."
            : locale === "en"
            ? "I studied my whole life in France until I was 15. Genuinely bilingual French, not from a class. That shows when I build websites for exporting companies."
            : "Nire bizitza osoa Frantzian ikasi nuen 15 urte bete arte. Frantses elebidun benetakoa. Hori nabaritzen da esportatzen duten enpresetarako webguneak egiten ditudanean.",
        },
        {
          year: "2022",
          title: "Erasmus",
          desc: locale === "es"
            ? "Programa de intercambio internacional. Adaptarse a entornos nuevos rapido y sin miedo."
            : locale === "en"
            ? "International exchange program. Adapting to new environments fast and without fear."
            : "Nazioarteko truke programa. Ingurune berrietara azkar eta beldurrik gabe egokitzea.",
        },
        {
          year: "2023",
          title: locale === "es" ? "Trabajo en EEUU" : locale === "en" ? "Work in the USA" : "Lana AEBetan",
          desc: locale === "es"
            ? "Experiencia profesional en Estados Unidos. Ingles profesional en contexto real, no de examen."
            : locale === "en"
            ? "Professional experience in the United States. Professional English in real context, not exam English."
            : "Esperientzia profesionala Estatu Batuetan. Ingelesa ingurune errealean landua, ez azterketa ingelesa.",
        },
        {
          year: "2024-",
          title: locale === "es" ? "Freelance en Irun" : locale === "en" ? "Freelance in Irun" : "Freelance Irunen",
          desc: locale === "es"
            ? "14+ proyectos entregados. Farmacia, motos, IA, optica. 5 estrellas en Google. Trabajando mientras estudio Ingenieria Informatica en la UAX."
            : locale === "en"
            ? "14+ projects delivered. Pharmacy, motorbikes, AI, optics. 5 stars on Google. Working while studying Computer Engineering at UAX."
            : "14+ proiektu entregatuak. Farmazia, motozikleta, IA, optika. 5 izar Google-n. UAX-en Informatika Ingeniaritza ikasten ari naizen bitartean lan egiten.",
        },
      ].map((item, i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div className="timeline-item">
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-content">
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Anadir estilos en app/globals.css**

```css
/* === Timeline (About) === */
.timeline { display: flex; flex-direction: column; padding-left: var(--space-4); border-left: 2px solid color-mix(in srgb, var(--color-accent) 30%, transparent); margin-top: var(--space-8); }
.timeline-item { display: grid; grid-template-columns: 120px 1fr; gap: var(--space-6); padding-bottom: var(--space-8); position: relative; }
.timeline-item::before { content: ""; position: absolute; left: calc(0px - var(--space-4) - 5px); top: 6px; width: 10px; height: 10px; border-radius: 50%; background: var(--color-accent); }
@media (max-width: 640px) { .timeline-item { grid-template-columns: 1fr; gap: var(--space-1); } }
.timeline-year { font-family: var(--font-serif); font-size: 0.875rem; font-weight: 600; color: var(--color-accent); padding-top: 4px; white-space: nowrap; }
.timeline-content { display: flex; flex-direction: column; gap: var(--space-1); }
.timeline-title { font-family: var(--font-sans); font-size: 1rem; font-weight: 600; color: var(--color-ink); }
.timeline-desc { font-family: var(--font-sans); font-size: 0.875rem; color: var(--color-ink-muted); line-height: 1.6; }
```

- [ ] **Step 3: Verificar en http://localhost:3000/es/sobre-nosotros**

Timeline con 4 hitos entre el profile card y los valores.

- [ ] **Step 4: Commit**

```bash
git add "app/[lang]/sobre-nosotros/page.tsx" app/globals.css
git commit -m "feat(about): timeline de experiencia — Francia, Erasmus, EEUU, freelance"
```

---

## Task 8: Contexto de mercado en /precios

**Files:**
- Modify: `app/[lang]/precios/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Leer app/[lang]/precios/page.tsx para localizar donde insertar**

```bash
head -60 "app/[lang]/precios/page.tsx"
```

- [ ] **Step 2: Anadir seccion de mercado despues del bloque PricingCards en el JSX**

```tsx
<AnimatedSection>
  <section aria-labelledby="pricing-context-title" style={{ paddingBlock: "var(--space-16)" }}>
    <div className="container-xl">
      <h2 id="pricing-context-title" className="section-heading" style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
        {locale === "es" ? "Que cuesta esto en el mercado?" : locale === "en" ? "What does this cost in the market?" : "Zenbat kostatzen da hau merkatuan?"}
      </h2>
      <div className="pricing-market-grid">
        {(locale === "es" ? [
          { who: "Agencia grande", price: "5.000 EUR - 20.000 EUR", note: "Misma web, mucho mas cara. Pagas su estructura.", highlight: false },
          { who: "Freelancer sin experiencia", price: "400 EUR - 800 EUR", note: "Plantilla WordPress. No convierte, no escala.", highlight: false },
          { who: "Constructor online (Wix)", price: "200 EUR - 500 EUR/ano", note: "No es tuya. Lenta. Sin SEO real.", highlight: false },
          { who: "Unax Aller", price: "1.500 EUR", note: "Codigo a mano, SEO real, tuya para siempre.", highlight: true },
        ] : locale === "en" ? [
          { who: "Large agency", price: "EUR 5,000 - EUR 20,000", note: "Same website, much more expensive. You pay for their structure.", highlight: false },
          { who: "Inexperienced freelancer", price: "EUR 400 - EUR 800", note: "WordPress template. Does not convert or scale.", highlight: false },
          { who: "Online builder (Wix)", price: "EUR 200 - EUR 500/year", note: "Not yours. Slow. No real SEO.", highlight: false },
          { who: "Unax Aller", price: "EUR 1,500", note: "Hand-coded, real SEO, yours forever.", highlight: true },
        ] : [
          { who: "Agentzia handia", price: "5.000 EUR - 20.000 EUR", note: "Web bera, askoz garestiagoa. Beren egitura ordaintzen duzu.", highlight: false },
          { who: "Esperientziarik gabeko freelance-a", price: "400 EUR - 800 EUR", note: "WordPress txantiloia. Ez du konbertsio egiten.", highlight: false },
          { who: "Online eraikitzailea (Wix)", price: "200 EUR - 500 EUR/urte", note: "Ez da zurea. Motela. SEO errealik gabe.", highlight: false },
          { who: "Unax Aller", price: "1.500 EUR", note: "Eskuz kodeatua, benetako SEO, zurea betirako.", highlight: true },
        ]).map((row, i) => (
          <div key={i} className={`pricing-market-row${row.highlight ? " pricing-market-row--highlight" : ""}`}>
            <div className="pricing-market-who">{row.who}</div>
            <div className="pricing-market-price">{row.price}</div>
            <div className="pricing-market-note">{row.note}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
</AnimatedSection>
```

- [ ] **Step 3: Anadir estilos en app/globals.css**

```css
/* === Pricing Market Comparison === */
.pricing-market-grid { display: flex; flex-direction: column; gap: var(--space-2); max-width: 700px; margin-inline: auto; }
.pricing-market-row { display: grid; grid-template-columns: 1.5fr 1fr 2fr; gap: var(--space-4); padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); background: color-mix(in srgb, var(--color-ink) 4%, transparent); align-items: center; }
.pricing-market-row--highlight { background: color-mix(in srgb, var(--color-success) 8%, transparent); border: 1px solid color-mix(in srgb, var(--color-success) 30%, transparent); }
@media (max-width: 640px) { .pricing-market-row { grid-template-columns: 1fr; gap: var(--space-1); } }
.pricing-market-who { font-family: var(--font-sans); font-size: 0.875rem; font-weight: 600; color: var(--color-ink); }
.pricing-market-price { font-family: var(--font-serif); font-size: 1rem; font-weight: 700; color: var(--color-accent); }
.pricing-market-note { font-family: var(--font-sans); font-size: 0.8rem; color: var(--color-ink-muted); }
```

- [ ] **Step 4: Verificar en http://localhost:3000/es/precios**

4 filas de comparativa de mercado visibles con Unax destacado.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/precios/page.tsx" app/globals.css
git commit -m "feat(precios): contexto de mercado — 4 opciones con Unax destacado"
```

---

## Task 9: Que pasa cuando contactas en /contacto

**Files:**
- Modify: `app/[lang]/contacto/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Leer app/[lang]/contacto/page.tsx**

```bash
cat "app/[lang]/contacto/page.tsx"
```

- [ ] **Step 2: Anadir seccion antes de ContactForm en el JSX**

Buscar la linea `<ContactForm` y anadir justo antes:

```tsx
<AnimatedSection>
  <div className="contact-what-happens">
    <h2 className="contact-what-title">
      {locale === "es" ? "Que pasa cuando contactas?" : locale === "en" ? "What happens when you get in touch?" : "Zer gertatzen da kontaktuan jartzen zarenean?"}
    </h2>
    <div className="contact-steps-row">
      {(locale === "es" ? [
        { step: "1", text: "Me llega tu mensaje en minutos" },
        { step: "2", text: "Te respondo en menos de 24h con una propuesta inicial" },
        { step: "3", text: "Si encaja, agendamos una llamada de 30 min gratis" },
      ] : locale === "en" ? [
        { step: "1", text: "Your message reaches me in minutes" },
        { step: "2", text: "I reply within 24h with an initial proposal" },
        { step: "3", text: "If it fits, we schedule a free 30-min call" },
      ] : [
        { step: "1", text: "Zure mezua minututan iristen zait" },
        { step: "2", text: "24 ordutan erantzuten dizut hasierako proposamen batekin" },
        { step: "3", text: "Bat badator, 30 minutuko dei doan bat antolatzen dugu" },
      ]).map((item) => (
        <div key={item.step} className="contact-step">
          <span className="contact-step-number">{item.step}</span>
          <p className="contact-step-text">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</AnimatedSection>
```

- [ ] **Step 3: Anadir estilos en app/globals.css**

```css
/* === Contact What Happens === */
.contact-what-happens { background: color-mix(in srgb, var(--color-accent) 6%, transparent); border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent); border-radius: var(--radius-md); padding: var(--space-6) var(--space-8); margin-bottom: var(--space-10); }
.contact-what-title { font-family: var(--font-sans); font-size: 1rem; font-weight: 700; color: var(--color-ink); margin-bottom: var(--space-4); }
.contact-steps-row { display: flex; gap: var(--space-8); flex-wrap: wrap; }
.contact-step { display: flex; align-items: flex-start; gap: var(--space-2); }
.contact-step-number { width: 22px; height: 22px; border-radius: 50%; background: var(--color-accent); color: var(--color-surface); font-family: var(--font-sans); font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.contact-step-text { font-family: var(--font-sans); font-size: 0.875rem; color: var(--color-ink); line-height: 1.5; max-width: 180px; }
```

- [ ] **Step 4: Verificar en http://localhost:3000/es/contacto**

3 pasos numerados encima del formulario.

- [ ] **Step 5: Commit**

```bash
git add "app/[lang]/contacto/page.tsx" app/globals.css
git commit -m "feat(contacto): que-pasa-cuando-contactas — reduce friccion de conversion"
```

---

## Task 10: Product Marketing Context document

**Files:**
- Create: `.agents/product-marketing-context.md`

- [ ] **Step 1: Crear directorio si no existe**

```bash
mkdir -p .agents
```

- [ ] **Step 2: Crear .agents/product-marketing-context.md**

```markdown
# Product Marketing Context

*Last updated: 2026-05-12*

## Product Overview
**One-liner:** Disenador web freelance en Irun que hace webs a medida en 2 semanas desde 1.500 EUR, sin agencias.
**What it does:** Diseno y desarrollo web a medida (Next.js) para negocios del Pais Vasco y Espana. SEO tecnico, animaciones GSAP, multi-idioma (ES/EU/EN/FR), Core Web Vitals 95+.
**Product category:** Diseno web freelance / desarrollo web a medida
**Product type:** Servicio freelance B2B/B2C
**Business model:** Proyecto unico 1.500 EUR - 2.000 EUR + mantenimiento opcional 100-200 EUR/ano

## Target Audience
**Target companies:** Negocios locales (peluquerias, talleres, restaurantes), clinicas (dental, fisio, estetica), empresas exportadoras multi-idioma, negocios con web obsoleta
**Decision-makers:** Dueno/a del negocio, gerente, autonomo
**Primary use case:** Conseguir presencia digital profesional que traiga clientes
**Jobs to be done:**
- "Quiero aparecer en Google cuando alguien busca mi servicio en mi ciudad"
- "Quiero una web que de imagen profesional y transmita confianza"
- "Quiero una web nueva sin el caos de gestionar una agencia"

## Problems & Pain Points
**Core problem:** Negocios con web inexistente, lenta o con mala imagen que pierden clientes frente a competidores con mejor presencia digital
**Why alternatives fall short:**
- Agencias: caras (5.000-20.000 EUR), lentas (6-12 semanas), impersonales
- Freelancers baratos: plantillas WordPress sin SEO, sin calidad
- Wix/Squarespace: lentas, no son del cliente, sin SEO real
**Emotional tension:** "No quiero pagar una fortuna y que me traten como un numero mas"

## Competitive Landscape
**Direct:** Agencias locales (Bilbao, Donostia) — caras, lentas, sin trato personal
**Secondary:** Freelancers baratos en Fiverr/Malt — sin calidad tecnica, sin SEO
**Indirect:** Wix/Squarespace/WordPress DIY — no del cliente, lento, sin SEO tecnico

## Differentiation
**Key differentiators:**
- 1.500 EUR precio cerrado (vs 5.000-20.000 EUR agencia)
- Entrega 1-2 semanas (vs 6-12 semanas agencia)
- Hablas directamente con Unax (cero intermediarios)
- 4 idiomas reales (Frances bilingue, Ingles profesional)
- Next.js + GSAP (stack moderno, no WordPress)
- Core Web Vitals 95+ garantizado

## Objections
| Objection | Response |
|-----------|----------|
| Por que 1.500 EUR si hay freelancers mas baratos? | Precio minimo para calidad real: diseno personalizado, SEO tecnico, Next.js |
| Eres solo un estudiante? | Si, con 14+ proyectos reales, 5 estrellas en Google, codigo en produccion |
| Trabajas solo con el Pais Vasco? | No, trabajo con toda Espana e internacional |

**Anti-persona:** Ecommerce grande, SaaS, proyectos urgentes con plazo de 3 dias

## Customer Language
**How they describe the problem:**
- "Mi web da verguenza"
- "No aparezco en Google"
- "Mi web de WordPress va lentisima"
**How they describe us:**
- "Atencion y asesoramiento impecable. Gran profesional, trabajo muy serio."
- "La web ha quedado clara, intuitiva, profesional y muy facil de usar"
**Words to use:** A medida, a mano, desde cero, tuya para siempre, sin sorpresas, directo, rapido
**Words to avoid:** Experiencias digitales sofisticadas, soluciones innovadoras, sinergias

## Brand Voice
**Tone:** Directo, cercano, sin humo. Joven que sabe lo que hace sin inflar el ego.
**Style:** Primera persona, frases cortas, honesto sobre precios y plazos
**Personality:** Joven, competente, obsesivo con la calidad, sin pretensiones de agencia grande

## Proof Points
**Metrics:** 14+ proyectos, 100% satisfaccion, 2 semanas entrega media, 5 estrellas Google
**Customers:** Farmacia Fernandez Bera, Motos Arretxe, Anaka Optica, VirtuoSolve
**Testimonials:**
> "Atencion y asesoramiento impecable. Gran profesional, trabajo muy serio." — Motos Arretxe SL
> "La web ha quedado clara, intuitiva, profesional y muy facil de usar." — Aranzazu Fernandez Diez (Farmaceutica)

## Goals
**Business goal:** Conseguir 2-3 proyectos nuevos por mes en el Pais Vasco y Espana
**Conversion action:** Rellenar formulario de contacto o enviar WhatsApp
```

- [ ] **Step 3: Commit**

```bash
git add .agents/product-marketing-context.md
git commit -m "docs: product-marketing-context.md para futuras marketing skills"
```

---

## Self-Review

**Spec coverage:**
- Task 1: Hero copy orientado a resultado con disponibilidad
- Task 2: UrgencyBadge con punto pulsante en el hero
- Task 3: ProcessStrip — 4 pasos entre Founder y Projects
- Task 4: SocialProof con chips de clientes reales + copy especifico
- Task 5: Reordenacion del funnel de conversion
- Task 6: Tabla Agencia vs Unax en /servicios
- Task 7: Timeline de experiencia en /sobre-nosotros
- Task 8: Contexto de mercado en /precios
- Task 9: Reducir friccion en /contacto
- Task 10: Documento de contexto de marketing

**Placeholder scan:** Sin TBD ni TODO. Todo el codigo es real y ejecutable.

**Type consistency:** La nueva clave `hero.availability` se usa en Hero.tsx via `t("availability")`. La clave `homeProcess` se usa en ProcessStrip.tsx via `useTranslations("homeProcess")`. La clave `socialProof.clientsLabel` se usa en SocialProof.tsx via `t("clientsLabel")`. Todos consistentes en los 3 archivos i18n.

**Scope:** Plan acotado a copy, nuevas secciones y componentes pequenos. No toca arquitectura de routing ni sistema de animaciones existente.
