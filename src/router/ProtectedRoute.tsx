// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");
  const location = useLocation();

  const isAuthenticated = !!token;
  const isAuthorized = isAuthenticated && allowedRoles.includes(userType || "");

  console.log({ token, userType, allowedRoles, isAuthorized });

  return isAuthorized ? (
    <>{children}</>
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
