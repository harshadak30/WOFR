import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "../../Pages/DashBoardContent.tsx/DashBoardSiderbar";
import { DashboardHeader } from "../../Pages/DashBoardContent.tsx/DashBoardHeader";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#f0f1f5] relative">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleOverlayClick}
        ></div>
      )}

      <DashboardSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isMobile && sidebarOpen ? "ml-0" : ""
        }`}
      >
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
