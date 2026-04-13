"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import { FormField } from "@/src/components/ui/FormField";
import { Switch } from "@/src/components/ui/switch";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

interface ContentSectionProps {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    isEnabled?: boolean;
    onToggle?: (enabled: boolean) => void;
    children: React.ReactNode;
    className?: string;
    showIcon?: boolean;
    readOnly?: boolean;
}

export function ContentSection({
    id,
    title,
    description,
    icon,
    isEnabled = true,
    onToggle,
    children,
    className,
    showIcon = true,
    readOnly = false,
}: ContentSectionProps) {
    return (
        <Accordion type="single" collapsible defaultValue={id} className={cn("w-full", className)}>
            <AccordionItem
                value={id}
                className="bg-white border border-[#DEE7E4] rounded-[16px] shadow-[1px_6px_30px_0px_rgba(0,0,0,0.03)] overflow-hidden border-none px-5 py-1"
            >
                <AccordionTrigger className="hover:no-underline py-4" showIcon={showIcon}>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg shrink-0">
                            {icon}
                        </div>
                        <div className="text-left">
                            <h2 className="text-[14px] font-semibold text-[#364440]">{title}</h2>
                            <p className="text-[12px] text-[#868F8B] font-normal mt-0.5">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mr-4 ml-auto" onClick={(e) => e.stopPropagation()}>
                        <Switch
                            checked={isEnabled}
                            onCheckedChange={(checked) => !readOnly && onToggle?.(checked)}
                            disabled={readOnly}
                        />
                        <span className="text-sm font-normal text-[#868F8B]">Enabled</span>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="pb-5">
                    <div className="space-y-6 pt-1">
                        {children}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

interface CounterFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    maxLength: number;
    placeholder?: string;
    isTextArea?: boolean;
    className?: string;
    disabled?: boolean;
}

export function CounterField({
    label,
    value,
    onChange,
    maxLength,
    placeholder,
    isTextArea = false,
    className,
    disabled = false,
}: CounterFieldProps) {
    const Component = isTextArea ? Textarea : Input;
    const safeValue = typeof value === "string" ? value : value ?? "";

    return (
        <div>
            <FormField label={label} name={label.toLowerCase().replace(/\s+/g, '-')} className="space-y-1">
                <Component
                    value={safeValue}
                    onChange={(e: any) => onChange(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    disabled={disabled}
                    className={cn(
                        "border-[#DEE7E4] focus-visible:ring-[#10B981]",
                        isTextArea ? "min-h-[100px] resize-none py-2.5" : "h-10",
                        className
                    )}
                />
            </FormField>
            <div className="flex justify-end mt-1">
                <span className="text-[11px] text-[#868F8B]">
                    {safeValue.length.toString().padStart(2, '0')}/{maxLength} characters
                </span>
            </div>
        </div>
    );
}
