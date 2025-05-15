// import { useState, useEffect } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, HelpCircle, LogOut, Menu, X } from "lucide-react";
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
//   const [isMobile, setIsMobile] = useState(false);


//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };


//     // Initial check
//     checkMobile();
   
//     // Add event listener for window resize
//     window.addEventListener("resize", checkMobile);
   
//     // Cleanup
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);


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
//         localStorage.removeItem("user_type");


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
 
//   // const userType = localStorage.getItem("user_type");
//   const userType ="dev";
//   return (
//     <aside
//       className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300
//       ${isOpen ? "w-64" : "w-20"}
//       ${isMobile ? "fixed shadow-lg" : "relative"} z-30`}
//     >
//       <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
//         <img
//           src={icons.logo}
//           alt="Dashboard logo"
//           className={`h-10 object-contain ${!isOpen && 'mx-auto'}`}
//         />
//         {isMobile && isOpen && (
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             <X size={20} />
//           </button>
//         )}
//       </div>


//       <div className="px-3 py-4 flex-1 overflow-y-auto">
//         {!isMobile && (
//           <button
//             onClick={toggleSidebar}
//             className="p-2 mb-4 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center justify-center w-full"
//           >
//             <Menu size={20} />
//             {isOpen && <span className="ml-2">Toggle Menu</span>}
//           </button>
//         )}
       
//         <nav className="space-y-2">
//           {DashboardRoutes.filter((item) =>
//             item.allowedRoles?.includes(userType)
//           ).map((item) => {
//             const visibleChildren = item.children?.filter((child) =>
//               child.allowedRoles?.includes(userType)
//             );


//             const isActiveParent = visibleChildren?.some((child) =>
//               location.pathname.startsWith(`/dashboard/${child.path}`)
//             ) || location.pathname === `/dashboard/${item.path}`;


//             return (
//               <div key={item.name} className="w-full">
//                 {visibleChildren && visibleChildren.length > 0 ? (
//                   <div>
//                     <button
//                       onClick={() => toggleExpand(item.name)}
//                       className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md
//                       ${isActiveParent
//                           ? "text-white bg-[#3BB6FE] font-medium"
//                           : "text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       <div className="flex items-center min-w-0">
//                         <span className={`h-5 w-5 ${isActiveParent ? "text-white" : "text-gray-500"}`}>
//                           {item.icon}
//                         </span>
//                         {isOpen && (
//                           <span className="ml-3 truncate">{item.name}</span>
//                         )}
//                       </div>
//                       {isOpen && (
//                         <ChevronDown
//                           size={16}
//                           className={`transform transition-transform ${
//                             expandedItems[item.name] ? "rotate-180" : ""
//                           } ${isActiveParent ? "text-white" : ""}`}
//                         />
//                       )}
//                     </button>


//                     {isOpen && expandedItems[item.name] && (
//                       <div className="ml-4 mt-1 space-y-1">
//                         {visibleChildren.map((child) => (
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
//                             onClick={isMobile ? toggleSidebar : undefined}
//                           >
//                             <span className={`h-5 w-5 ${location.pathname === `/dashboard/${child.path}` ? "text-white" : "text-gray-500"}`}>
//                               {child.icon}
//                             </span>
//                             {isOpen && (
//                               <span className="ml-3 truncate">
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
//                     onClick={isMobile ? toggleSidebar : undefined}
//                   >
//                     <span className={`h-5 w-5 ${location.pathname === `/dashboard/${item.path}` ? "text-white" : "text-gray-500"}`}>
//                       {item.icon}
//                     </span>
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
//         <button
//           className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 w-full"
//           onClick={isMobile ? toggleSidebar : undefined}
//         >
//           <HelpCircle size={20} className="text-gray-500" />
//           {isOpen && <span className="ml-3">Help</span>}
//         </button>
//         <button
//           className="flex items-center px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 w-full mt-2"
//           onClick={handleLogout}
//         >
//           <LogOut size={20} className="text-red-500" />
//           {isOpen && <span className="ml-3">Logout Account</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        localStorage.clear();
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/login"));
      }
    });
  };

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const userType = localStorage.getItem("user_type") || "dev";

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300
      ${isOpen ? "w-64" : "w-20"}
      ${isMobile ? "fixed shadow-lg" : "relative"} z-30`}
    >
      {/* Top bar */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
        <img
          src={icons.logo}
          alt="Dashboard logo"
          className={`h-10 object-contain ${!isOpen && 'mx-auto'}`}
        />
        {isMobile && isOpen && (
          <button onClick={toggleSidebar} className="text-gray-500">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Sidebar Menu */}
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 mb-4 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-full flex justify-start"
          >
            <Menu size={20} />
          </button>
        )}

        <nav className="space-y-2">
          {DashboardRoutes.filter(route => route.allowedRoles.includes(userType)).map((item) => {
            const visibleChildren = item.children?.filter(child => child.allowedRoles.includes(userType));
            const isParentActive = visibleChildren?.some(child =>
              location.pathname.startsWith(`/dashboard/${child.path}`)
            ) || location.pathname === `/dashboard/${item.path}`;

            return (
              <div key={item.name}>
                {/* Parent with children */}
                {visibleChildren && visibleChildren.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md
                        ${isParentActive ? "bg-[#3BB6FE] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      <div className="flex items-center">
                        <span className="text-gray-500">{item.icon}</span>
                        {isOpen && <span className="ml-3">{item.name}</span>}
                      </div>
                      {isOpen && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${expandedItems[item.name] ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>

                    {/* Children only when sidebar is open */}
                    {isOpen && expandedItems[item.name] && (
                      <div className="ml-4 mt-1 space-y-1">
                        {visibleChildren.map((child) => (
                          <NavLink
                            key={child.name}
                            to={`/dashboard/${child.path}`}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 text-sm rounded-md ${
                                isActive ? "bg-[#3BB6FE] text-white" : "text-gray-700 hover:bg-gray-100"
                              }`
                            }
                            onClick={isMobile ? toggleSidebar : undefined}
                          >
                            <span className="text-gray-500">{child.icon}</span>
                            {isOpen && <span className="ml-3">{child.name}</span>}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Single route
                  <NavLink
                    to={`/dashboard/${item.path}`}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm rounded-md ${
                        isActive ? "bg-[#3BB6FE] text-white" : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={isMobile ? toggleSidebar : undefined}
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    {isOpen && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Options */}
      <div className="p-3 border-t border-gray-200">
        <button
          className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 w-full"
          onClick={isMobile ? toggleSidebar : undefined}
        >
          <HelpCircle size={20} className="text-gray-500" />
          {isOpen && <span className="ml-3">Help</span>}
        </button>
        <button
          className="flex items-center px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 w-full mt-2"
          onClick={handleLogout}
        >
          <LogOut size={20} className="text-red-500" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

