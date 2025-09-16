import useSystemStore from "@stores/systemStore";

import MenuIcon from "@assets/icons/MenuIcon";
import CloseIcon from "@assets/icons/CloseIcon";

import defaultProfileImage from "@assets/images/defaultProfile.png";

const TopNavLeft = () => {
  const { leftSidebarOpen, toggleLeftSidebar, leftSidebarSelectedTab, selectedReportId } = useSystemStore();

  const leftWidth = leftSidebarSelectedTab === "chat" || selectedReportId.id === null ? "w-1/4" : "w-2/5";

  return (
    <section
      className={`flex justify-between items-center ${leftWidth} min-w-60 h-full px-6 border-r border-r-border transition-width duration-300`}
    >
      <img src={defaultProfileImage} alt="Profile" className="w-12 h-12 aspect-[1] rounded-full" />

      {leftSidebarOpen ? (
        <CloseIcon width={40} height={40} strokeColor={"#ffffff"} onClick={toggleLeftSidebar} />
      ) : (
        <MenuIcon width={40} height={40} strokeColor={"#ffffff"} onClick={toggleLeftSidebar} />
      )}
    </section>
  );
};

export default TopNavLeft;
