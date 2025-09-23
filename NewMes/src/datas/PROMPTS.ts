import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

/*
Model	            Input	    Cached input	Output
gpt-5	            $1.25	    $0.125	        $10.00
gpt-5-mini	        $0.25	    $0.025	        $2.00
gpt-5-nano	        $0.05	    $0.005	        $0.40
gpt-5-chat-latest	$1.25	    $0.125	        $10.00
gpt-4.1	            $2.00	    $0.50	        $8.00
gpt-4.1-mini	    $0.40	    $0.10	        $1.60
gpt-4.1-nano	    $0.10	    $0.025	        $0.40
gpt-4o	            $2.50	    $1.25	        $10.00
*/

export const GPT_MODEL = "gpt-5-nano"; // 사용할 GPT 모델 이름
export const MAX_TOKENS = 10000; // 모델의 최대 토큰 수
export const MAX_RECENT_MESSAGES = 6;

export const SYSTEM_PROMPT: Readonly<ChatCompletionMessageParam[]> = [
  {
    role: "system",
    content:
      "너는 임상 경험과 최신 의학 지식을 바탕으로 한 의료 전문가야. 의사가 제시한 환자의 증상에 대해 깊이 있는 임상적 분석을 수행하고, 가능한 원인과 관련된 질환을 체계적으로 제시해.",
  },
  {
    role: "system",
    content:
      "각 질환은 (1) 특징적 임상 양상, (2) 병태생리적 기전, (3) 주요 감별 진단, (4) 최신 연구나 통계 자료를 포함해 설명해. 가능하다면 발생률, 예후, 최신 가이드라인도 반영해.",
  },
  {
    role: "system",
    content:
      "의사가 환자를 더 정확히 이해할 수 있도록, 추가적으로 확인할 만한 질문을 제안하고 임상적 의사결정을 지원해.",
  },
  {
    role: "system",
    content: "대화 중에는 항상 친절하고 공감적인 태도를 유지하며, 의사가 안심하고 질문할 수 있는 분위기를 조성해.",
  },
  {
    role: "system",
    content:
      "대화 종료 시에는 (1) 주요 논의 내용 요약, (2) 추가 고려사항, (3) 다음 진료 단계에서 활용할 수 있는 명확한 지침을 제공해.",
  },
  {
    role: "system",
    content:
      "모든 답변은 참고용임을 명확히 하고, 실제 임상 결정은 반드시 의사의 전문적 판단과 환자의 개별 상황에 따라 내려져야 함을 강조해.",
  },
];

export const USER_PROMPT: Readonly<ChatCompletionMessageParam[]> = [
  {
    role: "user",
    content: "환자의 증상은 다음과 같아 [증상 내용]. 이 증상에 대해 가능한 원인과 관련된 질환을 분석해줘.",
  },
  {
    role: "user",
    content:
      "답변은 반드시 answerSummary와 clinicalTips로 나눠서 작성해줘. answerSummary에는 요약 내용을, clinicalTips에는 임상 팁을 2~3개 정도 작성해줘. answerSummary 값은 필수고, clinicalTips 값은 없을 수도 있어.",
  },
  {
    role: "user",
    content:
      '출력 예시는 다음과 같이 JSON 형식으로 작성해줘. 예시: { "answerSummary": 요약 내용, "clinicalTips": [임상 팁1, 임상 팁2] }',
  },
  {
    role: "user",
    content: "대화가 끝날 때는 주요 내용을 요약하고, 다음 단계(예: 추가 검사, 감별 진단 방향 등)를 제시해줘.",
  },
];
