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
      className={`text-[20px] md:text-[36px] lg:text-[48px] leading-[26px] md:leading-[40px] lg:leading-[48px] tracking-[-0.5px] md:tracking-[-0.96px] font-medium font-poppins text-text-headline ${className}`}
      style={style}
    >
      {title}
    </Tag>
  );
}
