import { Switch } from "@/src/components/ui/switch";
import { CheckCircle2, Edit2, Plus, Trash2 } from "lucide-react";
import CampusLifeItemType from "../types/type";

interface CampusLifeItemProps {
    item: CampusLifeItemType;
    index: number;
    handleToggleActive: (index: number) => void;
    handleEditItem: (index: number) => void;
    handleDeleteItem: (index: number) => void;
    readOnly?: boolean;
}

export default function CampusLifeItem({
    item,
    index,
    handleToggleActive,
    handleEditItem,
    handleDeleteItem,
    readOnly
}: CampusLifeItemProps) {
    return (
        <div
            className="bg-white border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl p-4 flex gap-5 items-start transition-all hover:shadow-md group relative"
        >

            <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100 bg-gray-50">
                {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Plus className="w-6 h-6 text-gray-300" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-gray-900 truncate">
                        {item.title}
                    </h4>
                    {item.verified && (
                        <div className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100 uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                        </div>
                    )}
                </div>

                <p className="text-sm text-gray-500 leading-snug line-clamp-2 max-w-2xl">
                    {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag, i) => (
                        <span key={i} className="bg-gray-50 text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-gray-100">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-[10px] text-gray-400 font-medium">
                    Source: <span className="text-gray-500">{item.source || "College Provided"}</span>
                </p>
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-gray-50">
                <div className="flex items-center gap-3 mr-2">
                    <span className="text-[12px] font-semibold text-gray-600">Active</span>
                    <Switch
                        checked={item.isActive}
                        onCheckedChange={() => handleToggleActive(index)}
                        disabled={readOnly}
                    />
                </div>
                {!readOnly && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleEditItem(index)}
                            className="p-2.5 bg-gray-50 hover:bg-emerald-50 text-gray-400 hover:text-emerald-500 rounded-xl transition-all border border-gray-100"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDeleteItem(index)}
                            className="p-2.5 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-gray-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}