"use client";

import ContactLeftBody from "./ContactLeftBody";
import ContactRightBody from "./ContactRightBody";
import ContentWrapper from "@/components/Ui/ContentWrapper";

export default function Contact() {
  return (
    <section className="w-full mb-6 md:mb-10 px-4 sm:px-6 md:px-0">
      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
          <ContactLeftBody />
          <ContactRightBody />
        </div>
      </ContentWrapper>
    </section>
  );
}
