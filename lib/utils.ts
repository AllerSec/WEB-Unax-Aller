import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/¿|¡|\?|!|"|'|,|\.|:|;|\(|\)/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function extractHeadings(markdown: string): { text: string; id: string }[] {
  const headings: { text: string; id: string }[] = [];
  const seen = new Set<string>();
  for (const line of markdown.split("\n")) {
    if (!line.startsWith("## ")) continue;
    const text = line.slice(3).trim();
    let id = slugify(text);
    let n = 2;
    while (seen.has(id)) id = `${slugify(text)}-${n++}`;
    seen.add(id);
    headings.push({ text, id });
  }
  return headings;
}

export function formatPrice(price: number, locale: string): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const siteConfig = {
  name: "Unax Aller",
  url: "https://unaxaller.com",
  description:
    "Diseño y desarrollo web premium en el País Vasco. Creamos experiencias digitales a medida, sofisticadas y orientadas a resultados.",
  ogImage: "https://unaxaller.com/og-image.jpg",
  phone: "+34620909916",
  phoneDisplay: "+34 620 90 99 16",
  whatsapp: "34620909916",
  geo: {
    region: "ES-PV",
    placename: "País Vasco",
    position: "43.2630;-2.9350",
    icbm: "43.2630, -2.9350",
  },
};
