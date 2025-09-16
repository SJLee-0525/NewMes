import type { IconProps } from "@/types/iconProps";

// 아이콘 변경 필요
const DownLoadIcon = ({ width = 28, height = 28, strokeColor, onClick }: IconProps) => {
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
        d="M14 7.66667C13.5391 7.66667 13.1667 8.03906 13.1667 8.5V17.5L10.425 14.7583C10.1417 14.475 9.65833 14.475 9.375 14.7583C9.09167 15.0417 9.09167 15.525 9.375 15.8083L13.2917 19.725C13.4583 19.8917 13.6875 19.975 13.9167 19.975C14.1458 19.975 14.375 19.8917 14.5417 19.725L18.4583 15.8083C18.7417 15.525 18.7417 15.0417 18.4583 14.7583C18.175 14.475 17.6917 14.475 17.4083 14.7583L14.6667 17.5V8.5C14.6667 8.03906 14.2933 7.66667 14 7.66667ZM7 4H21C21.4609 4 21.8333 4.3724 21.8333 4.83333C21.8333 5.29422 21.4609 5.66667 21 5.66667H7C6.53906 5.66667 6.16667 5.29422 6.16667 4.83333C6.16667 4.3724 6.53906 4 7 4Z"
        fill={strokeColor}
        stroke={strokeColor}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownLoadIcon;
