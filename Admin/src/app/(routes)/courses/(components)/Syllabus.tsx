"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { CourseState, Semester } from "./types";

interface SyllabusProps {
    data: CourseState;
    updateData: (updates: Partial<CourseState>) => void;
    readOnly?: boolean;
}

export default function Syllabus({ data, updateData, readOnly = false }: SyllabusProps) {

    const handleSemesterChange = (
        index: number,
        field: keyof Semester,
        value: string | string[]
    ) => {
        const newSemesters = [...data.syllabusSemesters];
        // @ts-ignore
        newSemesters[index] = { ...newSemesters[index], [field]: value };
        updateData({ syllabusSemesters: newSemesters });
    };

    const addSemester = () => {
        updateData({ syllabusSemesters: [...data.syllabusSemesters, { title: "", topics: [] }] });
    };

    const removeSemester = (index: number) => {
        if (data.syllabusSemesters.length > 1) {
            const newSemesters = data.syllabusSemesters.filter((_, i) => i !== index);
            updateData({ syllabusSemesters: newSemesters });
        }
    };

    return (
        <AccordionItem
            value="syllabus"
            className="bg-white rounded-[12px] px-4 py-2 !border-b-0"
        >
            <AccordionTrigger className="hover:no-underline data-[state=open]:border-b rounded-none py-2 text-[15px] font-medium text-black !border-gray-200">
                Syllabus
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2 px-1">
                <div className="flex flex-col gap-3">
                    {/* Global Title Field */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="syllabus-title"
                            className="text-[12px] font-medium text-[#364440]"
                        >
                            Title
                        </Label>
                        <Input
                            id="syllabus-title"
                            placeholder="Title"
                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                            readOnly={readOnly}
                            value={data.syllabusTitle}
                            onChange={(e) => updateData({ syllabusTitle: e.target.value })}
                        />
                    </div>

                    {/* Semesters List */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-[12px] font-medium text-[#364440]">
                            Semesters
                        </Label>
                        <div className="flex flex-col gap-4">
                            {data.syllabusSemesters.map((semester, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 p-4 border !border-gray-400 rounded-[8px] relative"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Semester Title
                                        </Label>
                                        <Input
                                            readOnly={readOnly}
                                            value={semester.title}
                                            onChange={(e) =>
                                                handleSemesterChange(index, "title", e.target.value)
                                            }
                                            placeholder="e.g. Semester 1"
                                            className="h-[38px] border-[#d3e0dc] rounded-[8px] !border-gray-400 text-[13px]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-[12px] font-medium text-[#364440]">
                                            Topics
                                        </Label>
                                        <Textarea
                                            readOnly={readOnly}
                                            value={Array.isArray(semester.topics) ? semester.topics.join("\n") : semester.topics}
                                            onChange={(e) =>
                                                handleSemesterChange(index, "topics", e.target.value.split("\n"))
                                            }
                                            placeholder="List topics (one per line)..."
                                            className="min-h-[80px] border-[#d3e0dc] rounded-[8px] !border-gray-400 resize-none text-[13px]"
                                        />
                                    </div>
                                    {!readOnly && data.syllabusSemesters.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeSemester(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 h-8 w-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {!readOnly && (
                            <div className="mt-1">
                                <Button
                                    variant="outline"
                                    onClick={addSemester}
                                    className="w-full text-[13px]"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add semester
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
