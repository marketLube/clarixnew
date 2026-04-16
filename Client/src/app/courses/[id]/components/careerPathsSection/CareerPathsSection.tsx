import ContentWrapper from "@/components/Ui/ContentWrapper";

export default function CareerPathsSection({ course }: any) {
  return (
    <section className="w-full bg-white py-6 sm:py-10 md:py-12 lg:py-16">
      <ContentWrapper className="flex flex-col gap-5 md:gap-8 lg:gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 items-center text-center">
          <h2 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[46px] xl:leading-[52px] text-[#162447] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px]">
            {course?.careerOpportunities?.title || "Career Paths & Future Opportunities"}
          </h2>
          <p className="font-poppins text-[13px] md:text-[15px] lg:text-[16px] leading-[18px] md:leading-[20px] text-[#767e92] max-w-[332px]">
            Job roles vary based on college, specialization, and placement performance
          </p>
        </div>

        {/* Career Paths Grid */}
        <div className="flex flex-col gap-[14px]">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px]">
            {course?.careerOpportunities?.items?.slice(0, 4).map((path: any) => (
              <div
                key={path?._id}
                className="bg-[#f6f7ff] rounded-[20px] p-5 md:p-6 h-auto min-h-[160px] md:h-[224px] flex flex-col gap-4 md:gap-6"
              >
                <h3 className="font-poppins font-medium leading-tight md:leading-[28px] text-[#162447] text-[20px] md:text-[24px] tracking-[-0.48px]">
                  {path?.title}
                </h3>
                <p className="font-poppins text-[15px] md:text-[16px] leading-[20px] text-[#767e92]">
                  {path?.description}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px]">
            {course?.careerOpportunities?.items?.slice(4, 8).map((path: any) => (
              <div
                key={path.id}
                className="bg-[#f6f7ff] rounded-[20px] p-5 md:p-6 h-auto min-h-[160px] md:h-[224px] flex flex-col gap-4 md:gap-6"
              >
                <h3 className="font-poppins font-medium leading-tight md:leading-[28px] text-[#162447] text-[20px] md:text-[24px] tracking-[-0.48px]">
                  {path.title}
                </h3>
                <p className="font-poppins text-[15px] md:text-[16px] leading-[20px] text-[#767e92]">
                  {path.description}
                </p>
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px]">
            {course?.careerOpportunities?.items?.slice(8, 12).map((path: any) => (
              <div
                key={path.id}
                className="bg-[#f6f7ff] rounded-[20px] p-5 md:p-6 h-auto min-h-[160px] md:h-[224px] flex flex-col gap-4 md:gap-6"
              >
                <h3 className="font-poppins font-medium leading-tight md:leading-[28px] text-[#162447] text-[20px] md:text-[24px] tracking-[-0.48px]">
                  {path.title}
                </h3>
                <p className="font-poppins text-[15px] md:text-[16px] leading-[20px] text-[#767e92]">
                  {path.description}
                </p>
              </div>
            ))}
          </div>
        </div>


      </ContentWrapper>
    </section>
  );
}
