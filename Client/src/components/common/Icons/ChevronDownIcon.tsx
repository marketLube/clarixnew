import React from "react";

export interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const ChevronDownIcon = React.memo<ChevronDownIconProps>(
  ({ width = 18, height = 18, fill = "white", className, ...props }) => {
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
        <path
          d="M8.99949 9.87831L12.7118 6.16602L13.7725 7.22667L8.99949 11.9997L4.22656 7.22667L5.28722 6.16602L8.99949 9.87831Z"
          fill={fill}
        />
      </svg>
    );
  }
);

ChevronDownIcon.displayName = "ChevronDownIcon";

export default ChevronDownIcon;
