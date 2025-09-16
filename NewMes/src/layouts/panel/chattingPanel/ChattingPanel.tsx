import { Outlet } from "react-router-dom";

import useSystemStore from "@stores/systemStore";

import LeftPanel from "@layouts/panel/leftPanel/LeftPanel";

const ChattingPanel = () => {
  const leftSidebarOpen = useSystemStore((state) => state.leftSidebarOpen);

  return (
    <div className="flex justify-between w-full h-full">
      <LeftPanel isOpen={leftSidebarOpen} />

      <div className="flex-1 flex flex-col w-full h-full transition-width duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default ChattingPanel;
