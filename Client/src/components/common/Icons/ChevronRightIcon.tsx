import React from "react";

export interface ChevronRightIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const ChevronRightIcon = React.memo<ChevronRightIconProps>(
  ({ width = 24, height = 24, fill = "white", className, ...props }) => {
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
          d="M12.9498 12.364L8 7.41421L9.41422 6L15.7782 12.364L9.41422 18.7279L8 17.3137L12.9498 12.364Z"
          fill={fill}
        />
      </svg>
    );
  }
);

ChevronRightIcon.displayName = "ChevronRightIcon";

export default ChevronRightIcon;
