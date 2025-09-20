import useSystemStore from "@stores/systemStore";
import useModalStore from "@stores/modalStore";

import Settings from "@pages/settings/Settings";

import MenuIcon from "@assets/icons/MenuIcon";
import CloseIcon from "@assets/icons/CloseIcon";

import defaultProfileImage from "@assets/images/defaultProfile.png";

const TopNavLeft = () => {
  const { leftSidebarOpen, toggleLeftSidebar, leftSidebarSelectedTab, selectedReportId } = useSystemStore();
  const { openModal } = useModalStore();

  const leftWidth =
    !leftSidebarOpen || leftSidebarSelectedTab === "chat" || selectedReportId.id === null
      ? "w-1/4 min-w-80"
      : "w-2/5 min-w-150";

  function handleOpenSettings() {
    openModal({
      modalContent: <Settings />,
    });
  }

  return (
    <section
      className={`flex justify-between items-center ${leftWidth} min-w-60 h-full px-6 border-r border-r-border transition-width duration-300`}
    >
      <img
        src={defaultProfileImage}
        alt="Profile"
        className="w-12 h-12 aspect-[1] rounded-full"
        onClick={handleOpenSettings}
      />

      {/* 나중에 아이콘 꼭 바꿀 것. 버튼으로 감싸서 호버 효과 주는 거 잊지 말기 */}
      {leftSidebarOpen ? (
        <CloseIcon width={40} height={40} onClick={toggleLeftSidebar} strokeColor="#7D7983" />
      ) : (
        <MenuIcon width={40} height={40} onClick={toggleLeftSidebar} />
      )}
    </section>
  );
};

export default TopNavLeft;
