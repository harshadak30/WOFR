
import DashboardOverview from "../Pages/SidebarPage/DashboardOverview";
import NewLease from "../Pages/SidebarPage/NewLease";
import AllLease from "../Pages/SidebarPage/AllLease";
import Analytics from "../Pages/SidebarPage/Analytics";
import Reports from "../Pages/SidebarPage/Reports";
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
  {
    path: "All-lease",
    label: "All Leases",
     icon: icons.Alllease,
    element: <AllLease />,
  },
  {
    path: "analytics",
    label: "Analytics",
     icon: icons.Analytics,
    element: <Analytics />,
  },
  {
    path: "Report",
    label: "Report",
     icon: icons.Report,
    element: <Reports />,
  },


];
