"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import DatePickerCalendar from "./DatePickerCalendar"
import { TimelineFieldProps } from "../../../../(types)/type"



interface ExtendedTimelineFieldProps extends TimelineFieldProps {
    value?: any;
    onChange?: (e: any) => void;
    disabled?: boolean;
}

export default function TimelineField({ id, name, placeholder, value, onChange, disabled = false }: ExtendedTimelineFieldProps) {
    const date = value ? new Date(value) : null;
    const isInvalidDate = date && isNaN(date.getTime());
    const safeDate = isInvalidDate ? null : date;

    return (
        <div className="w-1/2">
            <DatePickerCalendar
                value={safeDate || undefined}
                onChange={(newDate) => onChange?.({ target: { name, value: newDate } })}
                disabled={disabled}
            >
                <button
                    type="button"
                    disabled={disabled}
                    className={cn(
                        "w-full h-10 px-3 flex items-center justify-between rounded-lg border border-black/10 bg-white/70 hover:bg-white/80 transition-colors text-left font-normal",
                        !safeDate && "text-gray-400",
                        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    )}
                >
                    <div className="flex items-center gap-2 truncate">
                        <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="truncate text-sm">
                            {safeDate ? format(safeDate, "MM/dd/yyyy") : placeholder}
                        </span>
                    </div>
                </button>
            </DatePickerCalendar>
            <input type="hidden" id={id} name={name} value={safeDate ? format(safeDate, "MM/dd/yyyy") : ""} />
        </div>
    );
}
