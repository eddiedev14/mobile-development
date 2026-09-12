import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { logged } = useAuth();
  return logged ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
