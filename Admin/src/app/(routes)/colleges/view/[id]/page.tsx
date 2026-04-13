"use client";

import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import AddSidebar from "../../add/(components)/common/AddSidebar";
import { useState, useEffect } from "react";
import BasicInfo from "../../add/(components)/BasicInfo/BasicInfo";
import Overview from "../../add/(components)/Overview/Overview";
import Course from "../../add/(components)/Course/Course";
import Admission from "../../add/(components)/Admission/Admission";
import Fee from "../../add/(components)/Fee/Fee";
import Placement from "../../add/(components)/placement/Placement";
import CampusLife from "../../add/(components)/CampusLife/CampusLife";
import Gallery from "../../add/(components)/Gallery/Gallery";
import FAQ from "../../add/(components)/FAQ/Faq";
import { tabs } from "../../add/data/data";
import { useCollegeById } from "@/src/servicesHooks/collegeHooks/useCollegeById";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";

export default function ViewCollegePage() {
  const router = useRouter();
  const params = useParams();
  const collegeId = params.id as string;

  const { data, isLoading, error, refetch } = useCollegeById(collegeId);
  const collegeData = data?.data;

  const [activeTab, setActiveTab] = useState("Basic Information");
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    type: "",
    establishedYear: "",
    rating: "",
    accreditation: "",
    logo: null,
    brochure: null,
    description: "",
    university: "",
    students: "",
    campusSize: "",
    averageSalary: "",
    placementPercentage: "",
    highestSalary: "",
    recruitersCount: "",
    studentsWithInternships: "",
    avgStipend: "",
    ppoConversionRate: "",
    alumniInFortune500: "",
    alumniEntrepreneurs: "",
    alumniHigherStudiesAbroad: "",
    placementTrends: [],
    recruiters: [],
    courses: [],
    applicationOpeningDate: "",
    applicationClosingDate: "",
    entranceExam: "",
    entranceExamDate: "",
    meritListAnnouncementDate: "",
    counsellingStartsFrom: "",
    accademicSectionStartsFrom: "",
    admissionMode: "",
    hostelFee: "",
    messFee: "",
    libraryFee: "",
    laboratoryFee: "",
    sportsFee: "",
    scholarships: [],
    campusLife: [],
    admissionFaqs: [],
    courseFaqs: [],
    feesPaymentFaqs: [],
    scholarshipFaqs: [],
    category: "",
  });

  // Populate form data when college data is loaded
  useEffect(() => {
    if (collegeData) {
      setFormData({
        name: collegeData.name || "",
        state: collegeData.state || "",
        city: collegeData.city || "",
        type: collegeData.type || "",
        establishedYear: collegeData.establishedYear || "",
        rating: collegeData.rating || "",
        accreditation: collegeData.accreditation || "",
        logo: collegeData.logo || null,
        brochure: collegeData.brochure || null,
        description: collegeData.description || "",
        university: collegeData.university || "",
        students: collegeData.students || "",
        campusSize: collegeData.campusSize || "",
        averageSalary: collegeData.averageSalary || "",
        placementPercentage: collegeData.placementPercentage || "",
        highestSalary: collegeData.highestSalary || "",
        recruitersCount: collegeData.recruitersCount || "",
        studentsWithInternships: collegeData.studentsWithInternships || "",
        avgStipend: collegeData.avgStipend || "",
        ppoConversionRate: collegeData.ppoConversionRate || "",
        alumniInFortune500: collegeData.alumniInFortune500 || "",
        alumniEntrepreneurs: collegeData.alumniEntrepreneurs || "",
        alumniHigherStudiesAbroad: collegeData.alumniHigherStudiesAbroad || "",
        placementTrends: collegeData.placementTrends || [],
        recruiters: collegeData.recruiters || [],
        courses: collegeData.courses || [],
        applicationOpeningDate: collegeData.applicationOpeningDate || "",
        applicationClosingDate: collegeData.applicationClosingDate || "",
        entranceExam: collegeData.entranceExam || "",
        entranceExamDate: collegeData.entranceExamDate || "",
        meritListAnnouncementDate: collegeData.meritListAnnouncementDate || "",
        counsellingStartsFrom: collegeData.counsellingStartsFrom || "",
        accademicSectionStartsFrom: collegeData.accademicSectionStartsFrom || "",
        admissionMode: collegeData.admissionMode || "",
        hostelFee: collegeData.hostelFee || "",
        messFee: collegeData.messFee || "",
        libraryFee: collegeData.libraryFee || "",
        laboratoryFee: collegeData.laboratoryFee || "",
        sportsFee: collegeData.sportsFee || "",
        scholarships: collegeData.scholarships || [],
        campusLife: collegeData.campusLife || [],
        admissionFaqs: collegeData.admissionFaqs || [],
        courseFaqs: collegeData.courseFaqs || [],
        feesPaymentFaqs: collegeData.feesPaymentFaqs || [],
        scholarshipFaqs: collegeData.scholarshipFaqs || [],
        category: collegeData.category?.name || collegeData.category?.title || collegeData.category || "",
      });
    }
  }, [collegeData]);

  // This function does nothing in view mode
  const handleInputChange = (field: string, value: any) => {
    // No-op in view mode
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="py-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorPage
          message={error.message || "Failed to fetch college details. Please try again."}
          onRetry={() => refetch()}
          className="my-8"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-start px-1">
        <div
          className="flex items-center justify-start mb-1 cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100"
          onClick={() => router.back()}
        >
          <ChevronLeft className="text-black" />
        </div>

        <SectionHeading
          title="View College Details"
          description="View complete college information"
        />
      </div>

      <div className="flex flex-1 rounded-xl border border-black/10 bg-white overflow-hidden">
        <AddSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "Basic Information" && (
              <BasicInfo formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
            {activeTab === "Overview" && (
              <Overview formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
            {activeTab === "Courses" && (
              <Course formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
            {activeTab === "Admissions & Exams" && (
              <Admission formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
            {activeTab === "Fees & Scholarships" && (
              <Fee formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
            {activeTab === "Placements" && (
              <Placement formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
            {activeTab === "Campus Life" && (
              <CampusLife formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
            {activeTab === "Gallery" && (
              <Gallery formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "FAQs" && (
              <FAQ formData={formData} onUpdate={handleInputChange} readOnly={true} />
            )}
          </div>

          {/* No footer with save/next buttons in view mode */}
        </div>
      </div>
    </div>
  );
}

