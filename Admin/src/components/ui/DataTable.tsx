"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionContainer } from "./SectionContainer";
import SectionSearchAndFilterHeader from "../common/SectionSearchAndFilterHeader";


export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    subKey?: keyof T;
    render?: (value: any, item: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => void;
    filters?: React.ReactNode;
    className?: string;
    moreOptions?: React.ReactNode;
}

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    searchPlaceholder = "Search",
    onSearchChange,
    filters,
    className,
    moreOptions
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(new Set(data.map(item => item.id)));
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleRowSelect = (id: string | number) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const isAllSelected = data.length > 0 && selectedRows.size === data.length;

    return (
        <SectionContainer noPadding className={cn("pt-8", className)}>
            <SectionSearchAndFilterHeader
                className="px-8"
                searchValue={searchTerm}
                onSearchChange={(e) => {
                    setSearchTerm(e.target.value);
                    onSearchChange?.(e.target.value);
                }}
                searchPlaceholder={searchPlaceholder}
                showSelectAll={false}
            >
                {filters}
            </SectionSearchAndFilterHeader>


            <div className="overflow-x-auto border-t border-gray-50">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-50 bg-gray-50/50">
                            <th className="py-5 px-8 w-12 text-center">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                                />
                            </th>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={cn(
                                        "py-5 px-4 text-[13px] font-bold text-gray-800 uppercase tracking-tight",
                                        col.headerClassName
                                    )}
                                >
                                    {col.header}
                                </th>
                            ))}
                            <th className="py-5 px-8 w-12 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.map((item) => {
                            const isSelected = selectedRows.has(item.id);
                            return (
                                <tr
                                    key={item.id}
                                    className={cn(
                                        "group hover:bg-gray-50/50 transition-colors",
                                        isSelected && "bg-emerald-50/30 hover:bg-emerald-50/50"
                                    )}
                                    onClick={() => handleRowSelect(item.id)}
                                >
                                    <td className="py-5 px-8 text-center" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleRowSelect(item.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                                        />
                                    </td>
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={cn("py-5 px-4 text-[14px] text-gray-600 font-normal", col.className)}
                                        >
                                            {col.render
                                                ? col.render(col.accessorKey ? item[col.accessorKey] : item, item)
                                                : col.subKey ? (
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-[14px] text-gray-500 leading-tight">
                                                            {col.accessorKey ? String(item[col.accessorKey]) : ""}
                                                        </span>
                                                        <span className="text-[12px] text-gray-400 font-thin leading-tight mt-0.5">
                                                            {String(item[col.subKey])}
                                                        </span>
                                                    </div>
                                                )
                                                    : (col.accessorKey ? String(item[col.accessorKey]) : "")}
                                        </td>
                                    ))}
                                    <td className="py-5 px-8 text-center" onClick={(e) => e.stopPropagation()}>
                                        {moreOptions}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </SectionContainer>
    );
}
