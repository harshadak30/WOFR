import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../../Pages/DashBoardContent.tsx/DashBoardSiderbar";
import { DashboardHeader } from "../../Pages/DashBoardContent.tsx/DashBoardHeader";
import { useState } from "react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#f0f1f5]">
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
