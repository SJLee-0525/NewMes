const TopNavButton = ({ label, onClick }: { label: string; onClick: (label: string) => void }) => {
  return (
    <button
      className="flex justify-center items-center w-fit h-12 px-2 bg-transparent hover:bg-search active:scale-95 rounded-xl transition-all duration-300 cursor-pointer"
      onClick={() => onClick(label)}
    >
      <span className="text-topbar text-xl font-pre-medium">{label}</span>
    </button>
  );
};

export default TopNavButton;
