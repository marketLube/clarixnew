"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/src/components/ui/sheet";
import { Trash2, X } from "lucide-react";

interface Recruiter {
    id: string;
    company: string;
    roles: string;
    status: string;
    logo: string;
}

const dummyRecruiters: Recruiter[] = [
    {
        id: "1",
        company: "App Station",
        roles: "Data Scientist, Strategist",
        status: "Hiring Last 6 Months",
        logo: "/logos/appstation.png",
    },
    {
        id: "2",
        company: "App Station",
        roles: "Data Scientist, Strategist",
        status: "Hiring Last 6 Months",
        logo: "/logos/appstation.png",
    },
    {
        id: "3",
        company: "App Station",
        roles: "Data Scientist, Strategist",
        status: "Hiring Last 6 Months",
        logo: "/logos/appstation.png",
    },
    {
        id: "4",
        company: "App Station",
        roles: "Data Scientist, Strategist",
        status: "Hiring Last 6 Months",
        logo: "/logos/appstation.png",
    },
    {
        id: "5",
        company: "App Station",
        roles: "Data Scientist, Strategist",
        status: "Hiring Last 6 Months",
        logo: "/logos/appstation.png",
    },
];

interface ViewRecruitersDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewRecruitersDrawer({ open, onOpenChange }: ViewRecruitersDrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent hideClose={true} className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[700px] gap-0">
                <SheetHeader className="p-5">
                    <div className="flex items-center justify-between border-b pb-4">
                        <SheetTitle className="text-xl font-semibold text-gray-800">All</SheetTitle>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                                />
                                <label htmlFor="select-all" className="text-sm font-medium text-gray-600">
                                    Select All
                                </label>
                            </div>
                            <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
                                <X className="w-5 h-5 text-gray-500" />
                            </SheetClose>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-8">
                    <div className="divide-y divide-gray-100 flex flex-col">
                        {dummyRecruiters.map((item) => (
                            <div key={item.id} className="py-5 flex items-center justify-between group">
                                <div className="flex items-center gap-8 flex-1">
                                    <div className="w-24">
                                        <p className="text-sm font-medium text-gray-800">{item.company}</p>
                                    </div>
                                    <div className="w-48">
                                        <p className="text-sm text-gray-500">{item.roles}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-400 font-medium">{item.status}</p>
                                    </div>
                                    <div className="w-32 flex justify-center">
                                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                                            <img
                                                src={item.logo}
                                                alt={item.company}
                                                className="h-6 object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="ml-4 text-red-300 hover:text-red-500 transition-colors p-2 cursor-pointer">
                                    <Trash2 className="w-5 h-5 stroke-[1.5]" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
