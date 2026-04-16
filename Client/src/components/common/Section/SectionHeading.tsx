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
      className={`text-[20px] sm:text-[22px] md:text-[26px] lg:text-[32px] xl:text-[36px] leading-[26px] sm:leading-[28px] md:leading-[32px] lg:leading-[38px] xl:leading-[42px] tracking-[-0.4px] md:tracking-[-0.6px] lg:tracking-[-0.8px] font-medium font-poppins text-text-headline ${className}`}
      style={style}
    >
      {title}
    </Tag>
  );
}
