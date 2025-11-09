import { ImageResponse } from 'next/og'

export const alt = 'Kensa - Your Research, Elevated'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <span style={{ color: 'white', fontSize: 48, fontWeight: 'bold' }}>K</span>
          </div>
          <span style={{ fontSize: 72, fontWeight: 'bold', color: '#111827' }}>kensa</span>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Your Research,{' '}
          <span style={{ color: '#14b8a6' }}>Elevated</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          AI-powered platform for researchers
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}