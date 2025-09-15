import type { IconProps } from "@/types/iconProps";

const ArrowRightIcon = ({ width = 22, height = 22, strokeColor, onClick }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M7.87427 15.2075L12.0726 11L7.87427 6.7925L9.16677 5.5L14.6668 11L9.16677 16.5L7.87427 15.2075Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default ArrowRightIcon;
