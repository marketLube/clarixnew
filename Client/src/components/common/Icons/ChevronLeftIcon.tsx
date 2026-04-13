import React from "react";

export interface ChevronLeftIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const ChevronLeftIcon = React.memo<ChevronLeftIconProps>(
  ({ width = 24, height = 24, fill = "#162447", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M11.0502 12.364L16 7.41421L14.5858 6L8.22182 12.364L14.5858 18.7279L16 17.3137L11.0502 12.364Z"
          fill={fill}
        />
      </svg>
    );
  }
);

ChevronLeftIcon.displayName = "ChevronLeftIcon";

export default ChevronLeftIcon;
