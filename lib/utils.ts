import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
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
  geo: {
    region: "ES-PV",
    placename: "País Vasco",
    position: "43.2630;-2.9350",
    icbm: "43.2630, -2.9350",
  },
};
