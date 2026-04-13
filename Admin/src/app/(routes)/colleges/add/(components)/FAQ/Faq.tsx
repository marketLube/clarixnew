import FaqSection from "./(components)/FaqSection";

interface FAQProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}

export default function FAQ({ formData, onUpdate, readOnly = false }: FAQProps) {
    const sections = [
        {
            title: "Admission FAQs",
            field: "admissionFaqs",
            questions: formData.admissionFaqs || [],
        },
        {
            title: "Courses FAQs",
            field: "courseFaqs",
            questions: formData.courseFaqs || [],
        },
        {
            title: "Fees & Payment — FAQs",
            field: "feesPaymentFaqs",
            questions: formData.feesPaymentFaqs || [],
        },
        {
            title: "Scholarships — FAQs",
            field: "scholarshipFaqs",
            questions: formData.scholarshipFaqs || [],
        },
    ];

    return (
        <div className="space-y-8 w-full pb-6">
            {sections.map((section, index) => (
                <FaqSection
                    key={index}
                    title={section.title}
                    questions={section.questions}
                    onUpdate={(qs: any) => onUpdate(section.field, qs)}
                    readOnly={readOnly}
                />
            ))}
        </div>
    );
}

