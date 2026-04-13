"use client";

import React from "react";
import CareerHero from "./components/CareerHero";
import OurPeopleSection from "./components/OurPeopleSection";
import JoinOurTeamSection from "./components/JoinOurTeamSection";
import ContactSection from "./components/ContactSection";

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <CareerHero />
      <OurPeopleSection />
      <JoinOurTeamSection />
      {/* <ContactSection /> */}
    </div>
  );
}
