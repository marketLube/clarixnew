import React from "react";

export interface CheckmarkIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const CheckmarkIcon = React.memo<CheckmarkIconProps>(
  ({ width = 20, height = 20, fill = "#513392", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M16.6667 5L7.50004 14.1667L3.33337 10"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

CheckmarkIcon.displayName = "CheckmarkIcon";

export default CheckmarkIcon;
