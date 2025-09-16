import { Outlet } from "react-router-dom";

import useSystemStore from "@stores/systemStore";

import LeftPanel from "@layouts/panel/leftPanel/LeftPanel";
import RightPanel from "@layouts/panel/rightPanel/RightPanel";

const ChattingPanel = () => {
  const { leftSidebarOpen, rightSidebarOpen, toggleRightSidebar } = useSystemStore();

  return (
    <div className="relative flex justify-between w-full h-full">
      <LeftPanel isOpen={leftSidebarOpen} />

      <div className="flex-1 flex flex-col w-full h-full transition-width duration-300">
        <Outlet />
      </div>

      <button
        className={`absolute ${rightSidebarOpen ? "hidden" : "block"} px-2 py-0.5 z-10 top-8 right-0 bg-mainPurple text-white font-pre-medium rounded-t-md hover:bg-mainPurple/75 transition-all duration-300`}
        style={{ transform: "rotate(-90deg)", right: "-20px" }}
        onClick={() => toggleRightSidebar(true)}
      >
        Patient
      </button>
      <RightPanel isOpen={rightSidebarOpen} />
    </div>
  );
};

export default ChattingPanel;
