import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { getSessionDetailApi } from "@apis/userApi";

import type { Message, Session } from "@/types/sessionsType";

import UserMessage from "@layouts/chat/components/UserMessage";
import AssistantMessage from "@layouts/chat/components/AssistantMessage";

import ChatInput from "@components/input/ChatInput";

const Chatting = () => {
  const { sessionId } = useParams<{ sessionId: string }>();

  const [sessionDetail, setSessionDetail] = useState<Session | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // 메시지 전송 로직
  async function handleSubmit({ message, images }: { message: string; images: File[] | null }) {
    const messageData: Message = {
      messageId: Date.now(), // 임시 ID, 실제로는 서버에서 받아와야 함
      role: "USER",
      content: message,
      createDate: new Date().toISOString(),
    };

    if (images && images.length > 0) {
      // 실제로는 업로드 후 URL을 받아와야 함
      messageData.messageImages = images.map((file) => file.name);
    }

    // 이후 서버에 메시지 전송 API 호출 필요
    setSessionDetail((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        messages: [...prev.messages, messageData],
      };
    });

    // 메시지 전송 후 스크롤을 맨 아래로 이동
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    async function fetchSessionDetail() {
      if (!sessionId) return;

      try {
        const data = await getSessionDetailApi(sessionId);
        setSessionDetail(data);
      } catch (error) {
        console.error("Error fetching session detail:", error);
      }
    }

    fetchSessionDetail();
  }, [sessionId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [sessionDetail]);

  return (
    <section className="relative flex-1 flex flex-col-reverse items-center w-full h-full px-6 pb-4 text-white">
      <section className="w-full py-6 max-w-320">
        <ChatInput onSubmit={handleSubmit} />
      </section>

      {sessionDetail ? (
        <section ref={messagesContainerRef} className="flex justify-center w-full overflow-y-auto">
          <header className="absolute top-0 w-full max-w-320 z-10">
            <h2 className="text-2xl font-pre-semi-bold w-fit pl-2 pr-10 py-3 rounded-lg bg-dark/80">
              {sessionDetail.patientName}
            </h2>
          </header>

          <div className="flex flex-col items-center max-w-320 h-full">
            <div className="flex flex-col w-full mt-4 space-y-4">
              {sessionDetail.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"} w-full h-fit`}
                >
                  {msg.role === "USER" ? (
                    <UserMessage
                      date={msg.createDate}
                      file={msg.messageImages ? msg.messageImages : undefined}
                      content={msg.content}
                    />
                  ) : (
                    <AssistantMessage
                      date={msg.createDate}
                      file={msg.messageImages ? msg.messageImages : undefined}
                      content={msg.content}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p>Loading session details...</p>
      )}
    </section>
  );
};

export default Chatting;
