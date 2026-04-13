import React from "react";

export interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const PlusIcon = React.memo<PlusIconProps>(
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
          d="M10 4V16M4 10H16"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

PlusIcon.displayName = "PlusIcon";

export default PlusIcon;
