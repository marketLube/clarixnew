import React from "react";

export interface CareerPathsIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const CareerPathsIcon = React.memo<CareerPathsIconProps>(
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
                    d="M5.83073 4.16927V1.66927C5.83073 1.20904 6.20383 0.835938 6.66406 0.835938H13.3307C13.791 0.835938 14.1641 1.20904 14.1641 1.66927V4.16927H17.4974C17.9576 4.16927 18.3307 4.54237 18.3307 5.0026V16.6693C18.3307 17.1295 17.9576 17.5026 17.4974 17.5026H2.4974C2.03716 17.5026 1.66406 17.1295 1.66406 16.6693V5.0026C1.66406 4.54237 2.03716 4.16927 2.4974 4.16927H5.83073ZM3.33073 13.3359V15.8359H16.6641V13.3359H3.33073ZM3.33073 11.6693H16.6641V5.83594H3.33073V11.6693ZM7.4974 2.5026V4.16927H12.4974V2.5026H7.4974ZM9.16406 9.16927H10.8307V10.8359H9.16406V9.16927Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

CareerPathsIcon.displayName = "CareerPathsIcon";

export default CareerPathsIcon;
