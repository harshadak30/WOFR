import { useState } from "react";
import { Search, Edit, ChevronDown } from "lucide-react";
import { Switch } from "../../../component/common/ui/Switch";
import { DataTable } from "../../../component/common/ui/DataTable";


interface UserData {
  id: number;
  name: string;
  email: string;
  roles: string[];
  modules: string[];
  created: string;
  enabled: boolean;
}

const availableRoles = ["Admin", "Editor", "Viewer", "Manager", "Developer"];
const availableModules = ["Standard", "Premium", "Enterprise", "Custom"];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [tempRoles, setTempRoles] = useState<string[]>([]);
  const [tempModules, setTempModules] = useState<string[]>([]);
  const itemsPerPage = 10;

  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      name: "sam",
      email: "name@gmail.com",
      roles: ["Admin"],
      modules: ["Standard"],
      created: "dd/mm/yy",
      enabled: true,
    },

    {
      id: 2,
      name: "john",
      email: "name@gmail.com",
      roles: ["Admin"],
      modules: ["Standard"],
      created: "dd/mm/yy",
      enabled: true,
    },
    {
      id: 3,
      name: "sid",
      email: "name@gmail.com",
      roles: ["Admin"],
      modules: ["Standard"],
      created: "dd/mm/yy",
      enabled: true,
    },
    // ... other users
  ]);

  const handleDropdownToggle = (type: string, userId: number) => {
    const dropdownId = `${type}-${userId}`;
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
      const user = users.find((u) => u.id === userId);
      if (type === "roles") {
        setTempRoles(user?.roles || []);
      } else {
        setTempModules(user?.modules || []);
      }
    }
  };

  const handleApplySelection = (type: string, userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            [type]: type === "roles" ? tempRoles : tempModules,
          };
        }
        return user;
      })
    );
    setActiveDropdown(null);
  };

  const handleCancelSelection = () => {
    setActiveDropdown(null);
  };

  const columns = [
    {
      header: "ITEM",
      accessor: "id",
      className: "w-16 hidden md:table-cell",
    },
    {
      header: "USER",
      accessor: "name",
      className: "w-40",
    },
    {
      header: "EMAIL",
      accessor: "email",
      className: "w-56 hidden md:table-cell",
    },
    {
      header: "ROLES",
      accessor: (row: UserData) => (
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("roles", row.id)}
            className="flex items-center justify-between w-full px-2 py-1 text-sm bg-gray-50 rounded hover:bg-gray-100"
          >
            <span className="truncate">{row.roles.join(", ")}</span>
            <ChevronDown
              size={16}
              className={
                activeDropdown === `roles-${row.id}`
                  ? "transform rotate-180"
                  : ""
              }
            />
          </button>

          {activeDropdown === `roles-${row.id}` && (
            <div className="absolute z-10 w-48 mt-1 bg-white rounded-md shadow-lg border border-gray-200">
              <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
                {availableRoles.map((role) => (
                  <label
                    key={role}
                    className="flex items-center p-2 hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={tempRoles.includes(role)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTempRoles([...tempRoles, role]);
                        } else {
                          setTempRoles(tempRoles.filter((r) => r !== role));
                        }
                      }}
                      className="mr-2"
                    />
                    {role}
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 p-2 border-t">
                <button
                  onClick={handleCancelSelection}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApplySelection("roles", row.id)}
                  className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      ),
      className: "w-40",
    },
    {
      header: "MODULES",
      accessor: (row: UserData) => (
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("modules", row.id)}
            className="flex items-center justify-between w-full px-2 py-1 text-sm bg-gray-50 rounded hover:bg-gray-100"
          >
            <span className="truncate">{row.modules.join(", ")}</span>
            <ChevronDown
              size={16}
              className={
                activeDropdown === `modules-${row.id}`
                  ? "transform rotate-180"
                  : ""
              }
            />
          </button>

          {activeDropdown === `modules-${row.id}` && (
            <div className="absolute z-10 w-48 mt-1 bg-white rounded-md shadow-lg border border-gray-200">
              <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
                {availableModules.map((module) => (
                  <label
                    key={module}
                    className="flex items-center p-2 hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={tempModules.includes(module)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTempModules([...tempModules, module]);
                        } else {
                          setTempModules(
                            tempModules.filter((m) => m !== module)
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    {module}
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 p-2 border-t">
                <button
                  onClick={handleCancelSelection}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApplySelection("modules", row.id)}
                  className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      ),
      className: "w-40",
    },
    {
      header: "CREATED",
      accessor: "created",
      className: "w-32 text-center hidden md:table-cell",
    },
    {
      header: "PERMISSION",
      accessor: (row: UserData) => (
        <div className="flex justify-center">
          <button className="p-2 text-gray-500 hover:text-blue-700 rounded-full hover:bg-gray-100">
            <Edit size={18} />
          </button>
        </div>
      ),
      className: "w-32 text-center",
    },
    {
      header: "ENABLE/DISABLE",
      accessor: (row: UserData) => (
        <div className="flex justify-center">
          <Switch
            checked={row.enabled}
            onChange={() => handleToggleUser(row.id)}
          />
        </div>
      ),
      className: "w-40 text-center hidden md:table-cell",
    },
  ];

  const handleToggleUser = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, enabled: !user.enabled } : user
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden p-10 space-y-6">
        <DataTable
          columns={columns}
          data={users
            .filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
          pagination={{
            totalItems: users.length,
            itemsPerPage,
            currentPage,
            onPageChange: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
};
