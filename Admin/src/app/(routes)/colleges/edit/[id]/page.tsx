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
import FAQ from "../../add/(components)/FAQ/Faq";
import FormActionFooter from "../../add/(components)/common/FormActionFooter";
import { tabs } from "../../add/data/data";
import { useCollegeById } from "@/src/servicesHooks/collegeHooks/useCollegeById";
import { useUpdateCollege } from "@/src/servicesHooks/collegeHooks/useUpdateCollege";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import CampusLife from "../../add/(components)/CampusLife/CampusLife";
import Gallery from "../../add/(components)/Gallery/Gallery";

export default function EditCollegePage() {
  const router = useRouter();
  const params = useParams();
  const collegeId = params.id as string;

  const { data, isLoading, error, refetch } = useCollegeById(collegeId);
  const { updateCollege, isPending, isError, error: updateError } = useUpdateCollege();
  const collegeData = data?.data;

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
        accreditation: collegeData.accreditation || [],
        logo: collegeData.logo || null,
        brochure: collegeData.brochure || null,
        description: collegeData.description || "",
        university: collegeData.university?._id || collegeData.university || "",
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
        admissionMode: collegeData.admissionMode || [],
        hostelFee: collegeData.hostelFee || "",
        messFee: collegeData.messFee || "",
        libraryFee: collegeData.libraryFee || "",
        laboratoryFee: collegeData.laboratoryFee || "",
        sportsFee: collegeData.sportsFee || "",
        scholarships: collegeData.scholarships || [],
        campusLife: collegeData.campusLife || [],
        campusImages: collegeData.campusImages || [],
        hostelImages: collegeData.hostelImages || [],
        labsImages: collegeData.labsImages || [],
        eventsImages: collegeData.eventsImages || [],
        admissionFaqs: collegeData.admissionFaqs || [],
        courseFaqs: collegeData.courseFaqs || [],
        feesPaymentFaqs: collegeData.feesPaymentFaqs || [],
        scholarshipFaqs: collegeData.scholarshipFaqs || [],
        category: collegeData.category?.name || collegeData.category?.title || collegeData.category || "",
      });
    }
  }, [collegeData]);

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

      // Only append files if they are new File objects (not URLs from existing data)
      if (formData.logo && typeof formData.logo !== 'string') {
        formDataToSend.append('logo', formData.logo);
      }
      if (formData.brochure && typeof formData.brochure !== 'string') {
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

      updateCollege({ id: collegeId, formData: formDataToSend }, {
        onSuccess: () => {
          router.push('/colleges');
        },
        onError: (error: any) => {
          alert(error?.response?.data?.message || "Failed to update college. Please try again.");
        },
      });
    }
  };

  const handleBack = () => {
    if (!isFirstTab) {
      setActiveTab(tabs[currentTabIndex - 1]);
    }
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
          title="Edit College Details"
          description="Update college information"
        />
      </div>

      <div className="flex flex-1 rounded-xl border border-black/10 bg-white overflow-hidden">
        <AddSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "Basic Information" && (
              <BasicInfo formData={formData} onUpdate={handleInputChange} readOnly={false} />
            )}
            {activeTab === "Overview" && (
              <Overview formData={formData} onUpdate={handleInputChange} readOnly={false} />
            )}
            {activeTab === "Courses" && (
              <Course formData={formData} onUpdate={handleInputChange} readOnly={false} />
            )}
            {activeTab === "Admissions & Exams" && (
              <Admission formData={formData} onUpdate={handleInputChange} readOnly={false} />
            )}
            {activeTab === "Fees & Scholarships" && (
              <Fee formData={formData} onUpdate={handleInputChange} readOnly={false} />
            )}
            {activeTab === "Placements" && (
              <Placement formData={formData} onUpdate={handleInputChange} readOnly={false} />
            )}
            {activeTab === "Campus Life" && (
              <CampusLife formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "Gallery" && (
              <Gallery formData={formData} onUpdate={handleInputChange} />
            )}
            {activeTab === "FAQs" && (
              <FAQ formData={formData} onUpdate={handleInputChange} readOnly={false} />
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

