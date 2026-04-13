import React from "react";

export interface ShareIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: number;
    height?: number;
}

const ShareIcon: React.FC<ShareIconProps> = ({
    fill = "currentColor",
    width = 24,
    height = 24,
    ...props
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 8.84066C7.46596 8.31018 6.66958 8 5.8 8C4.14315 8 2.8 9.34315 2.8 11C2.8 12.6569 4.14315 14 5.8 14C6.66958 14 7.46596 13.6898 8.08261 13.1593L15.0227 16.6294C15.0077 16.7508 15 16.8745 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14C17.1304 14 16.334 14.3102 15.7174 14.8407L8.77728 11.3706C8.79227 11.2492 8.8 11.1255 8.8 11C8.8 10.8745 8.79227 10.7508 8.77728 10.6294L15.7174 7.15934C16.334 7.68982 17.1304 8 18 8Z"
                fill={fill === "currentColor" ? "currentColor" : fill}
            />
        </svg>
    );
};

export default ShareIcon;
