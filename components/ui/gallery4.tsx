"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  /** Internal case-study link (e.g. /es/proyectos/motos-arretxe) */
  href: string;
  /** External live-site URL */
  externalUrl: string;
  /** Mobile screenshot path (public/images/…) */
  mobileImage: string;
  /** Accent colour for the gradient overlay */
  accent: string;
  /** Small label shown on the card e.g. "Farmacia · Bera" */
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
  locale = "es",
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on("select", update);
    return () => { carouselApi.off("select", update); };
  }, [carouselApi]);

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
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="g4-nav-btn"
              aria-label="Proyecto anterior"
            >
              <ArrowLeft size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="g4-nav-btn"
              aria-label="Proyecto siguiente"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="g4-track">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            breakpoints: { "(max-width: 768px)": { dragFree: true } },
          }}
        >
          <CarouselContent className="g4-content">
            {items.map((item) => (
              <CarouselItem key={item.id} className="g4-item">
                <div className="g4-card group">
                  {/* Phone frame — wraps en Link para el case study */}
                  <Link href={item.href} className="g4-phone-link" aria-label={`Ver caso de estudio: ${item.title}`}>
                    <div className="g4-phone-frame">
                      <div className="g4-phone-screen">
                        <Image
                          src={item.mobileImage}
                          alt={`Captura móvil de ${item.title}`}
                          width={390}
                          height={820}
                          className="g4-phone-img"
                          sizes="280px"
                          priority={false}
                        />
                      </div>
                      {/* Gradient overlay at bottom */}
                      <div
                        className="g4-phone-overlay"
                        style={{ background: `linear-gradient(to top, ${item.accent}ee 0%, ${item.accent}55 40%, transparent 70%)` }}
                        aria-hidden="true"
                      />
                    </div>
                  </Link>

                  {/* Visit badge — fuera del Link para evitar <a> anidado */}
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="g4-visit-badge"
                    aria-label={`Visitar ${item.externalUrl}`}
                  >
                    ↗
                  </a>

                  {/* Caption */}
                  <Link href={item.href} className="g4-caption">
                    <p className="g4-meta">{item.meta}</p>
                    <h3 className="g4-name">{item.title}</h3>
                    <p className="g4-desc">{item.description}</p>
                    <span className="g4-cta">
                      Ver caso
                      <ArrowRight size={13} className="g4-cta-arrow" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Dot indicators */}
      <div className="g4-dots" role="tablist" aria-label="Navegación de proyectos">
        {items.map((item, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentSlide === index}
            aria-label={`Ir a ${item.title}`}
            className={`g4-dot${currentSlide === index ? " g4-dot--active" : ""}`}
            onClick={() => carouselApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export { Gallery4 };
