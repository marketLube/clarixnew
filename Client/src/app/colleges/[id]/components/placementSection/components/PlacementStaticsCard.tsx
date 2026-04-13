export default function PlacementStatisticsCard({ college }: any) {
  return (
    <div
      className="relative w-full rounded-[20px] border-[10px] overflow-hidden"
      style={{
        borderColor: "rgba(147, 97, 255, 0.2)",
        backgroundImage:
          "linear-gradient(204.286deg, rgb(22, 3, 64) 11.249%, rgb(81, 51, 146) 78.84%)",
      }}
    >
      <div className="px-3 md:px-6 pt-3 md:pt-6 pb-3 md:pb-6 text-[var(--white-color)]">
        <h3 className="text-[18px] md:text-[22px] leading-[22px] md:leading-[26px] font-medium mb-2 md:mb-4 font-helvetica">
          Placement Statistics
        </h3>

        <div className="grid grid-cols-2 gap-x-2 md:gap-x-10 gap-y-2 md:gap-y-4 mb-2 md:mb-6" >
          <div className="flex flex-col gap-[2px] md:gap-[13px] w-full md:w-[188px]">
            <p className="text-[16px] leading-5 tracking-[-0.32px] text-[rgba(255,255,255,0.8)]">
              Average Placement
            </p>
            <p className="text-[24px] leading-7 tracking-[-0.48px] font-medium">
              {college?.averageSalary || "₹8.5 LPA"}
            </p>
          </div>

          <div className="flex flex-col gap-[2px] md:gap-[13px] w-full md:w-[188px]">
            <p className="text-[16px] leading-5 tracking-[-0.32px] text-[rgba(255,255,255,0.8)]">
              Placement Rate
            </p>
            <p className="text-[24px] leading-7 tracking-[-0.48px] font-medium">
              {college?.placementPercentage + "%" || "92%"}
            </p>
            <p className="text-[12px] leading-5 tracking-[-0.24px] text-[rgba(255,255,255,0.6)]">
              Class of {new Date(college?.createdAt).getFullYear() - 1}
            </p>
          </div>

          <div className="flex flex-col gap-[2px] md:gap-[14px] w-full md:w-[188px]">
            <p className="text-[16px] leading-5 tracking-[-0.32px] text-[rgba(255,255,255,0.8)]">
              Highest Package
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-[24px] leading-7 tracking-[-0.48px] font-medium">
                {college?.highestSalary}
              </p>
              <p className="text-[12px] leading-5 tracking-[-0.24px] text-[rgba(255,255,255,0.6)]">
                Microsoft
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[2px] md:gap-[14px] w-full md:w-[188px]">
            <p className="text-[16px] leading-5 tracking-[-0.32px] text-[rgba(255,255,255,0.8)]">
              Top Recruiters
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-[24px] leading-7 tracking-[-0.48px] font-medium">
                {college?.recruitersCount} +
              </p>
              <p className="text-[12px] leading-5 tracking-[-0.24px] text-[rgba(255,255,255,0.6)]">
                companies visited
              </p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[rgba(255,255,255,0.4)] mb-6" />

        <div className="flex flex-col gap-3">
          <p className="text-[20px] leading-[24px] font-medium font-helvetica">
            Popular Courses
          </p>
          <div className="flex flex-wrap gap-2">
            {college?.courses?.slice(0, 3).map((course: any, index: number) => (
              <span
                key={course?._id || index}
                className="px-3 py-2 rounded-[60px] text-[14px] leading-5 border border-[rgba(255,255,255,0.46)] text-[var(--white-color)]"
                style={{ backgroundColor: "rgba(255,255,255,0.09)" }}
              >
                {course?.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
