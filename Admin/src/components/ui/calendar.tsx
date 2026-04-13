"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/src/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="p-5 bg-white rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.12)] border border-gray-100/50">
      <DayPicker
        showOutsideDays={showOutsideDays}
        captionLayout="dropdown"
        fromYear={1990}
        toYear={2060}
        className={cn("", className)}
        classNames={{
          months: "flex flex-col space-y-6",
          month: "space-y-6",
          month_caption: "flex items-center justify-between px-2 pt-1 pb-2 relative gap-4",
          caption_label: "hidden",
          dropdowns: "flex items-center gap-1.5",
          dropdown_root: "relative inline-flex items-center",
          dropdown: cn(
            "h-11 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-2 text-[15px] font-bold text-gray-800 outline-none transition-all hover:bg-gray-100 hover:border-gray-200 focus:ring-4 focus:ring-emerald-500/10 cursor-pointer appearance-none pr-10 min-w-[110px]"
          ),
          nav: "flex items-center gap-1.5",
          button_previous: cn(
            "h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-500 hover:text-emerald-500 hover:bg-emerald-50/50 hover:border-emerald-100 transition-all cursor-pointer shadow-sm active:scale-95"
          ),
          button_next: cn(
            "h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-500 hover:text-emerald-500 hover:bg-emerald-50/50 hover:border-emerald-100 transition-all cursor-pointer shadow-sm active:scale-95"
          ),
          month_grid: "w-full border-collapse",
          weekdays: "flex mb-3",
          weekday: "text-gray-400 w-12 font-bold text-[10px] uppercase tracking-widest text-center",
          week: "flex w-full mt-1.5",
          day: cn(
            "h-12 w-12 flex items-center justify-center rounded-[18px] text-[16px] font-medium text-gray-700 transition-all cursor-pointer relative z-10 hover:bg-emerald-50 hover:text-emerald-600 active:scale-90"
          ),
          day_button: "h-full w-full",
          range_start: "day-range-start",
          range_end: "day-range-end",
          selected: "!bg-emerald-500 !text-white !font-bold shadow-[0_10px_20px_rgba(16,185,129,0.4)] rounded-[18px]",
          today: "relative after:content-[''] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-emerald-500 after:rounded-full font-bold text-gray-900 border border-emerald-100 bg-emerald-50/10",
          outside: "text-gray-300 opacity-30 hover:bg-transparent",
          disabled: "text-gray-200 opacity-20 cursor-not-allowed",
          range_middle: "aria-selected:bg-emerald-50 aria-selected:text-emerald-700",
          hidden: "invisible",
          ...classNames,
        }}
        components={{
          Chevron: ({ orientation }) => {
            if (orientation === "left") return <ChevronLeft className="h-5 w-5" />;
            return <ChevronRight className="h-5 w-5" />;
          }
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
