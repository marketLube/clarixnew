import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import PlacementTrendsCard from "./components/PlacementTrendsCard";
import PlacementStatCard from "./components/PlacementStatCard";
import { type InternshipStat } from "./components/PlacementRightBottomCard";
import PlacementRightBottomCard from "./components/PlacementRightBottomCard";
import GridWrapper from "@/components/Ui/GridWrapper";

import { useMemo } from "react";

export default function PlacementSection({ college }: any) {
  const internshipStats = useMemo(() => {
    return [
      { label: "Students with Internships (%)", value: `${college?.studentsWithInternships || 0}%`, isBadge: true, badgeColor: "green" },
      { label: "Avg Stipend", value: `₹${(college?.avgStipend || 0).toLocaleString('en-IN')}` },
      { label: "PPO Conversion Rate (%)", value: `${college?.ppoConversionRate || 0}%`, isBadge: true, badgeColor: "purple" },
    ];
  }, [college]);

  const alumniStats = useMemo(() => {
    return [
      { label: "In Fortune 500 (%)", value: `${college?.alumniInFortune500 || 0}%`, isBadge: true, badgeColor: "green" },
      { label: "Entrepreneurs (%)", value: `${college?.alumniEntrepreneurs || 0}%` },
      { label: "Higher Studies Abroad (%)", value: `${college?.alumniHigherStudiesAbroad || 0}%` },
    ];
  }, [college]);
  return (
    <ContentWrapper>
      <div className="flex flex-col gap-4">
        <SectionHeading title="Placements" />
        <SectionDescription className="max-w-[24rem]">
          Get a transparent view of salaries, recruiters, placement rates, and
          career outcomes based on verified college data and real student
          experiences.
        </SectionDescription>
      </div>

      <GridWrapper colsDesktop={2} className="gap-2">
        <div className="mt-8">
          <PlacementTrendsCard stats={college?.placementTrends} />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex gap-2">
            <PlacementStatCard
              label="Average Package"
              value={college?.averageSalary ? `₹${college.averageSalary} LPA` : "0 LPA"}
              className="flex-1"
            />
            <PlacementStatCard
              label="Highest Package"
              value={college?.highestSalary ? `₹${college.highestSalary} LPA` : "0 LPA"}
              className="flex-1"
            />
            <PlacementStatCard
              label="Placement Rate"
              value={college?.placementPercentage ? `${college.placementPercentage}%` : "0%"}
              className="flex-1"
            />
          </div>

          <div className="mt-2 flex flex-col gap-4 flex-1 justify-end">
            <PlacementRightBottomCard
              title="Internship Statistics"
              stats={internshipStats as InternshipStat[]}
            />
            <PlacementRightBottomCard
              title="Alumni Outcomes"
              stats={alumniStats as InternshipStat[]}
            />
          </div>
        </div>
      </GridWrapper>
    </ContentWrapper>
  );
}
