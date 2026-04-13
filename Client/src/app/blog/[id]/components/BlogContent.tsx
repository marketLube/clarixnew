"use client";

import React from "react";
import Image from "next/image";

interface BlogContentProps {
  content: string;
  imageUrl?: string;
}

export default function BlogContent({ content, imageUrl }: BlogContentProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-[40px]">
      {/* Image if provided */}
      {imageUrl && (
        <div className="relative w-full max-w-[930px] h-[320px] md:h-[550px] rounded-[20px] overflow-hidden">
          <Image
            src={imageUrl}
            alt="Blog content"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Main Content Text */}
      <div
        className="font-helvetica font-normal leading-[28px] text-[#767e92] text-[16px] md:text-[20px] tracking-[-0.4px] max-w-[930px] 
        prose prose-lg max-w-none 
        prose-headings:font-medium prose-headings:text-[#162447] 
        prose-p:text-[#767e92] prose-p:leading-[28px] prose-p:mb-4
        prose-a:text-[#513392] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[#162447] prose-strong:font-bold
        prose-ul:list-disc prose-ul:pl-5 prose-ul:my-4
        prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-4
        prose-li:text-[#767e92] prose-li:my-2"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Guide Section */}
      <div className="flex flex-col gap-[16px] max-w-[795px]">
        <p className="font-helvetica font-medium leading-[28px] text-[#162447] text-[16px] md:text-[20px] tracking-[-0.4px]">
          Use this guide to:
        </p>
        <div className="relative pl-[12px]">
          <ul className="font-helvetica font-normal leading-[28px] text-[#767e92] text-[16px] md:text-[20px] tracking-[-0.4px] list-none space-y-0">
            <li className="mb-0 pl-[20px] relative before:content-['•'] before:absolute before:left-0 before:text-[#767e92] before:text-[24px]">
              Know how to filter colleges based on previous-year cutoffs & seat
              availability
            </li>
            <li className="mb-0 pl-[20px] relative before:content-['•'] before:absolute before:left-0 before:text-[#767e92] before:text-[24px]">
              Understand what to check beyond percentile (category, domicile
              quota, fees, specialization)
            </li>
            <li className="pl-[20px] relative before:content-['•'] before:absolute before:left-0 before:text-[#767e92] before:text-[24px]">
              Consider a balanced list: safe, moderate, and a few ambitious
              picks
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
