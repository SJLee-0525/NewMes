import type { IconProps } from "@/types/iconProps";

const ArrowDownIcon = ({ width = 22, height = 22, strokeColor, onClick }: IconProps) => {
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
        d="M6.7925 7.87427L11 12.0726L15.2075 7.87427L16.5 9.16677L11 14.6668L5.5 9.16677L6.7925 7.87427Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default ArrowDownIcon;
