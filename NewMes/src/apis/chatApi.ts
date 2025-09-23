import OpenAI from "openai";

import type { Message } from "@/types/sessionsType";

import { GPT_MODEL, MAX_TOKENS } from "@datas/PROMPTS";

import { buildMessages } from "@utils/buildMessage";

const { VITE_GPT_API_KEY } = import.meta.env;

const client = new OpenAI({ apiKey: VITE_GPT_API_KEY, dangerouslyAllowBrowser: true });

/**
 * GPT 모델에 대화 히스토리와 사용자의 최신 메시지를 보내고 응답을 받습니다.
 * @param history 전체 대화 히스토리
 * @param userMessage 사용자의 최신 메시지
 * @returns GPT 모델의 응답 메시지
 */
export const getChatResponse = async ({ history = [], userMessage }: { history: Message[]; userMessage: string }) => {
  try {
    const messages = buildMessages(history, userMessage); // 전체 대화 히스토리를 최근 10개의 데이터로 변환

    const response = await client.chat.completions.create({
      model: GPT_MODEL,
      messages,
      max_completion_tokens: MAX_TOKENS,
    });

    return (
      response.choices[0].message?.content || '{"answerSummary": "죄송합니다, 답변을 생성하는 데 문제가 발생했습니다."}'
    );
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return '{"answerSummary": "죄송합니다, 답변을 생성하는 데 문제가 발생했습니다."}';
  }
};
