import React from "react";

export interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const CloseIcon = React.memo<CloseIconProps>(
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
          d="M18 6L6 18M6 6L18 18"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

CloseIcon.displayName = "CloseIcon";

export default CloseIcon;
