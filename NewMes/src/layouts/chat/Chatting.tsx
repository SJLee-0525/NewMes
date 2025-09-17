import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getSessionDetailApi, getPatientListApi } from "@apis/userApi";

import type { Message, Session } from "@/types/sessionsType";

import UserMessage from "@layouts/chat/components/UserMessage";
import AssistantMessage from "@layouts/chat/components/AssistantMessage";

import ChatInput from "@components/input/ChatInput";

import useSystemStore from "@stores/systemStore";

const LoadChatting = ({ message }: { message: string }) => {
  return (
    <div className={`flex justify-center w-full py-4`}>
      <span className="font-pre-medium text-xl text-icon text-center">{message}</span>
    </div>
  );
};

const Chatting = () => {
  const { sessionId } = useParams<{ sessionId: string }>();

  // 새 채팅 관련한 강제 로직..
  const location = useLocation();
  const session = (location.state && (location.state as { session: Session }).session) as Session | undefined;

  const { selectedPatientId, setSelectedPatientId } = useSystemStore();

  const [sessionDetail, setSessionDetail] = useState<Session | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // 메시지 전송 로직
  async function handleSubmit({ message, images }: { message: string; images: File[] | null }) {
    if (!message || message.trim() === "") return;

    if (!sessionId) {
      alert("세션이 만료되었습니다. 새로운 채팅을 시작해주세요.");
      return;
    }

    // 메시지 데이터 생성
    const messageData: Message = {
      messageId: Date.now(), // 임시 ID, 실제로는 서버에서 받아와야 함
      role: "USER",
      content: message,
      createDate: new Date().toISOString(),
    };

    // 이미지 파일이 있으면 메시지에 이미지 정보 추가: 실제로는 업로드 후 URL을 받아와야 함
    if (images && images.length > 0) {
      messageData.messageImages = images.map((file) => file.name);
    }

    // 이후 서버에 메시지 전송: 현재는 임시로 상태에 추가
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
    // sessionId가 변경될 때마다 파라미터에 맞는 세션 상세 정보를 가져옴
    async function fetchSessionDetail() {
      if (!sessionId) return;

      try {
        if (!session) {
          // 기존 채팅이라면 API로 세션 상세 정보 불러오기
          const data = await getSessionDetailApi(sessionId);
          setSessionDetail(data);

          // 환자 정보 불러오기 (임시: 세션에 환자 id가 없으므로 이름으로 검색)
          const patientInfo = await getPatientListApi(data.patientName);
          if (patientInfo.length > 0) setSelectedPatientId(patientInfo[0].id, patientInfo[0].name, []);
        } else {
          // NewChat에서 넘어온 세션이 있으면 그걸로 설정
          setSessionDetail(session);

          // 환자 정보 불러오기 (임시: 세션에 환자 id가 없으므로 이름으로 검색, 없다면 세션에서 가져온 데이터 사용)
          const patientInfo = await getPatientListApi(session.patientName);
          if (patientInfo.length > 0) setSelectedPatientId(patientInfo[0].id, patientInfo[0].name, []);
          else setSelectedPatientId(session.id.toString(), session.patientName, []);
        }
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
            <h2 className="text-xl font-pre-semi-bold w-full pl-8 pr-10 py-3 bg-gradient-to-r from-dark to-dark/0 pointer-events-none">
              {selectedPatientId.id} {selectedPatientId.name}
            </h2>
          </header>

          <div className="flex flex-col items-center w-full max-w-320 h-full">
            <div className="flex flex-col w-full mt-4 space-y-4">
              {sessionDetail.messages && sessionDetail.messages.length > 0 ? (
                sessionDetail.messages.map((msg, index) => (
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
                ))
              ) : (
                <LoadChatting message="대화가 없습니다. 새로운 메시지를 입력해보세요." />
              )}
            </div>
          </div>
        </section>
      ) : (
        <LoadChatting message="세션 정보를 불러오는 중입니다..." />
      )}
    </section>
  );
};

export default Chatting;
