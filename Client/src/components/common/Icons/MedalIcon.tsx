import React from "react";

export interface MedalIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const MedalIcon = React.memo<MedalIconProps>(
  ({ width = 20, height = 20, fill = "white", className, ...props }) => {
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
          d="M9.9987 5.83352C13.6806 5.83352 16.6654 8.81827 16.6654 12.5002C16.6654 16.1821 13.6806 19.1669 9.9987 19.1669C6.3168 19.1669 3.33203 16.1821 3.33203 12.5002C3.33203 8.81827 6.3168 5.83352 9.9987 5.83352ZM9.9987 7.50018C7.23727 7.50018 4.9987 9.73877 4.9987 12.5002C4.9987 15.2616 7.23727 17.5002 9.9987 17.5002C12.7601 17.5002 14.9987 15.2616 14.9987 12.5002C14.9987 9.73877 12.7601 7.50018 9.9987 7.50018ZM9.9987 8.75019L11.1008 10.9833L13.5652 11.3414L11.7819 13.0796L12.2029 15.534L9.9987 14.3752L7.79451 15.534L8.21546 13.0796L6.43224 11.3414L8.89661 10.9833L9.9987 8.75019ZM14.9987 1.66685V4.16685L13.8625 5.11482C12.9408 4.63161 11.9174 4.31589 10.8329 4.20809L10.832 1.66602L14.9987 1.66685ZM9.16536 1.66602L9.16511 4.20802C8.0807 4.31572 7.05741 4.63132 6.13571 5.11438L4.9987 4.16685V1.66685L9.16536 1.66602Z"
          fill={fill}
        />
      </svg>
    );
  }
);

MedalIcon.displayName = "MedalIcon";

export default MedalIcon;
