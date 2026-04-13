"use client";

import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AddSidebar from "./(components)/common/AddSidebar";
import { useState, useEffect } from "react";
import BasicInfo from "./(components)/BasicInfo/BasicInfo";
import Overview from "./(components)/Overview/Overview";
import Course from "./(components)/Course/Course";
import Admission from "./(components)/Admission/Admission";
import Fee from "./(components)/Fee/Fee";
import Placement from "./(components)/placement/Placement";
// import CampusLife from "./(components)/CampusLife/CampusLife";
// import Gallery from "./(components)/Gallery/Gallery";
import FAQ from "./(components)/FAQ/Faq";
import FormActionFooter from "./(components)/common/FormActionFooter";
import { tabs } from "./data/data";
import { useAddCollege } from "@/src/servicesHooks/collegeHooks/useAddCollege";
import CampusLife from "./(components)/CampusLife/CampusLife";
import Gallery from "./(components)/Gallery/Gallery";



export default function AddCollegePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { addCollege, isPending, isError, error } = useAddCollege();
  const [activeTab, setActiveTab] = useState("Basic Information");
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    type: "",
    establishedYear: "",
    rating: "",
    accreditation: [],
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
    admissionMode: [],
    hostelFee: "",
    messFee: "",
    libraryFee: "",
    laboratoryFee: "",
    sportsFee: "",
    scholarships: [],
    campusLife: [],
    campusImages: [],
    hostelImages: [],
    labsImages: [],
    eventsImages: [],
    admissionFaqs: [],
    courseFaqs: [],
    feesPaymentFaqs: [],
    scholarshipFaqs: [],
    category: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }


  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const currentTabIndex = tabs.indexOf(activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === tabs.length - 1;

  const handleNext = async () => {
    if (!isLastTab) {
      setActiveTab(tabs[currentTabIndex + 1]);
    } else {
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('establishedYear', formData.establishedYear);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('accreditation', JSON.stringify(formData.accreditation));
      formDataToSend.append('description', formData.description);
      formDataToSend.append('university', formData.university);
      formDataToSend.append('students', formData.students);
      formDataToSend.append('campusSize', formData.campusSize);
      formDataToSend.append('averageSalary', formData.averageSalary);
      formDataToSend.append('placementPercentage', formData.placementPercentage);
      formDataToSend.append('highestSalary', formData.highestSalary);
      formDataToSend.append('recruitersCount', formData.recruitersCount);
      formDataToSend.append('studentsWithInternships', formData.studentsWithInternships);
      formDataToSend.append('avgStipend', formData.avgStipend);
      formDataToSend.append('ppoConversionRate', formData.ppoConversionRate);
      formDataToSend.append('alumniInFortune500', formData.alumniInFortune500);
      formDataToSend.append('alumniEntrepreneurs', formData.alumniEntrepreneurs);
      formDataToSend.append('alumniHigherStudiesAbroad', formData.alumniHigherStudiesAbroad);

      // Only append dates if they have values
      if (formData.applicationOpeningDate) {
        formDataToSend.append('applicationOpeningDate', formData.applicationOpeningDate);
      }
      if (formData.category) {
        formDataToSend.append('category', formData.category);
      }
      if (formData.applicationClosingDate) {
        formDataToSend.append('applicationClosingDate', formData.applicationClosingDate);
      }
      if (formData.entranceExam) {
        formDataToSend.append('entranceExam', formData.entranceExam);
      }
      if (formData.entranceExamDate) {
        formDataToSend.append('entranceExamDate', formData.entranceExamDate);
      }
      if (formData.meritListAnnouncementDate) {
        formDataToSend.append('meritListAnnouncementDate', formData.meritListAnnouncementDate);
      }
      if (formData.counsellingStartsFrom) {
        formDataToSend.append('counsellingStartsFrom', formData.counsellingStartsFrom);
      }
      if (formData.accademicSectionStartsFrom) {
        formDataToSend.append('accademicSectionStartsFrom', formData.accademicSectionStartsFrom);
      }

      formDataToSend.append('admissionMode', JSON.stringify(formData.admissionMode));
      formDataToSend.append('hostelFee', formData.hostelFee);
      formDataToSend.append('messFee', formData.messFee);
      formDataToSend.append('libraryFee', formData.libraryFee);
      formDataToSend.append('laboratoryFee', formData.laboratoryFee);
      formDataToSend.append('sportsFee', formData.sportsFee);
      // formDataToSend.append('campusLifeDescription', formData.campusLifeDescription);

      // Ensure we send only IDs for related entities
      const processArrayField = (field: any[]) => {
        if (!Array.isArray(field)) return [];
        return field.map((item: any) => {
          // If item is an object with _id, extract the ID
          if (typeof item === 'object' && item !== null && item._id) {
            return item._id;
          }
          // If item is already a string or number, return as is
          return item;
        });
      };

      formDataToSend.append('placementTrends', JSON.stringify(formData.placementTrends));
      formDataToSend.append('recruiters', JSON.stringify(processArrayField(formData.recruiters)));
      formDataToSend.append('courses', JSON.stringify(processArrayField(formData.courses)));
      formDataToSend.append('scholarships', JSON.stringify(processArrayField(formData.scholarships)));
      // Manage Campus Life Images and placeholders with sequential indexing
      let campusLifeFileIndex = 0;
      const campusLifeWithPlaceholders = formData.campusLife.map((item: any) => {
        if (item.imageFile) {
          formDataToSend.append('campusLifeImages', item.imageFile);
          const placeholder = `FILE_${campusLifeFileIndex}`;
          campusLifeFileIndex++;
          return { ...item, image: placeholder, imageFile: undefined };
        }
        return item;
      });

      formDataToSend.append('campusLife', JSON.stringify(campusLifeWithPlaceholders));
      formDataToSend.append('admissionFaqs', JSON.stringify(formData.admissionFaqs));
      formDataToSend.append('courseFaqs', JSON.stringify(formData.courseFaqs));
      formDataToSend.append('feesPaymentFaqs', JSON.stringify(formData.feesPaymentFaqs));
      formDataToSend.append('scholarshipFaqs', JSON.stringify(formData.scholarshipFaqs));

      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }
      if (formData.brochure) {
        formDataToSend.append('brochure', formData.brochure);
      }

      // Handle Gallery Images (mix of URLs and Files)
      const galleryFields = ['campusImages', 'hostelImages', 'labsImages', 'eventsImages'];
      galleryFields.forEach(field => {
        const images = (formData as any)[field] || [];
        const existingUrls: string[] = [];

        images.forEach((img: any) => {
          if (img instanceof File) {
            formDataToSend.append(field, img);
          } else if (typeof img === 'string') {
            existingUrls.push(img);
          }
        });

        // Send the existing URLs as a JSON string so server can preserve them
        formDataToSend.append(field, JSON.stringify(existingUrls));
      });

      console.log("Form Data to Send:", formDataToSend);

      addCollege(formDataToSend, {
        onSuccess: (data: any) => {
          console.log("College created successfully:", data);
          router.push('/colleges');
        },
        onError: (error: any) => {
          console.error("Error creating college:", error);
          alert(error?.response?.data?.message || "Failed to create college. Please try again.");
        },
      });
    }
  };

  const handleBack = () => {
    if (!isFirstTab) {
      setActiveTab(tabs[currentTabIndex - 1]);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 ">
      <div className="flex items-start px-1">
        <div
          className="flex items-center justify-start mb-1 cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100"
          onClick={() => router.back()}
        >
          <ChevronLeft className="text-black" />
        </div>

        <SectionHeading
          title="Add New College"
          description="Enter verified college information to make it discoverable across Clarix"
        />
      </div>

      <div className="flex flex-1 rounded-xl border border-black/10 bg-white overflow-hidden">
        <AddSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "Basic Information" && (
              <BasicInfo formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Overview" && (
              <Overview formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Courses" && (
              <Course formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Admissions & Exams" && (
              <Admission formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Fees & Scholarships" && (
              <Fee formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Placements" && (
              <Placement formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Campus Life" && (
              <CampusLife formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Gallery" && (
              <Gallery formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "FAQs" && (
              <FAQ formData={formData} onUpdate={handleInputChange} />
            )}
          </div>

          <div className="sticky bottom-0 border-t border-black/10 px-6 bg-white shrink-0">
            <FormActionFooter
              onBack={handleBack}
              onNext={handleNext}
              isFirstTab={isFirstTab}
              isLastTab={isLastTab}
              isLoading={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
