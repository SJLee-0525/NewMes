import { useNavigate } from "react-router-dom";

import type { Session, Message } from "@/types/sessionsType";

import ChatInput from "@components/input/ChatInput";

import useSystemStore from "@stores/systemStore";

const NewChat = () => {
  const navigate = useNavigate();

  const { selectedPatientId } = useSystemStore();

  // 메시지 전송 로직
  async function handleSubmit({ message, images }: { message: string; images: File[] | null }) {
    if (!message || message.trim() === "") return;

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

    // 세션 데이터 생성 (임시: 실제로는 백에서 처리)
    const sessionData: Session = {
      id: selectedPatientId.id ? Number(selectedPatientId.id) : Date.now(), // 선택된 환자 ID가 있으면 그걸로, 없으면 임시 ID (API 필요)
      patientName: selectedPatientId.name ? selectedPatientId.name : "뉴메스", // 선택된 환자 이름이 있으면 그걸로, 없으면 기본 빈 문자열
      contentSummary: message.slice(0, 30), // 임시로 첫 30자 요약: 추후 백에서 요약 처리
      createDate: new Date().toISOString(),
      messages: [messageData], // 첫 메시지 포함
    };

    navigate(`/chat/${sessionData.id}`, { state: { session: sessionData } });
  }

  return (
    <div className="w-full h-full flex justify-center items-start pt-[20vh]">
      <div className="animate-fade-in flex flex-col justify-center items-center w-5/6 h-fit gap-12">
        <h1 className="font-pre-bold text-5xl text-white text-center " style={{ lineHeight: "1.3" }}>
          Your AI Partner in Radiology,
          <br />
          radiXpert
        </h1>

        <section className="w-full max-w-240 h-fit">
          <ChatInput onSubmit={handleSubmit} />
        </section>
      </div>
    </div>
  );
};

export default NewChat;
