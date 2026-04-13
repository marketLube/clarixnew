import AdmissionsDeadlineCard from "@/app/colleges/[id]/components/admissionSection/components/AdmissionsDeadlineCard";
import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import GridWrapper from "@/components/Ui/GridWrapper";
import AdmissionRouteCard from "./components/AdmissionRouteCard";
import { Button } from "@/components/common/Button";
import { ArrowRightIcon } from "@/components/common/Icons";
import InfoTable from "../common/InfoTable";
import FormateDate from "@/lib/helperFunctions/FormateDate";

export default function AdmissionSection({ college }: any) {

  let admissionTable = [
    { label: "Application Opens", value: FormateDate(college?.applicationOpeningDate) },
    { label: "Application Deadline", value: FormateDate(college?.applicationClosingDate) },
    { label: "Entranc Exam Date", value: FormateDate(college?.entranceExamDate) },
    { label: "Merit List Announcement", value: FormateDate(college?.meritListAnnouncementDate) },
    { label: "Counselling Rounds", value: FormateDate(college?.counsellingStartsFrom) },
    { label: "Academic Session Starts", value: FormateDate(college?.accademicSectionStartsFrom) },
  ]




  return (
    <div>
      <div>
        <ContentWrapper>
          <GridWrapper colsDesktop={2} className="gap-4 md:gap-10 items-start">
            <div className="justify-self-start flex flex-col gap-2 md:gap-6 h-full justify-center">
              <SectionHeading title="Admissions" />
              <SectionDescription className="max-w-[24rem]">
                Everything you need to know about eligibility, dates, entrance
                requirements, and the admission process.
              </SectionDescription>
            </div>

            <div className="justify-self-center md:justify-self-end">
              <AdmissionsDeadlineCard deadLine={college?.applicationClosingDate} />
            </div>
          </GridWrapper>
        </ContentWrapper>
      </div>

      <div>
        <ContentWrapper>
          <div className="grid grid-cols-1 gap-3 md:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,550px)] items-stretch">
            <div className=" h-full">
              <InfoTable title="Admission Timeline" items={admissionTable} />
            </div>

            <div className="flex flex-col gap-2 justify-end items-end  h-full">
              {college?.admissionMode && college.admissionMode.length > 0 ? (
                college.admissionMode.map((mode: any, index: number) => (
                  <AdmissionRouteCard
                    key={index}
                    label={mode.label}
                    title={mode.mode}
                    description={mode.description}
                  />
                ))
              ) : (
                <div className="text-gray-500 text-sm">No admission routes available</div>
              )}
              <div className="w-full">
                <GridWrapper colsDesktop={2} colsMobile={2} colsTablet={2} className="gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 md:gap-4 text-[13px] md:text-[16px] text-black leading-5 w-full py-3 border-[var(--primary-color)]"
                  >
                    check eligibility{" "}
                    <ArrowRightIcon width={20} height={20} fill="black" />
                  </Button>
                  <Button
                    variant="primary"
                    className="flex items-center justify-center gap-2 md:gap-4 text-[13px] md:text-[16px] text-white leading-5 w-full py-3 bg-[var(--primary-color)]"
                  >
                    Apply Now <ArrowRightIcon width={20} height={20} />
                  </Button>
                </GridWrapper>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
}
