import type { Metadata } from "next";
import { stripMarkdown } from "@/lib/helperFunctions/stripMarkdown";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clarix.in";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const college = await fetchCollege(id);

  if (!college) {
    return { title: "College Not Found" };
  }

  const title = college.name || college.collegeName || "College";
  const descriptionParts: string[] = [];
  if (college.location || college.city || college.state) {
    descriptionParts.push(
      `Located in ${college.location || [college.city, college.state].filter(Boolean).join(", ")}`
    );
  }
  if (college.establishedYear) {
    descriptionParts.push(`Established in ${college.establishedYear}`);
  }
  if (college.collegeType || college.type) {
    descriptionParts.push(college.collegeType || college.type);
  }
  const description =
    descriptionParts.length > 0
      ? `${title} - ${descriptionParts.join(". ")}. Find courses, fees, placements, and more on Clarix Education.`
      : `${title} - Find courses, fees, placements, admissions, and more on Clarix Education.`;

  const image = college.bannerImage || college.logo || college.image;

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/colleges/${id}`,
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
      canonical: `/colleges/${id}`,
    },
  };
}

export default async function CollegeLayout({ params, children }: Props) {
  const { id } = await params;
  const college = await fetchCollege(id);

  const jsonLd = college
    ? {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: college.name || college.collegeName,
        url: `${SITE_URL}/colleges/${id}`,
        ...(college.description ? { description: stripMarkdown(college.description) } : {}),
        ...(college.logo ? { logo: college.logo } : {}),
        ...(college.bannerImage ? { image: college.bannerImage } : {}),
        ...(college.location || college.city
          ? {
              address: {
                "@type": "PostalAddress",
                ...(college.city
                  ? { addressLocality: college.city }
                  : {}),
                ...(college.state
                  ? { addressRegion: college.state }
                  : {}),
                ...(college.location
                  ? { addressLocality: college.location }
                  : {}),
                addressCountry: "IN",
              },
            }
          : {}),
        ...(college.establishedYear
          ? { foundingDate: String(college.establishedYear) }
          : {}),
        ...(college.officialWebsite
          ? { sameAs: [college.officialWebsite] }
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
