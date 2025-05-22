import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TableHeader from "../../component/common/ui/TableHeader";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";


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
  roles: Array<{ role_id: number; role_name: string }>;
  actions: Array<{ action_id: number; action_name: string }>;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://192.168.29.82:8000/api/v1/grouped-module-actions-roles?page=1&limit=10"
        );
        const result = await response.json();

        if (result.success) {
          const modulesData: Mapping[] = result.data.module_action_pairs;
          const moduleViewList: ModuleView[] = [];
          const rolesMap: Record<number, string[]> = {};
          const actionsMap: Record<number, string[]> = {};

          modulesData.forEach((mod) => {
            // Check if this module is already in our list (avoid duplicates)
            if (!moduleViewList.some(m => m.id === mod.module_id)) {
              moduleViewList.push({
                id: mod.module_id,
                name: mod.module_name,
                description: `${mod.module_name} Module`,
                enabled: true,
              });
            }

            // Collect roles and actions for each module
            if (mod.roles && Array.isArray(mod.roles)) {
              rolesMap[mod.module_id] = mod.roles.map((role) => role.role_name);
            }
            
            if (mod.actions && Array.isArray(mod.actions)) {
              actionsMap[mod.module_id] = mod.actions.map(
                (action) => action.action_name
              );
            }
          });

          setModules(moduleViewList);
          setModuleSelectedRoles(rolesMap);
          setModuleSelectedActions(actionsMap);
        }
      } catch (error) {
        console.error("Error fetching grouped modules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Filter modules based on search term
  const filteredModules =
    searchTerm.trim() === ""
      ? modules
      : modules.filter(
          (module) =>
            module.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            module.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination calculation
  const totalItems = filteredModules.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModules.slice(indexOfFirstItem, indexOfLastItem);

  // Handle toggle change
  const handleToggleChange = (moduleId: number) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );

    // API update would go here in a real implementation
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
        <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md p-1 hidden group-hover:block z-50 min-w-[150px] max-h-[200px] overflow-y-auto">
          <ul className="text-sm">
            {items.map((label, index) => (
              <li key={index} className="py-1 px-4 truncate hover:bg-gray-50">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
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
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6BC8FE]"></div>
              </div>
            ) : totalItems === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No modules found matching your search criteria
              </div>
            ) : (
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
                  {currentItems.map((module) => (
                    <tr 
                      key={module.id} 
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
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
            )}
          </div>

          {/* Pagination */}
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

export default ModulesActionsManagement;