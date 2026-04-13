import React from "react";

export interface ClockIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const ClockIcon = React.memo<ClockIconProps>(
  ({ width = 12, height = 12, fill = "#767E92", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 12 12"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M6 11C3.23858 11 1 8.7614 1 6C1 3.23858 3.23858 1 6 1C8.7614 1 11 3.23858 11 6C11 8.7614 8.7614 11 6 11ZM6 10C8.20915 10 10 8.20915 10 6C10 3.79086 8.20915 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20915 3.79086 10 6 10ZM6.5 6H8.5V7H5.5V3.5H6.5V6Z"
          fill={fill}
        />
      </svg>
    );
  }
);

ClockIcon.displayName = "ClockIcon";

export default ClockIcon;
