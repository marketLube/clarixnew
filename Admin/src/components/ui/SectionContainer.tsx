import { cn } from "@/lib/utils";
import React from "react";

interface SectionContainerProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export function SectionContainer({ children, className, noPadding }: SectionContainerProps) {
    return (
        <div className={cn(
            "bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden",
            !noPadding && "p-8",
            className
        )}>
            {children}
        </div>
    );
}
