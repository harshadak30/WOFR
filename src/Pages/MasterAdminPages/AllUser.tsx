import UserManagement from "./UserManagement";
import ExternalOrganizationUser from "./ExternalOrganizationsUser";
import { useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";

function Alluser() {
  const [showModuleView, setShowModuleView] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem("user_type");
    setUserType(type);
  }, []);

  const handleToggleView = () => {
    setShowModuleView((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {userType === "master_admin" && showModuleView
                ? "External Organization User"
                : "Our Users Management"}
            </h2>

            {userType === "master_admin" && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Toggle View:</span>
                <button onClick={handleToggleView}>
                  {showModuleView ? <ToggleLeft /> : <ToggleRight />}
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="mx-auto">
        {userType === "master_admin" ? (
          showModuleView ? (
            <ExternalOrganizationUser isReadOnly={true} />
          ) : (
            <UserManagement isReadOnly={false} />
          )
        ) : (
          <UserManagement isReadOnly={false} />
        )}
      </div>
    </div>
  );
}

export default Alluser;
