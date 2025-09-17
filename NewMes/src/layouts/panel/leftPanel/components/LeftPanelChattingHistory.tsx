import { useState, useEffect } from "react";

import { getSessionsListApi } from "@apis/userApi";

import type { GroupByDateSessionsResponse } from "@/types/sessionsType";

import Unavailable from "@components/unavailable/Unavailable";

import LeftPanelSessionToggleDate from "@layouts/panel/leftPanel/components/LeftPanelSessionToggleDate";

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
    <section className="flex-1 flex flex-col w-full pl-3 pr-6 pb-4 gap-4 overflow-y-auto">
      {sessions && Object.keys(sessions).length > 0 ? (
        Object.entries(sessions)
          .filter(([_, sessionsData]) => sessionsData.length > 0)
          .map(([date, sessionsOnDate]) => (
            <LeftPanelSessionToggleDate key={date} date={date} sessionsOnDate={sessionsOnDate} />
          ))
      ) : (
        <Unavailable type="error" content={"History"} />
      )}
    </section>
  );
};

export default LeftPanelChattingHistory;
