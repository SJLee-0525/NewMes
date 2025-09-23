import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import type { ChatTurn, Message } from "@/types/sessionsType";

import { SYSTEM_PROMPT, USER_PROMPT, MAX_RECENT_MESSAGES } from "@datas/PROMPTS";

/**
 * Message 배열을 ChatTurn 배열로 변환합니다.
 * @param messages Message 배열
 * @returns ChatTurn 배열
 */
export const convertToChatTurn = (messages: Message[]): ChatTurn[] => {
  const recentMessages = messages.slice(-MAX_RECENT_MESSAGES); // 최근 6개만 사용

  return recentMessages.map((msg) => ({
    role: msg.role === "USER" ? "user" : "assistant",
    content: msg.content,
  }));
};

/**
 * 대화 히스토리와 사용자의 최신 메시지를 기반으로 GPT 모델에 전달할 메시지 배열을 생성합니다.
 * @param history 전체 대화 히스토리
 * @param userMessage 사용자의 최신 메시지
 * @returns GPT 모델에 전달할 메시지 배열
 */
export const buildMessages = (
  history: Message[], // 전체 히스토리
  userMessage: string
): ChatCompletionMessageParam[] => {
  const convertedHistory = convertToChatTurn(history);

  const msgs: ChatCompletionMessageParam[] = [
    ...SYSTEM_PROMPT,
    ...USER_PROMPT,
    ...convertedHistory,
    { role: "user", content: userMessage } as const,
  ];

  return msgs;
};
