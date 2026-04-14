"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import NoCollegesSelected from "./components/NoCollegesSelected";
import NeedHelpDeciding from "./components/NeedHelpDeciding";
import CompareView, { College } from "./components/CompareView";
import AddCollegeModal from "./components/AddCollegeModal";
import api from "@/lib/api";
import { stripMarkdown } from "@/lib/helperFunctions/stripMarkdown";

// Transform API college data to CompareView College format
const transformCollegeData = (apiCollege: any): College => {
  const formatSalary = (amount: number | undefined) => {
    if (!amount) return "N/A";
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} LPA`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const formatFees = (fee: string | number | undefined) => {
    if (!fee) return "N/A";
    if (typeof fee === "number") {
      return `₹${fee.toLocaleString()}`;
    }
    return fee;
  };

  return {
    id: apiCollege._id || apiCollege.id || "",
    name: apiCollege.name || "N/A",
    location: apiCollege.city && apiCollege.state
      ? `${apiCollege.city}, ${apiCollege.state}`
      : apiCollege.city || apiCollege.state || "N/A",
    image: apiCollege.campusImages?.[0] || apiCollege.logo || "/Testcollergeimage.png",
    logo: apiCollege.logo || "/collegelogo.png",
    type: apiCollege.type || "N/A",
    establishedYear: apiCollege.establishedYear?.toString() || "N/A",
    naacAccreditation: apiCollege.accreditation?.[0] || "N/A",
    nirfRank: apiCollege.nirfRank || "#N/A",
    category: apiCollege.university?.name || "Engineering & Technology",
    popularCourses: apiCollege.courses?.map((course: any) => course.name || course)?.slice(0, 4) || [],
    entranceExams: apiCollege.entranceExam?.name ? [apiCollege.entranceExam.name] : [],
    eligibility: "Check college website for eligibility criteria",
    courseDuration: apiCollege.courses?.[0]?.duration || "4 Years",
    courseType: "UG/PG/PhD",
    tuitionFee: formatFees(apiCollege.annualFee || apiCollege.avgAnnualFee),
    hostelFee: formatFees(apiCollege.hostelFee),
    registrationFee: "₹5,000",
    examFee: "₹2,000/sem",
    estimatedTotalCost: apiCollege.annualFeesRange || "Check college website",
    scholarships:
      (apiCollege.scholarships || [])
        .map((sch: any) => {
          if (!sch) return "";
          if (typeof sch === "string") return sch;
          // Handle scholarship objects from API
          return (
            sch.scholarshipName ||
            sch.name ||
            sch.title ||
            sch.fundingType ||
            ""
          );
        })
        .filter(Boolean),
    avgPackage: formatSalary(apiCollege.averageSalary),
    highestPackage: formatSalary(apiCollege.highestSalary),
    topRecruiters: apiCollege.recruiters?.map((rec: any) => rec.name || rec)?.slice(0, 3) || [],
    placementRate: apiCollege.placementPercentage || 0,
    internshipOpportunities: apiCollege.avgStipend ? `₹${apiCollege.avgStipend.toLocaleString()}/month` : "Available",
    alumniNetwork: "Strong network",
    campusSize: apiCollege.campusSize || "N/A",
    libraryLabs: "Well-equipped library and labs",
    hostelFacilities: apiCollege.hostelImages?.length ? "Hostel facilities available" : "Check availability",
    sportsRecreation: "Sports and recreation facilities",
    techInfrastructure: "Modern tech infrastructure",
    safetySecurity: "24/7 Security",
    overallRating: apiCollege.rating || 0,
    ratingCount: apiCollege.ratingCount || 0,
    facultyRating: apiCollege.rating ? Number((apiCollege.rating * 0.95).toFixed(1)) : 0,
    campusLifeRating: apiCollege.rating ? Number((apiCollege.rating * 0.9).toFixed(1)) : 0,
    placementRating: apiCollege.rating ? Number((apiCollege.rating * 1.05).toFixed(1)) : 0,
    academicsRating: apiCollege.rating ? Number((apiCollege.rating * 0.98).toFixed(1)) : 0,
    infrastructureRating: apiCollege.rating ? Number((apiCollege.rating * 0.92).toFixed(1)) : 0,
    reviewHighlights: [
      stripMarkdown(apiCollege.description || "").substring(0, 50) || "Quality education",
    ],
    admissionProcess: apiCollege.admissionMode?.[0]?.mode || "Check website",
    importantDates: apiCollege.entranceExamDate
      ? `Entrance Exam: ${new Date(apiCollege.entranceExamDate).toLocaleDateString()}`
      : "Check college website",
    counsellingMode: apiCollege.counsellingStartsFrom ? "Online" : "Check website",
    documentsRequired: [
      "10th & 12th Marksheets",
      "Entrance Exam Scorecard",
      "Category Certificate",
      "Photo & ID",
    ],
    applicationFee: "Check website",
    contactPhone: "+91-XXXXXXXXXX",
    contactEmail: "admissions@college.edu",
  };
};

export default function CompareCollegesPage() {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem("compare_colleges_list");
      let currentList: College[] = saved ? JSON.parse(saved) : [];

      const pending = localStorage.getItem("pending_compare_college");
      if (pending) {
        const raw = JSON.parse(pending);
        const transformed = transformCollegeData(raw);
        // Do not remove pending item here to avoid strict mode issues

        if (!currentList.some((c) => c.id === transformed.id)) {
          currentList = [...currentList, transformed];
        }
      }

      setSelectedColleges(currentList);
    } catch (err) {
      console.error("Failed to load compare list", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("compare_colleges_list", JSON.stringify(selectedColleges));

      // Remove pending item only if it's now in the list
      const pending = localStorage.getItem("pending_compare_college");
      if (pending) {
        try {
          const raw = JSON.parse(pending);
          const pendingId = raw._id || raw.id;
          if (selectedColleges.some((c) => c.id === pendingId)) {
            localStorage.removeItem("pending_compare_college");
          }
        } catch (e) {
          // If JSON parse fails, just remove it to be safe
          localStorage.removeItem("pending_compare_college");
        }
      }
    }
  }, [selectedColleges, isLoaded]);

  const handleRemoveCollege = (id: string) => {
    setSelectedColleges((prev) => prev.filter((college) => college.id !== id));
  };

  const handleAddCollege = () => {
    setIsModalOpen(true);
  };

  const handleSelectCollege = (apiCollege: any) => {
    const transformedCollege = transformCollegeData(apiCollege);
    setSelectedColleges((prev) => {
      // Prevent duplicates
      if (prev.some((c) => c.id === transformedCollege.id)) return prev;
      return [...prev, transformedCollege];
    });
    setIsModalOpen(false);
  };

  const handleClearAll = () => {
    setSelectedColleges([]);
  };

  const handleLoadSample = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch colleges from API (limit to 3 for sample comparison)
      const { data } = await api.get("/college", {
        params: {
          page: 1,
          limit: 3,
        },
      });

      const colleges = data?.data?.colleges || [];

      if (colleges.length === 0) {
        setError("No colleges found. Please try again later.");
        setIsLoading(false);
        return;
      }

      // Transform API data to CompareView format
      const transformedColleges = colleges.map(transformCollegeData);
      setSelectedColleges(transformedColleges);
    } catch (err: any) {
      console.error("Error fetching colleges:", err);
      setError(err?.response?.data?.message || "Failed to load colleges. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {selectedColleges.length === 0 ? (
        <>
          <HeroSection />
          <NoCollegesSelected
            onLoadSample={handleLoadSample}
            isLoading={isLoading}
            error={error}
          />
          <NeedHelpDeciding />
        </>
      ) : (
        <CompareView
          colleges={selectedColleges}
          onRemoveCollege={handleRemoveCollege}
          onAddCollege={handleAddCollege}
          onClearAll={handleClearAll}
        />
      )}
      <AddCollegeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectCollege}
        existingCollegeIds={selectedColleges.map((c) => c.id)}
      />
    </>
  );
}
