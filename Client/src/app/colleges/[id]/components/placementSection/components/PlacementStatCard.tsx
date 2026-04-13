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
      className={`bg-gradient-to-b from-[#513392] to-[#7c50dc] rounded-[10px] p-2 flex flex-col items-center justify-center text-center ${className}`}
    >
      <p className="font-poppins text-[12px] leading-[16px] text-[rgba(255,255,255,0.79)] mb-2">
        {label}
      </p>
      <p className="font-helvetica font-medium text-[20px] leading-[20px] tracking-[-0.32px] text-white">
        {value}
      </p>
    </div>
  );
}

