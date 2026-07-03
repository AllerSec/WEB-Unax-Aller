import { ImageResponse } from 'next/og'

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }, { lang: 'eu' }, { lang: 'fr' }]
}

type Props = { params: Promise<{ lang: string }> }

export default async function Image({ params }: Props) {
  const { lang } = await params

  const subtitles: Record<string, string> = {
    es: '1.300€ · 1er año incluido · 30 días de garantía · unaxaller.com',
    en: '€1,300 · first year included · 30-day guarantee · unaxaller.com',
    eu: '1.300€ · 1. urtea barne · 30 eguneko bermea · unaxaller.com',
    fr: '1 300 € · 1ère année incluse · garantie 30 jours · unaxaller.com',
  }

  const titles: Record<string, { line1: string; line2: string }> = {
    es: { line1: 'Más llamadas para tu', line2: 'negocio local' },
    en: { line1: 'More calls for your', line2: 'local business' },
    eu: { line1: 'Dei gehiago zure', line2: 'tokiko negoziorako' },
    fr: { line1: 'Plus d’appels pour votre', line2: 'commerce local' },
  }

  const safelang = ['es', 'en', 'eu', 'fr'].includes(lang) ? lang : 'es'
  const title = titles[safelang]
  const subtitle = subtitles[safelang]

  return new ImageResponse(
    (
      <div style={{
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
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 72, height: 72,
          borderRadius: 16,
          backgroundColor: '#171717',
          marginBottom: 40,
        }}>
          <span style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 600 }}>UA</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', color: '#FFFFFF', fontSize: 52, fontWeight: 400, lineHeight: 1.1, marginBottom: 16, maxWidth: 700, letterSpacing: '-0.02em' }}>
          <span>{title.line1}&nbsp;</span>
          <span style={{ color: '#A3A3A3' }}>{title.line2}</span>
        </div>
        <div style={{ color: '#A3A3A3', fontSize: 20, fontFamily: 'sans-serif', marginBottom: 48 }}>
          {subtitle}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
