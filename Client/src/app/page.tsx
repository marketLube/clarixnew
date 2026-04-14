"use client";

import Hero from "@/app/components/home/Hero";
// CareerStreams removed — merged into ExploreFuture
import Stats from "@/app/components/home/Stats";
import ExploreColleges from "@/app/components/home/ExploreColleges";
import CareerHub from "@/app/components/home/CareerHub";
import StudentStories from "@/app/components/home/StudentStories";
import Blog from "@/app/components/home/Blog";
import FAQ from "@/app/components/common/FAQ";

import StayUpdated from "@/app/components/home/StayUpdated";
import Destinations from "./components/home/Destinations";
import ExploreFuture from "./components/home/ExploreFuture";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import Loader from "@/components/common/Loader";

export default function Home() {
  const { isLoading } = useCmsHomepage();
  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <main className="w-full">
      <Hero />
      <Destinations />
      <ExploreFuture />
      <Stats />
      <ExploreColleges />
      <StayUpdated />
      <CareerHub />
      <StudentStories />
      <Blog />
      <FAQ />
    </main>
  );
}
