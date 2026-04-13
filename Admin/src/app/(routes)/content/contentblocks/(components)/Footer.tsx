"use client";

import { Type } from "lucide-react";
import { ContentSection, CounterField } from "@/src/components/ui/ContentSection";
import { Input } from "@/src/components/ui/input";
import { FooterSection } from "../types";

interface FooterProps {
    data: FooterSection & { enabled: boolean };
    onChange: (updates: Partial<FooterSection & { enabled: boolean }>) => void;
}

export default function Footer({ data, onChange }: FooterProps) {

    return (
        <ContentSection
            id="footer-content"
            title="Footer"
            description="Manage footer content: Update legal text, social links, and branding. Changes preview live for seamless updates."
            icon={<Type className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => onChange({ enabled })}
        >
            <div className="space-y-6">
                <CounterField
                    label="Primary Headline"
                    value={data.primaryHeadline || ""}
                    onChange={(value) => onChange({ primaryHeadline: value })}
                    maxLength={100}
                    placeholder="Enter the headline"
                />

                <CounterField
                    label="Sub headline"
                    value={data.subHeadline || ""}
                    onChange={(value) => onChange({ subHeadline: value })}
                    maxLength={350}
                    placeholder="Enter rich text content..."
                    isTextArea
                    className="min-h-[120px]"
                />

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[#364440]">Location</label>
                        <Input
                            placeholder="Location link"
                            value={data.locationLink || ""}
                            onChange={(e) => onChange({ locationLink: e.target.value })}
                            className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[#364440]">Contact Number</label>
                        <Input
                            placeholder="Write Clarix Contact number"
                            value={data.contactNumber || ""}
                            onChange={(e) => onChange({ contactNumber: e.target.value })}
                            className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                        />
                    </div>
                </div>

                <div className="w-1/2 pr-4">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[#364440]">Email</label>
                        <Input
                            type="email"
                            placeholder="clarix@gmail.com"
                            value={data.email || ""}
                            onChange={(e) => onChange({ email: e.target.value.trim() })}
                            onBlur={(e) => onChange({ email: e.target.value.trim() })}
                            className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                        />
                    </div>
                </div>
            </div>
        </ContentSection>
    );
}
