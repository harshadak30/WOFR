import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AppSolutionsPage from "./Pages/WORFPage/AppSolutionPage";
import FreeTrialPage from "./Pages/WORFPage/FreeTrialPage";
import WofrLeaseIntroPage from "./Pages/WORFPage/WofrLeaseIntroPage";
import OrganizationRegister from "./Pages/Auth/OrganizationRegister";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore-solutions" element={<AppSolutionsPage />} />
        <Route path="/free-trial" element={<FreeTrialPage />} />
        <Route path="/org-signup" element={ <OrganizationRegister/>} />
        <Route path="/wofr/lease-intro" element={ <WofrLeaseIntroPage/>} />       
      </Routes>
    </Router>
  );
};

export default App;
