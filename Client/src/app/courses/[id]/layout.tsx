import type { Metadata } from "next";
import { stripMarkdown } from "@/lib/helperFunctions/stripMarkdown";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.clarixeducation.com";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await fetchCourse(id);

  if (!course) {
    return { title: "Course Not Found" };
  }

  const title = course.name || course.courseName || "Course";
  const description =
    course.description || course.overview
      ? stripMarkdown((course.description || course.overview).replace(/<[^>]*>/g, ""))
      : `${title} - Find course details, eligibility, fees, and career prospects on Clarix Education.`;

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/courses/${id}`,
      type: "website",
      ...(course.image ? { images: [{ url: course.image, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 160),
      ...(course.image ? { images: [course.image] } : {}),
    },
    alternates: {
      canonical: `/courses/${id}`,
    },
  };
}

export default async function CourseLayout({ params, children }: Props) {
  const { id } = await params;
  const course = await fetchCourse(id);

  const jsonLd = course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.name || course.courseName,
        url: `${SITE_URL}/courses/${id}`,
        ...(course.description
          ? { description: stripMarkdown(course.description.replace(/<[^>]*>/g, "")).slice(0, 300) }
          : {}),
        ...(course.duration ? { timeRequired: course.duration } : {}),
        ...(course.level || course.degreeType
          ? { educationalLevel: course.level || course.degreeType }
          : {}),
        provider: {
          "@type": "Organization",
          name: "Clarix Education",
          url: SITE_URL,
        },
        ...(course.stream?.name
          ? { about: { "@type": "Thing", name: course.stream.name } }
          : {}),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
