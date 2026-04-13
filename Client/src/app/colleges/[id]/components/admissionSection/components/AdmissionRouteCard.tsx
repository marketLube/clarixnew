type AdmissionRouteCardProps = {
  label?: string;
  title?: string;
  description?: string;
};

export default function AdmissionRouteCard({
  label = "Primary Route",
  title = "Merit-Based Admission",
  description = "10+2 with minimum 60% in PCM",
}: AdmissionRouteCardProps) {
  return (

    <div className="flex flex-col gap-[8px] items-start px-[18px] py-[9px] w-full bg-white rounded-[14px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)]">
      <div className="bg-[var(--primary-color)] border-[var(--primary-color)] border-[0.5px] border-solid flex items-center justify-center px-[16px] py-[3px] rounded-[30px] ">
        <p className="font-helvetica leading-[20px] text-[12px] whitespace-nowrap text-[var(--white-color)] tracking-[-0.24px] font-medium">
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-[8px] items-start w-full">
        <p className="font-helvetica leading-[28px] text-[var(--text-headline)] text-[20px] tracking-[-0.4px] font-medium w-full">
          {title}
        </p>
        <p className="font-poppins leading-[20px] text-[var(--text-sub)] text-[16px] w-full">
          {description}
        </p>
      </div>
    </div>

  );
}