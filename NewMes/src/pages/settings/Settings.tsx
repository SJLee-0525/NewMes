import { useEffect } from "react";

import useAuthStore from "@stores/authStore";

import defaultProfileImage from "@assets/images/defaultProfile.png";
import lightImage from "@assets/images/summer.png";
import darkImage from "@assets/images/half-moon.png";

const Settings = () => {
  const { user, currentTheme, setCurrentTheme } = useAuthStore();

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
    <section className="flex flex-col justify-start px-2 pb-2 w-full h-full overflow-hidden">
      <header className="flex items-center ps-5.5 h-22 flex-shrink-0">
        <h1 className="font-pre-semi-bold text-2xl text-white">Settings</h1>
      </header>

      <section className="flex-1 p-2 max-h-160 rounded-2xl bg-inactive overflow-y-auto">
        <section className="w-full h-fit">
          {/* 계정 정보 */}
          <figure className="flex items-center p-4">
            {/* 임시로 이미지 하드 코딩 */}
            <img src={defaultProfileImage} alt="Profile" className="w-12 h-12 rounded-full" />

            <div className="ml-4">
              <p className="font-pre-regular text-lg text-white">{user?.userEmail}</p>
            </div>
          </figure>

          <hr className="mx-2 border-t border-white/20" />

          {/* 테마 선택 */}
          <section className="p-4">
            <span className="font-pre-semi-bold text-white">Theme</span>
            <section className="flex justify-center items-center w-full h-fit gap-6 p-4">
              <figure
                className={`w-24 h-24 rounded-full ${currentTheme === "light" ? "ring-4 ring-mainPurple" : "ring-0 hover:ring-3 ring-mainPurple/70"} transition-all duration-400 cursor-pointer`}
                onClick={() => handleThemeChange("light")}
              >
                <img
                  src={lightImage}
                  alt="light-mode"
                  className="w-full h-full aspect-[1/1] object-cover"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </figure>
              <figure
                className={`w-24 h-24 rounded-full ${currentTheme === "dark" ? "ring-4 ring-mainPurple" : "ring-0 hover:ring-3 ring-mainPurple/70"} transition-all duration-400 cursor-pointer`}
                onClick={() => handleThemeChange("dark")}
              >
                <img
                  src={darkImage}
                  alt="dark-mode"
                  className="w-full h-full aspect-[1/1] object-cover"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </figure>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Settings;
