import type { IconProps } from "@/types/iconProps";

interface ToggleIconProps extends IconProps {
  isSelected: boolean;
}

const ToggleIcon = ({
  width = 24,
  height = 24,
  strokeColor = "white",
  strokeWidth = 2,
  className,
  onClick,
  isSelected,
}: ToggleIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      {isSelected ? (
        <g>
          <circle cx="12" cy="12" r="10" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
          <circle cx="12" cy="12" r="6" fill={strokeColor} />
        </g>
      ) : (
        <circle cx="12" cy="12" r="10" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
      )}
    </svg>
  );
};

export default ToggleIcon;
