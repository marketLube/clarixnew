import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import InfoTable from "../common/InfoTable";
import GridWrapper from "@/components/Ui/GridWrapper";
import CostEstimator from "./components/CostEstimator";
import {
  SCHOLARSHIP_ITEMS,
} from "@/app/utilities/DummyData";
import { BookIcon, CoffeeIcon, GraduationCapIcon } from "lucide-react";
import { BallIcon, HostelIcon, LabIcon } from "@/components/common/Icons";

export default function FeeSection({ college }: any) {
  const feeitems: any = []
  const annualfeeitems: any = [
    { label: "Avg Annual Tuition", value: college?.avgAnnualFee, icon: <GraduationCapIcon width={24} height={24} /> },
    { label: "Hostel Fee", value: college?.hostelFee, icon: <HostelIcon width={24} height={24} /> },
    { label: "Mess Fee", value: college?.messFee, icon: <CoffeeIcon width={24} height={24} />, },
    {
      label: "Library Fees",
      value: college?.libraryFee,
      icon: <BookIcon width={24} height={24} />,
    },
    {
      label: "Laboratory Fees",
      value: college?.laboratoryFee,
      icon: <LabIcon width={24} height={24} />,
    },
    {
      label: "Sports Fees",
      value: college?.sportsFee,
      icon: <BallIcon width={24} height={24} />,
    },
  ]

  const scholarshipitems: any = []

  college?.scholarships.map((scholarship: any) => {
    let obj = { label: scholarship?.scholarshipName, value: scholarship?.description, duration: scholarship?.fundingType }
    scholarshipitems.push(obj)
  })

  college?.courses.map((course: any) => {
    let obj = { label: course?.name, value: course?.fees, duration: course?.duration }
    feeitems.push(obj)
  })




  return (
    <div className="bg-[var(--background)] md:py-[2rem] py-2 mt-2 md:mt-10">
      <ContentWrapper>
        <div className="flex flex-col gap-4">
          <SectionHeading title="Fees Structure" />
          <SectionDescription className="max-w-[24rem]">
            A complete breakdown of tuition, hostel charges, and other fees for
            transparent decision-making.
          </SectionDescription>
        </div>

        <GridWrapper colsDesktop={2} className="gap-4 items-start">
          <div className="flex flex-col gap-4">
            <InfoTable
              title="Tuition Fee Breakdown"
              items={feeitems}
              showThreeColumns
              columnHeaders={["Course", "Annual Tuition Fee", "Duration"]}
            />

            <InfoTable
              title="Scholarships & Financial Aid"
              items={scholarshipitems}
              showThreeColumns
              columnHeaders={["Scholarship Name", "Details", "Maximum Coverage"]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <InfoTable
              title="Annual Fee Breakdown"
              items={annualfeeitems}
              footer={{ label: "Total Annual Cost", value: college?.annualFee }}
            />
            <CostEstimator />
          </div>
        </GridWrapper>
      </ContentWrapper>
    </div>
  );
}
