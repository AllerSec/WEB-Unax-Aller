// lib/data/case-studies.ts
export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  year: number;
  problem: Record<"es" | "en" | "eu", string>;
  solution: Record<"es" | "en" | "eu", string>;
  results: Record<"es" | "en" | "eu", string[]>;
  metrics: {
    lighthouse?: number;
    loadTime?: string;
    conversion?: string;
  };
  tags: string[];
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "proyecto-1",
    client: "Cliente 1",
    sector: "Restauración",
    year: 2025,
    problem: {
      es: "El cliente no tenía presencia online y perdía reservas frente a competidores.",
      en: "The client had no online presence and was losing bookings to competitors.",
      eu: "Bezeroak lineako presentziarik ez zuen eta lehiakideen aurrean erreserbak galtzen zituen.",
    },
    solution: {
      es: "Diseñamos una web completa con sistema de reservas, SEO local y diseño mobile-first.",
      en: "We designed a complete website with booking system, local SEO and mobile-first design.",
      eu: "Web osoa diseinatu genuen erreserbazio sistemarekin, SEO lokalarekin eta mobile-first diseinuarekin.",
    },
    results: {
      es: ["Lighthouse 98/100", "Tiempo de carga < 1.5s", "Top 3 en Google Maps Irun"],
      en: ["Lighthouse 98/100", "Load time < 1.5s", "Top 3 on Google Maps Irun"],
      eu: ["Lighthouse 98/100", "Karga denbora < 1.5s", "Top 3 Google Maps Irunen"],
    },
    metrics: { lighthouse: 98, loadTime: "1.4s" },
    tags: ["restauración", "SEO local", "reservas"],
    featured: true,
  },
  {
    slug: "proyecto-2",
    client: "Cliente 2",
    sector: "Comercio local",
    year: 2025,
    problem: {
      es: "Web antigua, lenta y sin optimización móvil que ahuyentaba a los clientes.",
      en: "Old, slow website with no mobile optimisation that was driving customers away.",
      eu: "Web zaharra, motela eta mugikorrerako optimizaziorik gabea, bezeroak uxatzen zituena.",
    },
    solution: {
      es: "Rediseño completo con Next.js, animaciones GSAP y optimización de Core Web Vitals.",
      en: "Full redesign with Next.js, GSAP animations and Core Web Vitals optimisation.",
      eu: "Birbideraketa osoa Next.js-ekin, GSAP animazioekin eta Core Web Vitals optimizazioarekin.",
    },
    results: {
      es: ["Mejora del 300% en velocidad", "Bounce rate -40%", "Conversiones +25%"],
      en: ["300% speed improvement", "Bounce rate -40%", "Conversions +25%"],
      eu: ["Abiaduraren %300 hobekuntza", "Bounce rate -40%", "Bihurketak +%25"],
    },
    metrics: { lighthouse: 96, loadTime: "1.2s", conversion: "+25%" },
    tags: ["comercio", "rediseño", "performance"],
    featured: true,
  },
  {
    slug: "proyecto-3",
    client: "Cliente 3",
    sector: "Servicios profesionales",
    year: 2026,
    problem: {
      es: "Necesitaban una web multi-idioma (español/inglés) para captar clientes internacionales.",
      en: "They needed a multi-language website (Spanish/English) to attract international clients.",
      eu: "Hizkuntza anitzeko web bat behar zuten (gaztelania/ingelesa) nazioarteko bezeroak erakartzeko.",
    },
    solution: {
      es: "Web multi-idioma con next-intl, SEO por idioma y hreflang configurado correctamente.",
      en: "Multi-language website with next-intl, per-language SEO and correctly configured hreflang.",
      eu: "Hizkuntza anitzeko weba next-intl-ekin, hizkuntzako SEOa eta hreflang ongi konfiguratuta.",
    },
    results: {
      es: ["3 idiomas activos", "Tráfico internacional +60%", "Lighthouse 97/100"],
      en: ["3 active languages", "International traffic +60%", "Lighthouse 97/100"],
      eu: ["3 hizkuntza aktibo", "Nazioarteko trafikoa +%60", "Lighthouse 97/100"],
    },
    metrics: { lighthouse: 97, loadTime: "1.6s" },
    tags: ["multi-idioma", "internacional", "SEO"],
    featured: false,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

export function getRelatedCaseStudies(slug: string, limit = 2): CaseStudy[] {
  const current = getCaseStudyBySlug(slug);
  if (!current) return [];
  const scored = caseStudies
    .filter((cs) => cs.slug !== slug)
    .map((cs) => ({
      cs,
      score:
        cs.tags.filter((t) => current.tags.includes(t)).length +
        (cs.sector === current.sector ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.cs.year - a.cs.year);
  return scored.slice(0, limit).map((s) => s.cs);
}
