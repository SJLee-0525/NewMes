const LeftPanelSessionButton = ({
  summary,
  selected,
  onClick,
}: {
  summary: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`flex items-center justify-between w-full px-3 py-1 rounded-full transition-colors duration-300 ${
        selected ? "bg-listActive" : ""
      }`}
      onClick={onClick}
    >
      <span className="font-medium text-summary truncate max-w-full overflow-hidden whitespace-nowrap">{summary}</span>
    </button>
  );
};

export default LeftPanelSessionButton;
