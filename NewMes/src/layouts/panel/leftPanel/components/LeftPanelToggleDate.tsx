import { useState } from "react";

import type { Session } from "@/types/sessionsType";

import LeftPanelSessionButton from "@layouts/panel/leftPanel/components/LeftPanelSessionButton";

import useSystemStore from "@stores/systemStore";

const LeftPanelToggleDate = ({ date, sessionsOnDate }: { date: string; sessionsOnDate: Session[] }) => {
  const { selectedSessionId, setSelectedSessionId } = useSystemStore();

  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="font-pre-medium">
      <span className="text-unavailable pl-3 cursor-pointer" onClick={handleToggle}>
        <i>{date}</i>
      </span>

      {/* max-h 옵션 나중에 손 봐야함. (애니메이션 관련) */}
      <ul className={`${isOpen ? "max-h-40" : "max-h-0"} overflow-hidden transition-max-height duration-300`}>
        {sessionsOnDate &&
          sessionsOnDate.map((session) => (
            <LeftPanelSessionButton
              key={session.id}
              summary={session.contentSummary}
              selected={selectedSessionId === session.id}
              onClick={() => setSelectedSessionId(session.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default LeftPanelToggleDate;
