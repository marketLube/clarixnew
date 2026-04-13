import React from "react";

export interface BuildingOneIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const BuildingOneIcon = React.memo<BuildingOneIconProps>(
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
          d="M18.3346 17.5H1.66797V15.8333H2.5013V3.33333C2.5013 2.8731 2.8744 2.5 3.33464 2.5H15.0013C15.4615 2.5 15.8346 2.8731 15.8346 3.33333V7.5H17.5013V15.8333H18.3346V17.5ZM14.168 15.8333H15.8346V9.16667H10.8346V15.8333H12.5013V10.8333H14.168V15.8333ZM14.168 7.5V4.16667H4.16797V15.8333H9.16797V7.5H14.168ZM5.83463 9.16667H7.5013V10.8333H5.83463V9.16667ZM5.83463 12.5H7.5013V14.1667H5.83463V12.5ZM5.83463 5.83333H7.5013V7.5H5.83463V5.83333Z"
          fill={fill}
        />
      </svg>
    );
  }
);

BuildingOneIcon.displayName = "BuildingOneIcon";

export default BuildingOneIcon;
