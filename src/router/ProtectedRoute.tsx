import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { authState } = useContext(AuthContext);
  // const userType = authState.user_type ;
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");
  const location = useLocation();

  const isAuthenticated = !!token;
  const isAuthorized = isAuthenticated && allowedRoles.includes(userType || "");

  console.log(isAuthorized);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
