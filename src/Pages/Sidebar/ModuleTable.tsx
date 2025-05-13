import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Search } from 'lucide-react';

// Define TypeScript interfaces for our data structure
interface TableColumn {
  key: string;
  header: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DropdownOption {
  id: string | number;
  label: string;
  selected?: boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  itemsPerPage?: number;
  searchPlaceholder?: string;
  showSearch?: boolean;
  onRowSelect?: (selectedRow: any) => void;
  onSearch?: (searchTerm: string) => void;
}

// Define the Dropdown component for multi-select
const MultiSelectDropdown = ({ options, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    // Initialize with any pre-selected options
    setSelectedOptions(options.filter((opt: { selected: any; }) => opt.selected));
  }, [options]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const toggleOption = (option: DropdownOption) => {
    let newSelected;
    if (selectedOptions.find(o => o.id === option.id)) {
      newSelected = selectedOptions.filter(o => o.id !== option.id);
    } else {
      newSelected = [...selectedOptions, option];
    }
    setSelectedOptions(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        onClick={toggleDropdown}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          <span>
            {selectedOptions.length} selected
          </span>
        )}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option: DropdownOption) => (
            <div
              key={option.id}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={!!selectedOptions.find(o => o.id === option.id)}
                onChange={() => {}}
                className="mr-2"
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Define the Table component
const DynamicTable = ({
  columns,
  data,
  itemsPerPage = 10,
  searchPlaceholder = "Search modules...",
  showSearch = true,
  onRowSelect,
  onSearch
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>(data);

  // Update filtered data when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => {
        return Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, data]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  // Generate page numbers
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  if (totalPages <= maxVisiblePages) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show first, last, and pages around current
    const leftSide = Math.max(1, currentPage - 1);
    const rightSide = Math.min(totalPages, currentPage + 1);
    
    if (leftSide > 1) {
      pageNumbers.push(1);
      if (leftSide > 2) pageNumbers.push('...');
    }
    
    for (let i = leftSide; i <= rightSide; i++) {
      pageNumbers.push(i);
    }
    
    if (rightSide < totalPages) {
      if (rightSide < totalPages - 1) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Search bar */}
      {showSearch && (
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className={onRowSelect ? "cursor-pointer hover:bg-gray-50" : ""}
                onClick={() => onRowSelect && onRowSelect(row)}
              >
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {endIndex} of {filteredData.length} results
          </div>
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              } relative inline-flex items-center px-2 py-2 rounded-md text-sm font-medium text-gray-500 bg-white`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-100'
                    } relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              } relative inline-flex items-center px-2 py-2 rounded-md text-sm font-medium text-gray-500 bg-white`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

// Define the role options
const roleOptions: DropdownOption[] = [
  { id: 1, label: 'Admin' },
  { id: 2, label: 'Manager' },
  { id: 3, label: 'User' },
  { id: 4, label: 'Viewer' },
  { id: 5, label: 'Editor' }
];

// Define the action options
const actionOptions: DropdownOption[] = [
  { id: 1, label: 'View' },
  { id: 2, label: 'Edit' },
  { id: 3, label: 'Delete' },
  { id: 4, label: 'Create' }
];

// Sample data
const moduleData = [
  {
    id: 1,
    name: 'CRM',
    description: 'Customer Relationship Management module for tracking sales, managing contacts, and automating',
    action: 'Action',
    roles: 'Roles',
    enabled: true
  },
  {
    id: 2,
    name: 'Project',
    description: 'Project management module for planning, tracking, and reporting on projects. Includes Gantt charts, tools.',
    action: 'Action',
    roles: 'Roles',
    enabled: true
  },
  {
    id: 3,
    name: 'Lease',
    description: 'Lease management module for tracking property leases, tenant information, payment schedules, and le',
    action: 'Action',
    roles: 'Roles',
    enabled: true
  },
  {
    id: 4,
    name: 'HR',
    description: 'Human Resources module for managing employee information, time tracking, leave management, performance workflows.',
    action: 'Action',
    roles: 'Roles',
    enabled: true
  },
  {
    id: 5,
    name: 'Finance',
    description: 'Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting',
    action: 'Action',
    roles: 'Roles',
    enabled: true
  },
  {
    id: 6,
    name: 'Analytics',
    description: 'Business intelligence and analytics module for data visualization, custom reporting, and performance',
    action: 'Action',
    roles: 'Roles',
    enabled: true
  }
];

// Main Demo Component
export default function ModuleTable() {
  // You can use state to keep track of enabled modules and selections
  const [modules, setModules] = useState(moduleData);

  // Handle toggle for enable/disable
  const handleToggle = (id: number) => {
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === id ? { ...module, enabled: !module.enabled } : module
      )
    );
  };

  // Handle dropdown change
  const handleDropdownChange = (id: number, field: string, selected: DropdownOption[]) => {
    console.log(`Module ${id} ${field} changed:`, selected);
    // You could update state here if needed
  };

  // Define columns with custom renderers
  const columns: TableColumn[] = [
    { key: 'id', header: 'ITEM', width: 'w-16' },
    { key: 'name', header: 'MODULE NAME', width: 'w-40' },
    { key: 'description', header: 'DESCRIPTION' },
    { 
      key: 'action', 
      header: 'ACTION',
      width: 'w-40',
      render: (value, row) => (
        <MultiSelectDropdown
          options={actionOptions}
          onChange={(selected: DropdownOption[]) => handleDropdownChange(row.id, 'action', selected)}
          placeholder="Select actions"
        />
      )
    },
    { 
      key: 'roles', 
      header: 'ROLES',
      width: 'w-40',
      render: (value, row) => (
        <MultiSelectDropdown
          options={roleOptions}
          onChange={(selected: DropdownOption[]) => handleDropdownChange(row.id, 'roles', selected)}
          placeholder="Select roles"
        />
      )
    },
    { 
      key: 'enabled', 
      header: 'ENABLE/DISABLE',
      width: 'w-40',
      render: (value, row) => (
        <div className="flex items-center justify-center">
          <label className="inline-flex relative items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only"
              checked={value}
              onChange={() => handleToggle(row.id)}
            />
            <div className={`w-11 h-6 bg-gray-200 rounded-full peer transition-colors duration-200 ease-in-out ${value ? 'bg-blue-500' : ''}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${value ? 'translate-x-5' : 'translate-x-1'}`}></div>
            </div>
          </label>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <DynamicTable
        columns={columns}
        data={modules}
        itemsPerPage={10}
        searchPlaceholder="Search modules..."
      />
    </div>
  );
}
