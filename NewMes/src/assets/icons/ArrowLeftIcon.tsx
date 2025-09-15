import type { IconProps } from "@/types/iconProps";

const ArrowLeftIcon = ({ width = 22, height = 22, strokeColor, onClick }: IconProps) => {
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
        d="M14.1258 15.2075L9.92742 11L14.1258 6.7925L12.8333 5.5L7.33325 11L12.8333 16.5L14.1258 15.2075Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
