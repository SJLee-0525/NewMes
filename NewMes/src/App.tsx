import "@/App.css";

import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import type { User } from "@/types/authType";

import Login from "@pages/auth/Login";
import NewChat from "@pages/chat/NewChat";
import Chatting from "@pages/chat/Chatting";

import TopNav from "@components/nav/TopNav";
import PhotoModal from "@components/modal/PhotoModal";

import useAuthStore from "@stores/authStore";
import useSystemStore from "@stores/systemStore";

import LeftPanel from "@layouts/panel/leftPanel/LeftPanel";
import RightPanel from "@layouts/panel/rightPanel/RightPanel";

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { setCurrentTheme, setUserName, deleteUser } = useAuthStore();
  const { leftSidebarOpen, rightSidebarOpen, toggleRightSidebar } = useSystemStore();

  useEffect(() => {
    // 로컬 스토리지에서 데이터 가져오기
    const storedData = localStorage.getItem("authenticate-storage");

    if (storedData) {
      async function getUserIdFromStorage(storedData: string) {
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);

        const theme = parsedData.state.currentTheme;
        if (theme === "dark") setCurrentTheme("dark");
        else if (theme === "light") setCurrentTheme("light");

        const user: User = parsedData.state.user;
        setUserName(user);

        if (user && user.userEmail) {
          setUserName(user);
          setIsLoggedIn(true);
          navigate("/");
          return;
        }

        deleteUser();
        setIsLoggedIn(false);
        navigate("/");
      }

      getUserIdFromStorage(storedData);
    } else {
      deleteUser();
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col w-screen h-screen text-white">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <TopNav />

      <div className="relative flex-1 flex justify-between w-full h-full overflow-auto">
        <LeftPanel isOpen={leftSidebarOpen} />

        <div className="flex-1 flex flex-col w-full h-full transition-width duration-300">
          <Routes>
            <Route index element={<NewChat />} />
            <Route path="chat/:sessionId" element={<Chatting />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/pricing" element={<div>Pricing</div>} />
            <Route path="/help" element={<div>Help</div>} />
          </Routes>
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

      <PhotoModal />
    </div>
  );
};

export default App;
