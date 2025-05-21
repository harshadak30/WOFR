import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Bell, ChevronRight, Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar?: () => void;
  sidebarVisible?: boolean;
}

// Path-based page information mapping
const PAGE_INFO = {
  "/dashboard/overview": {
    title: "Welcome back, John!",
    description:
      "Here's what's happening with your enterprise dashboard today.",
  },
  "/dashboard/modules": {
    title: "Modules/Actions Management",
    description: "Manage your application modules and their settings.",
  },
  "/dashboard/users": {
    title: "User Management",
    description:
      "View and manage your organization's users and their access rights.",
  },
  "/dashboard/new": {
    title: "Our User Management",
    description:
      "View and manage your organization's users and their access rights.",
  },
  "/dashboard/roles": {
    title: "Our role Management",
    description:
      "View and manage your organization's users and their access rights.",
  },
  "/dashboard/financial": {
    title: "Financial Dashboard",
    description: "View financial reports and analytics.",
  },
  "/dashboard/role-management": {
    title: "Role Management",
    description: "View and manage your roles and thier permissions.",
  },
};

export const DashboardHeader = ({
  toggleSidebar,
  sidebarVisible = true,
}: HeaderProps) => {
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Optimize resize handling with useCallback
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Optimize click outside handler with useCallback
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Element;
      if (isNotificationsOpen && !target.closest("[data-notifications]")) {
        setIsNotificationsOpen(false);
      }
    },
    [isNotificationsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Memoize page info to prevent recalculations on every render
  const { pageTitle, pageDescription } = useMemo(() => {
    const pathInfo = PAGE_INFO[location.pathname as keyof typeof PAGE_INFO];

    if (pathInfo) {
      return {
        pageTitle: pathInfo.title,
        pageDescription: pathInfo.description,
      };
    }

    // Handle default cases
    if (location.pathname.startsWith("/users/")) {
      return {
        pageTitle: "User Profile",
        pageDescription: "",
      };
    }

    return {
      pageTitle: "Dashboard",
      pageDescription: "",
    };
  }, [location.pathname]);

  // Toggle notifications with useCallback
  const toggleNotifications = useCallback(() => {
    setIsNotificationsOpen((prev) => !prev);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 z-20 sticky top-0">
      <div className="px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              {sidebarVisible ? <Menu size={20} /> : <ChevronRight size={20} />}
            </button>
          )}

          <div className={isMobile ? "max-w-[200px]" : ""}>
            <h1
              className={`font-semibold text-gray-800 ${
                isMobile ? "text-lg" : "text-2xl"
              } truncate`}
            >
              {pageTitle}
            </h1>
            {pageDescription && !isMobile && (
              <p className="text-sm text-gray-500 mt-1 truncate">
                {pageDescription}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4 left-2">
          <div className="relative" data-notifications>
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none relative"
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
            >
              <Bell size={26} />
              <span
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                aria-label="New notifications"
              ></span>
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-md py-2 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                    >
                      <p className="text-sm font-medium text-gray-800">
                        New user registered
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        10 minutes ago
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button className="flex items-center" aria-label="User profile">
              <img
                src="https://i.pravatar.cc/40?img=68"
                alt="User profile"
                className="w-9 h-9 rounded-full border-2 border-gray-200"
                width="36"
                height="36"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile description */}
      {isMobile && pageDescription && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500">{pageDescription}</p>
        </div>
      )}
    </header>
  );
};
