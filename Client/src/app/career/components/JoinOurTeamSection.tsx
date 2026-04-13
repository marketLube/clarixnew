"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { Button } from "@/components/common/Button";
import { ArrowRightIcon } from "@/components/common/Icons";
import { SearchIcon } from "@/components/common/Icons";
import { useJobs } from "@/hooks/job/useJobs";
import { useCmsCareerPage } from "@/hooks/cms/useCmsCareerpage";
import Loader from "@/components/common/Loader";

export default function JoinOurTeamSection() {
  const router = useRouter();
  const { thirdSection } = useCmsCareerPage();
  const categories = thirdSection?.jobCategories || [];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { jobs, isLoading } = useJobs({
    search: searchQuery,
  });

  if (thirdSection?.enabled === false) return null;

  return (
    <section id="open-roles" className="bg-[#f6f7ff] py-8 md:py-20">
      <ContentWrapper className="flex flex-col gap-8 md:gap-[30px] items-center">
        <div className="flex flex-col gap-4 md:gap-[30px] items-center text-center max-w-[746px]">
          <h2 className="font-helvetica font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[22px] md:text-[48px] tracking-[-0.96px] max-w-[375px]">
            {thirdSection?.primaryHeadline}
          </h2>
          <p className="font-poppins leading-[20px] text-[#767e92] text-[14px] md:text-[16px] text-center">
            {thirdSection?.subHeadline}
          </p>
        </div>

        <div className="bg-white rounded-[20px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] w-full p-4 md:p-[34px]">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[166px] items-start lg:items-center justify-between mb-6">
            <div className="flex flex-col gap-[26px]">
              <h3 className="font-helvetica font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
                Open Roles
              </h3>
              <div className="flex gap-[10px] items-center flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`border-[0.5px] px-4 py-2 md:px-[20px] md:py-[16px] rounded-[50px] font-poppins text-[14px] md:text-[16px] leading-[20px] transition-all whitespace-nowrap ${selectedCategory === category
                      ? "bg-[#513392] border-[#dac9ff] text-white shadow-sm"
                      : "bg-white border-[#e2e4e8] text-[#767e92] hover:bg-gray-50"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#f6f7ff] border-[0.5px] border-[rgba(147,97,255,0.2)] rounded-[90px] h-auto md:h-[47px] flex items-center pl-3 md:pl-[18px] pr-1 md:pr-[4px] py-1 md:py-[4px] gap-[6px] w-full lg:w-auto lg:flex-1 lg:max-w-[400px]">
              <div className="flex items-center gap-[6px] flex-1 min-w-0">
                <SearchIcon
                  width={20}
                  height={20}
                  fill="#767e92"
                  className="flex-shrink-0 md:w-6 md:h-6"
                />
                <input
                  type="text"
                  placeholder="Search Roles"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none font-poppins text-[14px] md:text-[16px] leading-[20px] text-[#767e92] placeholder:text-[#767e92] flex-1 min-w-0"
                />
              </div>
              <button className="bg-[#513392] rounded-[50px] px-4 py-2 md:px-[22px] md:py-[14px] text-white font-poppins text-[12px] md:text-[16px] leading-[16px] md:leading-[20px] hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap flex-shrink-0">
                Search Now
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {isLoading ? (
              <Loader fullPage label="Loading jobs..." />
            ) : jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div
                  key={job._id}
                  className={`bg-white h-auto sm:h-[80px] py-4 sm:py-0 flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 sm:px-4 gap-4 ${index !== jobs.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                >
                  <div className="flex flex-col sm:px-4 py-1 sm:py-[10px] flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                      <div className="flex flex-col">
                        <p className="font-helvetica font-normal leading-tight md:leading-[28px] text-[#162447] text-[16px] md:text-[20px] tracking-[-0.4px]">
                          {job.jobTitle}
                        </p>
                        <p className="font-helvetica font-light leading-tight md:leading-[28px] text-[#767e92] text-[14px] md:text-[20px] tracking-[-0.4px]">
                          {job.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border border-[#513392] bg-white text-[#513392] px-4 py-2 md:px-[20px] md:py-[10px] rounded-[30px] w-full sm:w-auto shrink-0 justify-center"
                    onClick={() =>
                      router.push(`/jobs-internships/${job._id}?fromCareer=true`)
                    }
                  >
                    <div className="flex items-center gap-[4px]">
                      <span className="font-poppins text-[14px] md:text-[16px] leading-[20px]">
                        Apply Now
                      </span>
                      <ArrowRightIcon
                        width={20}
                        height={20}
                        fill="currentColor"
                        className="md:w-6 md:h-6"
                      />
                    </div>
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#767e92]">No jobs found.</div>
            )
            }
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
