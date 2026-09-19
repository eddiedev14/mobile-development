import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
