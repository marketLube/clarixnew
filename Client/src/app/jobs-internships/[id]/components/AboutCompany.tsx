"use client";

import React from "react";
import { JobDetail } from "./JobDetailHero";

interface AboutCompanyProps {
  job: JobDetail;
}

export default function AboutCompany({ job }: AboutCompanyProps) {
  return (
    <div className="flex flex-col gap-10 items-start mb-[60px]">
      <h2 className="font-helvetica font-medium leading-[28px] text-[#162447] text-[24px] tracking-[-0.48px]">
        About {job.company}
      </h2>

      <div className="flex flex-col gap-[60px] items-start">
        <div className="font-poppins text-[16px] leading-[20px] text-[#767e92] space-y-4">
          <p>
            {job.company} is changing the way people work with data. Our platform makes analytics workflows more powerful, collaborative, and shareable. {job.company} solves key pain points with today's data and analytics tooling, and is loved by thousands of users all over the world for the beautiful UI, new superpowers, and boundless flexibility.
          </p>
          <p>
            We are a tight-knit crew of engineers, designers, and data aficionados. Our roadmap is full of big ideas and little details, and we would love your help bringing them to life.
          </p>
          <p>
            {job.company} has raised over $100m from great VCs and angels, giving us many years of runway and the ability to pay competitive salaries, offer great benefits, and provide meaningful equity.
          </p>
          <p>
            Watch a demo of {job.company} on{" "}
            <a href="https://hex.tech/" className="text-[#767e92] hover:underline">
              our homepage
            </a>
            , read more on{" "}
            <a href="https://hex.tech/blog/" className="text-[#767e92] hover:underline">
              our blog
            </a>
            , or check out{" "}
            <a href="https://www.notion.so/hexhq/Hex-Handbook-9fff0d42860e4f70815c599e0d1664d6" className="text-[#767e92] hover:underline">
              our handbook
            </a>
            {" "}for a better sense of what it's like to work here.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#e2e4e8]"></div>

        <div className="font-poppins text-[16px] leading-[20px] text-[#767e92] space-y-4">
          <p>
            Members of the Brand Design team bring the {job.company} brand to life across every touchpoint. As a {job.title} at {job.company}, you will shape how customers, partners, and employees experience our brand — from polished sales assets to delightful swag to visually rich editorial content.
          </p>
          <p>
            You will join a small team of brand designers and collaborate closely with Marketing, Sales, and other cross-functional partners to elevate our brand and support a growing volume of high-visibility work.
          </p>
        </div>
      </div>
    </div>
  );
}
