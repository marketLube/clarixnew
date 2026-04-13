"use client";

import { useState } from "react";
import { Switch } from "@/src/components/ui/switch";

export default function DataAndPrivacy() {
    const [settings, setSettings] = useState({
        autoArchive: true,
        gdprMode: true,
    });

    return (
        <div className="w-full rounded-[12px] border border-[#B7D7CF] bg-white flex flex-col gap-3">
            {/* Header */}
            <div className="px-6 pt-4 pb-2">
                <h2 className="text-[15px] font-medium text-black">
                    Data & Privacy
                </h2>
                <p className="text-[14px] text-[#717182] mt-1">
                    Manage data retention and privacy settings
                </p>
            </div>

            {/* Content */}
            <div className="px-6 pb-5 flex flex-col gap-3">
                {/* Row 1 */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            Auto-archive old applications
                        </p>
                        <p className="text-[14px] text-[#717182]">
                            Archive applications older than 12 months
                        </p>
                    </div>

                    <Switch
                        checked={settings.autoArchive}
                        onCheckedChange={(val) =>
                            setSettings({ ...settings, autoArchive: val })
                        }
                    />
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            GDPR Compliance Mode
                        </p>
                        <p className="text-[14px] text-[#717182] mt-1">
                            Enable additional data protection measures
                        </p>
                    </div>

                    <Switch
                        checked={settings.gdprMode}
                        onCheckedChange={(val) =>
                            setSettings({ ...settings, gdprMode: val })
                        }
                    />
                </div>
            </div>
        </div>
    );
}
