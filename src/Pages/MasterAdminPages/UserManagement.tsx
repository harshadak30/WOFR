import React, { useEffect, useState } from "react";
import { ChevronDown, Edit2 } from "lucide-react";
import TableHeader from "../../component/common/ui/TableHeader";
import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import { UserData } from "../../types";
import { moduleOptions, roleOptions, userData } from "../../data/mockData";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserManagementProps {
  isReadOnly: boolean;
  searchTerm?: string; // Make searchTerm optional
}
type ModuleView = {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
};


const UserManagement: React.FC<UserManagementProps> = ({
  isReadOnly,
  searchTerm = "",
}) => {
  const [users, setUsers] = useState<UserData[]>(userData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    type: "role" | "module";
  } | null>(null);
  // const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userSelectedRoles, setUserSelectedRoles] = useState<
    Record<number, string[]>
  >({});
  const [userSelectedModules, setUserSelectedModules] = useState<
    Record<number, string[]>
  >({});


  useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://192.168.29.82:8000/api/v1/tenant-user?page=1&limit=10&sort_by=created_at&sort_order=asc`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with actual token logic
              Accept: "application/json",
            },
          }
        );
  console.log("response", response);
  
        const rawUsers = response.data.data.tenant_users;
        console.log("rawUsers", rawUsers);
        // Map API response to match UserData type
        const mappedUsers: UserData[] = rawUsers.map((user: any, index: number) => ({
          id: index + 1, // You can use `user.tenant_user_id` if it's guaranteed to be unique
          name: user.name,
          email: user.email,
          OrgName: user.tenant_name,
          created: new Date(user.created_at).toLocaleDateString(),
          enabled: true, // or user.status if available
        }));
  
        setUsers(mappedUsers);
      } catch (err: any) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [currentPage]);
  
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.OrgName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleToggleChange = (id: number) => {
    if (isReadOnly) return;
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, enabled: !user.enabled } : user
      )
    );
  };

  const handleToNavigate = (user: UserData) => {
    navigate(`userDetails/${user.id}`, {
      state: {
        user,
        roles: userSelectedRoles[user.id] || [],
        modules: userSelectedModules[user.id] || [],
      },
    });
  };

  const handleApplyRoles = (userId: number, selectedRoles: string[]) => {
    if (isReadOnly) return;
    setUserSelectedRoles({
      ...userSelectedRoles,
      [userId]: selectedRoles,
    });
    setSelectedUser(null);
  };

  const handleApplyModules = (userId: number, selectedModules: string[]) => {
    if (isReadOnly) return;
    setUserSelectedModules({
      ...userSelectedModules,
      [userId]: selectedModules,
    });
    setSelectedUser(null);
  };

  const handleResetRoles = (userId: number) => {
    if (isReadOnly) return;
    setUserSelectedRoles({
      ...userSelectedRoles,
      [userId]: [],
    });
  };

  const handleResetModules = (userId: number) => {
    if (isReadOnly) return;
    setUserSelectedModules({
      ...userSelectedModules,
      [userId]: [],
    });
  };

  const toggleDropdown = (userId: number, type: "role" | "module") => {
    if (isReadOnly) return;
    setSelectedUser(
      selectedUser?.id === userId && selectedUser?.type === type
        ? null
        : { id: userId, type }
    );
  };

  const getSelectedText = (userId: number, type: "role" | "module") => {
    const items =
      type === "role" ? userSelectedRoles[userId] : userSelectedModules[userId];
    if (!items?.length) return type === "role" ? "Roles" : "Standard";

    const options = type === "role" ? roleOptions : moduleOptions;
    const selectedLabels = items
      .map((id) => options.find((opt) => opt.id === id)?.label)
      .filter(Boolean);

    return (
      <div className="relative group">
        <span>{`${selectedLabels.length} Selected`}</span>
        <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md p-2 hidden group-hover:block z-50 min-w-[200px]">
          <ul className="text-sm">
            {selectedLabels.map((label, index) => (
              <li key={index} className="py-1">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader className="pl-6">ITEM</TableHeader>
                  <TableHeader>USER</TableHeader>
                  <TableHeader>EMAIL</TableHeader>
                  <TableHeader>ROLES</TableHeader>
                  <TableHeader>CREATED</TableHeader>
                  <TableHeader>EDIT</TableHeader>
                  <TableHeader>ENABLE/DISABLE</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 ${
                      isReadOnly ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(user.id, "role")}
                          className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${
                            isReadOnly
                              ? "cursor-not-allowed opacity-75"
                              : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          }`}
                          disabled={isReadOnly}
                        >
                          {getSelectedText(user.id, "role")}
                          <ChevronDown size={16} className="ml-2" />
                        </button>

                        {!isReadOnly &&
                          selectedUser?.id === user.id &&
                          selectedUser?.type === "role" && (
                            <div className="absolute z-10 mt-1 w-72">
                              <MultiSelectDropdown
                                title="Roles"
                                options={roleOptions}
                                selectedOptions={
                                  userSelectedRoles[user.id] || []
                                }
                                onApply={(selected) =>
                                  handleApplyRoles(user.id, selected)
                                }
                                onReset={() => handleResetRoles(user.id)}
                              />
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.created}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`text-gray-500 ${
                          isReadOnly
                            ? "cursor-not-allowed opacity-50"
                            : "hover:text-gray-700"
                        }`}
                        onClick={() => handleToNavigate(user)}
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Toggle
                        enabled={user.enabled}
                        onChange={() => handleToggleChange(user.id)}
                        className={isReadOnly ? "opacity-50" : ""}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
