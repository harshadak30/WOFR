import React, { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import Toggle from "../../component/common/ui/Toggle";
import Pagination from "../../component/common/Pagination";
import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import { ModuleData } from "../../types";
import { actionOptions, moduleData, roleOptions } from "../../data/mockData";
import TableHeader from "../../component/common/ui/TableHeader";

const ModulesActionsManagement: React.FC = () => {
  const [modules, setModules] = useState<ModuleData[]>(moduleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModule, setSelectedModule] = useState<{
    id: number;
    type: "action" | "role";
  } | null>(null);

  const [moduleSelectedRoles, setModuleSelectedRoles] = useState<
    Record<number, string[]>
  >({});
  const [moduleSelectedActions, setModuleSelectedActions] = useState<
    Record<number, string[]>
  >({});

  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleChange = (id: number) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );
  };

  const handleApplyRoles = (moduleId: number, selectedRoles: string[]) => {
    setModuleSelectedRoles({
      ...moduleSelectedRoles,
      [moduleId]: selectedRoles,
    });
    setSelectedModule(null);
  };

  const handleApplyActions = (moduleId: number, selectedActions: string[]) => {
    setModuleSelectedActions({
      ...moduleSelectedActions,
      [moduleId]: selectedActions,
    });
    setSelectedModule(null);
  };

  const handleResetRoles = (moduleId: number) => {
    setModuleSelectedRoles({
      ...moduleSelectedRoles,
      [moduleId]: [],
    });
  };

  // Reset actions for a module
  const handleResetActions = (moduleId: number) => {
    setModuleSelectedActions({
      ...moduleSelectedActions,
      [moduleId]: [],
    });
  };

  // Toggle dropdown for a specific module and type
  const toggleDropdown = (moduleId: number, type: "action" | "role") => {
    setSelectedModule(
      selectedModule?.id === moduleId && selectedModule?.type === type
        ? null
        : { id: moduleId, type }
    );
  };

  // Get display text for selected items
  const getSelectedText = (moduleId: number, type: "action" | "role") => {
    const items =
      type === "action"
        ? moduleSelectedActions[moduleId]
        : moduleSelectedRoles[moduleId];
    if (!items?.length) return type === "action" ? "Action" : "Roles";

    const options = type === "action" ? actionOptions : roleOptions;
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
    <div className=" bg-gray-50">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader className="pl-6 w-16">ITEM</TableHeader>
                  <TableHeader>MODULE NAME</TableHeader>
                  <TableHeader>DESCRIPTION</TableHeader>
                  <TableHeader>ACTION</TableHeader>
                  <TableHeader>ROLES</TableHeader>
                  <TableHeader>ENABLE/DISABLE</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredModules.map((module) => (
                  <tr key={module.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {module.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {module.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-md">
                        {module.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(module.id, "action")}
                          className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          {getSelectedText(module.id, "action")}
                          <ChevronDown size={16} className="ml-2" />
                        </button>

                        {selectedModule?.id === module.id &&
                          selectedModule?.type === "action" && (
                            <div className="absolute z-10 mt-1 w-72">
                              <MultiSelectDropdown
                                title="Actions"
                                options={actionOptions}
                                selectedOptions={
                                  moduleSelectedActions[module.id] || []
                                }
                                onApply={(selected: string[]) =>
                                  handleApplyActions(module.id, selected)
                                }
                                onReset={() => handleResetActions(module.id)}
                              />
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(module.id, "role")}
                          className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          {getSelectedText(module.id, "role")}
                          <ChevronDown size={16} className="ml-2" />
                        </button>

                        {selectedModule?.id === module.id &&
                          selectedModule?.type === "role" && (
                            <div className="absolute z-10 mt-1 w-72">
                              <MultiSelectDropdown
                                title="Roles"
                                options={roleOptions}
                                selectedOptions={
                                  moduleSelectedRoles[module.id] || []
                                }
                                onApply={(selected: string[]) =>
                                  handleApplyRoles(module.id, selected)
                                }
                                onReset={() => handleResetRoles(module.id)}
                              />
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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

export default ModulesActionsManagement;
