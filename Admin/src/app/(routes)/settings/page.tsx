"use client";

import { useState } from "react";
import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SettingsTabs } from "./(components)/SettingsTabs";
import General from "./(components)/General/General";
import Notification from "./(components)/Notification/Notification";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className="flex flex-col gap-4">
            <AdminHeader />
            <SectionHeading
                title="Settings"
                description="Configure platform settings and preferences"
            />
            <div className="py-2">
                <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="">
                {activeTab === "general" && (
                    <General />
                )}
                {activeTab === "notifications" && (
                    <Notification />
                )}
            </div>
        </div>
    );
}