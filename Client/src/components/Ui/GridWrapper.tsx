import React from "react";

type GridWrapperProps = {
  children: React.ReactNode;
  colsMobile?: 1 | 2 | 3 | 4;
  colsTablet?: 1 | 2 | 3 | 4;
  colsDesktop?: 1 | 2 | 3 | 4;
  className?: string;
};

export default function GridWrapper({
  children,
  colsMobile = 1,
  colsTablet = 2,
  colsDesktop = 4,
  className = "",
}: GridWrapperProps) {
  const mobileClass =
    colsMobile === 1
      ? "grid-cols-1 items-center justify-center"
      : colsMobile === 2
      ? "grid-cols-2 items-center justify-center"
      : colsMobile === 3
      ? "grid-cols-3 items-center justify-center"
      : "grid-cols-4 items-center justify-center";

  const tabletClass =
    colsTablet === 1
      ? "md:grid-cols-1"
      : colsTablet === 2
      ? "md:grid-cols-2"
      : colsTablet === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  const desktopClass =
    colsDesktop === 1
      ? "lg:grid-cols-1"
      : colsDesktop === 2
      ? "lg:grid-cols-2"
      : colsDesktop === 3
      ? "lg:grid-cols-3"
      : "lg:grid-cols-4";

  return (
    <div
      className={`grid  ${mobileClass} ${tabletClass} ${desktopClass} gap-4 my-[1.25rem] ${className} `}
    >
      {children}
    </div>
  );
}
