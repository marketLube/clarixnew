import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

interface QAProps {
    formData: any;
    onFaqChange: (index: number, field: 'question' | 'answer', value: string) => void;
    readOnly?: boolean;
}

export default function QA({ formData, onFaqChange, readOnly }: QAProps) {
    return (
        <div className="space-y-6">
            <FormField label="Questions & answers for this job" name="faq1">
                <div className="space-y-4">
                    <Input
                        placeholder="Write FAQs"
                        value={formData.faqs[0]?.question || ""}
                        onChange={(e) => onFaqChange(0, 'question', e.target.value)}
                        disabled={readOnly}
                    />
                    <Textarea
                        placeholder="Answer....."
                        rows={4}
                        value={formData.faqs[0]?.answer || ""}
                        onChange={(e) => onFaqChange(0, 'answer', e.target.value)}
                        readOnly={readOnly}
                        disabled={readOnly}
                    />
                </div>
            </FormField>

            <FormField label="Questions & answers for this job" name="faq2">
                <div className="space-y-4">
                    <Input
                        placeholder="Write FAQs"
                        value={formData.faqs[1]?.question || ""}
                        onChange={(e) => onFaqChange(1, 'question', e.target.value)}
                        disabled={readOnly}
                    />
                    <Textarea
                        placeholder="Answer....."
                        rows={4}
                        value={formData.faqs[1]?.answer || ""}
                        onChange={(e) => onFaqChange(1, 'answer', e.target.value)}
                        readOnly={readOnly}
                        disabled={readOnly}
                    />
                </div>
            </FormField>

            <FormField label="Questions & answers for this job" name="faq3">
                <div className="space-y-4">
                    <Input
                        placeholder="Write FAQs"
                        value={formData.faqs[2]?.question || ""}
                        onChange={(e) => onFaqChange(2, 'question', e.target.value)}
                        disabled={readOnly}
                    />
                    <Textarea
                        placeholder="Answer....."
                        rows={4}
                        value={formData.faqs[2]?.answer || ""}
                        onChange={(e) => onFaqChange(2, 'answer', e.target.value)}
                        readOnly={readOnly}
                        disabled={readOnly}
                    />
                </div>
            </FormField>
        </div>
    );
}