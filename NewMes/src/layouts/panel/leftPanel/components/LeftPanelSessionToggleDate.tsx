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

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleClickSession(sessionId: number) {
    setSelectedSessionId(sessionId);
    navigate(`/chat/${sessionId}`);
  }

  const formattedDate = getFormattedDate(date);

  return (
    <div className="font-pre-medium text-lg">
      <span className="text-unavailable pl-3 cursor-pointer" onClick={handleToggle}>
        <i>{formattedDate}</i>
      </span>

      {/* max-h 옵션 나중에 손 봐야함. (애니메이션 관련) */}
      <ul className={`${isOpen ? "max-h-40" : "max-h-0"} overflow-hidden transition-max-height duration-300`}>
        {sessionsOnDate &&
          sessionsOnDate.map((session) => (
            <LeftPanelSessionButton
              key={session.id}
              label={session.contentSummary}
              selected={selectedSessionId === session.id}
              onClick={() => handleClickSession(session.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default LeftPanelSessionToggleDate;
