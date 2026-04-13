import React from "react";

export interface BellIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const BellIcon = React.memo<BellIconProps>(
  ({ width = 20, height = 22, fill = "white", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 22"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M20 18H0V16H1V9.0314C1 4.04348 5.02944 0 10 0C14.9706 0 19 4.04348 19 9.0314V16H20V18ZM3 16H17V9.0314C17 5.14806 13.866 2 10 2C6.13401 2 3 5.14806 3 9.0314V16ZM7.5 19H12.5C12.5 20.3807 11.3807 21.5 10 21.5C8.6193 21.5 7.5 20.3807 7.5 19Z"
          fill={fill}
        />
      </svg>
    );
  }
);

BellIcon.displayName = "BellIcon";

export default BellIcon;
