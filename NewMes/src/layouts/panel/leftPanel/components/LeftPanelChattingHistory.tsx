import { useState, useEffect } from "react";

import { getSessionsListApi } from "@apis/userApi";

import type { GroupByDateSessionsResponse } from "@/types/sessionsType";

import LeftPanelToggleDate from "@layouts/panel/leftPanel/components/LeftPanelToggleDate";

const LeftPanelChattingHistory = () => {
  const [sessions, setSessions] = useState<GroupByDateSessionsResponse | null>(null);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getSessionsListApi();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }

    fetchSessions();
  }, []);

  return (
    <section className="flex-1 flex flex-col w-full h-full pl-3 pr-6 pb-4 gap-4 overflow-y-auto">
      {sessions ? (
        Object.entries(sessions)
          .filter(([_, sessionsData]) => sessionsData.length > 0)
          .map(([date, sessionsOnDate]) => (
            <LeftPanelToggleDate key={date} date={date} sessionsOnDate={sessionsOnDate} />
          ))
      ) : (
        <p>History is unavailable. We're working to restore this feature as soon as possible.</p>
      )}
    </section>
  );
};

export default LeftPanelChattingHistory;
