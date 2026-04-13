import React from 'react';
import { FileQuestion } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NoDataProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function NoData({
    title = "No Data Found",
    description = "We couldn't find what you're looking for. Try adjusting your filters or adding new information.",
    icon,
    className
}: NoDataProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-8 text-center min-h-[300px] rounded-2xl border border-dashed border-[#aac4bc]/30 ",
            className
        )}>
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#10B981]/10 text-[#10B981]">
                {icon || <FileQuestion className="w-8 h-8" />}
            </div>
            <h3 className="text-xl font-semibold text-[#364440] dark:text-[#f8fafc] mb-2 font-display">
                {title}
            </h3>
            <p className="text-sm text-[#868f8b] max-w-[280px] leading-relaxed">
                {description}
            </p>
        </div>
    );
}
