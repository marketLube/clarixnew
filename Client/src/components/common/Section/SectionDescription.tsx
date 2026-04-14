import React from "react";

interface SectionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionDescription({
  children,
  className = "",
}: SectionDescriptionProps) {
  return (
    <p
      className={`font-poppins text-[12px] md:text-[14px] lg:text-[16px] leading-[20px] tracking-[-0.32px] text-[#767e92] ${className}`}
    >
      {children}
    </p>
  );
}
