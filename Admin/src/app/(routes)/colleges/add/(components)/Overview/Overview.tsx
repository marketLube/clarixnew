import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";


interface OverviewProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}

import { SearchableSelect } from "@/src/components/ui/SearchableSelect";
import { useUniversities } from "@/src/servicesHooks/universityHooks/useUniversities";



export default function Overview({ formData, onUpdate, readOnly = false }: OverviewProps) {
    const {data,isLoading} = useUniversities();
    const universities = data?.data?.universities;
    return (
        <div className="space-y-6 w-full overflow-y-auto">
            <FormField label="College Overview" name="collegeOverview">
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => onUpdate("description", e.target.value)}
                    placeholder="Eg: At MIT Mumbai..."
                    rows={4}
                    disabled={readOnly}
                />
            </FormField>

            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Key Highlights</h3>
                <div className="flex w-full gap-3">
                    <div className="w-1/3">
                        <SearchableSelect
                            options={universities?.map((university: any) => ({ label: university.name, value: university._id })) || []}
                            value={typeof formData.university === 'string' ? formData.university : formData.university?._id}
                            onValueChange={(value) => onUpdate("university", value)}
                            placeholder="Select University"
                            searchPlaceholder="Search university..."
                            disabled={readOnly}
                        />
                    </div>
                    <div className="w-1/3">
                        <Input
                            id="students"
                            name="students"
                            type="number"
                            value={formData.students}
                            onChange={(e) => onUpdate("students", e.target.value)}
                            placeholder="Students"
                            disabled={readOnly}
                        />
                    </div>
                    <div className="w-1/3">
                        <Input
                            id="campusSize"
                            name="campusSize"
                            type="text"
                            value={formData.campusSize}
                            onChange={(e) => onUpdate("campusSize", e.target.value)}
                            placeholder="Campus Size"
                            disabled={readOnly}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Placement Statistics</h3>
                <div className="flex w-full gap-3">
                    <div className="w-1/2">
                        <Input
                            id="averageSalary"
                            name="averageSalary"
                            type="number"
                            value={formData.averageSalary}
                            onChange={(e) => onUpdate("averageSalary", e.target.value)}
                            placeholder="Average Placement"
                            disabled={readOnly}
                        />
                    </div>
                    <div className="w-1/2">
                        <Input
                            id="placementPercentage"
                            name="placementPercentage"
                            type="number"
                            value={formData.placementPercentage}
                            onChange={(e) => onUpdate("placementPercentage", e.target.value)}
                            placeholder="Placement Rate (%)"
                            disabled={readOnly}
                        />
                    </div>
                </div>
                <div className="flex w-full gap-3">
                    <div className="w-1/2">
                        <Input
                            id="highestSalary"
                            name="highestSalary"
                            type="number"
                            value={formData.highestSalary}
                            onChange={(e) => onUpdate("highestSalary", e.target.value)}
                            placeholder="Highest Package"
                            disabled={readOnly}
                        />
                    </div>
                    <div className="w-1/2">
                        <Input
                            id="recruitersCount"
                            name="recruitersCount"
                            type="number"
                            value={formData.recruitersCount}
                            placeholder="Top Recruiters Count"
                            onChange={(e) => onUpdate("recruitersCount", e.target.value)}
                            disabled={readOnly}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}