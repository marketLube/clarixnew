"use client"

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X, Calendar as CalendarIcon } from "lucide-react";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Select } from "@/src/components/ui/Selector";
import { useRef } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DatePickerCalendar from "../../colleges/add/(components)/Admission/(components)/DatePickerCalendar";
import { useExamById } from "@/src/servicesHooks/examHooks/useExamById";
import { useUpdateExam } from "@/src/servicesHooks/examHooks/useUpdateExam";
import { useStreams } from "@/src/servicesHooks/streamHooks/useStream";
import { Exam } from "@/src/servicesHooks/examHooks/types/examHooksType";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import ErrorPage from "@/src/components/common/ErrorPage";
import Loader from "@/src/components/common/Loader";

interface EditExamDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: string | null;
}

export function EditExamDrawer({ open, onOpenChange, examId }: EditExamDrawerProps) {
  const { data, isLoading, error, refetch } = useExamById(examId || "");
  const { updateExam, isPending } = useUpdateExam();
  const exam: Exam | undefined = data?.data;

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
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const { data: streamsData } = useStreams();
  const streamOptions = streamsData?.data?.streams?.map((s) => ({
    label: s.name,
    value: s._id,
  })) || [];

  // Hydrate form when exam data changes
  useEffect(() => {
    if (exam) {
      setShortName(exam.shortName || "");
      setFullName(exam.fullName || "");
      setRegistrationDate(exam.registrationDate ? new Date(exam.registrationDate) : null);
      setExamDate(exam.examDate ? new Date(exam.examDate) : null);
      setResultPublishDate(exam.resultPublishDate ? new Date(exam.resultPublishDate) : null);
      setQualificationRequired(exam.qualificationRequired?.join(", ") || "");
      setCollegesAccepting(String(exam.collegesAccepting ?? ""));
      setOfficialWebsite(exam.officialWebsite || "");
      setDescription(exam.description || "");
      setStream(
        typeof (exam as any).stream === 'object' && (exam as any).stream !== null
          ? ((exam as any).stream._id || "")
          : ((exam as any).stream || "")
      );
      setLogoUrl(exam.logo || null);
      setLogoFile(null);
    }
  }, [exam]);

  // When opening, refetch to ensure freshest data. When closing, reset.
  useEffect(() => {
    if (open && examId) {
      refetch();
    }
    if (!open) {
      setLogoFile(null);
    }
  }, [open, examId, refetch]);

  function handleLogoClick() {
    logoInputRef.current?.click();
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoUrl(URL.createObjectURL(file));
  }

  function handleRemoveLogo() {
    setLogoFile(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
    // keep existing logo URL on backend unless a new file is uploaded
  }

  async function handleSubmit() {
    if (!examId || !exam) return;

    if (!shortName || !fullName || !registrationDate || !examDate || !resultPublishDate ||
      !qualificationRequired || !collegesAccepting || !officialWebsite || !description || !stream) {
      toast.error("Please fill all required fields");
      return;
    }

    const qualifications = qualificationRequired.split(",").map(q => q.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append("shortName", shortName);
    formData.append("fullName", fullName);
    formData.append("registrationDate", registrationDate.toISOString());
    formData.append("examDate", examDate.toISOString());
    formData.append("resultPublishDate", resultPublishDate.toISOString());
    formData.append("qualificationRequired", JSON.stringify(qualifications));
    formData.append("collegesAccepting", String(Number(collegesAccepting)));
    formData.append("officialWebsite", officialWebsite);
    formData.append("stream", stream);
    formData.append("description", description);

    // Only append logo if a new file was selected
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    updateExam(
      { id: examId, data: formData },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideClose side="right" className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[700px] gap-0">
        <SheetHeader className="p-5">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex flex-col gap-1">
              <SheetTitle className="text-xl font-semibold text-gray-800">
                Edit Exam
              </SheetTitle>
              <p className="text-sm text-gray-500 font-medium">
                Update exam details, dates, and information
              </p>
            </div>
            <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
              <X className="w-5 h-5 text-gray-500" />
            </SheetClose>
          </div>
        </SheetHeader>

        {isLoading && (
          <Loader size="md" className="flex-1 py-20" />
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center p-6">
            <ErrorPage
              message={
                (error as any).message ||
                "Failed to fetch exam details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && (
          <>
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
                <div className="w-1/3">
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
                            {registrationDate
                              ? format(registrationDate, "MM/dd/yyyy")
                              : "Select a date"}
                          </span>
                        </div>
                      </button>
                    </DatePickerCalendar>
                  </FormField>
                </div>
                <div className="w-1/3">
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
                            {examDate
                              ? format(examDate, "MM/dd/yyyy")
                              : "Select a date"}
                          </span>
                        </div>
                      </button>
                    </DatePickerCalendar>
                  </FormField>
                </div>
                <div className="w-1/3">
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
                            {resultPublishDate
                              ? format(resultPublishDate, "MM/dd/yyyy")
                              : "Select a date"}
                          </span>
                        </div>
                      </button>
                    </DatePickerCalendar>
                  </FormField>
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="w-1/2">
                  <FormField
                    label="Qualification Required"
                    name="qualificationRequired"
                  >
                    <Input
                      placeholder="e.g., 10+2, Graduate, Post-Graduate (comma-separated)"
                      value={qualificationRequired}
                      onChange={(e) => setQualificationRequired(e.target.value)}
                    />
                  </FormField>
                </div>
                <div className="w-1/2">
                  <FormField
                    label="Colleges accepting this exam"
                    name="countofcolleges"
                  >
                    <Input
                      type="number"
                      placeholder="eg: 199"
                      value={collegesAccepting}
                      onChange={(e) => setCollegesAccepting(e.target.value)}
                    />
                  </FormField>
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="w-1/2">
                  <FormField label="Official Website" name="website">
                    <Input
                      placeholder="e.g: https://example.com"
                      value={officialWebsite}
                      onChange={(e) => setOfficialWebsite(e.target.value)}
                    />
                  </FormField>
                </div>
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

              {/* Logo preview - clickable to change (matches view style but editable) */}
              <FormField label="Exam Logo" name="logo">
                <div
                  className="w-full h-32 border-2 border-dashed border-emerald-300/60 rounded-xl bg-emerald-50/30 flex flex-col items-center justify-center gap-2 group hover:border-emerald-500/60 hover:bg-emerald-50 cursor-pointer relative overflow-hidden"
                  onClick={handleLogoClick}
                >
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleLogoChange}
                  />
                  {logoUrl ? (
                    <>
                      <img
                        src={logoUrl}
                        alt={shortName || fullName}
                        className="w-full h-full object-contain absolute inset-0 p-4"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/35 text-[12px] text-white text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to change logo
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center px-4">
                        <p className="text-[14px] font-semibold text-gray-700">
                          Click or drop an image to upload exam logo
                        </p>
                        <p className="text-[12px] text-gray-400 mt-1">
                          JPG, PNG up to 5MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </FormField>
            </div>

            {/* Action Buttons */}
            <div className="p-3 border-t border-gray-50 flex items-center gap-3 bg-white mt-auto justify-end">
              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-11 disabled:opacity-50 flex items-center gap-2"
              >
                {isPending && <Loader size="sm" light />}
                <span>{isPending ? "Saving..." : "Save Changes"}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl h-11"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}


