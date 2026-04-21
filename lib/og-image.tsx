import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgOptions = {
  line1: string;
  line2: string;
  subtitle: string;
  eyebrow?: string;
};

export function renderOgImage({ line1, line2, subtitle, eyebrow }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#061b0e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 16,
            backgroundColor: "#1b3022",
            marginBottom: 40,
          }}
        >
          <span style={{ color: "#b4cdb8", fontSize: 28 }}>UA</span>
        </div>
        {eyebrow && (
          <div
            style={{
              color: "#b4cdb8",
              fontSize: 18,
              fontFamily: "sans-serif",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            color: "#ffffff",
            fontSize: 52,
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          {line1}{" "}
          <span style={{ fontStyle: "italic", color: "#b4cdb8" }}>{line2}</span>
        </div>
        <div
          style={{
            color: "#819986",
            fontSize: 20,
            fontFamily: "sans-serif",
            marginBottom: 48,
          }}
        >
          {subtitle}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 48, height: 2, backgroundColor: "#4d6453" }} />
          <span
            style={{
              color: "#4d6453",
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
