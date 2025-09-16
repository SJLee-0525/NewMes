import { Routes, Route } from "react-router-dom";

import TopNav from "@components/common/nav/TopNav";

import ChattingPanel from "@layouts/panel/chattingPanel/ChattingPanel";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <TopNav />

      <div className="flex-1 w-full h-full overflow-auto">
        <Routes>
          <Route path="/" element={<ChattingPanel />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/pricing" element={<div>Pricing</div>} />
          <Route path="/help" element={<div>Help</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
