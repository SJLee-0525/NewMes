import LeftPanelNav from "@layouts/panel/leftPanel/components/LeftPanelNav";
import LeftPanelChattingHistory from "@layouts/panel/leftPanel/components/LeftPanelChattingHistory";

import useSystemStore from "@stores/systemStore";

const LeftPanel = () => {
  const { leftSidebarSelectedTab } = useSystemStore();

  const leftWidth = leftSidebarSelectedTab === "chat" ? "w-1/5" : "w-1/4"; // 추후 리포트 선택될 경우 1/4

  return (
    <aside className={`flex flex-col border-r border-r-border ${leftWidth} min-w-60 h-full`}>
      <LeftPanelNav />
      <LeftPanelChattingHistory />
    </aside>
  );
};

export default LeftPanel;
