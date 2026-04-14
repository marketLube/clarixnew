type PlacementStatCardProps = {
  label: string;
  value: string;
  className?: string;
};

export default function PlacementStatCard({
  label,
  value,
  className = "",
}: PlacementStatCardProps) {
  return (
    <div
      className={`bg-gradient-to-b from-[#513392] to-[#7c50dc] rounded-[8px] sm:rounded-[10px] p-2 sm:p-3 flex flex-col items-center justify-center text-center min-h-[70px] sm:min-h-[80px] ${className}`}
    >
      <p className="font-poppins text-[10px] sm:text-[12px] leading-[14px] sm:leading-[16px] text-[rgba(255,255,255,0.79)] mb-1 sm:mb-2">
        {label}
      </p>
      <p className="font-poppins font-medium text-[16px] sm:text-[20px] leading-[18px] sm:leading-[20px] tracking-[-0.32px] text-white">
        {value}
      </p>
    </div>
  );
}

