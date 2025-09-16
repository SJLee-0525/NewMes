import LeftPanelNavButton from "@components/button/LeftPanelNavButton";
import PlusIcon from "@assets/icons/PlusIcon";

import useSystemStore from "@stores/systemStore";

const LeftPanelNav = () => {
  const { leftSidebarSelectedTab, setLeftSidebarSelectedTab } = useSystemStore();

  return (
    <nav className="flex justify-between items-center w-full h-fit p-6 gap-2">
      <LeftPanelNavButton
        label="Chat"
        selected={leftSidebarSelectedTab === "chat"}
        onClick={(label) => setLeftSidebarSelectedTab(label.toLowerCase() as "chat" | "report")}
      />
      <LeftPanelNavButton
        label="Report"
        selected={leftSidebarSelectedTab === "report"}
        onClick={(label) => setLeftSidebarSelectedTab(label.toLowerCase() as "chat" | "report")}
      />
      <PlusIcon
        width={48}
        height={48}
        strokeColor="#ffffff"
        className="rounded-full transition-all duration-300 hover:bg-toggleInactive"
        onClick={() => alert("New Chat")}
      />
    </nav>
  );
};

export default LeftPanelNav;
