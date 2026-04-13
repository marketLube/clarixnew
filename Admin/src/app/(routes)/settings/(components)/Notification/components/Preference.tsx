"use client";

import { useState } from "react";
import { Switch } from "@/src/components/ui/switch";

export default function Preference() {
    const [preferences, setPreferences] = useState({
        email: true,
        push: true,
        newAppAlerts: true,
        flaggedReviewAlerts: true,
    });

    return (
        <div className="w-full rounded-[12px] border border-[#B7D7CF] bg-white flex flex-col gap-3">
            {/* Header */}
            <div className="px-6 pt-4 pb-2">
                <h2 className="text-[15px] font-medium text-black">
                    Notification Preferences
                </h2>
                <p className="text-[14px] text-[#717182] mt-1">
                    Configure how you receive notifications
                </p>
            </div>

            {/* Content */}
            <div className="px-6 pb-5 flex flex-col gap-3">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            Email Notifications
                        </p>
                        <p className="text-[14px] text-[#717182]">
                            Receive updates via email
                        </p>
                    </div>
                    <Switch
                        checked={preferences.email}
                        onCheckedChange={(val) =>
                            setPreferences({ ...preferences, email: val })
                        }
                    />
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            Push Notifications
                        </p>
                        <p className="text-[14px] text-[#717182]">
                            Receive browser push notifications
                        </p>
                    </div>
                    <Switch
                        checked={preferences.push}
                        onCheckedChange={(val) =>
                            setPreferences({ ...preferences, push: val })
                        }
                    />
                </div>

                {/* New Application Alerts */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            New Application Alerts
                        </p>
                        <p className="text-[14px] text-[#717182]">
                            Get notified when new applications arrive
                        </p>
                    </div>
                    <Switch
                        checked={preferences.newAppAlerts}
                        onCheckedChange={(val) =>
                            setPreferences({ ...preferences, newAppAlerts: val })
                        }
                    />
                </div>

                {/* Flagged Review Alerts */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            Flagged Review Alerts
                        </p>
                        <p className="text-[14px] text-[#717182]">
                            Get notified when reviews are flagged by AI
                        </p>
                    </div>
                    <Switch
                        checked={preferences.flaggedReviewAlerts}
                        onCheckedChange={(val) =>
                            setPreferences({ ...preferences, flaggedReviewAlerts: val })
                        }
                    />
                </div>
            </div>
        </div>
    );
}