import React from "react";
import { ChevronDown } from "lucide-react";

import MultiSelectDropdown from "../../component/common/ui/MultiSelectDropdown";
import Pagination from "../../component/common/Pagination";
import TableHeader from "../../component/common/ui/TableHeader";
import Toggle from "../../component/common/ui/Toggle";

interface RoleTableProps {
  currentRoles: any[];
  indexOfFirstItem: number;
  roleModules: Record<number, string[]>;
  roleActions: Record<number, string[]>;
  selectedRole: { id: number; type: "module" | "action" } | null;
  moduleOptions: { id: string; label: string }[];
  actionOptions: { id: string; label: string }[];
  isReadOnly: boolean;
  toggleDropdown: (roleId: number, type: "module" | "action") => void;
  handleApply: (
    roleId: number,
    selected: string[],
    type: "module" | "action"
  ) => void;
  handleToggleChange: (roleId: number) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  groupedRoleMappings: Record<string, any[]>;
}

const RoleTable: React.FC<RoleTableProps> = ({
  currentRoles,
  indexOfFirstItem,
  roleModules,
  roleActions,
  selectedRole,
  moduleOptions,
  actionOptions,
  isReadOnly,
  toggleDropdown,
  handleApply,
  handleToggleChange,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  groupedRoleMappings,
}) => {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
            <tr>
              <TableHeader className="w-16 pl-6">#</TableHeader>
              <TableHeader className="w-1/6">ROLE</TableHeader>
              <TableHeader className="w-1/5">DESCRIPTION</TableHeader>
              <TableHeader className="w-1/5">MODULES</TableHeader>
              <TableHeader className="w-1/5">ACTIONS</TableHeader>
              <TableHeader className="w-24">STATUS</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600 bg-white">
            {currentRoles.map((role, index) => {
              const mappings = groupedRoleMappings[role.role_name] || [];
              const existingModules = [
                ...new Set(mappings.map((m) => m.module_name)),
              ];
              const existingActions = [
                ...new Set(mappings.map((m) => m.action_name)),
              ];

              return (
                <tr
                  key={role.role_id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-4 text-center">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {role.role_name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {role.description || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(role.role_id, "module")}
                        className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm transition-all duration-150 ${
                          isReadOnly
                            ? "opacity-70 cursor-not-allowed text-gray-500"
                            : "text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        disabled={isReadOnly}
                      >
                        {roleModules[role.role_id]?.length ||
                        existingModules.length > 0 ? (
                          <span className="flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                              {roleModules[role.role_id]?.length ||
                                existingModules.length}
                            </span>
                            Modules
                          </span>
                        ) : (
                          "Select Modules"
                        )}
                        <ChevronDown
                          size={16}
                          className={`inline ml-2 transition-transform duration-200 ${
                            selectedRole?.id === role.role_id &&
                            selectedRole?.type === "module"
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {selectedRole?.id === role.role_id &&
                        selectedRole?.type === "module" && (
                          <div className="absolute z-10 mt-1 w-72 animate-fadeIn">
                            <MultiSelectDropdown
                              title="Modules"
                              options={moduleOptions}
                              selectedOptions={
                                roleModules[role.role_id] || existingModules
                              }
                              onApply={(selected) =>
                                handleApply(role.role_id, selected, "module")
                              }
                              onReset={() =>
                                handleApply(role.role_id, [], "module")
                              }
                            />
                          </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(role.role_id, "action")}
                        className={`inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm transition-all duration-150 ${
                          isReadOnly
                            ? "opacity-70 cursor-not-allowed text-gray-500"
                            : "text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        disabled={isReadOnly}
                      >
                        {roleActions[role.role_id]?.length ||
                        existingActions.length > 0 ? (
                          <span className="flex items-center">
                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                              {roleActions[role.role_id]?.length ||
                                existingActions.length}
                            </span>
                            Actions
                          </span>
                        ) : (
                          "Select Actions"
                        )}
                        <ChevronDown
                          size={16}
                          className={`inline ml-2 transition-transform duration-200 ${
                            selectedRole?.id === role.role_id &&
                            selectedRole?.type === "action"
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {selectedRole?.id === role.role_id &&
                        selectedRole?.type === "action" && (
                          <div className="absolute z-10 mt-1 w-72 animate-fadeIn">
                            <MultiSelectDropdown
                              title="Actions"
                              options={actionOptions}
                              selectedOptions={
                                roleActions[role.role_id] || existingActions
                              }
                              onApply={(selected) =>
                                handleApply(role.role_id, selected, "action")
                              }
                              onReset={() =>
                                handleApply(role.role_id, [], "action")
                              }
                            />
                          </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Toggle
                      enabled={role.enabled}
                      onChange={() => handleToggleChange(role.role_id)}
                      className={
                        isReadOnly ? "opacity-50 cursor-not-allowed" : ""
                      }
                    />
                  </td>
                </tr>
              );
            })}

            {currentRoles.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default RoleTable;
