"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface AboutRoleProps {
  job: JobDetail;
}

const roleResponsibilities = [
  {
    bold: "Own and execute core brand surfaces",
    text: "including swag, sales assets, ebooks, blog imagery, event collateral, social, ads, and launch campaigns",
  },
  {
    bold: "Develop and manage digital content strategies",
    text: "to enhance online presence and engagement.",
  },
  {
    bold: "Collaborate with cross-functional teams",
    text: "to create cohesive marketing campaigns that drive brand awareness.",
  },
  {
    bold: "Analyze market trends",
    text: "and consumer behavior to inform design decisions and optimize brand messaging.",
  },
  {
    bold: "Oversee the production",
    text: "of promotional videos and webinars that effectively communicate brand value.",
  },
  {
    bold: "Create compelling infographics",
    text: "and presentations that simplify complex information for target audiences.",
  },
  {
    bold: "Establish brand guidelines",
    text: "to ensure consistency across all platforms and materials.",
  },
];

export default function AboutRole({ job }: AboutRoleProps) {
  return (
    <div className="flex flex-col gap-10 items-start mb-[60px]">
      <h2 className="font-poppins font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
        About the role
      </h2>

      <div className="flex flex-col gap-7 items-start">
        {roleResponsibilities.map((item, index) => (
          <div key={index} className="flex gap-[15px] items-start">
            <div className="w-[6px] h-[6px] rounded-full bg-[#767e92] mt-[7px] flex-shrink-0"></div>
            <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
              <span className="font-poppins font-medium text-[#162447]">
                {item.bold}
              </span>{" "}
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
