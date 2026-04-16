"use client";

import React from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { Button } from "@/components/common/Button";
import { ArrowRightIcon } from "@/components/common/Icons";
import Contact from "@/app/components/common/Contact/Contact";

export default function AboutCTA() {
  return (
    <section className="w-full py-6 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-b from-[#f6f7ff] to-[rgba(248,249,254,0)]">
      <ContentWrapper>
        <Contact />
      </ContentWrapper>
    </section>
  );
}
