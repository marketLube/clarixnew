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
    <section className="w-full bg-[#FDFDFD] py-6 sm:py-10 md:py-12 lg:py-16">
      <ContentWrapper className="flex flex-col gap-6 md:gap-12 lg:gap-20 items-center">
        {/* Header */}
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 items-center text-center">
          <h2 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] text-[#162447] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px]">
            {course?.about?.title || "What Will You Learn?"}
          </h2>
          <p className="font-poppins text-[13px] md:text-[15px] lg:text-[16px] leading-[18px] md:leading-[20px] text-[#767e92]">
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
