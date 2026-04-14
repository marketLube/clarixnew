import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'College - Clarix Education';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchCollege(id: string) {
  try {
    const res = await fetch(`${API_URL}/college/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function FallbackImage() {
  return (
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
        Explore Top Colleges in India
      </div>
    </div>
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const college = await fetchCollege(id);

  if (!college) {
    return new ImageResponse(<FallbackImage />, { ...size });
  }

  const name = college.name || college.collegeName || 'College';
  const location =
    college.location ||
    [college.city, college.state].filter(Boolean).join(', ') ||
    '';

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
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            opacity: 0.8,
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 4,
          }}
        >
          College
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '90%',
          }}
        >
          {name}
        </div>
        {location && (
          <div
            style={{
              fontSize: 28,
              marginTop: 24,
              opacity: 0.85,
              textAlign: 'center',
            }}
          >
            {location}
          </div>
        )}
        <div
          style={{
            fontSize: 20,
            marginTop: 40,
            opacity: 0.6,
            fontWeight: 500,
          }}
        >
          Clarix Education
        </div>
      </div>
    ),
    { ...size },
  );
}
