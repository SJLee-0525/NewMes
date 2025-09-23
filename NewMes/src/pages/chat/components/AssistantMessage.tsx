import "@styles/animations.css";

import tempImg from "@datas/cxr_image/cxr_03.jpeg"; // 임시 이미지

import { getFormattedDateTime } from "@utils/formatDate";

interface AssistantMessageProps {
  date: string;
  file?: string[];
  content: string;
}

// { Answer Summary: 요약 내용, Clinical Tips?: [임상 팁1, 임상 팁2] }
const AssistantMessage = ({ date, file, content }: AssistantMessageProps) => {
  const formattedDateTime = getFormattedDateTime(date);

  const { answerSummary, clinicalTips } = parseContent(content);

  function parseContent(text: string): { answerSummary: string; clinicalTips: string[] } {
    // text 예시: '{"answerSummary": "Both lungs에서 COPD 의심 소견이 관찰됩니다.", "clinicalTips": ["폐 기능 검사 권장", "흡입기 사용법 교육 필요"]}'

    try {
      // JSON 형태로 변환을 위해 key에 쌍따옴표 추가
      const jsonString = text
        .replace(/(\w+):/g, '"$1":') // key에 쌍따옴표 추가
        .replace(/'/g, '"'); // 작은따옴표를 큰따옴표로 변환

      const parsed = JSON.parse(jsonString);

      return {
        answerSummary: parsed.answerSummary || "",
        clinicalTips: Array.isArray(parsed.clinicalTips) ? parsed.clinicalTips : [],
      };
    } catch {
      return { answerSummary: text, clinicalTips: [] };
    }
  }

  return (
    <div
      title={`Sent on ${formattedDateTime}`}
      className="animate-fade-in flex flex-col justify-between items-start w-full h-fit mt-2 p-6 gap-10 border-t border-t-border"
    >
      <header className="flex flex-col justify-start items-start w-full h-fit gap-2">
        <h2 className="font-pre-bold text-3xl">Answer Summary:</h2>

        {/* 메시지 내용: '\n을 <br />로 변환해서 줄바꿈 처리 */}
        <span className="w-full text-lg text-left font-pre-medium break-words">
          {answerSummary.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              {idx !== answerSummary.split("\n").length - 1 && <br />}
            </span>
          ))}
        </span>
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

      {clinicalTips && clinicalTips.length > 0 && (
        <span className="flex flex-col justify-start items-start w-full px-1 gap-3 text-lg text-left font-pre-medium">
          <h3 className="font-pre-bold text-3xl">Clinical Tip:</h3>

          {/* 임시로,, 줄바꿈ㅅ 시 구분자? 다음에 글자 나오도록 수정해야함 */}
          <ul className="font-pre-medium space-y-2.5 list-disc list-inside marker:text-white marker:text-base">
            {clinicalTips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </span>
      )}
    </div>
  );
};

export default AssistantMessage;
