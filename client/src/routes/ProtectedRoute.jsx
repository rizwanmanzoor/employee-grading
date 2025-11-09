import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({allowedRoles} ) => {
  const { token, role } = useSelector((state) => state.auth);

  console.log("ProtectedRoute token:", token);
  console.log("ProtectedRoute token:", role);
  // if no token => redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Logged in but role not allowed
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  // if logged in => allow access
  return <Outlet />;
};

export default ProtectedRoute;
