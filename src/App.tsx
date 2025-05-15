import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { dashboardRoutes, publicRoutes } from "./router/routes";

const AppRoutes = () => {
  // Combine all routes
  const routes = [...publicRoutes, ...dashboardRoutes];
  return useRoutes(routes);
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
