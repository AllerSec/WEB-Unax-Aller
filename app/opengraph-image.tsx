import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Unax Aller — Diseño y Desarrollo Web Premium'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#061b0e',
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 72,
          height: 72,
          borderRadius: 16,
          backgroundColor: '#1b3022',
          marginBottom: 40,
        }}>
          <span style={{ color: '#b4cdb8', fontSize: 28, fontWeight: 400 }}>UA</span>
        </div>

        {/* Title */}
        <div style={{
          color: '#ffffff',
          fontSize: 56,
          fontWeight: 300,
          lineHeight: 1.1,
          marginBottom: 20,
          maxWidth: 700,
        }}>
          Diseño y desarrollo web <span style={{ fontStyle: 'italic', color: '#b4cdb8' }}>premium</span>
        </div>

        {/* Subtitle */}
        <div style={{
          color: '#819986',
          fontSize: 22,
          fontWeight: 300,
          marginBottom: 48,
          fontFamily: 'sans-serif',
        }}>
          Desde 1.300€ IVA inc. · País Vasco · unaxaller.com
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 48, height: 2, backgroundColor: '#4d6453' }} />
          <span style={{ color: '#4d6453', fontSize: 14, fontFamily: 'sans-serif', letterSpacing: 3, textTransform: 'uppercase' }}>
            unaxaller.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
