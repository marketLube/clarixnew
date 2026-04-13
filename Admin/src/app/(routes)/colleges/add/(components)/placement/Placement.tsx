import { Input } from "@/src/components/ui/input";
import { FormField } from "@/src/components/ui/FormField";
import { ChevronRight, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import { useRecruiters } from "@/src/servicesHooks/recruiterHooks/useRecruiters";
import { Recruiter } from "@/src/servicesHooks/recruiterHooks/types/recruiterHooksType";
import AddRecruiterDrawer from "@/src/app/(routes)/recruiters/modals/AddRecruiterDrawer";
import Loader from "@/src/components/common/Loader";

interface PlacementTrend {
    year: string;
    avgSalary: string;
    placementPercentage: string;
}

const packageStats = [
    { id: "avgPackage", name: "avgPackage", label: "Average Package (LPA)", placeholder: "e.g.45" },
    { id: "highestPackage", name: "highestPackage", label: "Highest Package (LPA)", placeholder: "e.g.45" },
    { id: "placementPercent", name: "placementPercent", label: "Placement %", placeholder: "e.g.45%" },
];

const internshipStats = [
    { id: "studentsWithInternships", name: "studentsWithInternships", label: "Students with Internships (%)", placeholder: "e.g. 85" },
    { id: "avgStipend", name: "avgStipend", label: "Avg Stipend (₹)", placeholder: "e.g. 25000" },
    { id: "ppoConversionRate", name: "ppoConversionRate", label: "PPO Conversion Rate (%)", placeholder: "e.g. 65" },
];

const alumniOutcomesStats = [
    { id: "alumniInFortune500", name: "alumniInFortune500", label: "In Fortune 500 (%)", placeholder: "e.g. 85" },
    { id: "alumniEntrepreneurs", name: "alumniEntrepreneurs", label: "Entrepreneurs (%)", placeholder: "e.g. 15" },
    { id: "alumniHigherStudiesAbroad", name: "alumniHigherStudiesAbroad", label: "Higher Studies Abroad (%)", placeholder: "e.g. 65" },
];

interface PlacementProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}

export default function Placement({ formData, onUpdate, readOnly = false }: PlacementProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedRecruiterId, setSelectedRecruiterId] = useState("");
    const [selectedRecruiters, setSelectedRecruiters] = useState<Recruiter[]>([]);

    // Fetch recruiters from API
    const { data: recruitersData, isLoading: isLoadingRecruiters } = useRecruiters({ limit: 100 });
    const availableRecruiters = recruitersData?.data?.recruiters || [];

    // Placement trends state
    const [placementTrends, setPlacementTrends] = useState<PlacementTrend[]>([]);
    const [currentTrend, setCurrentTrend] = useState<PlacementTrend>({
        year: "",
        avgSalary: "",
        placementPercentage: "",
    });

    // Sync selectedRecruiters with formData.recruiters (for view mode)
    useEffect(() => {
        if (formData.recruiters && Array.isArray(formData.recruiters)) {
            // Check if recruiters are IDs (strings) or objects
            const isIds = formData.recruiters.every((item: any) => typeof item === 'string');

            if (!isIds && formData.recruiters.length > 0) {
                // Already objects, use them directly
                setSelectedRecruiters(formData.recruiters);
            } else if (isIds && availableRecruiters.length > 0) {
                // IDs, convert to objects
                const recruiterObjects = formData.recruiters
                    .map((id: string) => availableRecruiters.find((r: Recruiter) => r._id === id))
                    .filter(Boolean) as Recruiter[];
                setSelectedRecruiters(recruiterObjects);
            }
        }
    }, [formData.recruiters, availableRecruiters]);

    // Sync placementTrends with formData.placementTrends (for view mode)
    useEffect(() => {
        if (formData.placementTrends && Array.isArray(formData.placementTrends) && formData.placementTrends.length > 0) {
            setPlacementTrends(formData.placementTrends);
        }
    }, [formData.placementTrends]);

    const handleStatChange = (fieldId: string, value: string) => {
        const fieldMap: any = {
            avgPackage: "averageSalary",
            highestPackage: "highestSalary",
            placementPercent: "placementPercentage",
            studentsWithInternships: "studentsWithInternships",
            avgStipend: "avgStipend",
            ppoConversionRate: "ppoConversionRate",
            alumniInFortune500: "alumniInFortune500",
            alumniEntrepreneurs: "alumniEntrepreneurs",
            alumniHigherStudiesAbroad: "alumniHigherStudiesAbroad",
        };
        onUpdate(fieldMap[fieldId] || fieldId, value);
    };

    const handleAddPlacementTrend = () => {
        if (currentTrend.year && currentTrend.avgSalary && currentTrend.placementPercentage) {
            const updated = [...placementTrends, currentTrend];
            setPlacementTrends(updated);
            setCurrentTrend({ year: "", avgSalary: "", placementPercentage: "" });
            onUpdate('placementTrends', updated);
        }
    };

    const handleRemovePlacementTrend = (index: number) => {
        const updated = placementTrends.filter((_, i) => i !== index);
        setPlacementTrends(updated);
        onUpdate('placementTrends', updated);
    };


    const availableRecruiterOptions = availableRecruiters
        .filter(recruiter => !selectedRecruiters.find(r => r._id === recruiter._id))
        .map(recruiter => ({
            label: `${recruiter.companyName} - ${recruiter.industry || 'N/A'}`,
            value: recruiter._id
        }));

    const handleAddRecruiter = () => {
        if (selectedRecruiterId) {
            const recruiter = availableRecruiters.find(r => r._id === selectedRecruiterId);
            if (recruiter) {
                const updated = [...selectedRecruiters, recruiter];
                setSelectedRecruiters(updated);
                setSelectedRecruiterId("");
                // Send only recruiter IDs to parent
                onUpdate('recruiters', updated.map(r => r._id));
            }
        }
    };

    const handleRemoveRecruiter = (recruiterId: string) => {
        const updated = selectedRecruiters.filter(r => r._id !== recruiterId);
        setSelectedRecruiters(updated);
        // Send only recruiter IDs to parent
        onUpdate('recruiters', updated.map(r => r._id));
    };
    return (
        <div className="space-y-8 w-full">
            {/* Year Placement Trends - Historical Data */}
            <div className="space-y-4 p-5 bg-blue-50/50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Year Placement Trends</h3>
                    <span className="text-xs text-gray-500 font-medium">(Historical yearly data)</span>
                </div>

                {/* Input Fields */}
                {!readOnly && (
                    <div className="space-y-3">
                        <div className="flex gap-3 items-end">
                            <FormField label="Year" name="year" className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="e.g., 2024"
                                    value={currentTrend.year}
                                    onChange={(e) => setCurrentTrend({ ...currentTrend, year: e.target.value })}
                                />
                            </FormField>
                            <FormField label="Average Salary (LPA)" name="avgSalary" className="flex-1">
                                <Input
                                    type="number"
                                    placeholder="e.g., 8.5"
                                    value={currentTrend.avgSalary}
                                    onChange={(e) => setCurrentTrend({ ...currentTrend, avgSalary: e.target.value })}
                                />
                            </FormField>
                            <FormField label="Placement %" name="placementPercentage" className="flex-1">
                                <Input
                                    type="number"
                                    placeholder="e.g., 85"
                                    value={currentTrend.placementPercentage}
                                    onChange={(e) => setCurrentTrend({ ...currentTrend, placementPercentage: e.target.value })}
                                />
                            </FormField>
                            <button
                                type="button"
                                onClick={handleAddPlacementTrend}
                                disabled={!currentTrend.year || !currentTrend.avgSalary || !currentTrend.placementPercentage}
                                className="px-4 h-10 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                    </div>
                )}

                {/* Display Added Trends */}
                {placementTrends.length > 0 ? (
                    <div className="space-y-2">
                        {!readOnly && <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide">Added Yearly Trends</h4>}
                        <div className="space-y-2">
                            {placementTrends.map((trend, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-white border border-blue-200 rounded-lg"
                                >
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <span className="text-xs text-gray-500 font-medium">Year</span>
                                            <p className="text-sm font-semibold text-gray-900">{trend.year}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 font-medium">Avg Salary</span>
                                            <p className="text-sm font-semibold text-emerald-700">₹{trend.avgSalary} LPA</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 font-medium">Placement %</span>
                                            <p className="text-sm font-semibold text-gray-900">{trend.placementPercentage}%</p>
                                        </div>
                                    </div>
                                    {!readOnly && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePlacementTrend(index)}
                                            className="p-1 hover:bg-red-100 rounded-full transition-colors"
                                        >
                                            <X className="w-4 h-4 text-red-600" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : readOnly && (
                    <div className="text-center py-8 text-gray-400">
                        No placement trends data available
                    </div>
                )}
            </div>

            {/* Overall Package Statistics */}
            <div className="space-y-4 p-5 bg-amber-50/50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Overall Package Statistics</h3>
                    <span className="text-xs text-gray-500 font-medium">(Current overall stats)</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {packageStats.map((stat) => (
                        <FormField
                            key={stat.id}
                            label={stat.label}
                            name={stat.id}
                            className="w-full"
                        >
                            <Input
                                id={stat.id}
                                name={stat.name}
                                type="number"
                                placeholder={stat.placeholder}
                                value={formData[stat.id === "avgPackage" ? "averageSalary" : stat.id === "highestPackage" ? "highestSalary" : "placementPercentage"]}
                                onChange={(e) => handleStatChange(stat.id, e.target.value)}
                                disabled={readOnly}
                            />
                        </FormField>
                    ))}
                </div>
            </div>

            {/* Internship Statistics */}
            <div className="space-y-4 p-5 bg-purple-50/50 border border-purple-200 rounded-xl">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Internship Statistics</h3>
                    <span className="text-xs text-gray-500 font-medium">(Internship & PPO stats)</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {internshipStats.map((stat) => (
                        <FormField
                            key={stat.id}
                            label={stat.label}
                            name={stat.id}
                            className="w-full"
                        >
                            <Input
                                id={stat.id}
                                name={stat.name}
                                type="number"
                                placeholder={stat.placeholder}
                                value={formData[stat.id]}
                                onChange={(e) => handleStatChange(stat.id, e.target.value)}
                                disabled={readOnly}
                            />
                        </FormField>
                    ))}
                </div>
            </div>

            {/* Alumni Outcomes */}
            <div className="space-y-4 p-5 bg-blue-50/50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Alumni Outcomes</h3>
                    <span className="text-xs text-gray-500 font-medium">(Success metrics)</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {alumniOutcomesStats.map((stat) => (
                        <FormField
                            key={stat.id}
                            label={stat.label}
                            name={stat.id}
                            className="w-full"
                        >
                            <Input
                                id={stat.id}
                                name={stat.name}
                                type="number"
                                placeholder={stat.placeholder}
                                value={formData[stat.id]}
                                onChange={(e) => handleStatChange(stat.id, e.target.value)}
                                disabled={readOnly}
                            />
                        </FormField>
                    ))}
                </div>
            </div>

            {/* Select Recruiters */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Select Recruiters</h3>
                    {readOnly && selectedRecruiters.length > 0 && (
                        <span className="text-sm text-gray-600 font-medium">
                            {selectedRecruiters.length} Recruiter{selectedRecruiters.length !== 1 ? 's' : ''} Selected
                        </span>
                    )}
                </div>

                {isLoadingRecruiters ? (
                    <div className="flex flex-col items-center justify-center py-8 gap-2">
                        <Loader size="md" />
                        <span className="text-sm text-gray-600">Loading recruiters...</span>
                    </div>
                ) : (
                    <>
                        {/* Search and Add Recruiter */}
                        {!readOnly && (
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <SearchableSelect
                                        options={availableRecruiterOptions}
                                        value={selectedRecruiterId}
                                        onValueChange={setSelectedRecruiterId}
                                        placeholder="Search and select recruiter..."
                                        searchPlaceholder="Search recruiters..."
                                        className="w-full"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddRecruiter}
                                    disabled={!selectedRecruiterId}
                                    className="px-4 h-10 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                        )}

                        {/* Selected Recruiters */}
                        {selectedRecruiters.length > 0 ? (
                            <div className="space-y-3">
                                {selectedRecruiters.map((recruiter) => {
                                    // Generate initials from company name
                                    const logoText = recruiter.companyName
                                        .split(' ')
                                        .map(word => word[0])
                                        .join('')
                                        .toUpperCase()
                                        .slice(0, 4);

                                    return (
                                        <div
                                            key={recruiter._id}
                                            className="group flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:border-emerald-300 transition-all"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                                                    <span className="text-[10px] font-bold tracking-tighter text-gray-800 uppercase italic">
                                                        {logoText}
                                                        <span className="text-emerald-500 ml-0.5">^</span>
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold text-gray-800">{recruiter.companyName}</span>
                                                        {recruiter.industry && (
                                                            <span className="px-2 py-0.5 text-xs font-medium bg-white text-emerald-700 rounded-full">
                                                                {recruiter.industry}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-gray-600 font-medium">{recruiter.jobTitle}</span>
                                                </div>
                                            </div>
                                            {!readOnly && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveRecruiter(recruiter._id)}
                                                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-md transition-all"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : readOnly && (
                            <div className="text-center py-8 text-gray-400">
                                No recruiters selected for this college
                            </div>
                        )}

                        {/* Add New Recruiter Button */}
                        {!readOnly && (
                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center justify-center gap-2 w-full py-3.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all border border-dashed border-black/10 rounded-xl mt-2 group cursor-pointer"
                            >
                                <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">Create New Recruiter</span>
                            </button>
                        )}
                    </>
                )}
            </div>


            <AddRecruiterDrawer
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}
