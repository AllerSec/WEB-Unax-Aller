import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ lang: string }> }

export default async function Image({ params }: Props) {
  const { lang } = await params

  const subtitles: Record<string, string> = {
    es: 'Desde 1.500€ IVA inc. · País Vasco · unaxaller.com',
    en: 'From €1,500 VAT inc. · Basque Country · unaxaller.com',
    eu: '1.500€-tik BEZ barne · Euskal Herria · unaxaller.com',
  }

  const titles: Record<string, { line1: string; line2: string }> = {
    es: { line1: 'Diseño y desarrollo web', line2: 'premium' },
    en: { line1: 'Premium web design', line2: '& development' },
    eu: { line1: 'Web diseinu eta', line2: 'garapen premium-a' },
  }

  const safelang = ['es', 'en', 'eu'].includes(lang) ? lang : 'es'
  const title = titles[safelang]
  const subtitle = subtitles[safelang]

  return new ImageResponse(
    (
      <div style={{
        background: '#061b0e',
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
          backgroundColor: '#1b3022',
          marginBottom: 40,
        }}>
          <span style={{ color: '#b4cdb8', fontSize: 28 }}>UA</span>
        </div>
        <div style={{ color: '#ffffff', fontSize: 52, fontWeight: 300, lineHeight: 1.1, marginBottom: 16, maxWidth: 700 }}>
          {title.line1}{' '}
          <span style={{ fontStyle: 'italic', color: '#b4cdb8' }}>{title.line2}</span>
        </div>
        <div style={{ color: '#819986', fontSize: 20, fontFamily: 'sans-serif', marginBottom: 48 }}>
          {subtitle}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
