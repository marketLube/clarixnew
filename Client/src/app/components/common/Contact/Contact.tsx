"use client";

import GridWrapper from "@/components/Ui/GridWrapper";
import ContactLeftBody from "./ContactLeftBody";
import ContactRightBody from "./ContactRightBody";
import ContentWrapper from "@/components/Ui/ContentWrapper";

export default function Contact() {
  return (
    <section className="w-full mb-10 px-4 sm:px-6 md:px-0">
      <ContentWrapper>
        <GridWrapper
          colsDesktop={2}
          className="justify-items-start md:justify-items-start"
        >
          <ContactLeftBody />
          <ContactRightBody />
        </GridWrapper>
      </ContentWrapper>
    </section>
  );
}
