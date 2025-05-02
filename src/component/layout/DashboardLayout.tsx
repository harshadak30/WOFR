import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../Pages/DashBoardContent.tsx/DashBoardSiderbar";
import DashboardHeader from "../../Pages/DashBoardContent.tsx/DashBoardHeader";

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
