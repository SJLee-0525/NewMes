import { useRef } from "react";

import CloseIcon from "@assets/icons/CloseIcon";

const DEBOUNCE_DELAY = 300; // ms

const RightPanelInput = ({ onUpdate }: { onUpdate: (query: string) => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 디바운스 처리된 입력 핸들러
  // Enter 키를 누르거나 일정 시간 동안 입력이 없으면 onUpdate 호출
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onUpdate((e.target as HTMLInputElement).value);
    else {
      if ((RightPanelInput as any).debounceTimeout) {
        clearTimeout((RightPanelInput as any).debounceTimeout);
      }
      (RightPanelInput as any).debounceTimeout = setTimeout(() => {
        onUpdate((e.target as HTMLInputElement).value);
      }, DEBOUNCE_DELAY);
    }
  }

  function handleClearInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
      onUpdate("");
    }
  }

  return (
    <section className="flex justify-between items-center w-full h-fit pe-3 gap-1 bg-search rounded-xl">
      <input
        type="text"
        className="w-full h-10 ps-10 font-pre-regular text-light text-lg rounded-xl placeholder:text-light placeholder:font-pre-regular placeholder:text-lg focus:outline-none bg-search "
        placeholder="Search"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />

      <figure
        className="flex justify-center items-center p-1 rounded-full bg-[#fff] cursor-pointer"
        onClick={handleClearInput}
      >
        <CloseIcon width={12} height={12} strokeColor="#000" />
      </figure>
    </section>
  );
};

export default RightPanelInput;
