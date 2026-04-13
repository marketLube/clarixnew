"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

export interface FilterOption {
    label: string;
    value: string;
}

interface FilterProps {
    options: FilterOption[];
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}

export function Filter({
    options,
    defaultValue = "All Status",
    onValueChange,
    className,
}: FilterProps) {
    const [selectedLabel, setSelectedLabel] = useState(defaultValue);
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-2 bg-[#1A1A1A] text-white px-5 h-11 rounded-xl text-sm font-medium hover:bg-[#2A2A2A] transition-colors cursor-pointer shadow-sm min-w-[120px] justify-between",
                        className
                    )}
                >
                    <span className="truncate">{selectedLabel}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-48 p-1 rounded-xl border-gray-100 bg-white"
                align="end"
            >
                <div>
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                setSelectedLabel(opt.label);
                                onValueChange?.(opt.value);
                                setOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors rounded-lg group"
                        >
                            <span className="text-gray-700 font-medium group-hover:text-gray-900">
                                {opt.label}
                            </span>
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
