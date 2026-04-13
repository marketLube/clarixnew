import React from "react";

export interface HeadphoneIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const HeadphoneIcon = React.memo<HeadphoneIconProps>(
  ({ width = 16, height = 16, fill = "#006bff", className, ...props }) => {
    return (
<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill={fill} className={className} {...props}>
  <path d="M14.6654 11.3355C14.6647 13.2494 13.3198 14.8491 11.5235 15.2417L11.0982 13.9657C11.9008 13.8347 12.583 13.3454 12.9753 12.6673H11.332C10.5956 12.6673 9.9987 12.0704 9.9987 11.334V8.66732C9.9987 7.93092 10.5956 7.33398 11.332 7.33398H13.2908C12.9627 4.70311 10.7184 2.66732 7.9987 2.66732C5.27895 2.66732 3.03469 4.70311 2.70662 7.33398H4.66536C5.40174 7.33398 5.9987 7.93092 5.9987 8.66732V11.334C5.9987 12.0704 5.40174 12.6673 4.66536 12.6673H2.66536C1.92898 12.6673 1.33203 12.0704 1.33203 11.334V8.00065C1.33203 4.31875 4.3168 1.33398 7.9987 1.33398C11.6806 1.33398 14.6654 4.31875 14.6654 8.00065V8.66645V8.66732V11.334V11.3355ZM13.332 11.334V8.66732H11.332V11.334H13.332ZM2.66536 8.66732V11.334H4.66536V8.66732H2.66536Z" fill="#006BFF"/>
</svg>
    );
  }
);

HeadphoneIcon.displayName = "HeadphoneIcon";

export default HeadphoneIcon;

