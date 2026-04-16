import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import RecruitersCard from "./components/RecruitersCard";
import GridWrapper from "@/components/Ui/GridWrapper";
import { Button } from "@/components/common/Button";
import { ChevronDownIcon } from "@/components/common/Icons";

export default function RecruiterSection({ college }: any) {
  return (
    <div className="py-[2rem] ">
      <ContentWrapper className="flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <SectionHeading title="Top Recruiters" />
          <SectionDescription className="md:max-w-[24rem] max-w-[18rem]">
            Meet the brands that turn classroom learning into real careers.
          </SectionDescription>
        </div>
        <div className="md:px-[6rem] px-4 w-full">
          <GridWrapper colsDesktop={4} colsMobile={2} colsTablet={3} className="gap-3 md:gap-4">
            {college?.recruiters?.length > 0 ? (
              college.recruiters.map((recruiter: any, index: number) => (
                <RecruitersCard
                  key={index}
                  companyName={recruiter.companyName}
                  jobRoles={recruiter.jobTitle}
                  hiringInfo={recruiter.hiringDuration}
                  logoUrl={recruiter.logo}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No recruiters information available</div>
            )}
          </GridWrapper>
        </div>
        <Button
          variant="outline"
          className="w-fit flex items-center justify-center gap-2"
        >
          See More <ChevronDownIcon width={16} height={16} fill="black" />{" "}
        </Button>
      </ContentWrapper>
    </div>
  );
}
