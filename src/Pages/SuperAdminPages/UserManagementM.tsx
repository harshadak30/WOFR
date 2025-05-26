
import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, Edit2 } from "lucide-react";
import TableHeader from "../../component/common/ui/TableHeader";
import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import { UserData } from "../../types";
import { moduleOptions } from "../../data/mockData";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface UserManagementProps {
  isReadOnly: boolean;
  searchTerm?: string;
}

const UserManagementM: React.FC<UserManagementProps> = ({
  isReadOnly,
  searchTerm = "",
}) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleOptions, setRoleOptions] = useState<
    { id: string; label: string }[]
  >([]);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = authState.user_type;
    // const userType = localStorage.getItem("user_type");

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://192.168.29.82:8000/api/v1/tenant-user?page=${currentPage}&limit=10&sort_by=created_at&sort_order=asc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const rawUsers = response.data.data.tenant_users;
        const mappedUsers: UserData[] = rawUsers.map(
          (user: any, index: number) => ({
            id: index + 1,
            name: user.name,
            email: user.email,
            OrgName: user.tenant_name,
            created: new Date(user.created_at).toLocaleDateString(),
            enabled: true,
            tenant_user_id: user.tenant_user_id, // ADD this
            tenant_id: user.tenant_id,
          })
        );

        setUsers(mappedUsers);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    if (userType === "super_admin") {
      fetchUsers();
    }
  }, [currentPage]);


  useEffect(() => {
    const token = localStorage.getItem("token");
  
    const fetchAssignedRoles = async () => {
      try {
        const response = await axios.get(
          "http://192.168.29.82:8000/api/v1/assigned-tenant-user-screen?page=1&limit=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
  
        const assignments = response.data.data.assigned_screen_to_tenant_user;
  
        const groupedByUser: Record<number, string[]> = {};
  
        assignments.forEach((assignment: any) => {
          const screenId = String(assignment.screen_data.screen_id);
          const tenantUserId = assignment.tenant_user_id;
  
          const user = users.find((u) => u.tenant_user_id === tenantUserId);
          if (!user) return;
  
          if (!groupedByUser[user.id]) {
            groupedByUser[user.id] = [];
          }
  
          if (!groupedByUser[user.id].includes(screenId)) {
            groupedByUser[user.id].push(screenId);
          }
        });
  
        setUserSelectedRoles(groupedByUser);
      } catch (error) {
        console.error("Error fetching assigned roles:", error);
      }
    };
  
    fetchAssignedRoles();
  }, [users]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");

    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://192.168.29.82:8000/api/v1/assigned-user-role-module-actions?page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        console.log("responseroles", response.data);

        const roleMappings = response.data.data.user_roles;
        const roleSet = new Set<string>();
        const roleOptionsFromAPI: { id: string; label: string }[] = [];

        roleMappings.forEach((userRole: any) => {
          userRole.role_module_action_mappings.forEach((mapping: any) => {
            const roleName = mapping.module_data.role_name;
            const screenId = mapping.screen_id; // <-- Important
            const roleId = mapping.module_data.role_id;
            if (!roleSet.has(roleName)) {
              roleSet.add(roleName);
              roleOptionsFromAPI.push({
                id: String(screenId),
                label: roleName,
              });
            }
          });
        });

        setRoleOptions(roleOptionsFromAPI);
      } catch (err) {
        setError("Failed to fetch user roles");
      } finally {
        setLoading(false);
      }
    };

    if (userType === "super_admin") {
      fetchRoles();
    }
  }, []);

  const handleApplyRoles = async (userId: number, selectedRoles: string[]) => {
    if (isReadOnly) return;

    setUserSelectedRoles({
      ...userSelectedRoles,
      [userId]: selectedRoles,
    });
    setSelectedUser(null);

    const selectedUserObj = users.find((user) => user.id === userId);
    if (!selectedUserObj) return;

    const token = localStorage.getItem("token");
    const tenantUserId = selectedUserObj.tenant_user_id;
    const tenantId = selectedUserObj.tenant_id;
    const screenIds = selectedRoles.map((roleId) => parseInt(roleId, 10)); 

    console.log("tenantUserId:", tenantUserId);
    console.log("tenantId:", tenantId);
    console.log("screenIds:", screenIds);

    try {
      const response = await axios.post(
        "http://192.168.29.82:8000/api/v1/assign-tenant-user-screen",
        {
          tenant_user_id: tenantUserId,
          tenant_id: tenantId,
          screen_ids: screenIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Assigned roles response:", response.data);
      setUserSelectedRoles({
        ...userSelectedRoles,
        [userId]: selectedRoles,
      });
      setSelectedUser(null);
      toast.success("Roles assigned successfully!");
    } catch (error) {
      console.error("Error assigning roles:", error);
      toast.error("Failed to assign roles.");
    }
  };

  const handleResetRoles = (userId: number) => {
    if (isReadOnly) return;
    setUserSelectedRoles({
      ...userSelectedRoles,
      [userId]: [],
    });
  };

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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.OrgName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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
                {currentItems.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 ${
                      isReadOnly ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.created}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-4 py-4">
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
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagementM;
