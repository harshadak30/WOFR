import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AppSolutions from "./Pages/WORF/AppSolution";
import FreeTrial from "./Pages/WORF/FreeTrial";
import WofrLeaseIntro from "./Pages/WORF/WofrLeaseIntro";
import OrganizationRegister from "./Pages/Auth/OrganizationRegister";
import ResetPasswordForm from "./Pages/Auth/ResetPasswordForm";
import WOFRDashboard from "./Pages/Landing/Dashboard";
import ProtectedRoute from "./router/ProtectedRoute";
import { DashboardRoutes } from "./router/DashboardRoutes";
import DashboardLayout from "./component/layout/DashboardLayout";
import Calendly from "./Calendly/Calendly";
import NotFound from "./Pages/NotFound";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-demo" element={<Calendly />} />
        <Route path="/" element={<WOFRDashboard />} />
        <Route path="/wofr/lease-intro" element={<WofrLeaseIntro />} />
        <Route path="/org-signup" element={<OrganizationRegister />} />
        <Route path="/free-trial" element={<FreeTrial />} />
        <Route path="/explore-solutions" element={<AppSolutions />} />{" "}
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              {DashboardRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
