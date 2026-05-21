import { ImageResponse } from 'next/og'
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const runtime = "nodejs"
export const alt = 'Unax Aller — Más llamadas para tu negocio local · 149€/mes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoBuf = readFileSync(join(process.cwd(), "public/images/brand/logo-mark.png"))
  const logo = `data:image/png;base64,${logoBuf.toString("base64")}`
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F172A',
          backgroundImage: 'radial-gradient(ellipse at top left, #1E293B 0%, #0F172A 60%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Logo mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={140}
          height={84}
          style={{ marginBottom: 32, filter: 'invert(1)' }}
        />

        {/* Title */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          color: '#FFFFFF',
          fontSize: 56,
          fontWeight: 400,
          lineHeight: 1.1,
          marginBottom: 20,
          maxWidth: 700,
          letterSpacing: '-0.02em',
        }}>
          <span>Más llamadas para tu&nbsp;</span>
          <span style={{ fontStyle: 'italic', color: '#7DD3FC' }}>negocio local</span>
        </div>

        {/* Subtitle */}
        <div style={{
          color: '#94A3B8',
          fontSize: 22,
          fontWeight: 400,
          marginBottom: 48,
          fontFamily: 'sans-serif',
        }}>
          149€/mes · 0€ inicial · 30 días de garantía · 12 meses
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 48, height: 2, backgroundColor: '#0369A1' }} />
          <span style={{ color: '#7DD3FC', fontSize: 14, fontFamily: 'sans-serif', letterSpacing: 3, textTransform: 'uppercase' }}>
            unaxaller.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
