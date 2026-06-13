import { ImageResponse } from 'next/og'
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const runtime = "nodejs"
export const alt = 'Unax Aller: Más llamadas para tu negocio local · 1.300€'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoBuf = readFileSync(join(process.cwd(), "public/images/brand/logo-mark.png"))
  const logo = `data:image/png;base64,${logoBuf.toString("base64")}`
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          backgroundImage: 'radial-gradient(ellipse at top left, #262626 0%, #0A0A0A 60%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
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
          <span style={{ color: '#A3A3A3' }}>negocio local</span>
        </div>

        {/* Subtitle */}
        <div style={{
          color: '#A3A3A3',
          fontSize: 22,
          fontWeight: 400,
          marginBottom: 48,
          fontFamily: 'sans-serif',
        }}>
          1.300€ · 1er año incluido · 30 días de garantía · sin cuotas mensuales
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 48, height: 2, backgroundColor: '#171717' }} />
          <span style={{ color: '#D4D4D4', fontSize: 14, fontFamily: 'sans-serif', letterSpacing: 3, textTransform: 'uppercase' }}>
            unaxaller.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
