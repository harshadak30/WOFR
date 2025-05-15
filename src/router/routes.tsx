import { RouteObject, Navigate } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AppSolutions from "../Pages/WORF/AppSolution";
import FreeTrial from "../Pages/WORF/FreeTrial";
import WofrLeaseIntro from "../Pages/WORF/WofrLeaseIntro";
import OrganizationRegister from "../Pages/Auth/OrganizationRegister";
import ResetPasswordForm from "../Pages/Auth/ResetPasswordForm";
import WOFRDashboard from "../Pages/HomeScreen/Dashboard";
import Calendly from "../Calendly/Calendly";
import NotFound from "../Pages/NotFound";
import { DashboardRoutes } from "./DashboardRoutes";
import DashboardLayout from "../component/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../Pages/unauthorized/Unauthorized";
import UserProfile from "../Pages/MasterAdminPages/UserProfile";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <WOFRDashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/book-demo",
    element: <Calendly />,
  },
  {
    path: "/wofr/lease-intro",
    element: <WofrLeaseIntro />,
  },
  {
    path: "/org-signup",
    element: <OrganizationRegister />,
  },
  {
    path: "/free-trial",
    element: <FreeTrial />,
  },
  {
    path: "/explore-solutions",
    element: <AppSolutions />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordForm />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path:"/unauthorized",
    element: <Unauthorized/>
  }
];


// Dashboard routes (temporarily without auth protection)
export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/overview" replace />,
      },
      ...DashboardRoutes.filter(route => !route.children).map(route => ({
        path: route.path,
        // Temporary: No ProtectedRoute
        // element: route.element,
     
        element: (
          <ProtectedRoute allowedRoles={route.allowedRoles}>
            {route.element}
          </ProtectedRoute>
        ),
        
      })),
      ...DashboardRoutes.filter(route => route.children)
        .flatMap(route =>
          route.children!.map(child => ({
            path: child.path,
            // Temporary: No ProtectedRoute
            // element: child.element,
       
            element: (
              <ProtectedRoute allowedRoles={child.allowedRoles}>
                {child.element}
              </ProtectedRoute>
            ),
         
          }))
        ),

        {
          // path: "users/:id", 
          path:"users/userDetails/:id",
          element: (
            <ProtectedRoute allowedRoles={["dev", "master_admin", "super_admin"]}>
              <UserProfile />
            </ProtectedRoute>
          ),
        }
    ],
  },

  
];


