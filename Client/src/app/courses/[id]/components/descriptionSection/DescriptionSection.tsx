import ContentWrapper from "@/components/Ui/ContentWrapper";
import Image from "next/image";
import DescriptionImg from "../../../../../../public/images/coursedescr.png";

export default function DescriptionSection({ course }: any) {
  return (
    <section className="w-full bg-[#FDFDFD] py-8 md:py-16">
      <ContentWrapper className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-[118px]">
        <div className="w-full lg:max-w-[700px] flex flex-col gap-4 md:gap-6">
          <h2 className="text-[#162447] text-[22px] md:text-[40px] lg:text-[48px] leading-[32px] md:leading-[44px] lg:leading-[48px] font-medium tracking-[-0.06em]">
            {course?.description?.title}
          </h2>
          <div className="text-[#767E92] text-[14px] md:text-[15px] lg:text-[16px] leading-[20px] space-y-4">
            <p>
              {course?.description?.content}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[557px] h-[260px] md:h-[320px] lg:h-[377px] rounded-[20px] overflow-hidden">
          <div className="relative w-full h-full rounded-[20px] bg-gradient-to-br from-[#160340] to-[#513392]">
            <Image
              src={course?.description?.image || DescriptionImg}
              alt={`${course?.name || "Course"} overview`}
              fill
              className="rounded-[20px] object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 557px"
            />
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
