import DashboardOverview from "../Pages/Sidebar/DashboardOverview";
import {
  BarChart3,
  Building2,
  LayoutDashboard,
  PackageOpen,
  ShieldUser,
  Users,
} from "lucide-react";

import { JSX } from "react";
import FinancialDashboard from "../Pages/MasterAdminPages/FinancialDashboard";
import ModulesBasedOnRolesWrapper from "../Pages/SuperAdminPages/ModulesBasedOnRolesWrapper";
import OrganizationProfile from "../Pages/SuperAdminPages/OrganizationProfile";
import Allusers from "../Pages/MasterAdminPages/AllUsers";
import OrganizationForm from "../Pages/MasterAdminPages/OrganizationForm";

// Import new page components
// import ReportsOverview from "../Pages/Reports/ReportsOverview";
// import PaymentHistory from "../Pages/Finance/PaymentHistory";

export interface RouteChild {
  name: string;
  path: string;
  icon: JSX.Element;
  element: JSX.Element;
  allowedRoles: string[];
}

export interface RouteItem {
  name: string;
  path: string;
  icon: JSX.Element;
  element?: JSX.Element;
  allowedRoles: string[];
  children?: RouteChild[];
}

export const DashboardRoutes: RouteItem[] = [
  {
    name: "Dashboard",
    path: "overview",
    icon: <LayoutDashboard size={20} />,
    element: <DashboardOverview />,
    allowedRoles: ["dev", "master_admin", "super_admin"], // TEMPORARY FOR DEVELOPMENT
  },
  {
    name: "Modules control",
    path: "modules",
    icon: <PackageOpen size={20} />,
    element: <ModulesBasedOnRolesWrapper />,
    allowedRoles: ["dev", "master_admin", "super_admin"], // TEMPORARY
  },
  // {
  //   name: "Role Management",
  //   path: "role-management",
  //   icon: <BarChart3 size={20} />,
  //   element: <RoleManagement isReadOnly={false} />,
  //   allowedRoles: ["dev", "master_admin" , "super_admin"],
  // },
  {
    name: "Organization Form",
    path: "org-form",
    icon: <BarChart3 size={20} />,
    element: <OrganizationForm />,
    allowedRoles: ["dev", "super_admin"],
  },
  {
    name: "User Management",
    path: "",
    icon: <Users size={20} />,
    allowedRoles: ["dev", "master_admin", "super_admin"],
    children: [
      {
        name: "All Users",
        path: "users",
        icon: <ShieldUser size={20} />,
        element: <Allusers />,
        allowedRoles: ["dev", "master_admin", "super_admin"],
      },
      {
        name: "Organization Profile",
        path: "Profile",
        icon: <Building2 size={20} />,
        element: <OrganizationProfile />,
        allowedRoles: ["dev", "super_admin"],
      },
    ],
  },
  {
    name: "Financial Dashboard",
    path: "financial",
    icon: <BarChart3 size={20} />,
    element: <FinancialDashboard />,
    allowedRoles: ["dev", "master_admin"],
  },

  /*
  // Add more screens to sidebar based on roles
  {
    name: "Reports",
    path: "reports",
    icon: <FileText size={20} />,
    element: <ReportsOverview />,
    allowedRoles: ["dev", "master_admin", "super_admin", "report_viewer"],
  },
  {
    name: "Analytics",
    path: "",
    icon: <PieChart size={20} />,
    allowedRoles: ["dev", "master_admin", "super_admin", "analyst"],
    children: [
      {
        name: "User Analytics",
        path: "user-analytics",
        icon: <Users size={20} />,
        element: <UserAnalytics />,
        allowedRoles: ["dev", "master_admin", "super_admin", "analyst"],
      },
      // You can add more analytics children here
    ]
  },
  {
    name: "Documents",
    path: "documents",
    icon: <FileText size={20} />,
    element: <DocumentCenter />,
    allowedRoles: ["dev", "master_admin", "super_admin", "document_manager"],
  },

  {
    name: "Finance",
    path: "",
    icon: <CreditCard size={20} />,
    allowedRoles: ["dev", "master_admin", "finance_admin"],
    children: [
      {
        name: "Payment History",
        path: "payment-history",
        icon: <FileText size={20} />,
        element: <PaymentHistory />,
        allowedRoles: ["dev", "master_admin", "finance_admin"],
      }
    ]
  },
 
  */
];
