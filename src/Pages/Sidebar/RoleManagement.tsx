// import React, { useEffect, useMemo, useState } from "react";
// import axios from "../../helper/axios";
// import { ChevronDown } from "lucide-react";
// import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
// import Toggle from "../../component/common/ui/Toggle";
// import Pagination from "../../component/common/Pagination";
// import TableHeader from "../../component/common/ui/TableHeader";

// interface Role {
//   role_id: number;
//   role_name: string;
//   enabled: boolean;
// }

// interface ModuleActionPair {
//   module_action_pair_id: number;
//   module_id: number;
//   module_name: string;
//   action_id: number;
//   action_name: string;
// }

// interface RoleMapping {
//   role_name: string;
//   module_name: string;
//   action_name: string;
//   status: string;
//   assignment_date: string;
// }

// const RoleManagement: React.FC<{ isReadOnly: boolean }> = ({ isReadOnly }) => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [moduleActionPairs, setModuleActionPairs] = useState<
//     ModuleActionPair[]
//   >([]);
//   const [selectedRole, setSelectedRole] = useState<{
//     id: number;
//     type: "module" | "action";
//   } | null>(null);
//   // const [roleModules, setRoleModules] = useState<Record<number, string[]>>({});
//   // const [roleActions, setRoleActions] = useState<Record<number, string[]>>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [message, setMessage] = useState<string>("");
//   const [initialRoleModules, setInitialRoleModules] = useState<
//     Record<number, string[]>
//   >({});
//   const [initialRoleActions, setInitialRoleActions] = useState<
//     Record<number, string[]>
//   >({});
//   const [roleModules, setRoleModules] = useState<Record<number, string[]>>({});
//   const [roleActions, setRoleActions] = useState<Record<number, string[]>>({});

//   const itemsPerPage = 10;
//   const totalItems = roles.length;
//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);

//   // const fetchRoleMappings = async (fetchedRoles: Role[]) => {
//   //   try {
//   //     const response = await axios.get("/api/v1/mapped-module-actions-roles?page=1&limit=100&order=asc", {
//   //       headers: { Accept: "application/json" },
//   //     });
//   //     const mappings = response.data.data.modules;

//   //     const groupedByRole = mappings.reduce((acc, item) => {
//   //       if (!acc[item.role_name]) acc[item.role_name] = [];
//   //       acc[item.role_name].push(item);
//   //       return acc;
//   //     }, {} as Record<string, RoleMapping[]>);

//   //     const roleNameToId = fetchedRoles.reduce((map, role) => {
//   //       map[role.role_name] = role.role_id;
//   //       return map;
//   //     }, {} as Record<string, number>);

//   //     const newRoleModules: Record<number, string[]> = {};
//   //     const newRoleActions: Record<number, string[]> = {};

//   //     for (const [roleName, items] of Object.entries(groupedByRole)) {
//   //       const roleId = roleNameToId[roleName];
//   //       if (roleId !== undefined) {
//   //         newRoleModules[roleId] = Array.from(new Set(items.map((item) => item.module_name)));
//   //         newRoleActions[roleId] = Array.from(new Set(items.map((item) => item.action_name)));
//   //       }
//   //     }

//   //     setRoleModules(newRoleModules);
//   //     setRoleActions(newRoleActions);

//   //   } catch (error) {
//   //     console.error("Failed to fetch role mappings", error);
//   //   }
//   // };

//   const fetchRoleMappings = async (fetchedRoles: Role[]) => {
//     try {
//       const response = await axios.get(
//         "/api/v1/mapped-module-actions-roles?page=1&limit=100&order=asc",
//         {
//           headers: { Accept: "application/json" },
//         }
//       );

//       const mappings = response.data.data.modules;
//       const groupedByRole = mappings.reduce((acc, item) => {
//         if (!acc[item.role_name]) acc[item.role_name] = [];
//         acc[item.role_name].push(item);
//         return acc;
//       }, {} as Record<string, RoleMapping[]>);

//       const roleNameToId = fetchedRoles.reduce((map, role) => {
//         map[role.role_name] = role.role_id;
//         return map;
//       }, {} as Record<string, number>);

//       const newRoleModules: Record<number, string[]> = {};
//       const newRoleActions: Record<number, string[]> = {};

//       for (const [roleName, items] of Object.entries(groupedByRole)) {
//         const roleId = roleNameToId[roleName];
//         if (roleId !== undefined) {
//           newRoleModules[roleId] = Array.from(
//             new Set(items.map((item) => item.module_name))
//           );
//           newRoleActions[roleId] = Array.from(
//             new Set(items.map((item) => item.action_name))
//           );
//         }
//       }

//       setInitialRoleModules(newRoleModules);
//       setInitialRoleActions(newRoleActions);

//       // Only update user state if not manually modified (you can improve this check)
//       setRoleModules((prev) => {
//         const updated: Record<number, string[]> = {};
//         for (const key in newRoleModules) {
//           const id = parseInt(key);
//           if (!prev[id] || prev[id].length === 0) {
//             updated[id] = newRoleModules[id];
//           } else {
//             updated[id] = prev[id]; // retain manual changes
//           }
//         }
//         return updated;
//       });

//       setRoleActions((prev) => {
//         const updated: Record<number, string[]> = {};
//         for (const key in newRoleActions) {
//           const id = parseInt(key);
//           if (!prev[id] || prev[id].length === 0) {
//             updated[id] = newRoleActions[id];
//           } else {
//             updated[id] = prev[id];
//           }
//         }
//         return updated;
//       });
//     } catch (error) {
//       console.error("Failed to fetch role mappings", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const [roleRes, moduleRes] = await Promise.all([
//           axios.get("/api/v1/roles?page=1&limit=100", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           }),
//           axios.get("/api/v1/module-action-pair?page=1&limit=100", {
//             headers: { Accept: "application/json" },
//           }),
//         ]);

//         const fetchedRoles = roleRes.data.data.roles.map((r: any) => ({
//           ...r,
//           enabled: true,
//         }));
//         setRoles(fetchedRoles);
//         setModuleActionPairs(moduleRes.data.data.module_action_pairs);
//         fetchRoleMappings(fetchedRoles);
//       } catch (error) {
//         console.error("API fetch failed:", error);
//       }
//     };

//     fetchData();

//     const interval = setInterval(() => fetchRoleMappings(roles), 40000); // auto-refresh
//     return () => clearInterval(interval);
//   }, []);

//   const moduleOptions = useMemo(() => {
//     const seen = new Set();
//     return moduleActionPairs
//       .filter((pair) => {
//         if (seen.has(pair.module_name)) return false;
//         seen.add(pair.module_name);
//         return true;
//       })
//       .map((pair) => ({
//         id: pair.module_name,
//         label: pair.module_name,
//       }));
//   }, [moduleActionPairs]);

//   const actionOptions = useMemo(() => {
//     const seen = new Set();
//     return moduleActionPairs
//       .filter((pair) => {
//         if (seen.has(pair.action_name)) return false;
//         seen.add(pair.action_name);
//         return true;
//       })
//       .map((pair) => ({
//         id: pair.action_name,
//         label: pair.action_name,
//       }));
//   }, [moduleActionPairs]);

//   const toggleDropdown = (roleId: number, type: "module" | "action") => {
//     if (isReadOnly) return;
//     setSelectedRole(
//       selectedRole?.id === roleId && selectedRole?.type === type
//         ? null
//         : { id: roleId, type }
//     );
//   };

//   const handleApply = (
//     roleId: number,
//     selected: string[],
//     type: "module" | "action"
//   ) => {
//     if (type === "module") {
//       setRoleModules({ ...roleModules, [roleId]: selected });
//     } else {
//       setRoleActions({ ...roleActions, [roleId]: selected });
//     }
//     setSelectedRole(null);
//   };

//   const handleToggleChange = (roleId: number) => {
//     if (isReadOnly) return;
//     setRoles((prev) =>
//       prev.map((r) =>
//         r.role_id === roleId ? { ...r, enabled: !r.enabled } : r
//       )
//     );
//   };

//   const handleSaveAssignments = async () => {
//     const assignments = Object.entries(roleActions).map(
//       ([roleId, actionNames]) => {
//         const moduleActionIds = moduleActionPairs
//           .filter((pair) => actionNames.includes(pair.action_name))
//           .map((pair) => pair.module_action_pair_id);

//         return {
//           role_id: [parseInt(roleId)],
//           module_action_pair_ids: moduleActionIds,
//           status: "active",
//         };
//       }
//     );

//     try {
//       const response = await axios.post(
//         "/api/v1/mapping-module-actions-roles",
//         { assignments },
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setMessage(
//         `Assigned successfully to roles: ${assignments
//           .map((a) => a.role_id[0])
//           .join(", ")}`
//       );
//       fetchRoleMappings(roles); // refresh immediately
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       setMessage("Assignment failed.");
//     }
//   };

//   return (
//     <div className="mx-auto bg-gray-50 shadow rounded mt-8 overflow-x-auto">
//       <div className="p-4 flex justify-between items-center">
//         <h2 className="text-lg font-semibold text-gray-700">Role Management</h2>
//         {!isReadOnly && (
//           <button
//             onClick={handleSaveAssignments}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Save Assignments
//           </button>
//         )}
//       </div>

//       {message && (
//         <div className="px-4 py-2 text-sm text-green-700 bg-green-100 rounded mx-4 my-2">
//           {message}
//         </div>
//       )}

//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
//           <tr>
//             <TableHeader className="pl-6">ITEM</TableHeader>
//             <TableHeader>ROLES</TableHeader>
//             <TableHeader>Modules</TableHeader>
//             <TableHeader>Actions</TableHeader>
//             <TableHeader>Enable/Disable</TableHeader>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
//           {currentRoles.map((role, index) => (
//             <tr key={role.role_id} className="hover:bg-gray-50">
//               <td className="px-4 py-4">{indexOfFirstItem + index + 1}</td>
//               <td className="px-6 py-4">{role.role_name}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="relative">
//                   <button
//                     onClick={() => toggleDropdown(role.role_id, "module")}
//                     className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
//                   >
//                     {/* {roleModules[role.role_id]?.length ? `${roleModules[role.role_id].length} Modules` : "Select Modules"} */}
//                     {roleModules[role.role_id]?.length
//                       ? `${roleModules[role.role_id].length} Modules`
//                       : "0 Modules"}
//                     <ChevronDown size={16} className="inline ml-2" />
//                   </button>
//                   {selectedRole?.id === role.role_id &&
//                     selectedRole?.type === "module" && (
//                       <div className="absolute z-10 mt-1 w-72">
//                         <MultiSelectDropdown
//                           title="Modules"
//                           options={moduleOptions}
//                           selectedOptions={roleModules[role.role_id] || []}
//                           onApply={(selected) =>
//                             handleApply(role.role_id, selected, "module")
//                           }
//                           onReset={() =>
//                             handleApply(role.role_id, [], "module")
//                           }
//                         />
//                       </div>
//                     )}
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 <div className="relative">
//                   <button
//                     onClick={() => toggleDropdown(role.role_id, "action")}
//                     className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
//                   >
//                     {/* {roleActions[role.role_id]?.length ? `${roleActions[role.role_id].length} Actions` : "Select Actions"} */}
//                     {roleActions[role.role_id]?.length
//                       ? `${roleActions[role.role_id].length} Actions`
//                       : "0 Actions"}

//                     <ChevronDown size={16} className="inline ml-2" />
//                   </button>
//                   {selectedRole?.id === role.role_id &&
//                     selectedRole?.type === "action" && (
//                       <div className="absolute z-10 mt-1 w-72">
//                         <MultiSelectDropdown
//                           title="Actions"
//                           options={actionOptions}
//                           selectedOptions={roleActions[role.role_id] || []}
//                           onApply={(selected) =>
//                             handleApply(role.role_id, selected, "action")
//                           }
//                           onReset={() =>
//                             handleApply(role.role_id, [], "action")
//                           }
//                         />
//                       </div>
//                     )}
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 <Toggle
//                   enabled={role.enabled}
//                   onChange={() => handleToggleChange(role.role_id)}
//                   className={isReadOnly ? "opacity-50 cursor-not-allowed" : ""}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         totalItems={totalItems}
//         itemsPerPage={itemsPerPage}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default RoleManagement;

import React, { useEffect, useMemo, useState } from "react";
import axios from "../../helper/axios";
import { ChevronDown, PlusCircle } from "lucide-react";



import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import Pagination from "../../component/common/Pagination";
import Toggle from "../../component/common/ui/Toggle";
import TableHeader from "../../component/common/ui/TableHeader";
import CreateRoleForm from "./CreateRoleForm";
import Modal from "../../component/common/ui/Modal";
import Buttons from "../../component/common/Button/Buttons";
interface Role {
  role_id: number;
  role_name: string;
  description?: string;
  status?: string;
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
  const [roleMappings, setRoleMappings] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatingRole, setIsCreatingRole] = useState(false);

  const itemsPerPage = 10;
  const totalItems = roles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);

  const fetchRoles = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/api/v1/roles?page=1&limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setRoles(response.data.data.roles.map((r: any) => ({ ...r, enabled: r.status === "active" })));
    } catch (error) {
      console.error("Failed to fetch roles", error);
      setMessage("Failed to fetch roles");
    }
  };

  const fetchRoleMappings = async () => {
    try {
      const response = await axios.get("/api/v1/mapped-module-actions-roles?page=1&limit=100&order=asc", {
        headers: { Accept: "application/json" },
      });
      setRoleMappings(response.data.data.modules);
    } catch (error) {
      console.error("Failed to fetch role mappings", error);
    }
  };

  const fetchModuleActionPairs = async () => {
    try {
      const response = await axios.get("/api/v1/module-action-pair?page=1&limit=100", {
        headers: { Accept: "application/json" },
      });
      setModuleActionPairs(response.data.data.module_action_pairs);
    } catch (error) {
      console.error("Failed to fetch module action pairs", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchRoles(), fetchModuleActionPairs(), fetchRoleMappings()]);
    };

    fetchData();
    
    const interval = setInterval(fetchRoleMappings, 10000); // Refresh every 10 seconds
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

  const groupedRoleMappings = roleMappings.reduce((acc, item) => {
    if (!acc[item.role_name]) acc[item.role_name] = [];
    acc[item.role_name].push(item);
    return acc;
  }, {} as Record<string, RoleMapping[]>);

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
      await axios.post("/api/v1/mapping-module-actions-roles", { assignments }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setMessage(`Assigned successfully to roles: ${assignments.map((a) => a.role_id[0]).join(", ")}`);
      fetchRoleMappings(); // Refresh immediately after save
      
      // Clear selection after successful save
      setRoleActions({});
      setRoleModules({});
    } catch (error) {
      console.error("Assignment failed:", error);
      setMessage("Assignment failed.");
    }
  };

  const handleCreateRole = async (roleData: { role_name: string; description: string; status: string }) => {
    setIsCreatingRole(true);
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.post("/api/v1/roles", roleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      // Add the new role to the list
      const newRole = response.data.data.role;
      setRoles(prev => [...prev, { ...newRole, enabled: newRole.status === "active" }]);
      
      setMessage(`Role "${roleData.role_name}" created successfully`);
      setIsCreateModalOpen(false);
    } catch (error: any) {
      console.error("Failed to create role:", error);
      setMessage(`Failed to create role: ${error?.response?.data?.meta?.message || "Unknown error"}`);
    } finally {
      setIsCreatingRole(false);
    }
  };

  const clearMessage = () => {
    setMessage("");
  };

  return (
    <div className="mx-auto bg-gray-50 shadow rounded mt-8 overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Role Management</h2>
        <div className="space-x-2">
          {!isReadOnly && (
            <>
              <Buttons
                onClick={() => setIsCreateModalOpen(true)}
                className="mr-2"
              >
                <PlusCircle size={16} className="mr-2" />
                Create Role
              </Buttons>
              <Buttons
                onClick={handleSaveAssignments}
                disabled={Object.keys(roleActions).length === 0}
              >
                Save Assignments
              </Buttons>
            </>
          )}
        </div>
      </div>

      {message && (
        <div 
          className={`px-4 py-2 text-sm ${
            message.includes("failed") ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"
          } rounded mx-4 my-2 flex justify-between items-center`}
        >
          <span>{message}</span>
          <button onClick={clearMessage} className="text-gray-500 hover:text-gray-700">
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
            <tr>
              <TableHeader className="pl-6">ITEM</TableHeader>
              <TableHeader>ROLES</TableHeader>
              <TableHeader>DESCRIPTION</TableHeader>
              <TableHeader>MODULES</TableHeader>
              <TableHeader>ACTIONS</TableHeader>
              <TableHeader>STATUS</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600 bg-white">
            {currentRoles.map((role, index) => (
              <tr key={role.role_id} className="hover:bg-gray-50">
                <td className="px-4 py-4">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 font-medium">{role.role_name}</td>
                <td className="px-6 py-4">{role.description || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(role.role_id, "module")}
                      className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${isReadOnly ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                      disabled={isReadOnly}
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
                      className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${isReadOnly ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                      disabled={isReadOnly}
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
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Read-only summary table */}
      {roleMappings.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-200">
          <h3 className="text-md font-semibold text-gray-800 mb-4">Role Assignment Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Modules & Actions</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {Object.entries(groupedRoleMappings).map(([roleName, entries], index) => {
                  const groupedByModule = entries.reduce((acc: { [x: string]: any[]; }, item: { module_name: string | number; action_name: any; }) => {
                    if (!acc[item.module_name]) acc[item.module_name] = [];
                    acc[item.module_name].push(item.action_name);
                    return acc;
                  }, {} as Record<string, string[]>);

                  const status = entries[0]?.status || "active";

                  return (
                    <tr key={roleName}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{roleName}</td>
                      <td className="px-4 py-2">
                        <div className="space-y-2">
                          {Object.entries(groupedByModule).map(([module, actions]) => (
                            <details
                              key={module}
                              className="border border-gray-300 rounded-md p-2 bg-gray-50"
                            >
                              <summary className="cursor-pointer font-medium text-sm">{module}</summary>
                              <ul className="ml-4 mt-1 list-disc text-sm text-gray-700">
                                {actions.map((action : any) => (
                                  <li key={action} className="flex items-center">
                                     <span className="ml-1">{action}</span>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2 capitalize">{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Role"
      >
        <CreateRoleForm
          onSubmit={handleCreateRole}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isCreatingRole}
        />
      </Modal>
    </div>
  );
};

export default RoleManagement;