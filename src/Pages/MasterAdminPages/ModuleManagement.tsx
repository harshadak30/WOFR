// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import Toggle from "../../component/common/ui/Toggle";
// import Pagination from "../../component/common/Pagination";
// import { ModuleData } from "../../types";
// import { actionOptions, moduleData, roleOptions } from "../../data/mockData";
// import TableHeader from "../../component/common/ui/TableHeader";
// // import axios from "axios"; // Uncomment to use axios

// const ModulesActionsManagement: React.FC = () => {
//   const [modules, setModules] = useState<ModuleData[]>(moduleData);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   // Pre-defined selected roles and actions
//   const [moduleSelectedRoles, setModuleSelectedRoles] = useState<
//     Record<number, string[]>
//   >({
//     1: ["super-admin", "admin"],
//     2: ["manager", "super-admin"],
//     3: ["editor", "admin"],
//     4: ["user", "super-admin"],
//     5: ["admin", "user"],
//     6: ["other"],
//   });

//   const [moduleSelectedActions, setModuleSelectedActions] = useState<
//     Record<number, string[]>
//   >({
//     1: ["read", "update"],
//     2: ["create", "update"],
//     3: ["view"],
//     4: ["read", "update"],
//     5: ["create", "update"],
//     6: ["view", "create", "read"],
//   });

//   // Axios API integration (commented)
//   /*
//   useEffect(() => {
//     const fetchModules = async () => {
//       try {
//         const response = await axios.get('your-api-endpoint/modules');
//         setModules(response.data);

//         // Initialize selected roles and actions from API data
//         const initialRoles: Record<number, string[]> = {};
//         const initialActions: Record<number, string[]> = {};

//         response.data.forEach((module: ModuleData) => {
//           initialRoles[module.id] = module.roles || [];
//           initialActions[module.id] = module.actions || [];
//         });

//         setModuleSelectedRoles(initialRoles);
//         setModuleSelectedActions(initialActions);
//       } catch (error) {
//         console.error("Error fetching modules:", error);
//       }
//     };

//     fetchModules();
//   }, []);
//   */

//   // Filter modules based on search term
//   const filteredModules = modules.filter(
//     (module) =>
//       module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       module.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination calculation
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredModules.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredModules.length / itemsPerPage)
//   );

//   // Reset to first page when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   // Handle toggle change
//   const handleToggleChange = (id: number) => {
//     setModules(
//       modules.map((module) =>
//         module.id === id ? { ...module, enabled: !module.enabled } : module
//       )
//     );

//     // Axios API update (commented)
//     /*
//     const moduleToUpdate = modules.find(module => module.id === id);
//     if (moduleToUpdate) {
//       const updatedEnabled = !moduleToUpdate.enabled;
//       axios.patch(`your-api-endpoint/modules/${id}`, {
//         enabled: updatedEnabled
//       })
//       .catch(error => {
//         console.error("Error updating module status:", error);
//         // Revert the state change if API call fails
//         setModules(modules);
//       });
//     }
//     */
//   };

//   // Display function for selected items
//   const getSelectedText = (moduleId: number, type: "action" | "role") => {
//     const items =
//       type === "action"
//         ? moduleSelectedActions[moduleId]
//         : moduleSelectedRoles[moduleId];

//     if (!items?.length) return type === "action" ? "Action" : "Roles";

//     const options = type === "action" ? actionOptions : roleOptions;
//     const selectedLabels = items
//       .map((id) => options.find((opt) => opt.id === id)?.label)
//       .filter(Boolean);

//     return (
//       <div className="relative group">
//         <span className="truncate block max-w-[80px] sm:max-w-full">{`${selectedLabels.length} Selected`}</span>
//         <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md p-1 hidden group-hover:block z-50 min-w-[150px]">
//           <ul className="text-sm">
//             {selectedLabels.map((label, index) => (
//               <li key={index} className="py-1 px-4 truncate">
//                 {label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {/* Search Bar */}
//           <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
//             <div className="relative w-full sm:w-72">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={18} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
//                 placeholder="Search modules..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <TableHeader className="pl-2 sm:pl-6 w-10 sm:w-16">
//                     ITEM
//                   </TableHeader>
//                   <TableHeader>NAME</TableHeader>
//                   <TableHeader className="hidden sm:table-cell">
//                     DESCRIPTION
//                   </TableHeader>
//                   <TableHeader>ACTION</TableHeader>
//                   <TableHeader>ROLES</TableHeader>
//                   <TableHeader>STATUS</TableHeader>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentItems.map((module) => (
//                   <tr key={module.id} className="hover:bg-gray-50">
//                     {/* ID Column */}
//                     <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500">
//                       {module.id}
//                     </td>

//                     {/* Name Column */}
//                     <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
//                       <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[80px] sm:max-w-[200px] md:max-w-full">
//                         {module.name}
//                       </div>
//                     </td>

//                     {/* Description Column (hidden on mobile) */}
//                     <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-4">
//                       <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] md:max-w-[250px] lg:max-w-xs">
//                         {module.description}
//                       </div>
//                     </td>

//                     {/* Actions Column (Read-only) */}
//                     <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
//                       <div className="relative">
//                         <div className="inline-flex justify-between items-center w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm group">
//                           {getSelectedText(module.id, "action")}
//                         </div>
//                       </div>
//                     </td>

//                     {/* Roles Column (Read-only) */}
//                     <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
//                       <div className="relative">
//                         <div className="inline-flex justify-between items-center w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm group">
//                           {getSelectedText(module.id, "role")}
//                         </div>
//                       </div>
//                     </td>

//                     {/* Status Toggle Column */}
//                     <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
//                       <Toggle
//                         enabled={module.enabled}
//                         onChange={() => handleToggleChange(module.id)}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModulesActionsManagement;

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";
import TableHeader from "../../component/common/ui/TableHeader";

type Mapping = {
  role_module_action_mapping_id: number;
  module_id: number;
  module_name: string;
  action_id: number;
  action_name: string;
  role_id: number;
  role_name: string;
  status: string;
  assignment_date: string;
};

type ModuleView = {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
};

const ModulesActionsManagement: React.FC = () => {
  const [modules, setModules] = useState<ModuleView[]>([]);
  const [moduleSelectedRoles, setModuleSelectedRoles] = useState<
    Record<number, string[]>
  >({});
  const [moduleSelectedActions, setModuleSelectedActions] = useState<
    Record<number, string[]>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          "http://192.168.29.82:8000/api/v1/grouped-module-actions-roles?page=1&limit=10"
        );
        const result = await response.json();
        console.log(result);

        if (result.success) {
          const modulesData: Mapping[] = result.data.module_action_pairs;
          const moduleViewList: ModuleView[] = [];
          const rolesMap: Record<number, string[]> = {};
          const actionsMap: Record<number, string[]> = {};

          modulesData.forEach((mod) => {
            moduleViewList.push({
              id: mod.module_id,
              name: mod.module_name,
              description: `${mod.module_name} Module`,
              enabled: true,
            });

            rolesMap[mod.module_id] = mod.roles.map((role) => role.role_name);
            actionsMap[mod.module_id] = mod.actions.map(
              (action) => action.action_name
            );
          });

          setModules(moduleViewList);
          setModuleSelectedRoles(rolesMap);
          setModuleSelectedActions(actionsMap);
        }
      } catch (error) {
        console.error("Error fetching grouped modules:", error);
      }
    };

    fetchModules();
  }, []);

  const filteredModules =
    searchTerm.trim() === ""
      ? modules
      : modules.filter(
          (module) =>
            module.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            module.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModules.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredModules.length / itemsPerPage)
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle toggle change
  const handleToggleChange = (moduleId: number) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );

    // Axios API update (commented)
    /*
    const moduleToUpdate = modules.find(module => module.id === id);
    if (moduleToUpdate) {
      const updatedEnabled = !moduleToUpdate.enabled;
      axios.patch(`your-api-endpoint/modules/${id}`, {
        enabled: updatedEnabled
      })
      .catch(error => {
        console.error("Error updating module status:", error);
        // Revert the state change if API call fails
        setModules(modules);
      });
    }
    */
  };

  // Display function for selected items
  const getSelectedText = (moduleId: number, type: "action" | "role") => {
    const items =
      type === "action"
        ? moduleSelectedActions[moduleId]
        : moduleSelectedRoles[moduleId];

    if (!items?.length) return type === "action" ? "Action" : "Roles";
    return (
      <div className="relative group">
        <span className="truncate block max-w-[80px] sm:max-w-full">{`${items.length} Selected`}</span>
        <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md p-1 hidden group-hover:block z-50 min-w-[150px]">
          <ul className="text-sm">
            {items.map((label, index) => (
              <li key={index} className="py-1 px-4 truncate">
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
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Search Bar */}
          <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader className="pl-2 sm:pl-6 w-10 sm:w-16">
                    ITEM
                  </TableHeader>
                  <TableHeader>NAME</TableHeader>
                  <TableHeader className="hidden sm:table-cell">
                    DESCRIPTION
                  </TableHeader>
                  <TableHeader>ACTION</TableHeader>
                  <TableHeader>ROLES</TableHeader>
                  <TableHeader>STATUS</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredModules.map((module) => (
                  <tr key={module.id} className="hover:bg-gray-50">
                    {/* ID Column */}
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      {module.id}
                    </td>

                    {/* Name Column */}
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[80px] sm:max-w-[200px] md:max-w-full">
                        {module.name}
                      </div>
                    </td>

                    {/* Description Column (hidden on mobile) */}
                    <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-4">
                      <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[150px] md:max-w-[250px] lg:max-w-xs">
                        {module.description}
                      </div>
                    </td>

                    {/* Actions Column (Read-only) */}
                    <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="relative">
                        <div className="inline-flex justify-between items-center w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm group">
                          {getSelectedText(module.id, "action")}
                        </div>
                      </div>
                    </td>

                    {/* Roles Column (Read-only) */}
                    <td className="px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <div className="relative">
                        <div className="inline-flex justify-between items-center w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm group">
                          {getSelectedText(module.id, "role")}
                        </div>
                      </div>
                    </td>

                    {/* Status Toggle Column */}
                    <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <Toggle
                        enabled={module.enabled}
                        onChange={() => handleToggleChange(module.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ModulesActionsManagement;
