import AdmissionModeOption from "./(components)/AdmissionModeOption";
import TimelineField from "./(components)/TimelineField";

const timelineFields = [
    [
        { id: "applicationOpens", name: "applicationOpens", placeholder: "Application Opens (MM/DD/YYYY)" },
        { id: "applicationDeadline", name: "applicationDeadline", placeholder: "Application Deadline (MM/DD/YYYY)" },
    ],
    [
        { id: "entranceExam", name: "entranceExam", placeholder: "Entrance Exam (MHT-CET)(MM/DD/YYYY)" },
        { id: "meritListAnnouncement", name: "meritListAnnouncement", placeholder: "Merit List Announcement (MM/DD/YYYY)" },
    ],
    [
        { id: "counsellingRounds", name: "counsellingRounds", placeholder: "Counselling Rounds (Eg:May 25, 2025)" },
        { id: "academicSessionStarts", name: "academicSessionStarts", placeholder: "Academic Session Starts (MM/DD/YYYY)" },
    ],
];

const admissionModes = [
    { value: "Merit List", label: "Merit List", description: "Admission based on academic performance" },
    { value: "Entrance Exam", label: "Entrance Exam", description: "Admission through entrance exams" },
    { value: "Management Quota", label: "Management Quota", description: "Admission based Management" },
    { value: "Other", label: "Other", description: "Other admission methods" },
];

interface AdmissionProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}

export default function Admission({ formData, onUpdate, readOnly = false }: AdmissionProps) {
    const handleTimelineChange = (field: string, value: any) => {
        // Map UI field names to API field names
        const fieldMap: any = {
            applicationOpens: "applicationOpeningDate",
            applicationDeadline: "applicationClosingDate",
            entranceExam: "entranceExamDate",
            meritListAnnouncement: "meritListAnnouncementDate",
            counsellingRounds: "counsellingStartsFrom",
            academicSessionStarts: "accademicSectionStartsFrom",
        };

        const mappedField = fieldMap[field] || field;

        // Convert Date object to ISO string for backend
        if (value instanceof Date) {
            onUpdate(mappedField, value.toISOString());
        } else {
            onUpdate(mappedField, value);
        }
    };

    // Helper function to get value from formData using the mapped field name
    const getValue = (fieldId: string) => {
        const fieldMap: any = {
            applicationOpens: "applicationOpeningDate",
            applicationDeadline: "applicationClosingDate",
            entranceExam: "entranceExamDate",
            meritListAnnouncement: "meritListAnnouncementDate",
            counsellingRounds: "counsellingStartsFrom",
            academicSessionStarts: "accademicSectionStartsFrom",
        };

        const mappedField = fieldMap[fieldId] || fieldId;
        return formData[mappedField] || "";
    };

    return (
        <div className="space-y-6 w-full">
            {/* Admission Timeline */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Admission Timeline</h3>
                {timelineFields.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex w-full gap-3">
                        {row.map((field) => (
                            <TimelineField
                                key={field.id}
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={getValue(field.id)}
                                onChange={(e: any) => handleTimelineChange(field.id, e.target.value)}
                                disabled={readOnly}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Admission Mode */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Admission Mode</h3>
                <div className="space-y-2">
                    {admissionModes.map((mode) => {
                        const currentModes = Array.isArray(formData.admissionMode) ? formData.admissionMode : [];
                        // Check if mode exists in the array based on 'mode' property
                        const selectedMode = currentModes.find((m: any) => m.mode === mode.value);
                        const isChecked = !!selectedMode;

                        return (
                            <AdmissionModeOption
                                key={mode.value}
                                value={mode.value}
                                modeLabel={mode.label}
                                description={mode.description}
                                name="admissionMode"
                                labelValue={selectedMode?.label || ''}
                                descriptionValue={selectedMode?.description || ''}
                                checked={isChecked}
                                onChange={() => {
                                    if (isChecked) {
                                        // Remove mode
                                        const newModes = currentModes.filter((m: any) => m.mode !== mode.value);
                                        onUpdate("admissionMode", newModes);
                                    } else {
                                        // Add mode with defaults
                                        const newMode = {
                                            mode: mode.value,
                                            label: 'Primary Route',
                                            description: ''
                                        };
                                        onUpdate("admissionMode", [...currentModes, newMode]);
                                    }
                                }}
                                onUpdateDetails={(newLabel, newDesc) => {
                                    if (!isChecked) return;

                                    const newModes = currentModes.map((m: any) => {
                                        if (m.mode === mode.value) {
                                            return { ...m, label: newLabel, description: newDesc };
                                        }
                                        return m;
                                    });
                                    onUpdate("admissionMode", newModes);
                                }}
                                disabled={readOnly}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}