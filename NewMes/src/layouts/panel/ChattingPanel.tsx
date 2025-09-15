import useSystemStore from "@stores/systemStore";

import LeftPanel from "@layouts/panel/LeftPanel";

const ChattingPanel = () => {
  const leftSidebarOpen = useSystemStore((state) => state.leftSidebarOpen);

  return (
    <div className="flex justify-between w-full h-full">
      {leftSidebarOpen && <LeftPanel />}

      <div className="flex-1 flex flex-col w-full h-full"></div>
    </div>
  );
};

export default ChattingPanel;
