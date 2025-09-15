const TopNavButton = ({ label, onClick }: { label: string; onClick: (label: string) => void }) => {
  return (
    <button
      className="flex justify-center items-center w-fit h-12 px-2 bg-color-dark rounded-lg hover:bg-color-inactive active:scale-95 transition"
      onClick={() => onClick(label)}
    >
      <span className="text-topbar font-pre-medium">{label}</span>
    </button>
  );
};

export default TopNavButton;
