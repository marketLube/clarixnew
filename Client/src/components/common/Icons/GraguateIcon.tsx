import React from "react";

export interface GraguateIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const GraguateIcon = React.memo<GraguateIconProps>(
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
          d="M3.33333 9.44572L0 7.5013L10 1.66797L20 7.5013V14.5846H18.3333V8.47355L16.6667 9.44572V15.0107L16.4812 15.24C14.9547 17.1262 12.6182 18.3346 10 18.3346C7.38181 18.3346 5.04524 17.1262 3.51886 15.24L3.33333 15.0107V9.44572ZM5 10.418V14.411C6.22267 15.7963 8.00927 16.668 10 16.668C11.9907 16.668 13.7773 15.7963 15 14.411V10.418L10 13.3346L5 10.418ZM3.30772 7.5013L10 11.4051L16.6922 7.5013L10 3.59748L3.30772 7.5013Z"
          fill={fill}
        />
      </svg>
    );
  }
);

GraguateIcon.displayName = "GraguateIcon";

export default GraguateIcon;
