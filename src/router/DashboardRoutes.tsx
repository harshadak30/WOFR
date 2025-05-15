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
import Myuser from "../Pages/Sidebar/users/Myuser";
import ModuleManagement from "../Pages/Sidebar/Modules/ModuleManagement";
import ModulesActionsManagement from "../Pages/MasterAdminPages/ModuleManagementPage";
import Alluser from "../Pages/MasterAdminPages/AllUser";

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
    element: <ModulesActionsManagement />,
    allowedRoles: ["dev", "master_admin"], // TEMPORARY
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
        element: <Alluser  />,
        allowedRoles: ["dev", "master_admin", "super_admin"],
      },
      // {
      //   name: "Add User",
      //   path: "new",
      //   icon: <Building2 size={20} />,
      //   element: <UserManagement />,
      //   allowedRoles: ["dev" , "master_admin" , "super_admin"],
      // },
      {
        name: "Roles",
        path: "roles",
        icon: <Building2 size={20} />,
        element: <Myuser />,
        allowedRoles: ["dev", "master_admin", "super_admin"],
      },
    ],
  },
  {
    name: "Financial Dashboard",
    path: "financial",
    icon: <BarChart3 size={20} />,
    element: <ModuleManagement />,
    allowedRoles: ["dev", "master_admin"],
  },
];



