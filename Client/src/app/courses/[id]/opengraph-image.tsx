import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Course - Clarix Education';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchCourse(id: string) {
  try {
    const res = await fetch(`${API_URL}/course/${id}`, {
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
        Explore Courses & Programs
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
  const course = await fetchCourse(id);

  if (!course) {
    return new ImageResponse(<FallbackImage />, { ...size });
  }

  const name = course.name || course.courseName || 'Course';
  const level = course.level || course.degreeType || '';
  const stream = course.stream?.name || '';
  const subtitle = [level, stream].filter(Boolean).join(' | ');

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
          Course
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
        {subtitle && (
          <div
            style={{
              fontSize: 26,
              marginTop: 24,
              opacity: 0.85,
              textAlign: 'center',
            }}
          >
            {subtitle}
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
