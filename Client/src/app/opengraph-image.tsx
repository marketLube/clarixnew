import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clarix Education';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #162447 0%, #513392 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>Clarix Education</div>
        <div style={{ fontSize: 28, marginTop: 20, opacity: 0.9 }}>
          Find Your Perfect College, Course & Career
        </div>
      </div>
    ),
    { ...size },
  );
}
