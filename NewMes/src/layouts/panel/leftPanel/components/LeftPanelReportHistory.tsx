import { useState, useEffect } from "react";

import { getReportsListApi } from "@apis/userApi";

import type { GroupByDateReportsResponse } from "@/types/reportsType";

import Unavailable from "@components/unavailable/Unavailable";

import LeftPanelReportToggleDate from "@layouts/panel/leftPanel/components/LeftPanelReportToggleDate";
import LeftPanelDetailReport from "@layouts/panel/leftPanel/components/LeftPanelDetailReport";

import useSystemStore from "@stores/systemStore";

const LeftPanelReportHistory = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  const { selectedReportId } = useSystemStore();

  const [reports, setReports] = useState<GroupByDateReportsResponse | null>(null);

  useEffect(() => {
    if (selectedReportId.id) return;

    // 전체 리포트 기록 불러오기
    async function fetchReports() {
      try {
        const data = await getReportsListApi();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }

    fetchReports();
  }, []);

  return (
    <section className="flex-1 flex flex-col w-full pl-3 pr-6 pb-4 gap-4 overflow-y-auto">
      {!selectedReportId.id &&
        reports &&
        Object.keys(reports).length > 0 &&
        Object.entries(reports)
          .filter(([_, reportsData]) => reportsData.length > 0)
          .map(([date, reportsOnDate]) => (
            <LeftPanelReportToggleDate key={date} date={date} reportsOnDate={reportsOnDate} />
          ))}

      {!selectedReportId.id && (!reports || Object.keys(reports).length === 0) && (
        <Unavailable type="error" content={"Report history"} />
      )}

      {selectedReportId.id && <LeftPanelDetailReport ref={ref} selectedReportId={selectedReportId.id} />}
    </section>
  );
};

export default LeftPanelReportHistory;
