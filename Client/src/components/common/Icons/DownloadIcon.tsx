import React from "react";

export interface DownloadIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const DownloadIcon = React.memo<DownloadIconProps>(
    ({ width = 20, height = 20, fill = "#513392", className, ...props }) => {
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
                    d="M10.8346 8.33333H15.0013L10.0013 13.3333L5.0013 8.33333H9.16797V2.5H10.8346V8.33333ZM3.33464 15.8333H16.668V10H18.3346V16.6667C18.3346 17.1269 17.9615 17.5 17.5013 17.5H2.5013C2.04107 17.5 1.66797 17.1269 1.66797 16.6667V10H3.33464V15.8333Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

DownloadIcon.displayName = "DownloadIcon";

export default DownloadIcon;
