"use client";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select } from "@/src/components/ui/Selector";
import { UploadZone } from "@/src/components/ui/FileUpload";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { CourseState } from "./types";
import { useStreams } from "@/src/servicesHooks/streamHooks/useStream";

interface BasicInfoProps {
    data: CourseState;
    updateData: (updates: Partial<CourseState>) => void;
    readOnly?: boolean;
}

const PROGRAM_TYPE_OPTIONS = [
    { label: "Full Time", value: "Full Time" },
    { label: "Part Time", value: "Part Time" },
    { label: "Distance", value: "Distance" },
    { label: "Online", value: "Online" },
    { label: "Other", value: "Other" },
];

export default function BasicInfo({ data, updateData, readOnly = false }: BasicInfoProps) {
    const { data: streamsResponse, isLoading: isLoadingStreams } = useStreams({ limit: 100 });

    const streamOptions = streamsResponse?.data?.streams?.map(stream => ({
        label: stream.name,
        value: stream._id
    })) || [];

    const handleChange = (field: keyof CourseState, value: string) => {
        if (!readOnly) {
            updateData({ [field]: value });
        }
    };

    return (
        <AccordionItem
            value="basic-info"
            className="bg-white rounded-[12px] px-4 py-2 !border-b-0"
        >
            <AccordionTrigger className="hover:no-underline data-[state=open]:border-b rounded-none py-2 text-[15px] font-medium text-black !border-gray-200">
                Basic Info
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-1">
                <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                    {/* Row 1 */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Stream
                        </Label>
                        <Select
                            value={data.stream}
                            onValueChange={(val) => handleChange("stream", val)}
                            options={streamOptions}
                            placeholder={isLoadingStreams ? "Loading Streams..." : "Select Stream"}
                            disabled={readOnly || isLoadingStreams}
                            className="!border-gray-400 rounded-[8px] h-[38px] text-[13px]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Course Name
                        </Label>
                        <Input
                            value={data.courseName}
                            onChange={(e) => handleChange("courseName", e.target.value)}
                            placeholder="e.g., B.Tech Computer Science"
                            disabled={readOnly}
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                        />
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col gap-2 col-span-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Short Description
                        </Label>
                        <Input
                            value={data.shortDescription}
                            onChange={(e) => handleChange("shortDescription", e.target.value)}
                            placeholder="A short industry-aligned program designed to build strong technical foundations..."
                            disabled={readOnly}
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Program Type
                        </Label>
                        <Select
                            value={data.programType}
                            onValueChange={(val) => handleChange("programType", val)}
                            options={PROGRAM_TYPE_OPTIONS}
                            placeholder="Select Type"
                            disabled={readOnly}
                            className="!border-gray-400 rounded-[8px] h-[38px] text-[13px]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Duration
                        </Label>
                        <Input
                            value={data.duration}
                            onChange={(e) => handleChange("duration", e.target.value)}
                            placeholder="e.g., 4 years"
                            disabled={readOnly}
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                        />
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Course Fees
                        </Label>
                        <Input
                            value={data.courseFees}
                            onChange={(e) => handleChange("courseFees", e.target.value)}
                            placeholder="e.g., ₹2 LPA"
                            disabled={readOnly}
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Intake Capacity
                        </Label>
                        <Input
                            value={data.intakeCapacity}
                            onChange={(e) => handleChange("intakeCapacity", e.target.value)}
                            placeholder="e.g., 30 seats"
                            disabled={readOnly}
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                        />
                    </div>

                    {/* Row 4 */}
                    <div className="flex flex-col gap-2 col-span-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Eligibility
                        </Label>
                        <Input
                            value={data.eligibility}
                            onChange={(e) => handleChange("eligibility", e.target.value)}
                            placeholder="e.g., M.Tech/M.Sc. in relevant field (60%)"
                            disabled={readOnly}
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                        />
                    </div>

                    {/* File Uploads - Row 5 */}
                    <div className="flex flex-col gap-2 mt-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Card Image
                        </Label>
                        <UploadZone
                            id="card-image-upload"
                            onFileSelect={(file) => !readOnly && updateData({ cardImage: file })}
                            file={data.cardImage}
                            onClear={() => !readOnly && updateData({ cardImage: null })}
                            title="Upload Card Image"
                            description="Recommended: 800x600px, max 2MB"
                            className="bg-white border-dashed !border-gray-400"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Hero Section Image
                        </Label>
                        <UploadZone
                            id="hero-image-upload"
                            onFileSelect={(file) => !readOnly && updateData({ heroImage: file })}
                            file={data.heroImage}
                            onClear={() => !readOnly && updateData({ heroImage: null })}
                            title="Upload Hero Image"
                            description="Recommended: 1920x600px, max 5MB"
                            className="bg-white border-dashed !border-gray-400"
                        />
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}


