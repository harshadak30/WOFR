import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardHeader: React.FC = () => {
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

  const user = localStorage.getItem("name");
  return (
    <header className="  p-6">
      <div className="flex justify-between items-center">
        <div id="search-bar" className="relative flex-1 max-w-md space-y-2.5">
          {/* <Select>
            <SelectTrigger className="w-[180px] border-gray-300  text-black  font-semibold cursor-not-allowed">
              <SelectValue placeholder="Select Entity" />
            </SelectTrigger>
            <SelectContent className="border-gray-300">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="super">Super Admin</SelectItem>
            </SelectContent>
          </Select> */}
          <h3 className=" ml-5.5 text-2xl font-semibold">Hey {user}!!</h3>
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center m-1 bg-[#2563EB] hover:bg-[#2553eb] text-white py-2 px-4 rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60 cursor-pointer"
            aria-label="Add new user"
          >
            <span className="font-medium">Export</span>
          </button>
          <button
            className="flex items-center  bg-[#059669] hover:bg-[#059641] text-white py-2 px-4  rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60  cursor-pointer"
            aria-label="logout"
          >
            <Plus size={16} />
            <span className="font-medium">New Lease</span>
          </button>
          <button
            className="flex items-center m-1 bg-[#059669] hover:bg-[#059641] text-white py-2 px-4  rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60  cursor-pointer"
            aria-label="logout"
          >
            <span className="font-medium" onClick={handleLogout}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
