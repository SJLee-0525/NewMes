import type { IconProps } from "@/types/iconProps";

import useAuthStore from "@stores/authStore";

const FlagIcon = ({ width = 22, height = 22, strokeColor, className, onClick }: IconProps) => {
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
      className={className}
      onClick={onClick}
    >
      <path
        d="M5.5 13H17C17.3993 13 17.6375 12.5549 17.416 12.2226L14.6009 8L17.416 3.77735C17.6375 3.44507 17.3993 3 17 3H5C4.72386 3 4.5 3.22386 4.5 3.5V17.5C4.5 17.7761 4.72386 18 5 18C5.27614 18 5.5 17.7761 5.5 17.5V13ZM5.5 12V4H16.0657L13.584 7.72265C13.472 7.8906 13.472 8.1094 13.584 8.27735L16.0657 12H5.5Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default FlagIcon;
