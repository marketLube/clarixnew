import { FormField } from "@/src/components/ui/FormField";
import { Textarea } from "@/src/components/ui/textarea";

interface AboutProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}

export default function About({ formData, onUpdate, readOnly }: AboutProps) {
    return (
        <div className="space-y-6">
            <FormField label="About Job" name="aboutJob">
                <Textarea
                    placeholder="Write a short about"
                    rows={6}
                    value={formData.aboutJob}
                    onChange={(e) => onUpdate("aboutJob", e.target.value)}
                    readOnly={readOnly}
                    disabled={readOnly}
                />
            </FormField>

            <FormField label="About you" name="aboutYou">
                <Textarea
                    placeholder="Enter a specification (press Enter for next point)"
                    rows={6}
                    value={formData.aboutYou}
                    onChange={(e) => onUpdate("aboutYou", e.target.value)}
                    readOnly={readOnly}
                    disabled={readOnly}
                />
            </FormField>

            <FormField label="About the role" name="aboutRole">
                <Textarea
                    placeholder="Enter a specification (press Enter for next point)"
                    rows={6}
                    value={formData.aboutRole}
                    onChange={(e) => onUpdate("aboutRole", e.target.value)}
                    readOnly={readOnly}
                    disabled={readOnly}
                />
            </FormField>
        </div>
    );
}