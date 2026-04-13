"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";

export type Option = {
    label: string;
    value: string;
};

type MultiSelectProps = {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

export function MultiSelector({
    options,
    value,
    onChange,
    placeholder = "Select items...",
    disabled = false,
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item: string) => {
        onChange(value.filter((i) => i !== item));
    };

    const selectedLabels = options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "flex w-full min-h-10 h-auto items-center justify-between rounded-lg px-3 py-2 text-sm",
                        "border border-black/10 bg-white/70 hover:bg-white/90",
                        "focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50 font-normal",
                        !value.length && "text-gray-400",
                        value.length > 0 && "text-[#364440]",
                        className
                    )}
                    disabled={disabled}
                >
                    <div className="flex flex-wrap gap-1">
                        {value.length === 0 && (
                            <span className="text-gray-400">{placeholder}</span>
                        )}
                        {selectedLabels.map((label, index) => (
                            <div
                                key={value[index]} // value corresponds to selectedLabels index
                                className="flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUnselect(value[index]);
                                }}
                            >
                                {label}
                                <div
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                                >
                                    <X className="h-3 w-3 text-emerald-600 hover:text-emerald-900" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    "p-0 w-[var(--radix-popover-trigger-width)]",
                    "z-50 rounded-xl border border-gray-200 bg-white shadow-sm mt-1"
                )}
                align="start"
            >
                <Command>
                    <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
                    <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {
                                        const isSelected = value.includes(option.value);
                                        if (isSelected) {
                                            onChange(value.filter((val) => val !== option.value));
                                        } else {
                                            onChange([...value, option.value]);
                                        }
                                        // Keep open for multiple selection
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            value.includes(option.value)
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <Check className={cn("h-4 w-4", value.includes(option.value) ? "opacity-100" : "opacity-0")} />
                                    </div>
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
