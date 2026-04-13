import { Briefcase, MoreVertical, Eye, Pencil, Ban, FileText, Share2, Trash2, Clock, Users, TrendingUp } from "lucide-react";
import { ActionMenu } from "@/src/components/common/ActionMenu";

interface RecruiterListItemProps {
    recruiter: any;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
    showDivider: boolean;
    onView?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function RecruiterListItem({
    recruiter,
    isSelected,
    onToggleSelection,
    showDivider,
    onView,
    onEdit,
    onDelete,
}: RecruiterListItemProps) {
    const handleView = () => {
        onView?.(recruiter._id);
    };

    const handleEdit = () => {
        onEdit?.(recruiter._id);
    };

    const handleDelete = () => {
        onDelete?.(recruiter._id);
    };

    return (
        <div>
            <div className="flex items-center justify-between w-full py-2">
                <div className="flex gap-3 items-center flex-1">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelection(recruiter._id)}
                        className="w-3.5 h-3.5 border-[0.5px] border-[#a6c3b9] border-solid rounded-[3px] cursor-pointer"
                    />
                    <div className="flex gap-3 items-center">
                        {/* Company Logo */}
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center p-2">
                            <img
                                src={recruiter.logo}
                                alt={recruiter.companyName}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Recruiter Info */}
                        <div className="flex flex-col gap-0.5">
                            <div className="flex gap-2 items-center">
                                <h3 className="font-medium text-base leading-5 text-[#364440] whitespace-nowrap">
                                    {recruiter.companyName}
                                </h3>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap">
                                    {recruiter.jobTitle}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-[#868f8b]" />
                                <span className="text-xs font-normal leading-4 text-[#868f8b] whitespace-nowrap">
                                    {recruiter.industry}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Stats and Options */}
                <div className="flex gap-6 items-center px-0">
                    {/* Recruiter Stats */}
                    <div className="flex gap-6 items-center">
                        {/* Hiring Duration */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[80px]">
                            <div className="flex gap-1 items-center">
                                <Clock className="w-3.5 h-3.5 text-[#868f8b]" />
                                <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                    Duration
                                </span>
                            </div>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                {recruiter.hiringDuration}
                            </span>
                        </div>

                        {/* Active Jobs */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[80px]">
                            <div className="flex gap-1 items-center">
                                <Briefcase className="w-3.5 h-3.5 text-[#868f8b]" />
                                <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                    Jobs
                                </span>
                            </div>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                {recruiter.activeJobs}
                            </span>
                        </div>

                        {/* Placed Students */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[80px]">
                            <div className="flex gap-1 items-center">
                                <Users className="w-3.5 h-3.5 text-[#868f8b]" />
                                <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                    Placed
                                </span>
                            </div>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                {recruiter.placedStudents}
                            </span>
                        </div>

                        {/* Avg Package */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[90px]">
                            <div className="flex gap-1 items-center">
                                <TrendingUp className="w-3.5 h-3.5 text-[#868f8b]" />
                                <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                    Avg. Package
                                </span>
                            </div>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                {recruiter.avgPackage}
                            </span>
                        </div>
                    </div>

                    <ActionMenu
                        trigger={
                            <button className="w-5 h-5 flex items-center justify-center cursor-pointer rounded">
                                <MoreVertical className="w-5 h-5 text-[#364440]" />
                            </button>
                        }
                        items={[
                            { label: "View", icon: Eye, onClick: handleView },
                            { label: "Edit", icon: Pencil, onClick: handleEdit },
                            { label: "Suspend", icon: Ban, onClick: () => { } },
                            { label: "Delete", icon: Trash2, danger: true, onClick: handleDelete },
                        ]}
                    />
                </div>
            </div>

            {/* Divider */}
            {showDivider && <div className="h-px bg-[#aac4bc] w-full mt-2" />}
        </div>
    );
}
