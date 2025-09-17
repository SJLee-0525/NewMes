import type { ImagePreviewProps } from "@/types/componentsProps";

const ImagePreview = ({ preview }: { preview: ImagePreviewProps | null }) => {
  if (!preview) return null;

  return (
    <div
      className="fixed max-w-48 max-h-48 rounded-xl z-9999 border border-icon pointer-events-none"
      style={{
        left: preview.x + 6,
        top: preview.y + 2,
      }}
    >
      <img src={preview.url} alt="preview" className="max-w-48 max-h-48 rounded-xl" />
    </div>
  );
};

export default ImagePreview;
