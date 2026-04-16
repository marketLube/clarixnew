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

async function fetchJob(id: string) {
  try {
    const res = await fetch(`${API_URL}/job/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function formatSalary(salary: {
  min?: number;
  max?: number;
  unit?: string;
}): string {
  if (!salary) return "";
  const parts: string[] = [];
  if (salary.min) parts.push(String(salary.min));
  if (salary.max) parts.push(String(salary.max));
  const range = parts.join(" - ");
  return salary.unit ? `${range} ${salary.unit}` : range;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchJob(id);

  if (!job) {
    return { title: "Job Not Found" };
  }

  const title = `${job.jobTitle || "Job"} at ${job.companyName || "Company"}`;
  const salaryStr = formatSalary(job.salary);
  const descriptionParts = [
    job.jobType,
    job.location,
    salaryStr ? `Salary: ${salaryStr}` : null,
  ].filter(Boolean);
  const description = stripMarkdown(
    job.shortDescription ||
    `${title}${descriptionParts.length > 0 ? ` - ${descriptionParts.join(" | ")}` : ""}. Apply now on Clarix Education.`
  );

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `${SITE_URL}/jobs-internships/${id}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: description.slice(0, 160),
    },
    alternates: {
      canonical: `/jobs-internships/${id}`,
    },
  };
}

export default async function JobLayout({ params, children }: Props) {
  const { id } = await params;
  const job = await fetchJob(id);

  const jsonLd = job
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.jobTitle,
        url: `${SITE_URL}/jobs-internships/${id}`,
        ...(job.shortDescription || job.aboutJob
          ? {
              description: stripMarkdown(
                (job.shortDescription || job.aboutJob)
                  .replace(/<[^>]*>/g, "")
              ).slice(0, 500),
            }
          : {}),
        ...(job.createdAt ? { datePosted: job.createdAt } : {}),
        ...(job.jobType ? { employmentType: job.jobType.toUpperCase().replace(" ", "_") } : {}),
        ...(job.location
          ? {
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: job.location,
                  addressCountry: "IN",
                },
              },
            }
          : {}),
        hiringOrganization: {
          "@type": "Organization",
          name: job.companyName,
          ...(job.companyWebsite ? { sameAs: job.companyWebsite } : {}),
          ...(job.employeeSize
            ? { numberOfEmployees: { "@type": "QuantitativeValue", value: job.employeeSize } }
            : {}),
        },
        ...(job.salary && (job.salary.min || job.salary.max)
          ? {
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: "INR",
                value: {
                  "@type": "QuantitativeValue",
                  ...(job.salary.min ? { minValue: job.salary.min } : {}),
                  ...(job.salary.max ? { maxValue: job.salary.max } : {}),
                  unitText: job.salary.unit || "YEAR",
                },
              },
            }
          : {}),
        ...(job.industry ? { industry: job.industry } : {}),
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
