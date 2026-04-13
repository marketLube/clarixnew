"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/src/components/ui/sheet";
import { Plus, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";

interface FeeRow {
    id: string;
    course: string;
    fee: string;
    duration: string;
}

interface FeeBreakdownDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    initialData: { course: string; fee: string; duration: string }[];
}

export function FeeBreakdownDrawer({ open, onOpenChange, title, initialData }: FeeBreakdownDrawerProps) {
    const [rows, setRows] = useState<FeeRow[]>([]);

    useEffect(() => {
        if (open) {
            setRows(initialData.map((d, i) => ({ ...d, id: Math.random().toString(36).substr(2, 9) })));
        }
    }, [open, initialData]);

    const handleAddRow = () => {
        const newRow: FeeRow = {
            id: Math.random().toString(36).substr(2, 9),
            course: "",
            fee: "",
            duration: "",
        };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id: string) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleUpdateRow = (id: string, field: keyof FeeRow, value: string) => {
        setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent hideClose={true} className="p-0 flex flex-col h-full bg-white border-none sm:max-w-[700px] gap-0">
                <SheetHeader className="p-6">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-semibold text-gray-800">{title}</SheetTitle>
                        <SheetClose className="hover:bg-gray-100 p-2 rounded-full transition-colors outline-none cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </SheetClose>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4">
                    <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        {/* Table Header */}
                        <div className="flex bg-gray-50/50 border-b border-gray-100">
                            <div className="w-[40%] p-4 text-[13px] font-semibold text-gray-500 uppercase tracking-tight border-r border-gray-100">Course</div>
                            <div className="w-[30%] p-4 text-[13px] font-semibold text-gray-500 uppercase tracking-tight border-r border-gray-100">Annual Tuition Fee</div>
                            <div className="w-[25%] p-4 text-[13px] font-semibold text-gray-500 uppercase tracking-tight border-r border-gray-100">Duration</div>
                            <div className="w-[5%] p-4"></div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-50">
                            {rows.map((row) => (
                                <div key={row.id} className="flex items-center hover:bg-gray-50/30 transition-colors group">
                                    <div className="w-[40%] border-r border-gray-50">
                                        <input
                                            type="text"
                                            value={row.course}
                                            onChange={(e) => handleUpdateRow(row.id, "course", e.target.value)}
                                            placeholder="eg;B.Tech (CSE)"
                                            className="w-full p-4 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="w-[30%] border-r border-gray-50">
                                        <input
                                            type="text"
                                            value={row.fee}
                                            onChange={(e) => handleUpdateRow(row.id, "fee", e.target.value)}
                                            placeholder="₹0000"
                                            className="w-full p-4 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="w-[25%] border-r border-gray-50">
                                        <input
                                            type="text"
                                            value={row.duration}
                                            onChange={(e) => handleUpdateRow(row.id, "duration", e.target.value)}
                                            placeholder="0 years"
                                            className="w-full p-4 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="w-[5%] flex justify-center items-center pr-2">
                                        <button
                                            onClick={() => handleDeleteRow(row.id)}
                                            className="text-red-300 hover:text-red-500 transition-colors p-2 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4 stroke-[1.5]" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Row Button */}
                        <button
                            onClick={handleAddRow}
                            className="w-full py-4 flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50/50 transition-all border-t border-dashed border-gray-200 group cursor-pointer"
                        >
                            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Add</span>
                        </button>
                    </div>
                </div>

                {/* Footer Save Button */}
                <div className="p-4 border-t border-gray-100 flex justify-end">
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="px-10"
                    >
                        Save
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
