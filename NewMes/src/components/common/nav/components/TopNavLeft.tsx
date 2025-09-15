import useSystemStore from "@stores/systemStore";

import MenuIcon from "@assets/icons/MenuIcon";
import CloseIcon from "@assets/icons/CloseIcon";

import defaultProfileImage from "@assets/images/defaultProfile.png";

const TopNavLeft = () => {
  const { leftSidebarOpen, toggleLeftSidebar, leftSidebarSelectedTab } = useSystemStore();

  const leftWidth = leftSidebarSelectedTab === "chat" ? "w-1/5" : "w-1/4"; // 추후 리포트 선택될 경우 1/4

  return (
    <section className={`flex justify-between items-center ${leftWidth} min-w-60 h-full px-4 border-r border-r-border`}>
      <img src={defaultProfileImage} alt="Profile" className="w-12 h-12 aspect-[1] rounded-full" />

      {leftSidebarOpen ? (
        <CloseIcon width={30} height={30} strokeColor={"#ffffff"} onClick={toggleLeftSidebar} />
      ) : (
        <MenuIcon width={30} height={30} strokeColor={"#ffffff"} onClick={toggleLeftSidebar} />
      )}
    </section>
  );
};

export default TopNavLeft;
