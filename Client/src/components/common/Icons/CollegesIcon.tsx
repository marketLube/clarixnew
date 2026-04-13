import React from "react";

export interface CollegesIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const CollegesIcon = React.memo<CollegesIconProps>(
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
                    d="M17.5026 15.8333H19.1693V17.5H0.835938V15.8333H2.5026V3.33333C2.5026 2.8731 2.8757 2.5 3.33594 2.5H11.6693C12.1295 2.5 12.5026 2.8731 12.5026 3.33333V15.8333H15.8359V9.16667H14.1693V7.5H16.6693C17.1295 7.5 17.5026 7.8731 17.5026 8.33333V15.8333ZM4.16927 4.16667V15.8333H10.8359V4.16667H4.16927ZM5.83594 9.16667H9.16927V10.8333H5.83594V9.16667ZM5.83594 5.83333H9.16927V7.5H5.83594V5.83333Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

CollegesIcon.displayName = "CollegesIcon";

export default CollegesIcon;
