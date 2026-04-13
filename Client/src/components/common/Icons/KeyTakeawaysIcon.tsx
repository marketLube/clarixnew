import React from "react";

export interface KeyTakeawaysIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const KeyTakeawaysIcon = React.memo<KeyTakeawaysIconProps>(
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
                    d="M8.96475 9.85716L15.5055 3.31641L16.684 4.49491L15.5055 5.67342L17.5679 7.73582L16.3894 8.91433L14.327 6.85194L13.1485 8.03045L14.9163 9.79825L13.7378 10.9767L11.97 9.209L10.1433 11.0357C11.2151 12.6535 11.0383 14.8547 9.61292 16.28C7.98576 17.9072 5.34758 17.9072 3.72039 16.28C2.0932 14.6528 2.0932 12.0147 3.72039 10.3875C5.14578 8.96208 7.34694 8.78533 8.96475 9.85716ZM8.43442 15.1015C9.41075 14.1252 9.41075 12.5423 8.43442 11.566C7.45813 10.5897 5.87521 10.5897 4.8989 11.566C3.92259 12.5423 3.92259 14.1252 4.8989 15.1015C5.87521 16.0778 7.45813 16.0778 8.43442 15.1015Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

KeyTakeawaysIcon.displayName = "KeyTakeawaysIcon";

export default KeyTakeawaysIcon;
