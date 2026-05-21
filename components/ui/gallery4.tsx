"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  externalUrl: string;
  mobileImage: string;
  mobileVideo?: string;
  accent: string;
  meta: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  locale?: string;
}

const Gallery4 = ({
  title = "Proyectos realizados",
  description = "Webs reales para negocios reales del País Vasco y Navarra. Cada proyecto a medida, entregado en 1–2 semanas.",
  items,
}: Gallery4Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / items.length;
    const idx = Math.round(el.scrollLeft / itemWidth);
    setCurrent(Math.max(0, Math.min(idx, items.length - 1)));
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => el.removeEventListener("scroll", updateState);
  }, [updateState]);

  const scrollTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / items.length;
    el.scrollTo({ left: itemWidth * index, behavior: "smooth" });
  }, [items.length]);

  const scrollPrev = () => scrollTo(Math.max(0, current - 1));
  const scrollNext = () => scrollTo(Math.min(items.length - 1, current + 1));

  return (
    <section className="g4-section" aria-labelledby="g4-title">
      <div className="container-xl">
        <div className="g4-header">
          <div className="g4-header-text">
            <span className="lp-eyebrow">Proyectos reales</span>
            <h2 id="g4-title" className="g4-title">{title}</h2>
            <p className="g4-description">{description}</p>
          </div>
          <div className="g4-nav-desktop" aria-label="Controles del carrusel">
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              className="g4-nav-btn"
              aria-label="Proyecto anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              className="g4-nav-btn"
              aria-label="Proyecto siguiente"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="g4-track">
        <div
          ref={trackRef}
          className="g4-content"
          style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="g4-item"
              style={{ scrollSnapAlign: "start", flexShrink: 0 }}
            >
              <div className="g4-card group">
                <Link href={item.href} className="g4-phone-link" aria-label={`Ver caso de estudio: ${item.title}`}>
                  <div className="g4-phone-frame">
                    <div className="g4-phone-screen">
                      {item.mobileVideo ? (
                        <video
                          src={item.mobileVideo}
                          poster={item.mobileImage}
                          className="g4-phone-img"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label={`Vídeo móvil de ${item.title}`}
                        />
                      ) : (
                        <Image
                          src={item.mobileImage}
                          alt={`Captura móvil de ${item.title}`}
                          width={390}
                          height={820}
                          className="g4-phone-img"
                          sizes="280px"
                          priority={false}
                        />
                      )}
                    </div>
                    <div
                      className="g4-phone-overlay"
                      style={{ background: `linear-gradient(to top, ${item.accent}77 0%, ${item.accent}2b 40%, transparent 70%)` }}
                      aria-hidden="true"
                    />
                  </div>
                </Link>

                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="g4-visit-badge"
                  aria-label={`Visitar ${item.externalUrl}`}
                >
                  ↗
                </a>

                <Link href={item.href} className="g4-caption">
                  <p className="g4-meta">{item.meta}</p>
                  <h3 className="g4-name">{item.title}</h3>
                  <p className="g4-desc">{item.description}</p>
                  <span className="g4-cta">
                    Ver caso
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="g4-cta-arrow" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="g4-dots" role="tablist" aria-label="Navegación de proyectos">
        {items.map((item, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={current === index}
            aria-label={`Ir a ${item.title}`}
            className={`g4-dot${current === index ? " g4-dot--active" : ""}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export { Gallery4 };
