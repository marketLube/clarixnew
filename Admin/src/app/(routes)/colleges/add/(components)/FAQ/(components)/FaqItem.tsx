import { Edit2, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";

type FaqItemProps = {
    question: string;
    answer?: string;
    onEdit?: () => void;
    readOnly?: boolean;
};

const MAX_ANSWER_LENGTH = 200; // Characters to show before "Read more"

export default function FaqItem({ question, answer, onEdit, readOnly = false }: FaqItemProps) {
    const [isExpanded, setIsExpanded] = useState(readOnly); // Auto-expand in view mode
    const [showFullAnswer, setShowFullAnswer] = useState(false);

    const isLongAnswer = answer && answer.length > MAX_ANSWER_LENGTH;
    const displayAnswer = answer && isLongAnswer && !showFullAnswer 
        ? answer.substring(0, MAX_ANSWER_LENGTH) + '...'
        : answer;

    return (
        <div className="rounded-lg border border-black/10 bg-white group hover:border-emerald-500/30 transition-all overflow-hidden">
            <div 
                className={`flex items-center justify-between p-3 ${!readOnly && answer ? 'cursor-pointer' : ''}`}
                onClick={() => !readOnly && answer && setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 flex-1">
                    {!readOnly && answer && (
                        <ChevronDown 
                            className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    )}
                    <span className="text-sm font-medium text-gray-700">{question}</span>
                </div>
                {!readOnly && (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            onClick={onEdit}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
            
            {answer && isExpanded && (
                <div className="px-3 pb-3 pt-0">
                    <div className={`${!readOnly ? 'pl-7' : ''}`}>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {displayAnswer}
                        </p>
                        {isLongAnswer && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFullAnswer(!showFullAnswer);
                                }}
                                className="mt-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                                {showFullAnswer ? 'Read less' : 'Read more'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

