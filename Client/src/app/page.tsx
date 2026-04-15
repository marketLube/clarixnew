"use client";

import dynamic from "next/dynamic";
import Hero from "@/app/components/home/Hero";
import Stats from "@/app/components/home/Stats";
import ExploreColleges from "@/app/components/home/ExploreColleges";
import Destinations from "./components/home/Destinations";
import ExploreFuture from "./components/home/ExploreFuture";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import Loader from "@/components/common/Loader";

// Dynamic imports for below-the-fold sections
const CareerHub = dynamic(() => import("@/app/components/home/CareerHub"));
const StudentStories = dynamic(() => import("@/app/components/home/StudentStories"));
const Blog = dynamic(() => import("@/app/components/home/Blog"));
const FAQ = dynamic(() => import("@/app/components/common/FAQ"));
const StayUpdated = dynamic(() => import("@/app/components/home/StayUpdated"));

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
