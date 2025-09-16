import LeftPanelNav from "@layouts/panel/leftPanel/components/LeftPanelNav";
import LeftPanelChattingHistory from "@layouts/panel/leftPanel/components/LeftPanelChattingHistory";
import LeftPanelReportHistory from "@layouts/panel/leftPanel/components/LeftPanelReportHistory";

import useSystemStore from "@stores/systemStore";

const LeftPanel = () => {
  const { leftSidebarSelectedTab, selectedReportId } = useSystemStore();

  const leftWidth = leftSidebarSelectedTab === "chat" || selectedReportId.id === null ? "w-1/4" : "w-2/5";

  return (
    <aside
      className={`flex flex-col ${leftWidth} min-w-60 h-full border-r border-r-border transition-width duration-300`}
    >
      <LeftPanelNav />

      {leftSidebarSelectedTab === "report" && <LeftPanelReportHistory />}
      {leftSidebarSelectedTab === "chat" && <LeftPanelChattingHistory />}
    </aside>
  );
};

export default LeftPanel;
