import { useEffect } from "react";

import useAuthStore from "@stores/authStore";
import useSystemStore from "@stores/systemStore";

import MenuIcon from "@assets/icons/MenuIcon";
import CloseIcon from "@assets/icons/CloseIcon";

import defaultProfileImage from "@assets/images/defaultProfile.png";

const TopNavLeft = () => {
  const { currentTheme, setCurrentTheme } = useAuthStore();
  const { leftSidebarOpen, toggleLeftSidebar, leftSidebarSelectedTab, selectedReportId } = useSystemStore();

  const leftWidth =
    !leftSidebarOpen || leftSidebarSelectedTab === "chat" || selectedReportId.id === null ? "w-1/4" : "w-2/5";

  function handleThemeChange(theme: string) {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme && storedTheme !== currentTheme) {
      setCurrentTheme(storedTheme as "light" | "dark");
    } else if (!storedTheme) {
      setCurrentTheme("dark");
    }
  }, [currentTheme]);

  return (
    <section
      className={`flex justify-between items-center ${leftWidth} min-w-60 h-full px-6 border-r border-r-border transition-width duration-300`}
    >
      <img
        src={defaultProfileImage}
        alt="Profile"
        className="w-12 h-12 aspect-[1] rounded-full"
        onClick={() => handleThemeChange(currentTheme === "dark" ? "light" : "dark")}
      />

      {/* 나중에 아이콘 꼭 바꿀 것. 버튼으로 감싸서 호버 효과 주는 거 잊지 말기 */}
      {leftSidebarOpen ? (
        <CloseIcon width={40} height={40} strokeColor={"#ffffff"} onClick={toggleLeftSidebar} />
      ) : (
        <MenuIcon width={40} height={40} strokeColor={"#ffffff"} onClick={toggleLeftSidebar} />
      )}
    </section>
  );
};

export default TopNavLeft;
