import React from "react";

export default function ContentWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 lg:px-10 mt-2 md:mt-10 ${className}`}>{children}</div>
  );
}
