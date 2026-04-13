import React from "react";

export interface TrophyIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const TrophyIcon = React.memo<TrophyIconProps>(
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
          d="M9.75368 12.7056V14.2519H13.5037V15.7519H4.50366V14.2519H8.25368V12.7056C5.29393 12.3365 3.00366 9.81169 3.00366 6.75195V2.25195H15.0037V6.75195C15.0037 9.81169 12.7134 12.3365 9.75368 12.7056ZM4.50366 3.75195V6.75195C4.50366 9.23727 6.51838 11.2519 9.00368 11.2519C11.489 11.2519 13.5037 9.23727 13.5037 6.75195V3.75195H4.50366ZM0.753662 3.75195H2.25366V6.75195H0.753662V3.75195ZM15.7537 3.75195H17.2537V6.75195H15.7537V3.75195Z"
          fill={fill}
        />
      </svg>
    );
  }
);

TrophyIcon.displayName = "TrophyIcon";

export default TrophyIcon;
