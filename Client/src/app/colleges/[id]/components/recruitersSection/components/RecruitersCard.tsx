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
      className={`bg-[var(--background)] rounded-[14px] w-full max-w-[18rem] h-full flex flex-col items-center justify-center p-5 ${className}`}
    >
      <div className="flex flex-col gap-5 items-center">
        <div className="flex flex-col gap-[14px] items-center text-center max-w-[183px]">
          <div className="flex flex-col gap-3 items-center">
            <h3 className="font-poppins font-medium text-[24px] leading-[28px] tracking-[-0.48px] text-[var(--text-headline)]">
              {companyName}
            </h3>
            <p className="font-poppins text-[16px] leading-[20px] text-[var(--text-sub)] max-w-[164px]">
              {jobRoles}
            </p>
          </div>
          <div className="px-[14px] py-2">
            <p className="font-poppins italic text-[16px] leading-[20px] text-[var(--text-sub)]">
              {hiringInfo}
            </p>
          </div>
        </div>

        <div className="bg-white flex items-center justify-center px-[51px] py-[6px] rounded-[8px] shadow-[0px_0px_76.166px_0px_rgba(0,0,0,0.06)]">
          <div className="h-[40px] w-[148px] relative">
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
