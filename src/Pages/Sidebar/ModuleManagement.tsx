import { useState } from "react";
import { Search } from "lucide-react";
import { Switch } from "../../component/ui/Switch";
import { DataTable } from "../../component/ui/DataTable";

interface Module {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
}

export const ModuleManagement = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      name: "CRM",
      description:
        "Customer Relationship Management module for tracking sales, managing contacts, and automating.",
      enabled: true,
    },
    {
      id: 2,
      name: "Project",
      description:
        "Project management module for planning, tracking, and reporting on projects. Includes Gantt charts, tools.",
      enabled: true,
    },
    {
      id: 3,
      name: "Lease",
      description:
        "Lease management module for tracking property leases, tenant information, payment schedules, and le",
      enabled: true,
    },
    {
      id: 4,
      name: "HR",
      description:
        "Human Resources module for managing employee information, time tracking, leave management, performance workflows.",
      enabled: true,
    },
    {
      id: 5,
      name: "Finance",
      description:
        "Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting",
      enabled: true,
    },
    {
      id: 6,
      name: "Analytics",
      description:
        "Business intelligence and analytics module for data visualization, custom reporting, and performance",
      enabled: true,
    },
    {
      id: 7,
      name: "CRMM",
      description:
        "Customer Relationship Management module for tracking sales, managing contacts, and automating.",
      enabled: true,
    },
    {
      id: 8,
      name: "Project",
      description:
        "Project management module for planning, tracking, and reporting on projects. Includes Gantt charts, tools.",
      enabled: true,
    },
    {
      id: 9,
      name: "Lease",
      description:
        "Lease management module for tracking property leases, tenant information, payment schedules, and le",
      enabled: true,
    },
    {
      id: 10,
      name: "HR",
      description:
        "Human Resources module for managing employee information, time tracking, leave management, performance workflows.",
      enabled: true,
    },
    {
      id: 11,
      name: "Finance",
      description:
        "Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting",
      enabled: true,
    },
    {
      id: 12,
      name: "Analytics",
      description:
        "Business intelligence and analytics module for data visualization, custom reporting, and performance",
      enabled: true,
    },
    {
      id: 13,
      name: "HR",
      description:
        "Human Resources module for managing employee information, time tracking, leave management, performance workflows.",
      enabled: true,
    },
    {
      id: 14,
      name: "Finance",
      description:
        "Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting",
      enabled: true,
    },
    {
      id: 15,
      name: "Analytics",
      description:
        "Business intelligence and analytics module for data visualization, custom reporting, and performance",
      enabled: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleModule = (id: number) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );
  };

  const columns = [
    {
      header: "ITEM",
      accessor: "id",
      className: "w-16 text-center",
    },
    {
      header: "MODULE NAME",
      accessor: "name",
      className: "w-48",
    },
    {
      header: "DESCRIPTION",
      accessor: "description",
    },
    {
      header: "ACTION",
      accessor: () => (
        <div className="flex justify-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Action
          </button>
        </div>
      ),
      className: "w-24 text-center",
    },
    {
      header: "ROLES",
      accessor: () => (
        <div className="flex justify-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Roles
          </button>
        </div>
      ),
      className: "w-24 text-center",
    },
    {
      header: "ENABLE/DISABLE",
      accessor: (row: Module) => (
        <div className="flex justify-center">
          <Switch
            checked={row.enabled}
            onChange={() => handleToggleModule(row.id)}
          />
        </div>
      ),
      className: "w-40 text-center",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search size={18} className="text-gray-400" />
          </div>

        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredModules.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
          pagination={{
            totalItems: filteredModules.length,
            itemsPerPage,
            currentPage,
            onPageChange: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
};
