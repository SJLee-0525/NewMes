import useSystemStore from "@stores/systemStore";

const LeftPanel = () => {
  const { leftSidebarSelectedTab } = useSystemStore();

  const leftWidth = leftSidebarSelectedTab === "chat" ? "w-1/5" : "w-1/4"; // 추후 리포트 선택될 경우 1/4

  return <div className={`border-r border-r-border ${leftWidth} min-w-60 h-full px-4`}>Left Panel</div>;
};

export default LeftPanel;
