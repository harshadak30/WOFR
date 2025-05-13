
import DashboardOverview from "../Pages/Sidebar/DashboardOverview";
import { BarChart3, LayoutDashboard, PackageOpen, Users } from "lucide-react";
import { ModuleManagement } from "../Pages/Sidebar/ModuleManagement";
import ModuleTable from "../Pages/Sidebar/ModuleTable";

export const DashboardRoutes = [
  // {
  //   path: "overview",
  //   label: "Dashboard",
  //    icon: icons.Home,
  //   element: <DashboardOverview />,
  // },
  // {
  //   path: "New-Lease",
  //   label: "New Lease",
  //    icon: icons.Newlease,
  //   element: <NewLease />,
  // },
  //   {
  //   path: "Modules with Action",
  //   label: "Modules with Action",
  //    icon: icons.Alllease,
  //   element: <AllLease />,
  // },
  // {
  //   path: "Roles permission",
  //   label: "Roles permission",
  //    icon: icons.Analytics,
  //   element: <Analytics />,
  //   items: [
  //     {
  //           path: "User",
  //           label: "User",
  //            icon: icons.Report,
  //           element: <Reports />,
  //         },
  //         {
  //           path: "Entity",
  //           label: "Entity",
  //            icon: icons.Report,
  //           element: <Reports />,
  //         },
  //   ],
  // },
  // {
  //   path: "Report",
  //   label: "Report",
  //    icon: icons.Report,
  //   element: <Reports />,
  // },


  {
    name: 'Dashboard',
    path: 'overview',
    icon: <LayoutDashboard size={20} />,
    element: <DashboardOverview />,
  },
  {
    name: 'Modules control',
    path: 'modules',
    icon: <PackageOpen size={20} />,
    element :<ModuleManagement/>
  },
  {
    name: 'User Management',
    path: '',
    icon: <Users size={20} />,
    children: [
      { name: 'All Users', path: 'users', element :<ModuleTable/> },
      { name: 'Add User', path: 'users/new' },
      { name: 'Roles', path: 'users/roles' },
    ],
  },
  {
    name: 'Financial Dashboard',
    path: 'financial',
    icon: <BarChart3 size={20} />,
  },

];
