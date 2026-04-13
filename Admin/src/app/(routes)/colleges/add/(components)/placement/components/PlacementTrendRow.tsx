import { Input } from "@/src/components/ui/input";
import { Minus } from "lucide-react";

type PlacementTrendRowProps = {
    year: string;
    percentage: number;
    package: string;
};

export default function PlacementTrendRow({ year, percentage, package: pkg }: PlacementTrendRowProps) {
    return (
        <div className="flex items-center gap-4 p-2 px-3 rounded-xl border border-black/10 bg-white">
            <div className="w-16">
                <Input
                    type="text"
                    defaultValue={year}
                    placeholder="YYYY"
                    className="h-8 border-none bg-transparent p-0 text-sm font-medium text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            <div className="flex-1 flex items-center gap-4">
                <div className="flex-1 h-2 bg-gray-50 rounded-full relative">
                    <div
                        className="h-full bg-emerald-500 rounded-full relative transition-all"
                        style={{ width: `${percentage}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm cursor-pointer" />
                    </div>
                </div>
                <div className="flex items-center gap-3 min-w-[120px] justify-end">
                    <span className="text-sm font-medium text-gray-600">{pkg}</span>
                    <span className="text-sm font-medium text-gray-400">{percentage}%</span>
                </div>
            </div>
            <button type="button" className="text-red-400 hover:text-red-500 transition-colors p-1">
                <Minus className="w-4 h-4" />
            </button>
        </div>
    );
}