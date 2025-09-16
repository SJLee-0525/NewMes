const LeftPanelSessionButton = ({
  label,
  subLabel,
  selected,
  onClick,
}: {
  label: string;
  subLabel?: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`flex justify-start items-center w-full px-3 py-1 gap-2 rounded-full transition-colors duration-300 ${
        selected ? "bg-listActive" : ""
      }`}
      onClick={onClick}
    >
      <span className="font-medium text-summary truncate max-w-full overflow-hidden whitespace-nowrap">{label}</span>

      {subLabel && (
        <span className="font-normal text-subSummary truncate max-w-full overflow-hidden whitespace-nowrap">
          {subLabel}
        </span>
      )}
    </button>
  );
};

export default LeftPanelSessionButton;
