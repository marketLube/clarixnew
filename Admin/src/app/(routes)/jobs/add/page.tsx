"use client";

import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import JobSidebar from "./(components)/common/JobSidebar";
import JobFormFooter from "./(components)/common/JobFormFooter";
import { tabs } from "./data/data";
import JobDetails from "./(components)/JobDetails/JobDetails";
import About from "./(components)/About/About";
import QA from "./(components)/Q&A/QA";
import { useAddJob } from "@/src/servicesHooks/jobHooks/useAddJob";
import { useJobById } from "@/src/servicesHooks/jobHooks/useJobById";
import { useUpdateJob } from "@/src/servicesHooks/jobHooks/useUpdateJob";
import { FAQItem, Job } from "@/src/servicesHooks/jobHooks/types/jobHooksType";
import { toast } from "sonner";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";

import { Suspense } from "react";

function AddJobForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobId = searchParams.get("id");
    const mode = searchParams.get("mode");
    const isViewMode = mode === "view";
    const [activeTab, setActiveTab] = useState("Job details");

    const { addJob, isPending: isAdding } = useAddJob();
    const { updateJob, isPending: isUpdating } = useUpdateJob();

    const { data: jobData, isLoading: isJobLoading, error: jobError, refetch } = useJobById(jobId || "",);
    const job: Job | undefined = jobData?.data;

    const [formData, setFormData] = useState({
        jobTitle: "",
        companyName: "",
        jobType: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        salaryUnit: "LPA",
        companyWebsite: "",
        employeeSize: "",
        industry: "",
        shortDescription: "",
        aboutJob: "",
        aboutYou: "",
        aboutRole: "",
        faqs: [
            { question: "", answer: "" },
            { question: "", answer: "" },
            { question: "", answer: "" },
        ],
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
        const updatedFaqs = [...formData.faqs];
        updatedFaqs[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            faqs: updatedFaqs,
        }));
    };

    // hydrate form when editing
    useEffect(() => {
        if (job && jobId) {
            setFormData({
                jobTitle: job.jobTitle || "",
                companyName: job.companyName || "",
                jobType: job.jobType || "",
                location: job.location || "",
                salaryMin: job.salary?.min !== undefined ? String(job.salary.min) : "",
                salaryMax: job.salary?.max !== undefined ? String(job.salary.max) : "",
                salaryUnit: job.salary?.unit || "LPA",
                companyWebsite: job.companyWebsite || "",
                employeeSize: job.employeeSize || "",
                industry: job.industry || "",
                shortDescription: job.shortDescription || "",
                aboutJob: job.aboutJob || "",
                aboutYou: (job.aboutYou || []).join("\n"),
                aboutRole: (job.aboutRole || []).join("\n"),
                faqs: job.faqs && job.faqs.length > 0
                    ? [
                        job.faqs[0] || { question: "", answer: "" },
                        job.faqs[1] || { question: "", answer: "" },
                        job.faqs[2] || { question: "", answer: "" },
                    ]
                    : [
                        { question: "", answer: "" },
                        { question: "", answer: "" },
                        { question: "", answer: "" },
                    ],
            });
        }
    }, [job, jobId]);

    const currentTabIndex = tabs.indexOf(activeTab);
    const isFirstTab = currentTabIndex === 0;
    const isLastTab = currentTabIndex === tabs.length - 1;

    const handleNext = () => {
        // In view mode, Next only navigates between tabs, no submit
        if (isViewMode) {
            if (!isLastTab) {
                setActiveTab(tabs[currentTabIndex + 1]);
            }
            return;
        }

        if (!isLastTab) {
            setActiveTab(tabs[currentTabIndex + 1]);
        } else {
            const payload = {
                jobTitle: formData.jobTitle,
                companyName: formData.companyName,
                jobType: formData.jobType as any,
                location: formData.location,
                salary: {
                    min: parseFloat(formData.salaryMin),
                    max: parseFloat(formData.salaryMax),
                    unit: formData.salaryUnit as any,
                },
                companyWebsite: formData.companyWebsite,
                employeeSize: formData.employeeSize,
                industry: formData.industry,
                shortDescription: formData.shortDescription,
                aboutJob: formData.aboutJob,
                aboutYou: formData.aboutYou.split('\n').filter(item => item.trim()),
                aboutRole: formData.aboutRole.split('\n').filter(item => item.trim()),
                faqs: formData.faqs.filter(faq => faq.question && faq.answer) as FAQItem[],
            };

            if (jobId) {
                updateJob(
                    { id: jobId, payload },
                    {
                        onSuccess: () => {
                            router.push("/jobs");
                        },
                    }
                );
            } else {
                addJob(payload, {
                    onSuccess: () => {
                        router.push("/jobs");
                    },
                });
            }
        }
    };

    const handleBack = () => {
        if (!isFirstTab) {
            setActiveTab(tabs[currentTabIndex - 1]);
        }
    };

    const isSaving = isAdding || isUpdating;

    if (jobId && isJobLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader size="md" />
            </div>
        );
    }

    if (jobId && jobError) {
        return (
            <div className="flex items-center justify-center h-full">
                <ErrorPage
                    message={(jobError as any).message || "Failed to load job details"}
                    onRetry={() => refetch()}
                />
            </div>
        );
    }

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
                    title={jobId ? (isViewMode ? "View Job" : "Edit Job") : "Add New Job"}
                    description="Post and manage job opportunities for students"
                />
            </div>

            <div className="flex flex-1 rounded-xl border border-black/10 bg-white overflow-hidden">
                <JobSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    <div className="flex-1 p-6 overflow-y-auto">
                        {activeTab === "Job details" && (
                            <JobDetails formData={formData} onUpdate={handleInputChange} readOnly={isViewMode} />
                        )}
                        {activeTab === "About" && (
                            <About formData={formData} onUpdate={handleInputChange} readOnly={isViewMode} />
                        )}
                        {activeTab === "Q&A" && (
                            <QA formData={formData} onFaqChange={handleFaqChange} readOnly={isViewMode} />
                        )}
                    </div>

                    <div className="sticky bottom-0 border-t border-black/10 px-6 bg-white shrink-0">
                        <JobFormFooter
                            onBack={handleBack}
                            onNext={handleNext}
                            isFirstTab={isFirstTab}
                            isLastTab={isLastTab}
                            isLoading={isSaving}
                            isViewMode={isViewMode}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AddJobPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader size="md" /></div>}>
            <AddJobForm />
        </Suspense>
    );
}