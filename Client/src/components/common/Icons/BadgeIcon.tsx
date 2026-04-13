import React from "react";

export interface BadgeIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const BadgeIcon = React.memo<BadgeIconProps>(
  ({ width = 14, height = 19, fill = "#767E92", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 14 19"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M10.8333 11.8712V17.5974C10.8333 17.8275 10.6467 18.0142 10.4167 18.0142C10.3412 18.0142 10.2671 17.9936 10.2023 17.9548L6.66667 15.8333L3.13104 17.9548C2.93372 18.0731 2.67777 18.0091 2.55937 17.8118C2.52052 17.747 2.5 17.6729 2.5 17.5974V11.8712C0.975892 10.6494 0 8.772 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.772 12.3574 10.6494 10.8333 11.8712ZM4.16667 12.8488V15.3897L6.66667 13.8897L9.16667 15.3897V12.8488C8.39467 13.1613 7.55075 13.3333 6.66667 13.3333C5.78258 13.3333 4.93869 13.1613 4.16667 12.8488ZM6.66667 11.6667C9.42808 11.6667 11.6667 9.42808 11.6667 6.66667C11.6667 3.90524 9.42808 1.66667 6.66667 1.66667C3.90524 1.66667 1.66667 3.90524 1.66667 6.66667C1.66667 9.42808 3.90524 11.6667 6.66667 11.6667Z"
          fill={fill}
        />
      </svg>
    );
  }
);

BadgeIcon.displayName = "BadgeIcon";

export default BadgeIcon;
