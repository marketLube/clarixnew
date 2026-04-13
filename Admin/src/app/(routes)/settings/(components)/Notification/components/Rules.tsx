"use client";

import { useState } from "react";
import { Switch } from "@/src/components/ui/switch";

export default function Rules() {
    const [rules, setRules] = useState({
        scholarshipDeadline: true,
        applicationFollowUp: true,
    });

    return (
        <div className="w-full rounded-[12px] border border-[#B7D7CF] bg-white flex flex-col gap-3 mt-6">
            {/* Header */}
            <div className="px-6 pt-4 pb-2">
                <h2 className="text-[15px] font-medium text-black">
                    Notification Rules
                </h2>
                <p className="text-[14px] text-[#717182] mt-1">
                    Automated notification settings
                </p>
            </div>

            {/* Content */}
            <div className="px-6 pb-5 flex flex-col gap-3">
                {/* Scholarship Deadline Reminders */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            Scholarship Deadline Reminders
                        </p>
                        <p className="text-[14px] text-[#717182]">
                            Send reminders 7 days before deadline
                        </p>
                    </div>
                    <Switch
                        checked={rules.scholarshipDeadline}
                        onCheckedChange={(val) =>
                            setRules({ ...rules, scholarshipDeadline: val })
                        }
                    />
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#F1F5F9] my-2" />

                {/* Application Follow-up Reminders */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[14px] font-medium text-black">
                            Application Follow-up Reminders
                        </p>
                        <p className="text-[14px] text-[#717182]">
                            Remind counselors about pending applications
                        </p>
                    </div>
                    <Switch
                        checked={rules.applicationFollowUp}
                        onCheckedChange={(val) =>
                            setRules({ ...rules, applicationFollowUp: val })
                        }
                    />
                </div>
            </div>
        </div>
    );
}