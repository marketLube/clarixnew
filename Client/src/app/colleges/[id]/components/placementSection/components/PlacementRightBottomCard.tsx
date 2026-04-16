export type InternshipStat = {
  label: string;
  value: string;
  isBadge?: boolean;
  badgeColor?: "green" | "purple";
};

type PlacementRightBottomCardProps = {
  title?: string;
  stats: InternshipStat[];
  className?: string;
};

export default function PlacementRightBottomCard({
  title = "Internship Opportunities",
  stats,
  className = "",
}: PlacementRightBottomCardProps) {
  return (
    <div
      className={`bg-[var(--white-color)] rounded-[16px] md:rounded-[20px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] w-full px-3 md:px-[18px] py-3 md:py-[18px] ${className} font-poppins`}
    >
      <div className="flex flex-col gap-[4px]">
        <div className="bg-[var(--primary-color)] inline-flex items-center justify-center px-3 md:px-[16px] py-[2px] md:py-[3px] rounded-[40px] w-fit">
          <p className="font-poppins text-[12px] leading-[16px] md:text-[16px] md:leading-[20px] text-white">
            {title}
          </p>
        </div>

        <div className="flex flex-col gap-[4px] mt-2 px-2 md:px-[16px] ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <p className="font-poppins text-[13px] leading-[18px] md:text-[16px] md:leading-[20px] text-[var(--text-headline)]">
                {stat.label}
              </p>
              {stat.isBadge ? (
                <div
                  className={`px-3 py-1 md:px-4 md:py-2 rounded-[40px] ${
                    stat.badgeColor === "green"
                      ? "bg-[rgba(0,214,75,0.07)]"
                      : "bg-[var(--primary-color)]"
                  }`}
                >
                  <p
                    className={`font-poppins text-[12px] leading-[16px] md:text-[16px] md:leading-[20px] ${
                      stat.badgeColor === "green"
                        ? "text-[#3ab971]"
                        : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ) : (
                <p className="font-poppins text-[13px] leading-[18px] md:text-[16px] md:leading-[20px] text-[var(--text-headline)]">
                  {stat.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

