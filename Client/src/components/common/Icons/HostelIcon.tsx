import React from "react";

export interface HostelIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const HostelIcon = React.memo<HostelIconProps>(
  ({ width = 11, height = 11, fill = "#162447", className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 11 11"
        fill="none"
        className={className}
        {...props}
      >
        <g clipPath="url(#clip0_982_13762)">
          <path
            d="M8.80138 2.93275H1.30427V1.95487C1.30427 1.86842 1.26992 1.78551 1.20879 1.72438C1.14767 1.66325 1.06476 1.62891 0.978305 1.62891C0.891855 1.62891 0.808945 1.66325 0.747816 1.72438C0.686686 1.78551 0.652344 1.86842 0.652344 1.95487V8.4741C0.652344 8.56055 0.686686 8.64346 0.747816 8.70459C0.808945 8.76572 0.891855 8.80006 0.978305 8.80006C1.06476 8.80006 1.14767 8.76572 1.20879 8.70459C1.26992 8.64346 1.30427 8.56055 1.30427 8.4741V7.17025H9.77927V8.4741C9.77927 8.56055 9.81361 8.64346 9.87474 8.70459C9.93587 8.76572 10.0188 8.80006 10.1052 8.80006C10.1917 8.80006 10.2746 8.76572 10.3357 8.70459C10.3968 8.64346 10.4312 8.56055 10.4312 8.4741V4.56256C10.4312 4.13031 10.2595 3.71576 9.95383 3.41011C9.64818 3.10446 9.23363 2.93275 8.80138 2.93275ZM1.30427 3.58468H4.23792V6.51833H1.30427V3.58468ZM4.88984 6.51833V3.58468H8.80138C9.06073 3.58468 9.30946 3.6877 9.49285 3.87109C9.67624 4.05448 9.77927 4.30321 9.77927 4.56256V6.51833H4.88984Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id="clip0_982_13762">
            <rect width="10.4308" height="10.4308" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

HostelIcon.displayName = "HostelIcon";

export default HostelIcon;
