import { useState, useEffect } from "react";
import AnnualFeeField from "./(components)/AnnualFeeField";
import { FeeBreakdownDrawer } from "./modals/FeeBreakdownDrawer";
import { MultiSelector } from "@/src/components/ui/MultiSelector";
import { Loader2 } from "lucide-react";
import ScholarshipCard from "./(components)/ScholarshipCard";
import { useScholarships } from "@/src/servicesHooks/scholarshipHooks/useScholarships";
import { Scholarship } from "@/src/servicesHooks/scholarshipHooks/types/scholarshipHooksType";

const annualFeeFields = [
    [
        { id: "hostelFees", name: "hostelFees", placeholder: "Hostel Fees" },
        { id: "messCharges", name: "messCharges", placeholder: "Mess Charges" },
    ],
    [
        { id: "libraryFees", name: "libraryFees", placeholder: "Library Fees" },
        { id: "laboratoryFees", name: "laboratoryFees", placeholder: "Laboratory Fees" },
    ],
    [
        { id: "sportsFees", name: "sportsFees", placeholder: "Sports Fees" },
    ],
];

interface FeeProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}



export default function Fee({ formData, onUpdate, readOnly = false }: FeeProps) {
    const [selectedScholarships, setSelectedScholarships] = useState<Scholarship[]>([]);

    // Fetch scholarships from API
    const { data: scholarshipsData, isLoading: isLoadingScholarships } = useScholarships();
    const availableScholarships = scholarshipsData?.data?.scholarships || [];

    // Sync selectedScholarships with formData.scholarships (for view mode)
    useEffect(() => {
        if (formData.scholarships && Array.isArray(formData.scholarships)) {
            // Check if scholarships are objects (from API) or IDs (from selection)
            const scholarshipsAsObjects = formData.scholarships.every((item: any) =>
                typeof item === 'object' && item !== null && item._id
            );

            if (scholarshipsAsObjects) {
                // Already objects, use them directly
                setSelectedScholarships(formData.scholarships);
            } else if (availableScholarships.length > 0) {
                // IDs, convert to objects
                const scholarshipObjects = formData.scholarships
                    .map((id: string) => availableScholarships.find((s: Scholarship) => s._id === id))
                    .filter(Boolean) as Scholarship[];
                setSelectedScholarships(scholarshipObjects);
            }
        }
    }, [formData.scholarships, availableScholarships]);

    const fieldMap: any = {
        hostelFees: "hostelFee",
        messCharges: "messFee",
        libraryFees: "libraryFee",
        laboratoryFees: "laboratoryFee",
        sportsFees: "sportsFee",
    };

    const handleFeeChange = (field: string, value: string) => {
        onUpdate(fieldMap[field] || field, value);
    };

    // Helper function to get the correct value from formData
    const getFeeValue = (fieldId: string) => {
        const mappedField = fieldMap[fieldId] || fieldId;
        return formData[mappedField] || "";
    };

    const [drawerState, setDrawerState] = useState<{
        open: boolean;
        title: string;
        data: { course: string; fee: string; duration: string }[];
    }>({
        open: false,
        title: "",
        data: [],
    });

    const availableScholarshipOptions = availableScholarships
        .map(scholarship => ({
            label: `${scholarship.scholarshipName} - ₹${scholarship.totalFundingAmount.toLocaleString()} (${scholarship.scholarshipType})`,
            value: scholarship._id
        }));

    const handleMultiSelectChange = (newIds: string[]) => {
        const newSelected = availableScholarships.filter((s: Scholarship) => newIds.includes(s._id));
        setSelectedScholarships(newSelected);
        onUpdate('scholarships', newIds);
    };

    const handleRemoveScholarship = (scholarshipId: string) => {
        const updated = selectedScholarships.filter(s => s._id !== scholarshipId);
        setSelectedScholarships(updated);
        // Send only scholarship IDs to parent
        onUpdate('scholarships', updated.map(s => s._id));
    };

    return (
        <div className="space-y-6 w-full">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Available Scholarships</h3>
                    {readOnly && selectedScholarships.length > 0 && (
                        <span className="text-sm text-gray-600 font-medium">
                            {selectedScholarships.length} Scholarship{selectedScholarships.length !== 1 ? 's' : ''} Selected
                        </span>
                    )}
                </div>

                {isLoadingScholarships ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                        <span className="ml-2 text-sm text-gray-600">Loading scholarships...</span>
                    </div>
                ) : (
                    <>
                        {!readOnly && (
                            <div className="w-full">
                                <MultiSelector
                                    options={availableScholarshipOptions}
                                    value={selectedScholarships.map(s => s._id)}
                                    onChange={handleMultiSelectChange}
                                    placeholder="Search and select scholarships..."
                                    className="w-full"
                                />
                            </div>
                        )}

                        {selectedScholarships.length > 0 ? (
                            <div className="space-y-2">
                                {!readOnly && <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">Selected Scholarships</h4>}
                                <div className="space-y-2">
                                    {selectedScholarships.map((scholarship) => (
                                        <ScholarshipCard
                                            key={scholarship._id}
                                            scholarship={scholarship}
                                            handleRemoveScholarship={handleRemoveScholarship}
                                            readOnly={readOnly}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : readOnly && (
                            <div className="text-center py-8 text-gray-400">
                                No scholarships selected for this college
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Annual Fee Breakdown</h3>
                {annualFeeFields.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex w-full gap-3">
                        {row.map((field) => (
                            <AnnualFeeField
                                key={field.id}
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={getFeeValue(field.id)}
                                onChange={(e: any) => handleFeeChange(field.id, e.target.value)}
                                disabled={readOnly}
                            />
                        ))}
                        {row.length === 1 && <div className="w-1/2" />}
                    </div>
                ))}
            </div>

            <FeeBreakdownDrawer
                open={drawerState.open}
                onOpenChange={(open) => setDrawerState({ ...drawerState, open })}
                title={drawerState.title}
                initialData={drawerState.data}
            />
        </div>
    );
}