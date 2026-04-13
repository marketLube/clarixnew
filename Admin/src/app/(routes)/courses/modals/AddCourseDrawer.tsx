"use client"

import { useState, useEffect } from "react";
import { Accordion } from "@/src/components/ui/accordion";
import {
    Sheet,
    SheetContent,
    SheetClose,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";
import Description from "../(components)/Description";
import Why from "../(components)/Why";
import Syllabus from "../(components)/Syllabus";
import Opportunities from "../(components)/Opportunities";
import About from "../(components)/About";
import Faqs from "../(components)/Faqs";
import BasicInfo from "../(components)/BasicInfo";
import { CourseState, INITIAL_COURSE_STATE } from "../(components)/types";
import { useAddCourse } from "@/src/servicesHooks/courseHooks/useAddCourse";

interface AddCourseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCourseDrawer({ isOpen, onClose }: AddCourseDrawerProps) {
    const { addCourse, isPending, isError, error } = useAddCourse();
    const [data, setData] = useState<CourseState>(INITIAL_COURSE_STATE);

    const updateData = (updates: Partial<CourseState>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const resetForm = () => {
        setData(INITIAL_COURSE_STATE);
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);


    const handleSubmit = async () => {
        const formData = new FormData();

        // Basic Info
        formData.append("stream", data.stream);
        formData.append("name", data.courseName);
        formData.append("shortDescription", data.shortDescription);
        formData.append("type", data.programType);
        formData.append("duration", data.duration);
        formData.append("fees", data.courseFees);
        formData.append("intakeCapacity", data.intakeCapacity);

        // Eligibility - Send as JSON string array
        const eligibilityItems = data.eligibility.split(',').map(item => item.trim()).filter(Boolean);
        formData.append("eligibility", JSON.stringify(eligibilityItems));

        // Helper function to append files
        const appendFile = (key: string, file: any) => {
            if (!file) return;
            if (file instanceof File || file instanceof Blob) {
                formData.append(key, file);
            } else if (file.originFileObj) {
                formData.append(key, file.originFileObj);
            }
        };

        // Image Files
        appendFile("cardImage", data.cardImage);
        appendFile("heroImage", data.heroImage);
        appendFile("descriptionImage", data.descriptionImage);

        // Description - Send as JSON string
        const descriptionObj = {
            title: data.descriptionTitle,
            content: data.description,
        };
        formData.append("description", JSON.stringify(descriptionObj));

        // Why Choose - Send as JSON string
        const whyChooseObj = {
            title: data.whyTitle,
            description: data.whyDescription,
            reasons: data.whyReasons.filter(r => r.title || r.description), // Filter out empty reasons
        };
        formData.append("whyChoose", JSON.stringify(whyChooseObj));

        // Syllabus - Send as JSON string
        const syllabusObj = {
            title: data.syllabusTitle,
            semesters: data.syllabusSemesters
                .map(s => ({
                    ...s,
                    topics: Array.isArray(s.topics) ? s.topics.map(t => t.trim()).filter(Boolean) : []
                }))
                .filter(s => s.title || s.topics.length > 0), // Filter out empty semesters
        };
        formData.append("syllabus", JSON.stringify(syllabusObj));

        // Career Opportunities - Send as JSON string
        const careerOpportunitiesObj = {
            title: data.opportunitiesTitle,
            items: data.opportunitiesItems.filter(i => i.title || i.description), // Filter out empty items
        };
        formData.append("careerOpportunities", JSON.stringify(careerOpportunitiesObj));

        // About - Send as JSON string
        const aboutObj = {
            title: data.aboutTitle,
            description: data.aboutDescription,
            points: data.aboutPoints.filter(p => p.title || p.description), // Filter out empty points
        };
        formData.append("about", JSON.stringify(aboutObj));

        // FAQs - Send as JSON string
        const faqObj = {
            title: data.faqTitle,
            description: data.faqDescription,
            items: data.faqItems.filter(f => f.question || f.answer), // Filter out empty FAQs
        };
        formData.append("faqs", JSON.stringify(faqObj));

        addCourse(formData, {
            onSuccess: () => {
                resetForm();
                onClose();
            },
        });
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
                    <span className="text-[20px] font-bold text-gray-900 tracking-tight">Add New Course</span>
                    <SheetClose className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-all">
                        <X className="w-5 h-5 text-gray-500" />
                    </SheetClose>
                </div>

                <div className="flex-1 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <Accordion
                        type="multiple"
                        defaultValue={["basic-info", "about", "basic", "why", "syllabus", "opportunities"]}
                        className="space-y-4"
                    >
                        <BasicInfo data={data} updateData={updateData} />
                        <About data={data} updateData={updateData} />
                        <Description data={data} updateData={updateData} />
                        <Why data={data} updateData={updateData} />
                        <Syllabus data={data} updateData={updateData} />
                        <Opportunities data={data} updateData={updateData} />
                        <Faqs data={data} updateData={updateData} />
                    </Accordion>
                </div>

                <div className="p-4 bg-white border-t border-gray-100 flex justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isPending}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
                    >
                        {isPending ? "Saving..." : "Save Course"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
