import Link from 'next/link';
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
            <div className="space-y-6 max-w-lg">
                <div className="relative">
                    <h1 className="text-[12rem] font-black text-white/5 select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
                            <p className="text-neutral-400">
                                The page you are looking for doesn't exist or has been moved.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Button asChild className="bg-white text-black hover:bg-neutral-200">
                        <Link href="/">Back to Dashboard</Link>
                    </Button>
                    <Button variant="outline" className="border-neutral-800 text-neutral-400 hover:bg-neutral-900" onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
