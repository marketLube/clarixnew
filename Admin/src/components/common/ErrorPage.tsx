import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

interface ErrorPageProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    className?: string;
}

export default function ErrorPage({
    title = "Oops! Something went wrong",
    message = "There was an error loading the data. Please try again or contact support if the problem persists.",
    onRetry,
    className
}: ErrorPageProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-12 text-center min-h-[400px] rounded-3xl border border-dashed border-[#a01e1e]/20",
            className
        )}>
            <div className="relative mb-6">
                <div className="absolute inset-0 blur-2xl bg-[#a01e1e]/20 rounded-full animate-pulse" />
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-[#a01e1e]/10 text-[#a01e1e] border border-[#a01e1e]/20">
                    <AlertCircle className="w-10 h-10" />
                </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 font-display tracking-tight">
                {title}
            </h3>

            <p className="text-sm text-[#868f8b] max-w-[320px] mb-8 leading-relaxed">
                {message}
            </p>

            {onRetry && (
                <Button
                    onClick={onRetry}
                    variant="outline"
                    className="flex items-center gap-2 border-[#a01e1e]/20 text-white hover:bg-[#a01e1e]/10 hover:text-[#a01e1e] transition-all duration-300"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </Button>
            )}
        </div>
    );
}
