import CloseIcon from "@assets/icons/CloseIcon";

const RightPanelInput = ({ onUpdate }: { onUpdate: (query: string) => void }) => {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onUpdate((e.target as HTMLInputElement).value);
    else {
      if ((RightPanelInput as any).debounceTimeout) {
        clearTimeout((RightPanelInput as any).debounceTimeout);
      }
      (RightPanelInput as any).debounceTimeout = setTimeout(() => {
        onUpdate((e.target as HTMLInputElement).value);
      }, 300);
    }
  }

  return (
    <section className="flex justify-between items-center w-full h-fit pe-3 gap-1 bg-search rounded-xl">
      <input
        type="text"
        className="w-full h-10 ps-10 font-pre-regular text-light text-lg rounded-xl placeholder:text-light placeholder:font-pre-regular placeholder:text-lg focus:outline-none bg-search "
        placeholder="Search"
        onKeyDown={handleKeyDown}
      />

      <figure className="flex justify-center items-center p-1 rounded-full bg-white">
        <CloseIcon width={12} height={12} strokeColor="#000000" strokeWidth={2.5} />
      </figure>
    </section>
  );
};

export default RightPanelInput;
