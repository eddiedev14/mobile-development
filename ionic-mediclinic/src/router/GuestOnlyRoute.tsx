import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

interface Props {
  children: React.ReactNode;
}

const GuestOnlyRoute = ({ children }: Props) => {
  const { logged } = useAuth();
  return logged ? <Navigate to="/visitas" replace /> : children;
};

export default GuestOnlyRoute;