import React, { useState } from "react";
import { ChevronDown, Edit2 } from "lucide-react";
import TableHeader from "../../component/common/ui/TableHeader";
import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import { UserData } from "../../types";
import { moduleOptions, roleOptions, userData } from "../../data/mockData";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";
import { useNavigate } from "react-router-dom";

interface ExternalOrganizationUserProps {
  isReadOnly: boolean;
  searchTerm?: string; // Make searchTerm optional
}

const ExternalOrganizations: React.FC<ExternalOrganizationUserProps> = ({
  isReadOnly,
  searchTerm = "",
}) => {
  const [users, setUsers] = useState<UserData[]>(userData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    type: "role" | "module";
  } | null>(null);

  const [userSelectedRoles, setUserSelectedRoles] = useState<
    Record<number, string[]>
  >({});
  const [userSelectedModules, setUserSelectedModules] = useState<
    Record<number, string[]>
  >({});

  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.OrgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone &&
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleToggleChange = (id: number) => {
    if (isReadOnly) return;
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, enabled: !user.enabled } : user
      )
    );
  };

  const handleApplyRoles = (userId: number, selectedRoles: string[]) => {
    if (isReadOnly) return;
    setUserSelectedRoles({
      ...userSelectedRoles,
      [userId]: selectedRoles,
    });
    setSelectedUser(null);
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

  // Get display text for selected items
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
                  <TableHeader>ORGANIZATION NAME</TableHeader>
                  <TableHeader>USER</TableHeader>
                  <TableHeader>EMAIL</TableHeader>
                  <TableHeader>PHONE</TableHeader>
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
                      {user.OrgName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.phone}
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
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleToNavigate(user)}
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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

export default ExternalOrganizations;
