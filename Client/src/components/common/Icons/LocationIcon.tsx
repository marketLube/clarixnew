import React, { useId } from "react";

export interface LocationIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const LocationIcon = React.memo<LocationIconProps>(
  ({ width = 12, height = 12, fill = "white", className, ...props }) => {
    const clipId = useId();

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 12 12"
        fill="none"
        className={className}
        {...props}
      >
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M5.96056 10.3796L8.4191 7.92105C9.77693 6.56326 9.77693 4.36178 8.4191 3.00396C7.06131 1.64614 4.85983 1.64614 3.50201 3.00396C2.14418 4.36178 2.14418 6.56326 3.50201 7.92105L5.96056 10.3796ZM5.96056 11.7845L2.79956 8.62354C1.05379 6.87773 1.05379 4.04729 2.79956 2.30152C4.54534 0.555744 7.37577 0.555744 9.12158 2.30152C10.8673 4.04729 10.8673 6.87773 9.12158 8.62354L5.96056 11.7845ZM5.96056 6.45592C6.50922 6.45592 6.95397 6.01118 6.95397 5.46252C6.95397 4.91387 6.50922 4.46911 5.96056 4.46911C5.41191 4.46911 4.96716 4.91387 4.96716 5.46252C4.96716 6.01118 5.41191 6.45592 5.96056 6.45592ZM5.96056 7.44933C4.86328 7.44933 3.97375 6.55979 3.97375 5.46252C3.97375 4.36523 4.86328 3.4757 5.96056 3.4757C7.05783 3.4757 7.94738 4.36523 7.94738 5.46252C7.94738 6.55979 7.05783 7.44933 5.96056 7.44933Z"
            fill={fill}
            fillOpacity="0.6"
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width="11.9209" height="11.9209" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

LocationIcon.displayName = "LocationIcon";

export default LocationIcon;
