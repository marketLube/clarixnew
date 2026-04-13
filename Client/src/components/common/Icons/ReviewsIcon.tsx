import React from "react";

export interface ReviewsIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const ReviewsIcon = React.memo<ReviewsIconProps>(
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
                <g clipPath="url(#clip0_reviews_icon)">
                    <path
                        d="M10.0028 15.2141L4.1249 18.5042L5.43768 11.8973L0.492188 7.3239L7.18139 6.53078L10.0028 0.414062L12.8241 6.53078L19.5133 7.3239L14.5679 11.8973L15.8806 18.5042L10.0028 15.2141ZM10.0028 13.3041L13.5417 15.285L12.7513 11.3071L15.7289 8.55356L11.7014 8.07601L10.0028 4.39325L8.30406 8.07601L4.27662 8.55356L7.2542 11.3071L6.4638 15.285L10.0028 13.3041Z"
                        fill={fill}
                    />
                </g>
                <defs>
                    <clipPath id="clip0_reviews_icon">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );
    }
);

ReviewsIcon.displayName = "ReviewsIcon";

export default ReviewsIcon;
