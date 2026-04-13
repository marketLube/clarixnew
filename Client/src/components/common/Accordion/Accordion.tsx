"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionItem = {
  id: string | number;
  header: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: (string | number)[];
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
};

export default function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className = "",
  itemClassName = "",
  headerClassName = "",
  contentClassName = "",
}: AccordionProps) {
  const [expandedIds, setExpandedIds] =
    useState<(string | number)[]>(defaultExpanded);

  const toggleItem = (id: string | number) => {
    setExpandedIds((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        const isDisabled = item.disabled;

        return (
          <div
            key={item.id}
            className={`bg-white rounded-[20px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] overflow-hidden ${itemClassName}`}
          >
            <button
              type="button"
              onClick={() => !isDisabled && toggleItem(item.id)}
              disabled={isDisabled}
              className={`w-full flex items-center justify-between px-6 py-4 md:px-8 md:py-5 ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              } ${headerClassName}`}
            >
              <div className="flex items-center gap-4 flex-1">
                {item.header}
              </div>

              <div className="ml-4 flex items-center">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-[#767e92]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#767e92]" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div
                className={`border-t border-[#e2e4e8] px-6 pb-5 pt-4 md:px-8 ${contentClassName}`}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
