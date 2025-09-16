import { useNavigate } from "react-router-dom";

import LeftPanelNavButton from "@components/button/LeftPanelNavButton";

import ArrowLeftIcon from "@assets/icons/ArrowLeftIcon";
import PlusIcon from "@assets/icons/PlusIcon";
import DownLoadIcon from "@assets/icons/DownLoadIcon";

import useSystemStore from "@stores/systemStore";

const LeftPanelNav = () => {
  const navigate = useNavigate();

  const { leftSidebarSelectedTab, setLeftSidebarSelectedTab, setSelectedSessionId, selectedReportId } =
    useSystemStore();

  const handleClick = (label: "chat" | "report") => {
    setLeftSidebarSelectedTab(label);
  };

  const handleClickNewChat = () => {
    setSelectedSessionId(null);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center w-full h-fit p-6 transition-width duration-300">
      <section
        className={`flex justify-start items-center ${selectedReportId.id ? "max-w-1/4 w-full" : "max-w-0"} gap-1 overflow-hidden`}
      >
        {selectedReportId.id && (
          <ArrowLeftIcon
            width={48}
            height={48}
            strokeColor="#ffffff"
            className="rounded-full transition-all duration-300 hover:bg-toggleInactive"
            onClick={() => handleClick("report")}
          />
        )}
        <span
          className={`flex justify-center items-center font-pre-bold text-white text-xl w-fit whitespace-nowrap transition-width duration-300`}
        >
          {selectedReportId.name}
        </span>
      </section>

      <section
        className={`flex justify-center items-center ${selectedReportId.id ? "max-w-1/2" : "w-5/6"} w-full h-full gap-4`}
      >
        <LeftPanelNavButton
          label="Chat"
          selected={leftSidebarSelectedTab === "chat"}
          onClick={() => handleClick("chat")}
        />
        <LeftPanelNavButton
          label="Report"
          selected={leftSidebarSelectedTab === "report"}
          onClick={() => handleClick("report")}
        />
      </section>

      <figure
        className={`flex justify-end items-center ${selectedReportId.id ? "max-w-1/4 w-full" : "w-1/6"} min-w-12 h-12`}
      >
        {selectedReportId.id ? (
          <DownLoadIcon
            width={36}
            height={36}
            strokeColor="#ffffff"
            className="rounded-full transition-all duration-300 hover:bg-toggleInactive"
          />
        ) : (
          <PlusIcon
            width={40}
            height={40}
            strokeColor="#ffffff"
            className="rounded-full transition-all duration-300 hover:bg-toggleInactive"
            onClick={handleClickNewChat}
          />
        )}
      </figure>
    </nav>
  );
};

export default LeftPanelNav;
