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

async function fetchExam(id: string) {
  try {
    const res = await fetch(`${API_URL}/exam/${id}`, {
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
  const exam = await fetchExam(id);

  if (!exam) {
    return { title: "Exam Not Found" };
  }

  const title = exam.fullName
    ? `${exam.fullName} (${exam.shortName})`
    : exam.shortName || "Exam";
  const descriptionParts = [
    stripMarkdown(exam.description?.replace(/<[^>]*>/g, "") || "").slice(0, 100) || null,
    exam.examDate ? `Exam Date: ${exam.examDate}` : null,
    exam.collegesAccepting
      ? `${exam.collegesAccepting} colleges accepting`
      : null,
  ].filter(Boolean);
  const description =
    descriptionParts.length > 0
      ? descriptionParts.join(". ")
      : `${title} - Find exam dates, eligibility, syllabus, and results on Clarix Education.`;

  const image = exam.logo;

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/exams/${id}`,
      type: "website",
      ...(image ? { images: [{ url: image, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 160),
      ...(image ? { images: [image] } : {}),
    },
    alternates: {
      canonical: `/exams/${id}`,
    },
  };
}

export default async function ExamLayout({ params, children }: Props) {
  const { id } = await params;
  const exam = await fetchExam(id);

  const jsonLd = exam
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: exam.fullName || exam.shortName,
        url: `${SITE_URL}/exams/${id}`,
        ...(exam.description
          ? { description: stripMarkdown(exam.description.replace(/<[^>]*>/g, "")).slice(0, 300) }
          : {}),
        ...(exam.examDate ? { startDate: exam.examDate } : {}),
        ...(exam.registrationDate
          ? {
              offers: {
                "@type": "Offer",
                validFrom: exam.registrationDate,
                url: exam.officialWebsite || `${SITE_URL}/exams/${id}`,
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
        ...(exam.logo ? { image: exam.logo } : {}),
        ...(exam.officialWebsite
          ? { sameAs: [exam.officialWebsite] }
          : {}),
        ...(exam.stream?.name
          ? { about: { "@type": "Thing", name: exam.stream.name } }
          : {}),
        organizer: {
          "@type": "Organization",
          name: "Clarix Education",
          url: SITE_URL,
        },
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "India",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
        },
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
