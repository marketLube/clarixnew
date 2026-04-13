"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/src/components/ui/sheet";
import { Trash2, X } from "lucide-react";

interface CampusLifeItem {
    id: string;
    image: string;
    title: string;
    tags: string[];
    description: string;
}

const dummyCampusLife: CampusLifeItem[] = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        title: "Clubs & Societies",
        tags: ["Technical Clubs", "Cultural Societies", "Social Service", "Entrepreneurship"],
        description: "Over 40+ active clubs covering technical, cultural, sports, and social activities. Students can join multiple clubs."
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        title: "Clubs & Societies",
        tags: ["Technical Clubs", "Cultural Societies", "Social Service", "Entrepreneurship"],
        description: "Over 40+ active clubs covering technical, cultural, sports, and social activities. Students can join multiple clubs."
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        title: "Clubs & Societies",
        tags: ["Technical Clubs", "Cultural Societies", "Social Service", "Entrepreneurship"],
        description: "Over 40+ active clubs covering technical, cultural, sports, and social activities. Students can join multiple clubs."
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        title: "Clubs & Societies",
        tags: ["Technical Clubs", "Cultural Societies", "Social Service", "Entrepreneurship"],
        description: "Over 40+ active clubs covering technical, cultural, sports, and social activities. Students can join multiple clubs."
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        title: "Clubs & Societies",
        tags: ["Technical Clubs", "Cultural Societies", "Social Service", "Entrepreneurship"],
        description: "Over 40+ active clubs covering technical, cultural, sports, and social activities. Students can join multiple clubs."
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop",
        title: "Clubs & Societies",
        tags: ["Technical Clubs", "Cultural Societies", "Social Service", "Entrepreneurship"],
        description: "Over 40+ active clubs covering technical, cultural, sports, and social activities. Students can join multiple clubs."
    },
];

interface ViewCampusLifeDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewCampusLifeDrawer({ open, onOpenChange }: ViewCampusLifeDrawerProps) {
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
                    <div className="divide-y divide-gray-100 flex flex-col gap-4">
                        {dummyCampusLife.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-32 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="pt-1">
                                            <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-1.5 flex-wrap">
                                                {item.title}
                                                <span className="text-gray-400 font-normal ml-0.5">•</span>
                                                <span className="text-gray-500 font-medium">
                                                    {item.tags.join(",")}
                                                </span>
                                            </h4>
                                            <p className="mt-1 text-[13px] text-gray-500 leading-relaxed max-w-[440px]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <button className="text-red-400 hover:text-red-500 transition-colors p-2 mt-1">
                                            <Trash2 className="w-5 h-5 stroke-[1.5]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
