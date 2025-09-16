import "@styles/animations.css";

import tempImg from "@datas/cxr_image/cxr_03.jpeg"; // 임시 이미지

interface AssistantMessageProps {
  date: string;
  file?: string[];
  content: string;
}

const AssistantMessage = ({ date, file, content }: AssistantMessageProps) => {
  return (
    <div
      title={`Sent on ${date}`}
      className="animate-fade-in flex flex-col justify-between items-start w-full h-fit mt-2 p-6 gap-10 border-t border-t-border rounded-xl"
    >
      <header className="flex flex-col justify-start items-start w-full h-fit gap-2">
        <h2 className="font-pre-bold text-4xl">Answer Summary:</h2>
        <h4 className="font-pre-medium text-xl">{content}</h4>
      </header>

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

      <span className="flex flex-col justify-start items-start w-full px-1 gap-3 text-xl text-left font-pre-medium">
        <h3 className="font-pre-bold text-4xl">Clinical Tip:</h3>

        {/* 임시로,, 줄바꿈ㅅ 시 구분자? 다음에 글자 나오도록 수정해야함 */}
        <ul className="font-pre-medium space-y-2.5 list-disc list-inside marker:text-white marker:text-base">
          <li>Tip 1: Stay hydrated</li>
          <li>Tip 2: Take regular breaks</li>
          <li className="text-wrap break-words">
            Tip 3: However, a definitive diagnosis should always integrate CT imaging, clinical context, and temporal
            progression. However, a definitive diagnosis should always integrate CT imaging, clinical context, and
            temporal progression.
          </li>
        </ul>
      </span>
    </div>
  );
};

export default AssistantMessage;
