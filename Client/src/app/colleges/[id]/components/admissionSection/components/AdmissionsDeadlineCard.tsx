import { ClockIcon } from "@/components/common/Icons";
import { useEffect, useState } from "react";

type AdmissionsDeadlineCardProps = {
  deadLine: string;
};

export default function AdmissionsDeadlineCard({
  deadLine,
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

  const formattedDate = new Date(deadLine).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="flex flex-col items-center justify-center p-[25px] rounded-[12px] w-[20rem] h-[184px]"
      style={{
        backgroundImage: `radial-gradient(circle at 85.636px 61.165px, var(--primary-dark) 0%, var(--primary-hover) 50%, var(--primary-color) 100%)`,
      }}
    >
      <div className="flex flex-col gap-[16px] items-center w-full">
        {mounted && timeLeft.isExpired ? (
          <>
            <div className="bg-red-500/20 border border-red-200/20 flex items-center justify-center w-full py-[6px] rounded-[50px]">
              <div className="flex gap-[4px] items-center">
                <div className="relative shrink-0 size-[20px]">
                  <ClockIcon width={20} height={20} fill="var(--white-color)" />
                </div>
                <p className="font-poppins leading-[20px] text-[16px] text-[var(--white-color)] whitespace-nowrap">
                  Admissions Closed
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] items-center w-full text-center">
              <p className="font-poppins leading-[20px] text-[16px] text-[var(--white-color)] whitespace-nowrap">
                Closed on
              </p>
              <p className="font-poppins leading-[24px] text-[20px] text-[var(--white-color)] tracking-[-0.4px] font-medium">
                {formattedDate}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[var(--card-success)] flex items-center justify-center w-full py-[6px] rounded-[50px]">
              <div className="flex gap-[4px] items-center">
                <div className="relative shrink-0 size-[20px]">
                  <ClockIcon width={20} height={20} fill="var(--white-color)" />
                </div>
                <p className="font-poppins leading-[20px] text-[16px] text-[var(--white-color)] whitespace-nowrap">
                  Admissions Open
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] items-start w-full">
              <p className="font-poppins leading-[20px] text-[16px] text-[var(--white-color)] whitespace-nowrap">
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
    </div>
  );
}
