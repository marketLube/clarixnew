import React, { useId } from "react";

export interface GraduationCapIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const GraduationCapIcon = React.memo<GraduationCapIconProps>(
  ({ width = 18, height = 18, fill = "white", className, ...props }) => {
    const clipId = useId();

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill="none"
        className={className}
        {...props}
      >
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M3 8.49997L0 6.75L9 1.5L18 6.75V13.125H16.5V7.62502L15 8.49997V13.5085L14.833 13.7148C13.4593 15.4124 11.3563 16.5 9 16.5C6.64363 16.5 4.54072 15.4124 3.16697 13.7148L3 13.5085V8.49997ZM4.5 9.375V12.9688C5.60041 14.2155 7.20834 15 9 15C10.7917 15 12.3996 14.2155 13.5 12.9688V9.375L9 12L4.5 9.375ZM2.97695 6.75L9 10.2634L15.023 6.75L9 3.23656L2.97695 6.75Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

GraduationCapIcon.displayName = "GraduationCapIcon";

export default GraduationCapIcon;
