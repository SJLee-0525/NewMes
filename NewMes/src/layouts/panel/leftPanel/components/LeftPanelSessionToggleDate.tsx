import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Session } from "@/types/sessionsType";

import LeftPanelSessionButton from "@layouts/panel/leftPanel/components/LeftPanelSessionButton";

import useSystemStore from "@stores/systemStore";

import { getFormattedDate } from "@utils/formatDate";

const LeftPanelSessionToggleDate = ({ date, sessionsOnDate }: { date: string; sessionsOnDate: Session[] }) => {
  const navigate = useNavigate();

  const { selectedSessionId, setSelectedSessionId } = useSystemStore();

  const [isOpen, setIsOpen] = useState(true);

  // 날짜 토글 열고 닫기
  function handleToggle() {
    setIsOpen(!isOpen);
  }

  // 세션 클릭 시 선택된 세션 ID 업데이트 및 채팅 화면으로 이동
  function handleClickSession(sessionId: number) {
    setSelectedSessionId(sessionId);
    navigate(`/chat/${sessionId}`);
  }

  const formattedDate = getFormattedDate(date);

  return (
    <div className="font-pre-regular text-md">
      <span
        className="animate-fade-in pl-3 text-unavailable hover:text-mainPurple transition-colors duration-300 cursor-pointer"
        onClick={handleToggle}
      >
        <i>{formattedDate}</i>
      </span>

      <ul className={`${isOpen ? "block" : "hidden"} h-fit overflow-hidden`}>
        {sessionsOnDate &&
          sessionsOnDate.map((session) => (
            <LeftPanelSessionButton
              key={session.id}
              label={session.contentSummary}
              previewLabel={session.patientName}
              selected={selectedSessionId === session.id}
              onClick={() => handleClickSession(session.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default LeftPanelSessionToggleDate;
