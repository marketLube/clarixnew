import { ClockIcon, PhoneIcon } from "@/components/common/Icons";
import { useEffect, useState } from "react";

type AdmissionsDeadlineCardProps = {
  deadLine: string;
  collegeName?: string;
};

const WHATSAPP_NUMBER = "919072730020";

export default function AdmissionsDeadlineCard({
  deadLine,
  collegeName,
}: AdmissionsDeadlineCardProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(deadLine) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      isExpired: false,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        isExpired: false,
      };
    } else {
      timeLeft.isExpired = true;
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadLine]);

  const handleContactWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I'd like to know about admission details${collegeName ? ` for ${collegeName}` : ""}. Can you help?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  // Show "Contact Us" when expired or no valid deadline
  const isExpiredOrInvalid = !deadLine || isNaN(new Date(deadLine).getTime()) || (mounted && timeLeft.isExpired);

  return (
    <div
      className="flex flex-col items-center justify-center p-5 sm:p-[25px] rounded-[12px] w-full max-w-[20rem] min-h-[184px]"
      style={{
        backgroundImage: `radial-gradient(circle at 85.636px 61.165px, var(--primary-dark) 0%, var(--primary-hover) 50%, var(--primary-color) 100%)`,
      }}
    >
      <div className="flex flex-col gap-[16px] items-center w-full">
        {isExpiredOrInvalid ? (
          <>
            <div className="bg-white/15 border border-white/20 flex items-center justify-center w-full py-[6px] rounded-[50px]">
              <div className="flex gap-[4px] items-center">
                <div className="relative shrink-0 size-[20px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-poppins leading-[20px] text-[14px] sm:text-[16px] text-[var(--white-color)] whitespace-nowrap">
                  Admissions Info
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] items-center w-full text-center">
              <p className="font-poppins leading-[20px] text-[14px] text-white/80">
                Want admission details?
              </p>
              <button
                onClick={handleContactWhatsApp}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-poppins font-medium text-[14px] sm:text-[15px] px-5 py-2.5 rounded-full transition-colors shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact Us on WhatsApp
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[var(--card-success)] flex items-center justify-center w-full py-[6px] rounded-[50px]">
              <div className="flex gap-[4px] items-center">
                <div className="relative shrink-0 size-[20px]">
                  <ClockIcon width={20} height={20} fill="var(--white-color)" />
                </div>
                <p className="font-poppins leading-[20px] text-[14px] sm:text-[16px] text-[var(--white-color)] whitespace-nowrap">
                  Admissions Open
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] items-start w-full">
              <p className="font-poppins leading-[20px] text-[14px] sm:text-[16px] text-[var(--white-color)] whitespace-nowrap">
                Application Deadline In
              </p>
              <div className="flex gap-[6px] items-center justify-center w-full">
                <div
                  className="backdrop-blur-[7px] border-[0.5px] flex flex-col gap-[1px] items-center justify-center flex-1 py-[8px] rounded-[8px] shadow-[0px_0px_76.166px_0px_rgba(0,0,0,0.06)]"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <p className="font-poppins leading-[24px] text-[20px] text-[var(--white-color)] tracking-[-0.4px] font-medium">
                    {mounted ? timeLeft.days : 0}
                  </p>
                  <p
                    className="font-poppins leading-[18px] text-[14px]"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Days
                  </p>
                </div>
                <div
                  className="border-[0.5px] flex flex-col gap-[1px] items-center justify-center flex-1 py-[8px] rounded-[8px] shadow-[0px_0px_76.166px_0px_rgba(0,0,0,0.06)]"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <p className="font-poppins leading-[24px] text-[20px] text-[var(--white-color)] tracking-[-0.4px] font-medium">
                    {mounted ? timeLeft.hours : 0}
                  </p>
                  <p
                    className="font-poppins leading-[18px] text-[14px]"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Hours
                  </p>
                </div>
                <div
                  className="border-[0.5px] flex flex-col gap-[1px] items-center justify-center flex-1 py-[8px] rounded-[8px] shadow-[0px_0px_76.166px_0px_rgba(0,0,0,0.06)]"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <p className="font-poppins leading-[24px] text-[20px] text-[var(--white-color)] tracking-[-0.4px] font-medium">
                    {mounted ? timeLeft.minutes : 0}
                  </p>
                  <p
                    className="font-poppins leading-[18px] text-[14px]"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Mins
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 w-full">
        <div className="h-px w-full bg-white/15" />
        <p className="font-poppins text-[12px] text-white/70 mt-1">
          Connect with us
        </p>
        <div className="flex gap-3 items-center">
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            aria-label="Call us"
            className="bg-white/15 border border-white/20 hover:bg-white/25 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
          >
            <PhoneIcon width={16} height={16} fill="white" />
          </a>
          <button
            type="button"
            onClick={handleContactWhatsApp}
            aria-label="Message us on WhatsApp"
            className="bg-[#25D366] hover:bg-[#20bd5a] rounded-full w-9 h-9 flex items-center justify-center transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
