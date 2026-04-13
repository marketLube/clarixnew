import React from "react";

export interface DocIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const DocIcon = React.memo<DocIconProps>(
  ({ width = 18, height = 18, fill = "#767E92", className, ...props }) => {
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
          d="M15.75 6V15.7449C15.75 16.1626 15.4164 16.5 15.0049 16.5H2.99505C2.58371 16.5 2.25 16.167 2.25 15.7561V2.24385C2.25 1.84148 2.58653 1.5 3.00166 1.5H11.2476L15.75 6ZM14.25 6.75H10.5V3H3.75V15H14.25V6.75ZM6 5.25H8.25V6.75H6V5.25ZM6 8.25H12V9.75H6V8.25ZM6 11.25H12V12.75H6V11.25Z"
          fill={fill}
        />
      </svg>
    );
  }
);

DocIcon.displayName = "DocIcon";

export default DocIcon;
