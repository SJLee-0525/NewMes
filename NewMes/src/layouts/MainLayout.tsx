import { Routes, Route } from "react-router-dom";

import TopNav from "@components/common/nav/TopNav";

import ChattingPanel from "@layouts/panel/ChattingPanel";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <TopNav />

      <Routes>
        <Route path="/" element={<ChattingPanel />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/pricing" element={<div>Pricing</div>} />
        <Route path="/help" element={<div>Help</div>} />
      </Routes>
    </div>
  );
};

export default MainLayout;
