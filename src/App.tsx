import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { dashboardRoutes, publicRoutes } from "./router/routes";
import { AuthProvider } from "./context/AuthContext";

const AppRoutes = () => {
  const routes = [...publicRoutes, ...dashboardRoutes];
  return useRoutes(routes);
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
