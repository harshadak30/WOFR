import {
  CircleUserRound,
  LogOut,
} from "lucide-react";
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
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="relative ml-2 md:ml-10">
              <h3 className="text-2xl font-semibold">Welcome back {user}!!</h3>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center m-3 bg-[#262e2b] hover:bg-[#059641] text-white py-2 px-4  rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60  cursor-pointer"
              aria-label="logout"
            >
              <span className="font-medium" onClick={handleLogout}>
                <LogOut />
              </span>
            </button>

            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                <CircleUserRound className="h-7 w-7" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
