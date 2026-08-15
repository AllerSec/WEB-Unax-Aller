"use client";

import { useEffect, useRef, useState } from "react";

export type ProjectType = {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  question: string;
  intro: string;
  bullets: string[];
  accent: string;
};

type Props = {
  types: ProjectType[];
  locale: "es" | "en" | "eu" | "fr";
  headingId: string;
};

const STORAGE_KEY = "ua-project-type";

export default function ProjectTypeSelector({ types, locale, headingId }: Props) {
  const [activeId, setActiveId] = useState<string>(types[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Restore the saved / deep-linked tab once on mount. Wrapped in rAF so the
  // update happens outside the synchronous effect body (react-hooks rule).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      let next: string | undefined;
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved && types.some((t) => t.id === saved)) next = saved;
      } catch {}
      if (window.location.hash) {
        const hash = window.location.hash.slice(1);
        if (types.some((t) => t.id === hash)) next = hash;
      }
      if (next) setActiveId(next);
    });
    return () => cancelAnimationFrame(id);
  }, [types]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    try {
      sessionStorage.setItem(STORAGE_KEY, id);
    } catch {}
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    const currentIdx = types.findIndex((t) => t.id === currentId);
    let nextIdx = currentIdx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIdx = (currentIdx + 1) % types.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIdx = (currentIdx - 1 + types.length) % types.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = types.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const nextId = types[nextIdx].id;
    handleSelect(nextId);
    tabRefs.current[nextId]?.focus();
  };

  const questionLabel =
    locale === "es"
      ? "¿Qué tipo de negocio tienes?"
      : locale === "en"
      ? "What kind of business do you have?"
      : locale === "eu"
      ? "Zer motatako negozioa duzu?"
      : "Quel type d'entreprise avez-vous ?";

  const helperLabel =
    locale === "es"
      ? "Elige tu sector y verás cómo lo enfoco"
      : locale === "en"
      ? "Pick your sector and see how I approach it"
      : locale === "eu"
      ? "Aukeratu zure sektorea eta ikusi nola lantzen dudan"
      : "Choisissez votre secteur et découvrez mon approche";

  return (
    <div className="svc-quiz" role="region" aria-labelledby={headingId}>
      <div className="svc-quiz-header">
        <p className="svc-quiz-eyebrow">{helperLabel}</p>
        <h2 id={headingId} className="svc-quiz-question">
          {questionLabel}
        </h2>
      </div>

      <div
        role="tablist"
        aria-label={questionLabel}
        className="svc-quiz-tablist"
      >
        {types.map((type) => {
          const isActive = type.id === activeId;
          return (
            <button
              key={type.id}
              ref={(el) => {
                tabRefs.current[type.id] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${type.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${type.id}`}
              tabIndex={isActive ? 0 : -1}
              className="svc-quiz-tab focusable"
              data-active={isActive}
              style={{ ["--svc-accent" as string]: type.accent }}
              onClick={() => handleSelect(type.id)}
              onKeyDown={(e) => handleKeyDown(e, type.id)}
            >
              <span className="svc-quiz-tab-icon" aria-hidden="true">
                {type.icon}
              </span>
              <span className="svc-quiz-tab-label">{type.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="svc-quiz-panels">
        {types.map((type) => {
          const isActive = type.id === activeId;
          return (
            <article
              key={type.id}
              id={`panel-${type.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${type.id}`}
              hidden={!isActive}
              className="svc-quiz-panel"
              style={{ ["--svc-accent" as string]: type.accent }}
            >
              <div className="svc-quiz-panel-head">
                <span className="svc-quiz-panel-icon" aria-hidden="true">
                  {type.icon}
                </span>
                <h3 className="svc-quiz-panel-title">{type.label}</h3>
              </div>
              <p className="svc-quiz-panel-intro">{type.intro}</p>
              <ul className="svc-quiz-bullets">
                {type.bullets.map((b, i) => (
                  <li key={i} className="svc-quiz-bullet">
                    <span className="svc-quiz-bullet-check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
