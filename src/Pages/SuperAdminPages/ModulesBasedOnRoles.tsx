import { useEffect, useState } from "react";
import { ModulesPurchase } from "./ModulesPurchase";
import ModulesActionsManagement from "../MasterAdminPages/ModuleManagement";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface TabNavigationProps {
  activeTab: "current" | "available";
  onChange: (tab: "current" | "available") => void;
}

// export const ModulesBasedOnRoles: React.FC<TabNavigationProps> = ({
//   activeTab,
//   onChange,
// }) => {
//   const [userType, setUserType] = useState<string | null>(null);
//   const { authState } = useContext(AuthContext);

//   useEffect(() => {
//     const userType = localStorage.getItem("user_type");
//     // const userType = authState.user_type ;
//     setUserType(userType);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navigation */}
//       {userType === "super_admin" && (
//         <div className="border-b border-gray-200 bg-white">
//           <nav className="mx-auto max-w-full px-2 sm:px-4 lg:px-6">
//             <div className="flex h-16 items-center justify-between">
//               <div className="flex w-full space-x-2 sm:space-x-4 overflow-x-auto">
//                 <button
//                   className={`whitespace-nowrap py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
//                     activeTab === "current"
//                       ? "bg-[#008F98] text-white hover:bg-[#008F98]"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                   onClick={() => onChange("current")}
//                 >
//                   Current Subscriptions
//                 </button>
//                 <button
//                   className={`whitespace-nowrap py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
//                     activeTab === "available"
//                       ? "bg-[#008F98] text-white hover:bg-[#008F98]"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                   onClick={() => onChange("available")}
//                 >
//                   Available Modules
//                 </button>
//               </div>
//             </div>
//           </nav>
//         </div>
//       )}
//       {/* Main Content */}
//       <div className="mx-auto ">
//         {userType === "master_admin" ? (
//           <ModulesActionsManagement />
//         ) : activeTab === "current" ? (
//           <ModulesActionsManagement />
//         ) : (
//           <ModulesPurchase />
//         )}
//       </div>
//     </div>
//   );
// };
export const ModulesBasedOnRoles: React.FC<TabNavigationProps> = ({
  activeTab,
  onChange,
}) => {
  const { authState } = useContext(AuthContext);
  const userType = authState.user_type;
  console.log(userType, "userTypemodule");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      {userType === "super_admin" && (
        <div className="border-b border-gray-200 bg-white">
          <nav className="mx-auto max-w-full px-2 sm:px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between">
              <div className="flex w-full space-x-2 sm:space-x-4 overflow-x-auto">
                <button
                  className={`whitespace-nowrap py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    activeTab === "current"
                      ? "bg-[#008F98] text-white hover:bg-[#008F98]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => onChange("current")}
                >
                  Current Subscriptions
                </button>
                <button
                  className={`whitespace-nowrap py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
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
      <div className="mx-auto ">
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
