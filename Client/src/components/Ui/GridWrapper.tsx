import React from "react";

type Cols = 1 | 2 | 3 | 4;

type GridWrapperProps = {
  children: React.ReactNode;
  /** base (<640px) */
  colsMobile?: Cols;
  /** sm: ≥640px (large phones, foldable open) */
  colsFold?: Cols;
  /** md: ≥768px (tablet portrait) */
  colsTablet?: Cols;
  /** lg: ≥1024px (desktop) */
  colsDesktop?: Cols;
  /** xl: ≥1280px (wide desktop) */
  colsWide?: Cols;
  className?: string;
};

export default function GridWrapper({
  children,
  colsMobile = 1,
  colsFold,
  colsTablet = 2,
  colsDesktop = 4,
  colsWide,
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

  const foldClass = colsFold
    ? colsFold === 1
      ? "sm:grid-cols-1"
      : colsFold === 2
      ? "sm:grid-cols-2"
      : colsFold === 3
      ? "sm:grid-cols-3"
      : "sm:grid-cols-4"
    : "";

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

  const wideClass = colsWide
    ? colsWide === 1
      ? "xl:grid-cols-1"
      : colsWide === 2
      ? "xl:grid-cols-2"
      : colsWide === 3
      ? "xl:grid-cols-3"
      : "xl:grid-cols-4"
    : "";

  return (
    <div
      className={`grid  ${mobileClass} ${foldClass} ${tabletClass} ${desktopClass} ${wideClass} gap-4 my-[1.25rem] ${className} `}
    >
      {children}
    </div>
  );
}
