
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
