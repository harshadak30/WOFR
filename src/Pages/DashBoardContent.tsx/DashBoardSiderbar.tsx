import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { DashboardRoutes } from "../../router/DashboardRoutes";


const DashboardSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => setIsOpen(!isOpen);
  const handleCloseSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        className="lg:hidden fixed top-7 mt-6  left-4 z-50 bg-white p-2 rounded shadow"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <div
        className={`fixed top-0 left-0 z-40 bg-white w-68 h-full border-r border-gray-200 pt-24 px-4 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:relative lg:flex lg:flex-col`}
      >
        <nav className="space-y-6 flex-1">
          {DashboardRoutes.map((item) => (
            <Link
              key={item.path}
              to={`/dashboard/${item.path}`}
              onClick={handleCloseSidebar}
              className={`relative flex items-center px-5 py-2 rounded-md transition-colors group ${
                location.pathname.includes(item.path)
                  ? "text-blue-600 bg-[#EFF6FF]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className={`absolute left-0 top-0 h-full w-1 rounded-r-md ${
                  location.pathname.includes(item.path)
                    ? "bg-[#0873ff]"
                    : "bg-transparent"
                }`}
              />
              <img
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className="m-1"
              />
              <span className="ml-3 font-medium text-lg">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;