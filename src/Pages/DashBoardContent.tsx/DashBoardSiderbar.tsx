// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { ChevronDown, Menu } from "lucide-react";
// import { DashboardRoutes } from "../../router/DashboardRoutes";
// import clsx from "clsx";

// const DashboardSidebar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [expandedItems, setExpandedItems] = useState<string[]>(["leases"]);

//   const toggleExpand = (title: string) => {
//     setExpandedItems((prev) =>
//       prev.includes(title)
//         ? prev.filter((item) => item !== title)
//         : [...prev, title]
//     );
//   };
//   const isActive = (path: string) => {
//     if (path === "/") {
//       return location.pathname === "/";
//     }
//     return location.pathname.startsWith(path);
//   };

//   const handleToggleSidebar = () => setIsOpen(!isOpen);
//   const handleCloseSidebar = () => setIsOpen(false);

//   return (
//     <>
//       <button
//         onClick={handleToggleSidebar}
//         className="lg:hidden fixed  m-3 z-50 bg-white p-2 rounded shadow"
//       >
//         <Menu className="w-6 h-6 text-gray-700" />
//       </button>

//       <div
//         className={`fixed top-0 left-0 z-40 bg-white w-68 h-full border-r border-gray-200 pt-24 px-4 transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0 lg:relative lg:flex lg:flex-col`}
//       >
//         <nav className="space-y-6 flex-1">
//           {DashboardRoutes.map((item) => (
//             <div key={item.path}>
//               {item.items ? (
//                 <>
//                   <button
//                     onClick={() => toggleExpand(item.label.toLowerCase())}
//                     className={clsx(
//                       "group relative flex items-center px-5 py-2 rounded-md transition-colors group",
//                       isActive(item.path)
//                         ? "text-blue-600 bg-[#EFF6FF]"
//                         : "text-gray-700 hover:bg-gray-100"
//                     )}
//                   >
//                     <div className="flex items-center">
//                       <img
//                         src={item.icon}
//                         alt={item.label}
//                         width={20}
//                         height={20}
//                         className="m-1"
//                       />
//                       <span className="ml-3 font-medium text-lg">{item.label}</span>
//                     </div>
//                     <ChevronDown
//                       className={clsx(
//                         "h-4 w-4 transition-transform duration-150",
//                         {
//                           "transform rotate-180": expandedItems.includes(
//                             item.label.toLowerCase()
//                           ),
//                         }
//                       )}
//                     />
//                   </button>

//                   {expandedItems.includes(item.label.toLowerCase()) && (
//                     <div className="mt-1 ml-4 pl-3 space-y-1">
//                       {item.items.map((subItem) => (
//                         <Link
//                           key={subItem.label}
//                           to={subItem.path}
//                           className={clsx(
//                             "group flex items-center px-2 py-2 text-lg font-medium rounded-md transition-colors duration-150 ease-in-out",
//                             location.pathname === subItem.path
//                               ? "text-blue-600 bg-[#EFF6FF]"
//                               : "text-gray-700 hover:bg-gray-100"
//                           )}
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <Link
//                   key={item.path}
//                   to={`/dashboard/${item.path}`}
//                   onClick={handleCloseSidebar}
//                   className={`relative flex items-center px-5 py-2 rounded-md transition-colors group ${
//                     location.pathname.includes(item.path)
//                       ? "text-blue-600 bg-[#EFF6FF]"
//                       : "text-gray-700 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span
//                     className={`absolute left-0 top-0 h-full w-1 rounded-r-md ${
//                       location.pathname.includes(item.path)
//                         ? "bg-[#0873ff]"
//                         : "bg-transparent"
//                     }`}
//                   />
//                   <img
//                     src={item.icon}
//                     alt={item.label}
//                     width={20}
//                     height={20}
//                     className="m-1"
//                   />
//                   <span className="ml-3 font-medium text-lg">{item.label}</span>
//                 </Link>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default DashboardSidebar;

import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle, LogOut } from "lucide-react";
import { DashboardRoutes } from "../../router/DashboardRoutes";
import Swal from "sweetalert2";
import icons from "../../../public/icons/index";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DashboardSidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();
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
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "User Management": true,
  });

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } fixed md:relative z-30`}
    >
      <div className="p-1 h-20 flex items-center justify-between border-b border-gray-200">
        {/* <Logo collapsed={!isOpen} /> */}
        <img
          src={icons.logo}
          alt="Dashbaord-logo"
          className="w-50 h-auto items-center p-5 lg:p-10"
        />
      </div>

      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {DashboardRoutes.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
                      location.pathname.startsWith(item.path)
                        ? "text-blue-700 bg-blue-50 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center min-w-0">
                      <span className="h-5 w-5 text-gray-500">{item.icon}</span>
                      {isOpen && (
                        <span className="ml-3 truncate">{item.name}</span>
                      )}
                    </div>
                    {isOpen && item.children && (
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform ${
                          expandedItems[item.name] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {isOpen && expandedItems[item.name] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-3 py-2 text-sm rounded-md ${
                              isActive
                                ? "text-blue-700 bg-blue-50 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-md ${
                      isActive
                        ? "text-blue-700 bg-blue-50 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="h-5 w-5 text-gray-500">{item.icon}</span>
                  {isOpen && <span className="ml-3 truncate">{item.name}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-gray-200">
        <button className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 w-full">
          <HelpCircle size={20} className="text-gray-500" />
          {isOpen && <span className="ml-3">Help</span>}
        </button>
        <button
          className="flex items-center px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 w-full "
          onClick={handleLogout}
        >
          <LogOut size={20} className="text-red-500" />
          {isOpen && <span className="ml-3">Logout Account</span>}
        </button>
      </div>
    </aside>
  );
};
