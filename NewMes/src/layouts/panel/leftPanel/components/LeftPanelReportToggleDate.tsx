import { useState } from "react";

import type { Report } from "@/types/reportsType";

import LeftPanelSessionButton from "@layouts/panel/leftPanel/components/LeftPanelSessionButton";

import useSystemStore from "@stores/systemStore";

import { getFormattedDate } from "@utils/formatDate";

const LeftPanelReportToggleDate = ({ date, reportsOnDate }: { date: string; reportsOnDate: Report[] }) => {
  const { selectedReportId, setSelectedReportId } = useSystemStore();

  const [isOpen, setIsOpen] = useState(true);

  // 날짜 토글 열고 닫기
  function handleToggle() {
    setIsOpen(!isOpen);
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
        {reportsOnDate &&
          reportsOnDate.map((report) => {
            const patientName = `${report.patientPid.slice(3, 7)} ${report.patientName}`;

            return (
              <LeftPanelSessionButton
                key={report.reportId}
                label={patientName}
                subLabel={report.shootingDate}
                previewLabel={report.disease}
                selected={selectedReportId.id === report.reportId}
                onClick={() => setSelectedReportId(report.reportId, patientName)}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default LeftPanelReportToggleDate;
