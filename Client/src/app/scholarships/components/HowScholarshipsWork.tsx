"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";

interface Step {
  stepNumber: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const steps: Step[] = [
  {
    stepNumber: 1,
    title: "Eligibility Requirements",
    description:
      "Check academic criteria, family income limits, and category requirements to find scholarships you qualify for.",
  },
  {
    stepNumber: 2,
    title: "Documents Needed",
    description:
      "Prepare mark sheets, income certificate, caste certificate, Aadhaar, bank details, and passport photos.",
  },
  {
    stepNumber: 3,
    title: "Application Process",
    description:
      "Register on official portals, fill application forms carefully, upload documents, and submit before deadline.",
  },
  {
    stepNumber: 4,
    title: "Renewal Rules",
    description:
      "Maintain required marks and attendance for annual renewal. Submit progress reports on time.",
  },
];

// Step Icon Component
const StepIcon = ({ stepNumber }: { stepNumber: number }) => {
  const icons = [
    // STEP 1 - Check icon
    <svg
      key="step1"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3333 5.5L8.25 15.5833L3.66667 11"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    // STEP 2 - Document icon
    <svg
      key="step2"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 6V15.7449C15.75 16.1626 15.4164 16.5 15.0049 16.5H2.99505C2.58371 16.5 2.25 16.167 2.25 15.7561V2.24385C2.25 1.84148 2.58653 1.5 3.00166 1.5H11.2476L15.75 6ZM14.25 6.75H10.5V3H3.75V15H14.25V6.75ZM6 5.25H8.25V6.75H6V5.25ZM6 8.25H12V9.75H6V8.25ZM6 11.25H12V12.75H6V11.25Z"
        fill="white"
      />
    </svg>,
    // STEP 3 - Upload/Arrow icon
    <svg
      key="step3"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2.5V13.75M10 2.5L5.83333 6.66667M10 2.5L14.1667 6.66667"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 16.25V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V16.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    // STEP 4 - Refresh/Renewal icon
    <svg
      key="step4"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.3181 13.6819 3.33333 10 3.33333"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 1.66667V5.83333"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.1667V18.3333"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];

  return icons[stepNumber - 1] || icons[0];
};

export default function HowScholarshipsWork() {
  return (
    <section className="w-full py-6 sm:py-10 md:py-12 lg:py-16">
      <ContentWrapper className="flex flex-col gap-6 md:gap-10 lg:gap-14">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 md:gap-4 lg:gap-6 text-center">
          <h2 className="font-poppins font-medium leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[48px] text-[#162447] text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.96px] max-w-[613px]">
            Understand How Scholarships Work
          </h2>
          <p className="font-poppins text-[13px] md:text-[15px] lg:text-[16px] leading-[18px] md:leading-[20px] text-[#767e92] max-w-[501px]">
            Clarix makes the process simple with verified data, step-by-step
            instructions, and timely reminders.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px] w-full">
          {steps.map((step, index) => {
            // Step 1 has different spacing (40px gap), steps 2-4 have content positioned lower
            const isFirstStep = step.stepNumber === 1;
            const badgeTop = isFirstStep ? "top-[23px]" : "top-[25px]";
            const contentTop = isFirstStep
              ? "top-[76px]"
              : step.stepNumber === 2
              ? "top-[101px]"
              : "top-[112px]";

            return (
              <div
                key={step.stepNumber}
                className={`bg-[#f6f7ff] border border-[#faf9f6] h-[250px] relative overflow-hidden ${
                  isFirstStep ? "rounded-[20px]" : "rounded-[30px]"
                }`}
              >
                {/* Step Badge */}
                <div
                  className={`absolute left-[23px] ${badgeTop} bg-white flex items-center gap-[13.5px] pl-[4px] pr-4 py-1 rounded-[67.5px] w-fit`}
                >
                  <div className="bg-[#513392] flex items-center justify-center rounded-[60px] shrink-0">
                    {step.stepNumber === 1 && (
                      <div className="p-[3px]">
                        <StepIcon stepNumber={step.stepNumber} />
                      </div>
                    )}
                    {step.stepNumber === 2 && (
                      <div className="p-[5px]">
                        <StepIcon stepNumber={step.stepNumber} />
                      </div>
                    )}
                    {(step.stepNumber === 3 || step.stepNumber === 4) && (
                      <div className="p-[4px]">
                        <StepIcon stepNumber={step.stepNumber} />
                      </div>
                    )}
                  </div>
                  <p className="font-poppins text-[16px] leading-[20px] text-[#162447] whitespace-nowrap">
                    STEP {step.stepNumber}
                  </p>
                </div>

                {/* Content */}
                <div
                  className={`absolute left-[23px] ${contentTop} flex flex-col gap-5 w-[276px]`}
                >
                  <h3 className="font-poppins font-medium leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
                    {step.title}
                  </h3>
                  <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ContentWrapper>
    </section>
  );
}
