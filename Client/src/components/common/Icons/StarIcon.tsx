import React, { useId } from "react";

export interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const StarIcon = React.memo<StarIconProps>(
  ({ width = 20, height = 19, className, ...props }) => {
    const gradientId = useId();

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <g clipPath="url(#clip0_541_6623)">
          <path d="M5.97111 9.08609L2.46182 11.0504L3.24559 7.10588L0.292969 4.3754L4.28664 3.90188L5.97111 0.25L7.65553 3.90188L11.6492 4.3754L8.69661 7.10588L9.48037 11.0504L5.97111 9.08609Z" fill="url(#paint0_linear_541_6623)" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_541_6623" x1="4.1798" y1="4.18056" x2="9.25458" y2="11.0464" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD966" />
            <stop offset="1" stopColor="#FFC106" />
          </linearGradient>
          <clipPath id="clip0_541_6623">
            <rect width="11.9407" height="11.9407" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

StarIcon.displayName = "StarIcon";

export default StarIcon;
