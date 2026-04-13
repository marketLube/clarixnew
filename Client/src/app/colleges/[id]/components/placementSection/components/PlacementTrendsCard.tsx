type PlacementYearStat = {
  year: string;
  avgSalary: string;
  placementPercentage: string;
};

type PlacementTrendsCardProps = {
  title?: string;
  stats: PlacementYearStat[];
  className?: string;
};

export default function PlacementTrendsCard({
  title = "5-Year Placement Trends",
  stats,
  className = "",
}: PlacementTrendsCardProps) {
  return (
    <div
      className={`bg-[var(--white-color)] rounded-[20px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] w-full px-6 py-6 ${className}`}
    >
      <h3 className="font-helvetica font-medium text-[24px] leading-[28px] tracking-[-0.48px] text-[var(--text-headline)] mb-6">
        {title}
      </h3>

      <div className="flex flex-col gap-[10px]">
        {stats && stats.length > 0 ? (
          stats.map(({ year, avgSalary, placementPercentage }) => (
            <div key={year} className="flex flex-col gap-[5px]">
              <div className="flex items-center justify-between">
                <p className="font-helvetica text-[16px] leading-[16px] text-[#252c32]">
                  {year}
                </p>
                <div className="flex items-center gap-[5.333px]">
                  <p className="font-medium text-[16px] leading-[21.333px] text-[#111625]">
                    {avgSalary} LPA
                  </p>
                  <div className="bg-[#f7f9fb] px-[5.333px] py-[2.667px] rounded-[5.333px]">
                    <p className="font-medium text-[16px] leading-[21.333px] text-[#8796af]">
                      {placementPercentage}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f6f7ff] h-[26.667px] rounded-[5.333px] overflow-hidden relative">
                <div
                  className="bg-[var(--primary-color)] h-full rounded-[5.333px] relative"
                  style={{ width: `${placementPercentage}%` }}
                >
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1.333px_6.667px_1.333px_rgba(255,255,255,0.12)]" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No placement trends available</div>
        )}
      </div>
    </div>
  );
}
