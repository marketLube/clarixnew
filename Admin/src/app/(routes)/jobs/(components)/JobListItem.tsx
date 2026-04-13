import { MapPin, MoreVertical, Building2, IndianRupee, Pencil, Trash2, Briefcase, Eye } from "lucide-react";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { ActionMenu } from "@/src/components/common/ActionMenu";
import { Job } from "@/src/servicesHooks/jobHooks/types/jobHooksType";
import { format } from "date-fns";
import { useDeleteJob } from "@/src/servicesHooks/jobHooks/useDeleteJob";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JobListItemProps {
    selectedJobs: boolean;
    setSelectedJobs: () => void;
    data: Job;
    showDivider: boolean;
}

export default function JobListItem({ selectedJobs, setSelectedJobs, data, showDivider }: JobListItemProps) {
    const { deleteJob } = useDeleteJob();
    const router = useRouter();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            deleteJob(data._id);
        }
    };

    const handleEdit = () => {
        router.push(`/jobs/add?id=${data._id}`);
    };

    const handleView = () => {
        router.push(`/jobs/add?id=${data._id}&mode=view`);
    };

    const status = data.isActive ? "Active" : "Closed";
    const salaryRange = `${data.salary.min}-${data.salary.max} ${data.salary.unit}`;
    const postedDate = format(new Date(data.createdAt), "dd MMM");

    return (
        <>
            <div className="flex items-start justify-between w-full py-2">
                <div className="flex gap-3 items-center flex-1">
                    <input
                        type="checkbox"
                        checked={selectedJobs}
                        onChange={setSelectedJobs}
                        className="w-3.5 h-3.5 border-[0.5px] border-[#a6c3b9] border-solid rounded-[3px] cursor-pointer"
                    />
                    <div className="flex gap-3 items-center">
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <div className="flex gap-2 items-center">
                                <h3 className="font-medium text-base leading-5 text-[#364440] whitespace-nowrap">
                                    {data.jobTitle}
                                </h3>
                                <StatusBadge status={status} className="min-w-0" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-0.5 items-center h-4">
                                    <Building2 className="w-4 h-4 text-[rgba(54,68,62,0.6)]" />
                                    <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap">
                                        {data.companyName}
                                    </span>
                                </div>
                                <div className="flex gap-0.5 items-center h-4">
                                    <MapPin className="w-4 h-4 text-[rgba(54,68,62,0.6)]" />
                                    <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap">
                                        {data.location}
                                    </span>
                                </div>
                                <div className="flex gap-0.5 items-center h-4">
                                    <IndianRupee className="w-4 h-4 text-[rgba(54,68,62,0.6)]" />
                                    <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap">
                                        {salaryRange}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Stats and Options */}
                <div className="flex gap-6 items-start px-0">
                    <div className="flex gap-5 items-start">
                        {/* Type */}
                        <div className="flex flex-col gap-1.5 items-center whitespace-nowrap">
                            <p className="font-semibold text-sm leading-5 text-[#364440] text-center tracking-[-0.32px]">
                                {data.jobType}
                            </p>
                            <p className="font-normal text-xs leading-4 text-[#868f8b] tracking-[-0.28px]">
                                Job Type
                            </p>
                        </div>

                        {/* Industry */}
                        {data.industry && (
                            <div className="flex flex-col gap-1.5 items-center whitespace-nowrap">
                                <p className="font-semibold text-sm leading-5 text-[#364440] text-center tracking-[-0.32px]">
                                    {data.industry}
                                </p>
                                <p className="font-normal text-xs leading-4 text-[#868f8b] tracking-[-0.28px]">
                                    Industry
                                </p>
                            </div>
                        )}

                        {/* Posted Date */}
                        <div className="flex flex-col gap-1.5 items-center whitespace-nowrap">
                            <p className="font-semibold text-sm leading-5 text-[#364440] text-center tracking-[-0.32px]">
                                {postedDate}
                            </p>
                            <p className="font-normal text-xs leading-4 text-[#868f8b] tracking-[-0.28px]">
                                Posted
                            </p>
                        </div>
                    </div>

                    {/* Options Menu */}
                    <ActionMenu
                        trigger={
                            <button className="w-5 h-5 flex items-center justify-center cursor-pointer rounded">
                                <MoreVertical className="w-5 h-5 text-[#364440]" />
                            </button>
                        }
                        items={[
                            { label: "View", icon: Eye, onClick: handleView },
                            { label: "Edit", icon: Pencil, onClick: handleEdit },
                            { label: "Delete", icon: Trash2, danger: true, onClick: handleDelete },
                        ]}
                    />
                </div>
            </div>
            {showDivider && <div className="h-px bg-gray-100 w-full " />}
        </>
    );
}