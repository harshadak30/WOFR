import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
// import Home from "./pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AppSolutionsPage from "./Pages/WORFPage/AppSolutionPage";
import FreeTrialPage from "./Pages/WORFPage/FreeTrialPage";
import WofrLeaseIntroPage from "./Pages/WORFPage/WofrLeaseIntroPage";
import OrganizationRegister from "./Pages/Auth/OrganizationRegister";
import ResetPasswordForm from "./Pages/Auth/ResetPasswordForm";
import WOFRDashboard from "./Pages/WORFPage/Dashboard"
import ProtectedRoute from "./router/ProtectedRoute";
import {DashboardRoutes} from "./router/DashboardRoutes";
import DashboardLayout from "./component/layout/DashboardLayout";
import Calendly from "./Calendly/Calendly";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      

        {/* <Route path="/" element={<AppSolutionsPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-demo" element={<Calendly />} />
        <Route path="/" element={<WOFRDashboard />} />
        <Route path="/wofr/lease-intro" element={ <WofrLeaseIntroPage/>} />       
        <Route path="/org-signup" element={ <OrganizationRegister/>} />
        <Route path="/free-trial" element={<FreeTrialPage />} />
        <Route path="/explore-solutions" element={<AppSolutionsPage />} />        <Route path="/reset-password" element={<ResetPasswordForm/>} />
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
