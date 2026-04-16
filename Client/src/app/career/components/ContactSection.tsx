"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import ContactRightBody from "@/app/components/common/Contact/ContactRightBody";
import { LocationIcon, PhoneIcon, MailIcon } from "@/components/common/Icons";

export default function ContactSection() {
  return (
    <section className="bg-gradient-to-b from-[#f6f7ff] to-[rgba(248,249,254,0)] py-6 sm:py-10 md:py-14 lg:py-20">
      <ContentWrapper className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-20 xl:gap-[160px] items-start">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-[40px] w-full max-w-[440px] lg:max-w-[367px]">
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="font-poppins font-medium leading-[26px] sm:leading-[30px] md:leading-[36px] lg:leading-[44px] xl:leading-[48px] text-[#162447] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[48px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.96px]">
              Get Personalized Guidance
            </h2>
            <div className="font-poppins leading-[18px] md:leading-[20px] text-[#767e92] text-[13px] md:text-[15px] lg:text-[16px]">
              <p className="mb-0">
                Our expert counsellors will help you find the best colleges and
                career path.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 lg:gap-[24px]">
            <div className="flex gap-3 md:gap-[14px] items-center">
              <div className="bg-[#513392] flex items-center justify-center p-2 md:p-[10px] rounded-full w-[36px] h-[36px] md:w-[40px] md:h-[40px] shrink-0">
                <LocationIcon width={18} height={18} fill="white" />
              </div>
              <div className="flex flex-col gap-0.5 md:gap-[10px]">
                <p className="font-poppins leading-[16px] md:leading-[20px] text-[#767e92] text-[12px] md:text-[14px] lg:text-[16px]">
                  Location
                </p>
                <p className="font-poppins font-normal leading-[20px] md:leading-[24px] lg:leading-[28px] text-[#162447] text-[14px] md:text-[16px] lg:text-[20px] tracking-[-0.3px]">
                  Palakkad,Kerala,India
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-[14px] items-center">
              <div className="bg-[#513392] flex items-center justify-center p-2 md:p-[10px] rounded-full w-[36px] h-[36px] md:w-[40px] md:h-[40px] shrink-0">
                <PhoneIcon width={18} height={18} fill="white" />
              </div>
              <div className="flex flex-col gap-0.5 md:gap-[10px]">
                <p className="font-poppins leading-[16px] md:leading-[20px] text-[#767e92] text-[12px] md:text-[14px] lg:text-[16px]">
                  Call us
                </p>
                <p className="font-poppins font-normal leading-[20px] md:leading-[24px] lg:leading-[28px] text-[#162447] text-[14px] md:text-[16px] lg:text-[20px] tracking-[-0.3px]">
                  +9100000000
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-[14px] items-center">
              <div className="bg-[#513392] flex items-center justify-center p-2 md:p-[10px] rounded-full w-[36px] h-[36px] md:w-[40px] md:h-[40px] shrink-0">
                <MailIcon width={18} height={18} fill="white" />
              </div>
              <div className="flex flex-col gap-0.5 md:gap-[10px]">
                <p className="font-poppins leading-[16px] md:leading-[20px] text-[#767e92] text-[12px] md:text-[14px] lg:text-[16px]">
                  Email
                </p>
                <p className="font-poppins font-normal leading-[20px] md:leading-[24px] lg:leading-[28px] text-[#162447] text-[14px] md:text-[16px] lg:text-[20px] tracking-[-0.3px]">
                  Clarixedu@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[788px]">
          <ContactRightBody />
        </div>
      </ContentWrapper>
    </section>
  );
}
