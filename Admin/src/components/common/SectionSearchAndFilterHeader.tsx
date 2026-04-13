import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";

interface SectionSearchAndFilterHeaderProps {
    children?: React.ReactNode;
    searchValue?: string;
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchPlaceholder?: string;
    isAllSelected?: boolean;
    onSelectAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showSelectAll?: boolean;
    className?: string;
    headerMiddleContent?: React.ReactNode;
}

export default function SectionSearchAndFilterHeader({
    children,
    searchValue,
    onSearchChange,
    searchPlaceholder = "search",
    isAllSelected,
    onSelectAll,
    showSelectAll = true,
    className,
    headerMiddleContent,
}: SectionSearchAndFilterHeaderProps) {
    return (
        <div className={cn("flex items-start justify-between gap-6 mb-6 flex-wrap", className)}>
            <div className="flex items-center gap-3 flex-1">
                {showSelectAll && (
                    <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={onSelectAll}
                        className="appearance-none w-[14px] h-[14px] border-[0.5px] border-[#a6c3b9] rounded-[3px] cursor-pointer checked:bg-[#2d9a75] checked:border-[#2d9a75] relative flex items-center justify-center shrink-0 mt-2"
                    />
                )}
                <div className="relative w-full max-w-[500px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder={searchPlaceholder}
                        className="pl-11 h-11 bg-[#F9FAFB] border-black/5 rounded-xl focus:bg-white transition-all shadow-none"
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                </div>
                {headerMiddleContent}
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-end">
                {children}
            </div>
        </div>
    );
}