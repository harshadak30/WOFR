
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../DashBoardContent.tsx/DashBoardHeader";
import DashboardHeader from "../DashBoardContent.tsx/DashBoardSiderbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#f0f1f5]">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <DashboardHeader />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;