import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);

  console.log("ProtectedRoute token:", token);
  // if no token => redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // if logged in => allow access
  return <Outlet />;
};

export default ProtectedRoute;
