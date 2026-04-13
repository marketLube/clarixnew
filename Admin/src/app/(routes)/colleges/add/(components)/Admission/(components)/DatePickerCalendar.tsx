"use client"

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/src/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    isSameDay,
    isBefore,
    startOfDay,
    addMonths,
    subMonths,
    setMonth,
    setYear,
} from "date-fns";

interface DatePickerCalendarProps {
    value?: Date | string;
    onChange?: (date: Date | null) => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());

export default function DatePickerCalendar({
    value,
    onChange,
    children,
    disabled = false,
}: DatePickerCalendarProps) {
    const initialDate = value
        ? typeof value === "string"
            ? new Date(value)
            : value
        : new Date();

    const [open, setOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(initialDate);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        (value ? (typeof value === "string" ? new Date(value) : value) : null)
    );
    const today = startOfDay(new Date());

    useEffect(() => {
        if (value) {
            const dateValue = typeof value === "string" ? new Date(value) : value;
            setSelectedDate(dateValue);
            setCurrentMonth(dateValue);
        }
    }, [value]);

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd,
    });

    const isPastDate = (date: Date) => {
        return isBefore(startOfDay(date), today);
    };

    const handleDateClick = (date: Date) => {
        if (isPastDate(date)) return;

        // If the date is from a different month, navigate to that month
        if (!isSameMonth(date, currentMonth)) {
            setCurrentMonth(startOfMonth(date));
        }

        // Select the date
        setSelectedDate(date);
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleMonthChange = (monthName: string) => {
        const monthIndex = MONTHS.indexOf(monthName);
        setCurrentMonth(setMonth(currentMonth, monthIndex));
    };

    const handleYearChange = (year: string) => {
        setCurrentMonth(setYear(currentMonth, parseInt(year)));
    };

    const handleClear = () => {
        setSelectedDate(null);
        if (onChange) onChange(null);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOK = () => {
        if (onChange) {
            onChange(selectedDate);
        }
        setOpen(false);
    };

    return (
        <Popover open={!disabled && open} onOpenChange={disabled ? undefined : setOpen}>
            <PopoverTrigger asChild disabled={disabled}>{children}</PopoverTrigger>
            <PopoverContent
                className="w-[320px] p-0 rounded-[24px] border-[#e6e8e7] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.08)] bg-white"
                align="start"
            >
                <div className="bg-white rounded-[24px]">
                    {/* Header */}
                    <div className="flex items-center justify-between pl-4 pr-3 py-2 border-b border-[#e6e8e7]">
                        <div className="flex items-center gap-1">
                            <Select
                                value={format(currentMonth, "MMMM")}
                                onValueChange={handleMonthChange}
                            >
                                <SelectTrigger className="h-8 px-2 gap-1 border-none shadow-none hover:bg-gray-100 rounded-md bg-transparent text-[14px] font-medium text-[#49454f] focus:ring-0 focus:ring-offset-0 outline-none cursor-pointer">
                                    <div className="flex items-center gap-1">
                                        <span>{format(currentMonth, "MMMM")}</span>
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-gray-200 shadow-xl max-h-[300px] z-[999]">
                                    {MONTHS.map((month) => (
                                        <SelectItem key={month} value={month} className="cursor-pointer text-gray-900 font-medium">
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={format(currentMonth, "yyyy")}
                                onValueChange={handleYearChange}
                            >
                                <SelectTrigger className="h-8 px-2 gap-1 border-none shadow-none hover:bg-gray-100 rounded-md bg-transparent text-[14px] font-medium text-[#49454f] focus:ring-0 focus:ring-offset-0 outline-none cursor-pointer">
                                    <div className="flex items-center gap-1">
                                        <span>{format(currentMonth, "yyyy")}</span>
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-gray-200 shadow-xl max-h-[300px] z-[999]">
                                    {YEARS.map((year) => {
                                        const isPastYear = parseInt(year) < currentYear;
                                        return (
                                            <SelectItem
                                                key={year}
                                                value={year}
                                                disabled={isPastYear}
                                                className={cn(
                                                    "cursor-pointer font-medium",
                                                    isPastYear ? "text-gray-300 opacity-50" : "text-gray-900"
                                                )}
                                            >
                                                {year}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-full hover:bg-gray-100 cursor-pointer"
                                onClick={handlePreviousMonth}
                            >
                                <ChevronLeft className="size-4 text-[#49454f]" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-full hover:bg-gray-100 cursor-pointer"
                                onClick={handleNextMonth}
                            >
                                <ChevronRight className="size-4 text-[#49454f]" />
                            </Button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-3">
                        {/* Days of Week */}
                        <div className="grid grid-cols-7 mb-2">
                            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                <div
                                    key={`day-${index}`}
                                    className="size-10 flex items-center justify-center"
                                >
                                    <span className="text-[13px] font-medium text-gray-500">
                                        {day}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7">
                            {calendarDays.map((day, index) => {
                                const isCurrentMonth = isSameMonth(day, currentMonth);
                                const isToday = isSameDay(day, today);
                                const isSelected = selectedDate && isSameDay(day, selectedDate);
                                const isPast = isPastDate(day);

                                return (
                                    <button
                                        key={`date-${format(day, "yyyy-MM-dd")}-${index}`}
                                        onClick={() => handleDateClick(day)}
                                        disabled={isPast}
                                        className={`
                      size-10 flex items-center justify-center rounded-full text-[14px] transition-all
                      ${!isCurrentMonth || isPast ? "text-[#9ba3a0] opacity-40" : "text-[#1e302a]"}
                      ${isSelected ? "bg-[#218760] text-white font-semibold opacity-100" : ""}
                      ${isToday && !isSelected ? "border border-[#218760] text-[#218760]" : ""}
                      ${!isSelected && isCurrentMonth && !isPast ? "hover:bg-gray-100" : ""}
                      ${isPast ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                                    >
                                        <span>
                                            {format(day, "d")}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-[#e6e8e7]">
                        <button
                            onClick={handleClear}
                            className="text-[15px] font-semibold text-[#697571] hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            Clear
                        </button>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleCancel}
                                className="text-[15px] font-semibold text-[#697571] hover:text-gray-900 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOK}
                                className="text-[15px] font-semibold text-[#218760] hover:text-[#1a6b4c] transition-colors cursor-pointer"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
