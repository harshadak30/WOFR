import { useEffect, useState } from "react";
import ModulesActionsManagement from "../MasterAdminPages/ModuleManagementPage";
import { ModulesPurchase } from "./ModulesPurchase";

interface TabNavigationProps {
  activeTab: "current" | "available";
  onChange: (tab: "current" | "available") => void;
}

export const ModulesBasedOnRoles: React.FC<TabNavigationProps> = ({
  activeTab,
  onChange,
}) => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem("user_type");
    setUserType(type);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      {userType === "super_admin" && (
        <div className="border-b border-gray-200 bg-white">
          <nav className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex space-x-4">
                <button
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === "current"
                      ? "bg-[#008F98] text-white hover:bg-[#008F98]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => onChange("current")}
                >
                  Current Subscriptions
                </button>
                <button
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === "available"
                      ? "bg-[#008F98] text-white hover:bg-[#008F98]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => onChange("available")}
                >
                  Available Modules
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
      {/* Main Content */}
      <div className="mx-auto p-4">
        {userType === "master_admin" ? (
          <ModulesActionsManagement />
        ) : activeTab === "current" ? (
          <ModulesActionsManagement />
        ) : (
          <ModulesPurchase />
        )}
      </div>
    </div>
  );
};
