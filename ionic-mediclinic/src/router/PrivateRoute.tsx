import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { logged } = useAuth();
  return logged ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;