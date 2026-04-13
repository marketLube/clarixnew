"use client";

import React from "react";
import { Building2, Image as ImageIcon } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { UploadZone } from "@/src/components/ui/FileUpload";
import { HomePageState } from "../../../types";

interface CompanylogoProps {
    data: HomePageState['careerHub'];
    updateData: (updates: Partial<HomePageState['careerHub']>) => void;
}

export default function Companylogo({ data, updateData }: CompanylogoProps) {

    return (
        <ContentSection
            id="company-logo"
            title="Company Logo"
            description="Manage and display logos of top recruiting companies"
            icon={<Building2 className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => updateData({ enabled })}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <UploadZone
                        key={idx}
                        id={`company-logo-${idx + 1}`}
                        file={data.logo?.[idx] ?? null}
                        accept="image/*"
                        onFileSelect={(file) => {
                            const logo = [...(data.logo || [])];
                            logo[idx] = file;
                            updateData({ logo });
                        }}
                        onClear={() => {
                            const logo = [...(data.logo || [])];
                            logo.splice(idx, 1);
                            updateData({ logo });
                        }}
                        title="Add here"
                        description="Max size: 3 MB"
                        className="py-10 px-4"
                        icon={
                            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-[#10B981]" />
                            </div>
                        }
                    />
                ))}
            </div>
        </ContentSection>
    );
}
