import Image from "next/image";

type RecruitersCardProps = {
  companyName: string;
  jobRoles: string;
  hiringInfo?: string;
  logoUrl?: string;
  logoAlt?: string;
  className?: string;
};

export default function RecruitersCard({
  companyName,
  jobRoles,
  hiringInfo = "Hiring Last 3 Years",
  logoUrl = "/DummyCompanyIcon.png",
  logoAlt,
  className = "",
}: RecruitersCardProps) {
  return (
    <div
      className={`bg-[var(--background)] rounded-[12px] md:rounded-[14px] w-full max-w-[18rem] h-full flex flex-col items-center justify-center p-3 md:p-5 ${className}`}
    >
      <div className="flex flex-col gap-3 md:gap-5 items-center w-full">
        <div className="flex flex-col gap-2 md:gap-[14px] items-center text-center w-full md:max-w-[183px]">
          <div className="flex flex-col gap-1.5 md:gap-3 items-center w-full">
            <h3 className="font-poppins font-medium text-[14px] leading-[18px] md:text-[24px] md:leading-[28px] tracking-[-0.48px] text-[var(--text-headline)] line-clamp-2">
              {companyName}
            </h3>
            <p className="font-poppins text-[11px] leading-[14px] md:text-[16px] md:leading-[20px] text-[var(--text-sub)] md:max-w-[164px] line-clamp-1 md:line-clamp-none">
              {jobRoles}
            </p>
          </div>
          <div className="px-1 py-0.5 md:px-[14px] md:py-2">
            <p className="font-poppins italic text-[10px] leading-[14px] md:text-[16px] md:leading-[20px] text-[var(--text-sub)]">
              {hiringInfo}
            </p>
          </div>
        </div>

        <div className="bg-white flex items-center justify-center px-3 py-1 md:px-[51px] md:py-[6px] rounded-[6px] md:rounded-[8px] shadow-[0px_0px_76.166px_0px_rgba(0,0,0,0.06)] w-full md:w-auto">
          <div className="h-[24px] w-[60px] md:h-[40px] md:w-[148px] relative">
            <Image
              src={logoUrl}
              alt={logoAlt || `${companyName} company logo`}
              fill
              className="object-contain object-center pointer-events-none"
              sizes="148px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
