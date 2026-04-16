import ContentWrapper from "@/components/Ui/ContentWrapper";
import Image from "next/image";
import DescriptionImg from "../../../../../../public/images/coursedescr.png";

export default function DescriptionSection({ course }: any) {
  return (
    <section className="w-full bg-[#FDFDFD] py-6 sm:py-10 md:py-12 lg:py-16">
      <ContentWrapper className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-10 lg:gap-[80px] xl:gap-[118px]">
        <div className="w-full lg:max-w-[700px] flex flex-col gap-3 md:gap-5 lg:gap-6">
          <h2 className="text-[#162447] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] font-medium tracking-[-0.04em] md:tracking-[-0.05em] lg:tracking-[-0.06em]">
            {course?.description?.title}
          </h2>
          <div className="text-[#767E92] text-[13px] md:text-[15px] lg:text-[16px] leading-[18px] md:leading-[20px] space-y-3 md:space-y-4">
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
