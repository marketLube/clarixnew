import React from "react";

export interface SyllabusIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const SyllabusIcon = React.memo<SyllabusIconProps>(
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
                    d="M2.5 15.4141V4.16406C2.5 2.78335 3.61929 1.66406 5 1.66406H16.6667C17.1269 1.66406 17.5 2.03716 17.5 2.4974V17.4974C17.5 17.9576 17.1269 18.3307 16.6667 18.3307H5.41667C3.80583 18.3307 2.5 17.0249 2.5 15.4141ZM15.8333 16.6641V14.1641H5.41667C4.72631 14.1641 4.16667 14.7237 4.16667 15.4141C4.16667 16.1044 4.72631 16.6641 5.41667 16.6641H15.8333ZM4.16667 12.7781C4.54552 12.5981 4.96933 12.4974 5.41667 12.4974H15.8333V3.33073H5C4.53977 3.33073 4.16667 3.70383 4.16667 4.16406V12.7781Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

SyllabusIcon.displayName = "SyllabusIcon";

export default SyllabusIcon;
