import React from "react";

export interface OpenBookIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const OpenBookIcon = React.memo<OpenBookIconProps>(
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
          d="M9.75 15.75V17.25H8.25V15.75H2.25C1.83579 15.75 1.5 15.4142 1.5 15V3C1.5 2.58579 1.83579 2.25 2.25 2.25H6.75C7.64602 2.25 8.45032 2.64281 9 3.26563C9.54967 2.64281 10.354 2.25 11.25 2.25H15.75C16.1642 2.25 16.5 2.58579 16.5 3V15C16.5 15.4142 16.1642 15.75 15.75 15.75H9.75ZM15 14.25V3.75H11.25C10.4215 3.75 9.75 4.42157 9.75 5.25V14.25H15ZM8.25 14.25V5.25C8.25 4.42157 7.57845 3.75 6.75 3.75H3V14.25H8.25Z"
          fill={fill}
        />
      </svg>
    );
  }
);

OpenBookIcon.displayName = "OpenBookIcon";

export default OpenBookIcon;
