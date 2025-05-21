import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { DashboardSidebar } from "../../Pages/DashBoardContent.tsx/DashBoardSiderbar";
import { DashboardHeader } from "../../Pages/DashBoardContent.tsx/DashBoardHeader";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setSidebarVisible(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };
  const toggleSidebarVisibility = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen bg-[#f0f1f5] relative">
      {/* Overlay for mobile */}
      {isMobile && sidebarVisible && (
        <div
          className="fixed inset-0 bg-transparent z-20"
          onClick={handleOverlayClick}
        ></div>
      )}

      <div
        className={`transition-all duration-300 ${
          sidebarVisible ? "" : "hidden"
        }`}
      >
        <DashboardSidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          toggleSidebarVisibility={toggleSidebarVisibility}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          toggleSidebar={isMobile ? toggleSidebarVisibility : toggleSidebar}
          sidebarVisible={sidebarVisible}
        />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
