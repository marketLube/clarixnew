import { GraduationCap, MoreVertical, Eye, Pencil, Ban, FileText, Share2, Trash2, Clock, Users } from "lucide-react";
import { ActionMenu } from "@/src/components/common/ActionMenu";

interface CourseListItemProps {
    course: any;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
    showDivider: boolean;
    onView?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function CourseListItem({
    course,
    isSelected,
    onToggleSelection,
    showDivider,
    onView,
    onEdit,
    onDelete,
}: CourseListItemProps) {
    const handleView = () => {
        onView?.(course._id);
    };

    const handleEdit = () => {
        onEdit?.(course._id);
    };

    const handleDelete = () => {
        onDelete?.(course._id);
    };

    return (
        <div>
            <div className="flex items-center justify-between w-full py-2">
                <div className="flex gap-3 items-center flex-1">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelection(course._id)}
                        className="w-3.5 h-3.5 border-[0.5px] border-[#a6c3b9] border-solid rounded-[3px] cursor-pointer"
                    />
                    <div className="flex gap-3 items-center">
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-emerald-50 flex-shrink-0 flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-emerald-600" />
                        </div>

                        {/* Course Info */}
                        <div className="flex flex-col gap-0.5">
                            <div className="flex gap-2 items-center">
                                <h3 className="font-medium text-base leading-5 text-[#364440] whitespace-nowrap">
                                    {course.name}
                                </h3>
                            </div>
                            <div className="flex gap-2 items-center">
                                {course.stream && (
                                    <>
                                        <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap">
                                            {typeof course.stream === 'string' ? course.stream : (course.stream.name || course.stream.title)}
                                        </span>
                                        <div className="w-1 h-1 rounded-full bg-[#868f8b]" />
                                    </>
                                )}
                                <span className="text-xs font-normal leading-4 text-[#868f8b] whitespace-nowrap">
                                    {course.type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Stats and Options */}
                <div className="flex gap-6 items-center px-0">
                    {/* Course Stats */}
                    <div className="flex gap-6 items-center">
                        {/* Duration */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[80px]">
                            <div className="flex gap-1 items-center">
                                <Clock className="w-3.5 h-3.5 text-[#868f8b]" />
                                <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                    Duration
                                </span>
                            </div>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                {course.duration}
                            </span>
                        </div>

                        {/* Intake Capacity */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[80px]">
                            <div className="flex gap-1 items-center">
                                <Users className="w-3.5 h-3.5 text-[#868f8b]" />
                                <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                    Capacity
                                </span>
                            </div>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                {course.intakeCapacity || "N/A"}
                            </span>
                        </div>

                        {/* Fees */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[100px]">
                            <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                Fees
                            </span>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                ₹{course.fees ? Number(course.fees).toLocaleString('en-IN') : "N/A"}
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
