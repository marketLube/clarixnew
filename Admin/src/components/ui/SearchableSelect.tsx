"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
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

export interface SearchableSelectProps {
    options: { label: string; value: string }[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
    disabled?: boolean;
}

export function SearchableSelect({
    options,
    value,
    onValueChange,
    placeholder = "Select option...",
    searchPlaceholder = "Search...",
    className,
    disabled = false,
}: SearchableSelectProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-normal",
                        "border border-black/10 bg-white/70",
                        "focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        !value && "text-gray-500",
                        value && "text-[#364440]",
                        "hover:bg-white/70 hover:text-[#364440]",
                        className
                    )}
                >
                    <span className="truncate">
                        {value
                            ? options.find((option) => option.value === value)?.label
                            : placeholder}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-[#868F8B]" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    "p-0",
                    "z-50 rounded-xl border border-gray-200 bg-white shadow-sm mt-1",
                )}
                style={{ width: 'var(--radix-popover-trigger-width)' }}
                align="start"
            >
                <Command defaultValue={value ? options.find((o) => o.value === value)?.label : undefined}>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        className="placeholder:text-gray-500"
                    />
                    <CommandList>
                        <CommandEmpty>No result found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={(currentValue) => {
                                        const selected = options.find(
                                            (o) => o.label.toLowerCase() === currentValue.toLowerCase()
                                        );
                                        if (selected) {
                                            onValueChange(selected.value === value ? "" : selected.value);
                                        }
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "cursor-pointer rounded-md px-3 py-2 text-sm",
                                        "text-gray-900",
                                        "data-[selected=true]:bg-gray-50 data-[selected=true]:text-black data-[selected=true]:font-medium",
                                        "hover:bg-gray-50 hover:text-black hover:font-medium"
                                    )}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4 text-black",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
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
