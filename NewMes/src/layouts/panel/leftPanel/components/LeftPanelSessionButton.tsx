import { useState, type MouseEvent } from "react";

import type { PreviewProps } from "@/types/componentsProps";

import Preview from "@components/preview/Preview";

const LeftPanelSessionButton = ({
  label,
  subLabel,
  previewLabel,
  selected,
  onClick,
}: {
  label: string;
  subLabel?: string;
  previewLabel?: string;
  selected: boolean;
  onClick: () => void;
}) => {
  const [preview, setPreview] = useState<PreviewProps | null>(null);

  function handleMouseEnter(e: MouseEvent) {
    if (!previewLabel) return;

    setPreview({
      url: previewLabel,
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handleMouseMove(e: MouseEvent) {
    setPreview((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null));
  }

  function handleMouseLeave() {
    setPreview(null);
  }

  return (
    <>
      <button
        className={`flex justify-start items-center w-full px-3 py-1 gap-2 rounded-full transition-colors duration-300 cursor-pointer ${
          selected ? "bg-listActive" : "hover:bg-search"
        }`}
        onClick={onClick}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="font-medium text-summary truncate max-w-full overflow-hidden whitespace-nowrap">{label}</span>

        {subLabel && (
          <span className="font-normal text-subSummary truncate max-w-full overflow-hidden whitespace-nowrap">
            {subLabel}
          </span>
        )}
      </button>

      {preview && <Preview type="text" preview={preview} />}
    </>
  );
};

export default LeftPanelSessionButton;
