"use client";

import { ArrowLeft, Eye, ArrowRight, Save } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
    title: string;
    onSave?: () => void;
    onPreview?: () => void;
    onPublish?: () => void;
    backUrl?: string;
}

export function PageHeader({ title, onSave, onPreview, onPublish, backUrl }: PageHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between py-4 bg-white border-b sticky top-0 z-50 px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => backUrl ? router.push(backUrl) : router.back()}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 text-[#364440] group-hover:text-[#0dba85]" />
                </button>
                <h1 className="text-lg font-medium text-[#364440]">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    className="gap-2 text-[#364440] hover:bg-gray-50 h-9 font-normal"
                    onClick={onSave}
                >
                    <Save className="w-4 h-4" />
                    Save Draft
                </Button>
                <Button
                    variant="ghost"
                    className="gap-2 text-[#364440] hover:bg-gray-50 h-9 font-normal"
                    onClick={onPreview}
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </Button>
                <Button
                    className="gap-2 bg-[#0dba85] hover:bg-[#0aa67bd2] text-white h-9 px-6 rounded-md font-normal"
                    onClick={onPublish}
                >
                    Publish
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
