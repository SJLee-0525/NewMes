import "@styles/animations.css";

import tempImg from "@datas/cxr_image/cxr_02.jpeg"; // 임시 이미지

interface UserMessageProps {
  date: string;
  file?: string[];
  content: string;
}

const UserMessage = ({ date, file, content }: UserMessageProps) => {
  return (
    <div
      title={`Sent on ${date}`}
      className="animate-fade-in flex flex-col justify-between items-end w-fit max-w-[60%] h-fit p-4 gap-4 bg-inactive rounded-xl"
    >
      {file && file.length > 0 && (
        <figure className="relative max-w-48 aspect-[15/16] rounded-lg overflow-hidden">
          <img src={tempImg} alt="첨부파일" className="w-full h-full object-cover" />

          {file.length > 1 && (
            <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-pre-semi-bold text-white bg-black bg-opacity-50 rounded-full">
              +{file.length - 1}
            </span>
          )}
        </figure>
      )}

      <span className="w-full px-1 text-xl text-left font-pre-medium">{content}</span>
    </div>
  );
};

export default UserMessage;
