"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface AboutYouProps {
  job: JobDetail;
}

const requirements = [
  "3–5+ years of experience as a brand, visual, or communication designer, with a portfolio demonstrating strong visual craft, creativity, and process",
  "Proficient in design software such as Adobe Creative Suite, Sketch, and Figma, with a strong understanding of design principles and typography",
  "Experience in creating user-centered designs, including wireframes, prototypes, and user interfaces for web and mobile applications",
  "Ability to collaborate effectively with cross-functional teams including product managers, developers, and marketers to achieve project goals",
  "Strong communication skills to present design concepts and rationale to stakeholders and gather constructive feedback",
  "A passion for staying updated with design trends and emerging technologies, continuously seeking opportunities for professional growth in the design field",
];

export default function AboutYou({ job }: AboutYouProps) {
  return (
    <div className="flex flex-col gap-10 items-start mb-[60px]">
      <h2 className="font-helvetica font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
        About you
      </h2>

      <div className="flex flex-col gap-12 items-start">
        <div className="flex flex-col gap-7 items-start">
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-[15px] items-start">
              <div className="w-[6px] h-[6px] rounded-full bg-[#767e92] mt-[7px] flex-shrink-0"></div>
              <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
                {req}
              </p>
            </div>
          ))}
        </div>

        <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
          In addition to our unique culture, {job.company} proudly offers a competitive total rewards package, including but not limited to, market-benched salary & equity, comprehensive health benefits, and flexible paid time off.
        </p>

        <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
          The salary range for this role is: {job.salaryRange}
        </p>

        <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
          The salary range shown may be a reflection of additional factors such as geographical location and skill ranges/levels we're open to. Placement in the salary range will be decided upon completion of the interview process, taking into account factors like leaving room for growth, internal fairness & parity, your demonstrated skills, and the depth of your experience. Our Recruiting team will be able to provide more details during the interview process.
        </p>

        <div className="font-poppins text-[16px] leading-[20px] text-[#767e92] space-y-4">
          <p>
            By submitting an application the candidate consents to the use of their personal information in accordance with the {job.company} Privacy policy:{" "}
            <a
              href="https://learn.hex.tech/docs/trust/privacy-policy"
              className="underline text-[#767e92]"
            >
              https://learn.hex.tech/docs/trust/privacy-policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
