"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
};

type CarouselProps = {
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  opts?: Record<string, unknown>;
  plugins?: unknown[];
};

type CarouselContextProps = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", setApi, className, children, ...props }, ref) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (orientation === "horizontal") {
      setCanScrollPrev(el.scrollLeft > 0);
      setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    } else {
      setCanScrollPrev(el.scrollTop > 0);
      setCanScrollNext(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    }
  }, [orientation]);

  const scrollPrev = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = orientation === "horizontal" ? el.clientWidth : el.clientHeight;
    el.scrollBy({ [orientation === "horizontal" ? "left" : "top"]: -amount, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  }, [orientation, updateScrollState]);

  const scrollNext = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = orientation === "horizontal" ? el.clientWidth : el.clientHeight;
    el.scrollBy({ [orientation === "horizontal" ? "left" : "top"]: amount, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  }, [orientation, updateScrollState]);

  React.useEffect(() => {
    updateScrollState();
    if (setApi) {
      setApi({ scrollPrev, scrollNext, canScrollPrev: () => canScrollPrev, canScrollNext: () => canScrollNext });
    }
  }, [setApi, scrollPrev, scrollNext, canScrollPrev, canScrollNext, updateScrollState]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); scrollPrev(); }
      else if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); scrollNext(); }
    },
    [scrollPrev, scrollNext],
  );

  return (
    <CarouselContext.Provider value={{ scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation, scrollRef }}>
      <div ref={ref} onKeyDownCapture={handleKeyDown} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { scrollRef, orientation } = useCarousel();
    return (
      <div
        ref={scrollRef}
        className={cn("overflow-hidden", orientation === "horizontal" ? "overflow-x-auto" : "overflow-y-auto")}
        style={{ scrollbarWidth: "none" }}
      >
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export type { CarouselApi };
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
