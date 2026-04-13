import { Modal } from "@/src/components/ui/Modal";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { useState, useEffect } from "react";

interface FaqModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (faq: any) => void;
    title: string;
    editMode: boolean;
    selectedFaq: any;
}

export default function FaqModal({ isOpen, onClose, onSubmit, title, editMode, selectedFaq }: FaqModalProps) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        if (editMode && selectedFaq) {
            setQuestion(selectedFaq.question || selectedFaq);
            setAnswer(selectedFaq.answer || "");
        } else {
            setQuestion("");
            setAnswer("");
        }
    }, [editMode, selectedFaq, isOpen]);

    const handleSave = () => {
        onSubmit({ question, answer });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <div className="space-y-4">
                <Input
                    placeholder="Write FAQs"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Textarea
                    placeholder="Answer...."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[120px]"
                />
                <div className="flex justify-end pt-2">
                    <Button
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
