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

export interface Module {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  features: string[];
  price?: string;
}

export const PurchasemoduleData: Module[] = [
  {
    id: 1,
    name: "CRM",
    description:
      "Customer Relationship Management module for tracking sales, managing contacts, and automating workflows.",
    enabled: true,
    features: ["Contact management", "Sales pipeline", "Email integration"],
    price: "$99/month",
  },
  {
    id: 2,
    name: "Project",
    description:
      "Project management module for planning, tracking, and reporting on projects. Includes Gantt charts, tools.",
    enabled: true,
    features: ["Task tracking", "Gantt charts", "Time logging"],
    price: "$129/month",
  },
  {
    id: 3,
    name: "Lease",
    description:
      "Lease management module for tracking property leases, tenant information, payment schedules, and lease terms.",
    enabled: false,
    features: ["Lease tracking", "Payment schedules", "Document management"],
    price: "$149/month",
  },
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
    OrgName: "ABCD",
    name: "Vinay",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 2,
    OrgName: "XYZ",
    name: "Sheerkant",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 3,
    OrgName: "ABCD",
    name: "Raj",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 4,
    OrgName: "ABCD",
    name: "Rohit",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 5,
    OrgName: "ABCD",
    name: "Dinesh",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 6,
    OrgName: "ABCD",
    name: "Shivam",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 7,
    OrgName: "ABCD",
    name: "Yash",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 8,
    OrgName: "ABCD",
    name: "Pawan",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 9,
    OrgName: "ABCD",
    name: "Kartik",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
  {
    id: 10,
    OrgName: "ABCD",
    name: "Nimesh",
    email: "name@gmail.com",
    phone: "+91 1234567890",
    roleId: null,
    moduleId: null,
    created: "dd/mm/yy",
    enabled: true,
    tenant_user_id: "",
    tenant_id: "",
    created_at: "",
    user_id: undefined,
    phone_number: undefined,
    organization_name: undefined,
    username: undefined
  },
];

import { Lease } from "../types";

// Generate mock lease data
export const mockLeases: Lease[] = [
  {
    id: "1",
    leaseNumber: "#12345",
    propertyType: "Office Space",
    client: "Office Space",
    price: 1200,
    startDate: "01-03-2025",
    endDate: "14-03-2025",
    status: "Active",
  },
  {
    id: "2",
    leaseNumber: "#12345",
    propertyType: "Office Space",
    client: "Office Space",
    price: 1200,
    startDate: "01-03-2025",
    endDate: "14-03-2025",
    status: "Active",
  },
  {
    id: "3",
    leaseNumber: "#12345",
    propertyType: "Office Space",
    client: "Office Space",
    price: 1200,
    startDate: "01-03-2025",
    endDate: "14-03-2025",
    status: "Pending",
  },
  {
    id: "4",
    leaseNumber: "#12345",
    propertyType: "Office Space",
    client: "Office Space",
    price: 1200,
    startDate: "01-03-2025",
    endDate: "14-03-2025",
    status: "Draft",
  },
  {
    id: "5",
    leaseNumber: "#12345",
    propertyType: "Office Space",
    client: "Office Space",
    price: 1200,
    startDate: "01-03-2025",
    endDate: "14-03-2025",
    status: "Rejected",
  },
  {
    id: "6",
    leaseNumber: "#12345",
    propertyType: "Office Space",
    client: "Office Space",
    price: 1200,
    startDate: "01-03-2025",
    endDate: "14-03-2025",
    status: "Expired",
  },
];
