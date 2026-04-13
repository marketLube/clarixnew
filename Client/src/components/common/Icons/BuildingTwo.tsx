import React from "react";

export interface BuildingTwoIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const BuildingTwoIcon = React.memo<BuildingTwoIconProps>(
  ({ width = 11, height = 11, fill = "#767E92", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 11 11"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M9.62565 8.70833H10.5423V9.625H0.458984V8.70833H1.37565V1.83333C1.37565 1.5802 1.58086 1.375 1.83398 1.375H6.41732C6.67045 1.375 6.87565 1.5802 6.87565 1.83333V8.70833H8.70898V5.04167H7.79232V4.125H9.16732C9.42045 4.125 9.62565 4.3302 9.62565 4.58333V8.70833ZM2.29232 2.29167V8.70833H5.95898V2.29167H2.29232ZM3.20898 5.04167H5.04232V5.95833H3.20898V5.04167ZM3.20898 3.20833H5.04232V4.125H3.20898V3.20833Z"
          fill={fill}
        />
      </svg>
    );
  }
);

BuildingTwoIcon.displayName = "BuildingTwoIcon";

export default BuildingTwoIcon;
