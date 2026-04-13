import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { FormActionFooterProps } from "../../../(types)/type";



export default function FormActionFooter({
    onBack,
    onNext,
    isFirstTab = false,
    isLastTab = false,
    isLoading = false,
}: FormActionFooterProps) {
    return (
        <div className="flex items-center justify-between bg-white py-4">
            <button
                onClick={onBack}
                disabled={isFirstTab}
                className={`flex items-center gap-2 ${isFirstTab ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-black"
                    }`}
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-700 hover:text-black">
                    <Save className="w-4 h-4" />
                    <span className="text-sm font-medium">Save Draft</span>
                </button>

                <Button
                    onClick={onNext}
                    size="sm"
                    className="gap-2"
                    disabled={isLoading}
                >
                    <span className="text-sm font-medium">
                        {isLoading ? "Submitting..." : isLastTab ? "Submit" : "Next"}
                    </span>
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    );
}