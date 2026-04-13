import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`text-[36px] leading-[44px] tracking-[-0.96px] text-[#162447] ${className}`}
    >
      {children}
    </h2>
  );
}
