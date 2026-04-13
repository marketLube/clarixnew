"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
  disabled?: boolean;
};

export const Select = React.forwardRef<
  HTMLButtonElement,
  SelectProps
>(({ value, onValueChange, placeholder, options, className, disabled = false }, ref) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      {/* Trigger (matches Input UI) */}
      <SelectPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-sm",
          "border border-black/10 bg-white/70",
          "focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-gray-400",
          value && "text-[#364440]",
          className
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder ?? "Select"} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 text-[#868F8B]" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      {/* Dropdown — same width as trigger */}
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn(
            "z-50 rounded-xl border border-gray-200 bg-white shadow-sm mt-1",
            "w-[var(--radix-select-trigger-width)]",
          )}
        >
          <SelectPrimitive.Viewport className="p-1 w-full">
            {options.map(opt => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-2 text-sm",
                  "text-gray-700 outline-none",
                  "hover:bg-emerald-50 hover:text-emerald-700",
                  "data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-700"
                )}
              >
                <SelectPrimitive.ItemText>
                  {opt.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

Select.displayName = "Select";
