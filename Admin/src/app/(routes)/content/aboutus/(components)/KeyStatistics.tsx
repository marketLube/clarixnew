"use client";

import { AboutKeyStatisticsSection, AboutStatItem } from "../types";
import { useMemo } from "react";
import { BarChart3 } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { Input } from "@/src/components/ui/input";

interface KeyStatisticsProps {
    data: AboutKeyStatisticsSection;
    onChange: (updates: Partial<AboutKeyStatisticsSection>) => void;
}

export default function KeyStatistics({ data, onChange }: KeyStatisticsProps) {
    const stats: AboutStatItem[] = useMemo(() => {
        if (data.stats && data.stats.length >= 4) return data.stats;

        const defaults: AboutStatItem[] = [
            { label: "Colleges", value: "" },
            { label: "Courses", value: "" },
            { label: "Student Reviews", value: "" },
            { label: "Job Listings", value: "" },
        ];

        return defaults.map((item, index) => ({
            ...item,
            ...(data.stats[index] || {}),
        }));
    }, [data.stats]);

    const handleStatChange = (index: number, value: string) => {
        const next = stats.map((item, i) =>
            i === index ? { ...item, value } : item
        );
        onChange({ stats: next });
    };

    return (
        <ContentSection
            id="about-key-statistics"
            title="Key Statistics"
            description="Main text that appears prominently in the who we are section"
            icon={<BarChart3 className="w-4 h-4 text-[#10B981]" />}
            isEnabled={data.enabled}
            onToggle={(enabled) => onChange({ enabled })}
        >
            <div className="grid grid-cols-2 gap-4 pt-2">
                <Input
                    type="text"
                    value={stats[0]?.value ?? ""}
                    onChange={(e) => handleStatChange(0, e.target.value)}
                    className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                />
                <Input
                    type="text"
                    value={stats[1]?.value ?? ""}
                    onChange={(e) => handleStatChange(1, e.target.value)}
                    className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                />
                <Input
                    type="text"
                    value={stats[2]?.value ?? ""}
                    onChange={(e) => handleStatChange(2, e.target.value)}
                    className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                />
                <Input
                    type="text"
                    value={stats[3]?.value ?? ""}
                    onChange={(e) => handleStatChange(3, e.target.value)}
                    className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                />
            </div>
        </ContentSection>
    );
}
