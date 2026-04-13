"use client"

import { Accordion } from "@/src/components/ui/accordion";
import {
    Sheet,
    SheetContent,
    SheetClose,
} from "@/src/components/ui/sheet";
import { X } from "lucide-react";
import Description from "../(components)/Description";
import Why from "../(components)/Why";
import Syllabus from "../(components)/Syllabus";
import Opportunities from "../(components)/Opportunities";
import About from "../(components)/About";
import Faqs from "../(components)/Faqs";
import BasicInfo from "../(components)/BasicInfo";
import { useCourseById } from "@/src/servicesHooks/courseHooks/useCourseById";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { CourseState } from "../(components)/types";
import { useState, useEffect } from "react";

interface ViewCourseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string | null;
}

export default function ViewCourseDrawer({ isOpen, onClose, courseId }: ViewCourseDrawerProps) {
    const { data, isLoading, error, refetch } = useCourseById(courseId || "");
    const courseData = data?.data;
    const [viewData, setViewData] = useState<CourseState | null>(null);

    useEffect(() => {
        if (courseData) {
            setViewData({
                stream: courseData.stream?._id || courseData.stream || "",
                courseName: courseData.name || "",
                shortDescription: courseData.shortDescription || "",
                programType: courseData.type || "",
                duration: courseData.duration || "",
                courseFees: courseData.fees || "",
                intakeCapacity: courseData.intakeCapacity || "",
                eligibility: Array.isArray(courseData.eligibility) ? courseData.eligibility.join(', ') : "",
                cardImage: courseData.cardImage || null,
                heroImage: courseData.heroImage || null,
                descriptionTitle: courseData.description?.title || "",
                description: courseData.description?.content || "",
                descriptionImage: courseData.description?.image || null,
                whyTitle: courseData.whyChoose?.title || "",
                whyDescription: courseData.whyChoose?.description || "",
                whyReasons: courseData.whyChoose?.reasons || [{ title: "", description: "" }],
                syllabusTitle: courseData.syllabus?.title || "",
                syllabusSemesters: courseData.syllabus?.semesters || [{ title: "", topics: [] }],
                opportunitiesTitle: courseData.careerOpportunities?.title || "",
                opportunitiesItems: courseData.careerOpportunities?.items || [{ title: "", description: "" }],
                aboutTitle: courseData.about?.title || "",
                aboutDescription: courseData.about?.description || "",
                aboutPoints: courseData.about?.points || [{ title: "", description: "" }],
                faqTitle: courseData.faqs?.title || "",
                faqDescription: courseData.faqs?.description || "",
                faqItems: courseData.faqs?.items || [{ question: "", answer: "" }],
            });
        }
    }, [courseData]);

    const updateData = () => {
        // No-op in view mode
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                hideClose={true}
                side="right"
                className="sm:max-w-[700px] p-0 border-none bg-[#F5F5F5] overflow-hidden flex flex-col font-sans"
            >
                {/* Header */}
                <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-100">
                    <span className="text-[20px] font-bold text-gray-900 tracking-tight">View Course Details</span>
                    <SheetClose className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-all">
                        <X className="w-5 h-5 text-gray-500" />
                    </SheetClose>
                </div>

                {isLoading && (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader className="py-20" />
                    </div>
                )}

                {error && (
                    <div className="flex-1 flex items-center justify-center p-6">
                        <ErrorPage
                            message={error.message || "Failed to fetch course details. Please try again."}
                            onRetry={() => refetch()}
                            className="my-8"
                        />
                    </div>
                )}

                {!isLoading && !error && viewData && (
                    <div className="flex-1 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <Accordion
                            type="multiple"
                            defaultValue={["basic-info", "about", "basic", "why", "syllabus", "opportunities"]}
                            className="space-y-4"
                        >
                            <BasicInfo data={viewData} updateData={updateData} readOnly={true} />
                            <About data={viewData} updateData={updateData} readOnly={true} />
                            <Description data={viewData} updateData={updateData} readOnly={true} />
                            <Why data={viewData} updateData={updateData} readOnly={true} />
                            <Syllabus data={viewData} updateData={updateData} readOnly={true} />
                            <Opportunities data={viewData} updateData={updateData} readOnly={true} />
                            <Faqs data={viewData} updateData={updateData} readOnly={true} />
                        </Accordion>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

