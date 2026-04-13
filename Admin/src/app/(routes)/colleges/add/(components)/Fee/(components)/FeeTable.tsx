import { Plus } from "lucide-react";

type FeeTableRowProps = {
    course: string;
    fee: string;
    duration: string;
};

function FeeTableRow({ course, fee, duration }: FeeTableRowProps) {
    return (
        <div className="flex border-b border-black/10">
            <div className="flex-1 p-3 text-sm text-gray-700 border-r border-black/10">{course}</div>
            <div className="flex-1 p-3 text-sm text-gray-700 border-r border-black/10">{fee}</div>
            <div className="flex-1 p-3 text-sm text-gray-700">{duration}</div>
        </div>
    );
}

type FeeTableProps = {
    title: string;
    headers: string[];
    rows: FeeTableRowProps[];
    onAddClick?: () => void;
};

export default function FeeTable({ title, headers, rows, onAddClick }: FeeTableProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
            <div className="rounded-lg border border-black/10 overflow-hidden">
                {/* Header */}
                <div className="flex bg-gray-50 border-b border-black/10">
                    {headers.map((header, index) => (
                        <div key={index} className={`flex-1 p-3 text-sm font-medium text-gray-600 ${index < headers.length - 1 ? 'border-r border-black/10' : ''}`}>
                            {header}
                        </div>
                    ))}
                </div>
                {/* Rows */}
                {rows.map((row, index) => (
                    <FeeTableRow key={index} {...row} />
                ))}
                {/* Add More Button */}
                <button
                    type="button"
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-2 w-full py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors border-t border-dashed border-gray-300 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">See More & Add New</span>
                </button>
            </div>
        </div>
    );
}