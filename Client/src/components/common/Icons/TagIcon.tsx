import React from "react";

export interface TagIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
}

const TagIcon = React.memo<TagIconProps>(
    ({ width = 20, height = 20, fill = "#FFC106", className, ...props }) => {
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
                    d="M9.1209 0L18.6401 1.35988L20 10.8791L11.1607 19.7183C10.7852 20.0939 10.1764 20.0939 9.80084 19.7183L0.281646 10.1992C-0.0938821 9.8236 -0.0938821 9.21482 0.281646 8.83922L9.1209 0ZM9.80084 2.03983L2.32148 9.51916L10.4808 17.6785L17.9602 10.1992L16.9403 3.05974L9.80084 2.03983ZM11.8407 8.15929C11.0897 7.40827 11.0897 6.19059 11.8407 5.43954C12.5917 4.6885 13.8094 4.6885 14.5605 5.43954C15.3115 6.19059 15.3115 7.40827 14.5605 8.15929C13.8094 8.91038 12.5917 8.91038 11.8407 8.15929Z"
                    fill={fill}
                />
            </svg>
        );
    }
);

TagIcon.displayName = "TagIcon";

export default TagIcon;
