import type { IconProps } from "@/types/iconProps";

import useAuthStore from "@stores/authStore";

// 아이콘 변경 필요
const DownLoadIcon = ({ width = 28, height = 28, strokeColor, className, onClick }: IconProps) => {
  const { currentTheme } = useAuthStore();

  if (!strokeColor) {
    strokeColor = currentTheme === "dark" ? "#ffffff" : "#000000";
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      onClick={onClick}
      className={className}
    >
      <path
        d="M3.66406 5C3.66406 3.89543 4.55949 3 5.66406 3H14.0427C14.5732 3 15.0819 3.21071 15.457 3.58579L17.0783 5.20711C17.4534 5.58218 17.6641 6.09089 17.6641 6.62132V15C17.6641 16.1046 16.7686 17 15.6641 17H5.66406C4.55949 17 3.66406 16.1046 3.66406 15V5ZM5.66406 4C5.11178 4 4.66406 4.44772 4.66406 5V15C4.66406 15.5523 5.11178 16 5.66406 16L5.66406 11.5C5.66406 10.6716 6.33564 10 7.16406 10H14.1641C14.9925 10 15.6641 10.6716 15.6641 11.5V16C16.2163 16 16.6641 15.5523 16.6641 15V6.62132C16.6641 6.3561 16.5587 6.10175 16.3712 5.91421L14.7498 4.29289C14.5623 4.10536 14.308 4 14.0427 4L13.6641 4V6.5C13.6641 7.32843 12.9925 8 12.1641 8L8.16406 8C7.33564 8 6.66406 7.32843 6.66406 6.5L6.66406 4H5.66406ZM7.66406 4L7.66406 6.5C7.66406 6.77614 7.88792 7 8.16406 7L12.1641 7C12.4402 7 12.6641 6.77614 12.6641 6.5V4L7.66406 4ZM14.6641 16V11.5C14.6641 11.2239 14.4402 11 14.1641 11H7.16406C6.88792 11 6.66406 11.2239 6.66406 11.5V16H14.6641Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default DownLoadIcon;
