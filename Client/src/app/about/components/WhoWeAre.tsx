"use client";

import React from "react";
import Image from "next/image";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { useCmsAboutPage } from "@/hooks/cms/useCmsAboutpage";

export default function WhoWeAre() {
  const { secondSection } = useCmsAboutPage();

  return (
    <section className="w-full py-8 md:py-16">
      <ContentWrapper className="flex flex-col lg:flex-row gap-8 lg:gap-[125px] items-center">
        {/* Left: Content */}
        <div className="flex flex-col gap-8 md:gap-[60px] flex-1">
          {/* Who We Are */}
          <div className="flex flex-col gap-4 md:gap-[30px] max-w-[414px]">
            <h2 className="font-poppins font-medium leading-[36px] md:leading-[48px] text-[#162447] text-[28px] md:text-[42px] tracking-[-0.96px]">
              {secondSection?.headline ?? "Who We Are"}
            </h2>
            <div className="font-poppins text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-[#767e92]">
              <p className="mb-4">
                {secondSection?.paragraph ?? "Clarix Education is India's trusted education consultancy and discovery platform. Founded with the belief that every student deserves access to clear, unbiased information about colleges, courses, and careers. We aggregate data from thousands of institutions, making it easy to compare, shortlist, and apply. Whether you are a Class 12 student exploring engineering colleges or a working professional looking at MBA programs, Clarix is your one-stop destination."}
              </p>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="relative h-[250px] md:h-[397px] w-full rounded-[20px] overflow-hidden lg:hidden">
            <Image
              src="/images/abtimg.png"
              alt="Clarix Education team helping students find the right college"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Mission and Vision */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex flex-col gap-3 md:gap-5 flex-1">
              <h3 className="font-poppins font-medium leading-[28px] md:leading-[32px] text-[#162447] text-[20px] md:text-[24px] tracking-[-0.48px]">
                Our Mission
              </h3>
              <p className="font-poppins text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#767e92] max-w-[329px]">
                {secondSection?.mission ?? "To simplify higher education decisions for every Indian student by providing accurate, comprehensive, and unbiased information about colleges, courses, exams, and scholarships, all in one place."}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:gap-5 flex-1">
              <h3 className="font-poppins font-medium leading-[28px] md:leading-[32px] text-[#162447] text-[20px] md:text-[24px] tracking-[-0.48px]">
                Our Vision
              </h3>
              <p className="font-poppins text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#767e92] max-w-[296px]">
                {secondSection?.vision ?? "To become India's most trusted education platform where students, parents, and counselors find everything they need to make informed academic choices, from college discovery to career planning."}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Image (Desktop) */}
        <div className="relative h-[397px] w-full lg:w-[606px] rounded-[20px] overflow-hidden flex-shrink-0 hidden lg:block">
          <Image
            src="/images/abtimg.png"
            alt="Clarix Education team helping students find the right college"
            fill
            className="object-cover"
            sizes="606px"
          />
        </div>
      </ContentWrapper>
    </section>
  );
}
