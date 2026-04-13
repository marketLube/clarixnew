"use client";

import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select } from "@/src/components/ui/Selector";
import { Button } from "@/src/components/ui/button";

export default function PlatformConfiguration() {
    const [config, setConfig] = useState({
        platformName: "Clarix Education",
        supportEmail: "support@clarix.edu",
        defaultLanguage: "en",
    });

    const languageOptions = [
        { label: "English", value: "en" },
        { label: "Hindi", value: "hi" },
        { label: "Spanish", value: "es" },
    ];

    return (
        <div className="bg-white border-[#DEE7E4] border-[0.5px] rounded-[18px] w-full p-5">
            {/* Card Header */}
            <div className="pt-6 px-[30px] pb-6">
                <h2 className="text-[16px] font-medium text-[#364440] leading-[16px]">
                    Platform Configuration
                </h2>
                <p className="text-[16px] text-[#868F8B] font-normal leading-[24px] mt-[6px]">
                    Basic platform settings and information
                </p>
            </div>

            {/* Card Content */}
            <div className="px-[30px] pb-[30px]">
                <div className="flex flex-col gap-[18px]">
                    {/* Platform Name */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="platformName"
                            className="text-[14px] font-medium text-[#364440]"
                        >
                            Platform Name
                        </Label>
                        <Input
                            id="platformName"
                            value={config.platformName}
                            onChange={(e) => setConfig({ ...config, platformName: e.target.value })}
                            className="h-[48px] bg-white border-[#DEE7E4] text-[14px] text-[#364440] focus-visible:ring-[#10B981]"
                        />
                    </div>

                    {/* Support Email */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="supportEmail"
                            className="text-[14px] font-medium text-[#364440]"
                        >
                            Support Email
                        </Label>
                        <Input
                            id="supportEmail"
                            type="email"
                            value={config.supportEmail}
                            onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
                            className="h-[48px] bg-white border-[#DEE7E4] text-[14px] text-[#364440] focus-visible:ring-[#10B981]"
                        />
                    </div>

                    {/* Default Language */}
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="defaultLanguage"
                            className="text-[14px] font-medium text-[#364440]"
                        >
                            Default Language
                        </Label>
                        <Select
                            value={config.defaultLanguage}
                            onValueChange={(val) => setConfig({ ...config, defaultLanguage: val })}
                            options={languageOptions}
                            placeholder="Select Language"
                            className="h-[48px] bg-white border-[#DEE7E4] text-[14px] text-[#364440]"
                        />
                    </div>
                    <div>

                        <Button>
                            Save Changes
                        </Button>
                    </div>
                </div>



            </div>
        </div>
    );
}