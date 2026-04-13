import React from "react";

export interface HighlightsIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const HighlightsIcon = React.memo<HighlightsIconProps>(
    ({ width = 14, height = 18, fill = "#767E92", className, ...props }) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 14 18"
                fill="none"
                className={className}
                {...props}
            >
                <path
                    d="M4.97757 13.3333H5.83333V9.16667H7.5V13.3333H8.35575C8.46575 12.332 8.97675 11.5054 9.80633 10.6022C9.89975 10.5005 10.499 9.88033 10.5701 9.79175C11.2765 8.91092 11.6667 7.82083 11.6667 6.66667C11.6667 3.90524 9.42808 1.66667 6.66667 1.66667C3.90524 1.66667 1.66667 3.90524 1.66667 6.66667C1.66667 7.82025 2.05645 8.90975 2.76218 9.79033C2.83337 9.87917 3.43401 10.501 3.52628 10.6015C4.35638 11.5053 4.86752 12.332 4.97757 13.3333ZM5 15V15.8333H8.33333V15H5ZM1.46162 10.8327C0.547042 9.69142 0 8.24292 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.24375 12.7857 9.69292 11.8702 10.8345C11.3533 11.479 10 12.5 10 13.75V15.8333C10 16.7538 9.25383 17.5 8.33333 17.5H5C4.07952 17.5 3.33333 16.7538 3.33333 15.8333V13.75C3.33333 12.5 1.97882 11.478 1.46162 10.8327Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

HighlightsIcon.displayName = "HighlightsIcon";

export default HighlightsIcon;
