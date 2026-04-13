import { Building2, MoreVertical, Eye, Pencil, Trash2, MapPin, Calendar } from "lucide-react";
import { ActionMenu } from "@/src/components/common/ActionMenu";
import { University } from "@/src/servicesHooks/universityHooks/types/universityHooksType";

interface UniversityListItemProps {
    university: University;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
    showDivider: boolean;
    onView?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function UniversityListItem({
    university,
    isSelected,
    onToggleSelection,
    showDivider,
    onView,
    onEdit,
    onDelete,
}: UniversityListItemProps) {
    const handleView = () => {
        onView?.(university._id);
    };

    const handleEdit = () => {
        onEdit?.(university._id);
    };

    const handleDelete = () => {
        onDelete?.(university._id);
    };

    return (
        <div>
            <div className="flex items-center justify-between w-full py-2">
                <div className="flex gap-3 items-center flex-1">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelection(university._id)}
                        className="w-3.5 h-3.5 border-[0.5px] border-[#a6c3b9] border-solid rounded-[3px] cursor-pointer"
                    />
                    <div className="flex gap-3 items-center">
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-blue-600" />
                        </div>

                        {/* University Info */}
                        <div className="flex flex-col gap-0.5">
                            <div className="flex gap-2 items-center">
                                <h3 className="font-medium text-base leading-5 text-[#364440] whitespace-nowrap">
                                    {university.name}
                                </h3>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-0.5 items-center h-4">
                                    <MapPin className="w-4 h-4 text-[rgba(54,68,62,0.6)]" />
                                    <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap">
                                        {university.city}, {university.state}
                                    </span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-[#868f8b]" />
                                <span className="text-xs font-normal leading-4 text-[#868f8b] whitespace-nowrap">
                                    {university.type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Stats and Options */}
                <div className="flex gap-6 items-center px-0">
                    {/* University Stats */}
                    <div className="flex gap-6 items-center">
                        {/* Established */}
                        <div className="flex flex-col gap-0.5 items-center min-w-[100px]">
                            <div className="flex gap-1 items-center">
                                <Calendar className="w-3.5 h-3.5 text-[#868f8b]" />
                                <span className="text-xs font-medium leading-4 text-[#868f8b]">
                                    Established
                                </span>
                            </div>
                            <span className="text-sm font-semibold leading-5 text-[#364440]">
                                {university.establishedYear}
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
