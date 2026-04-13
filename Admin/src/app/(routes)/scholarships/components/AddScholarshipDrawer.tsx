"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/src/components/ui/sheet";
import {
    X,
    Calendar as CalendarIcon,
    ArrowLeft,
    ArrowRight,
    FileText,
    Globe,
    Loader2
} from "lucide-react";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Select } from "@/src/components/ui/Selector";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DatePickerCalendar from "../../colleges/add/(components)/Admission/(components)/DatePickerCalendar";
import { useAddScholarship } from "@/src/servicesHooks/scholarshipHooks/useAddScholarship";
import { toast } from "sonner";

interface AddScholarshipDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const scholarshipTypeOptions = [
    { label: "Merit Based", value: "Merit Based" },
    { label: "Need Based", value: "Need Based" },
    { label: "Government", value: "Government" },
    { label: "Private", value: "Private" },
    { label: "Sports", value: "Sports" },
    { label: "Minority", value: "Minority" },
    { label: "International", value: "International" },
];

const fundingTypeOptions = [
    { label: "Full Funding", value: "Full Funding" },
    { label: "Partial Funding", value: "Partial Funding" },
    { label: "Tuition Waiver", value: "Tuition Waiver" },
    { label: "Stipend", value: "Stipend" },
    { label: "One-Time Grant", value: "One-Time Grant" },
];

export function AddScholarshipDrawer({ open, onOpenChange }: AddScholarshipDrawerProps) {
    const [scholarshipName, setScholarshipName] = useState("");
    const [scholarshipType, setScholarshipType] = useState("");
    const [fundingType, setFundingType] = useState("");
    const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
    const [totalFundingAmount, setTotalFundingAmount] = useState("");
    const [description, setDescription] = useState("");
    const [officialWebsite, setOfficialWebsite] = useState("");

    const { addScholarship, isPending, isSuccess } = useAddScholarship();

    // Reset form when drawer opens
    useEffect(() => {
        if (open) {
            resetForm();
        }
    }, [open]);

    // Close drawer on successful submission
    useEffect(() => {
        if (isSuccess) {
            onOpenChange(false);
            resetForm();
        }
    }, [isSuccess, onOpenChange]);

    function resetForm() {
        setScholarshipName("");
        setScholarshipType("");
        setFundingType("");
        setDeadlineDate(null);
        setTotalFundingAmount("");
        setDescription("");
        setOfficialWebsite("");
    }

    function handleSubmit() {
        // Validation
        if (!scholarshipName || !scholarshipType || !fundingType || !deadlineDate ||
            !totalFundingAmount || !description || !officialWebsite) {
            toast.error("Please fill all required fields");
            return;
        }

        const payload = {
            scholarshipName,
            scholarshipType,
            fundingType,
            deadline: deadlineDate.toISOString(),
            totalFundingAmount: parseFloat(totalFundingAmount),
            description,
            officialWebsite,
            status: "active",
        };

        addScholarship(payload);
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent hideClose={true} side="right" className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[700px] gap-0">
                <SheetHeader className="p-5">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex flex-col gap-1">
                            <SheetTitle className="text-xl font-semibold text-gray-800">Add New Scholarship</SheetTitle>
                            <p className="text-sm text-gray-500 font-medium">Create and manage verified scholarship opportunities for students</p>
                        </div>
                        <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </SheetClose>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
                    {/* Scholarship Name */}
                    <FormField label="Scholarship Name" name="scholarshipName">
                        <Input
                            placeholder="e.g., National Merit Scholarship Scheme"
                            value={scholarshipName}
                            onChange={(e) => setScholarshipName(e.target.value)}
                        />
                    </FormField>

                    {/* Scholarship Type & Funding Type */}
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <FormField label="Scholarship Type" name="scholarshipType">
                                <Select
                                    value={scholarshipType}
                                    onValueChange={setScholarshipType}
                                    placeholder="Select Type"
                                    options={scholarshipTypeOptions}
                                />
                            </FormField>
                        </div>
                        <div className="w-1/2">
                            <FormField label="Funding Type" name="fundingType">
                                <Select
                                    value={fundingType}
                                    onValueChange={setFundingType}
                                    placeholder="Select Type"
                                    options={fundingTypeOptions}
                                />
                            </FormField>
                        </div>
                    </div>

                    {/* Deadline & Total Funding Amount */}
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <FormField label="Deadline" name="deadline">
                                <DatePickerCalendar
                                    value={deadlineDate || undefined}
                                    onChange={(newDate) => setDeadlineDate(newDate)}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            "w-full h-10 px-3 flex items-center justify-between rounded-lg border border-black/10 bg-white/70 hover:bg-white/80 transition-colors text-left font-normal cursor-pointer",
                                            !deadlineDate && "text-gray-400"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                                            <span className="truncate text-sm">
                                                {deadlineDate ? format(deadlineDate, "MM/dd/yyyy") : "(MM/DD/YYYY)"}
                                            </span>
                                        </div>
                                    </button>
                                </DatePickerCalendar>
                            </FormField>
                        </div>
                        <div className="w-1/2">
                            <FormField label="Total Funding Amount" name="amount">
                                <Input
                                    type="number"
                                    placeholder="e.g., 50000"
                                    value={totalFundingAmount}
                                    onChange={(e) => setTotalFundingAmount(e.target.value)}
                                />
                            </FormField>
                        </div>
                    </div>

                    {/* Description */}
                    <FormField label="Description" name="description">
                        <Textarea
                            placeholder="e.g., For UG students with 80%+ marks in 12th standard"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormField>

                    {/* Official Website */}
                    <FormField label="Official Website" name="website">
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="https://example.com"
                                className="pl-9"
                                value={officialWebsite}
                                onChange={(e) => setOfficialWebsite(e.target.value)}
                            />
                        </div>
                    </FormField>

                </div>

                {/* Footer Actions */}
                <div className="p-3 border-t border-gray-50 flex items-center justify-end bg-white mt-auto">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 gap-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="bg-[#10B981] hover:bg-[#059669] text-white gap-2 px-6 disabled:opacity-50"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
