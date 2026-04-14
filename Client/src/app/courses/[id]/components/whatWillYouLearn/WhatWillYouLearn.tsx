import ContentWrapper from "@/components/Ui/ContentWrapper";
import { TagIcon } from "@/components/common/Icons";

function AboutCard({ title, description }: any) {
  return (
    <div className="flex gap-[10px] items-start">
      <div className="shrink-0 mt-1">
        <TagIcon />
      </div>
      <div className="flex flex-col gap-[10px] md:gap-[18px]">
        <h3 className="font-poppins font-medium leading-[24px] md:leading-[28px] text-[#162447] text-[18px] md:text-[20px] tracking-[-0.4px]">
          {title}
        </h3>
        <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
          {description}
        </p>
      </div>
    </div>
  )
}



export default function WhatWillYouLearn({ course }: any) {
  return (
    <section className="w-full bg-[#FDFDFD] py-8 md:py-16">
      <ContentWrapper className="flex flex-col gap-8 md:gap-20 items-center">
        {/* Header */}
        <div className="flex flex-col gap-4 md:gap-6 items-center text-center">
          <h2 className="font-poppins font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[22px] md:text-[40px] lg:text-[48px] tracking-[-0.96px]">
            {course?.about?.title || "What Will You Learn?"}
          </h2>
          <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
            {course?.about?.description || "Every module is crafted to match industry requirements"}
          </p>
        </div>

        {/* Learning Items Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[47px]">
          {course?.about?.points?.map((item: any) => (
            <AboutCard key={item.id} title={item.title} description={item.description} />
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
}
