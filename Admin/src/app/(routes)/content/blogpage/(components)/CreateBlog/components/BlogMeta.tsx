"use client";

import React from "react";
import { Calendar, Clock, Tag } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

interface BlogMetaProps {
    date: string;
    readTime: string;
    category: string;
    onChange: (field: "date" | "readTime" | "category", value: string) => void;
    disabled?: boolean;
}

export default function BlogMeta({ date, readTime, category, onChange, disabled = false }: BlogMetaProps) {
    return (
        <ContentSection
            id="blog-meta"
            title="Blog Details"
            description="Set the date, read time, and category for your blog"
            icon={<Tag className="w-4 h-4 text-[#10B981]" />}
            readOnly={disabled}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                        <Input
                            id="date"
                            type="date"
                            value={date ? new Date(date).toISOString().split('T')[0] : ''}
                            onChange={(e) => onChange("date", e.target.value)}
                            disabled={disabled}
                            className="pl-10"
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="readTime">Read Time</Label>
                    <div className="relative">
                        <Input
                            id="readTime"
                            value={readTime}
                            onChange={(e) => onChange("readTime", e.target.value)}
                            placeholder="e.g. 5 min read"
                            disabled={disabled}
                            className="pl-10"
                        />
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <div className="relative">
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => onChange("category", e.target.value)}
                            placeholder="e.g. Technology"
                            disabled={disabled}
                            className="pl-10"
                        />
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                </div>
            </div>
        </ContentSection>
    );
}
