"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import ContactRightBody from "@/app/components/common/Contact/ContactRightBody";
import { LocationIcon, PhoneIcon, MailIcon } from "@/components/common/Icons";

export default function ContactSection() {
  return (
    <section className="bg-gradient-to-b from-[#f6f7ff] to-[rgba(248,249,254,0)] py-20">
      <ContentWrapper className="flex flex-col lg:flex-row gap-12 lg:gap-[249px] items-start">
        <div className="flex flex-col gap-[47px] max-w-[367px]">
          <div className="flex flex-col gap-[18px]">
            <h2 className="font-poppins font-medium leading-[48px] text-[#162447] text-[48px] tracking-[-0.96px]">
              Get Personalized Guidance
            </h2>
            <div className="font-poppins leading-[20px] text-[#767e92] text-[16px]">
              <p className="mb-0">
                Our expert counsellors will help you find the best colleges and
                career path.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-[14px] items-center">
              <div className="bg-[#513392] flex items-center justify-center p-[10px] rounded-[70px] w-[40px] h-[40px]">
                <LocationIcon width={20} height={20} fill="white" />
              </div>
              <div className="flex flex-col gap-[10px]">
                <p className="font-poppins leading-[20px] text-[#767e92] text-[16px]">
                  Location
                </p>
                <p className="font-poppins font-normal leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
                  Palakkad,Kerala,India
                </p>
              </div>
            </div>

            <div className="flex gap-[14px] items-center">
              <div className="bg-[#513392] flex items-center justify-center p-[10px] rounded-[70px] w-[40px] h-[40px]">
                <PhoneIcon width={20} height={20} fill="white" />
              </div>
              <div className="flex flex-col gap-[10px]">
                <p className="font-poppins leading-[20px] text-[#767e92] text-[16px]">
                  Call us
                </p>
                <p className="font-poppins font-normal leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
                  +9100000000
                </p>
              </div>
            </div>

            <div className="flex gap-[14px] items-center">
              <div className="bg-[#513392] flex items-center justify-center p-[10px] rounded-[70px] w-[40px] h-[40px]">
                <MailIcon width={20} height={20} fill="white" />
              </div>
              <div className="flex flex-col gap-[10px]">
                <p className="font-poppins leading-[20px] text-[#767e92] text-[16px]">
                  Email
                </p>
                <p className="font-poppins font-normal leading-[28px] text-[#162447] text-[20px] tracking-[-0.4px]">
                  Clarixedu@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[788px]">
          <ContactRightBody />
        </div>
      </ContentWrapper>
    </section>
  );
}
