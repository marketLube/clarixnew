import React from "react";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
};

export default function Label({
  children,
  htmlFor,
  required = false,
  className = "",
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-poppins text-[12px] leading-[16px] md:text-[14px] md:leading-[20px] text-[var(--text-headline)] ${className}`}
    >
      {children}
      {required && <span className="text-[var(--error)] ml-1">*</span>}
    </label>
  );
}

