"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/src/components/ui/sheet";
import { X, ImageIcon, UploadCloud, Calendar as CalendarIcon, FileText, Loader2 } from "lucide-react";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Select } from "@/src/components/ui/Selector";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DatePickerCalendar from "../../colleges/add/(components)/Admission/(components)/DatePickerCalendar";
import { useAddExam } from "@/src/servicesHooks/examHooks/useAddExam";
import { useStreams } from "@/src/servicesHooks/streamHooks/useStream";
import { toast } from "sonner";

interface AddExamDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddExamDrawer({ open, onOpenChange }: AddExamDrawerProps) {
    const [examDate, setExamDate] = useState<Date | null>(null);
    const [registrationDate, setRegistrationDate] = useState<Date | null>(null);
    const [resultPublishDate, setResultPublishDate] = useState<Date | null>(null);
    const [shortName, setShortName] = useState("");
    const [fullName, setFullName] = useState("");
    const [qualificationRequired, setQualificationRequired] = useState("");
    const [collegesAccepting, setCollegesAccepting] = useState("");
    const [officialWebsite, setOfficialWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [stream, setStream] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const logoInputRef = useRef<HTMLInputElement | null>(null);

    const { addExam, isPending, isSuccess } = useAddExam();
    const { data: streamsData } = useStreams();

    const streamOptions = streamsData?.data?.streams?.map((s) => ({
        label: s.name,
        value: s._id,
    })) || [];

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
        setShortName("");
        setFullName("");
        setRegistrationDate(null);
        setExamDate(null);
        setResultPublishDate(null);
        setQualificationRequired("");
        setCollegesAccepting("");
        setOfficialWebsite("");
        setDescription("");
        setStream("");
        setLogoFile(null);
    }

    function handleLogoClick() {
        logoInputRef.current?.click();
    }

    function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
    }

    function handleRemoveLogo() {
        setLogoFile(null);
        if (logoInputRef.current) {
            logoInputRef.current.value = "";
        }
    }

    async function handleSubmit() {
        // Validation
        if (!shortName || !fullName || !registrationDate || !examDate || !resultPublishDate ||
            !qualificationRequired || !collegesAccepting || !officialWebsite || !description || !logoFile || !stream) {
            toast.error("Please fill all required fields");
            return;
        }

        // Convert qualification to array
        const qualifications = qualificationRequired.split(',').map(q => q.trim()).filter(Boolean);
        if (qualifications.length === 0) {
            toast.error("Please provide at least one qualification");
            return;
        }

        // Upload logo first (we'll need to implement this with FormData)
        const formData = new FormData();
        formData.append('logo', logoFile);
        formData.append('shortName', shortName);
        formData.append('fullName', fullName);
        formData.append('registrationDate', registrationDate.toISOString());
        formData.append('examDate', examDate.toISOString());
        formData.append('resultPublishDate', resultPublishDate.toISOString());
        formData.append('qualificationRequired', JSON.stringify(qualifications));
        formData.append('collegesAccepting', collegesAccepting);
        formData.append('officialWebsite', officialWebsite);
        formData.append('stream', stream);
        formData.append('description', description);

        addExam(formData as any);
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent hideClose={true} side="right" className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[700px] gap-0">
                <SheetHeader className="p-5">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex flex-col gap-1">
                            <SheetTitle className="text-xl font-semibold text-gray-800">Add New Exam</SheetTitle>
                            <p className="text-sm text-gray-500 font-medium">Create and manage verified scholarship opportunities for students</p>
                        </div>
                        <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </SheetClose>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <FormField label="Exam Short Name" name="examShortName">
                                <Input
                                    placeholder="e.g., JEE Main, NEET, CAT"
                                    value={shortName}
                                    onChange={(e) => setShortName(e.target.value)}
                                />
                            </FormField>
                        </div>
                        <div className="w-1/2">
                            <FormField label="Exam Full Name" name="examFullName">
                                <Input
                                    placeholder="e.g., Joint Entrance Examination Main"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </FormField>
                        </div>
                    </div>


                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <FormField label="Registration" name="registration">
                                <DatePickerCalendar
                                    value={registrationDate || undefined}
                                    onChange={(newDate) => setRegistrationDate(newDate)}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            "w-full h-10 px-3 flex items-center justify-between rounded-lg border border-black/10 bg-white/70 hover:bg-white/80 transition-colors text-left font-normal cursor-pointer",
                                            !registrationDate && "text-gray-400"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                                            <span className="truncate text-sm">
                                                {registrationDate ? format(registrationDate, "MM/dd/yyyy") : "Select a date"}
                                            </span>
                                        </div>
                                    </button>
                                </DatePickerCalendar>
                            </FormField>
                        </div>
                        <div className="w-1/2">
                            <FormField label="Exam Date" name="examDate">
                                <DatePickerCalendar
                                    value={examDate || undefined}
                                    onChange={(newDate) => setExamDate(newDate)}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            "w-full h-10 px-3 flex items-center justify-between rounded-lg border border-black/10 bg-white/70 hover:bg-white/80 transition-colors text-left font-normal cursor-pointer",
                                            !examDate && "text-gray-400"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                                            <span className="truncate text-sm">
                                                {examDate ? format(examDate, "MM/dd/yyyy") : "Select a date"}
                                            </span>
                                        </div>
                                    </button>
                                </DatePickerCalendar>
                            </FormField>
                        </div>
                    </div>


                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <FormField label="Results Publish" name="resultPublish">
                                <DatePickerCalendar
                                    value={resultPublishDate || undefined}
                                    onChange={(newDate) => setResultPublishDate(newDate)}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            "w-full h-10 px-3 flex items-center justify-between rounded-lg border border-black/10 bg-white/70 hover:bg-white/80 transition-colors text-left font-normal cursor-pointer",
                                            !resultPublishDate && "text-gray-400"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                                            <span className="truncate text-sm">
                                                {resultPublishDate ? format(resultPublishDate, "MM/dd/yyyy") : "Select a date"}
                                            </span>
                                        </div>
                                    </button>
                                </DatePickerCalendar>
                            </FormField>
                        </div>
                        <div className="w-1/2">
                            <FormField label="Qualification Required" name="qualificationRequired">
                                <Input
                                    placeholder="e.g., 10+2, Graduate, Post-Graduate (comma-separated)"
                                    value={qualificationRequired}
                                    onChange={(e) => setQualificationRequired(e.target.value)}
                                />
                            </FormField>
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <FormField label="Colleges accepting this exam" name="countofcolleges">
                                <Input
                                    type="number"
                                    placeholder="eg: 199"
                                    value={collegesAccepting}
                                    onChange={(e) => setCollegesAccepting(e.target.value)}
                                />
                            </FormField>
                        </div>
                        <div className="w-1/2">
                            <FormField label="Official Website" name="website">
                                <Input
                                    placeholder="e.g: https://example.com"
                                    value={officialWebsite}
                                    onChange={(e) => setOfficialWebsite(e.target.value)}
                                />
                            </FormField>
                        </div>
                    </div>

                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <FormField label="Stream" name="stream">
                                <Select
                                    value={stream}
                                    onValueChange={(value) => setStream(value)}
                                    placeholder="Select Stream"
                                    options={streamOptions}
                                />
                            </FormField>
                        </div>
                    </div>


                    <FormField label="Description" name="description">
                        <Textarea
                            placeholder="Description"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormField>


                    {/* Upload Logo */}
                    <FormField label="Exam Logo" name="logo">
                        {logoFile ? (
                            <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-200 bg-emerald-50/50">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                        {logoFile.name} ({(logoFile.size / (1024 * 1024)).toFixed(2)} MB)
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveLogo}
                                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={handleLogoClick}
                                className="rounded-lg border border-dashed border-emerald-300/60 bg-emerald-50/30 py-6 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50"
                            >
                                <UploadCloud className="w-8 h-8 text-emerald-600 mb-2" />
                                <p className="text-sm text-gray-700 font-medium">
                                    Upload Exam logo
                                </p>
                                <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
                            </div>
                        )}
                        <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoChange}
                        />
                    </FormField>

                </div>

                {/* Action Buttons */}
                <div className="p-3 border-t border-gray-50 flex items-center gap-3 bg-white mt-auto justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-11 disabled:opacity-50"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl h-11"
                    >
                        Cancel
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
