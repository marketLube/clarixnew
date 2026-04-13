import React from "react";

export interface DescriptionIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const DescriptionIcon = React.memo<DescriptionIconProps>(
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
                    d="M15.8307 18.3307H4.16406C2.78335 18.3307 1.66406 17.2115 1.66406 15.8307V2.4974C1.66406 2.03716 2.03716 1.66406 2.4974 1.66406H14.1641C14.6243 1.66406 14.9974 2.03716 14.9974 2.4974V12.4974H18.3307V15.8307C18.3307 17.2115 17.2115 18.3307 15.8307 18.3307ZM14.9974 14.1641V15.8307C14.9974 16.291 15.3705 16.6641 15.8307 16.6641C16.291 16.6641 16.6641 16.291 16.6641 15.8307V14.1641H14.9974ZM13.3307 16.6641V3.33073H3.33073V15.8307C3.33073 16.291 3.70383 16.6641 4.16406 16.6641H13.3307ZM4.9974 5.83073H11.6641V7.4974H4.9974V5.83073ZM4.9974 9.16406H11.6641V10.8307H4.9974V9.16406ZM4.9974 12.4974H9.16406V14.1641H4.9974V12.4974Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

DescriptionIcon.displayName = "DescriptionIcon";

export default DescriptionIcon;
