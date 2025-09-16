import LeftPanelNav from "@layouts/panel/leftPanel/components/LeftPanelNav";
import LeftPanelChattingHistory from "@layouts/panel/leftPanel/components/LeftPanelChattingHistory";
import LeftPanelReportHistory from "@layouts/panel/leftPanel/components/LeftPanelReportHistory";

import useSystemStore from "@stores/systemStore";

const LeftPanel = ({ isOpen }: { isOpen: boolean }) => {
  const { leftSidebarSelectedTab, selectedReportId } = useSystemStore();

  const leftWidth = !isOpen
    ? "w-0"
    : leftSidebarSelectedTab === "chat" || selectedReportId.id === null
      ? "w-1/4 min-w-60"
      : "w-2/5 min-w-60";

  return (
    <aside className={`flex flex-col ${leftWidth} h-full border-r border-r-border transition-all duration-300`}>
      {isOpen && (
        <>
          <LeftPanelNav />

          {leftSidebarSelectedTab === "report" && <LeftPanelReportHistory />}
          {leftSidebarSelectedTab === "chat" && <LeftPanelChattingHistory />}
        </>
      )}
    </aside>
  );
};

export default LeftPanel;
