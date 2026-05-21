import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const size = ogSize;
export const contentType = ogContentType;

type Props = { params: Promise<{ lang: string }> };

export default async function Image({ params }: Props) {
  const { lang } = await params;
  const locale = (lang as "es" | "en" | "eu") || "es";
  return renderOgImage({
    eyebrow: locale === "es" ? "Colabora" : locale === "en" ? "Collaborate" : "Lankidetza",
    line1: locale === "es" ? "Appointment Setter" : locale === "en" ? "Appointment Setter" : "Appointment Setter",
    line2: locale === "es" ? "B2B · 15% comisión" : locale === "en" ? "B2B · 15% commission" : "B2B · %15 komisioa",
    subtitle: locale === "es" ? "100% remoto · unaxaller.com" : locale === "en" ? "100% remote · unaxaller.com" : "100% urrutikoa · unaxaller.com",
  });
}
