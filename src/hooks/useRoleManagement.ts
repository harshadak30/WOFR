// import { useEffect, useMemo, useState } from "react";
// import axios from "../helper/axios";


// interface Role {
//   role_id: number;
//   role_name: string;
//   description?: string;
//   status?: string;
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

// export const useRoleManagement = (isReadOnly: boolean) => {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const [moduleActionPairs, setModuleActionPairs] = useState<ModuleActionPair[]>([]);
//   const [selectedRole, setSelectedRole] = useState<{ id: number; type: "module" | "action" } | null>(null);
//   const [roleModules, setRoleModules] = useState<Record<number, string[]>>({});
//   const [roleActions, setRoleActions] = useState<Record<number, string[]>>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [message, setMessage] = useState<string>("");
//   const [roleMappings, setRoleMappings] = useState<any[]>([]);
//   const [isCreatingRole, setIsCreatingRole] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const itemsPerPage = 10;
//   const totalItems = roles.length;
//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);

//   const fetchRoles = async () => {
//     setIsLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get("/api/v1/roles?page=1&limit=100", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       setRoles(response.data.data.roles.map((r: any) => ({ ...r, enabled: r.status === "active" })));
//     } catch (error) {
//       console.error("Failed to fetch roles", error);
//       setMessage("Failed to fetch roles");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchRoleMappings = async () => {
//     try {
//       const response = await axios.get("/api/v1/mapped-module-actions-roles?page=1&limit=100&order=asc", {
//         headers: { Accept: "application/json" },
//       });
//       setRoleMappings(response.data.data.modules);
//     } catch (error) {
//       console.error("Failed to fetch role mappings", error);
//     }
//   };

//   const fetchModuleActionPairs = async () => {
//     try {
//       const response = await axios.get("/api/v1/module-action-pair?page=1&limit=100", {
//         headers: { Accept: "application/json" },
//       });
//       setModuleActionPairs(response.data.data.module_action_pairs);
//     } catch (error) {
//       console.error("Failed to fetch module action pairs", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await Promise.all([fetchRoles(), fetchModuleActionPairs(), fetchRoleMappings()]);
//     };

//     fetchData();
    
//     const interval = setInterval(fetchRoleMappings, 10000); // Refresh every 10 seconds
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

//   const groupedRoleMappings = useMemo(() => {
//     return roleMappings.reduce((acc, item) => {
//       if (!acc[item.role_name]) acc[item.role_name] = [];
//       acc[item.role_name].push(item);
//       return acc;
//     }, {} as Record<string, RoleMapping[]>);
//   }, [roleMappings]);

//   const handleApply = (roleId: number, selected: string[], type: "module" | "action") => {
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
//       prev.map((r) => (r.role_id === roleId ? { ...r, enabled: !r.enabled } : r))
//     );
//   };

//   const validateSelections = () => {
//     const rolesWithoutModules = Object.keys(roleActions).filter(
//       roleId => !roleModules[parseInt(roleId)] || roleModules[parseInt(roleId)].length === 0
//     );
    
//     const rolesWithoutActions = Object.keys(roleModules).filter(
//       roleId => !roleActions[parseInt(roleId)] || roleActions[parseInt(roleId)].length === 0
//     );

//     if (rolesWithoutModules.length > 0 || rolesWithoutActions.length > 0) {
//       const roleNames = roles
//         .filter(role => 
//           rolesWithoutModules.includes(role.role_id.toString()) || 
//           rolesWithoutActions.includes(role.role_id.toString())
//         )
//         .map(role => role.role_name)
//         .join(", ");

//       setMessage(`Please select both modules and actions for the following roles: ${roleNames}`);
//       return false;
//     }

//     return true;
//   };

//   const handleSaveAssignments = async () => {
//     if (!validateSelections()) {
//       return;
//     }

//     const assignments = Object.entries(roleActions).map(([roleId, actionNames]) => {
//       const moduleActionIds = moduleActionPairs
//         .filter(pair =>
//           actionNames.includes(pair.action_name)
//         )
//         .map(pair => pair.module_action_pair_id);

//       return {
//         role_id: [parseInt(roleId)],
//         module_action_pair_ids: moduleActionIds,
//         status: "active",
//       };
//     });

//     try {
//       setIsLoading(true);
//       await axios.post("/api/v1/mapping-module-actions-roles", { assignments }, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//       setMessage(`Assigned successfully to roles: ${assignments.map((a) => a.role_id[0]).join(", ")}`);
//       fetchRoleMappings(); // Refresh immediately after save
      
//       // Clear selection after successful save
//       setRoleActions({});
//       setRoleModules({});
//     } catch (error) {
//       console.error("Assignment failed:", error);
//       setMessage("Assignment failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateRole = async (roleData: { role_name: string; description: string; status: string }) => {
//     setIsCreatingRole(true);
//     const token = localStorage.getItem("token");
    
//     try {
//       const response = await axios.post("/api/v1/roles", roleData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
      
//       // Add the new role to the list
//       const newRole = response.data.data.role;
//       setRoles(prev => [...prev, { ...newRole, enabled: newRole.status === "active" }]);
      
//       setMessage(`Role "${roleData.role_name}" created successfully`);
//       return true;
//     } catch (error: any) {
//       console.error("Failed to create role:", error);
//       setMessage(`Failed to create role: ${error?.response?.data?.meta?.message || "Unknown error"}`);
//       return false;
//     } finally {
//       setIsCreatingRole(false);
//     }
//   };

//   return {
//     roles,
//     moduleActionPairs,
//     roleMappings,
//     message,
//     setMessage,
//     isCreatingRole,
//     isLoading,
//     currentPage,
//     setCurrentPage,
//     itemsPerPage,
//     totalItems,
//     totalPages,
//     currentRoles,
//     roleModules,
//     roleActions,
//     selectedRole,
//     setSelectedRole,
//     handleApply,
//     handleToggleChange,
//     handleSaveAssignments,
//     handleCreateRole,
//     fetchRoles,
//     fetchRoleMappings,
//     groupedRoleMappings,
//     moduleOptions,
//     actionOptions,
//   };
// };

import { useEffect, useMemo, useState } from "react";
import axios from "../helper/axios";
;

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

export const useRoleManagement = (isReadOnly: boolean) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [moduleActionPairs, setModuleActionPairs] = useState<ModuleActionPair[]>([]);
  const [selectedRole, setSelectedRole] = useState<{ id: number; type: "module" | "action" } | null>(null);
  const [roleModules, setRoleModules] = useState<Record<number, string[]>>({});
  const [roleActions, setRoleActions] = useState<Record<number, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState<string>("");
  const [roleMappings, setRoleMappings] = useState<any[]>([]);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;
  const totalItems = roles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);

  const fetchRoles = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

  const groupedRoleMappings = useMemo(() => {
    return roleMappings.reduce((acc, item) => {
      if (!acc[item.role_name]) acc[item.role_name] = [];
      acc[item.role_name].push(item);
      return acc;
    }, {} as Record<string, RoleMapping[]>);
  }, [roleMappings]);

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

  const validateSelections = () => {
    // Get all role IDs that have either modules or actions selected
    const allSelectedRoleIds = [...new Set([
      ...Object.keys(roleModules),
      ...Object.keys(roleActions)
    ])].map(id => parseInt(id));

    // Check if each role has both modules and actions selected
    const invalidRoles = allSelectedRoleIds.filter(roleId => {
      const hasModules = roleModules[roleId]?.length > 0;
      const hasActions = roleActions[roleId]?.length > 0;
      return !hasModules || !hasActions;
    });

    if (invalidRoles.length > 0) {
      const roleNames = roles
        .filter(role => invalidRoles.includes(role.role_id))
        .map(role => role.role_name)
        .join(", ");

      setMessage(`Please select both modules and actions for the following roles: ${roleNames}`);
      return false;
    }

    return true;
  };

  const handleSaveAssignments = async () => {
    if (!validateSelections()) {
      return;
    }

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      return true;
    } catch (error: any) {
      console.error("Failed to create role:", error);
      setMessage(`Failed to create role: ${error?.response?.data?.meta?.message || "Unknown error"}`);
      return false;
    } finally {
      setIsCreatingRole(false);
    }
  };

  return {
    roles,
    moduleActionPairs,
    roleMappings,
    message,
    setMessage,
    isCreatingRole,
    isLoading,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    currentRoles,
    roleModules,
    roleActions,
    selectedRole,
    setSelectedRole,
    handleApply,
    handleToggleChange,
    handleSaveAssignments,
    handleCreateRole,
    fetchRoles,
    fetchRoleMappings,
    groupedRoleMappings,
    moduleOptions,
    actionOptions,
  };
};