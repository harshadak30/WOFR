
import DashboardOverview from "../Pages/Sidebar/DashboardOverview";
import NewLease from "../Pages/Sidebar/NewLease";
import AllLease from "../Pages/Sidebar/AllLease";
import Analytics from "../Pages/Sidebar/Analytics";
import Reports from "../Pages/Sidebar/Reports";
import icons from "../../public/icons/index";

export const DashboardRoutes = [
  {
    path: "overview",
    label: "Dashboard",
     icon: icons.Home,
    element: <DashboardOverview />,
  },
  {
    path: "New-Lease",
    label: "New Lease",
     icon: icons.Newlease,
    element: <NewLease />,
  },
  // {
  //   path: "All-lease",
  //   label: "All Leases",
  //    icon: icons.Alllease,
  //   element: <AllLease />,
  // },
  // {
  //   path: "analytics",
  //   label: "Analytics",
  //    icon: icons.Analytics,
  //   element: <Analytics />,
  // },


    {
    path: "Modules with Action",
    label: "Modules with Action",
     icon: icons.Alllease,
    element: <AllLease />,
  },
  {
    path: "Roles permission",
    label: "Roles permission",
     icon: icons.Analytics,
    element: <Analytics />,
    items: [
      {
            path: "User",
            label: "User",
             icon: icons.Report,
            element: <Reports />,
          },
          {
            path: "Entity",
            label: "Entity",
             icon: icons.Report,
            element: <Reports />,
          },
    ],
  },
  {
    path: "Report",
    label: "Report",
     icon: icons.Report,
    element: <Reports />,
  },


];
