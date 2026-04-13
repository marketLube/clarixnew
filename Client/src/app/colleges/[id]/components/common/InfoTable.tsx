import type { ReactNode } from "react";

type InfoTableItem = {
  label: string;
  value: string;
  duration?: string;
  icon?: ReactNode;
};

type InfoTableProps = {
  title?: string;
  items?: InfoTableItem[];
  className?: string;
  showThreeColumns?: boolean;
  columnHeaders?: [string, string, string];
  footer?: {
    label: string;
    value: string;
  };
};

const DEFAULT_TIMELINE_ITEMS: InfoTableItem[] = [
  { label: "Application Opens", value: "January 15, 2025" },
  { label: "Application Deadline", value: "February 20, 2025" },
  { label: "Entrance Exam (MHT-CET)", value: "March 5, 2025" },
  { label: "Merit List Announcement", value: "April 10, 2025" },
  { label: "Counselling Rounds", value: "May 25, 2025" },
  { label: "Academic Session Starts", value: "June 30, 2025" },
];

export default function InfoTable({
  title = "Admission Timeline",
  items = DEFAULT_TIMELINE_ITEMS,
  className = "",
  showThreeColumns = false,
  columnHeaders,
  footer,
}: InfoTableProps) {
  return (
    <div
      className={`bg-[var(--white-color)] rounded-[20px] shadow-[1px_3px_30px_0px_rgba(0,0,0,0.04)] w-full relative overflow-hidden  ${className}`}
    >
      <div className="absolute bg-[var(--primary-light)] h-[59px] left-0 rounded-tl-[20px] rounded-tr-[20px] top-0 w-full" />
      <p className="absolute font-helvetica leading-[28px] left-[24px]  text-[18px] md:text-[24px] whitespace-nowrap top-[18px] tracking-[-0.48px] font-medium">
        {title}
      </p>
      <div className="flex flex-col gap-[4px] items-start pt-[59px] px-4 md:px-[24px]   pb-[24px]">
        {showThreeColumns && columnHeaders && (
          <div className="w-full hidden md:block">
            <div className="grid grid-cols-3 items-start md:items-center leading-[28px] py-[16px] text-[var(--text-sub)] text-[13px] md:text-[18px] tracking-[-0.36px] font-medium">
              <p className="font-helvetica text-left">{columnHeaders?.[0]}</p>
              <p className="font-helvetica text-left">{columnHeaders?.[1]}</p>
              <p className="font-helvetica text-center md:text-left">{columnHeaders?.[2]}</p>
            </div>
            <div className="h-px w-full bg-[var(--border)]" />
          </div>
        )}

        {items.map((item, index) => (
          <div key={index} className="w-full">
            {showThreeColumns ? (
              <>
                {/* Mobile layout: stacked, labeled rows for better readability */}
                {columnHeaders && (
                  <div className="block md:hidden py-[12px] text-[12px] leading-[18px] text-[var(--text-sub)] tracking-[-0.3px]">
                    <p className="font-helvetica font-medium text-[13px] mb-1">
                      {item.label}
                    </p>
                    <p className="font-helvetica">
                      <span className="font-medium text-[var(--text-headline)]">
                        {columnHeaders[1]}:{" "}
                      </span>
                      <span>{item.value}</span>
                    </p>
                    {item.duration && (
                      <p className="font-helvetica mt-1">
                        <span className="font-medium text-[var(--text-headline)]">
                          {columnHeaders[2]}:{" "}
                        </span>
                        <span>{item.duration}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Desktop layout: keep existing 3-column table */}
                <div className="hidden md:grid md:grid-cols-3 items-start leading-[28px] py-[12px] text-[var(--text-sub)] text-[13px] md:text-[16px] tracking-[-0.4px]">
                  <div className="text-left break-words">
                    <p className="font-helvetica font-normal">{item.label}</p>
                  </div>
                  <div className="text-left break-words">
                    <p className="font-helvetica font-medium">{item.value}</p>
                  </div>
                  <div className="text-left break-words">
                    <p className="font-helvetica font-medium">
                      {item.duration}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center leading-[28px] py-[12px] text-[var(--text-sub)] text-[13px] md:text-[16px] tracking-[-0.4px]">
                <div className="flex items-center gap-4">
                  {item.icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--primary-light)] text-[var(--primary-color)]">
                      {item.icon}
                    </div>
                  )}
                  <p className="font-helvetica font-normal">{item.label}</p>
                </div>
                <p className="font-helvetica font-medium">{item.value}</p>
              </div>
            )}

            {index < items.length - 1 && (
              <div className="h-px w-full bg-[var(--border)]" />
            )}
          </div>
        ))}

        {footer && (
          <div className="w-full mt-2">
            <div className="h-px w-full bg-[var(--border)]" />
            <div className="flex justify-between items-center leading-[28px] pt-[12px] text-[18px] tracking-[-0.4px] font-semibold">
              <p className="font-helvetica">{footer.label}</p>
              <p className="font-helvetica">{footer.value}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}