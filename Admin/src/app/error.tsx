'use client';

import { useEffect } from 'react';
import { Button } from "@/src/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
            <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                    <svg
                        className="w-10 h-10 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
                    <p className="text-neutral-400 text-sm">
                        An unexpected error occurred. We've been notified and are working on it.
                    </p>
                </div>
                {process.env.NODE_ENV === 'development' && (
                    <div className="bg-black/50 rounded-lg p-4 text-left overflow-auto max-h-40">
                        <code className="text-xs text-red-400/80 font-mono">
                            {error.message || "Unknown error"}
                        </code>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={() => reset()}
                        className="flex-1 bg-white text-black hover:bg-neutral-200 transition-colors"
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => window.location.href = '/'}
                        variant="outline"
                        className="flex-1 border-neutral-800 hover:bg-neutral-800 transition-colors"
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
