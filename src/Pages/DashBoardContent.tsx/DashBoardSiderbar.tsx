import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle, LogOut, Menu } from "lucide-react";
import { DashboardRoutes } from "../../router/DashboardRoutes";
import Swal from "sweetalert2";
import icons from "../../../public/icons/index";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const DashboardSidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("user_type");

        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "User Management": true,
  });

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  const userType = localStorage.getItem("user_type");
  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } fixed md:relative z-30`}
    >
      <div className="h-20 flex items-center justify-center border-b border-gray-200">
        <img
          src={icons.logo}
          alt="Dashboard logo"
          className="h-10 object-contain"
        />
      </div>

      <div className="px-3 py-2 flex-1 overflow-y-auto">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
        >
          <Menu size={24} />
        </button>
        <nav className="space-y-1">
          {DashboardRoutes.filter((item) =>
            item.allowedRoles?.includes(userType)
          ).map((item) => {
            const visibleChildren = item.children?.filter((child) =>
              child.allowedRoles?.includes(userType)
            );

            const isActiveParent = visibleChildren?.some((child) =>
              location.pathname.startsWith(`/dashboard/${child.path}`)
            );

            return (
              <div key={item.name}>
                {visibleChildren && visibleChildren.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
                        isActiveParent
                          ? "text-white bg-[#3BB6FE] font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center min-w-0">
                        <span className="h-5 w-5 text-gray-500">
                          {item.icon}
                        </span>
                        {isOpen && (
                          <span className="ml-3 truncate">{item.name}</span>
                        )}
                      </div>
                      {isOpen && (
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            expandedItems[item.name] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {isOpen && expandedItems[item.name] && (
                      <div className="ml-4 mt-1 space-y-1">
                        {visibleChildren.map((child) => (
                          <NavLink
                            key={child.name}
                            to={`/dashboard/${child.path}`}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 text-sm rounded-md ${
                                isActive
                                  ? "text-white bg-[#3BB6FE] font-medium"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`
                            }
                          >
                            <span className="h-5 w-5 text-gray-500">
                              {child.icon}
                            </span>
                            {isOpen && (
                              <span className="ml-3 truncate">
                                {child.name}
                              </span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={`/dashboard/${item.path}`}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm rounded-md ${
                        isActive
                          ? "text-white bg-[#3BB6FE] font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <span className="h-5 w-5 text-gray-500">{item.icon}</span>
                    {isOpen && (
                      <span className="ml-3 truncate">{item.name}</span>
                    )}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-200">
        <button className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 w-full">
          <HelpCircle size={20} className="text-gray-500" />
          {isOpen && <span className="ml-3">Help</span>}
        </button>
        <button
          className="flex items-center px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 w-full"
          onClick={handleLogout}
        >
          <LogOut size={20} className="text-red-500" />
          {isOpen && <span className="ml-3">Logout Account</span>}
        </button>
      </div>
    </aside>
  );
};

// import { useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, HelpCircle, LogOut, Menu } from "lucide-react";
// import { DashboardRoutes } from "../../router/DashboardRoutes";
// import Swal from "sweetalert2";
// import icons from "../../../public/icons/index";

// interface SidebarProps {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
//   toggleSidebar: () => void;
// }

// export const DashboardSidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, logout!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("name");
//         localStorage.removeItem("token");

//         Swal.fire({
//           title: "Logged out!",
//           text: "You have been logged out successfully.",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         }).then(() => {
//           navigate("/login");
//         });
//       }
//     });
//   };

//   const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
//     "User Management": true,
//   });

//   const toggleExpand = (name: string) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   return (
//     <aside
//       className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
//         isOpen ? "w-64" : "w-20"
//       } fixed md:relative z-30`}
//     >
//       <div className="  h-20 flex items-center justify-center border-b border-gray-200">
//         <img
//           src={icons.logo}
//           alt="Dashboard logo"
//           className="h-10 object-contain"
//         />
//       </div>

//       <div className="px-3 py-2 flex-1 overflow-y-auto">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
//         >
//           <Menu size={24} />
//         </button>
//         <nav className="space-y-1">
//           {DashboardRoutes.map((item) => {
//             const isActiveParent = item.children?.some((child) =>
//               location.pathname.startsWith(`/dashboard/${child.path}`)
//             );

//             return (
//               <div key={item.name}>
//                 {item.children ? (
//                   <div>
//                     <button
//                       onClick={() => toggleExpand(item.name)}
//                       className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
//                         isActiveParent
//                           ? "text-white bg-[#3BB6FE] font-medium"
//                           : "text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       <div className="flex items-center min-w-0">
//                         <span className="h-5 w-5 text-gray-500">
//                           {item.icon}
//                         </span>
//                         {isOpen && (
//                           <span className="ml-3 truncate">{item.name}</span>
//                         )}
//                       </div>
//                       {isOpen && item.children && (
//                         <ChevronDown
//                           size={16}
//                           className={`transform transition-transform ${
//                             expandedItems[item.name] ? "rotate-180" : ""
//                           }`}
//                         />
//                       )}
//                     </button>
//                     {isOpen && expandedItems[item.name] && (
//                       <div className="ml-4 mt-1 space-y-1">
//                         {item.children.map((child) => (
//                           <NavLink
//                             key={child.name}
//                             to={`/dashboard/${child.path}`}
//                             className={({ isActive }) =>
//                               `flex items-center px-3 py-2 text-sm rounded-md ${
//                                 isActive
//                                   ? "text-white bg-[#3BB6FE] font-medium"
//                                   : "text-gray-700 hover:bg-gray-100"
//                               }`
//                             }
//                           >
//                             <span className="h-5 w-5 text-gray-500">
//                               {child.icon}
//                             </span>
//                             {isOpen && (
//                               <span className="ml-3 truncate">
//                                 {" "}
//                                 {child.name}
//                               </span>
//                             )}
//                           </NavLink>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <NavLink
//                     to={`/dashboard/${item.path}`}
//                     className={({ isActive }) =>
//                       `flex items-center px-3 py-2 text-sm rounded-md ${
//                         isActive
//                           ? "text-white bg-[#3BB6FE] font-medium"
//                           : "text-gray-700 hover:bg-gray-100"
//                       }`
//                     }
//                   >
//                     <span className="h-5 w-5 text-gray-500">{item.icon}</span>
//                     {isOpen && (
//                       <span className="ml-3 truncate">{item.name}</span>
//                     )}
//                   </NavLink>
//                 )}
//               </div>
//             );
//           })}
//         </nav>
//       </div>

//       <div className="p-3 border-t border-gray-200">
//         <button className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 w-full">
//           <HelpCircle size={20} className="text-gray-500" />
//           {isOpen && <span className="ml-3">Help</span>}
//         </button>
//         <button
//           className="flex items-center px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 w-full"
//           onClick={handleLogout}
//         >
//           <LogOut size={20} className="text-red-500" />
//           {isOpen && <span className="ml-3">Logout Account</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };
