import { Edit2, Trash2 } from "lucide-react";

type RecruiterRowProps = {
    company: string;
    roles: string;
    logo?: string;
};

export default function RecruiterRow({ company, roles, logo }: RecruiterRowProps) {
    return (
        <div className="group flex items-center justify-between p-3 rounded-xl border border-black/10 bg-white hover:border-emerald-500/30 transition-all">
            <div className="flex items-baseline gap-3">
                <span className="text-sm font-semibold text-gray-800">{company}</span>
                <span className="text-xs text-gray-400 font-medium">{roles}</span>
            </div>
            <div className="flex items-center gap-6">
                {logo && (
                    <div className="bg-gray-50/50 px-4 py-1.5 rounded-lg border border-black/5">
                        <span className="text-[10px] font-bold tracking-tighter text-gray-800 uppercase italic">
                            {logo}
                            <span className="text-emerald-500 ml-0.5">^</span>
                        </span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}