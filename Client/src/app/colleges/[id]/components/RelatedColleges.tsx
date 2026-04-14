"use client";

import React from "react";
import Link from "next/link";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import CollegeCard from "@/components/common/Cards/collageCard";
import SectionHeading from "@/components/common/Section/SectionHeading";
import { useColleges } from "@/hooks/college/useColleges";

interface RelatedCollegesProps {
  currentCollegeId: string;
  city?: string;
  state?: string;
}

export default function RelatedColleges({
  currentCollegeId,
  city,
  state,
}: RelatedCollegesProps) {
  // Fetch colleges from the same city/state
  const { colleges, isLoading } = useColleges({
    city: city || state || undefined,
    limit: 5,
  });

  // Filter out the current college
  const relatedColleges = colleges.filter(
    (c: any) => c._id !== currentCollegeId
  ).slice(0, 4);

  if (isLoading || relatedColleges.length === 0) return null;

  return (
    <section className="w-full bg-[#FDFDFD] py-8 md:py-16">
      <ContentWrapper className="px-4 sm:px-10">
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex items-center justify-between">
            <SectionHeading
              title={`Similar Colleges${city ? ` in ${city}` : state ? ` in ${state}` : ""}`}
              className="max-w-[500px]"
            />
            <Link
              href={`/colleges${city ? `?city=${encodeURIComponent(city)}` : ""}`}
              className="text-[#513392] font-poppins text-sm hover:underline whitespace-nowrap"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedColleges.map((college: any) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
