import React from "react";

export interface ShieldIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

const ShieldIcon = React.memo<ShieldIconProps>(
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
          d="M4.16667 3.83565V11.4894C4.16667 12.6039 4.72367 13.6447 5.651 14.2629L10 17.1623L14.349 14.2629C15.2763 13.6447 15.8333 12.6039 15.8333 11.4894V3.83565L10 2.53936L4.16667 3.83565ZM3.15256 2.35368L10 0.832031L16.8474 2.35368C17.2287 2.43841 17.5 2.77659 17.5 3.16717V11.4894C17.5 13.1612 16.6645 14.7224 15.2735 15.6497L10 19.1654L4.7265 15.6497C3.33551 14.7224 2.5 13.1612 2.5 11.4894V3.16717C2.5 2.77659 2.77128 2.43841 3.15256 2.35368ZM10 11.2487L7.55089 12.5363L8.01863 9.80912L6.03727 7.8778L8.77542 7.47991L10 4.9987L11.2246 7.47991L13.9628 7.8778L11.9813 9.80912L12.4491 12.5363L10 11.2487Z"
          fill={fill}
        />
      </svg>
    );
  }
);

ShieldIcon.displayName = "ShieldIcon";

export default ShieldIcon;
