import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

export const DashboardHeader = () => {
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard/overview":
        return "Welcome back, John!";
      case "/dashboard/modules":
        return "Modules/Actions Management";
      case "/dashboard/users":
        return "User Management";
      case "/dashboard/new":
        return "Our User Management";
      case "/dashboard/roles":
        return "Our role Management";
      case "/dashboard/financial":
        return "Financial Dashboard";
      default:
        if (location.pathname.startsWith("/users/")) {
          return "User Profile";
        }
        return "Dashboard";
    }
  };

  const getPageDescription = () => {
    switch (location.pathname) {
      case "/dashboard/overview":
        return "Here's what's happening with your enterprise dashboard today.";
      case "/dashboard/modules":
        return "Manage your application modules and their settings.";
      case "/dashboard/users":
        return "View and manage your organization's users and their access rights.";
      case "/dashboard/new":
        return "View and manage your organization's users and their access rights.";
      case "/dashboard/roles":
        return "View and manage your organization's users and their access rights.";
      case "/dashboard/financial":
        return "View financial reports and analytics.";
      default:
        return "";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 z-20">
      <div className="px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
            {getPageDescription() && (
              <p className="text-sm text-gray-500 mt-1">
                {getPageDescription()}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
            <button className="flex items-center">
              <img
                src="https://i.pravatar.cc/40?img=68"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
