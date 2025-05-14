import {
  useState,
  useRef,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { Search, ChevronDown, Check } from "lucide-react";

// Mock components to simulate UI library components
const Switch = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
      checked ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const DataTable = ({ columns, data, pagination }) => {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = pagination;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="relative">
      <div
        className="overflow-x-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E0 #F7FAFC" }}
      >
        <table className="w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map(
                (
                  column: {
                    className: any;
                    header:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  },
                  index: Key | null | undefined
                ) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.className || ""
                    }`}
                  >
                    {column.header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(
              (
                row: {
                  [x: string]:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                },
                rowIndex: Key | null | undefined
              ) => (
                <tr key={rowIndex}>
                  {columns.map(
                    (
                      column: {
                        accessor:
                          | string
                          | number
                          | ((arg0: {
                              [x: string]:
                                | string
                                | number
                                | bigint
                                | boolean
                                | ReactPortal
                                | ReactElement<
                                    unknown,
                                    string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | Promise<
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | ReactPortal
                                    | ReactElement<
                                        unknown,
                                        string | JSXElementConstructor<any>
                                      >
                                    | Iterable<ReactNode>
                                    | null
                                    | undefined
                                  >
                                | null
                                | undefined;
                            }) =>
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactPortal
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined);
                        className: any;
                      },
                      colIndex: Key | null | undefined
                    ) => (
                      <td
                        key={colIndex}
                        className={`px-6 py-4 ${
                          column.accessor === "description"
                            ? "truncate"
                            : "whitespace-nowrap"
                        } ${column.className || ""}`}
                      >
                        {column.accessor === "id" ||
                        column.accessor === "name" ||
                        column.accessor === "description"
                          ? row[column.accessor]
                          : typeof column.accessor === "function"
                          ? column.accessor(row)
                          : row[column.accessor]}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="sticky bottom-0 left-0 right-0 bg-white py-3 flex items-center justify-between border-t border-gray-200 px-4">
          <div className="md:hidden flex justify-between w-full">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <span className="text-sm px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-300"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else {
                    // Show pages around the current page
                    let startPage = Math.max(currentPage - 2, 1);
                    let endPage = Math.min(startPage + 4, totalPages);

                    // Adjust if at the end
                    if (endPage === totalPages) {
                      startPage = Math.max(endPage - 4, 1);
                    }

                    pageNum = startPage + i;
                    if (pageNum > totalPages) return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pageNum === currentPage
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-300"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Multi-select dropdown component
const MultiSelectDropdown = ({
  options,
  selectedOptions,
  onChange,
  placeholder,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState([...selectedOptions]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update tempSelected when selectedOptions change
  useEffect(() => {
    setTempSelected([...selectedOptions]);
  }, [selectedOptions]);

  const toggleOption = (option) => {
    if (tempSelected.includes(option)) {
      setTempSelected(tempSelected.filter((item) => item !== option));
    } else {
      setTempSelected([...tempSelected, option]);
    }
  };

  const handleApply = () => {
    onChange(tempSelected);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSelected([...selectedOptions]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`flex justify-between items-center w-full px-3 py-2 text-sm border rounded-md ${
          readOnly
            ? "bg-gray-100 text-gray-700"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => !readOnly && setIsOpen(!isOpen)}
        disabled={readOnly}
      >
        <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded truncate max-w-full"
              >
                {option}
              </span>
            ))
          ) : (
            <span className="text-gray-400 truncate">{placeholder}</span>
          )}
        </div>
        {!readOnly && <ChevronDown size={16} className="ml-2 flex-shrink-0" />}
      </button>

      {isOpen && !readOnly && (
        <div className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <div
            className="max-h-60 overflow-y-auto py-1"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#CBD5E0 #F7FAFC",
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <div className="flex items-center mr-2">
                  <div
                    className={`w-4 h-4 border rounded flex items-center justify-center ${
                      tempSelected.includes(option)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {tempSelected.includes(option) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                </div>
                <span className="truncate">{option}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end p-2 border-t">
            <button
              className="px-3 py-1 mr-2 text-sm text-gray-600 hover:text-gray-800"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface Module {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  actions: string[];
  roles: string[];
  users: string[];
}

export default function Myuser() {
  // Available options for dropdowns
  const actionOptions = [
    "View",
    "Edit",
    "Delete",
    "Export",
    "Import",
    "Assign",
    "Approve",
    "Reject",
  ];
  const roleOptions = [
    "Admin",
    "Manager",
    "Supervisor",
    "Editor",
    "Viewer",
    "Guest",
    "Finance",
    "HR",
  ];
  const userOptions = [
    "John Doe",
    "Jane Smith",
    "David Johnson",
    "Sarah Williams",
    "Michael Brown",
    "Emily Davis",
  ];

  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      name: "CRM",
      description:
        "Customer Relationship Management module for tracking sales, managing contacts, and automating.",
      enabled: true,
      actions: ["View", "Edit"],
      roles: ["Admin", "Manager"],
      users: ["John Doe"],
    },
    {
      id: 2,
      name: "Project",
      description:
        "Project management module for planning, tracking, and reporting on projects. Includes Gantt charts, tools.",
      enabled: true,
      actions: ["View"],
      roles: ["Admin", "Manager", "Supervisor"],
      users: ["John Doe", "Jane Smith"],
    },
    {
      id: 3,
      name: "Lease",
      description:
        "Lease management module for tracking property leases, tenant information, payment schedules, and le",
      enabled: true,
      actions: ["View", "Edit", "Delete"],
      roles: ["Admin"],
      users: ["David Johnson"],
    },
    {
      id: 4,
      name: "HR",
      description:
        "Human Resources module for managing employee information, time tracking, leave management, performance workflows.",
      enabled: true,
      actions: ["View", "Edit"],
      roles: ["HR", "Admin"],
      users: ["Sarah Williams", "Emily Davis"],
    },
    {
      id: 5,
      name: "Finance",
      description:
        "Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting",
      enabled: true,
      actions: ["View", "Export"],
      roles: ["Finance", "Admin"],
      users: ["Michael Brown"],
    },
    {
      id: 6,
      name: "Analytics",
      description:
        "Business intelligence and analytics module for data visualization, custom reporting, and performance",
      enabled: true,
      actions: ["View"],
      roles: ["Admin", "Manager", "Viewer"],
      users: ["John Doe", "Michael Brown"],
    },
    {
      id: 7,
      name: "CRMM",
      description:
        "Customer Relationship Management module for tracking sales, managing contacts, and automating.",
      enabled: true,
      actions: ["View"],
      roles: ["Admin"],
      users: [],
    },
    {
      id: 8,
      name: "Project Plus",
      description:
        "Project management module for planning, tracking, and reporting on projects. Includes Gantt charts, tools.",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
    },
    {
      id: 9,
      name: "Lease Pro",
      description:
        "Lease management module for tracking property leases, tenant information, payment schedules, and le",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
    },
    {
      id: 10,
      name: "HR Pro",
      description:
        "Human Resources module for managing employee information, time tracking, leave management, performance workflows.",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
    },
    {
      id: 11,
      name: "Finance Plus",
      description:
        "Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
    },
    {
      id: 12,
      name: "Analytics Pro",
      description:
        "Business intelligence and analytics module for data visualization, custom reporting, and performance",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
    },
    {
      id: 13,
      name: "HR Enterprise",
      description:
        "Human Resources module for managing employee information, time tracking, leave management, performance workflows.",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
    },
    {
      id: 14,
      name: "Finance Enterprise",
      description:
        "Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
    },
    {
      id: 15,
      name: "Analytics Enterprise",
      description:
        "Business intelligence and analytics module for data visualization, custom reporting, and performance",
      enabled: true,
      actions: [],
      roles: [],
      users: [],
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

  const handleActionsChange = (id: number, newActions: any) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, actions: newActions } : module
      )
    );
  };

  const handleRolesChange = (id: number, newRoles: any) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, roles: newRoles } : module
      )
    );
  };

  const handleUsersChange = (id: number, newUsers: any) => {
    setModules(
      modules.map((module) =>
        module.id === id ? { ...module, users: newUsers } : module
      )
    );
  };

  const columns = [
    {
      header: "ITEM",
      accessor: "id",
      className: "w-12 text-center",
    },
    {
      header: "MODULE NAME",
      accessor: "name",
      className: "w-32",
    },
    {
      header: "DESCRIPTION",
      accessor: "description",
      className: "w-56",
    },
    {
      header: "ACTION",
      accessor: (row: Module) => (
        <div className="w-full">
          <MultiSelectDropdown
            options={actionOptions}
            selectedOptions={row.actions}
            onChange={(newActions: any) =>
              handleActionsChange(row.id, newActions)
            }
            placeholder="Select actions"
          />
        </div>
      ),
      className: "w-36",
    },
    {
      header: "ROLES",
      accessor: (row: Module) => (
        <div className="w-full">
          <MultiSelectDropdown
            options={roleOptions}
            selectedOptions={row.roles}
            onChange={(newRoles: any) => handleRolesChange(row.id, newRoles)}
            placeholder="Select roles"
          />
        </div>
      ),
      className: "w-36",
    },
    {
      header: "USERS",
      accessor: (row: Module) => (
        <div className="w-full">
          <MultiSelectDropdown
            options={userOptions}
            selectedOptions={row.users}
            onChange={(newUsers: any) => handleUsersChange(row.id, newUsers)}
            placeholder="Select users"
            readOnly={true}
          />
        </div>
      ),
      className: "w-36",
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
      className: "w-28 text-center",
    },
  ];

  return (
    <div className="space-y-6 p-4 max-w-full">
      <div className="flex justify-between items-center">
        <div className="relative">
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

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div
          className="overflow-x-auto rounded-lg"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E0 #F7FAFC" }}
        >
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
    </div>
  );
}
