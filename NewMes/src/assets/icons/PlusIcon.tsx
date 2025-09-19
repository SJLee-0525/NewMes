import type { IconProps } from "@/types/iconProps";

import useAuthStore from "@stores/authStore";

const PlusIcon = ({ width = 24, height = 24, strokeColor = "", strokeWidth = 2, className, onClick }: IconProps) => {
  const { currentTheme } = useAuthStore();

  if (!strokeColor) {
    strokeColor = currentTheme === "dark" ? "#ffffff" : "#000000";
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M12 5V19" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default PlusIcon;
