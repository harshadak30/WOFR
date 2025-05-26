import React, { useEffect, useMemo, useState } from "react";
import axios from "../../helper/axios";
import { ChevronDown } from "lucide-react";
import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";
import TableHeader from "../../component/common/ui/TableHeader";

interface Role {
  role_id: number;
  role_name: string;
  enabled: boolean;
}

interface ModuleActionPair {
  module_action_pair_id: number;
  module_id: number;
  module_name: string;
  action_id: number;
  action_name: string;
}

interface RoleMapping {
  role_name: string;
  module_name: string;
  action_name: string;
  status: string;
  assignment_date: string;
}

const RoleManagement: React.FC<{ isReadOnly: boolean }> = ({ isReadOnly }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [moduleActionPairs, setModuleActionPairs] = useState<ModuleActionPair[]>([]);
  const [selectedRole, setSelectedRole] = useState<{ id: number; type: "module" | "action" } | null>(null);
  const [roleModules, setRoleModules] = useState<Record<number, string[]>>({});
  const [roleActions, setRoleActions] = useState<Record<number, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState<string>("");

  const itemsPerPage = 10;
  const totalItems = roles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);

  const fetchRoleMappings = async (fetchedRoles: Role[]) => {
    try {
      const response = await axios.get("/api/v1/mapped-module-actions-roles?page=1&limit=100&order=asc", {
        headers: { Accept: "application/json" },
      });
      const mappings = response.data.data.modules;

      const groupedByRole = mappings.reduce((acc, item) => {
        if (!acc[item.role_name]) acc[item.role_name] = [];
        acc[item.role_name].push(item);
        return acc;
      }, {} as Record<string, RoleMapping[]>);

      const roleNameToId = fetchedRoles.reduce((map, role) => {
        map[role.role_name] = role.role_id;
        return map;
      }, {} as Record<string, number>);

      const newRoleModules: Record<number, string[]> = {};
      const newRoleActions: Record<number, string[]> = {};

      for (const [roleName, items] of Object.entries(groupedByRole)) {
        const roleId = roleNameToId[roleName];
        if (roleId !== undefined) {
          newRoleModules[roleId] = Array.from(new Set(items.map((item) => item.module_name)));
          newRoleActions[roleId] = Array.from(new Set(items.map((item) => item.action_name)));
        }
      }

      setRoleModules(newRoleModules);
      setRoleActions(newRoleActions);

    } catch (error) {
      console.error("Failed to fetch role mappings", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [roleRes, moduleRes] = await Promise.all([
          axios.get("/api/v1/roles?page=1&limit=100", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          axios.get("/api/v1/module-action-pair?page=1&limit=100", {
            headers: { Accept: "application/json" },
          }),
        ]);

        const fetchedRoles = roleRes.data.data.roles.map((r: any) => ({ ...r, enabled: true }));
        setRoles(fetchedRoles);
        setModuleActionPairs(moduleRes.data.data.module_action_pairs);
        fetchRoleMappings(fetchedRoles);

      } catch (error) {
        console.error("API fetch failed:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => fetchRoleMappings(roles), 10000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const moduleOptions = useMemo(() => {
    const seen = new Set();
    return moduleActionPairs
      .filter((pair) => {
        if (seen.has(pair.module_name)) return false;
        seen.add(pair.module_name);
        return true;
      })
      .map((pair) => ({
        id: pair.module_name,
        label: pair.module_name,
      }));
  }, [moduleActionPairs]);

  const actionOptions = useMemo(() => {
    const seen = new Set();
    return moduleActionPairs
      .filter((pair) => {
        if (seen.has(pair.action_name)) return false;
        seen.add(pair.action_name);
        return true;
      })
      .map((pair) => ({
        id: pair.action_name,
        label: pair.action_name,
      }));
  }, [moduleActionPairs]);

  const toggleDropdown = (roleId: number, type: "module" | "action") => {
    if (isReadOnly) return;
    setSelectedRole(
      selectedRole?.id === roleId && selectedRole?.type === type
        ? null
        : { id: roleId, type }
    );
  };

  const handleApply = (roleId: number, selected: string[], type: "module" | "action") => {
    if (type === "module") {
      setRoleModules({ ...roleModules, [roleId]: selected });
    } else {
      setRoleActions({ ...roleActions, [roleId]: selected });
    }
    setSelectedRole(null);
  };

  const handleToggleChange = (roleId: number) => {
    if (isReadOnly) return;
    setRoles((prev) =>
      prev.map((r) => (r.role_id === roleId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleSaveAssignments = async () => {
    const assignments = Object.entries(roleActions).map(([roleId, actionNames]) => {
      const moduleActionIds = moduleActionPairs
        .filter(pair =>
          actionNames.includes(pair.action_name)
        )
        .map(pair => pair.module_action_pair_id);

      return {
        role_id: [parseInt(roleId)],
        module_action_pair_ids: moduleActionIds,
        status: "active",
      };
    });

    try {
      const response = await axios.post("/api/v1/mapping-module-actions-roles", { assignments }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setMessage(`Assigned successfully to roles: ${assignments.map((a) => a.role_id[0]).join(", ")}`);
      fetchRoleMappings(roles); // refresh immediately
    } catch (error) {
      console.error("Assignment failed:", error);
      setMessage("Assignment failed.");
    }
  };

  return (
    <div className="mx-auto bg-gray-50 shadow rounded mt-8 overflow-x-auto">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Role Management</h2>
        {!isReadOnly && (
          <button
            onClick={handleSaveAssignments}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Assignments
          </button>
        )}
      </div>

      {message && (
        <div className="px-4 py-2 text-sm text-green-700 bg-green-100 rounded mx-4 my-2">{message}</div>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
          <tr>
            <TableHeader className="pl-6">ITEM</TableHeader>
            <TableHeader>ROLES</TableHeader>
            <TableHeader>Modules</TableHeader>
            <TableHeader>Actions</TableHeader>
            <TableHeader>Enable/Disable</TableHeader>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
          {currentRoles.map((role, index) => (
            <tr key={role.role_id} className="hover:bg-gray-50">
              <td className="px-4 py-4">{indexOfFirstItem + index + 1}</td>
              <td className="px-6 py-4">{role.role_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(role.role_id, "module")}
                    className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
                  >
                    {roleModules[role.role_id]?.length ? `${roleModules[role.role_id].length} Modules` : "Select Modules"}
                    <ChevronDown size={16} className="inline ml-2" />
                  </button>
                  {selectedRole?.id === role.role_id && selectedRole?.type === "module" && (
                    <div className="absolute z-10 mt-1 w-72">
                      <MultiSelectDropdown
                        title="Modules"
                        options={moduleOptions}
                        selectedOptions={roleModules[role.role_id] || []}
                        onApply={(selected) => handleApply(role.role_id, selected, "module")}
                        onReset={() => handleApply(role.role_id, [], "module")}
                      />
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(role.role_id, "action")}
                    className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
                  >
                    {roleActions[role.role_id]?.length ? `${roleActions[role.role_id].length} Actions` : "Select Actions"}
                    <ChevronDown size={16} className="inline ml-2" />
                  </button>
                  {selectedRole?.id === role.role_id && selectedRole?.type === "action" && (
                    <div className="absolute z-10 mt-1 w-72">
                      <MultiSelectDropdown
                        title="Actions"
                        options={actionOptions}
                        selectedOptions={roleActions[role.role_id] || []}
                        onApply={(selected) => handleApply(role.role_id, selected, "action")}
                        onReset={() => handleApply(role.role_id, [], "action")}
                      />
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <Toggle
                  enabled={role.enabled}
                  onChange={() => handleToggleChange(role.role_id)}
                  className={isReadOnly ? "opacity-50 cursor-not-allowed" : ""}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RoleManagement;
