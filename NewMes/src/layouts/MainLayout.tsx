import { Routes, Route } from "react-router-dom";

import TopNav from "@components/nav/TopNav";

import ChattingPanel from "@layouts/panel/chattingPanel/ChattingPanel";
import NewChat from "@layouts/chat/NewChat";
import Chatting from "@layouts/chat/Chatting";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <TopNav />

      <div className="flex-1 w-full h-full overflow-auto">
        <Routes>
          <Route path="/" element={<ChattingPanel />}>
            <Route index element={<NewChat />} />
            {/* <Route path="chat" element={<div className="text-white">Chat</div>} /> */}
            <Route path="chat/:sessionId" element={<Chatting />} />
          </Route>

          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/pricing" element={<div>Pricing</div>} />
          <Route path="/help" element={<div>Help</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
