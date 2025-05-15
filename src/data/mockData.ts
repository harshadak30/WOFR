import { Option, ModuleData, UserData } from "../types";

export const roleOptions: Option[] = [
  { id: "super-admin", label: "Super Admin" },
  { id: "admin", label: "Admin" },
  { id: "manager", label: "Manager" },
  { id: "editor", label: "Editor" },
  { id: "user", label: "User" },
  { id: "guest", label: "Guest" },
  { id: "other", label: "Other" },
];

export const moduleOptions: Option[] = [
  { id: "standard", label: "Standard" },
  { id: "premium", label: "Premium" },
  { id: "enterprise", label: "Enterprise" },
];

export const actionOptions: Option[] = [
  { id: "create", label: "Create" },
  { id: "read", label: "Read" },
  { id: "update", label: "Update" },
  { id: "delete", label: "Delete" },
  { id: "export", label: "Export" },
  { id: "import", label: "Import" },
  { id: "approve", label: "Approve" },
  { id: "reject", label: "Reject" },
  { id: "view", label: "View" },
];

export const moduleData: ModuleData[] = [
  {
    id: 1,
    name: "CRM",
    description:
      "Customer Relationship Management module for tracking sales, managing contacts, and automating.",
    actionId: null,
    roleId: null,
    enabled: true,
  },
  {
    id: 2,
    name: "Project",
    description:
      "Project management module for planning, tracking, and reporting on projects. Includes Gantt charts, tools.",
    actionId: null,
    roleId: null,
    enabled: true,
  },
  {
    id: 3,
    name: "Lease",
    description:
      "Lease management module for tracking property leases, TENANT information, payment schedules, and le",
    actionId: null,
    roleId: null,
    enabled: true,
  },
  {
    id: 4,
    name: "HR",
    description:
      "Human Resources module for managing employee information, time tracking, leave management, performance workflows.",
    actionId: null,
    roleId: null,
    enabled: true,
  },
  {
    id: 5,
    name: "Finance",
    description:
      "Financial management module for accounting, invoicing, expense tracking, budgeting, and financial reporting",
    actionId: null,
    roleId: null,
    enabled: true,
  },
  {
    id: 6,
    name: "Analytics",
    description:
      "Business intelligence and analytics module for data visualization, custom reporting, and performance",
    actionId: null,
    roleId: null,
    enabled: true,
  },
];

export const userData: UserData[] = [
  {
    id: 1,
    tenetId: "T001",
    name: "Vinay",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 2,
    tenetId: "T002",
    name: "Sheerkant",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 3,
    tenetId: "T003",
    name: "Raj",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 4,
    tenetId: "T004",
    name: "Rohit",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 5,
    tenetId: "T005",
    name: "Dinesh",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 6,
    tenetId: "T006",
    name: "Shivam",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 7,
    tenetId: "T007",
    name: "Yash",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 8,
    tenetId: "T008",
    name: "Pawan",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 9,
    tenetId: "T009",
    name: "Kartik",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
  {
    id: 10,
    tenetId: "T010",
    name: "Nimesh",
    email: "name@gmail.com",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
  },
];
