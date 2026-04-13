import React from "react";

export interface LogoutIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const LogoutIcon = React.memo<LogoutIconProps>(
  ({ width = 16, height = 16, fill = "#f63f3f", className, ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill={fill} className={className} {...props}>
        <path d="M7.9987 14.6673C4.3168 14.6673 1.33203 11.6825 1.33203 8.00065C1.33203 4.31875 4.3168 1.33398 7.9987 1.33398C10.1796 1.33398 12.1158 2.38117 13.3322 4.00014L11.526 4.00019C10.5858 3.17064 9.35103 2.66732 7.9987 2.66732C5.05318 2.66732 2.66536 5.05513 2.66536 8.00065C2.66536 10.9462 5.05318 13.334 7.9987 13.334C9.35137 13.334 10.5864 12.8304 11.5266 12.0005H13.3326C12.1164 13.6199 10.1798 14.6673 7.9987 14.6673ZM12.6654 10.6673V8.66732H7.33203V7.33398H12.6654V5.33398L15.9987 8.00065L12.6654 10.6673Z" fill="#F63F3F"/>
      </svg>
    );
  }
);

LogoutIcon.displayName = "LogoutIcon";

export default LogoutIcon;

