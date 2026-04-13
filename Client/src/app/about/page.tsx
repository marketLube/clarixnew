"use client";

import React from "react";
import AboutHero from "./components/AboutHero";
import WhoWeAre from "./components/WhoWeAre";
import WhatClarixOffers from "./components/WhatClarixOffers";
import OurStory from "./components/OurStory";
import StatsSection from "./components/StatsSection";
import AboutCTA from "./components/AboutCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      {/* Hero Section */}
      <AboutHero />

      {/* Who We Are Section */}
      <WhoWeAre />

      {/* What Clarix Offers Section */}
      <WhatClarixOffers />

      {/* Our Story Section */}
      <OurStory />

      {/* Stats Section */}
      <StatsSection />

      {/* Contact/CTA Section */}
      {/* <AboutCTA /> */}
    </div>
  );
}
