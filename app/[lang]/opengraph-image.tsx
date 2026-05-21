import { ImageResponse } from 'next/og'

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ lang: string }> }

export default async function Image({ params }: Props) {
  const { lang } = await params

  const subtitles: Record<string, string> = {
    es: '149€/mes · 0€ inicial · 30 días de garantía · unaxaller.com',
    en: '€149/month · €0 upfront · 30-day guarantee · unaxaller.com',
    eu: '149€/hilean · 0€ hasieran · 30 eguneko bermea · unaxaller.com',
  }

  const titles: Record<string, { line1: string; line2: string }> = {
    es: { line1: 'Más llamadas para tu', line2: 'negocio local' },
    en: { line1: 'More calls for your', line2: 'local business' },
    eu: { line1: 'Dei gehiago zure', line2: 'tokiko negoziorako' },
  }

  const safelang = ['es', 'en', 'eu'].includes(lang) ? lang : 'es'
  const title = titles[safelang]
  const subtitle = subtitles[safelang]

  return new ImageResponse(
    (
      <div style={{
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
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 72, height: 72,
          borderRadius: 16,
          backgroundColor: '#0369A1',
          marginBottom: 40,
        }}>
          <span style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 600 }}>UA</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', color: '#FFFFFF', fontSize: 52, fontWeight: 400, lineHeight: 1.1, marginBottom: 16, maxWidth: 700, letterSpacing: '-0.02em' }}>
          <span>{title.line1}&nbsp;</span>
          <span style={{ fontStyle: 'italic', color: '#7DD3FC' }}>{title.line2}</span>
        </div>
        <div style={{ color: '#94A3B8', fontSize: 20, fontFamily: 'sans-serif', marginBottom: 48 }}>
          {subtitle}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
