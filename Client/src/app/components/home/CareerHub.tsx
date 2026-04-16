"use client";
import Image from "next/image";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import { Button } from "@/components/common/Button";
import CareerCard from "@/components/common/Cards/careerCard";
import { ArrowRightIcon } from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useRouter } from "next/navigation";
import { useJobs } from "@/hooks/job/useJobs";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import Loader from "@/components/common/Loader";

const accentZigzag = "/zigzag.svg";

export default function CareerHub() {
  const router = useRouter();
  const { jobs, isLoading, isError } = useJobs({
    limit: 2,
    status: "active",
    sortBy: "createdAt",
    order: "desc",
  });

  // Map API job data to CareerCard props
  const jobCards = jobs.map((job) => ({
    id: job._id,
    title: job.jobTitle,
    company: job.companyName,
    employmentType: job.jobType === "Full Time" ? "Full-time" : job.jobType,
    workMode: job.location?.toLowerCase().includes("remote")
      ? "Remote"
      : "On-site",
  }));

  // CMS content for Career Hub section
  const { careerHub } = useCmsHomepage();
  const title = careerHub?.title ?? "";
  const description = careerHub?.paragraph ?? "";

  // Main imagery from CMS (careerHub.images)
  const cmsImages = (careerHub?.images ?? []).filter(Boolean);
  const bottomImageSrc = cmsImages[0];
  const topImageSrc = cmsImages[1];
  const centralImageSrc = cmsImages[2];

  // Recruiter logos from CMS (careerHub.logo)
  const cmsLogos = (careerHub?.logo ?? []).filter(Boolean);

  const firstRowLogos = cmsLogos.slice(0, 3);
  const secondRowLogos = cmsLogos.slice(3, 6);

  return (
    <section className="w-full bg-gradient-to-br from-[#060b2e] via-[#20135f] to-[#5b2bbd] py-4 sm:py-16 ">
      <ContentWrapper className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:flex-row lg:items-center lg:justify-between px-4 sm:px-6 md:px-10">
        {/* Left: Heading, description, CTA, and job cards */}
        <div className="flex-1 space-y-2 md:space-y-8 text-white w-full">
          {/* Small pill label */}
          <div className="inline-flex items-center rounded-full border border-white/40 px-4 py-2">
            <span className="font-poppins text-[14px] leading-[20px]">
              Career Hub
            </span>
          </div>

          {/* Main heading */}
          <div className="">
            <SectionHeading
              title={title}
              className="text-[22px] leading-[28px] sm:text-[26px] sm:leading-[32px] md:text-[32px] md:leading-[38px] lg:text-[40px] lg:leading-[44px] xl:text-[48px] xl:leading-[52px] text-[#faf9f6]"
              style={{
                color: "#faf9f6",
              }}
            />
          </div>

          {/* Description + CTA */}
          <div className="mt-4 flex flex-col gap-6 ">
            <SectionDescription className="text-[rgba(255,255,255,0.8)]">
              {description}
            </SectionDescription>
          </div>
          <Button
            variant="secondaryRound"
            size="md"
            className="mt-2 flex items-center gap-2 rounded-[30px] bg-white px-4 py-2 text-[14px] md:px-6 md:py-[10px] md:text-[16px] font-poppins leading-[20px] !text-[#162447]"
            onClick={() => router.push("/jobs-internships")}
          >
            View All Opportunities
            <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" width={24} height={24} fill="#162447" />
          </Button>

          {/* Job cards */}
          <div className="mt-6 space-y-4">
            {isLoading ? (
              <Loader containerClassName="py-4" color="white" label="Loading jobs..." labelClassName="text-white/80" />
            ) : isError ? (
              <div className="text-white/80">Failed to load jobs. Please try again later.</div>
            ) : jobCards.length === 0 ? (
              <div className="text-white/80">No jobs available at the moment.</div>
            ) : (
              jobCards.map((job) => (
                <CareerCard
                  key={job.id}
                  title={job.title}
                  company={job.company}
                  employmentType={job.employmentType}
                  workMode={job.workMode}
                  jobId={job.id}
                />
              ))
            )}
          </div>
        </div>

        {/* Right: Career imagery collage */}
        <div className="relative flex-1">
          <div className="relative mx-auto grid max-w-[520px] gap-3 sm:gap-4 grid-cols-2 md:gap-6">
            {/* Left column: bottom career image + recruiters */}
            <div className="flex min-h-[260px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[540px] flex-col justify-end gap-3 sm:gap-4 md:gap-6">
              <div className="h-[150px] sm:h-[220px] rounded-[12px] border border-white/20 bg-white/10 p-[6px] backdrop-blur-sm">
                <div className="h-full w-full overflow-hidden rounded-[10px]">
                  {bottomImageSrc && (
                    <Image
                      src={bottomImageSrc}
                      alt="Healthcare professional pursuing a career opportunity"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 260px"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-4">
                <div className="w-full rounded-[12px] border border-white/20 bg-white/80 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 ">
                    {firstRowLogos.map((logoSrc, index) =>
                      logoSrc ? (
                        <Image
                          key={`recruiter-row1-${index}`}
                          src={logoSrc}
                          alt={`Top recruiter company logo ${index + 1}`}
                          width={80}
                          height={24}
                          className="h-6 w-auto object-contain"
                        />
                      ) : null
                    )}
                  </div>{" "}
                  <div className="flex flex-wrap items-center justify-between gap-3 ">
                    {secondRowLogos.map((logoSrc, index) =>
                      logoSrc ? (
                        <Image
                          key={`recruiter-row2-${index}`}
                          src={logoSrc}
                          alt={`Top recruiter company logo ${index + 4}`}
                          width={80}
                          height={24}
                          className="h-6 w-auto object-contain"
                        />
                      ) : null
                    )}
                  </div>
                </div>
                <Image
                  src={accentZigzag}
                  alt=""
                  width={120}
                  height={60}
                  className="h-[60px] w-auto max-w-full object-contain"
                />
              </div>
            </div>

            {/* Right column: top + central images */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
              <div className="h-[130px] sm:h-[190px] rounded-[12px] border border-white/20 bg-white/10 p-[6px] backdrop-blur-sm">
                <div className="h-full w-full overflow-hidden rounded-[10px]">
                  {topImageSrc && (
                    <Image
                      src={topImageSrc}
                      alt="Students collaborating on a project together"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 260px"
                    />
                  )}
                </div>
              </div>
              <div className="h-[220px] sm:h-[320px] rounded-[12px] border border-white/20 bg-white/10 p-[6px] backdrop-blur-sm">
                <div className="h-full w-full overflow-hidden rounded-[10px]">
                  {centralImageSrc && (
                    <Image
                      src={centralImageSrc}
                      alt="Professional working in their career field"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 260px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
