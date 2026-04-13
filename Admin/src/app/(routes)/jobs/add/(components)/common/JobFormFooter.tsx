import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type JobFormActionFooterProps = {
    onBack?: () => void;
    onNext?: () => void;
    isFirstTab?: boolean;
    isLastTab?: boolean;
    isLoading?: boolean;
    isViewMode?: boolean;
};

export default function JobFormFooter({
    onBack,
    onNext,
    isFirstTab = false,
    isLastTab = false,
    isLoading = false,
    isViewMode = false,
}: JobFormActionFooterProps) {
    return (
        <div className="flex items-center justify-between bg-white py-4">
            <button
                onClick={onBack}
                disabled={isFirstTab || isLoading}
                className={`flex items-center gap-2 ${isFirstTab || isLoading ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-black"
                    }`}
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="flex items-center gap-4">
                {!isViewMode && (
                    <button
                        disabled={isLoading}
                        className={`flex items-center gap-2 ${isLoading ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-black"}`}
                    >
                        <Save className="w-4 h-4" />
                        <span className="text-sm font-medium">Save Draft</span>
                    </button>
                )}

                <Button
                    onClick={onNext}
                    size="sm"
                    disabled={isLoading}
                    className="gap-2 bg-[#0dba85] hover:bg-[#0aa67bd2] disabled:bg-gray-300"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm font-medium">
                                {isViewMode ? "Loading..." : "Submitting..."}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-sm font-medium">
                                {isLastTab && !isViewMode ? "Submit" : "Next"}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
