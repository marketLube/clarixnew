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
  // Try city first, then top-up with state-level matches so we always
  // surface enough similar colleges even if the city has few entries.
  const { colleges: cityColleges, isLoading: cityLoading } = useColleges({
    city: city || undefined,
    limit: 8,
  });
  const { colleges: stateColleges, isLoading: stateLoading } = useColleges({
    city: state || undefined,
    limit: 8,
  });

  const cityFiltered = cityColleges.filter(
    (c: any) => c._id !== currentCollegeId
  );
  const stateFiltered = stateColleges.filter(
    (c: any) =>
      c._id !== currentCollegeId &&
      !cityFiltered.some((cc: any) => cc._id === c._id)
  );

  const relatedColleges = [...cityFiltered, ...stateFiltered].slice(0, 8);

  const isLoading = cityLoading && stateLoading;
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

          {/* Mobile: horizontal scroll with peek of next card */}
          <div className="md:hidden -mx-4">
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
              {relatedColleges.map((college: any) => (
                <div
                  key={college._id}
                  className="snap-start shrink-0 w-[72%]"
                >
                  <CollegeCard college={college} />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet / Desktop: grid */}
          <div className="hidden md:grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedColleges.map((college: any) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
