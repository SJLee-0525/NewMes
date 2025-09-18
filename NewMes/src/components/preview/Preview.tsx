import type { PreviewProps } from "@/types/componentsProps";

const Preview = ({ type, preview }: { type: "image" | "text"; preview: PreviewProps | null }) => {
  if (!preview) return null;

  return (
    <div
      className={`fixed max-w-72 max-h-72 rounded-xl z-9999 ${type === "text" ? "bg-black/80 px-3 py-1" : ""} border border-icon pointer-events-none`}
      style={{
        left: preview.x + 6,
        top: preview.y + 2,
      }}
    >
      {type === "image" && <img src={preview.url} alt="preview" className="max-w-48 max-h-48 rounded-xl" />}
      {type === "text" && (
        <span className="w-full h-fit font-pre-semi-bold text-white break-all whitespace-pre-wrap">{preview.url}</span>
      )}
    </div>
  );
};

export default Preview;
