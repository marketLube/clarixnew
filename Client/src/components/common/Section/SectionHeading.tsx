import React from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function SectionHeading({
  title,
  className = "",
  style,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag
      className={`text-[22px] md:text-[42px] lg:text-[48px] leading-[28px] md:leading-[36px] lg:leading-[48px] tracking-[-0.96px] font-medium font-helvetica text-text-headline ${className}`}
      style={style}
    >
      {title}
    </Tag>
  );
}
