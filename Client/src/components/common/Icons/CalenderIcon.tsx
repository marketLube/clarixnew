import React from "react";

export interface CalenderIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const CalenderIcon = React.memo<CalenderIconProps>(
  ({ width = 20, height = 20, fill = "#767E92", className, ...props }) => {
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
          d="M7.5013 0.832031V2.4987H12.5013V0.832031H14.168V2.4987H17.5013C17.9616 2.4987 18.3346 2.8718 18.3346 3.33203V16.6654C18.3346 17.1256 17.9616 17.4987 17.5013 17.4987H2.5013C2.04107 17.4987 1.66797 17.1256 1.66797 16.6654V3.33203C1.66797 2.8718 2.04107 2.4987 2.5013 2.4987H5.83464V0.832031H7.5013ZM16.668 9.16536H3.33464V15.832H16.668V9.16536ZM6.66797 10.832V12.4987H5.0013V10.832H6.66797ZM10.8346 10.832V12.4987H9.16797V10.832H10.8346ZM15.0013 10.832V12.4987H13.3346V10.832H15.0013ZM5.83464 4.16536H3.33464V7.4987H16.668V4.16536H14.168V5.83203H12.5013V4.16536H7.5013V5.83203H5.83464V4.16536Z"
          fill={fill}
        />
      </svg>
    );
  }
);

CalenderIcon.displayName = "CalenderIcon";

export default CalenderIcon;
