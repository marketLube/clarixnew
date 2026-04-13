import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import GridWrapper from "@/components/Ui/GridWrapper";
import PlacementStatisticsCard from "../placementSection/components/PlacementStaticsCard";

type KeyHighlight = {
  label: string;
  value: string;
};

const KEY_HIGHLIGHTS: KeyHighlight[] = [
  { label: "Founded", value: "1949" },
  { label: "Affiliated University", value: "Mumbai University" },
  { label: "Students", value: "8,500+" },
  { label: "Accreditation", value: "NAAC A+ | NBA" },
  { label: "Type", value: "Private" },
  { label: "Campus Size", value: "85 Acres" },
];

export default function OverviewSection({ college }: any) {
  const highlights = [
    {
      label: "Founded", value: college?.establishedYear
    },
    {
      label: "Affiliated University", value: college?.university?.name
    },
    {
      label: "Students", value: college?.students
    },
    {
      label: "Type", value: college?.type
    },
    {
      label: "Campus Size", value: college?.campusSize
    },
    {
      label: "Category", value: college?.category
    }
  ]
  return (
    <ContentWrapper>
      <GridWrapper colsDesktop={2} className="gap-10 items-start ">
        <div className="justify-self-start flex flex-col gap-2 md:gap-6 h-full justify-center">
          <SectionHeading title="Overview" />
          <SectionDescription className="max-w-[26rem]">
            {college?.description}
          </SectionDescription>

          <div className="flex flex-col gap-[10px] md:gap-[22px]">
            <h3 className="text-[24px] leading-[28px] tracking-[-0.48px] font-medium text-[var(--text-headline)] font-helvetica">
              Key Highlights
            </h3>

            <div className="flex flex-wrap gap-[14px] text-[10px] md:text-[16px] leading-5">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="relative flex flex-col gap-[2px] items-start px-1 md:px-3 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[9px] after:h-[24px] after:w-px after:bg-[#E4E4E4] last:after:hidden"
                >
                  <p className="text-[12px] md:text-[16px] tracking-[-0.28px] text-[var(--text-sub)]">
                    {item.label}
                  </p>
                  <p className="text-[12px] md:text-[16px] tracking-[-0.32px] text-[var(--text-headline)] font-medium font-helvetica">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="justify-self-end">
          <PlacementStatisticsCard college={college} />
        </div>
      </GridWrapper>
    </ContentWrapper>
  );
}
