import React from "react";

export interface LoveIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const LoveIcon = React.memo<LoveIconProps>(
  ({ width = 14, height = 14, fill = "white", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 14 14"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M6.70566 2.52991C8.01826 1.35168 10.0467 1.3908 11.311 2.65778C12.5754 3.92476 12.6188 5.94327 11.4429 7.25978L6.70504 12.005L1.96732 7.25978C0.791439 5.94327 0.835394 3.92157 2.09918 2.65778C3.3644 1.39256 5.38925 1.34993 6.70566 2.52991ZM10.52 3.44721C9.68228 2.60781 8.32984 2.57376 7.4522 3.36158L6.70616 4.03122L5.95973 3.36211C5.07956 2.57318 3.72957 2.60789 2.88943 3.44803C2.05698 4.28048 2.01519 5.61375 2.78235 6.49435L6.70504 10.4233L10.6279 6.49435C11.3953 5.61342 11.3537 4.28268 10.52 3.44721Z"
          fill={fill}
        />
      </svg>
    );
  }
);

LoveIcon.displayName = "LoveIcon";

export default LoveIcon;
