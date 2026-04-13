"use client";

import React from "react";
import { Link2 } from "lucide-react";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { ContentSection } from "@/src/components/ui/ContentSection";

interface CallActionButtonProps {
    data: {
        isEnabled: boolean;
        primaryText: string;
        primaryLink: string;
    };
    updateData: (updates: Partial<CallActionButtonProps['data']>) => void;
}

export default function CallActionButton({ data, updateData }: CallActionButtonProps) {
    return (
        <ContentSection
            id="cta"
            title="Call-to-Action Button"
            description="Configure the primary button that drives user action"
            icon={<Link2 className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.isEnabled}
            onToggle={(enabled) => updateData({ isEnabled: enabled })}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <FormField label="Button Text" name="primaryText" className="space-y-1">
                    <Input
                        id="primaryText"
                        value={data.primaryText}
                        onChange={(e) => updateData({ primaryText: e.target.value })}
                        placeholder="Start Exploring"
                        className="h-10 border-[#DEE7E4] focus-visible:ring-[#10B981]"
                    />
                </FormField>

                <FormField label="Button Link" name="primaryLink" className="space-y-1">
                    <Input
                        id="primaryLink"
                        value={data.primaryLink}
                        onChange={(e) => updateData({ primaryLink: e.target.value })}
                        placeholder="/colleges"
                        className="h-10 border-[#DEE7E4] focus-visible:ring-[#10B981]"
                    />
                </FormField>
            </div>
        </ContentSection>
    );
}