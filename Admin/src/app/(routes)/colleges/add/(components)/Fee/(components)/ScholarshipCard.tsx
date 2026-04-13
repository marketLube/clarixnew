import { X } from "lucide-react";
import { Scholarship } from "@/src/servicesHooks/scholarshipHooks/types/scholarshipHooksType";


const ScholarshipCard = ({ scholarship, handleRemoveScholarship, readOnly = false }: { scholarship: Scholarship, handleRemoveScholarship: (scholarshipId: string) => void, readOnly?: boolean }) => {
    return (
        <div
            key={scholarship._id}
            className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg"
        >
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-gray-900">{scholarship.scholarshipName}</h4>
                    <span className="px-2 py-0.5 text-xs font-medium bg-white text-emerald-700 rounded-full">
                        {scholarship.scholarshipType}
                    </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                    {scholarship.fundingType} • {scholarship.description.length > 60 
                        ? scholarship.description.substring(0, 60) + '...' 
                        : scholarship.description}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-emerald-700">
                    ₹{scholarship.totalFundingAmount.toLocaleString()}
                </span>
                {!readOnly && (
                    <button
                        onClick={() => handleRemoveScholarship(scholarship._id)}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-red-600" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ScholarshipCard;