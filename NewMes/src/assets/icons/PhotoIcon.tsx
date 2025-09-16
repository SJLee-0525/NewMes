import type { IconProps } from "@/types/iconProps";

const PhotoIcon = ({ width, height, strokeColor }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 24" fill="none">
      <path
        d="M20.75 18.4167V5.58333C20.75 4.575 19.925 3.75 18.9167 3.75H6.08333C5.075 3.75 4.25 4.575 4.25 5.58333V18.4167C4.25 19.425 5.075 20.25 6.08333 20.25H18.9167C19.925 20.25 20.75 19.425 20.75 18.4167ZM9.29167 13.375L11.5833 16.1342L14.7917 12L18.9167 17.5H6.08333L9.29167 13.375Z"
        fill={strokeColor}
      />
    </svg>
  );
};

export default PhotoIcon;
