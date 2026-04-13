"use client";

import { cn } from "@/lib/utils";

interface SettingsTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = [
    { id: "general", label: "General" },
    { id: "notifications", label: "Notifications" },
];

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
    return (
        <div className="flex justify-start">
            <div className="flex items-center p-[2px] bg-white border border-[#AAC4BC] border-[0.5px] rounded-[10px] w-fit gap-[2px]">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "px-6 py-1.5 rounded-[9px] text-[14px] font-medium transition-all duration-200 min-w-[172px] leading-[20px]",
                            activeTab === tab.id
                                ? "bg-[#0dba85] text-white shadow-[1px_1px_2px_0px_rgba(13,186,133,0.29)]"
                                : "text-[#868F8B] hover:text-[#364440] bg-transparent"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
