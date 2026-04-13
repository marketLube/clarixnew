import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import GridWrapper from "@/components/Ui/GridWrapper";
import CampusLifeCard from "./components/CampusLifeCard";
import { CAMPUS_LIFE_DATA } from "@/app/utilities/DummyData";



export default function CampusLifeSection({ college }: any) {
  const campusLifeItems = college?.campusLife || [];

  if (campusLifeItems.length === 0) return null;

  return (
    <div className="bg-[var(--background)] py-[2rem] ">
      <ContentWrapper>
        <div className="flex flex-col  gap-4 mb-10">
          <SectionHeading title="Campus Life" />
          <SectionDescription className="max-w-[26rem]">
            Experience the energy, culture, and everyday life on campus.
          </SectionDescription>
        </div>
        <GridWrapper colsDesktop={3}>
          {campusLifeItems.map((item: any, index: number) => (
            <CampusLifeCard
              key={index}
              title={item.title}
              count={index + 1}
              pills={item.tags}
              description={item.description}
              imageUrl={item.image}
            />
          ))}
        </GridWrapper>
      </ContentWrapper>
    </div>
  );
}
