import React from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionHeading({
  title,
  className = "",
  style,
}: SectionHeadingProps) {
  return (
    <h2
      className={`text-[22px] md:text-[42px] lg:text-[48px] leading-[28px] md:leading-[36px] lg:leading-[48px] tracking-[-0.96px] font-medium font-['Helvetica_Neue'] text-text-headline ${className} font-helvetica`}
      style={style}
    >
      {title}
    </h2>
  );
}
