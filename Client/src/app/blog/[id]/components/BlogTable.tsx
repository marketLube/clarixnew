"use client";

import React from "react";

interface TableRow {
  college: string;
  course: string;
  category: string;
  categoryColor: string;
  categoryBgColor: string;
}

interface BlogTableProps {
  title?: string;
  rows: TableRow[];
}

export default function BlogTable({ title, rows }: BlogTableProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-[1px_4px_31px_0px_rgba(0,0,0,0.04)] overflow-hidden max-w-[930px] w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[1.5fr_1.2fr_0.8fr] sm:grid-cols-[320px_319px_291px] border-b border-[#eaeaea]">
        <div className="bg-[#f6f7ff] border-r border-white min-h-[50px] sm:h-[60px] flex items-center justify-start px-3 sm:pl-[30px]">
          <p className="font-helvetica font-medium leading-tight text-[#162447] text-[13px] sm:text-[20px] tracking-[-0.4px]">
            Name of the College
          </p>
        </div>
        <div className="bg-[#f6f7ff] border-r border-white min-h-[50px] sm:h-[60px] flex items-center justify-start px-3">
          <p className="font-helvetica font-medium leading-tight text-[#162447] text-[13px] sm:text-[20px] tracking-[-0.4px]">
            Expected Course
          </p>
        </div>
        <div className="bg-[#f6f7ff] min-h-[50px] sm:h-[60px] flex items-center justify-center px-3">
          <p className="font-helvetica font-medium leading-tight text-[#162447] text-[13px] sm:text-[20px] tracking-[-0.4px] text-center">
            Category
          </p>
        </div>
      </div>

      {/* Table Rows */}
      <div className="flex flex-col">
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-[1.5fr_1.2fr_0.8fr] sm:grid-cols-[320px_319px_291px] items-center border-b border-[#eaeaea] min-h-[60px] bg-white last:border-0"
          >
            <div className="px-3 py-3 sm:py-4 sm:pl-[30px]">
              <p className="font-poppins text-[12px] sm:text-[16px] leading-[1.4] text-[#162447]">
                {row.college}
              </p>
            </div>
            <div className="px-3 py-3 sm:py-4">
              <p className="font-poppins text-[12px] sm:text-[16px] leading-[1.4] text-[#162447]">
                {row.course}
              </p>
            </div>
            <div className="px-3 py-3 sm:py-4 flex items-center justify-center">
              <div
                className="px-[10px] py-[4px] sm:px-[16px] sm:py-[10px] rounded-[30px]"
                style={{
                  backgroundColor: row.categoryBgColor,
                }}
              >
                <p
                  className="font-poppins text-[11px] sm:text-[16px] leading-tight whitespace-nowrap"
                  style={{ color: row.categoryColor }}
                >
                  {row.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
