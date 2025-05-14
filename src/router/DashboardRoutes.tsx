import DashboardOverview from "../Pages/Sidebar/DashboardOverview";
import {
  Building2,
  LayoutDashboard,
  PackageOpen,
  ShieldUser,
  Users,
} from "lucide-react";
import ModuleTable from "../Pages/Sidebar/ModuleTable";
import { UserManagement } from "../Pages/Sidebar/UserManagement";
import { ModuleManagement } from "../Pages/Sidebar/ModuleManagement";
import Myuser from "../Pages/Sidebar/Myuser";

// export const DashboardRoutes = [
//   {
//     name: "Dashboard",
//     path: "overview",
//     icon: <LayoutDashboard size={20} />,
//     element: <DashboardOverview />,
//   },
//   {
//     name: "Modules control",
//     path: "modules",
//     icon: <PackageOpen size={20} />,
//     element: <ModuleManagement />,
//   },
//   {
//     name: "User Management",
//     path: "",
//     icon: <Users size={20} />,
//     children: [
//       {
//         name: "All Users",
//         path: "users",
//         icon: <ShieldUser />,
//         element: <ModuleTable />,
//       },
//       {
//         name: "Add User",
//         path: "new",
//         icon: <Building2 />,
//         element: <UserManagement />,
//       },
//       {
//         name: "Roles",
//         path: "roles",
//         icon: <Building2 />,
//         element: <Myuser />,
//       },
//     ],
//   },
//   {
//     name: "Financial Dashboard",
//     path: "financial",
//     icon: <BarChart3 size={20} />,
//   },
// ];

export const DashboardRoutes = [
  {
    name: "Dashboard",
    path: "overview",
    icon: <LayoutDashboard size={20} />,
    element: <DashboardOverview />,
    allowedRoles: ["admin", "super_admin", "master_admin"],
  },
  {
    name: "Modules control",
    path: "modules",
    icon: <PackageOpen size={20} />,
    element: <ModuleManagement />,
    allowedRoles: ["super_admin"], // example
  },
  {
    name: "User Management",
    path: "",
    icon: <Users size={20} />,
    allowedRoles: ["admin", "super_admin", "master_admin"],
    children: [
      {
        name: "All Users",
        path: "users",
        icon: <ShieldUser />,
        element: <ModuleTable />,
        allowedRoles: ["admin", "master_admin"],
      },
      {
        name: "Add User",
        path: "new",
        icon: <Building2 />,
        element: <UserManagement />,
        allowedRoles: ["super_admin"],
      },
      {
        name: "Roles",
        path: "roles",
        icon: <Building2 />,
        element: <Myuser />,
        allowedRoles: ["admin", "super_admin"],
      },
    ],
  },
];
