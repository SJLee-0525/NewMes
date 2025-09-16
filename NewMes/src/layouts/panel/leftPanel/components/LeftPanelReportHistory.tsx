import { useState, useEffect } from "react";

import { getReportsListApi } from "@apis/userApi";

import type { GroupByDateReportsResponse } from "@/types/reportsType";

import LeftPanelReportToggleDate from "@layouts/panel/leftPanel/components/LeftPanelReportToggleDate";

const LeftPanelReportHistory = () => {
  const [reports, setReports] = useState<GroupByDateReportsResponse | null>(null);

  useEffect(() => {
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
    <section className="flex-1 flex flex-col w-full h-full pl-3 pr-6 pb-4 gap-4 overflow-y-auto">
      {reports ? (
        Object.entries(reports)
          .filter(([_, reportsData]) => reportsData.length > 0)
          .map(([date, reportsOnDate]) => (
            <LeftPanelReportToggleDate key={date} date={date} reportsOnDate={reportsOnDate} />
          ))
      ) : (
        <p>Report history is unavailable. We're working to restore this feature as soon as possible.</p>
      )}
    </section>
  );
};

export default LeftPanelReportHistory;
