import { Layers, MoreVertical, Eye, Pencil, Ban, Trash2 } from "lucide-react";
import { ActionMenu } from "@/src/components/common/ActionMenu";

interface StreamListItemProps {
    stream: any;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
    showDivider: boolean;
    onView?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function StreamListItem({
    stream,
    isSelected,
    onToggleSelection,
    showDivider,
    onView,
    onEdit,
    onDelete,
}: StreamListItemProps) {
    const handleView = () => {
        onView?.(stream._id);
    };

    const handleEdit = () => {
        onEdit?.(stream._id);
    };

    const handleDelete = () => {
        onDelete?.(stream._id);
    };

    return (
        <div>
            <div className="flex items-center justify-between w-full py-2">
                <div className="flex gap-3 items-center flex-1">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelection(stream._id)}
                        className="w-3.5 h-3.5 border-[0.5px] border-[#a6c3b9] border-solid rounded-[3px] cursor-pointer"
                    />
                    <div className="flex gap-3 items-center">
                        {/* Stream Image/Icon */}
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-purple-50 flex-shrink-0 flex items-center justify-center">
                            {stream.image ? (
                                <img src={stream.image} alt={stream.name} className="w-full h-full object-cover" />
                            ) : (
                                <Layers className="w-6 h-6 text-purple-600" />
                            )}
                        </div>

                        {/* Stream Info */}
                        <div className="flex flex-col gap-0.5">
                            <div className="flex gap-2 items-center">
                                <h3 className="font-medium text-base leading-5 text-[#364440] whitespace-nowrap">
                                    {stream.name}
                                </h3>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${stream.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {stream.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-normal leading-4 text-[rgba(54,68,62,0.6)] tracking-[-0.28px] whitespace-nowrap max-w-[300px] truncate">
                                    {stream.collegesCount} Colleges
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Colleges count and options */}
                <div className="flex gap-6 items-center px-0">
                    <div className="flex flex-col gap-0.5 items-end min-w-[80px]">
                        <span className="text-xs text-[#868f8b]">Colleges</span>
                        <span className="text-sm font-medium text-[#364440]">
                            {typeof stream.collegesCount === 'number'
                                ? stream.collegesCount.toLocaleString()
                                : stream.collegesCount}
                        </span>
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
