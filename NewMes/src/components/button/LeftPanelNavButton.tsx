const LeftPanelNavButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: (label: string) => void;
}) => {
  return (
    <button
      className={`flex justify-center items-center w-1/2 min-w-20 h-12 px-2 bg-color-dark rounded-xl hover:bg-toggleInactive transition-all duration-300 ${
        selected ? "bg-active text-black" : "bg-inactive text-coolWhite"
      }`}
      onClick={() => onClick(label)}
    >
      <span className="font-pre-bold text-xl">{label}</span>
    </button>
  );
};

export default LeftPanelNavButton;
