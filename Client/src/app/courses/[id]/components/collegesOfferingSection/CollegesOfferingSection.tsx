import React from "react";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import CollegeCard from "@/components/common/Cards/collageCard";
import {
  BadgeIcon,
  FundingIcon,
  MedalIcon,
  ShieldIcon,
} from "@/components/common/Icons";

type Facility = "Hostel" | "Wifi" | "Sports" | "Labs" | "Library";

interface CollegeCardData {
  id: number;
  name: string;
  location: string;
  image: string;
  logo: string;
  annualFeesRange: string;
  rating: number;
  ratingCount: number;
  popularCourses: string[];
  avgPackage: string;
  highestPackage: string;
  facilities: Facility[];
}

const collegeCards: CollegeCardData[] = [
  {
    id: 1,
    name: "MIT College of Engineering",
    location: "Mumbai, Maharashtra",
    image: "/Testcollergeimage.png",
    logo: "/collegelogo.png",
    annualFeesRange: "₹3L - 4L",
    rating: 4.9,
    ratingCount: 12345,
    popularCourses: ["M.Sc", "PhD", "M.Tech", "MBA"],
    avgPackage: "₹20 LPA",
    highestPackage: "₹2.5 Cr",
    facilities: ["Hostel", "Wifi", "Sports", "Labs", "Library"],
  },
  {
    id: 2,
    name: "SDM Institute of Management",
    location: "Mumbai, Maharashtra",
    image: "/Testcollergeimage.png",
    logo: "/collegelogo.png",
    annualFeesRange: "₹3L - 4L",
    rating: 4.9,
    ratingCount: 12345,
    popularCourses: ["M.Sc", "PhD", "M.Tech", "MBA"],
    avgPackage: "₹20 LPA",
    highestPackage: "₹2.5 Cr",
    facilities: ["Hostel", "Wifi", "Sports", "Labs", "Library"],
  },
  {
    id: 3,
    name: "MIT College of Engineering",
    location: "Mumbai, Maharashtra",
    image: "/Testcollergeimage.png",
    logo: "/collegelogo.png",
    annualFeesRange: "₹3L - 4L",
    rating: 4.9,
    ratingCount: 12345,
    popularCourses: ["M.Sc", "PhD", "M.Tech", "MBA"],
    avgPackage: "₹20 LPA",
    highestPackage: "₹2.5 Cr",
    facilities: ["Hostel", "Wifi", "Sports", "Labs", "Library"],
  },
  {
    id: 4,
    name: "MIT College of Engineering",
    location: "Mumbai, Maharashtra",
    image: "/Testcollergeimage.png",
    logo: "/collegelogo.png",
    annualFeesRange: "₹3L - 4L",
    rating: 4.9,
    ratingCount: 12345,
    popularCourses: ["M.Sc", "PhD", "M.Tech", "MBA"],
    avgPackage: "₹20 LPA",
    highestPackage: "₹2.5 Cr",
    facilities: ["Hostel", "Wifi", "Sports", "Labs", "Library"],
  },
];

export default function CollegesOfferingSection({ course }: any) {
  return (
    <section className="w-full bg-[#FDFDFD] py-8 md:py-16">
      <ContentWrapper className="px-4 sm:px-10">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-6 md:gap-[40px] mb-8 md:mb-12">
          <SectionHeading
            title="Colleges Offering This Course"
            className="max-w-[400px]"
          />
          <SectionDescription className="max-w-[400px]">
            Explore top colleges across India that offer this program, along
            with details on fees, placements, campus life, and admission
            criteria.
          </SectionDescription>
        </div>

        {/* Filters and Cards */}
        <div>
          {/* Filters */}
          <div className="mb-8 flex flex-nowrap gap-3 overflow-x-auto scrollbar-hide sm:flex-wrap sm:overflow-x-visible">
            <button className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[#513392] px-4 py-2 text-sm font-medium text-white shadow-sm">
              <MedalIcon width={16} height={16} fill="white" />
              <span>By Reviews</span>
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#E2E4E8] px-4 py-2 text-sm text-[#767E92]">
              <BadgeIcon width={16} height={16} />
              <span>By Placements</span>
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#E2E4E8] px-4 py-2 text-sm text-[#767E92]">
              <FundingIcon width={16} height={16} />
              <span>By Fees</span>
            </button>
            <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#E2E4E8] px-4 py-2 text-sm text-[#767E92]">
              <ShieldIcon width={16} height={16} />
              <span>Featured</span>
            </button>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {course?.colleges?.map((college: any) => (
              <CollegeCard college={college}
              />
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}