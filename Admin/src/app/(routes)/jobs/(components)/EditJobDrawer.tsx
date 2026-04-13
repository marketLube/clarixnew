"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/src/components/ui/sheet";
import { X, Loader2, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useJobById } from "@/src/servicesHooks/jobHooks/useJobById";
import { useUpdateJob } from "@/src/servicesHooks/jobHooks/useUpdateJob";
import { Job, FAQItem } from "@/src/servicesHooks/jobHooks/types/jobHooksType";
import Loader from "@/src/components/common/Loader";
import ErrorPage from "@/src/components/common/ErrorPage";
import { toast } from "sonner";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Select } from "@/src/components/ui/Selector";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";

interface EditJobDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string | null;
}

interface JobFormData {
  jobTitle: string;
  companyName: string;
  jobType: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  salaryUnit: string;
  companyWebsite: string;
  employeeSize: string;
  industry: string;
  shortDescription: string;
  aboutJob: string;
  aboutYou: string;
  aboutRole: string;
  faqs: FAQItem[];
}

const emptyForm: JobFormData = {
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
};

export default function EditJobDrawer({
  open,
  onOpenChange,
  jobId,
}: EditJobDrawerProps) {
  const { data, isLoading, error, refetch } = useJobById(jobId || "");
  const { updateJob, isPending } = useUpdateJob();
  const job: Job | undefined = data?.data;

  const [formData, setFormData] = useState<JobFormData>(emptyForm);

  // hydrate form when job loads
  useEffect(() => {
    if (job) {
      setFormData({
        jobTitle: job.jobTitle || "",
        companyName: job.companyName || "",
        jobType: job.jobType || "",
        location: job.location || "",
        salaryMin:
          job.salary?.min !== undefined ? String(job.salary.min) : "",
        salaryMax:
          job.salary?.max !== undefined ? String(job.salary.max) : "",
        salaryUnit: job.salary?.unit || "LPA",
        companyWebsite: job.companyWebsite || "",
        employeeSize: job.employeeSize || "",
        industry: job.industry || "",
        shortDescription: job.shortDescription || "",
        aboutJob: job.aboutJob || "",
        aboutYou: (job.aboutYou || []).join("\n"),
        aboutRole: (job.aboutRole || []).join("\n"),
        faqs:
          job.faqs && job.faqs.length > 0
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
  }, [job]);

  // refetch on open
  useEffect(() => {
    if (open && jobId) {
      refetch();
    }
    if (!open) {
      setFormData(emptyForm);
    }
  }, [open, jobId, refetch]);

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      faqs: updatedFaqs,
    }));
  };

  const handleSubmit = () => {
    if (
      !jobId ||
      !formData.jobTitle ||
      !formData.companyName ||
      !formData.jobType ||
      !formData.location ||
      !formData.salaryMin ||
      !formData.salaryMax
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      jobType: formData.jobType as Job["jobType"],
      location: formData.location,
      salary: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
        unit: formData.salaryUnit as any,
      },
      companyWebsite: formData.companyWebsite,
      employeeSize: formData.employeeSize,
      industry: formData.industry,
      shortDescription: formData.shortDescription,
      aboutJob: formData.aboutJob,
      aboutYou: formData.aboutYou
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      aboutRole: formData.aboutRole
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      faqs: formData.faqs.filter((f) => f.question && f.answer),
    };

    updateJob(
      { id: jobId, payload },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideClose
        side="right"
        className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[900px] gap-0"
      >
        <SheetHeader className="p-5">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex flex-col gap-1">
              <SheetTitle className="text-xl font-semibold text-gray-800">
                Edit Job / Internship
              </SheetTitle>
              <p className="text-sm text-gray-500 font-medium">
                Update job details, description and FAQs
              </p>
            </div>
            <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
              <X className="w-5 h-5 text-gray-500" />
            </SheetClose>
          </div>
        </SheetHeader>

        {isLoading && <Loader size="md" className="flex-1 py-20" />}

        {error && (
          <div className="flex-1 flex items-center justify-center p-6">
            <ErrorPage
              message={
                (error as any).message ||
                "Failed to fetch job details. Please try again."
              }
              onRetry={() => refetch()}
              className="my-8"
            />
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
              {/* Job details (same structure as add page) */}
              <section className="space-y-6">
                <div className="flex w-full gap-4">
                  <div className="w-1/2">
                    <FormField label="Job Title" name="jobTitle">
                      <Input
                        placeholder="e.g. Software Developer Intern"
                        value={formData.jobTitle}
                        onChange={(e) =>
                          handleInputChange("jobTitle", e.target.value)
                        }
                      />
                    </FormField>
                  </div>
                  <div className="w-1/2">
                    <FormField
                      label="Company / Recruiter Name"
                      name="company"
                    >
                      <Input
                        placeholder="e.g. Google Inc."
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                      />
                    </FormField>
                  </div>
                </div>

                <div className="flex w-full gap-4">
                  <div className="w-1/2">
                    <FormField label="Job Type" name="jobType">
                      <Select
                        value={formData.jobType}
                        onValueChange={(value) =>
                          handleInputChange("jobType", value)
                        }
                        placeholder="Select Type"
                        options={[
                          { label: "Full Time", value: "Full Time" },
                          { label: "Part Time", value: "Part Time" },
                          { label: "Internship", value: "Internship" },
                          { label: "Contract", value: "Contract" },
                          { label: "Freelance", value: "Freelance" },
                        ]}
                      />
                    </FormField>
                  </div>
                  <div className="w-1/2">
                    <FormField label="Location" name="location">
                      <Input
                        placeholder="City / Remote / Hybrid"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                      />
                    </FormField>
                  </div>
                </div>

                <FormField label="Salary Range" name="salary">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Minimum"
                        type="number"
                        value={formData.salaryMin}
                        onChange={(e) =>
                          handleInputChange("salaryMin", e.target.value)
                        }
                      />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      to
                    </span>
                    <div className="flex-1">
                      <Input
                        placeholder="Maximum"
                        type="number"
                        value={formData.salaryMax}
                        onChange={(e) =>
                          handleInputChange("salaryMax", e.target.value)
                        }
                      />
                    </div>
                    <div className="w-32">
                      <Select
                        value={formData.salaryUnit}
                        onValueChange={(value) =>
                          handleInputChange("salaryUnit", value)
                        }
                        placeholder="₹ LPA"
                        options={[
                          { label: "₹ LPA", value: "LPA" },
                          { label: "Monthly", value: "Monthly" },
                          { label: "Hourly", value: "Hourly" },
                        ]}
                      />
                    </div>
                  </div>
                </FormField>

                {/* Company info */}
                <FormField label="Company Website" name="website">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="https://clarixedu.com"
                      className="pl-9"
                      value={formData.companyWebsite}
                      onChange={(e) =>
                        handleInputChange("companyWebsite", e.target.value)
                      }
                    />
                  </div>
                </FormField>

                <div className="flex w-full gap-4">
                  <div className="w-1/2">
                    <FormField label="Employee Size" name="employeeSize">
                      <Input
                        placeholder="e.g. 10-50, 50-200"
                        value={formData.employeeSize}
                        onChange={(e) =>
                          handleInputChange("employeeSize", e.target.value)
                        }
                      />
                    </FormField>
                  </div>
                  <div className="w-1/2">
                    <FormField label="Industry" name="industry">
                      <Input
                        placeholder="e.g. Analytics, Big Data"
                        value={formData.industry}
                        onChange={(e) =>
                          handleInputChange("industry", e.target.value)
                        }
                      />
                    </FormField>
                  </div>
                </div>

                <FormField label="Short About Job" name="shortDescription">
                  <Textarea
                    placeholder="Write a short Description"
                    rows={4}
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                  />
                </FormField>
              </section>

              {/* About & Q&A */}
              <section className="space-y-6">
                <FormField label="About Job" name="aboutJob">
                  <Textarea
                    placeholder="Write a short about"
                    rows={6}
                    value={formData.aboutJob}
                    onChange={(e) =>
                      handleInputChange("aboutJob", e.target.value)
                    }
                  />
                </FormField>

                <FormField label="About you" name="aboutYou">
                  <Textarea
                    placeholder="Enter a specification (press Enter for next point)"
                    rows={6}
                    value={formData.aboutYou}
                    onChange={(e) =>
                      handleInputChange("aboutYou", e.target.value)
                    }
                  />
                </FormField>

                <FormField label="About the role" name="aboutRole">
                  <Textarea
                    placeholder="Enter a specification (press Enter for next point)"
                    rows={6}
                    value={formData.aboutRole}
                    onChange={(e) =>
                      handleInputChange("aboutRole", e.target.value)
                    }
                  />
                </FormField>

                {/* FAQs */}
                <FormField
                  label="Questions & answers for this job"
                  name="faq1"
                >
                  <div className="space-y-4">
                    <Input
                      placeholder="Write FAQs"
                      value={formData.faqs[0]?.question || ""}
                      onChange={(e) =>
                        handleFaqChange(0, "question", e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Answer....."
                      rows={4}
                      value={formData.faqs[0]?.answer || ""}
                      onChange={(e) =>
                        handleFaqChange(0, "answer", e.target.value)
                      }
                    />
                  </div>
                </FormField>

                <FormField
                  label="Questions & answers for this job"
                  name="faq2"
                >
                  <div className="space-y-4">
                    <Input
                      placeholder="Write FAQs"
                      value={formData.faqs[1]?.question || ""}
                      onChange={(e) =>
                        handleFaqChange(1, "question", e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Answer....."
                      rows={4}
                      value={formData.faqs[1]?.answer || ""}
                      onChange={(e) =>
                        handleFaqChange(1, "answer", e.target.value)
                      }
                    />
                  </div>
                </FormField>

                <FormField
                  label="Questions & answers for this job"
                  name="faq3"
                >
                  <div className="space-y-4">
                    <Input
                      placeholder="Write FAQs"
                      value={formData.faqs[2]?.question || ""}
                      onChange={(e) =>
                        handleFaqChange(2, "question", e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Answer....."
                      rows={4}
                      value={formData.faqs[2]?.answer || ""}
                      onChange={(e) =>
                        handleFaqChange(2, "answer", e.target.value)
                      }
                    />
                  </div>
                </FormField>
              </section>
            </div>

            {/* Footer */}
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
                  className="bg-[#10B981] hover:bg-[#059669] text-white gap-2 px-6 disabled:opacity-50 flex items-center"
                >
                  {isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  <span>{isPending ? "Saving..." : "Save Changes"}</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}


