"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { PlusIcon } from "@/components/common/Icons";
import Image from "next/image";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";

export default function EmptyExams() {
  const router = useRouter();

  const handleExploreExams = () => {
    router.push("/exams");
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-[34px] items-center justify-center w-full py-8 sm:py-12 md:py-16 px-4">
      {/* Illustration */}
      <div className="h-[160px] sm:h-[180px] md:h-[220px] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[367px] shrink-0 flex items-center justify-center">
        <div className="w-full h-full rounded-[16px] sm:rounded-[18px] md:rounded-[20px] flex items-center justify-center">
          <Image
            src="/Saveditems/EmptyExam.png"
            alt="Empty Exams Illustration"
            width={367}
            height={220}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-[34px] items-center w-full">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-[24px] items-center w-full max-w-[90%] sm:max-w-[35rem] px-2">
          <SectionHeading
            title="We couldn't find exams for this combination"
            className="text-center font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-full sm:max-w-[30rem]"
          />
          <div className="w-full max-w-[90%] sm:max-w-[20rem]"> 
            <SectionDescription className="text-center text-sm sm:text-base md:text-lg">
              Different courses and colleges accept different exams. Let's help you find the right one.
            </SectionDescription>
          </div>
        </div>

        {/* Explore Exams Button */}
        <Button
          variant="primary"
          size="md"
          onClick={handleExploreExams}
          className="rounded-[40px] px-4 sm:px-5 md:px-[20px] py-2 sm:py-2.5 md:py-[12px] flex items-center gap-2 sm:gap-[6px] md:gap-[8px] shadow-none border border-[var(--primary-color)] bg-transparent !text-[var(--primary-color)] hover:bg-transparent hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] text-sm sm:text-base"
        >
          <PlusIcon width={18} height={18} className="sm:w-5 sm:h-5" fill="var(--primary-color)" />
          <span className="whitespace-nowrap">Explore Exams</span>
        </Button>
      </div>
    </div>
  );
}