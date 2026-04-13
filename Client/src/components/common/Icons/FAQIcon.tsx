import React from "react";

export interface FAQIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const FAQIcon = React.memo<FAQIconProps>(
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
                    d="M9.99739 18.3307C5.39502 18.3307 1.66406 14.5997 1.66406 9.99739C1.66406 5.39502 5.39502 1.66406 9.99739 1.66406C14.5997 1.66406 18.3307 5.39502 18.3307 9.99739C18.3307 14.5997 14.5997 18.3307 9.99739 18.3307ZM9.99739 16.6641C13.6793 16.6641 16.6641 13.6793 16.6641 9.99739C16.6641 6.3155 13.6793 3.33073 9.99739 3.33073C6.3155 3.33073 3.33073 6.3155 3.33073 9.99739C3.33073 13.6793 6.3155 16.6641 9.99739 16.6641ZM9.16406 12.4974H10.8307V14.1641H9.16406V12.4974ZM10.8307 11.1266V11.6641H9.16406V10.4141C9.16406 9.95381 9.53714 9.58073 9.99739 9.58073C10.6877 9.58073 11.2474 9.02106 11.2474 8.33073C11.2474 7.64037 10.6877 7.08073 9.99739 7.08073C9.39098 7.08073 8.88539 7.51259 8.77139 8.08554L7.13682 7.75861C7.4027 6.42172 8.58239 5.41406 9.99739 5.41406C11.6082 5.41406 12.9141 6.71989 12.9141 8.33073C12.9141 9.65198 12.0355 10.7681 10.8307 11.1266Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

FAQIcon.displayName = "FAQIcon";

export default FAQIcon;
