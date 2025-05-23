import { useState, useCallback, useMemo, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HelpCircle, LogOut, X, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import { DashboardRoutes } from "../../router/DashboardRoutes";
import icons from "../../../public/icons/index";
import { AuthContext } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  toggleSidebarVisibility: () => void;
}

export const DashboardSidebar = ({
  isOpen,
  isMobile,
  toggleSidebar,
  toggleSidebarVisibility,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const { authState, logout } = useContext(AuthContext);

  // Prefer user_type from context state or fallback to localStorage
  const userType = useMemo(
    () => authState.user_type || localStorage.getItem("user_type") || "dev",
    [authState.user_type]
  );

  const toggleExpand = useCallback((name: string) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const handleLogout = useCallback(() => {
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
        logout();
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate("/login"));
      }
    });
  }, [logout, navigate]);

  const filteredRoutes = useMemo(
    () =>
      DashboardRoutes.filter((route) => route.allowedRoles.includes(userType)),
    [userType]
  );

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300
      ${isOpen ? "w-64" : "w-20"}
      ${isMobile ? "fixed shadow-lg" : "relative"} z-30`}
    >
      {/* Top Logo and Toggle */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
        {(!isMobile || isOpen) && (
          <img
            src={icons.logo}
            alt="Dashboard logo"
            className={`h-15 object-contain ${
              !isOpen && !isMobile ? "mx-auto" : ""
            }`}
            loading="lazy"
          />
        )}

        <div className="flex justify-end w-full">
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 bg-gray-100"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          )}
          {isMobile && (
            <button
              onClick={toggleSidebarVisibility}
              className="p-2 ml-1 rounded-full hover:bg-gray-100 text-gray-500"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <nav className="space-y-2">
          {filteredRoutes.map((item) => {
            const visibleChildren = useMemo(
              () =>
                item.children?.filter((child) =>
                  child.allowedRoles.includes(userType)
                ),
              [item.children, userType]
            );

            const isParentActive = useMemo(
              () =>
                visibleChildren?.some((child) =>
                  location.pathname.startsWith(`/dashboard/${child.path}`)
                ) || location.pathname === `/dashboard/${item.path}`,
              [visibleChildren, location.pathname, item.path]
            );

            return (
              <div key={item.name}>
                {visibleChildren && visibleChildren.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`flex items-center justify-start w-full px-3 py-2 text-sm rounded-md
                        ${
                          isParentActive
                            ? "bg-[#3BB6FE] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <span className="text-gray-500">{item.icon}</span>
                      {isOpen && !isMobile && (
                        <span className="ml-2">{item.name}</span>
                      )}
                    </button>

                    {expandedItems[item.name] && (
                      <div
                        className={`mt-1 space-y-1 ${
                          isOpen
                            ? "ml-4"
                            : "flex flex-col items-center justify-center"
                        }`}
                      >
                        {visibleChildren.map((child) => (
                          <NavLink
                            key={child.name}
                            to={`/dashboard/${child.path}`}
                            className={({ isActive }) =>
                              `flex items-center ${
                                isOpen ? "px-3" : "justify-center"
                              } py-2 text-sm rounded-md ${
                                isActive
                                  ? "bg-[#3BB6FE] text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`
                            }
                            onClick={() => {
                              if (isMobile) toggleSidebarVisibility();
                            }}
                          >
                            <span className="text-gray-500">{child.icon}</span>
                            {isOpen && (
                              <span className="ml-3">{child.name}</span>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={`/dashboard/${item.path}`}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm rounded-md ${
                        isActive
                          ? "bg-[#3BB6FE] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => {
                      if (isMobile) toggleSidebarVisibility();
                    }}
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    {isOpen && !isMobile && (
                      <span className="ml-3">{item.name}</span>
                    )}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="p-3 border-t border-gray-200">
        <button className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 w-full">
          <HelpCircle size={20} className="text-gray-500" />
          {isOpen && !isMobile && <span className="ml-3">Help</span>}
        </button>
        <button
          className="flex items-center px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 w-full mt-2"
          onClick={handleLogout}
        >
          <LogOut size={20} className="text-red-500" />
          {isOpen && !isMobile && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};
