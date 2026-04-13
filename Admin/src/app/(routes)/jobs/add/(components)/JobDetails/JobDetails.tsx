import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Select } from "@/src/components/ui/Selector";
import { Textarea } from "@/src/components/ui/textarea";
import { Globe } from "lucide-react";

interface JobDetailsProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}

export default function JobDetails({ formData, onUpdate, readOnly }: JobDetailsProps) {
    return (
        <div className="space-y-6">
            {/* Job Title and Company */}
            <div className="flex w-full gap-4">
                <div className="w-1/2">
                    <FormField label="Job Title" name="jobTitle">
                        <Input
                            placeholder="e.g. Software Developer Intern"
                            value={formData.jobTitle}
                            onChange={(e) => onUpdate("jobTitle", e.target.value)}
                            disabled={readOnly}
                        />
                    </FormField>
                </div>
                <div className="w-1/2">
                    <FormField label="Company / Recruiter Name" name="company">
                        <Input
                            placeholder="e.g. Google Inc."
                            value={formData.companyName}
                            onChange={(e) => onUpdate("companyName", e.target.value)}
                            disabled={readOnly}
                        />
                    </FormField>
                </div>
            </div>

            {/* Job Type and Location */}
            <div className="flex w-full gap-4">
                <div className="w-1/2">
                    <FormField label="Job Type" name="jobType">
                        <Select
                            value={formData.jobType}
                            onValueChange={(value) => onUpdate("jobType", value)}
                            placeholder="Select Type"
                            options={[
                                { label: "Full Time", value: "Full Time" },
                                { label: "Part Time", value: "Part Time" },
                                { label: "Internship", value: "Internship" },
                                { label: "Contract", value: "Contract" },
                                { label: "Freelance", value: "Freelance" },
                            ]}
                            disabled={readOnly}
                        />
                    </FormField>
                </div>
                <div className="w-1/2">
                    <FormField label="Location" name="location">
                        <Input
                            placeholder="City / Remote / Hybrid"
                            value={formData.location}
                            onChange={(e) => onUpdate("location", e.target.value)}
                            disabled={readOnly}
                        />
                    </FormField>
                </div>
            </div>

            {/* Salary Range */}
            <FormField label="Salary Range" name="salary">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Input
                            placeholder="Minimum"
                            type="number"
                            value={formData.salaryMin}
                            onChange={(e) => onUpdate("salaryMin", e.target.value)}
                            disabled={readOnly}
                        />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">to</span>
                    <div className="flex-1">
                        <Input
                            placeholder="Maximum"
                            type="number"
                            value={formData.salaryMax}
                            onChange={(e) => onUpdate("salaryMax", e.target.value)}
                            disabled={readOnly}
                        />
                    </div>
                    <div className="w-32">
                        <Select
                            value={formData.salaryUnit}
                            onValueChange={(value) => onUpdate("salaryUnit", value)}
                            placeholder="₹ LPA"
                            options={[
                                { label: "₹ LPA", value: "LPA" },
                                { label: "Monthly", value: "Monthly" },
                                { label: "Hourly", value: "Hourly" },
                            ]}
                            disabled={readOnly}
                        />
                    </div>
                </div>
            </FormField>

            {/* Company Website */}
            <FormField label="Company Website" name="website">
                <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="https://clarixedu.com"
                        className="pl-9"
                        value={formData.companyWebsite}
                        onChange={(e) => onUpdate("companyWebsite", e.target.value)}
                        disabled={readOnly}
                    />
                </div>
            </FormField>

            {/* Employee Size and Industry */}
            <div className="flex w-full gap-4">
                <div className="w-1/2">
                    <FormField label="Employee Size" name="employeeSize">
                        <Input
                            placeholder="e.g. 10-50, 50-200"
                            value={formData.employeeSize}
                            onChange={(e) => onUpdate("employeeSize", e.target.value)}
                            disabled={readOnly}
                        />
                    </FormField>
                </div>
                <div className="w-1/2">
                    <FormField label="Industry" name="industry">
                        <Input
                            placeholder="e.g. Analytics, Big Data"
                            value={formData.industry}
                            onChange={(e) => onUpdate("industry", e.target.value)}
                            disabled={readOnly}
                        />
                    </FormField>
                </div>
            </div>

            {/* Short About Job */}
            <FormField label="Short About Job" name="shortDescription">
                <Textarea
                    placeholder="Write a short Description"
                    rows={4}
                    value={formData.shortDescription}
                    onChange={(e) => onUpdate("shortDescription", e.target.value)}
                    readOnly={readOnly}
                    disabled={readOnly}
                />
            </FormField>
        </div>
    );
}