import { Plus } from "lucide-react";
import FaqItem from "./FaqItem";
import { useState } from "react";
import FaqModal from "../modals/FaqModal";

type FaqSectionProps = {
    title: string;
    questions?: any[];
    onUpdate?: (questions: any[]) => void;
    readOnly?: boolean;
};

export default function FaqSection({ title, questions = [], onUpdate, readOnly = false }: FaqSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState<any>(null);

    const handleAdd = () => {
        setEditMode(false);
        setSelectedFaq(null);
        setIsModalOpen(true);
    };

    const handleEdit = (faq: any) => {
        setEditMode(true);
        setSelectedFaq(faq);
        setIsModalOpen(true);
    };

    const handleSubmit = (faq: any) => {
        let newQuestions;
        if (editMode) {
            newQuestions = questions.map(q => q === selectedFaq ? faq : q);
        } else {
            newQuestions = [...questions, faq];
        }
        onUpdate?.(newQuestions);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight">{title}</h3>
            {questions.length > 0 ? (
                <div className="space-y-2">
                    {questions.map((q, index) => (
                        <FaqItem 
                            key={index} 
                            question={q.question || q} 
                            answer={q.answer}
                            onEdit={() => handleEdit(q)} 
                            readOnly={readOnly} 
                        />
                    ))}
                </div>
            ) : readOnly ? (
                <div className="text-center py-6 text-gray-400 text-sm">
                    No FAQs available in this category
                </div>
            ) : null}
            {!readOnly && (
                <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 w-full py-3 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all border border-dashed border-black/10 rounded-xl group"
                >
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Add New FAQ</span>
                </button>
            )}

            <FaqModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                title={title}
                editMode={editMode}
                selectedFaq={selectedFaq}
            />
        </div>
    );
}


