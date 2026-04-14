"use client";

import React, { useState, useCallback } from "react";
import CompareHeroSection from "./sections/CompareHeroSection";
import ComparisonTable from "./sections/ComparisonTable";
import ComparisonSections from "./sections/ComparisonSections";

export interface College {
  id: string;
  name: string;
  location: string;
  image: string;
  logo: string;
  type: string;
  establishedYear: string;
  naacAccreditation: string;
  nirfRank: string;
  category: string;
  popularCourses: string[];
  entranceExams: string[];
  eligibility: string;
  courseDuration: string;
  courseType: string;
  tuitionFee: string;
  hostelFee: string;
  registrationFee: string;
  examFee: string;
  estimatedTotalCost: string;
  scholarships: string[];
  avgPackage: string;
  highestPackage: string;
  topRecruiters: string[];
  placementRate: number;
  internshipOpportunities: string;
  alumniNetwork: string;
  campusSize: string;
  libraryLabs: string;
  hostelFacilities: string;
  sportsRecreation: string;
  techInfrastructure: string;
  safetySecurity: string;
  overallRating: number;
  ratingCount: number;
  facultyRating: number;
  campusLifeRating: number;
  placementRating: number;
  academicsRating: number;
  infrastructureRating: number;
  reviewHighlights: string[];
  admissionProcess: string;
  importantDates: string;
  counsellingMode: string;
  documentsRequired: string[];
  applicationFee: string;
  contactPhone: string;
  contactEmail: string;
}

interface CompareViewProps {
  colleges: College[];
  onRemoveCollege: (id: string) => void;
  onAddCollege: () => void;
  onClearAll?: () => void;
}

export default function CompareView({
  colleges,
  onRemoveCollege,
  onAddCollege,
  onClearAll,
}: CompareViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById(`section-${tabId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      {/* Hero Section */}
      <CompareHeroSection
        colleges={colleges}
        onRemove={onRemoveCollege}
        onAdd={onAddCollege}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {/* Comparison Table */}
      <ComparisonTable
        colleges={colleges}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onRemoveCollege={onRemoveCollege}
        onAddCollege={onAddCollege}
        onClearAll={onClearAll}
      />
      <ComparisonSections colleges={colleges} activeTab={activeTab} />
    </div>
  );
}
