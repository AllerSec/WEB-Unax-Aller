import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let logoDataUri: string | null = null;
function getLogoDataUri() {
  if (logoDataUri) return logoDataUri;
  const buf = readFileSync(join(process.cwd(), "public/images/brand/logo-mark.png"));
  logoDataUri = `data:image/png;base64,${buf.toString("base64")}`;
  return logoDataUri;
}

type OgOptions = {
  line1: string;
  line2: string;
  subtitle: string;
  eyebrow?: string;
};

export function renderOgImage({ line1, line2, subtitle, eyebrow }: OgOptions) {
  const logo = getLogoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          backgroundImage: "radial-gradient(ellipse at top left, #262626 0%, #0A0A0A 60%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={140}
          height={84}
          style={{
            marginBottom: 32,
            filter: "invert(1)",
          }}
        />
        {eyebrow && (
          <div
            style={{
              color: "#D4D4D4",
              fontSize: 18,
              fontFamily: "sans-serif",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 24,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            color: "#FFFFFF",
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: 16,
            maxWidth: 900,
            letterSpacing: "-0.02em",
          }}
        >
          <span>{line1}&nbsp;</span>
          <span style={{ color: "#A3A3A3" }}>{line2}</span>
        </div>
        <div
          style={{
            color: "#A3A3A3",
            fontSize: 20,
            fontFamily: "sans-serif",
            marginBottom: 48,
          }}
        >
          {subtitle}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 48, height: 2, backgroundColor: "#525252" }} />
          <span
            style={{
              color: "#D4D4D4",
              fontSize: 14,
              fontFamily: "sans-serif",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            unaxaller.com
          </span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}

type CityOgOptions = {
  cityName: string;
  regionName: string;
  locale: "es" | "en" | "eu";
};

export function renderCityOgImage({ cityName, regionName, locale }: CityOgOptions) {
  const line1Map: Record<string, string> = {
    es: "Diseñador web en",
    en: "Web designer in",
    eu: "Web diseinatzailea",
  };
  const line2Map: Record<string, string> = {
    es: `${cityName}, ${regionName}`,
    en: `${cityName}, ${regionName}`,
    eu: `${cityName}n`,
  };
  const subtitleMap: Record<string, string> = {
    es: `1.300€ · 1er año incluido · unaxaller.com`,
    en: `€1,300 · first year included · unaxaller.com`,
    eu: `1.300€ · 1. urtea barne · unaxaller.com`,
  };
  return renderOgImage({
    eyebrow: locale === "es" ? "Ciudad" : locale === "en" ? "Location" : "Hiria",
    line1: line1Map[locale],
    line2: line2Map[locale],
    subtitle: subtitleMap[locale],
  });
}
