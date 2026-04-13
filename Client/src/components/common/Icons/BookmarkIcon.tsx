import React from "react";

export interface BookmarkIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  filled?: boolean;
}

const BookmarkIcon = React.memo<BookmarkIconProps>(
  ({
    width = 24,
    height = 24,
    fill = "#767e92",
    className,
    filled = false,
    ...props
  }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={filled ? fill : "none"}
        className={className}
        {...props}
      >
        <path
          d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
          stroke={filled ? fill : fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

BookmarkIcon.displayName = "BookmarkIcon";

export default BookmarkIcon;
